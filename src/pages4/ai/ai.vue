<template>
  <view class="content">
    <view class="header">
      <image class="logo" src="https://zxui.org/logo.png" mode="widthFix" />
      <text class="title">AI 智能组件</text>
      <text class="slogan">智能化UI组件解决方案</text>
      <text class="desc">zxUI提供丰富的AI智能组件，包括智能识别、语音交互、图像处理等功能，让你的应用更加智能化。</text>
    </view>
    
    <view class="search-bar-container">
      <zx-search-bar v-model="searchValue" placeholder="搜索AI组件" @confirm="handleSearch" :bgColor="'#fff'" />
    </view>
    
    <view v-for="(category, cIndex) in filteredList" :key="cIndex" class="category-section">
      <view class="section-title">
        <text>{{ category.title }}</text>
      </view>
      <view class="component-list">
        <view 
          class="component-item" 
          v-for="(item, index) in category.lists" 
          :key="index"
          @click="handleClick(item.path)"
          :class="{ 'no-border': index === category.lists.length - 1 }"
        >
          <view class="item-content">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-desc">{{ item.desc }}</text>
          </view>
          <text class="item-arrow">›</text>
        </view>
      </view>
    </view>
    
    <!-- 返回顶部 -->
    <zx-backtop :scrollTop="scrollTop"></zx-backtop>

    <!-- 底部导航 -->
    <zx-tabbar
      :value="tabbarValue"
      :items="tabbarList"
      @change="onTabbarChange"
      fixed
      placeholder
      safeAreaInsetBottom
    />
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import { useStore } from 'vuex';

const title = ref("AI智能组件");
const scrollTop = ref(0);
const searchValue = ref("");
const tabbarValue = ref(1); // AI页面对应的tabbar索引

const datalist = ref([
  {
    title: "智能识别",
    lists: [
      {
        title: "人脸识别",
        desc: "基于AI的人脸检测和识别功能",
        path: "/pages2/face-recognition/index"
      },
      {
        title: "文字识别OCR",
        desc: "图片文字识别和提取功能",
        path: "/pages2/ocr/index"
      },
      {
        title: "条码扫描",
        desc: "二维码和条形码智能扫描",
        path: "/pages2/barcode/index"
      },
      {
        title: "图像分类",
        desc: "基于深度学习的图像内容识别",
        path: "/pages2/image-classification/index"
      }
    ]
  },
  {
    title: "语音交互",
    lists: [
      {
        title: "语音识别",
        desc: "将语音转换为文字的智能识别",
        path: "/pages2/speech-recognition/index"
      },
      {
        title: "语音合成",
        desc: "文字转语音的智能播报功能",
        path: "/pages2/text-to-speech/index"
      },
      {
        title: "智能对话",
        desc: "基于AI的智能聊天机器人",
        path: "/pages2/chatbot/index"
      }
    ]
  },
  {
    title: "智能推荐",
    lists: [
      {
        title: "内容推荐",
        desc: "基于用户行为的智能内容推荐",
        path: "/pages2/content-recommendation/index"
      },
      {
        title: "商品推荐",
        desc: "个性化商品推荐算法",
        path: "/pages2/product-recommendation/index"
      },
      {
        title: "标签推荐",
        desc: "智能标签生成和推荐",
        path: "/pages2/tag-recommendation/index"
      }
    ]
  },
  {
    title: "图像处理",
    lists: [
      {
        title: "智能裁剪",
        desc: "基于AI的图像智能裁剪",
        path: "/pages2/smart-crop/index"
      },
      {
        title: "图像增强",
        desc: "AI驱动的图像质量提升",
        path: "/pages2/image-enhancement/index"
      },
      {
        title: "背景移除",
        desc: "智能背景分离和移除",
        path: "/pages2/background-removal/index"
      },
      {
        title: "风格转换",
        desc: "艺术风格转换和滤镜效果",
        path: "/pages2/style-transfer/index"
      }
    ]
  },
  {
    title: "数据分析",
    lists: [
      {
        title: "行为分析",
        desc: "用户行为模式智能分析",
        path: "/pages2/behavior-analysis/index"
      },
      {
        title: "趋势预测",
        desc: "基于机器学习的趋势预测",
        path: "/pages2/trend-prediction/index"
      },
      {
        title: "异常检测",
        desc: "智能异常行为检测和预警",
        path: "/pages2/anomaly-detection/index"
      }
    ]
  }
]);

// 使用 store 中的底部导航数据
const store = useStore();
const tabbarList = computed(() => store.getters.tabbarList);

// 搜索过滤
const filteredList = computed(() => {
  if (!searchValue.value) {
    return datalist.value;
  }
  
  return datalist.value.map(category => {
    const filteredLists = category.lists.filter(item => 
      item.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchValue.value.toLowerCase())
    );
    
    return {
      ...category,
      lists: filteredLists
    };
  }).filter(category => category.lists.length > 0);
});

// 处理搜索
const handleSearch = () => {
  console.log('搜索:', searchValue.value);
};

// 处理点击
const handleClick = (path) => {
  if (path) {
    uni.navigateTo({
      url: path
    });
  } else {
    uni.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  }
};

// 底部导航切换
const onTabbarChange = (index) => {
  const item = tabbarList.value[index];
  if (item.path !== '/pages/ai/ai') {
    uni.navigateTo({
      url: item.path
    });
  }
};

// 页面滚动
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});

// 页面加载
onLoad(() => {
  uni.setNavigationBarTitle({
    title: title.value
  });
});
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 100rpx;
}

.header {
  padding: 80rpx 40rpx 60rpx;
  text-align: center;
  color: white;
  
  .logo {
    width: 120rpx;
    height: 120rpx;
    border-radius: 24rpx;
    margin-bottom: 30rpx;
  }
  
  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  
  .slogan {
    display: block;
    font-size: 28rpx;
    opacity: 0.9;
    margin-bottom: 20rpx;
  }
  
  .desc {
    display: block;
    font-size: 24rpx;
    opacity: 0.8;
    line-height: 1.6;
    padding: 0 20rpx;
  }
}

.search-bar-container {
  padding: 0 40rpx 40rpx;
}

.category-section {
  margin-bottom: 40rpx;
  
  .section-title {
    padding: 0 40rpx 20rpx;
    
    text {
      color: white;
      font-size: 32rpx;
      font-weight: bold;
    }
  }
  
  .component-list {
    background: white;
    margin: 0 40rpx;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  }
  
  .component-item {
    display: flex;
    align-items: center;
    padding: 30rpx 40rpx;
    border-bottom: 1rpx solid #f5f5f5;
    transition: background-color 0.3s;
    
    &:active {
      background-color: #f8f9fa;
    }
    
    &.no-border {
      border-bottom: none;
    }
    
    .item-content {
      flex: 1;
      
      .item-title {
        display: block;
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 8rpx;
      }
      
      .item-desc {
        display: block;
        font-size: 24rpx;
        color: #666;
        line-height: 1.4;
      }
    }
    
    .item-arrow {
      font-size: 36rpx;
      color: #ccc;
      margin-left: 20rpx;
    }
  }
}
</style>