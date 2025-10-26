
import React from 'react';
import './ChatMessage.css';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

function ChatMessage({ text, isUser }: ChatMessageProps) {
  return (
    <div className={`message ${isUser ? 'message-user' : 'message-ai'}`}>
      {!isUser && <div className="ai-avatar">✨</div>}
      <div className={`message-bubble ${isUser ? 'bubble-user' : 'bubble-ai'}`}>
        <p>{text}</p>
      </div>
      {isUser && <div className="user-avatar">👤</div>}
    </div>
  );
}

export default ChatMessage;
