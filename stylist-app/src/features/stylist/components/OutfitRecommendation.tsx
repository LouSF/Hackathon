
import React, { useState } from 'react';
import './OutfitRecommendation.css';

interface OutfitItem {
  id: string;
  name: string;
  category: string;
  color: string;
  rating: number;
}

const outfitItems: OutfitItem[] = [
  { id: '1', name: 'Beige Linen Shirt', category: 'Top', color: '#E8D5C4', rating: 5 },
  { id: '2', name: 'Charcoal Trousers', category: 'Bottom', color: '#4A4A4A', rating: 5 },
  { id: '3', name: 'Brown Leather Belt', category: 'Accessory', color: '#8B6F47', rating: 4 },
  { id: '4', name: 'White Sneakers', category: 'Footwear', color: '#F5F5F5', rating: 4 },
];

function OutfitRecommendation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="outfit-recommendation">
      <div className="recommendation-label">DAILY OUTFIT RECOMMENDATION</div>
      
      <div className="outfit-items-list">
        {outfitItems.map((item) => (
          <div
            key={item.id}
            className={`outfit-item ${hoveredItem === item.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="item-color-swatch" style={{ backgroundColor: item.color }}></div>
            
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="item-category">{item.category}</div>
            </div>

            <div className="item-rating">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className={`star ${idx < item.rating ? 'filled' : 'empty'}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="recommendation-actions">
        <button className="action-btn like-btn">♥ Like This Look</button>
        <button className="action-btn refresh-btn">🔄 Refresh</button>
      </div>
    </div>
  );
}

export default OutfitRecommendation;
