<template>
  <view class="container">
    <zx-title title="基本用法"></zx-title>
    <zx-swipe-cell>
      <template #left>
        <view class="swipe-action-button swipe-action-button--primary">选择</view>
      </template>
      <view class="cell-content">单元格内容</view>
      <template #right>
        <view class="swipe-action-button swipe-action-button--danger" @click="handleDelete('基本用法')">删除</view>
        <view class="swipe-action-button swipe-action-button--warning">收藏</view>
      </template>
    </zx-swipe-cell>

    <zx-title title="自定义内容 (商品卡片示例)"></zx-title>
    <zx-swipe-cell>
      <view class="goods-card">
        <image class="goods-thumb" src="https://zxui.org/logo.png" mode="aspectFill"></image>
        <view class="goods-info">
          <view class="goods-title">商品标题</view>
          <view class="goods-desc">描述信息，这是一段描述信息</view>
          <view class="goods-price">¥20.00</view>
        </view>
      </view>
      <template #right>
        <view class="swipe-action-button swipe-action-button--danger delete-button-full-height" @click="handleDelete('商品卡片')">删除</view>
      </template>
    </zx-swipe-cell>

    <zx-title title="异步关闭 (删除确认)"></zx-title>
    <zx-swipe-cell :before-close="beforeCloseHandler">
      <view class="cell-content">尝试右滑后点击删除</view>
      <template #right>
        <view class="swipe-action-button swipe-action-button--danger">删除</view>
      </template>
    </zx-swipe-cell>

    <zx-title title="通过 Ref 控制"></zx-title>
    <zx-swipe-cell ref="swipeCellRef">
      <view class="cell-content">可以通过按钮控制开关</view>
      <template #left>
        <view class="swipe-action-button swipe-action-button--primary">左侧</view>
      </template>
      <template #right>
        <view class="swipe-action-button swipe-action-button--warning">右侧</view>
      </template>
    </zx-swipe-cell>
    <view class="control-buttons">
      <button size="mini" @click="openLeft">打开左侧</button>
      <button size="mini" @click="openRight">打开右侧</button>
      <button size="mini" @click="closeCell">关闭</button>
    </view>
    
    <zx-title title="禁用滑动"></zx-title>
    <zx-swipe-cell disabled>
        <view class="cell-content">此单元格已禁用滑动</view>
        <template #right>
            <view class="swipe-action-button swipe-action-button--danger">删除</view>
        </template>
    </zx-swipe-cell>

    <zx-title title="多个按钮与自定义宽度"></zx-title>
    <zx-swipe-cell right-width="180"> <!-- 假设每个按钮60px宽 -->
      <view class="cell-content">右侧有三个按钮</view>
      <template #right>
        <view class="swipe-action-button swipe-action-button--info" style="width:60px;">标记</view>
        <view class="swipe-action-button swipe-action-button--warning" style="width:60px;">编辑</view>
        <view class="swipe-action-button swipe-action-button--danger" style="width:60px;" @click="handleDelete('多按钮')">删除</view>
      </template>
    </zx-swipe-cell>

  </view>
</template>

<script setup>
import { ref } from 'vue';
// import zxSwipeCell from '@/components/zx-swipe-cell/zx-swipe-cell.vue'; // 本地引入，如果全局注册则不需要
// import zxTitle from '@/components/zx-title/zx-title.vue'; // 假设有一个标题组件

const swipeCellRef = ref(null);

const handleDelete = (from) => {
  uni.showToast({
    title: `点击了 ${from} 的删除按钮`,
    icon: 'none',
  });
};

const beforeCloseHandler = ({ position, name, instance }) => {
  return new Promise((resolve) => {
    if (position === 'right') {
      uni.showModal({
        title: '提示',
        content: '确定删除吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({ title: '删除成功', icon: 'none' });
            resolve(true); // 允许关闭
          } else {
            resolve(false); // 阻止关闭
          }
        },
      });
    } else {
      resolve(true); // 其他情况直接允许关闭
    }
  });
};

const openLeft = () => {
  if (swipeCellRef.value) {
    swipeCellRef.value.open('left');
  }
};

const openRight = () => {
  if (swipeCellRef.value) {
    swipeCellRef.value.open('right');
  }
};

const closeCell = () => {
  if (swipeCellRef.value) {
    swipeCellRef.value.close();
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  background-color: #f8f8f8;
}

.cell-content {
  padding: 12px 15px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
}

.swipe-action-button {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  color: white;
  font-size: 14px;
  text-align: center;

  &--primary {
    background-color: #007aff;
  }
  &--danger {
    background-color: #dd524d;
  }
  &--warning {
    background-color: #f0ad4e;
  }
  &--info {
    background-color: #909399;
  }
}

.goods-card {
  display: flex;
  padding: 10px;
  background-color: #fff;
  margin: 0; // Reset margin if it's inside swipe-cell
  border-bottom: 1px solid #ebedf0;

  .goods-thumb {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    border-radius: 4px;
  }

  .goods-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .goods-title {
    font-size: 14px;
    color: #333;
    // white-space: nowrap; // Optional: if you want single line title
    // overflow: hidden;
    // text-overflow: ellipsis;
  }

  .goods-desc {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }

  .goods-price {
    font-size: 16px;
    color: #fa3534;
    margin-top: 4px;
  }
}

.delete-button-full-height {
  height: 100%; // Ensure button takes full height of the cell
}

.control-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  button {
    margin: 0 5px;
  }
}

// Add a bit of margin between title and swipe cell for better visual separation
::v-deep .zx-title + .zx-swipe-cell {
    margin-top: 8px;
}

</style>