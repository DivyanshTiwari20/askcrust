import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import ReactMarkdown from 'react-markdown';
import ChatInput from './ChatInput';
import axios from 'axios';

const ChatContainer = ({ theme, token }) => {
  const [messages, setMessages] = useState([
    { id: 'init', text: 'Hi! How can I help you today?', sender: 'bot' },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chat/messages', {
          headers: { Authorization: `Bearer ${token}` }, // Ensure token is valid
        });
        setMessages((prevMessages) => [...prevMessages, ...response.data.messages]);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    

    fetchMessages();
  }, [token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/chat/send',
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: response.data.message._id, text: response.data.message.text, sender: 'user' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <div className="card-body" style={{ height: '500px', overflowY: 'auto' }}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} theme={theme} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="card-footer">
        <ChatInput onSendMessage={handleSendMessage} theme={theme} />
      </div>
    </>
  );
};

export default ChatContainer;
