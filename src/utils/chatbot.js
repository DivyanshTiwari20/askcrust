import { googleApiConfig } from '../services/googleApi';
import ReactMarkdown from 'react-markdown';

// Function to get response from Google API
const getGoogleResponse = async (query) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${googleApiConfig.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a helpful AI assistant that answers questions about Crustdata APIs. User question: ${query}`
          }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching from Google API:', error);
    return getFallbackResponse(query);
  }
};

// Fallback responses if API fails
const getFallbackResponse = (input) => {
  const responses = {
    'api key': 'To get your API key, sign in to your Crustdata dashboard and navigate to Settings > API Keys. You can generate a new key there.',
    'endpoints': 'Crustdata provides RESTful APIs with endpoints for data ingestion (/ingest), querying (/query), and management (/manage). Check our documentation for detailed specifications.',
    'rate limits': 'Free tier accounts have 1000 requests/day. Premium accounts have higher limits based on the plan.',
    'authentication': 'Use your API key in the Authorization header: "Authorization: Bearer YOUR_API_KEY"',
    'data formats': 'We support JSON and CSV formats for data ingestion. Query results are returned in JSON format.',
    'pricing': 'We offer a free tier and premium plans starting at $49/month. Visit our pricing page for more details.',
  };

  const matchingKey = Object.keys(responses).find(key => input.toLowerCase().includes(key));
  return matchingKey ? responses[matchingKey] : "I'm not sure about that. Please check our documentation or contact support for more specific information.";
};

export const getBotResponse = async (userInput) => {
  try {
    return await getGoogleResponse(userInput);
  } catch (error) {
    return getFallbackResponse(userInput);
  }
};