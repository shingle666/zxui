<template>
  <view class="content">
    <view class="header">
      <image class="logo" src="https://zxui.org/logo.png" mode="widthFix" />
      <text class="title">UI模板</text>
      <text class="slogan">精美模板，快速开发</text>
      <text class="desc">提供丰富的UI模板和页面设计，帮助您快速构建美观的应用界面。</text>
    </view>
    
    <view class="search-bar-container">
      <zx-search-bar v-model="searchValue" placeholder="搜索模板" @confirm="handleSearch" :bgColor="'#fff'" />
    </view>
    
    <!-- 分类标签 -->
    <view class="category-tabs">
      <view 
        class="tab-item" 
        v-for="(tab, index) in categoryTabs" 
        :key="index"
        :class="{ active: activeTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        <text>{{ tab.name }}</text>
      </view>
    </view>
    
    <view v-for="(category, cIndex) in filteredTemplates" :key="cIndex" class="template-section">
      <view class="section-title">
        <text>{{ category.title }}</text>
        <text class="section-count">{{ category.templates.length }}个模板</text>
      </view>
      <view class="template-grid">
        <view 
          class="template-card" 
          v-for="(template, index) in category.templates" 
          :key="index"
          @click="handleTemplateClick(template)"
        >
          <view class="card-image">
            <image :src="template.preview" mode="aspectFill" />
            <view class="template-badge" v-if="template.isNew">NEW</view>
            <view class="template-badge premium" v-if="template.isPremium">PRO</view>
          </view>
          <view class="card-content">
            <text class="template-title">{{ template.title }}</text>
            <text class="template-desc">{{ template.description }}</text>
            <view class="template-tags">
              <text class="tag" v-for="tag in template.tags" :key="tag">{{ tag }}</text>
            </view>
            <view class="template-info">
              <view class="info-item">
                <text class="info-label">下载量</text>
                <text class="info-value">{{ template.downloads }}</text>
              </view>
              <view class="info-item">
                <text class="info-label">评分</text>
                <text class="info-value">{{ template.rating }}★</text>
              </view>
            </view>
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

const title = ref("UI模板");
const scrollTop = ref(0);
const searchValue = ref("");
const activeTab = ref("all");

// 分类标签
const categoryTabs = ref([
  { key: "all", name: "全部" },
  { key: "business", name: "商务" },
  { key: "ecommerce", name: "电商" },
  { key: "social", name: "社交" },
  { key: "tool", name: "工具" },
  { key: "entertainment", name: "娱乐" }
]);

// 模板数据
const templateData = ref([
  {
    title: "商务应用",
    category: "business",
    templates: [
      {
        id: 1,
        title: "企业官网模板",
        description: "专业的企业官网设计，适合各类公司展示",
        preview: "https://zxui.org/templates/business-1.jpg",
        tags: ["企业", "官网", "专业"],
        downloads: "2.1k",
        rating: 4.8,
        isNew: false,
        isPremium: true,
        category: "business",
        demoUrl: "/pages2/template/business-1"
      },
      {
        id: 2,
        title: "CRM管理系统",
        description: "客户关系管理系统界面模板",
        preview: "https://zxui.org/templates/business-2.jpg",
        tags: ["CRM", "管理", "系统"],
        downloads: "1.8k",
        rating: 4.7,
        isNew: true,
        isPremium: false,
        category: "business",
        demoUrl: "/pages2/template/business-2"
      },
      {
        id: 3,
        title: "项目管理看板",
        description: "敏捷开发项目管理界面",
        preview: "https://zxui.org/templates/business-3.jpg",
        tags: ["项目", "看板", "敏捷"],
        downloads: "1.5k",
        rating: 4.6,
        isNew: false,
        isPremium: true,
        category: "business",
        demoUrl: "/pages2/template/business-3"
      }
    ]
  },
  {
    title: "电商购物",
    category: "ecommerce",
    templates: [
      {
        id: 4,
        title: "商城首页模板",
        description: "现代化的电商首页设计",
        preview: "https://zxui.org/templates/ecommerce-1.jpg",
        tags: ["商城", "购物", "首页"],
        downloads: "3.2k",
        rating: 4.9,
        isNew: true,
        isPremium: false,
        category: "ecommerce",
        demoUrl: "/pages2/template/ecommerce-1"
      },
      {
        id: 5,
        title: "商品详情页",
        description: "精美的商品展示页面",
        preview: "https://zxui.org/templates/ecommerce-2.jpg",
        tags: ["商品", "详情", "展示"],
        downloads: "2.8k",
        rating: 4.8,
        isNew: false,
        isPremium: true,
        category: "ecommerce",
        demoUrl: "/pages2/template/ecommerce-2"
      },
      {
        id: 6,
        title: "购物车页面",
        description: "用户友好的购物车界面",
        preview: "https://zxui.org/templates/ecommerce-3.jpg",
        tags: ["购物车", "结算", "支付"],
        downloads: "2.3k",
        rating: 4.7,
        isNew: false,
        isPremium: false,
        category: "ecommerce",
        demoUrl: "/pages2/template/ecommerce-3"
      }
    ]
  },
  {
    title: "社交应用",
    category: "social",
    templates: [
      {
        id: 7,
        title: "聊天界面模板",
        description: "现代化的即时通讯界面",
        preview: "https://zxui.org/templates/social-1.jpg",
        tags: ["聊天", "通讯", "社交"],
        downloads: "4.1k",
        rating: 4.9,
        isNew: true,
        isPremium: false,
        category: "social",
        demoUrl: "/pages2/template/social-1"
      },
      {
        id: 8,
        title: "朋友圈模板",
        description: "社交动态展示界面",
        preview: "https://zxui.org/templates/social-2.jpg",
        tags: ["动态", "朋友圈", "分享"],
        downloads: "3.5k",
        rating: 4.8,
        isNew: false,
        isPremium: true,
        category: "social",
        demoUrl: "/pages2/template/social-2"
      }
    ]
  },
  {
    title: "工具应用",
    category: "tool",
    templates: [
      {
        id: 9,
        title: "计算器界面",
        description: "简洁美观的计算器设计",
        preview: "https://zxui.org/templates/tool-1.jpg",
        tags: ["计算器", "工具", "实用"],
        downloads: "1.9k",
        rating: 4.6,
        isNew: false,
        isPremium: false,
        category: "tool",
        demoUrl: "/pages2/template/tool-1"
      },
      {
        id: 10,
        title: "天气应用",
        description: "精美的天气预报界面",
        preview: "https://zxui.org/templates/tool-2.jpg",
        tags: ["天气", "预报", "生活"],
        downloads: "2.7k",
        rating: 4.8,
        isNew: true,
        isPremium: false,
        category: "tool",
        demoUrl: "/pages2/template/tool-2"
      }
    ]
  },
  {
    title: "娱乐应用",
    category: "entertainment",
    templates: [
      {
        id: 11,
        title: "音乐播放器",
        description: "时尚的音乐播放界面",
        preview: "https://zxui.org/templates/entertainment-1.jpg",
        tags: ["音乐", "播放器", "娱乐"],
        downloads: "3.8k",
        rating: 4.9,
        isNew: true,
        isPremium: true,
        category: "entertainment",
        demoUrl: "/pages2/template/entertainment-1"
      },
      {
        id: 12,
        title: "视频播放器",
        description: "功能丰富的视频播放界面",
        preview: "https://zxui.org/templates/entertainment-2.jpg",
        tags: ["视频", "播放器", "媒体"],
        downloads: "3.1k",
        rating: 4.7,
        isNew: false,
        isPremium: false,
        category: "entertainment",
        demoUrl: "/pages2/template/entertainment-2"
      }
    ]
  }
]);

// 底部导航数据
const tabbarValue = ref(3);
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

// 计算过滤后的模板
const filteredTemplates = computed(() => {
  let filtered = templateData.value;
  
  // 按分类过滤
  if (activeTab.value !== "all") {
    filtered = filtered.filter(category => category.category === activeTab.value);
  }
  
  // 按搜索关键词过滤
  if (searchValue.value) {
    filtered = filtered.map(category => ({
      ...category,
      templates: category.templates.filter(template => 
        template.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        template.description.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchValue.value.toLowerCase()))
      )
    })).filter(category => category.templates.length > 0);
  }
  
  return filtered;
});

// 切换分类标签
function switchTab(key) {
  activeTab.value = key;
}

// 处理搜索
function handleSearch() {
  console.log('搜索:', searchValue.value);
}

// 处理模板点击
function handleTemplateClick(template) {
  if (template.isPremium) {
    uni.showModal({
      title: '高级模板',
      content: '这是一个高级模板，需要升级到Pro版本才能使用。',
      confirmText: '了解更多',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 跳转到升级页面或详情页
          console.log('跳转到升级页面');
        }
      }
    });
  } else {
    uni.navigateTo({ 
      url: template.demoUrl,
      fail: () => {
        uni.showToast({
          title: '模板演示暂未开放',
          icon: 'none'
        });
      }
    });
  }
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
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
  margin: -30rpx 30rpx 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  padding: 16rpx 20rpx;
}

.category-tabs {
  display: flex;
  padding: 20rpx 30rpx;
  gap: 16rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.tab-item {
  flex-shrink: 0;
  padding: 12rpx 24rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
  font-size: 26rpx;
  color: #666;
  transition: all 0.3s ease;
}

.tab-item.active {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.template-section {
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

.template-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 0 30rpx;
}

.template-card {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.template-card:active {
  transform: scale(0.98);
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.card-image {
  position: relative;
  height: 200rpx;
  overflow: hidden;
}

.card-image image {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.template-badge {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  font-size: 20rpx;
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
  font-weight: bold;
}

.template-badge.premium {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
}

.card-content {
  padding: 20rpx;
}

.template-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
  display: block;
  line-height: 1.3;
}

.template-desc {
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

.template-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-bottom: 16rpx;
}

.tag {
  background: #f0f0f0;
  color: #666;
  font-size: 20rpx;
  padding: 4rpx 8rpx;
  border-radius: 6rpx;
}

.template-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.info-label {
  font-size: 20rpx;
  color: #999;
}

.info-value {
  font-size: 24rpx;
  color: #333;
  font-weight: 500;
}

/* 响应式适配 */
@media (max-width: 750rpx) {
  .template-grid {
    grid-template-columns: 1fr;
  }
  
  .card-image {
    height: 300rpx;
  }
}

/* 滚动条样式 */
.category-tabs::-webkit-scrollbar {
  display: none;
}
</style>