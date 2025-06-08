# zx-radio 组件变更日志

## v2.0.0 (2024-12-19)

### 🚀 重大更新

#### 完全重构，符合 uni-app 官方标准
- **API 标准化**: 完全按照 [uni-app 官方 radio 组件文档](https://uniapp.dcloud.net.cn/component/radio.html) 重新设计 API
- **组件架构**: 重构组件架构，优化性能和可维护性
- **类型支持**: 增强 TypeScript 类型定义

### ✨ 新特性

#### 1. 标准化属性支持
- `color`: radio 的颜色，同 css 的 color
- `backgroundColor`: radio 默认的背景颜色  
- `borderColor`: radio 默认的边框颜色
- `activeBackgroundColor`: radio 选中时的背景颜色，优先级大于 color 属性
- `activeBorderColor`: radio 选中时的边框颜色
- `iconColor`: radio 的图标颜色

#### 2. 改进的单选逻辑
- **正确的单选行为**: 在 radio-group 中，已选中的 radio 不能通过点击取消选中
- **标准事件格式**: change 事件参数符合 uni-app 官方格式 `{ value }`
- **双向绑定支持**: 完整支持 v-model 绑定

#### 3. 优化的样式系统
- **标准圆形样式**: 采用标准的圆形 radio 外观，替代原来的 checkbox 样式
- **CSS-in-JS**: 使用计算属性动态生成样式，性能更好
- **响应式设计**: 支持不同尺寸和自适应布局

#### 4. 改进的组件通信
- **Provide/Inject**: 使用 Vue 3 标准的 provide/inject 机制
- **生命周期管理**: 正确处理组件注册和销毁
- **实时同步**: 父子组件状态实时同步

### 🔧 优化改进

#### 1. 性能优化
- **计算属性**: 大量使用计算属性，减少不必要的重新渲染
- **事件优化**: 简化事件处理逻辑，提高响应速度
- **内存管理**: 正确清理组件引用，避免内存泄漏

#### 2. 代码质量
- **TypeScript**: 全面的类型定义和类型检查
- **代码结构**: 清晰的代码组织和注释
- **最佳实践**: 遵循 Vue 3 和 uni-app 最佳实践

#### 3. 用户体验
- **无障碍访问**: 支持 ARIA 标签和键盘导航
- **动画效果**: 平滑的过渡动画
- **触摸友好**: 优化移动端触摸体验

### 🔄 zx-radio-group 配套优化

#### 1. 简化 API
- **精简属性**: 移除冗余属性，专注核心功能
- **标准化**: 符合 uni-app radio-group 标准
- **布局控制**: placement 属性控制水平/垂直布局

#### 2. 改进通信机制
- **统一管理**: 集中管理所有子 radio 组件
- **状态同步**: 实时同步选中状态
- **事件传递**: 标准化事件传递机制

### 📋 破坏性变更

#### 1. 属性变更
- ❌ 移除 `label` 属性（使用 slot 内容替代）
- ❌ 移除 `parameter` 属性（简化事件参数）
- ❌ 移除 `defaultClass` 和 `checkedClass`（使用内置样式）
- ✅ 新增 `color` 属性
- ✅ 重新定义 `size` 属性（单位改为 px）

#### 2. 事件变更
- ❌ 移除 `update:checked` 事件（单独使用时仍支持 v-model:checked）
- ✅ `change` 事件参数改为 `{ value, checked }`（单独使用）或 `{ value }`（radio-group 中）

#### 3. 样式变更
- ❌ 移除基于 icon 的实现
- ✅ 使用原生 CSS 实现圆形 radio 样式
- ✅ 改进的禁用状态样式

### 🔧 迁移指南

#### 从 v1.x 迁移到 v2.0

1. **更新属性名**:
   ```vue
   <!-- v1.x -->
   <zx-radio label="选项1" size="38" />
   
   <!-- v2.0 -->
   <zx-radio value="option1" :size="20">选项1</zx-radio>
   ```

2. **更新事件处理**:
   ```vue
   <!-- v1.x -->
   <zx-radio @change="(status, params, value) => handle(value)" />
   
   <!-- v2.0 -->
   <zx-radio @change="(e) => handle(e.value)" />
   ```

3. **更新样式配置**:
   ```vue
   <!-- v1.x -->
   <zx-radio 
     :checkedClass="['custom-checked']"
     activeBackgroundColor="#ff0000"
   />
   
   <!-- v2.0 -->
   <zx-radio 
     color="#ff0000"
     active-background-color="#ff0000"
   />
   ```

### 📦 兼容性

- ✅ **H5**: 完全支持
- ✅ **小程序**: 微信、支付宝、百度、抖音等
- ✅ **App**: Vue 和 nvue
- ✅ **HarmonyOS**: 完全支持

### 🐛 修复的问题

1. **单选逻辑错误**: 修复在 radio-group 中可以取消选中的问题
2. **样式不一致**: 统一各平台样式表现
3. **事件参数**: 规范化事件参数格式
4. **内存泄漏**: 修复组件销毁时的内存泄漏问题
5. **类型错误**: 修复 TypeScript 类型定义问题

### 📚 文档更新

- ✅ 完整的 API 文档
- ✅ 丰富的使用示例
- ✅ 最佳实践指南
- ✅ 迁移指南
- ✅ 故障排除指南

### 🎯 未来计划

- [ ] 主题定制系统
- [ ] 更多动画效果
- [ ] 表单验证集成
- [ ] 键盘导航优化
- [ ] 测试覆盖率提升 