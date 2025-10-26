
import React, { useState, useEffect, useRef } from 'react';
import './AIChat.css';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface AIChatProps {
  onSendFeedback: (message: string) => Promise<void>;
  isLoading: boolean;
}

const initialMessages = [
  {
    text: "Hey! 👋 I'm your AI Stylist. I've analyzed your wardrobe and prepared today's outfit suggestion based on the weather and your style preferences!",
    isUser: false,
  },
  {
    text: "This morning it's 18°C with partly cloudy skies, so I've paired a comfortable linen shirt with charcoal trousers - perfect for a casual office or outdoor activities.",
    isUser: false,
  },
  {
    text: "Not quite right? Tell me what you're looking for!",
    isUser: false,
  },
];

function AIChat({ onSendFeedback, isLoading }: AIChatProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text, isUser: true }]);

    // Call the parent handler
    await onSendFeedback(text);

    // Simulate AI responses based on user input
    setTimeout(() => {
      let aiResponse = "I'll adjust your recommendation based on that feedback!";
      
      if (text.toLowerCase().includes('warm') || text.toLowerCase().includes('hot')) {
        aiResponse = "Got it! Let me suggest lighter fabrics. How about a breathable cotton shirt with linen shorts instead?";
      } else if (text.toLowerCase().includes('cool') || text.toLowerCase().includes('cold')) {
        aiResponse = "Perfect! I'll add a warm layer. How about adding that cozy wool cardigan with the outfit?";
      } else if (text.toLowerCase().includes('casual')) {
        aiResponse = "Great choice! Let me swap the trousers for comfortable jeans. Much more casual vibe! 😊";
      } else if (text.toLowerCase().includes('formal') || text.toLowerCase().includes('work')) {
        aiResponse = "Absolutely! Let me suggest a structured blazer with those trousers for a more professional look.";
      } else if (text.toLowerCase().includes('color')) {
        aiResponse = "I have several color options in your wardrobe! Do you prefer earth tones, pastels, or darker colors for today?";
      } else if (text.toLowerCase().includes('thank')) {
        aiResponse = "You're welcome! Have a great day and enjoy your outfit! 🌟";
      }

      setMessages((prev) => [
        ...prev,
        {
          text: aiResponse,
          isUser: false,
        },
      ]);
    }, 800);
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} text={msg.text} isUser={msg.isUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}

export default AIChat;
