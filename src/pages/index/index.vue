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
      { title: "Button 按钮", path: "/pages2/button/index" },
      { title: "share-sheet 分享", path: "/pages2/share-sheet/index" },
      { title: "barrage 弹幕", path: "/pages2/barrage/index" },
      { title: "Icon 图标", path: "/pages2/icon/index" },
      { title: "Icon 图标列表", path: "/pages2/icon/list" },
      { title: "Text 文本", path: "/pages2/text/index" },
      { title: "Link 链接", path: "/pages2/link/index" },
      { title: "Title 标题", path: "/pages2/title/index" },
      { title: "Divider 分割线", path: "/pages2/divider/index" },
      { title: "Badge 徽标", path: "/pages2/badge/index" },
      { title: "Tag 标签", path: "/pages2/tag/index" }
    ]
  },
  {
    title: "布局组件",
    lists: [
      { title: "Row 行", path: "/pages2/row/index" },
      { title: "Col 列", path: "/pages2/col/index" },
      { title: "Grid 宫格", path: "/pages2/grid/index" },
      { title: "Cell 单元格", path: "/pages2/cell/index" },
      { title: "Space 间距", path: "/pages2/space/index" },
      { title: "Flex 弹性布局", path: "/pages2/flex/index" },
      { title: "Group 分组", path: "/pages2/group/index" },
      { title: "Line 线条", path: "/pages2/line/index" },
      { title: "Section 区块", path: "/pages2/section/index" },
      { title: "Sticky 吸顶", path: "/pages2/sticky/index" },
      { title: "Affix 固钉", path: "/pages2/affix/index" }
    ]
  },
  {
    title: "表单组件",
    lists: [
      { title: "Input 输入框", path: "/pages2/input/index" },
      { title: "Textarea 文本域", path: "/pages3/textarea/index" },
      { title: "Radio 单选框", path: "/pages2/radio/index" },
      { title: "Checkbox 复选框", path: "/pages3/checkbox/index" },
      { title: "Switch 开关", path: "/pages3/switch/index" },
      { title: "Slider 滑块", path: "/pages3/slider/index" },
      { title: "Form 表单", path: "/pages2/form/index" },
      { title: "Rate 评分", path: "/pages3/rate/index" },
      { title: "Calendar 日历", path: "/pages2/calendar/index" },
      { title: "Picker 选择器", path: "/pages2/picker/index" },
      { title: "Picker view 选择器", path: "/pages2/picker/view" },
      { title: "Date-picker 日期选择器", path: "/pages3/date-picker/index" },
      { title: "Area-picker 地区选择器", path: "/pages3/area-picker/index" },
      { title: "Select 选择器", path: "/pages2/select/index" },
      { title: "Select-v2 虚拟化选择器", path: "/pages2/select-v2/index" },
      { title: "Upload 上传", path: "/pages2/upload/index" },
      { title: "Color-picker 颜色选择器", path: "/pages3/color-picker/index" },
      { title: "Car-number 车牌号输入", path: "/pages2/car-number/index" },
      { title: "SMS-code 验证码", path: "/pages2/sms-code/index" },
      { title: "Autocomplete 自动完成", path: "/pages3/autocomplete/index" },
      { title: "submit-bar 提交订单栏", path: "/pages3/submit/bar" },
      { title: "number-keyboard", path: "/pages3/number-keyboard/index" },
      { title: "password-input", path: "/pages3/password-input/index" },
      { title: "uploader", path: "/pages3/uploader/index" },
      { title: "floating-panel", path: "/pages3/floating-panel/index" },
      { title: "floating-bubble", path: "/pages3/floating-bubble/index" },
    ]
  },
  {
    title: "数据展示",
    lists: [
      { title: "Table 表格", path: "/pages2/table/index" },
      { title: "Card 卡片", path: "/pages3/card/index" },
      { title: "List 列表", path: "/pages2/list/index" },
      { title: "List-chat 聊天列表", path: "/pages3/list/chat" },
      { title: "Collapse 折叠面板", path: "/pages3/collapse/index" },
      { title: "Descriptions 描述列表", path: "/pages3/descriptions/index" },
      { title: "Timeline 时间轴", path: "/pages2/timeline/index" },
      { title: "Tree 树形控件", path: "/pages2/tree/index" },
      { title: "Statistic 统计数值", path: "/pages2/statistic/index" },
      { title: "Pagination 分页", path: "/pages3/pagination/index" },
      { title: "Waterfall 瀑布流", path: "/pages2/waterfall/index" },
      { title: "Indexed-list 索引列表", path: "/pages2/indexed-list/index" },
      { title: "Progress 进度条", path: "/pages2/progress/index" },
      { title: "Countdown 倒计时", path: "/pages3/countdown/index" },
      { title: "Steps 步骤条", path: "/pages2/steps/index" }
    ]
  },
  {
    title: "导航组件",
    lists: [
      { title: "Navbar 导航栏", path: "/pages3/navbar/index" },
      { title: "tabbar 导航栏", path: "/pages2/tabbar/index" },
      { title: "Tabs 标签页", path: "/pages3/tabs/index" },
      { title: "Segmented 分段器", path: "/pages2/segmented/index" },
      { title: "Toolbar 工具栏", path: "/pages2/toolbar/index" },
      { title: "Menu 菜单", path: "/pages3/menu/index" },
      { title: "Dropdown 下拉菜单", path: "/pages3/dropdown/index" },
      { title: "Breadcrumb 面包屑", path: "/pages3/breadcrumb/index" },
      { title: "Backtop 回到顶部", path: "/pages3/backtop/index" },
      { title: "Page-header 页头", path: "/pages3/page-header/index" },
      { title: "Anchor 锚点", path: "/pages3/anchor/index" },
      { title: "address-list", path: "/pages3/address-list/index" },
      { title: "address-edit", path: "/pages3/address-edit/index" },
      { title: "contact-list", path: "/pages3/contact-list/index" },
      { title: "contact-card", path: "/pages3/contact-card/index" },
      { title: "contact-edit", path: "/pages3/contact-edit/index" },
      { title: "coupon-list", path: "/pages3/coupon-list/index" },
    ]
  },
  {
    title: "反馈组件",
    lists: [
      { title: "Alert 警告提示", path: "/pages3/alert/index" },
      { title: "Dialog 对话框", path: "/pages3/dialog/index" },
      { title: "Drawer 抽屉", path: "/pages3/drawer/index" },
      { title: "Toast 轻提示", path: "/pages2/toast/index" },
      { title: "Tips 提示", path: "/pages2/tips/index" },
      { title: "Notify 通知", path: "/pages3/notify/index" },
      { title: "Popconfirm 气泡确认框", path: "/pages3/popconfirm/index" },
      { title: "Popover 气泡卡片", path: "/pages3/popover/index" },
      { title: "Popup 弹出层", path: "/pages3/popup/index" },
      { title: "Action-sheet 动作面板", path: "/pages2/action-sheet/index" },
      { title: "Overlay 遮罩", path: "/pages3/overlay/index" },
      { title: "Result 结果", path: "/pages3/result/index" },
      { title: "Empty 空状态", path: "/pages3/empty/index" },
      { title: "Skeleton 骨架屏", path: "/pages3/skeleton/index" },
      { title: "No-network 无网络", path: "/pages3/no-network/index" },
      { title: "Notice-bar 通知栏", path: "/pages3/notice-bar/index" },
      { title: "Loading 加载", path: "/pages2/loading/index" },
      { title: "Tooltip 文字提示", path: "/pages2/tooltip/index" },
      { title: "Watermark 水印", path: "/pages3/watermark/index" },
      { title: "pull-refresh", path: "/pages3/pull-refresh/index" },
      { title: "swipe-cell", path: "/pages3/swipe-cell/index" },
      { title: "circle", path: "/pages3/circle/index" },
      { title: "highlight", path: "/pages3/highlight/index" },
      { title: "image-preview", path: "/pages3/image-preview/index" },
      { title: "lazyload", path: "/pages3/lazyload/index" },
      { title: "rolling-text", path: "/pages3/rolling-text/index" },
      { title: "sidebar", path: "/pages3/sidebar/index" },
      { title: "tree-select", path: "/pages3/tree-select/index" },
      { title: "area", path: "/pages3/area/index" },
    ]
  },
  {
    title: "媒体组件",
    lists: [
      { title: "Image 图片", path: "/pages3/image/index" },
      { title: "Avatar 头像", path: "/pages3/avatar/index" },
      { title: "Swiper 轮播", path: "/pages3/swiper/index" },
      { title: "Gallery 图片预览", path: "/pages2/gallery/index" },
      { title: "Video 视频", path: "/pages3/video/index" },
      { title: "Audio 音频", path: "/pages3/audio/index" },
      { title: "Canvas 画布", path: "/pages2/canvas/index" },
      { title: "Camera 相机", path: "/pages2/camera/index" },
      { title: "Barcode 条形码", path: "/pages2/barcode/index" },
      { title: "Qrcode 二维码", path: "/pages2/qrcode/index" },
      { title: "Html 富文本", path: "/pages2/html/index" },
      { title: "Code 代码", path: "/pages2/code/index" },
      { title: "Web-view 网页视图", path: "/pages2/web-view/index" },
      { title: "Richtext 富文本", path: "/pages2/richtext/index" },
      { title: "Editor 编辑器", path: "/pages2/editor/index" },
      { title: "File 文件", path: "/pages2/file/index" },
      { title: "Album 相册", path: "/pages2/album/index" },
      { title: "Map 地图", path: "/pages2/map/index" }
    ]
  },
  {
    title: "交互组件",
    lists: [
      { title: "Fab 悬浮按钮", path: "/pages2/fab/index" },
      { title: "Fav 收藏", path: "/pages2/fav/index" },
      { title: "Drag 拖动", path: "/pages2/drag/index" },
      { title: "Touch 触摸", path: "/pages2/touch/index" },
      { title: "Sign 签名", path: "/pages2/sign/index" },
      { title: "Stamp 印章", path: "/pages2/stamp/index" },
      { title: "Tour 引导", path: "/pages2/tour/index" },
      { title: "Search-bar 搜索栏", path: "/pages2/search-bar/index" },
      { title: "Read-more 阅读更多", path: "/pages2/read-more/index" },
      { title: "Swipe-action 滑动操作", path: "/pages2/swipe-action/index" },
      { title: "Refresh 下拉刷新", path: "/pages2/refresh/index" },
      { title: "Scroll 滚动列表", path: "/pages2/scroll/index" },
      { title: "Scrollbar 滚动条", path: "/pages2/scrollbar/index" },
      { title: "Movable 可移动", path: "/pages2/movable/index" },
      { title: "Landscape 强制横屏", path: "/pages2/landscape/index" },
      { title: "Recorder 录音", path: "/pages2/recorder/index" },
      { title: "Cropper 裁剪", path: "/pages2/cropper/index" },
      { title: "More 更多", path: "/pages2/more/index" },
      { title: "PK 拼杀", path: "/pages2/pk/index" },
      { title: "Goods-nav 商品导航", path: "/pages2/goods-nav/index" },
      { title: "Goods-card 商品卡片", path: "/pages3/goods/card" },
      { title: "SquareNine 九宫格抽奖", path: "/pages3/square-nine/index" },
    ]
  },
  {
    title: "图表/游戏",
    lists: [
      { title: "Charts-area 区域图", path: "/pages2/charts/area" },
      { title: "Charts-bar 柱状图", path: "/pages2/charts/bar" },
      { title: "Charts-column 柱状图", path: "/pages2/charts/column" },
      { title: "Charts-funnel 漏斗图", path: "/pages2/charts/funnel" },
      { title: "Charts-line 折线图", path: "/pages2/charts/line" },
      { title: "Charts-pie 饼状图", path: "/pages2/charts/pie" },
      { title: "Charts-radar 雷达图", path: "/pages2/charts/radar" },
      { title: "Charts-scatter 散点图", path: "/pages2/charts/scatter" },
      { title: "Lucky-wheel 幸运轮盘", path: "/pages2/lucky/wheel" },
      { title: "Turntable 转盘", path: "/pages2/turntable/index" }
    ]
  },
  {
    title: "其他组件",
    lists: [
      { title: "Transition 过渡动画", path: "/pages2/transition/index" },
      { title: "Status-bar 状态栏", path: "/pages2/status-bar/index" },
      { title: "Safe-bottom 安全区域", path: "/pages2/safe-bottom/index" },
      { title: "Copyright 版权", path: "/pages2/copyright/index" },
      { title: "Poster 海报", path: "/pages2/poster/index" },
      { title: "Transfer 穿梭框", path: "/pages2/transfer/index" },
      { title: "Time-picker 时间选择器", path: "/pages2/time/picker" },
      { title: "Time-select 时间选择器", path: "/pages2/time/select" },
      { title: "Mention 提及", path: "/pages2/mention/index" },
      { title: "Carousel 轮播", path: "/pages2/carousel/index" },
      { title: "Cascader 级联选择", path: "/pages2/cascader/index" },
      { title: "Capsule 胶囊", path: "/pages2/capsule/index" },
      { title: "Label 标签", path: "/pages2/label/index" },
      { title: "Coupon 优惠券", path: "/pages2/coupon/index" }
    ]
  }
]);

// 新增底部导航数据
const tabbarValue = ref(0);
const tabbarList = [
  { icon: 'home', title: '首页', name: 0,path:'/pages/index/index' },
  { icon: 'server-man', title: 'AI', name: 1,path:'/pages/ai/ai' },
  { icon: 'integral', title: '专题', name: 2,path:'/pages/topic/topic', dot: true },
  { icon: 'grid', title: '模板', name: 3,path:'/pages/template/template' },
  { icon: 'account', title: '我的', name: 4,path:'/pages/my/my' }
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
  let path = tabbarList.find(item => item.name == name).path;
  uni.navigateTo({ url: path });
  console.log(name)
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
