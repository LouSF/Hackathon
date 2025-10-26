import { useState, useEffect, useRef } from 'react';
import './SocialPage.css';

interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  interests: string[];
  bio: string;
  age: number;
  style: string;
  online: boolean;
  coverImage: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: '小雨',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Xiaoyu',
    location: '上海',
    interests: ['街头风', '复古', '运动'],
    bio: '热爱时尚，喜欢分享穿搭心得 ✨',
    age: 25,
    style: '休闲街头',
    online: true,
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop',
  },
  {
    id: '2',
    name: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    location: '北京',
    interests: ['极简主义', '商务', '配饰'],
    bio: '简约而不简单，追求品质生活',
    age: 28,
    style: '商务简约',
    online: true,
    coverImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&h=1200&fit=crop',
  },
  {
    id: '3',
    name: '莉莉',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily',
    location: '广州',
    interests: ['甜美', '韩系', '色彩搭配'],
    bio: '甜系女孩 | 热爱粉色和蕾丝 💕',
    age: 23,
    style: '甜美可爱',
    online: false,
    coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1200&fit=crop',
  },
  {
    id: '4',
    name: '大卫',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    location: '深圳',
    interests: ['运动', '潮牌', '球鞋'],
    bio: '球鞋收藏家 | 运动潮流爱好者 👟',
    age: 26,
    style: '运动潮流',
    online: true,
    coverImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1200&fit=crop',
  },
  {
    id: '5',
    name: '艾米',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amy',
    location: '杭州',
    interests: ['文艺', '复古', '手工'],
    bio: '文艺青年，喜欢vintage和手作 🌿',
    age: 27,
    style: '文艺复古',
    online: false,
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1200&fit=crop',
  },
  {
    id: '6',
    name: '杰克',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    location: '成都',
    interests: ['机能风', '户外', '暗黑'],
    bio: '机能风格狂热者 | 户外探险家 ⛰️',
    age: 29,
    style: '机能暗黑',
    online: true,
    coverImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=1200&fit=crop',
  },
];

function SocialPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentUser = mockUsers[currentIndex];
  const nextUser = mockUsers[(currentIndex + 1) % mockUsers.length];
  const prevUser = mockUsers[(currentIndex - 1 + mockUsers.length) % mockUsers.length];

  const handleConnect = (user: User) => {
    alert(`已向 ${user.name} 发送好友请求！`);
  };

  const handleLike = () => {
    alert(`喜欢 ${currentUser.name}！`);
    goToNext();
  };

  const handlePass = () => {
    goToNext();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockUsers.length);
    setDeltaY(0);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockUsers.length) % mockUsers.length);
    setDeltaY(0);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientY - startY;
    setDeltaY(delta);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(deltaY) > 100) {
      if (deltaY > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      setDeltaY(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartY(e.clientY);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientY - startY;
    setDeltaY(delta);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(deltaY) > 100) {
      if (deltaY > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      setDeltaY(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex]);

  return (
    <div 
      className="social-swipe-page"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top indicators */}
      <div className="page-indicators">
        <div className="indicator-title">时尚交友</div>
        <div className="user-counter">
          {currentIndex + 1} / {mockUsers.length}
        </div>
      </div>

      {/* Card Stack */}
      <div className="card-stack">
        {/* Previous Card (hint) */}
        {deltaY > 50 && (
          <div className="stack-card prev-card">
            <div className="card-background" style={{ backgroundImage: `url(${prevUser.coverImage})` }}>
              <div className="card-overlay"></div>
            </div>
          </div>
        )}

        {/* Current Card */}
        <div 
          className="stack-card current-card"
          style={{
            transform: `translateY(${deltaY}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          <div className="card-background" style={{ backgroundImage: `url(${currentUser.coverImage})` }}>
            <div className="card-overlay"></div>
          </div>

          <div className="card-content">
            {/* User Info */}
            <div className="user-info-section">
              <div className="user-header">
                <div className="user-main-info">
                  <h1 className="user-display-name">{currentUser.name}</h1>
                  <p className="user-age-location">{currentUser.age}岁 • {currentUser.location}</p>
                </div>
                {currentUser.online && <span className="online-status">在线</span>}
              </div>

              <p className="user-bio-text">{currentUser.bio}</p>

              <div className="user-style-tag">
                <span className="style-icon">✨</span>
                <span>{currentUser.style}</span>
              </div>

              <div className="user-interests-tags">
                {currentUser.interests.map((interest, idx) => (
                  <span key={idx} className="interest-chip">{interest}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button className="action-btn pass-btn" onClick={handlePass}>
                  <span className="btn-icon">✕</span>
                </button>
                <button className="action-btn info-btn" onClick={() => setShowDetail(true)}>
                  <span className="btn-icon">ℹ️</span>
                </button>
                <button className="action-btn like-btn" onClick={handleLike}>
                  <span className="btn-icon">❤️</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Card (hint) */}
        {deltaY < -50 && (
          <div className="stack-card next-card">
            <div className="card-background" style={{ backgroundImage: `url(${nextUser.coverImage})` }}>
              <div className="card-overlay"></div>
            </div>
          </div>
        )}
      </div>

      {/* Swipe Hint */}
      <div className="swipe-hint">
        <div className="hint-icon">↕️</div>
        <div className="hint-text">上下滑动切换</div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="detail-modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="detail-close-btn" onClick={() => setShowDetail(false)}>✕</button>
            
            <div className="detail-header">
              <img src={currentUser.avatar} alt={currentUser.name} className="detail-avatar" />
              <h2 className="detail-name">{currentUser.name}</h2>
              <p className="detail-location">📍 {currentUser.location}</p>
            </div>

            <div className="detail-body">
              <div className="detail-section">
                <h4>个人简介</h4>
                <p>{currentUser.bio}</p>
              </div>

              <div className="detail-section">
                <h4>基本信息</h4>
                <div className="info-row">
                  <span className="info-label">年龄</span>
                  <span className="info-value">{currentUser.age}岁</span>
                </div>
                <div className="info-row">
                  <span className="info-label">风格</span>
                  <span className="info-value">{currentUser.style}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>兴趣爱好</h4>
                <div className="detail-interests">
                  {currentUser.interests.map((interest, idx) => (
                    <span key={idx} className="detail-interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail-footer">
              <button className="detail-connect-btn" onClick={() => {
                handleConnect(currentUser);
                setShowDetail(false);
              }}>
                💬 发送好友请求
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialPage;
