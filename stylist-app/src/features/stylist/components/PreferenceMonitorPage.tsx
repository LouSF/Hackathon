import { useState } from 'react';
import './PreferenceMonitorPage.css';

interface Preference {
  id: string;
  category: string;
  name: string;
  icon: string;
  enabled: boolean;
  priority: 'high' | 'medium' | 'low';
  keywords: string[];
}

const mockPreferences: Preference[] = [
  {
    id: '1',
    category: '风格偏好',
    name: '极简主义',
    icon: '🎨',
    enabled: true,
    priority: 'high',
    keywords: ['简约', '基础款', '纯色', '百搭'],
  },
  {
    id: '2',
    category: '风格偏好',
    name: '街头潮流',
    icon: '🛹',
    enabled: true,
    priority: 'medium',
    keywords: ['oversize', '潮牌', '联名', '限量'],
  },
  {
    id: '3',
    category: '颜色偏好',
    name: '黑白灰色系',
    icon: '⚫',
    enabled: true,
    priority: 'high',
    keywords: ['黑色', '白色', '灰色', '中性色'],
  },
  {
    id: '4',
    category: '颜色偏好',
    name: '大地色系',
    icon: '🟤',
    enabled: true,
    priority: 'medium',
    keywords: ['棕色', '卡其', '米色', '驼色'],
  },
  {
    id: '5',
    category: '单品偏好',
    name: '运动鞋',
    icon: '👟',
    enabled: true,
    priority: 'high',
    keywords: ['跑鞋', '球鞋', '休闲鞋', '运动鞋'],
  },
  {
    id: '6',
    category: '单品偏好',
    name: '外套',
    icon: '🧥',
    enabled: true,
    priority: 'medium',
    keywords: ['大衣', '夹克', '风衣', '羽绒服'],
  },
  {
    id: '7',
    category: '品牌偏好',
    name: 'Nike',
    icon: '✔️',
    enabled: true,
    priority: 'high',
    keywords: ['Nike', '耐克', 'Air Jordan'],
  },
  {
    id: '8',
    category: '品牌偏好',
    name: 'Uniqlo',
    icon: '🏪',
    enabled: true,
    priority: 'low',
    keywords: ['优衣库', 'Uniqlo', 'UT'],
  },
  {
    id: '9',
    category: '价格偏好',
    name: '中等价位',
    icon: '💵',
    enabled: true,
    priority: 'medium',
    keywords: ['500-1500', '中端', '性价比'],
  },
  {
    id: '10',
    category: '场景偏好',
    name: '日常通勤',
    icon: '💼',
    enabled: true,
    priority: 'high',
    keywords: ['商务', '通勤', '办公', '正式'],
  },
];

function PreferenceMonitorPage() {
  const [preferences, setPreferences] = useState<Preference[]>(mockPreferences);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [editingPreference, setEditingPreference] = useState<Preference | null>(null);

  const categories = ['全部', '风格偏好', '颜色偏好', '单品偏好', '品牌偏好', '价格偏好', '场景偏好'];

  const filteredPreferences = selectedCategory === '全部'
    ? preferences
    : preferences.filter(p => p.category === selectedCategory);

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p)
    );
  };

  const updatePriority = (id: string, priority: 'high' | 'medium' | 'low') => {
    setPreferences(prev =>
      prev.map(p => p.id === id ? { ...p, priority } : p)
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#999';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高优先级';
      case 'medium': return '中优先级';
      case 'low': return '低优先级';
      default: return '';
    }
  };

  const enabledCount = preferences.filter(p => p.enabled).length;

  return (
    <div className="preference-monitor-page">
      <div className="preference-header">
        <h1 className="page-title">偏好设置</h1>
        <p className="page-subtitle">个性化您的时尚推荐</p>
      </div>

      {/* Stats */}
      <div className="preference-stats">
        <div className="pref-stat-card">
          <div className="pref-stat-icon">⭐</div>
          <div className="pref-stat-content">
            <div className="pref-stat-value">{enabledCount}</div>
            <div className="pref-stat-label">已启用偏好</div>
          </div>
        </div>
        <div className="pref-stat-card">
          <div className="pref-stat-icon">🎯</div>
          <div className="pref-stat-content">
            <div className="pref-stat-value">
              {preferences.filter(p => p.priority === 'high' && p.enabled).length}
            </div>
            <div className="pref-stat-label">高优先级</div>
          </div>
        </div>
        <div className="pref-stat-card">
          <div className="pref-stat-icon">📌</div>
          <div className="pref-stat-content">
            <div className="pref-stat-value">{preferences.length}</div>
            <div className="pref-stat-label">总偏好数</div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Preferences Grid */}
      <div className="preferences-grid">
        {filteredPreferences.map((pref) => (
          <div key={pref.id} className={`preference-card ${!pref.enabled ? 'disabled' : ''}`}>
            <div className="pref-card-header">
              <div className="pref-icon">{pref.icon}</div>
              <div className="pref-toggle">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={pref.enabled}
                    onChange={() => togglePreference(pref.id)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="pref-card-body">
              <div className="pref-category-label">{pref.category}</div>
              <h3 className="pref-name">{pref.name}</h3>

              <div className="priority-selector">
                <span className="priority-label">优先级:</span>
                <div className="priority-buttons">
                  {(['high', 'medium', 'low'] as const).map((priority) => (
                    <button
                      key={priority}
                      className={`priority-btn ${pref.priority === priority ? 'active' : ''}`}
                      style={{
                        borderColor: pref.priority === priority ? getPriorityColor(priority) : '#ddd',
                        backgroundColor: pref.priority === priority ? getPriorityColor(priority) : 'transparent',
                        color: pref.priority === priority ? 'white' : '#999',
                      }}
                      onClick={() => updatePriority(pref.id, priority)}
                      disabled={!pref.enabled}
                    >
                      {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="keywords-section">
                <span className="keywords-label">关键词:</span>
                <div className="keywords-list">
                  {pref.keywords.map((keyword, idx) => (
                    <span key={idx} className="keyword-tag">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pref-card-footer">
              <button
                className="edit-pref-btn"
                onClick={() => setEditingPreference(pref)}
                disabled={!pref.enabled}
              >
                ⚙️ 编辑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPreference && (
        <div className="modal-overlay" onClick={() => setEditingPreference(null)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditingPreference(null)}>✕</button>
            
            <div className="edit-modal-header">
              <div className="edit-icon">{editingPreference.icon}</div>
              <h2 className="edit-title">编辑偏好</h2>
            </div>

            <div className="edit-modal-body">
              <div className="edit-field">
                <label className="field-label">偏好名称</label>
                <input
                  type="text"
                  className="field-input"
                  value={editingPreference.name}
                  readOnly
                />
              </div>

              <div className="edit-field">
                <label className="field-label">类别</label>
                <input
                  type="text"
                  className="field-input"
                  value={editingPreference.category}
                  readOnly
                />
              </div>

              <div className="edit-field">
                <label className="field-label">优先级</label>
                <div className="priority-info" style={{ color: getPriorityColor(editingPreference.priority) }}>
                  {getPriorityLabel(editingPreference.priority)}
                </div>
              </div>

              <div className="edit-field">
                <label className="field-label">关键词</label>
                <div className="keywords-display">
                  {editingPreference.keywords.map((keyword, idx) => (
                    <span key={idx} className="keyword-chip">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="edit-modal-footer">
              <button className="save-btn" onClick={() => setEditingPreference(null)}>
                保存设置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreferenceMonitorPage;

