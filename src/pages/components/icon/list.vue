<template>
  <view class="icon-list-container">
    <view v-for="(icons, category) in categorizedIcons" :key="category" class="icon-category">
      <view class="category-title">{{ category }}</view>
      <view class="icon-grid">
        <view class="icon-item" v-for="icon in icons" :key="icon">
          <zx-icon :name="icon" size="40rpx" />
          <text class="icon-name">{{ icon }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 所有图标名（自动提取自 icon.css，省略内容仅示例，实际应包含全部）
const allIcons = [
  'error-circle-fill', 'error-circle', 'twitte', 'twitter-circle-fill', 'download',
  'checkbox-mark', 'mic-off', 'mic', 'column-line', 'pause', 'chat-fill', 'chat',
  'star-fill', 'star', 'phone-fill', 'phone', 'map-fill', 'map', 'tags-fill', 'tags',
  'bookmark-fill', 'bookmark', 'calendar-fill', 'calendar', 'trash-fill', 'trash',
  'checkmark-circle', 'checkmark-circle-fill', 'close-circle-fill', 'close-circle',
  'share', 'share-fill', 'edit-pen', 'edit-pen-fill', 'clock-fill', 'clock',
  'facebook-circle-fill', 'facebook', 'eye-off', 'eye-off-outline', 'eye-fill', 'eye',
  'arrow-down-fill', 'arrow-up-fill', 'play-left-fill', 'play-right-fill', 'play-left',
  'play-right', 'photo-fill', 'photo', 'volume-off-fill', 'volume-off', 'volume-fill',
  'volume-up', 'red-packet-fill', 'red-packet', 'man-delete', 'person-delete-fill',
  'man-add', 'man-add-fill', 'info-circle-fill', 'info-circle', 'level', 'folder',
  'movie', 'apple-fill', 'chrome-circle-fill', 'backspace', 'attach', 'cut',
  'empty-car', 'empty-coupon', 'empty-address', 'empty-favor', 'empty-permission',
  'empty-news', 'empty-search', 'github-circle-fill', 'rmb', 'reload', 'order',
  'server-man', 'search', 'fingerprint', 'more-dot-fill', 'scan', 'share-square',
  'minus', 'plus', 'info', 'question', 'error', 'close', 'checkmark',
  'android-circle-fill', 'android-fill', 'ie', 'IE-circle-fill', 'google',
  'google-circle-fill', 'setting-fill', 'setting', 'minus-square-fill',
  'plus-square-fill', 'heart', 'heart-fill', 'camera', 'camera-fill', 'more-circle',
  'more-circle-fill', 'bag-fill', 'bag', 'question-circle-fill', 'question-circle',
  'shopping-cart', 'shopping-cart-fill', 'bell', 'bell-fill', 'list', 'list-dot',
  'zhihu', 'zhihu-circle-fill', 'zhifubao', 'zhifubao-circle-fill',
  'weixin-circle-fill', 'weixin-fill', 'taobao-circle-fill', 'taobao',
  'weibo-circle-fill', 'weibo', 'qq-fill', 'qq-circle-fill', 'moments-circel-fill',
  'moments', 'qzone', 'qzone-circle-fill', 'baidu-circle-fill', 'baidu', 'car',
  'car-fill', 'warning-fill', 'warning', 'email', 'email-fill', 'minus-circle',
  'minus-circle-fill', 'plus-circle', 'plus-circle-fill', 'file-text',
  'file-text-fill', 'pushpin', 'pushpin-fill', 'grid', 'grid-fill', 'play-circle',
  'play-circle-fill', 'pause-circle-fill', 'pause-circle', 'gift-fill', 'gift',
  'rmb-circle-fill', 'rmb-circle', 'kefu-ermai', 'server-fill', 'coupon-fill',
  'coupon', 'integral', 'integral-fill', 'home-fill', 'home', 'hourglass-half-fill',
  'hourglass', 'account', 'plus-people-fill', 'minus-people-fill', 'account-fill',
  'thumb-down-fill', 'thumb-down', 'thumb-up', 'thumb-up-fill', 'lock-fill',
  'lock-open', 'lock-opened-fill', 'lock', 'rewind-left-fill', 'rewind-right-fill',
  'arrow-downward', 'arrow-rightward', 'arrow-leftward', 'arrow-upward',
  'arrow-down', 'arrow-right', 'arrow-left', 'arrow-up', 'skip-back-left',
  'skip-forward-right', 'rewind-right', 'rewind-left', 'arrow-right-double',
  'arrow-left-double', 'wifi-off', 'wifi', 'empty-data', 'empty-history',
  'empty-list', 'empty-page', 'empty-order', 'man', 'woman', 'zh', 'en'
]

// 分类规则（可根据实际情况调整）
const categories = {
  '系统/通用': [
    'error-circle-fill', 'error-circle', 'info', 'info-circle-fill', 'info-circle', 'warning', 'warning-fill', 'question', 'question-circle', 'question-circle-fill', 'close', 'close-circle', 'close-circle-fill', 'checkmark', 'checkmark-circle', 'checkmark-circle-fill', 'plus', 'plus-circle', 'plus-circle-fill', 'minus', 'minus-circle', 'minus-circle-fill', 'reload', 'setting', 'setting-fill', 'star', 'star-fill', 'heart', 'heart-fill', 'lock', 'lock-fill', 'lock-open', 'lock-opened-fill', 'level', 'account', 'account-fill', 'plus-people-fill', 'minus-people-fill', 'list', 'list-dot', 'grid', 'grid-fill', 'more-circle', 'more-circle-fill', 'more-dot-fill', 'gift', 'gift-fill', 'hourglass', 'hourglass-half-fill', 'home', 'home-fill', 'integral', 'integral-fill', 'server-fill', 'server-man', 'kefu-ermai', 'rmb', 'rmb-circle', 'rmb-circle-fill', 'order', 'coupon', 'coupon-fill', 'integral', 'integral-fill', 'pushpin', 'pushpin-fill', 'bag', 'bag-fill', 'bookmark', 'bookmark-fill', 'tags', 'tags-fill', 'folder', 'movie', 'file-text', 'file-text-fill', 'attach', 'cut', 'backspace', 'edit-pen', 'edit-pen-fill', 'clock', 'clock-fill', 'calendar', 'calendar-fill', 'trash', 'trash-fill', 'email', 'email-fill', 'scan', 'search', 'share', 'share-fill', 'share-square', 'share', 'share-fill', 'share-square', 'photo', 'photo-fill', 'camera', 'camera-fill', 'volume-off', 'volume-off-fill', 'volume-fill', 'volume-up', 'pause', 'pause-circle', 'pause-circle-fill', 'play-circle', 'play-circle-fill', 'play-left', 'play-left-fill', 'play-right', 'play-right-fill', 'rewind-left', 'rewind-left-fill', 'rewind-right', 'rewind-right-fill', 'skip-back-left', 'skip-forward-right', 'column-line', 'checkbox-mark', 'fingerprint', 'star', 'star-fill', 'bell', 'bell-fill', 'shopping-cart', 'shopping-cart-fill', 'man', 'woman', 'man-add', 'man-add-fill', 'man-delete', 'person-delete-fill', 'red-packet', 'red-packet-fill', 'empty-car', 'empty-coupon', 'empty-address', 'empty-favor', 'empty-permission', 'empty-news', 'empty-search', 'empty-data', 'empty-history', 'empty-list', 'empty-page', 'empty-order', 'zh', 'en'
  ],
  '箭头/方向': [
    'arrow-down', 'arrow-down-fill', 'arrow-up', 'arrow-up-fill', 'arrow-left', 'arrow-left-fill', 'arrow-right', 'arrow-right-fill', 'arrow-downward', 'arrow-upward', 'arrow-leftward', 'arrow-rightward', 'arrow-right-double', 'arrow-left-double', 'skip-back-left', 'skip-forward-right', 'rewind-left', 'rewind-left-fill', 'rewind-right', 'rewind-right-fill', 'play-left', 'play-left-fill', 'play-right', 'play-right-fill', 'top', 'bottom', 'right', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'expand', 'fold', 'sort', 'sort-up', 'sort-down', 'rank', 'caret-left', 'caret-top', 'caret-right', 'caret-bottom', 'dcaret'
  ],
  '文档/文件': [
    'file-text', 'file-text-fill', 'folder', 'folder-opened', 'folder-delete', 'folder-remove', 'folder-add', 'document', 'document-add', 'document-delete', 'document-checked', 'document-copy', 'document-remove', 'notebook', 'tickets', 'memo', 'collection', 'postcard', 'scale-to-original', 'setup', 'data-board', 'data-analysis', 'copy-document', 'folder-checked', 'files', 'first-aid-kit', 'reading', 'data-line', 'management', 'checked', 'ticket', 'failed', 'trend-charts', 'list'
  ],
  '多媒体': [
    'mic', 'mic-off', 'volume-off', 'volume-off-fill', 'volume-fill', 'volume-up', 'pause', 'pause-circle', 'pause-circle-fill', 'play-circle', 'play-circle-fill', 'play-left', 'play-left-fill', 'play-right', 'play-right-fill', 'rewind-left', 'rewind-left-fill', 'rewind-right', 'rewind-right-fill', 'skip-back-left', 'skip-forward-right', 'photo', 'photo-fill', 'camera', 'camera-fill', 'movie', 'star', 'star-fill', 'heart', 'heart-fill', 'chat', 'chat-fill', 'bell', 'bell-fill', 'comment', 'message', 'message-box', 'edit-pen', 'edit-pen-fill', 'share', 'share-fill', 'share-square', 'bookmark', 'bookmark-fill', 'eye', 'eye-fill', 'eye-off', 'eye-off-outline'
  ],
  '交通/地图': [
    'map', 'map-fill', 'car', 'car-fill', 'location', 'location-information', 'delete-location', 'coordinate', 'bicycle', 'office-building', 'school', 'guide', 'add-location', 'map-location', 'place', 'location-filled', 'van'
  ],
  '品牌/社交': [
    'github-circle-fill', 'facebook', 'facebook-circle-fill', 'twitter-circle-fill', 'twitte', 'zhihu', 'zhihu-circle-fill', 'zhifubao', 'zhifubao-circle-fill', 'weixin-fill', 'weixin-circle-fill', 'taobao', 'taobao-circle-fill', 'weibo', 'weibo-circle-fill', 'qq-fill', 'qq-circle-fill', 'moments', 'moments-circel-fill', 'qzone', 'qzone-circle-fill', 'baidu', 'baidu-circle-fill', 'apple-fill', 'chrome-circle-fill', 'ie', 'IE-circle-fill', 'google', 'google-circle-fill'
  ],
  '生活/物品': [
    'bag', 'bag-fill', 'gift', 'gift-fill', 'shopping-cart', 'shopping-cart-fill', 'bell', 'bell-fill', 'order', 'coupon', 'coupon-fill', 'integral', 'integral-fill', 'server-fill', 'server-man', 'kefu-ermai', 'pushpin', 'pushpin-fill', 'red-packet', 'red-packet-fill', 'rmb', 'rmb-circle', 'rmb-circle-fill', 'hourglass', 'hourglass-half-fill', 'home', 'home-fill', 'account', 'account-fill', 'plus-people-fill', 'minus-people-fill', 'man', 'woman', 'man-add', 'man-add-fill', 'man-delete', 'person-delete-fill', 'zh', 'en'
  ]
}

// 分类归类
const categorizedIcons = ref({})
for (const [cat, iconList] of Object.entries(categories)) {
  categorizedIcons.value[cat] = allIcons.filter(icon => iconList.includes(icon))
}
// 其他未分类的归为"其他"
const usedIcons = Object.values(categorizedIcons.value).flat()
categorizedIcons.value['其他'] = allIcons.filter(icon => !usedIcons.includes(icon))
</script>

<style scoped>
.icon-list-container {
  padding: 30rpx;
}
.category-title {
  font-size: 32rpx;
  font-weight: bold;
  margin: 40rpx 0 20rpx 0;
  color: #333;
}
.icon-grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  align-items: flex-start;
  justify-content: flex-start;
}
.icon-item {
  flex: 1 0 140rpx;
  max-width: 160rpx;
  height: 160rpx;
  background: #f8f8f8;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon-name {
  font-size: 22rpx;
  color: #666;
  margin-top: 10rpx;
  text-align: center;
}
</style>
