import React, { useState } from 'react';
import ChatContainer from './components/ChatContainer';
import ThemeToggle from './components/ThemeToggle';
import { getBotResponse } from './utils/chatbot';
import { useTheme } from './hooks/useTheme';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Hello! I\'m here to help you with questions about Crustdata APIs. What would you like to know?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (content) => {
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(async () => {
      const response = await getBotResponse(content);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className={`min-vh-100 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg" style={{ 
              backgroundColor: theme === 'dark' ? '#2b3035' : 'white',
              color: theme === 'dark' ? 'white' : 'black' 
            }}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Crustdata API Support</h5>
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </div>
              <ChatContainer 
                messages={messages}
                onSendMessage={handleSendMessage}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;