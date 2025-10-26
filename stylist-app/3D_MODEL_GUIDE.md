# 3D数字人模型使用指南

## 模型文件
- **文件名**: `td-1.glb`
- **位置**: `/public/td-1.glb`
- **格式**: GLB (GL Transmission Format Binary)

## 功能特性

### 🎨 视觉效果
- **高质量3D模型**：使用GLB格式的专业3D模型
- **实时光照**：多光源系统（环境光、定向光、点光源、聚光灯）
- **环境映射**：Studio预设环境，提供真实的反射和光照
- **接触阴影**：地面投影，增强真实感
- **抗锯齿**：平滑的边缘显示

### 🖱️ 交互功能
- **拖拽旋转**：鼠标左键拖动360度查看模型
- **缩放**：鼠标滚轮放大缩小（2.5-6单位距离）
- **轻微动画**：模型会轻微摇摆和上下浮动，更有生命力

### ⚡ 性能优化
- **懒加载**：使用Suspense异步加载模型
- **预加载**：useGLTF.preload预加载模型文件
- **加载占位符**：加载时显示简单的3D盒子作为占位

## 技术实现

### 核心组件
```
Avatar3D.tsx
├── Canvas (Three.js画布)
├── 光照系统
│   ├── ambientLight (环境光)
│   ├── directionalLight (定向光，带阴影)
│   ├── pointLight (点光源)
│   ├── spotLight (聚光灯)
│   └── Environment (环境映射)
├── AvatarModel (3D模型)
│   └── 轻微动画效果
├── ContactShadows (接触阴影)
└── OrbitControls (相机控制)
```

### 使用方法

在组件中导入并使用：

```tsx
import Avatar3D from './Avatar3D';

<Avatar3D modelPath="/td-1.glb" />
```

### 自定义配置

#### 更换模型文件
```tsx
<Avatar3D modelPath="/your-model.glb" />
```

#### 调整模型大小和位置
在 `Avatar3D.tsx` 中修改：
```tsx
<primitive object={scene} scale={1.5} position={[0, -1, 0]} />
```

#### 修改相机设置
```tsx
<Canvas camera={{ position: [x, y, z], fov: 视野角度 }}>
```

#### 调整控制范围
```tsx
<OrbitControls
  minDistance={2.5}  // 最小距离
  maxDistance={6}     // 最大距离
  maxPolarAngle={Math.PI / 2}  // 最大仰角
/>
```

## 响应式设计

### 桌面端（>768px）
- 模型容器高度：550px
- 最小高度：600px

### 平板端（768px以下）
- 模型容器高度：450px
- 最小高度：500px

### 移动端（480px以下）
- 模型容器高度：380px
- 最小高度：400px

## 样式定制

### 背景效果
```css
.model-3d-wrapper {
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}
```

### 鼠标交互提示
- 默认：grab（抓手图标）
- 拖拽中：grabbing（抓取中图标）

## 模型要求

如果要使用自己的GLB模型，请确保：
1. **格式**：GLB (推荐) 或 GLTF
2. **大小**：建议小于10MB以保证加载速度
3. **中心点**：模型应该以原点(0,0,0)为中心
4. **朝向**：模型正面应朝向Z轴负方向
5. **比例**：合适的单位尺寸（可通过scale调整）

## 故障排查

### 模型不显示
1. 检查文件路径是否正确（应在public文件夹）
2. 检查文件格式是否为GLB/GLTF
3. 查看浏览器控制台是否有加载错误

### 模型太大/太小
调整 `scale` 参数：
```tsx
<primitive object={scene} scale={你的值} />
```

### 模型位置不对
调整 `position` 参数：
```tsx
<primitive object={scene} position={[x, y, z]} />
```

### 性能问题
1. 优化GLB文件大小
2. 降低阴影质量（修改shadow-mapSize）
3. 减少光源数量

## 扩展功能建议

### 未来可添加
- 服装换装系统
- 点击模型部位显示详情
- 自动旋转展示模式
- 多角度预设视图
- 截图/分享功能
- 动画播放（如果模型包含动画）

## 相关文件

- `Avatar3D.tsx` - 3D模型组件
- `Wardrobe.tsx` - 使用3D模型的主组件
- `Wardrobe.css` - 样式定义
- `/public/td-1.glb` - 3D模型文件

