# zx-tabbar 底部导航栏

此组件提供了自定义 tabbar 的能力，支持 H5、小程序、App，适合多端项目使用。

## 组件特性
- 支持自定义图标、文本、徽标、圆点
- 支持固定底部、占位防塌陷
- 支持安全区适配
- 支持拦截切换、事件回调
- 兼容多端（H5/小程序/App）

## 基本用法
```vue
<template>
  <zx-tabbar :value="tab" @change="tab = $event" :items="tabbarList" />
</template>
<script setup>
import { ref } from 'vue';
const tab = ref(0);
const tabbarList = [
  { icon: 'home', title: '首页' },
  { icon: 'photo', title: '放映厅' },
  { icon: 'play-right', title: '直播' },
  { icon: 'account', title: '我的' }
];
</script>
```

## 属性说明
| 属性名              | 说明                         | 类型                | 默认值      |
|---------------------|------------------------------|---------------------|-------------|
| value               | 当前选中项的索引或 name      | String/Number       | 0           |
| items               | tabbar 配置项数组            | Array               | []          |
| safeAreaInsetBottom | 是否为 iPhoneX 留出安全距离  | Boolean             | true        |
| border              | 是否显示上方边框             | Boolean             | true        |
| zIndex              | 层级 z-index                 | String/Number       | 100         |
| activeColor         | 选中标签颜色                 | String              | #ff0000     |
| inactiveColor       | 未选中标签颜色               | String              | #7d7e80     |
| fixed               | 是否固定在底部               | Boolean             | true        |
| placeholder         | 固定时是否占位防塌陷         | Boolean             | true        |
| height              | tabbar 高度                  | String              | 100rpx      |
| customStyle         | 外部自定义样式               | Object              | {}          |

### items 配置项说明
| 属性名   | 说明           | 类型              |
|----------|----------------|-------------------|
| icon     | 图标名/图片    | String            |
| title    | 文本           | String            |
| badge    | 角标数字       | String/Number     |
| dot      | 是否显示圆点   | Boolean           |
| name     | 唯一标识（可选）| String/Number     |

## 事件说明
| 事件名   | 说明           | 回调参数          |
|----------|----------------|-------------------|
| change   | 切换选项时触发 | index/name        |

## 常见用法
### 显示徽标/圆点
```vue
<zx-tabbar :value="tab" @change="tab = $event" :items="[
  { icon: 'home', title: '首页', dot: true },
  { icon: 'photo', title: '放映厅', badge: 3 },
  { icon: 'play-right', title: '直播' },
  { icon: 'account', title: '我的' }
]" />
```

### 拦截切换
```vue
<zx-tabbar :value="tab" @change="onTabChange" :items="tabbarList" />
<script setup>
function onTabChange(index) {
  if (index === 1) {
    uni.showToast({ title: '请先登录', icon: 'none' });
    return;
  }
  tab.value = index;
}
</script>
```

### 固定底部
```vue
<zx-tabbar :value="tab" @change="tab = $event" :items="tabbarList" fixed placeholder safeAreaInsetBottom />
```

## 插槽
无

## 注意事项
- 请确保 items 数组不为空
- 支持多端，无需关心平台差异

## 参考文档
- [uView tabbar 官方文档](https://uviewui.com/components/tabbar.html) 