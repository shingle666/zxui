<template>
  <view class="content">
    <view class="header">
      <image class="logo" src="https://zxui.org/logo.png" mode="widthFix" />
      <text class="title">zxUI</text>
      <text class="slogan">多平台快速开发的UI框架</text>
      <text class="desc">zxUI是一套基于uni-app开发的跨平台UI框架，提供丰富组件、布局及界面库，让你一套代码多端发布。</text>
    </view>
    <view class="search-bar-container">
      <zx-search-bar v-model="searchValue" placeholder="功能搜索" @confirm="handleSearch" :bgColor="'#fff'" />
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
          <text class="item-title">{{ item.title }}</text>
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

const title = ref("功能组件");
const scrollTop = ref(0);
const datalist = ref([
  {
    title: "基础组件",
    lists: [
      { title: "Button 按钮", path: "/pages/components/button/index" },
      { title: "Icon 图标", path: "/pages/components/icon/index" },
      { title: "Icon 图标列表", path: "/pages/components/icon/list" },
      { title: "Text 文本", path: "/pages/components/text/index" },
      { title: "Link 链接", path: "/pages/components/link/index" },
      { title: "Title 标题", path: "/pages/components/title/index" },
      { title: "Divider 分割线", path: "/pages/components/divider/index" },
      { title: "Badge 徽标", path: "/pages/components/badge/index" },
      { title: "Tag 标签", path: "/pages/components/tag/index" }
    ]
  },
  {
    title: "布局组件",
    lists: [
      { title: "Row 行", path: "/pages/components/row/index" },
      { title: "Col 列", path: "/pages/components/col/index" },
      { title: "Grid 宫格", path: "/pages/components/grid/index" },
      { title: "Cell 单元格", path: "/pages/components/cell/index" },
      { title: "Space 间距", path: "/pages/components/space/index" },
      { title: "Flex 弹性布局", path: "/pages/components/flex/index" },
      { title: "Group 分组", path: "/pages/components/group/index" },
      { title: "Line 线条", path: "/pages/components/line/index" },
      { title: "Section 区块", path: "/pages/components/section/index" },
      { title: "Sticky 吸顶", path: "/pages/components/sticky/index" },
      { title: "Affix 固钉", path: "/pages/components/affix/index" }
    ]
  },
  {
    title: "表单组件",
    lists: [
      { title: "Input 输入框", path: "/pages/components/input/index" },
      { title: "Textarea 文本域", path: "/pages/components/textarea/index" },
      { title: "Radio 单选框", path: "/pages/components/radio/index" },
      { title: "Checkbox 复选框", path: "/pages/components/checkbox/index" },
      { title: "Switch 开关", path: "/pages/components/switch/index" },
      { title: "Slider 滑块", path: "/pages/components/slider/index" },
      { title: "Form 表单", path: "/pages/components/form/index" },
      { title: "Rate 评分", path: "/pages/components/rate/index" },
      { title: "Calendar 日历", path: "/pages/components/calendar/index" },
      { title: "Picker 选择器", path: "/pages/components/picker/index" },
      { title: "Picker view 选择器", path: "/pages/components/picker/view" },
      { title: "Date-picker 日期选择器", path: "/pages/components/date-picker/index" },
      { title: "Area-picker 地区选择器", path: "/pages/components/area-picker/index" },
      { title: "Select 选择器", path: "/pages/components/select/index" },
      { title: "Select-v2 虚拟化选择器", path: "/pages/components/select-v2/index" },
      { title: "Upload 上传", path: "/pages/components/upload/index" },
      { title: "Color-picker 颜色选择器", path: "/pages/components/color-picker/index" },
      { title: "Car-number 车牌号输入", path: "/pages/components/car-number/index" },
      { title: "SMS-code 验证码", path: "/pages/components/sms-code/index" },
      { title: "Autocomplete 自动完成", path: "/pages/components/autocomplete/index" }
    ]
  },
  {
    title: "数据展示",
    lists: [
      { title: "Table 表格", path: "/pages/components/table/index" },
      { title: "Card 卡片", path: "/pages/components/card/index" },
      { title: "List 列表", path: "/pages/components/list/index" },
      { title: "List-item 列表项", path: "/pages/components/list/item" },
      { title: "List-chat 聊天列表", path: "/pages/components/list/chat" },
      { title: "Collapse 折叠面板", path: "/pages/components/collapse/index" },
      { title: "Descriptions 描述列表", path: "/pages/components/descriptions/index" },
      { title: "Timeline 时间轴", path: "/pages/components/timeline/index" },
      { title: "Tree 树形控件", path: "/pages/components/tree/index" },
      { title: "Statistic 统计数值", path: "/pages/components/statistic/index" },
      { title: "Pagination 分页", path: "/pages/components/pagination/index" },
      { title: "Waterfall 瀑布流", path: "/pages/components/waterfall/index" },
      { title: "Indexed-list 索引列表", path: "/pages/components/indexed-list/index" },
      { title: "Progress 进度条", path: "/pages/components/progress/index" },
      { title: "Countdown 倒计时", path: "/pages/components/countdown/index" },
      { title: "Steps 步骤条", path: "/pages/components/steps/index" }
    ]
  },
  {
    title: "导航组件",
    lists: [
      { title: "Navbar 导航栏", path: "/pages/components/navbar/index" },
      { title: "Tabs 标签页", path: "/pages/components/tabs/index" },
      { title: "Segmented 分段器", path: "/pages/components/segmented/index" },
      { title: "Toolbar 工具栏", path: "/pages/components/toolbar/index" },
      { title: "Menu 菜单", path: "/pages/components/menu/index" },
      { title: "Dropdown 下拉菜单", path: "/pages/components/dropdown/index" },
      { title: "Breadcrumb 面包屑", path: "/pages/components/breadcrumb/index" },
      { title: "Backtop 回到顶部", path: "/pages/components/backtop/index" },
      { title: "Page-header 页头", path: "/pages/components/page-header/index" },
      { title: "Anchor 锚点", path: "/pages/components/anchor/index" }
    ]
  },
  {
    title: "反馈组件",
    lists: [
      { title: "Alert 警告提示", path: "/pages/components/alert/index" },
      { title: "Dialog 对话框", path: "/pages/components/dialog/index" },
      { title: "Drawer 抽屉", path: "/pages/components/drawer/index" },
      { title: "Toast 轻提示", path: "/pages/components/toast/index" },
      { title: "Tips 提示", path: "/pages/components/tips/index" },
      { title: "Notify 通知", path: "/pages/components/notify/index" },
      { title: "Popconfirm 气泡确认框", path: "/pages/components/popconfirm/index" },
      { title: "Popover 气泡卡片", path: "/pages/components/popover/index" },
      { title: "Popup 弹出层", path: "/pages/components/popup/index" },
      { title: "Action-sheet 动作面板", path: "/pages/components/action-sheet/index" },
      { title: "Overlay 遮罩", path: "/pages/components/overlay/index" },
      { title: "Result 结果", path: "/pages/components/result/index" },
      { title: "Empty 空状态", path: "/pages/components/empty/index" },
      { title: "Skeleton 骨架屏", path: "/pages/components/skeleton/index" },
      { title: "No-network 无网络", path: "/pages/components/no-network/index" },
      { title: "Notice-bar 通知栏", path: "/pages/components/notice-bar/index" },
      { title: "Loading 加载", path: "/pages/components/loading/index" },
      { title: "Tooltip 文字提示", path: "/pages/components/tooltip/index" },
      { title: "Watermark 水印", path: "/pages/components/watermark/index" }
    ]
  },
  {
    title: "媒体组件",
    lists: [
      { title: "Image 图片", path: "/pages/components/image/index" },
      { title: "Avatar 头像", path: "/pages/components/avatar/index" },
      { title: "Swiper 轮播", path: "/pages/components/swiper/index" },
      { title: "Gallery 图片预览", path: "/pages/components/gallery/index" },
      { title: "Video 视频", path: "/pages/components/video/index" },
      { title: "Audio 音频", path: "/pages/components/audio/index" },
      { title: "Canvas 画布", path: "/pages/components/canvas/index" },
      { title: "Camera 相机", path: "/pages/components/camera/index" },
      { title: "Barcode 条形码", path: "/pages/components/barcode/index" },
      { title: "Qrcode 二维码", path: "/pages/components/qrcode/index" },
      { title: "Html 富文本", path: "/pages/components/html/index" },
      { title: "Code 代码", path: "/pages/components/code/index" },
      { title: "Web-view 网页视图", path: "/pages/components/web-view/index" },
      { title: "Richtext 富文本", path: "/pages/components/richtext/index" },
      { title: "Editor 编辑器", path: "/pages/components/editor/index" },
      { title: "File 文件", path: "/pages/components/file/index" },
      { title: "Album 相册", path: "/pages/components/album/index" },
      { title: "Map 地图", path: "/pages/components/map/index" }
    ]
  },
  {
    title: "交互组件",
    lists: [
      { title: "Fab 悬浮按钮", path: "/pages/components/fab/index" },
      { title: "Fav 收藏", path: "/pages/components/fav/index" },
      { title: "Drag 拖动", path: "/pages/components/drag/index" },
      { title: "Touch 触摸", path: "/pages/components/touch/index" },
      { title: "Sign 签名", path: "/pages/components/sign/index" },
      { title: "Stamp 印章", path: "/pages/components/stamp/index" },
      { title: "Tour 引导", path: "/pages/components/tour/index" },
      { title: "Search-bar 搜索栏", path: "/pages/components/search-bar/index" },
      { title: "Read-more 阅读更多", path: "/pages/components/read-more/index" },
      { title: "Swipe-action 滑动操作", path: "/pages/components/swipe-action/index" },
      { title: "Refresh 下拉刷新", path: "/pages/components/refresh/index" },
      { title: "Scroll 滚动列表", path: "/pages/components/scroll/index" },
      { title: "Scrollbar 滚动条", path: "/pages/components/scrollbar/index" },
      { title: "Movable 可移动", path: "/pages/components/movable/index" },
      { title: "Landscape 强制横屏", path: "/pages/components/landscape/index" },
      { title: "Recorder 录音", path: "/pages/components/recorder/index" },
      { title: "Cropper 裁剪", path: "/pages/components/cropper/index" },
      { title: "More 更多", path: "/pages/components/more/index" },
      { title: "PK 拼杀", path: "/pages/components/pk/index" },
      { title: "Goods-nav 商品导航", path: "/pages/components/goods-nav/index" }
    ]
  },
  {
    title: "图表/游戏",
    lists: [
      { title: "Charts-area 区域图", path: "/pages/components/charts/area" },
      { title: "Charts-bar 柱状图", path: "/pages/components/charts/bar" },
      { title: "Charts-column 柱状图", path: "/pages/components/charts/column" },
      { title: "Charts-funnel 漏斗图", path: "/pages/components/charts/funnel" },
      { title: "Charts-line 折线图", path: "/pages/components/charts/line" },
      { title: "Charts-pie 饼状图", path: "/pages/components/charts/pie" },
      { title: "Charts-radar 雷达图", path: "/pages/components/charts/radar" },
      { title: "Charts-scatter 散点图", path: "/pages/components/charts/scatter" },
      { title: "Lucky-grid 九宫格抽奖", path: "/pages/components/lucky/grid" },
      { title: "Lucky-wheel 幸运轮盘", path: "/pages/components/lucky/wheel" },
      { title: "Lucky-box 幸运宝箱", path: "/pages/components/lucky/box" },
      { title: "Turntable 转盘", path: "/pages/components/turntable/index" }
    ]
  },
  {
    title: "其他组件",
    lists: [
      { title: "Transition 过渡动画", path: "/pages/components/transition/index" },
      { title: "Status-bar 状态栏", path: "/pages/components/status-bar/index" },
      { title: "Safe-bottom 安全区域", path: "/pages/components/safe-bottom/index" },
      { title: "Copyright 版权", path: "/pages/components/copyright/index" },
      { title: "Poster 海报", path: "/pages/components/poster/index" },
      { title: "Transfer 穿梭框", path: "/pages/components/transfer/index" },
      { title: "Time-picker 时间选择器", path: "/pages/components/time/picker" },
      { title: "Time-select 时间选择器", path: "/pages/components/time/select" },
      { title: "Mention 提及", path: "/pages/components/mention/index" },
      { title: "Carousel 轮播", path: "/pages/components/carousel/index" },
      { title: "Cascader 级联选择", path: "/pages/components/cascader/index" },
      { title: "Capsule 胶囊", path: "/pages/components/capsule/index" },
      { title: "Label 标签", path: "/pages/components/label/index" },
      { title: "Coupon 优惠券", path: "/pages/components/coupon/index" }
    ]
  }
]);

// 新增底部导航数据
const tabbarValue = ref(0);
const tabbarList = [
  { icon: 'home', title: '基础', name: 0 },
  { icon: 'grid', title: '布局', name: 1, badge: 2 },
  { icon: 'order', title: '表单', name: 2, dot: true },
  { icon: 'camera', title: '媒体', name: 3 },
  { icon: 'chat', title: '交互', name: 4 }
];

// 监听页面滚动
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});


function handleBacktopClick() {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  });
}

function onTabbarChange(name) {
  tabbarValue.value = typeof name === 'number' ? name : tabbarList.findIndex(i => i.name === name);
  // 可根据 name 跳转页面等
  // if (name === 0) uni.switchTab({ url: '/pages/index/index' })
}

function handleClick(path) {
  uni.navigateTo({ url: path });
}

const searchValue = ref("");
const filteredList = computed(() => {
  if (!searchValue.value.trim()) return datalist.value;
  return datalist.value
    .map(category => {
      const filteredItems = category.lists.filter(item =>
        item.title.toLowerCase().includes(searchValue.value.toLowerCase())
      );
      return filteredItems.length
        ? { ...category, lists: filteredItems }
        : null;
    })
    .filter(Boolean);
});

function handleSearch() {
  if (!searchValue.value.trim()) {
    uni.showToast({ title: '请输入关键词', icon: 'none' });
    return;
  }
  if (typeof uni.hideKeyboard === 'function') {
    uni.hideKeyboard();
  }
  // filteredList 已自动响应，无需额外处理
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  padding: 40rpx 30rpx 20rpx 30rpx;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2rpx solid #f0f0f0;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 10rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000;
  margin-bottom: 8rpx;
}

.slogan {
  font-size: 28rpx;
  color: #1989fa;
  margin-bottom: 8rpx;
}

.desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 12rpx;
  text-align: center;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  font-size: 24rpx;
  color: #1989fa;
}

.links navigator {
  color: #1989fa;
}

.category-section {
  margin-bottom: 20rpx;
}

.section-title {
  padding: 20rpx 30rpx;
  padding-bottom: 10rpx;
  font-size: 28rpx;
  color: #666;
  font-weight: 500;
}

.component-list {
  background-color: #fff;
  margin: 0 30rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.component-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.no-border {
  border-bottom: none;
}

.item-title {
  font-size: 28rpx;
  color: #333;
}

.item-arrow {
  color: #ccc;
  font-size: 36rpx;
  font-weight: 300;
}

.search-bar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  padding: 16rpx 20rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
  margin: 24rpx 30rpx 20rpx 30rpx;
}
.search-bar-container .zx-searchbar {
  flex: 1;
}
.search-bar-container .zx-button {
  margin-left: 16rpx;
  height: 72rpx;
  line-height: 72rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
}
</style>
