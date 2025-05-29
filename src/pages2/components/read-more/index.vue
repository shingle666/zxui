<template>
  <view class="demo-read-more">
    <view class="demo-title">基础用法</view>
    <zx-read-more :showHeight="80">
      <text>
        这是一个很长的内容示例。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Vivamus euismod, nisi eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.
      </text>
    </zx-read-more>

    <view class="demo-title">自定义展开/收起文字</view>
    <zx-read-more :showHeight="60" closeText="查看更多" openText="收起内容">
      <text>
        这里是自定义展开和收起按钮文字的内容。内容较长时会自动收起。
      </text>
    </zx-read-more>

    <view class="demo-title">自定义提示颜色和字体大小</view>
    <zx-read-more :showHeight="60" color="#e91e63" :fontSize="18">
      <text>
        你可以自定义提示文字的颜色和字体大小。
      </text>
    </zx-read-more>

    <view class="demo-title">自定义插槽</view>
    <zx-read-more :showHeight="60">
      <text>
        通过 toggle 插槽自定义展开/收起区域。
      </text>
      <template #toggle>
        <view style="color: #4caf50; font-weight: bold; text-align: center;">点我展开/收起</view>
      </template>
    </zx-read-more>

    <view class="demo-title">事件监听</view>
    <zx-read-more :showHeight="60" @open="onOpen" @close="onClose">
      <text>
        展开和收起时会触发 open/close 事件。
      </text>
    </zx-read-more>
  </view>
</template>

<script setup>
function onOpen(name) {
  uni.showToast({ title: '内容已展开', icon: 'none' });
}
function onClose(name) {
  uni.showToast({ title: '内容已收起', icon: 'none' });
}
</script>

<style scoped>
.demo-read-more {
  padding: 16px;
}
.demo-title {
  font-weight: bold;
  margin: 24px 0 8px 0;
  color: #2979ff;
}
</style> 