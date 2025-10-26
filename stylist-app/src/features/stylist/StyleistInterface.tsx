
import React, { useState, useEffect } from 'react';
import './StyleistInterface.css';
import Wardrobe from './components/Wardrobe';
import AIChat from './components/AIChat';
import SocialPage from './components/SocialPage';
import BrandMonitorPage from './components/BrandMonitorPage';
import PreferenceMonitorPage from './components/PreferenceMonitorPage';

function StyleistInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isOutfitPanelVisible, setIsOutfitPanelVisible] = useState(true);
  const [weather, setWeather] = useState({ temp: 22, condition: '晴朗', icon: '☀️' });
  const [currentPage, setCurrentPage] = useState('Home');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSendFeedback = async (_message: string): Promise<void> => {
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

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsDropdownOpen(false);
  };

  const menuItems = [
    { name: 'Home', icon: '🏠' },
    { name: '交友', icon: '👥' },
    { name: '品牌价格监控', icon: '💰' },
    { name: '偏好设置', icon: '⭐' },
  ];

  // Simulate weather data update
  useEffect(() => {
    const weatherConditions = [
      { temp: 22, condition: '晴朗', icon: '☀️' },
      { temp: 18, condition: '多云', icon: '⛅' },
      { temp: 15, condition: '阴天', icon: '☁️' },
      { temp: 12, condition: '小雨', icon: '🌧️' },
    ];
    // Set random weather for demo (in real app, fetch from API)
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    setWeather(randomWeather);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.nav-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="stylist-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          {/* Left: Logo and Subtitle */}
          <div className="header-left">
            <div className="logo-section">
              <div className="logo-icon">✨</div>
              <span className="logo-text">AI Stylist</span>
            </div>
            <div className="header-subtitle">Your Personal Fashion Assistant</div>
          </div>

          {/* Center: Weather Info */}
          <div className="header-weather">
            <span className="weather-icon">{weather.icon}</span>
            <div className="weather-info">
              <div className="weather-temp">{weather.temp}°C</div>
              <div className="weather-condition">{weather.condition}</div>
            </div>
          </div>

          {/* Right: Navigation Menu */}
          <div className="header-right">
            <div className="nav-dropdown">
              <button 
                className="nav-dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="current-page-name">{currentPage}</span>
                <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
              </button>
              
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {menuItems.map((item) => (
                    <div
                      key={item.name}
                      className={`dropdown-item ${currentPage === item.name ? 'active' : ''}`}
                      onClick={() => handlePageChange(item.name)}
                    >
                      <span className="item-icon">{item.icon}</span>
                      <span className="item-name">{item.name}</span>
                      {currentPage === item.name && <span className="check-mark">✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Different pages based on selection */}
      <main className={`app-main-full ${isChatVisible && isOutfitPanelVisible ? 'both-panels-visible' : ''}`}>
        {currentPage === 'Home' ? (
          <>
            <div 
              className="wardrobe-background-wrapper"
              onClick={handleBackgroundClick}
            >
              <Wardrobe 
                isChatVisible={isChatVisible}
                onOutfitPanelVisibilityChange={setIsOutfitPanelVisible}
              />
            </div>

            {/* AI Chat - Messages and Input on Background */}
            {isChatVisible && (
              <div className="chat-overlay">
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

            {/* Hide Chat Button when visible */}
            {isChatVisible && (
              <button 
                className="hide-chat-btn"
                onClick={() => setIsChatVisible(false)}
                title="Hide Chat"
              >
                ✕
              </button>
            )}
          </>
        ) : currentPage === '交友' ? (
          <SocialPage />
        ) : currentPage === '品牌价格监控' ? (
          <BrandMonitorPage />
        ) : currentPage === '偏好设置' ? (
          <PreferenceMonitorPage />
        ) : null}
      </main>

      {/* Background Decorations */}
      <div className="bg-decoration bg-1"></div>
      <div className="bg-decoration bg-2"></div>
      <div className="bg-decoration bg-3"></div>
    </div>
  );
}

export default StyleistInterface;
