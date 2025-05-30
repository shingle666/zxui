<template>
  <view class="content">
    <view class="header">
      <image class="logo" src="https://zxui.org/logo.png" mode="widthFix" />
      <text class="title">组件专题</text>
      <text class="slogan">精选组件使用案例</text>
      <text class="desc">探索zxUI组件的最佳实践，学习如何构建优秀的用户界面。</text>
    </view>
    
    <view class="search-bar-container">
      <zx-search-bar v-model="searchValue" placeholder="搜索专题" @confirm="handleSearch" :bgColor="'#fff'" />
    </view>
    
    <view v-for="(topic, tIndex) in filteredTopics" :key="tIndex" class="topic-section">
      <view class="section-title">
        <text>{{ topic.title }}</text>
        <text class="section-count">{{ topic.items.length }}个专题</text>
      </view>
      <view class="topic-grid">
        <view 
          class="topic-card" 
          v-for="(item, index) in topic.items" 
          :key="index"
          @click="handleTopicClick(item)"
        >
          <view class="card-header">
            <image class="topic-icon" :src="item.icon" mode="aspectFit" />
            <view class="topic-badge" v-if="item.isNew">NEW</view>
          </view>
          <view class="card-content">
            <text class="topic-title">{{ item.title }}</text>
            <text class="topic-desc">{{ item.description }}</text>
            <view class="topic-tags">
              <text class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</text>
            </view>
          </view>
          <view class="card-footer">
            <text class="view-count">{{ item.viewCount }}次浏览</text>
            <text class="difficulty" :class="item.difficulty">{{ getDifficultyText(item.difficulty) }}</text>
          </view>
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

const title = ref("组件专题");
const scrollTop = ref(0);
const searchValue = ref("");

// 专题数据
const topicData = ref([
  {
    title: "基础入门",
    items: [
      {
        id: 1,
        title: "按钮组件最佳实践",
        description: "学习如何正确使用按钮组件，包括样式、状态和交互设计",
        icon: "https://zxui.org/icons/button.png",
        tags: ["基础", "交互"],
        viewCount: 1250,
        difficulty: "easy",
        isNew: false,
        path: "/pages2/button/index"
      },
      {
        id: 2,
        title: "图标系统使用指南",
        description: "掌握图标组件的使用技巧，打造统一的视觉语言",
        icon: "https://zxui.org/icons/icon.png",
        tags: ["图标", "设计"],
        viewCount: 980,
        difficulty: "easy",
        isNew: true,
        path: "/pages2/icon/index"
      },
      {
        id: 3,
        title: "文本组件排版技巧",
        description: "了解文本组件的高级用法，提升内容可读性",
        icon: "https://zxui.org/icons/text.png",
        tags: ["文本", "排版"],
        viewCount: 756,
        difficulty: "easy",
        isNew: false,
        path: "/pages2/text/index"
      }
    ]
  },
  {
    title: "布局设计",
    items: [
      {
        id: 4,
        title: "响应式网格布局",
        description: "使用Grid组件创建灵活的响应式布局系统",
        icon: "https://zxui.org/icons/grid.png",
        tags: ["布局", "响应式"],
        viewCount: 1580,
        difficulty: "medium",
        isNew: false,
        path: "/pages2/grid/index"
      },
      {
        id: 5,
        title: "弹性布局进阶",
        description: "深入学习Flex组件，掌握复杂布局的实现方法",
        icon: "https://zxui.org/icons/flex.png",
        tags: ["Flex", "进阶"],
        viewCount: 1320,
        difficulty: "medium",
        isNew: true,
        path: "/pages2/flex/index"
      },
      {
        id: 6,
        title: "间距系统设计",
        description: "使用Space组件建立统一的间距规范",
        icon: "https://zxui.org/icons/space.png",
        tags: ["间距", "规范"],
        viewCount: 892,
        difficulty: "easy",
        isNew: false,
        path: "/pages2/space/index"
      }
    ]
  },
  {
    title: "表单交互",
    items: [
      {
        id: 7,
        title: "表单验证最佳实践",
        description: "构建用户友好的表单验证体验",
        icon: "https://zxui.org/icons/form.png",
        tags: ["表单", "验证"],
        viewCount: 2100,
        difficulty: "hard",
        isNew: false,
        path: "/pages2/form/index"
      },
      {
        id: 8,
        title: "选择器组件应用",
        description: "掌握各种选择器的使用场景和技巧",
        icon: "https://zxui.org/icons/picker.png",
        tags: ["选择器", "交互"],
        viewCount: 1650,
        difficulty: "medium",
        isNew: true,
        path: "/pages2/picker/index"
      },
      {
        id: 9,
        title: "文件上传组件",
        description: "实现高效的文件上传功能",
        icon: "https://zxui.org/icons/upload.png",
        tags: ["上传", "文件"],
        viewCount: 1420,
        difficulty: "medium",
        isNew: false,
        path: "/pages2/upload/index"
      }
    ]
  },
  {
    title: "数据可视化",
    items: [
      {
        id: 10,
        title: "图表组件应用",
        description: "使用图表组件展示数据，提升用户体验",
        icon: "https://zxui.org/icons/chart.png",
        tags: ["图表", "数据"],
        viewCount: 1890,
        difficulty: "hard",
        isNew: true,
        path: "/pages3/charts/index"
      },
      {
        id: 11,
        title: "表格数据展示",
        description: "高效展示和操作大量数据",
        icon: "https://zxui.org/icons/table.png",
        tags: ["表格", "数据"],
        viewCount: 1560,
        difficulty: "medium",
        isNew: false,
        path: "/pages2/table/index"
      }
    ]
  }
]);

// 底部导航数据
const tabbarValue = ref(2);
const tabbarList = [
  { icon: 'home', title: '首页', name: 0, path: '/pages/index/index' },
  { icon: 'server-man', title: 'AI', name: 1, path: '/pages/ai/ai' },
  { icon: 'integral', title: '专题', name: 2, path: '/pages/topic/topic', dot: true },
  { icon: 'grid', title: '模板', name: 3, path: '/pages/template/template' },
  { icon: 'account', title: '我的', name: 4, path: '/pages/my/my' }
];

// 监听页面滚动
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});

// 计算过滤后的专题
const filteredTopics = computed(() => {
  if (!searchValue.value) {
    return topicData.value;
  }
  
  return topicData.value.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchValue.value.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);
});

// 获取难度文本
function getDifficultyText(difficulty) {
  const difficultyMap = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  };
  return difficultyMap[difficulty] || '未知';
}

// 处理搜索
function handleSearch() {
  console.log('搜索:', searchValue.value);
}

// 处理专题点击
function handleTopicClick(item) {
  uni.navigateTo({ 
    url: item.path,
    fail: () => {
      uni.showToast({
        title: '页面暂未开放',
        icon: 'none'
      });
    }
  });
}

// 处理底部导航切换
function onTabbarChange(name) {
  let path = tabbarList.find(item => item.name == name).path;
  uni.navigateTo({ url: path });
}

onLoad(() => {
  uni.setNavigationBarTitle({
    title: title.value
  });
});
</script>

<style scoped>
.content {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
  padding-bottom: 120rpx;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 30rpx 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 20rpx;
  border-radius: 60rpx;
  background: rgba(255, 255, 255, 0.1);
  padding: 20rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
}

.slogan {
  font-size: 28rpx;
  opacity: 0.9;
  margin-bottom: 12rpx;
}

.desc {
  font-size: 24rpx;
  opacity: 0.8;
  line-height: 1.5;
  max-width: 600rpx;
}

.search-bar-container {
  margin: -30rpx 30rpx 30rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  padding: 16rpx 20rpx;
}

.topic-section {
  margin-bottom: 40rpx;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx 20rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.section-count {
  font-size: 24rpx;
  color: #999;
  font-weight: normal;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 0 30rpx;
}

.topic-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.topic-card:active {
  transform: scale(0.98);
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.card-header {
  position: relative;
  margin-bottom: 16rpx;
}

.topic-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 12rpx;
  background: #f5f5f5;
}

.topic-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  font-size: 20rpx;
  padding: 4rpx 8rpx;
  border-radius: 8rpx;
  font-weight: bold;
}

.card-content {
  margin-bottom: 16rpx;
}

.topic-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
  line-height: 1.3;
}

.topic-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
  display: block;
  margin-bottom: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.tag {
  background: #f0f0f0;
  color: #666;
  font-size: 20rpx;
  padding: 4rpx 8rpx;
  border-radius: 6rpx;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22rpx;
}

.view-count {
  color: #999;
}

.difficulty {
  padding: 4rpx 8rpx;
  border-radius: 6rpx;
  font-weight: 500;
}

.difficulty.easy {
  background: #e8f5e8;
  color: #52c41a;
}

.difficulty.medium {
  background: #fff7e6;
  color: #fa8c16;
}

.difficulty.hard {
  background: #fff2f0;
  color: #ff4d4f;
}

/* 响应式适配 */
@media (max-width: 750rpx) {
  .topic-grid {
    grid-template-columns: 1fr;
  }
}
</style>