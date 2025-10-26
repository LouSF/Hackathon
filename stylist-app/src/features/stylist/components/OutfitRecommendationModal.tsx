
import React from 'react';
import './OutfitRecommendationModal.css';

interface OutfitItem {
  id: string;
  name: string;
  category: string;
  color: string;
  rating: number;
}

interface WardrobeItem {
  id: string;
  name: string;
  type: 'clothing' | 'accessory';
  position: { top: string; left: string };
  color: string;
}

interface OutfitRecommendationModalProps {
  isOpen: boolean;
  selectedItemId: string | null;
  wardrobeItems: WardrobeItem[];
  onClose: () => void;
}

const outfitItems: OutfitItem[] = [
  { id: '1', name: 'Beige Linen Shirt', category: 'Top', color: '#E8D5C4', rating: 5 },
  { id: '2', name: 'Charcoal Trousers', category: 'Bottom', color: '#4A4A4A', rating: 5 },
  { id: '3', name: 'Brown Leather Belt', category: 'Accessory', color: '#8B6F47', rating: 4 },
  { id: '4', name: 'White Sneakers', category: 'Footwear', color: '#F5F5F5', rating: 4 },
];

function OutfitRecommendationModal({
  isOpen,
  selectedItemId,
  wardrobeItems,
  onClose,
}: OutfitRecommendationModalProps) {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const getModalTitle = (): string => {
    if (selectedItemId === 'outfit') {
      return 'Today\'s Smart Casual Outfit';
    }
    const item = wardrobeItems.find((w) => w.id === selectedItemId);
    return item ? `${item.name} Details` : 'Outfit Recommendation';
  };

  const getFilteredItems = (): OutfitItem[] => {
    if (selectedItemId === 'outfit') return outfitItems;
    if (selectedItemId === '1') return outfitItems.filter((i) => i.category === 'Top');
    if (selectedItemId === '2') return outfitItems.filter((i) => i.category === 'Top');
    if (selectedItemId === '3') return outfitItems.filter((i) => i.category === 'Accessory');
    if (selectedItemId === '4') return outfitItems.filter((i) => i.category === 'Bottom');
    return outfitItems;
  };

  const filteredItems = getFilteredItems();

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="outfit-recommendation-modal">
        <div className="modal-header">
          <h2 className="modal-title">{getModalTitle()}</h2>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="outfit-items-list">
            {filteredItems.map((item) => (
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
        </div>

        <div className="modal-actions">
          <button className="action-btn like-btn">♥ Like This Look</button>
          <button className="action-btn refresh-btn">🔄 Refresh</button>
          <button className="action-btn close-action-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default OutfitRecommendationModal;
