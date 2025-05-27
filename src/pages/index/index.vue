<template>
  <view class="content">
    <view>
      <zx-text
        v-for="(item, index) in datalist"
        :key="index"
        :text="item.title"
        type="primary"
        @click="handleClick(item.path)"
      ></zx-text>

      <view style="height: 100px"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const title = ref("功能组件");
const datalist = ref([
  { title: "zx-waterfall 瀑布流组件", path: "/pages/components/waterfall/index" },
  { title: "zx-pk ", path: "/pages/components/pk/index" },
  { title: "zx-read-more 组件", path: "/pages/components/read-more/index" },
  { title: "zx-lucky-grid 幸运转盘组件", path: "/pages/components/lucky-grid/index" },
  { title: "zx-list 列表组件", path: "/pages/components/list/index" },
  { title: "zx-list-item 列表项组件", path: "/pages/components/list-item/index" },
  { title: "zx-list-chat 聊天列表组件", path: "/pages/components/list-chat/index" },
  { title: "zx-list-ad 广告列表组件", path: "/pages/components/list-ad/index" },
  { title: "zx-refresh 下拉刷新组件", path: "/pages/components/refresh/index" },
  { title: "zx-landscape 横屏组件", path: "/pages/components/landscape/index" },
  { title: "zx-indexed-list 索引列表组件", path: "/pages/components/indexed-list/index" },
  { title: "zx-group 分组组件", path: "/pages/components/group/index" },
  { title: "zx-grid 宫格组件", path: "/pages/components/grid/index" },
  { title: "zx-goods-nav 商品导航组件", path: "/pages/components/goods-nav/index" },
  { title: "zx-gallery 图片轮播组件", path: "/pages/components/gallery/index" },
  { title: "zx-flex 弹性布局组件", path: "/pages/components/flex/index" },
  { title: "zx-copyright 版权组件", path: "/pages/components/copyright/index" },
  { title: "zx-drag 拖拽组件", path: "/pages/components/drag/index" },
  { title: "zx-coupon 优惠券组件", path: "/pages/components/coupon/index" },
  { title: "zx-cropper 裁剪组件", path: "/pages/components/cropper/index" },
  { title: "zx-charts-area", path: "/pages/components/charts/area" },
  { title: "zx-charts-bar", path: "/pages/components/charts/bar" },
  { title: "zx-charts-column", path: "/pages/components/charts/column" },
  { title: "zx-charts-funnel", path: "/pages/components/charts/funnel" },
  { title: "zx-charts-line", path: "/pages/components/charts/line" },
  { title: "zx-charts-pie", path: "/pages/components/charts/pie" },
  { title: "zx-charts-radar", path: "/pages/components/charts/radar" },
  { title: "zx-charts-scatter", path: "/pages/components/charts/scatter" },
  { title: "zx-cell 组件", path: "/pages/components/cell/index" },
  { title: "zx-cell-group 组件", path: "/pages/components/cell/group" },
  { title: "zx-table 表格组件", path: "/pages/components/table/index" },
  { title: "zx-capsule 胶囊组件", path: "/pages/components/capsule/index" },
  { title: "zx-text 组件使用示例", path: "/pages/components/text/index" },
  { title: "zx-icon 组件使用示例", path: "/pages/components/icon/index" },
  { title: "zx-avatar 组件使用示例", path: "/pages/components/avatar/index" },
  { title: "zx-button 组件使用示例", path: "/pages/components/button/index" },
  { title: "zx-badge 组件使用示例", path: "/pages/components/badge/index" },
  { title: "zx-album 组件使用示例", path: "/pages/components/album/index" },
  { title: "zx-area-picker 组件使用示例", path: "/pages/components/area-picker/index" },
  { title: "zx-audio 组件使用示例", path: "/pages/components/audio/index" },
  { title: "zx-video 组件使用示例", path: "/pages/components/video/index" },
  { title: "zx-camera 组件使用示例", path: "/pages/components/camera/index" },
  { title: "zx-status-bar 组件使用示例", path: "/pages/components/status-bar/index" },
  { title: "zx-safe-bottom 组件使用示例", path: "/pages/components/safe-bottom/index" },
  { title: "zx-transition 组件使用示例", path: "/pages/components/transition/index" },
  { title: "zx-overlay 组件使用示例", path: "/pages/components/overlay/index" },
  { title: "zx-popup 组件使用示例", path: "/pages/components/popup/index" },
  { title: "zx-image 组件使用示例", path: "/pages/components/image/index" },
  { title: "zx-avatar-group 组件使用示例", path: "/pages/components/avatar/group" },
  { title: "zx-calendar 组件使用示例", path: "/pages/components/calendar/index" },
  { title: "zx-canvas 组件使用示例", path: "/pages/components/canvas/index" },
  { title: "zx-card 组件使用示例", path: "/pages/components/card/index" },
  { title: "zx-autocomplete 组件使用示例", path: "/pages/components/autocomplete/index" },
  { title: "zx-checkbox 组件使用示例", path: "/pages/components/checkbox/index" },
  { title: "zx-checkbox-group 组件使用示例", path: "/pages/components/checkbox/group" },
  { title: "zx-empty 组件使用示例", path: "/pages/components/empty/index" },
  { title: "zx-backtop 组件使用示例", path: "/pages/components/backtop/index" },
  { title: "zx-link 组件使用示例", path: "/pages/components/link/index" },
  { title: "zx-map 组件使用示例", path: "/pages/components/map/index" },
  { title: "zx-qrcode 组件使用示例", path: "/pages/components/qrcode/index" },
  { title: "zx-editor 组件使用示例", path: "/pages/components/editor/index" },
  { title: "zx-tabs 组件使用示例", path: "/pages/components/tabs/index" },
  { title: "zx-title 组件使用示例", path: "/pages/components/title/index" },
  { title: "zx-swiper 组件使用示例", path: "/pages/components/swiper/index" },
  { title: "zx-html 组件使用示例", path: "/pages/components/html/index" },
  { title: "zx-slider 组件使用示例", path: "/pages/components/slider/index" },
  { title: "zx-upload 组件使用示例", path: "/pages/components/upload/index" },
  { title: "zx-navbar 组件使用示例", path: "/pages/components/navbar/index" },
  { title: "zx-code 组件使用示例", path: "/pages/components/code/index" },
  { title: "zx-switch 组件使用示例", path: "/pages/components/switch/index" },
  { title: "zx-textarea 组件使用示例", path: "/pages/components/textarea/index" },
  { title: "zx-tag 组件使用示例", path: "/pages/components/tag/index" },
  { title: "zx-swipe-action 组件使用示例", path: "/pages/components/swipe-action/index" },
  { title: "zx-mention 组件使用示例", path: "/pages/components/mention/index" },
  { title: "zx-movable 组件使用示例", path: "/pages/components/movable/index" },
  { title: "zx-descriptions 组件使用示例", path: "/pages/components/descriptions/index" },
  { title: "zx-pagination 组件使用示例", path: "/pages/components/pagination/index" },
  { title: "zx-result 组件使用示例", path: "/pages/components/result/index" },
  { title: "zx-skeleton 组件使用示例", path: "/pages/components/skeleton/index" },
  { title: "zx-alert 组件使用示例", path: "/pages/components/alert/index" },
  { title: "zx-affix 组件使用示例", path: "/pages/components/affix/index" },
  { title: "zx-affix 组件测试", path: "/pages/components/affix/test" },
  { title: "zx-affix 组件使用示例 example", path: "/pages/components/affix/example" },
  { title: "zx-watermark 组件使用示例", path: "/pages/components/watermark/index" },
  { title: "zx-scrollbar 组件使用示例", path: "/pages/components/scrollbar/index" },
  { title: "zx-space 组件使用示例", path: "/pages/components/space/index" },
  { title: "zx-sticky 组件使用示例", path: "/pages/components/sticky/index" },
  { title: "zx-sticky 组件测试", path: "/pages/components/sticky/demo" },
  { title: "tag check", path: "/pages/components/tag/check" },
  { title: "breadcrumb", path: "/pages/components/breadcrumb/index" },
  { title: "combox", path: "/pages/components/combox/index" },
  { title: "countdown", path: "/pages/components/countdown/index" },
  { title: "fab", path: "/pages/components/fab/index" },
  { title: "fav", path: "/pages/components/fav/index" },
  { title: "anchor", path: "/pages/components/anchor/index" },
  { title: "color-picker", path: "/pages/components/color-picker/index" },
  { title: "date-picker", path: "/pages/components/date-picker/index" },
  { title: "dialog", path: "/pages/components/dialog/index" },
  { title: "drawer", path: "/pages/components/drawer/index" },
  { title: "dropdown", path: "/pages/components/dropdown/index" },
  { title: "menu", path: "/pages/components/menu/index" },
  { title: "popconfirm", path: "/pages/components/popconfirm/index" },
  { title: "popover", path: "/pages/components/popover/index" },
  { title: "zx-file 文件操作组件", path: "/pages/components/file/index" },
  { title: "zx-file 文件上传案例", path: "/pages/components/file/demo" },
  { title: "zx-rate 评分组件", path: "/pages/components/rate/index" },
  { title: "zx-scroll 滚动组件", path: "/pages/components/scroll/index" },
  { title: "zx-section 组件", path: "/pages/components/section/index" },
  { title: "zx-segmented 分段控制器", path: "/pages/components/segmented/index" },
  { title: "zx-select 选择器", path: "/pages/components/select/index" },
  { title: "zx-select-v2 虚拟化选择器", path: "/pages/components/select-v2/index" },
  { title: "zx-statistic 统计组件", path: "/pages/components/statistic/index" },
  { title: "zx-steps 步骤条组件", path: "/pages/components/steps/index" },
  { title: "zx-swipe-action 滑动操作组件", path: "/pages/components/swipe-action/index" },
  { title: "zx-car-number 车牌号输入组件", path: "/pages/components/car-number/index" },
  { title: "zx-action-sheet 动作面板", path: "/pages/components/action-sheet/index" },
  { title: "zx-barcode 条形码组件", path: "/pages/components/barcode/index" }
]);

onLoad((options) => {
  console.log(JSON.stringify(options));
});

const handleClick = (path) => {
  uni.navigateTo({
    url: path,
  });
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
