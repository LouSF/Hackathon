
import React, { useState } from 'react';
import './StyleistInterface.css';
import Wardrobe from './components/Wardrobe';
import AIChat from './components/AIChat';

function StyleistInterface() {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendFeedback = async (message: string) => {
    setIsLoading(true);
    setFeedback(message);
    // Simulate AI processing
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(undefined);
      }, 1500);
    });
  };

  return (
    <div className="stylist-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">✨</div>
            <span className="logo-text">AI Stylist</span>
          </div>
          <div className="header-subtitle">Your Personal Fashion Assistant</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Wardrobe Section */}
        <section className="content-section">
          <Wardrobe />
        </section>

        {/* AI Chat Section */}
        <section className="content-section chat-section">
          <AIChat onSendFeedback={handleSendFeedback} isLoading={isLoading} />
        </section>
      </main>

      {/* Background Decorations */}
      <div className="bg-decoration bg-1"></div>
      <div className="bg-decoration bg-2"></div>
      <div className="bg-decoration bg-3"></div>
    </div>
  );
}

export default StyleistInterface;
