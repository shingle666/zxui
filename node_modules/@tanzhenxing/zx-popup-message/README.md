# zx-popup-message 消息提示

一个功能丰富的消息提示组件，基于 `zx-popup` 组件构建，支持多种消息类型和自定义配置。

## 特性

- 🎨 **多种消息类型**：支持成功、警告、错误、信息四种主题
- 🎯 **灵活配置**：可自定义图标、持续时间、关闭按钮等
- 📱 **跨平台兼容**：支持 H5、小程序、App 平台
- 🎭 **主题丰富**：内置多种消息主题样式
- 🔧 **事件完整**：提供完整的生命周期事件
- 🛡️ **类型安全**：完整的 TypeScript 类型定义
- 🎪 **动画流畅**：基于 zx-popup 的流畅动画效果
- 🌙 **深色模式**：支持深色模式适配

## 基本用法

### 基础消息

```vue
<template>
  <view>
    <zx-button @click="showMessage = true">显示消息</zx-button>
    
    <zx-popup-message
      v-model:show="showMessage"
      type="success"
      message="操作成功！"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showMessage = ref(false);
</script>
```

### 不同类型的消息

```vue
<template>
  <view>
    <zx-button @click="showSuccess">成功消息</zx-button>
    <zx-button @click="showWarning">警告消息</zx-button>
    <zx-button @click="showError">错误消息</zx-button>
    <zx-button @click="showInfo">信息消息</zx-button>
    
    <zx-popup-message
      v-model:show="showMsg"
      :type="msgType"
      :message="msgText"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showMsg = ref(false);
const msgType = ref('info');
const msgText = ref('');

const showSuccess = () => {
  msgType.value = 'success';
  msgText.value = '操作成功！';
  showMsg.value = true;
};

const showWarning = () => {
  msgType.value = 'warning';
  msgText.value = '请注意相关风险！';
  showMsg.value = true;
};

const showError = () => {
  msgType.value = 'error';
  msgText.value = '操作失败，请重试！';
  showMsg.value = true;
};

const showInfo = () => {
  msgType.value = 'info';
  msgText.value = '这是一条信息提示';
  showMsg.value = true;
};
</script>
```

### 自定义图标

```vue
<template>
  <zx-popup-message
    v-model:show="showMessage"
    type="info"
    message="使用自定义图标"
    icon="star-fill"
    :icon-size="20"
  />
</template>
```

### 不显示图标

```vue
<template>
  <zx-popup-message
    v-model:show="showMessage"
    type="info"
    message="这条消息不显示图标"
    :show-icon="false"
  />
</template>
```

### 显示关闭按钮

```vue
<template>
  <zx-popup-message
    v-model:show="showMessage"
    type="warning"
    message="这条消息可以手动关闭"
    closable
    :duration="0"
  />
</template>
```

### 自定义持续时间

```vue
<template>
  <view>
    <!-- 1秒后自动关闭 -->
    <zx-popup-message
      v-model:show="showMessage1"
      message="1秒后关闭"
      :duration="1000"
    />
    
    <!-- 不自动关闭 -->
    <zx-popup-message
      v-model:show="showMessage2"
      message="不会自动关闭"
      :duration="0"
      closable
    />
  </view>
</template>
```

### 显示遮罩

```vue
<template>
  <zx-popup-message
    v-model:show="showMessage"
    type="error"
    message="重要消息，显示遮罩"
    mask-show
    closable
    :duration="0"
  />
</template>
```

### 拦截关闭操作

```vue
<template>
  <zx-popup-message
    v-model:show="showMessage"
    type="warning"
    message="关闭前会弹出确认"
    :before-close="beforeClose"
    closable
    :duration="0"
  />
</template>

<script setup>
const beforeClose = () => {
  return new Promise((resolve) => {
    uni.showModal({
      title: '提示',
      content: '确定要关闭这条消息吗？',
      success: (res) => {
        resolve(res.confirm);
      }
    });
  });
};
</script>
```

### 方法调用

```vue
<template>
  <view>
    <zx-button @click="openMessage">打开消息</zx-button>
    <zx-button @click="closeMessage">关闭消息</zx-button>
    
    <zx-popup-message
      ref="messageRef"
      type="success"
      message="通过方法调用"
      :duration="0"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const messageRef = ref();

const openMessage = () => {
  messageRef.value?.open();
};

const closeMessage = () => {
  messageRef.value?.close();
};
</script>
```

### 自定义内容

```vue
<template>
  <zx-popup-message
    v-model:show="showMessage"
    type="info"
    :duration="0"
    closable
  >
    <view class="custom-content">
      <view class="custom-title">自定义消息内容</view>
      <view class="custom-desc">这是一个使用插槽的自定义消息</view>
      <view class="custom-actions">
        <zx-button size="mini" type="primary" @click="handleAction">确定</zx-button>
        <zx-button size="mini" @click="showMessage = false">取消</zx-button>
      </view>
    </view>
  </zx-popup-message>
</template>

<style>
.custom-content {
  padding: 4px 0;
}

.custom-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.custom-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.custom-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 是否显示消息 | `boolean` | `false` |
| type | 消息类型 | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` |
| message | 消息文本 | `string` | `''` |
| duration | 显示时长（毫秒），0 表示不自动关闭 | `number` | `3000` |
| show-icon | 是否显示图标 | `boolean` | `true` |
| icon | 自定义图标名称 | `string` | `''` |
| icon-size | 图标大小 | `number \| string` | `18` |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| mask-show | 是否显示遮罩 | `boolean` | `false` |
| mask-background-color | 遮罩背景色 | `string` | `'rgba(0, 0, 0, 0.1)'` |
| z-index | z-index 层级 | `number` | `1000` |
| animation | 是否开启动画 | `boolean` | `true` |
| before-close | 关闭前的回调函数 | `function` | `null` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 显示状态改变时触发 | `(show: boolean)` |
| open | 打开消息时触发 | `()` |
| opened | 打开消息且动画结束后触发 | `()` |
| close | 关闭消息时触发 | `()` |
| closed | 关闭消息且动画结束后触发 | `()` |
| click | 点击消息时触发 | `()` |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开消息 | `()` |
| close | 关闭消息 | `()` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义消息内容，会覆盖 message 属性 |

## 消息类型

### success - 成功消息
- **图标**：checkmark-circle-fill
- **颜色**：#67C23A（绿色）
- **背景**：#f0f9ff
- **边框**：#e1f5fe
- **使用场景**：操作成功、保存成功、提交成功等

### warning - 警告消息
- **图标**：warning-fill
- **颜色**：#E6A23C（橙色）
- **背景**：#fdf6ec
- **边框**：#faecd8
- **使用场景**：风险提示、注意事项、确认操作等

### error - 错误消息
- **图标**：close-circle-fill
- **颜色**：#F56C6C（红色）
- **背景**：#fef0f0
- **边框**：#fde2e2
- **使用场景**：操作失败、验证错误、系统错误等

### info - 信息消息
- **图标**：information-circle-fill
- **颜色**：#409EFF（蓝色）
- **背景**：#f4f4f5
- **边框**：#e9e9eb
- **使用场景**：一般信息、提示说明、状态更新等

## 主题定制

### 自定义消息样式

可以通过 CSS 变量自定义消息样式：

```scss
.zx-popup-message {
  // 自定义成功消息样式
  &--success {
    background: linear-gradient(135deg, #f0f9ff 0%, #e1f5fe 100%);
    border-color: #67C23A;
    
    .zx-popup-message__message {
      color: #67C23A;
      font-weight: 600;
    }
  }
  
  // 自定义圆角
  border-radius: 12px;
  
  // 自定义阴影
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
```

### 响应式设计

组件已内置响应式设计，在不同屏幕尺寸下会自动调整：

- **桌面端**（≥500px）：居中显示，最大宽度 500px，最小宽度 300px
- **移动端**（<500px）：左右边距 8px，自适应宽度

### 深色模式

组件支持深色模式，会根据系统设置自动切换：

```scss
@media (prefers-color-scheme: dark) {
  .zx-popup-message {
    &--success {
      background-color: rgba(103, 194, 58, 0.1);
      border-color: rgba(103, 194, 58, 0.2);
    }
    // ... 其他类型
  }
}
```

## 注意事项

1. **依赖组件**：本组件依赖 `zx-popup` 和 `zx-icon` 组件，请确保已正确引入
2. **层级管理**：默认 z-index 为 1000，如有层级冲突可通过 z-index 属性调整
3. **性能优化**：频繁显示消息时建议复用组件实例，避免重复创建
4. **无障碍访问**：组件已考虑基本的无障碍访问，建议添加适当的 aria 标签
5. **平台差异**：在不同平台上动画效果可能略有差异，这是正常现象
6. **内存管理**：组件会自动清理定时器，无需手动处理

## 实际应用场景

### 表单验证

```vue
<script setup>
const validateForm = () => {
  if (!form.username) {
    showMessage('warning', '请输入用户名');
    return false;
  }
  
  if (!form.password) {
    showMessage('warning', '请输入密码');
    return false;
  }
  
  return true;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  try {
    await api.login(form);
    showMessage('success', '登录成功！');
  } catch (error) {
    showMessage('error', '登录失败：' + error.message);
  }
};
</script>
```

### 网络请求状态

```vue
<script setup>
const loadData = async () => {
  try {
    const data = await api.getData();
    showMessage('success', '数据加载成功');
    return data;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      showMessage('error', '网络连接失败，请检查网络设置');
    } else {
      showMessage('error', '数据加载失败，请稍后重试');
    }
  }
};
</script>
```

### 操作确认

```vue
<script setup>
const deleteItem = async (id) => {
  try {
    await api.delete(id);
    showMessage('success', '删除成功');
    refreshList();
  } catch (error) {
    showMessage('error', '删除失败：' + error.message);
  }
};
</script>
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持四种消息类型（success、warning、error、info）
- ✨ 支持自定义图标和持续时间
- ✨ 支持关闭按钮和遮罩显示
- ✨ 支持拦截关闭操作
- ✨ 支持自定义内容插槽
- ✨ 完整的事件系统
- ✨ 响应式设计和深色模式支持
- ✨ 跨平台兼容性（H5、小程序、App）