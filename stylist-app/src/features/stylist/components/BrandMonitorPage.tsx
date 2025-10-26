import { useState } from 'react';
import './BrandMonitorPage.css';

interface BrandItem {
  id: string;
  brand: string;
  itemName: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  targetPrice: number;
  discount: number;
  priceHistory: { date: string; price: number }[];
  inStock: boolean;
}

const mockBrandItems: BrandItem[] = [
  {
    id: '1',
    brand: 'Nike',
    itemName: 'Air Jordan 1 High OG',
    image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Nike+Jordan',
    currentPrice: 1299,
    originalPrice: 1499,
    targetPrice: 1100,
    discount: 13,
    priceHistory: [
      { date: '2025-10-20', price: 1499 },
      { date: '2025-10-22', price: 1399 },
      { date: '2025-10-26', price: 1299 },
    ],
    inStock: true,
  },
  {
    id: '2',
    brand: 'Adidas',
    itemName: 'Ultraboost 22 跑鞋',
    image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Adidas',
    currentPrice: 899,
    originalPrice: 1299,
    targetPrice: 800,
    discount: 31,
    priceHistory: [
      { date: '2025-10-18', price: 1299 },
      { date: '2025-10-21', price: 999 },
      { date: '2025-10-26', price: 899 },
    ],
    inStock: true,
  },
  {
    id: '3',
    brand: 'Uniqlo',
    itemName: '羊毛混纺大衣',
    image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Uniqlo',
    currentPrice: 799,
    originalPrice: 999,
    targetPrice: 700,
    discount: 20,
    priceHistory: [
      { date: '2025-10-15', price: 999 },
      { date: '2025-10-20', price: 899 },
      { date: '2025-10-26', price: 799 },
    ],
    inStock: true,
  },
  {
    id: '4',
    brand: 'Zara',
    itemName: '真皮西装外套',
    image: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Zara',
    currentPrice: 1599,
    originalPrice: 1899,
    targetPrice: 1400,
    discount: 16,
    priceHistory: [
      { date: '2025-10-10', price: 1899 },
      { date: '2025-10-18', price: 1699 },
      { date: '2025-10-26', price: 1599 },
    ],
    inStock: false,
  },
];

function BrandMonitorPage() {
  const [items] = useState<BrandItem[]>(mockBrandItems);
  const [selectedItem, setSelectedItem] = useState<BrandItem | null>(null);

  const handleSetAlert = (item: BrandItem) => {
    alert(`已为「${item.itemName}」设置价格提醒！\n当价格低于 ¥${item.targetPrice} 时会通知您。`);
  };

  return (
    <div className="brand-monitor-page">
      <div className="brand-header">
        <h1 className="page-title">品牌价格监控</h1>
        <p className="page-subtitle">实时追踪心仪单品价格变化</p>
      </div>

      <div className="monitor-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{items.length}</div>
            <div className="stat-label">监控中</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <div className="stat-value">
              {items.filter(item => item.currentPrice <= item.targetPrice).length}
            </div>
            <div className="stat-label">达到目标价</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">
              {Math.round(items.reduce((sum, item) => sum + (item.originalPrice - item.currentPrice), 0))}
            </div>
            <div className="stat-label">已节省(¥)</div>
          </div>
        </div>
      </div>

      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="brand-item-card">
            <div className="item-image-container">
              <img src={item.image} alt={item.itemName} className="item-image" />
              {item.discount > 0 && (
                <div className="discount-badge">-{item.discount}%</div>
              )}
              {!item.inStock && <div className="out-of-stock-badge">缺货</div>}
            </div>

            <div className="item-content">
              <div className="brand-name">{item.brand}</div>
              <h3 className="item-name">{item.itemName}</h3>

              <div className="price-section">
                <div className="current-price">¥{item.currentPrice}</div>
                <div className="original-price">¥{item.originalPrice}</div>
              </div>

              <div className="target-price-section">
                <span className="target-label">目标价格:</span>
                <span className="target-value">¥{item.targetPrice}</span>
                {item.currentPrice <= item.targetPrice && (
                  <span className="reached-badge">✓ 已达到</span>
                )}
              </div>

              <div className="price-trend">
                <span className="trend-label">价格趋势:</span>
                <div className="trend-line">
                  {item.priceHistory.map((record, idx) => (
                    <div
                      key={idx}
                      className="trend-point"
                      style={{
                        height: `${(record.price / item.originalPrice) * 100}%`,
                      }}
                      title={`${record.date}: ¥${record.price}`}
                    />
                  ))}
                </div>
              </div>

              <div className="item-actions">
                <button
                  className="view-detail-btn"
                  onClick={() => setSelectedItem(item)}
                >
                  查看详情
                </button>
                <button
                  className="set-alert-btn"
                  onClick={() => handleSetAlert(item)}
                >
                  🔔 设置提醒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            
            <div className="modal-image-section">
              <img src={selectedItem.image} alt={selectedItem.itemName} className="modal-image" />
            </div>

            <div className="modal-content">
              <div className="modal-brand">{selectedItem.brand}</div>
              <h2 className="modal-item-name">{selectedItem.itemName}</h2>
              
              <div className="modal-price-section">
                <div className="modal-current-price">¥{selectedItem.currentPrice}</div>
                <div className="modal-original-price">原价: ¥{selectedItem.originalPrice}</div>
                <div className="modal-discount-badge">省 ¥{selectedItem.originalPrice - selectedItem.currentPrice}</div>
              </div>

              <div className="price-history-section">
                <h4 className="history-title">价格历史</h4>
                <div className="history-list">
                  {selectedItem.priceHistory.map((record, idx) => (
                    <div key={idx} className="history-item">
                      <span className="history-date">{record.date}</span>
                      <span className="history-price">¥{record.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="modal-alert-btn" onClick={() => handleSetAlert(selectedItem)}>
                  🔔 设置价格提醒
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrandMonitorPage;

