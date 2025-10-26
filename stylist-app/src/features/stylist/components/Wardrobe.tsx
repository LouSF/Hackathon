
import { useState } from 'react';
import './Wardrobe.css';
import OutfitRecommendationModal from './OutfitRecommendationModal';

interface WardrobeItem {
  id: string;
  name: string;
  type: 'clothing' | 'accessory';
  position: { top: string; left: string };
  color: string;
}

interface OutfitItem {
  id: string;
  name: string;
  category: string;
  color: string;
  rating: number;
}

const wardrobeItems: WardrobeItem[] = [
  { id: '1', name: 'JACKET ZONE', type: 'clothing', position: { top: '12%', left: '8%' }, color: '#8B7355' },
  { id: '2', name: 'KNITWEAR SHELF', type: 'clothing', position: { top: '28%', left: '68%' }, color: '#D4A5A5' },
  { id: '3', name: 'ACCESSORY HOOK', type: 'accessory', position: { top: '68%', left: '8%' }, color: '#C9A876' },
  { id: '4', name: 'TROUSER RACK', type: 'clothing', position: { top: '55%', left: '65%' }, color: '#6B5344' },
];

const outfitItems: OutfitItem[] = [
  { id: '1', name: 'Beige Linen Shirt', category: 'Top', color: '#E8D5C4', rating: 5 },
  { id: '2', name: 'Charcoal Trousers', category: 'Bottom', color: '#4A4A4A', rating: 5 },
  { id: '3', name: 'Brown Leather Belt', category: 'Accessory', color: '#8B6F47', rating: 4 },
  { id: '4', name: 'White Sneakers', category: 'Footwear', color: '#F5F5F5', rating: 4 },
];

function Wardrobe() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [hoveredOutfitItem, setHoveredOutfitItem] = useState<string | null>(null);
  const [showOutfitPanel, setShowOutfitPanel] = useState(true);

  const handleLabelClick = (itemId: string) => {
    setSelectedItem(itemId);
    setShowRecommendationModal(true);
  };

  const handleCloseModal = () => {
    setShowRecommendationModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="wardrobe-section">
      {/* Outfit Recommendation Background */}
      {showOutfitPanel && (
        <div className="outfit-background">
          <div className="outfit-background-header">
            <div className="recommendation-label">DAILY OUTFIT RECOMMENDATION</div>
            <button 
              className="outfit-panel-close-btn"
              onClick={() => setShowOutfitPanel(false)}
              title="Hide Panel"
            >
              ✕
            </button>
          </div>
        
        <div className="outfit-background-items">
          {outfitItems.map((item) => (
            <div
              key={item.id}
              className={`outfit-bg-item ${hoveredOutfitItem === item.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredOutfitItem(item.id)}
              onMouseLeave={() => setHoveredOutfitItem(null)}
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
      </div>
      )}

      {/* Show Outfit Panel Button when hidden */}
      {!showOutfitPanel && (
        <button 
          className="show-outfit-panel-btn"
          onClick={() => setShowOutfitPanel(true)}
          title="Show Daily Outfit"
        >
          👔
        </button>
      )}

      {/* Blurred Background */}
      <div className="wardrobe-background">
        <div className="wardrobe-item-bg wardrobe-item-bg-1"></div>
        <div className="wardrobe-item-bg wardrobe-item-bg-2"></div>
        <div className="wardrobe-item-bg wardrobe-item-bg-3"></div>
        <div className="wardrobe-item-bg wardrobe-item-bg-4"></div>
      </div>

      {/* Model */}
      <div className="model-area">
        <div className="model-container">
          <div className="model-silhouette">
            {/* Head */}
            <div className="model-head"></div>
            
            {/* Outfit Display - Today's Recommendation */}
            <div className="model-outfit">
              {/* Top */}
              <div className="outfit-top" style={{ backgroundColor: '#E8D5C4' }}>
                <div className="top-pattern"></div>
              </div>
              
              {/* Bottom */}
              <div className="outfit-bottom" style={{ backgroundColor: '#4A4A4A' }}>
                <div className="bottom-pattern"></div>
              </div>
            </div>
          </div>

          {/* Outfit Details Badge - Now opens modal */}
          <div className="outfit-badge" onClick={() => handleLabelClick('outfit')}>
            <div className="badge-icon">👔</div>
            <div className="badge-text">
              <div className="badge-title">Smart Casual</div>
              <div className="badge-subtitle">View Details</div>
            </div>
            <div className="badge-arrow">›</div>
          </div>
        </div>
      </div>

      {/* Labels */}
      {wardrobeItems.map((item) => (
        <div
          key={item.id}
          className={`wardrobe-label ${selectedItem === item.id ? 'selected' : ''}`}
          style={{
            top: item.position.top,
            left: item.position.left,
          }}
          onClick={() => handleLabelClick(item.id)}
        >
          <span className="label-text">{item.name}</span>
          {selectedItem === item.id && <span className="label-check">✓</span>}
        </div>
      ))}

      {/* Annotation Lines */}
      <svg className="annotation-lines" viewBox="0 0 350 500" preserveAspectRatio="none">
        {/* Line to jacket zone */}
        <line x1="80" y1="80" x2="100" y2="120" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3,3" />
        {/* Line to knitwear shelf */}
        <line x1="250" y1="150" x2="240" y2="180" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3,3" />
        {/* Line to trouser rack */}
        <line x1="260" y1="300" x2="240" y2="280" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3,3" />
        {/* Line to accessory hook */}
        <line x1="60" y1="380" x2="80" y2="350" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3,3" />
      </svg>

      {/* Outfit Recommendation Modal */}
      <OutfitRecommendationModal
        isOpen={showRecommendationModal}
        selectedItemId={selectedItem}
        wardrobeItems={wardrobeItems}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Wardrobe;
