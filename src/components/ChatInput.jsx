import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, theme }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-auto">
      <div className="input-group">
        <input
          type="text"
          className={`form-control ${theme === 'dark' ? 'bg-dark text-light' : ''}`}
          placeholder="Ask about Crustdata APIs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={!input.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;