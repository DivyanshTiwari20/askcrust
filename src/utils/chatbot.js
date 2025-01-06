import { googleApiConfig } from '../services/googleApi';
import ReactMarkdown from 'react-markdown';

// Function to validate user input for API request
const validateApiRequest = (query) => {
  // Simple validation logic (customize as needed)
  if (!query || query.trim().length === 0) {
    throw new Error('Query cannot be empty.');
  }
  // Add more validation rules as necessary
};

// Function to get response from Google API
const getGoogleResponse = async (query) => {
  try {
    validateApiRequest(query); // Validate the API request before proceeding

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
    validateApiResponse(data); // Validate the API response
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching from Google API:', error);
    return getFallbackResponse(query);
  }
};

// Function to validate API response
const validateApiResponse = (data) => {
  if (!data || !data.candidates || data.candidates.length === 0) {
    throw new Error('Invalid API response');
  }
};

// Fallback responses if API fails
const getFallbackResponse = (input) => {
  const responses = {
    'api key': 'To get your API key, sign in to your Crustdata dashboard and navigate to Settings > API Keys.',
    'endpoints': 'Crustdata provides RESTful APIs with endpoints for data ingestion (/ingest), querying (/query), and management (/manage).',
    'rate limits': 'Free tier accounts have 1000 requests/day. Premium accounts have higher limits based on the plan.',
    'authentication': 'Use your API key in the Authorization header: "Authorization: Bearer YOUR_API_KEY".',
    'data formats': 'We support JSON and CSV formats for data ingestion. Query results are returned in JSON format.',
    'pricing': 'We offer a free tier and premium plans starting at $49/month.',
  };

  const matchingKey = Object.keys(responses).find(key => input.toLowerCase().includes(key));
  return matchingKey ? responses[matchingKey] : "I'm not sure about that. Please check our documentation or contact support.";
};

// State to keep track of conversation history
let conversationHistory = [];

// Function to add user input and bot response to conversation history
const addToConversationHistory = (userInput, botResponse) => {
  conversationHistory.push({ userInput, botResponse });
};

// Exported function to get bot response
export const getBotResponse = async (userInput) => {
  try {
    const botResponse = await getGoogleResponse(userInput);
    addToConversationHistory(userInput, botResponse); // Store conversation history
    return botResponse;
  } catch (error) {
    return getFallbackResponse(userInput);
  }
}
