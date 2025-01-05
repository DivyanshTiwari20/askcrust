import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, Bot } from 'lucide-react';

const ChatMessage = ({ message, theme }) => {
  const isBot = message.sender === 'bot';
  const bgColor = isBot 
    ? theme === 'light' ? 'bg-light' : 'bg-dark'
    : theme === 'light' ? 'bg-primary' : 'bg-primary';
  
  const textColor = isBot
    ? theme === 'light' ? 'text-dark' : 'text-light'
    : 'text-white';

  return (
    <div className={`d-flex ${isBot ? 'justify-content-start' : 'justify-content-end'} mb-3`}>
      <div className={`d-flex align-items-start ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
        <div className="mt-1">
          {isBot ? (
            <Bot size={24} className={theme === 'light' ? 'text-primary' : 'text-primary'} />
          ) : (
            <MessageCircle size={24} className="text-primary" />
          )}
        </div>
        <div className={`${bgColor} p-3 rounded-3 ${textColor}`} style={{ maxWidth: '75%' }}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
