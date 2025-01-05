// Declare and export the config object
export const googleApiConfig = {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // Load from environment variable
  };
  
  // Format the response to ensure proper markdown
  const formatResponse = (text) => {
    text = text.replace(/```(\w*)\n/g, (match, lang) => {
      return `\`\`\`${lang || 'javascript'}\n`;
    });
    text = text.replace(/^(#{1,3} .+)$/gm, '\n$1\n');
    text = text.replace(/```(\w+)/g, '\n```$1');
    text = text.replace(/```\s*$/g, '```\n');
    text = text.replace(/^[*-]/gm, '\n* ');
    text = text.replace(/\n{3,}/g, '\n\n');
    return text.trim();
  };
  
  // Function to get response from Google API
  export const getGoogleResponse = async (query) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${googleApiConfig.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful AI assistant. User question: ${query}`,
                  },
                ],
              },
            ],
          }),
        }
      );
  
      const data = await response.json();
      return formatResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error fetching from Google API:', error);
      return getFallbackResponse(query);
    }
  };
  
  // Fallback response logic
  export const getFallbackResponse = (input) => {
    const responses = {
      'api key': `
    ## Getting Your API Key
    To obtain your API key:
    1. Sign in to your Crustdata dashboard
    2. Navigate to **Settings** > **API Keys**
    3. Click on **Generate New Key**
    \`\`\`bash
    curl -H "Authorization: Bearer YOUR_API_KEY" https://api.crustdata.com/v1/
    \`\`\`
        `,
    };
  
    const matchingKey = Object.keys(responses).find((key) =>
      input.toLowerCase().includes(key)
    );
    return matchingKey
      ? responses[matchingKey]
      : `
    ## General Information
    I'm not sure about that specific query. Check out:
    - [API Documentation](https://crustdata.com/docs/api/)
    - [Quickstart Guide](https://crustdata.com/docs/quickstart/)
    `;
  };
  
  // Export the bot response function
  export const getBotResponse = async (userInput) => {
    try {
      return await getGoogleResponse(userInput);
    } catch (error) {
      return getFallbackResponse(userInput);
    }
  };
  
  // Export only necessary items
  export default getGoogleResponse;
  