# zx-dollmachine

`zx-dollmachine` 是一个抓娃娃机游戏组件，支持 H5、小程序、App 多端运行，模拟真实的娃娃机抓取体验。

## 特性

- 🎮 模拟真实抓娃娃机操作体验
- 📱 兼容 H5、小程序、App 多端
- 🎯 支持自定义奖品列表和中奖逻辑
- ⚡ 流畅的动画效果和交互体验
- 🎨 支持自定义爪子图片和样式
- 🔧 灵活的配置选项

## 使用方法

### 基础用法

```vue
<template>
  <view>
    <zx-dollmachine
      ref="dollmachine"
      width="375px"
      height="690px"
      :prize-list="prizeList"
      :prize-index="prizeIndex"
      @init="onInit"
      @start-turns="onStartTurns"
      @end-turns="onEndTurns"
    />
  </view>
</template>

<script>
import ZxDollmachine from '@/components/zx-dollmachine/zx-dollmachine.vue'

export default {
  components: {
    ZxDollmachine
  },
  data() {
    return {
      prizeList: [
        {
          prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
          prizeName: '大鸡腿'
        },
        {
          prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
          prizeName: 'JOY公仔'
        },
        {
          prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
          prizeName: 'VIP卡'
        },
        {
          prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
          prizeName: '小熊'
        }
      ],
      prizeIndex: -1 // -1 表示未中奖，其他值表示中奖奖品的索引
    }
  },
  methods: {
    // 游戏初始化
    onInit() {
      console.log('娃娃机初始化完成')
    },
    
    // 开始抓取
    onStartTurns() {
      console.log('开始抓取')
      // 这里可以调用后端接口获取抓取结果
      this.getPrizeResult()
    },
    
    // 抓取结束
    onEndTurns() {
      console.log('抓取结束')
      if (this.prizeIndex >= 0) {
        console.log('恭喜中奖！', this.prizeList[this.prizeIndex])
      } else {
        console.log('很遗憾，没有中奖')
      }
    },
    
    // 获取抓取结果（模拟后端接口）
    getPrizeResult() {
      // 模拟随机中奖
      const random = Math.random()
      if (random < 0.3) {
        // 30% 中奖概率
        this.prizeIndex = Math.floor(Math.random() * this.prizeList.length)
      } else {
        this.prizeIndex = -1
      }
    }
  }
}
</script>
```

### Vue 3 Composition API 用法

```vue
<template>
  <view>
    <zx-dollmachine
      ref="dollmachineRef"
      width="375px"
      height="690px"
      :prize-list="prizeList"
      :prize-index="prizeIndex"
      @init="onInit"
      @start-turns="onStartTurns"
      @end-turns="onEndTurns"
    />
    
    <view class="control-panel">
      <button @click="resetGame">重置游戏</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ZxDollmachine from '@/components/zx-dollmachine/zx-dollmachine.vue'

const dollmachineRef = ref(null)
const prizeIndex = ref(-1)

const prizeList = reactive([
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    prizeName: '大鸡腿'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: 'JOY公仔'
  },
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    prizeName: 'VIP卡'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: '小熊'
  }
])

const onInit = () => {
  console.log('娃娃机初始化完成')
}

const onStartTurns = () => {
  console.log('开始抓取')
  // 模拟获取抓取结果
  setTimeout(() => {
    const random = Math.random()
    prizeIndex.value = random < 0.3 ? Math.floor(Math.random() * prizeList.length) : -1
  }, 1000)
}

const onEndTurns = () => {
  console.log('抓取结束')
  if (prizeIndex.value >= 0) {
    uni.showToast({
      title: `恭喜获得${prizeList[prizeIndex.value].prizeName}！`,
      icon: 'success'
    })
  } else {
    uni.showToast({
      title: '很遗憾，没有抓到奖品',
      icon: 'none'
    })
  }
}

const resetGame = () => {
  prizeIndex.value = -1
  dollmachineRef.value?.resetGame()
}
</script>

<style>
.control-panel {
  padding: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
```

### 自定义配置

```vue
<template>
  <zx-dollmachine
    width="400px"
    height="750px"
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    :move-speed="80"
    :grab-time="3000"
    default-claw="/static/images/custom-claw.png"
    active-claw="/static/images/custom-claw-active.png"
    @init="onInit"
    @start-turns="onStartTurns"
    @end-turns="onEndTurns"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 容器宽度 | String | '375px' |
| height | 容器高度 | String | '690px' |
| prize-list | 奖品列表 | Array | [] |
| prize-index | 中奖奖品索引，-1表示未中奖 | Number | -1 |
| default-claw | 默认爪子图片 | String | 默认图片链接 |
| active-claw | 抓取状态爪子图片 | String | 默认图片链接 |
| move-speed | 爪子移动速度(ms) | Number | 100 |
| grab-time | 抓取持续时间(ms) | Number | 2000 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| init | 游戏初始化完成 | - |
| start-turns | 开始抓取 | - |
| end-turns | 抓取结束 | - |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| init | 初始化游戏 | - |
| resetGame | 重置游戏 | - |

### 奖品数据格式

```javascript
const prizeList = [
  {
    prizeImg: 'https://example.com/prize1.png', // 奖品图片
    prizeName: '奖品名称' // 奖品名称
  }
]
```

## 注意事项

1. **奖品列表**：至少需要提供 4 个奖品数据
2. **中奖逻辑**：需要在 `start-turns` 事件中设置 `prize-index` 来控制中奖结果
3. **图片资源**：建议使用 CDN 或本地静态资源，确保图片加载稳定
4. **性能优化**：在页面销毁时记得清理定时器和事件监听
5. **平台兼容**：组件使用 uni-app 标准语法，兼容所有平台

## 样式自定义

组件支持通过 CSS 变量或深度选择器自定义样式：

```scss
// 自定义娃娃机背景
::v-deep .machine-box {
  background-image: url('/static/images/custom-machine-bg.png');
}

// 自定义操作区域样式
::v-deep .machine-operate {
  background: rgba(255, 255, 255, 0.9);
}

// 自定义按钮样式
::v-deep .machine-reset-btn {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
}
```

## 常见问题

### Q: 如何实现真实的中奖概率控制？

A: 在 `start-turns` 事件中调用后端接口，根据服务端返回的结果设置 `prize-index`：

```javascript
async onStartTurns() {
  try {
    const result = await api.grabPrize()
    this.prizeIndex = result.prizeIndex
  } catch (error) {
    this.prizeIndex = -1
  }
}
```

### Q: 如何自定义娃娃机的外观？

A: 可以通过 props 传入自定义的爪子图片，或使用深度选择器修改背景图片。

### Q: 组件在小程序中使用有什么注意事项？

A: 确保图片资源已配置在小程序的域名白名单中，避免图片加载失败。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础抓娃娃机功能
- 支持多端兼容
- 支持自定义配置