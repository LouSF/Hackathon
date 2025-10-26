
import React, { useState } from 'react';
import './StyleistInterface.css';
import Wardrobe from './components/Wardrobe';
import AIChat from './components/AIChat';

function StyleistInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);

  const handleSendFeedback = async (message: string): Promise<void> => {
    setIsLoading(true);
    // Simulate AI processing
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Check if click was on the background, not on chat
    if ((e.target as HTMLElement).classList.contains('wardrobe-background-wrapper')) {
      setIsChatVisible(false);
    }
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

      {/* Main Content - Wardrobe as full background */}
      <main className="app-main-full">
        <div 
          className="wardrobe-background-wrapper"
          onClick={handleBackgroundClick}
        >
          <Wardrobe />
        </div>

        {/* Floating AI Chat */}
        {isChatVisible && (
          <div className="floating-chat-container">
            <div className="chat-header-bar">
              <span className="chat-title">💬 AI Stylist Chat</span>
              <button 
                className="chat-minimize-btn"
                onClick={() => setIsChatVisible(false)}
                title="Hide Chat"
              >
                ✕
              </button>
            </div>
            <AIChat onSendFeedback={handleSendFeedback} isLoading={isLoading} />
          </div>
        )}

        {/* Show Chat Button when hidden */}
        {!isChatVisible && (
          <button 
            className="show-chat-btn"
            onClick={() => setIsChatVisible(true)}
            title="Show Chat"
          >
            💬
          </button>
        )}
      </main>

      {/* Background Decorations */}
      <div className="bg-decoration bg-1"></div>
      <div className="bg-decoration bg-2"></div>
      <div className="bg-decoration bg-3"></div>
    </div>
  );
}

export default StyleistInterface;
