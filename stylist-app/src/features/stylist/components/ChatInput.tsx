
import React, { useState } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  onSend: (text: string) => Promise<void>;
  isLoading: boolean;
}

const quickSuggestions = [
  '🌡️ It\'s too warm',
  '❄️ It\'s too cold',
  '👔 More formal',
  '👕 More casual',
];

function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      await onSend(input);
      setInput('');
      setShowSuggestions(false);
    }
  };

  const handleQuickSuggestion = async (suggestion: string) => {
    await onSend(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-wrapper">
      {showSuggestions && (
        <div className="quick-suggestions">
          {quickSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              className="suggestion-btn"
              onClick={() => handleQuickSuggestion(suggestion)}
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Tell me what you're looking for..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          title="Send message"
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <span className="send-icon">→</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
