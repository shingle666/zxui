# zx-hiteggs 砸金蛋组件

砸金蛋抽奖组件，适用于各种抽奖活动场景。支持自定义金蛋数量、奖品内容、图片资源等。

## 特性

- 🎯 支持自定义金蛋数量（默认9个）
- 🎨 支持自定义金蛋图片、锤子图片
- 🎁 支持配置奖品内容（图片+文字）
- ✨ 丰富的动画效果（震动、破碎、锤子敲击）
- 📱 完美支持 H5、小程序、APP 三端
- 🎮 支持重置游戏状态
- 🔧 灵活的事件回调

## 基础用法

```vue
<template>
  <zx-hiteggs @hit="onHit" />
</template>

<script setup>
const onHit = (data) => {
  console.log('砸中了！', data)
}
</script>
```

## 自定义金蛋数量

```vue
<template>
  <zx-hiteggs :num="6" @hit="onHit" />
</template>
```

## 配置奖品

```vue
<template>
  <zx-hiteggs 
    :num="9" 
    :prizes="prizes" 
    @hit="onHit"
    @allHit="onAllHit"
  />
</template>

<script setup>
const prizes = [
  { text: '一等奖', image: '/static/prize1.png' },
  { text: '二等奖', image: '/static/prize2.png' },
  { text: '三等奖' },
  { text: '谢谢参与' },
  null, // 空奖品
  { text: '红包', image: '/static/hongbao.png' },
  { text: '优惠券' },
  { text: '积分+100' },
  { text: '再来一次' }
]

const onHit = (data) => {
  const { index, prize, hitCount } = data
  if (prize) {
    uni.showToast({
      title: `恭喜获得：${prize.text}`,
      icon: 'success'
    })
  } else {
    uni.showToast({
      title: '很遗憾，没有中奖',
      icon: 'none'
    })
  }
}

const onAllHit = (data) => {
  const { prizes } = data
  console.log('游戏结束，获得奖品：', prizes)
}
</script>
```

## 自定义样式

```vue
<template>
  <zx-hiteggs 
    :num="9"
    width="100px"
    height="100px"
    gap="15px"
    backgroundColor="#fff3cd"
    :showHammer="true"
    intactImg="/static/custom-egg.png"
    hammerImg="/static/custom-hammer.png"
  />
</template>
```

## 控制游戏状态

```vue
<template>
  <view>
    <zx-hiteggs ref="hiteggsRef" :disabled="gameDisabled" @allHit="onGameEnd" />
    <button @click="resetGame">重新开始</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const hiteggsRef = ref()
const gameDisabled = ref(false)

const resetGame = () => {
  hiteggsRef.value?.reset()
  gameDisabled.value = false
}

const onGameEnd = () => {
  gameDisabled.value = true
  uni.showModal({
    title: '游戏结束',
    content: '是否重新开始？',
    success: (res) => {
      if (res.confirm) {
        resetGame()
      }
    }
  })
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| num | 金蛋个数 | Number | 9 |
| intactImg | 完整金蛋图片地址 | String | 默认图片 |
| brokenImg | 破碎金蛋图片地址 | String | 默认图片 |
| hammerImg | 锤子图片地址 | String | 默认图片 |
| width | 金蛋图片宽度 | String | '80px' |
| height | 金蛋图片高度 | String | '80px' |
| showHammer | 是否显示锤子 | Boolean | true |
| prizes | 奖品数据数组 | Array | [] |
| disabled | 是否禁用 | Boolean | false |
| backgroundColor | 容器背景色 | String | '#f5f5f5' |
| gap | 网格间距 | String | '10px' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击金蛋时触发 | { index, egg } |
| hit | 砸击金蛋后触发 | { index, egg, prize, hitCount } |
| allHit | 所有金蛋都被砸完时触发 | { eggs, prizes } |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reset | 重置游戏状态 | - |
| hitEgg | 手动砸击指定金蛋 | index |

### 奖品数据格式

```javascript
const prize = {
  text: '奖品名称',     // 奖品文字描述
  image: '图片地址'     // 奖品图片（可选）
}
```

## 注意事项

1. **图片资源**：建议使用网络图片或将图片放在 `static` 目录下
2. **奖品配置**：奖品数组长度应该等于金蛋数量，可以设置为 `null` 表示空奖品
3. **性能优化**：避免在短时间内频繁重置游戏状态
4. **兼容性**：组件使用标准的 Vue 3 + UniApp API，兼容所有平台

## 样式定制

组件支持通过 CSS 变量进行样式定制：

```css
.zx-hiteggs {
  --egg-border-radius: 12px;
  --prize-bg-color: rgba(255, 255, 255, 0.95);
  --fragment-duration: 0.8s;
}
```

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础砸金蛋功能
- 支持自定义奖品配置
- 支持丰富的动画效果