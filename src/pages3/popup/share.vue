<template>
  <view class="page">
    <zx-navbar title="Popup Share 分享弹窗" />
    
    <view class="demo-section">
      <zx-cell-group>
        <zx-cell title="基础用法" is-link @click="showBasic = true" />
        <zx-cell title="自定义标题和描述" is-link @click="showCustomTitle = true" />
        <zx-cell title="自定义分享选项" is-link @click="showCustomOptions = true" />
        <zx-cell title="图片图标" is-link @click="showImageIcons = true" />
        <zx-cell title="禁用遮罩关闭" is-link @click="showNoMaskClose = true" />
        <zx-cell title="拦截关闭" is-link @click="showBeforeClose = true" />
        <zx-cell title="不显示取消按钮" is-link @click="showNoCancel = true" />
        <zx-cell title="方法调用" is-link @click="openByMethod" />
      </zx-cell-group>
    </view>

    <!-- 基础用法 -->
    <zx-popup-share
      v-model:show="showBasic"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 自定义标题和描述 -->
    <zx-popup-share
      v-model:show="showCustomTitle"
      title="分享给好友"
      description="让更多人看到这个精彩内容"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 自定义分享选项 -->
    <zx-popup-share
      v-model:show="showCustomOptions"
      title="选择分享方式"
      :options="customOptions"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 图片图标 -->
    <zx-popup-share
      v-model:show="showImageIcons"
      title="分享到社交平台"
      :options="imageOptions"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 禁用遮罩关闭 -->
    <zx-popup-share
      v-model:show="showNoMaskClose"
      title="请选择分享方式"
      :close-on-click-overlay="false"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 拦截关闭 -->
    <zx-popup-share
      v-model:show="showBeforeClose"
      title="确认分享"
      :before-close="beforeClose"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 不显示取消按钮 -->
    <zx-popup-share
      v-model:show="showNoCancel"
      title="选择分享平台"
      cancel-text=""
      @select="onSelect"
    />

    <!-- 方法调用 -->
    <zx-popup-share
      ref="shareRef"
      title="通过方法调用"
      @select="onSelect"
      @cancel="onCancel"
    />

    <!-- 实际场景示例 -->
    <view class="demo-section">
      <view class="demo-title">实际场景示例</view>
      <view class="scenario-card">
        <view class="scenario-content">
          <view class="scenario-title">精彩文章推荐</view>
          <view class="scenario-desc">这是一篇非常有价值的技术文章，值得分享给更多人</view>
          <view class="scenario-actions">
            <zx-button type="primary" size="small" @click="shareArticle">分享文章</zx-button>
            <zx-button type="default" size="small" @click="shareWithReward">有奖分享</zx-button>
          </view>
        </view>
      </view>
    </view>

    <!-- 文章分享 -->
    <zx-popup-share
      v-model:show="showArticleShare"
      title="分享文章"
      description="分享给好友，一起学习进步"
      :options="articleShareOptions"
      @select="onArticleShare"
      @cancel="onCancel"
    />

    <!-- 有奖分享 -->
    <zx-popup-share
      v-model:show="showRewardShare"
      title="有奖分享"
      description="分享成功可获得积分奖励"
      :options="rewardShareOptions"
      @select="onRewardShare"
      @cancel="onCancel"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const showBasic = ref(false);

// 自定义标题和描述
const showCustomTitle = ref(false);

// 自定义分享选项
const showCustomOptions = ref(false);
const customOptions = [
  { name: '微信好友', icon: 'wechat', type: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments' },
  { name: 'QQ好友', icon: 'qq', type: 'qq' },
  { name: '新浪微博', icon: 'weibo', type: 'weibo' },
  { name: '复制链接', icon: 'link', type: 'copy' },
  { name: '保存图片', icon: 'save', type: 'save' },
  { name: '生成海报', icon: 'poster', type: 'poster' },
  { name: '更多方式', icon: 'more', type: 'more' }
];

// 图片图标
const showImageIcons = ref(false);
const imageOptions = [
  {
    name: '微信',
    icon: 'https://img.yzcdn.cn/vant/share-wechat.png',
    type: 'wechat'
  },
  {
    name: '朋友圈',
    icon: 'https://img.yzcdn.cn/vant/share-wechat-moments.png',
    type: 'wechat-moments'
  },
  {
    name: 'QQ',
    icon: 'https://img.yzcdn.cn/vant/share-qq.png',
    type: 'qq'
  },
  {
    name: '微博',
    icon: 'https://img.yzcdn.cn/vant/share-weibo.png',
    type: 'weibo'
  }
];

// 禁用遮罩关闭
const showNoMaskClose = ref(false);

// 拦截关闭
const showBeforeClose = ref(false);
const beforeClose = (action) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'cancel') {
        uni.showModal({
          title: '提示',
          content: '确定要取消分享吗？',
          success: (res) => {
            resolve(res.confirm);
          }
        });
      } else {
        resolve(true);
      }
    }, 100);
  });
};

// 不显示取消按钮
const showNoCancel = ref(false);

// 方法调用
const shareRef = ref();
const openByMethod = () => {
  shareRef.value?.open();
};

// 实际场景
const showArticleShare = ref(false);
const showRewardShare = ref(false);

const articleShareOptions = [
  { name: '微信好友', icon: 'wechat', type: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments' },
  { name: 'QQ空间', icon: 'qq', type: 'qzone' },
  { name: '新浪微博', icon: 'weibo', type: 'weibo' },
  { name: '复制链接', icon: 'link', type: 'copy' }
];

const rewardShareOptions = [
  { name: '微信好友', icon: 'wechat', type: 'wechat', description: '+10积分' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments', description: '+20积分' },
  { name: 'QQ好友', icon: 'qq', type: 'qq', description: '+10积分' },
  { name: '新浪微博', icon: 'weibo', type: 'weibo', description: '+15积分' }
];

// 事件处理
const onSelect = (option, index) => {
  console.log('选择分享:', option, index);
  uni.showToast({
    title: `分享到${option.name}`,
    icon: 'success'
  });
};

const onCancel = () => {
  console.log('取消分享');
  uni.showToast({
    title: '取消分享',
    icon: 'none'
  });
};

const shareArticle = () => {
  showArticleShare.value = true;
};

const shareWithReward = () => {
  showRewardShare.value = true;
};

const onArticleShare = (option, index) => {
  console.log('文章分享:', option, index);
  uni.showToast({
    title: `文章已分享到${option.name}`,
    icon: 'success'
  });
  
  // 模拟分享成功后的操作
  setTimeout(() => {
    uni.showToast({
      title: '分享成功，感谢推荐！',
      icon: 'success'
    });
  }, 1500);
};

const onRewardShare = (option, index) => {
  console.log('有奖分享:', option, index);
  uni.showToast({
    title: `分享到${option.name}成功`,
    icon: 'success'
  });
  
  // 模拟获得奖励
  setTimeout(() => {
    const reward = option.description || '+10积分';
    uni.showToast({
      title: `恭喜获得${reward}`,
      icon: 'success'
    });
  }, 1500);
};
</script>

<style lang="scss" scoped>
.page {
  background-color: #f7f8fa;
  min-height: 100vh;
}

.demo-section {
  margin: 32rpx 0;
}

.demo-title {
  padding: 0 32rpx 16rpx;
  color: #323233;
  font-size: 28rpx;
  font-weight: 500;
}

.scenario-card {
  margin: 0 32rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.scenario-content {
  padding: 32rpx;
}

.scenario-title {
  color: #323233;
  font-size: 32rpx;
  font-weight: 500;
  margin-bottom: 16rpx;
}

.scenario-desc {
  color: #646566;
  font-size: 28rpx;
  line-height: 1.6;
  margin-bottom: 24rpx;
}

.scenario-actions {
  display: flex;
  gap: 16rpx;
}
</style>