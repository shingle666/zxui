<template>
  <view>
    <zx-navbar title="动作面板"></zx-navbar>

    <view class="container">
      <!-- 基础用法 -->
      <zx-section title="基础用法" padding type="line">
        <zx-button @tap="openBasic">
          打开基础动作面板
        </zx-button>
        <zx-action-sheet v-model:show="showBasic" :items="basicItems" tips="这是一个基础动作面板" @change="handleChange"
          @cancel="handleCancel" />
      </zx-section>

      <!-- 暗色主题 -->
      <zx-section title="暗色主题" padding type="line">
        <zx-button @tap="openDark">
          打开暗色主题动作面板
        </zx-button>
        <zx-action-sheet v-model:show="showDark" :items="darkItems" tips="暗色主题动作面板" theme="dark"
          @change="handleChange" />
      </zx-section>

      <!-- 带图标和徽标 -->
      <zx-section title="带图标和徽标" padding type="line">
        <zx-button @tap="openWithIcons">
          打开带图标的动作面板
        </zx-button>
        <zx-action-sheet v-model:show="showWithIcons" :items="iconItems" @change="handleChange" />
      </zx-section>

      <!-- 禁用项 -->
      <zx-section title="禁用项" padding type="line">
        <zx-button @tap="openWithDisabled">
          打开带禁用项的动作面板
        </zx-button>
        <zx-action-sheet v-model:show="showWithDisabled" :items="disabledItems" @change="handleChange" />
      </zx-section>

      <!-- 不自动关闭 -->
      <zx-section title="点击项不自动关闭" padding type="line">
        <zx-button @tap="openNoAutoClose">
          打开不自动关闭的动作面板
        </zx-button>
        <zx-action-sheet v-model:show="showNoAutoClose" :items="basicItems" :close-on-item-click="false"
          @change="handleNoAutoCloseChange" />
      </zx-section>

      <!-- 自定义样式 -->
      <zx-section title="自定义样式" padding type="line">
        <zx-button @tap="openCustomStyle">
          打开自定义样式的动作面板
        </zx-button>
        <zx-action-sheet v-model:show="showCustomStyle" :items="customItems"
          :custom-style="{ boxShadow: '0 -5rpx 20rpx rgba(0, 0, 0, 0.1)' }" mask-color="rgba(0, 0, 0, 0.3)"
          :item-font-size="30" @change="handleChange" />
      </zx-section>

      <!-- 使用插槽 -->
      <zx-section title="使用插槽" padding type="line">
        <zx-button @tap="openWithSlots">
          打开使用插槽的动作面板
        </zx-button>
        <zx-action-sheet v-model:show="showWithSlots" :items="basicItems">
          <template #tips>
            <view class="custom-tips">
              <text class="custom-tips-title">自定义提示</text>
              <text class="custom-tips-desc">这是一个通过插槽自定义的提示内容</text>
            </view>
          </template>
          <template #cancel-button>
            <view class="custom-cancel">
              <text class="custom-cancel-text">关闭面板</text>
            </view>
          </template>
        </zx-action-sheet>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxActionSheet from '@tanzhenxing/zx-action-sheet/zx-action-sheet.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';
import zxSection from '@tanzhenxing/zx-section/zx-section.vue';

// 基础用法
const showBasic = ref(false);
const basicItems = ref([
  { text: '选项一' },
  { text: '选项二' },
  { text: '选项三' }
]);

// 暗色主题
const showDark = ref(false);
const darkItems = ref([
  { text: '选项一', color: '#ffffff' },
  { text: '选项二', color: '#ffffff' },
  { text: '选项三', color: '#ff5722' }
]);

// 带图标和徽标
const showWithIcons = ref(false);
const iconItems = ref([
  { text: '拍照', icon: 'camera' },
  { text: '相册选择', icon: 'image' },
  { text: '文件', icon: 'file', badge: '5' },
  { text: '收藏', icon: 'star' }
]);

// 禁用项
const showWithDisabled = ref(false);
const disabledItems = ref([
  { text: '选项一' },
  { text: '选项二', disabled: true },
  { text: '选项三' }
]);

// 不自动关闭
const showNoAutoClose = ref(false);

// 自定义样式
const showCustomStyle = ref(false);
const customItems = ref([
  { text: '删除', color: '#ff5722' },
  { text: '修改', color: '#2196F3' },
  { text: '查看详情', fontSize: '28rpx' }
]);

// 使用插槽
const showWithSlots = ref(false);

// 打开不同的动作面板
const openBasic = () => {
  showBasic.value = true;
};

const openDark = () => {
  showDark.value = true;
};

const openWithIcons = () => {
  showWithIcons.value = true;
};

const openWithDisabled = () => {
  showWithDisabled.value = true;
};

const openNoAutoClose = () => {
  showNoAutoClose.value = true;
};

const openCustomStyle = () => {
  showCustomStyle.value = true;
};

const openWithSlots = () => {
  showWithSlots.value = true;
};

// 处理点击事件
const handleChange = (item) => {
  uni.showToast({
    title: `点击了: ${item.text}`,
    icon: 'none'
  });
};

const handleCancel = () => {
  uni.showToast({
    title: '点击了取消',
    icon: 'none'
  });
};

const handleNoAutoCloseChange = (item) => {
  uni.showToast({
    title: `点击了: ${item.text}，不会自动关闭`,
    icon: 'none'
  });

  // 3秒后手动关闭
  setTimeout(() => {
    showNoAutoClose.value = false;
  }, 3000);
};
</script>

<style lang="scss">
.container {
  padding: 20rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  text-align: center;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  padding-left: 20rpx;
  border-left: 8rpx solid #007aff;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  background-color: #007aff;
  border-radius: 8rpx;
}

.button-text {
  color: #ffffff;
  font-size: 28rpx;
}

/* 自定义插槽样式 */
.custom-tips {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-tips-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.custom-tips-desc {
  font-size: 26rpx;
  color: #666;
}

.custom-cancel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-cancel-text {
  font-size: 32rpx;
  color: #007aff;
}

/* 为组件注入的图标样式 */
.icon-camera::before {
  content: "📷";
}

.icon-image::before {
  content: "🖼️";
}

.icon-file::before {
  content: "📁";
}

.icon-star::before {
  content: "⭐";
}
</style>