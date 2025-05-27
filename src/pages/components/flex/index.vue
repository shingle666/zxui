TypeError: Cannot set properties of undefined (setting 'classIn')
    at initcustomClass (zx-flex.vue:102:15)
    at zx-flex.vue:84:2<template>
  <view class="demo-container">
    <text class="title">基础用法</text>
    <zx-flex>
      <view class="item" style="background:#f00;">A</view>
      <view class="item" style="background:#0f0;">B</view>
      <view class="item" style="background:#00f;">C</view>
    </zx-flex>

    <text class="title">横向排列 + 换行</text>
    <zx-flex direction="row" :wrap="true" :customStyle="'margin-top:10px;'">
      <view class="item" v-for="i in 6" :key="i">{{ i }}</view>
    </zx-flex>

    <text class="title">主轴居中 + 交叉轴底部对齐</text>
    <zx-flex direction="row" justifyContent="center" alignItems="flex-end" :customStyle="'height:80px;margin-top:10px;'">
      <view class="item" style="height:40px;background:#f90;">1</view>
      <view class="item" style="height:60px;background:#09f;">2</view>
      <view class="item" style="height:30px;background:#9f0;">3</view>
    </zx-flex>

    <text class="title">自定义类名和样式</text>
    <zx-flex :customClass="['my-flex', 'my-flex2']" :customStyle="'border:1px solid #333;padding:10px;margin-top:10px;'">
      <view class="item">X</view>
      <view class="item">Y</view>
    </zx-flex>
  </view>
</template>

<script setup>
// 这里假设已全局注册 zx-flex，或已在本页面引入
</script>

<style scoped>
.demo-container {
  padding: 16px;
}
.title {
  font-size: 16px;
  margin: 12px 0 6px 0;
  color: #333;
}
.item {
  width: 40px;
  height: 40px;
  margin-right: 8px;
  margin-bottom: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 16px;
}
</style> 