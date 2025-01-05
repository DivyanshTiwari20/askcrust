import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ReactMarkdown from 'react-markdown';
import ChatInput from './ChatInput';

const ChatContainer = ({ messages, onSendMessage, theme }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="card-body" style={{ height: '500px', overflowY: 'auto' }}>
        {messages.map(message => (
            
          <ChatMessage 
            key={message.id} 
            message={message} 
            theme={theme}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="card-footer">
        <ChatInput onSendMessage={onSendMessage} theme={theme} />
      </div>
    </>
  );
};

export default ChatContainer;