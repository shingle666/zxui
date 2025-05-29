<template>
  <view class="container">
    
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">Alert 组件提供五种类型，由 type 属性指定，默认值为 info。</view>
          <view class="demo-block">
            <zx-alert title="主要提示的文案" type="primary" :closable="false" />
            <zx-alert title="成功提示的文案" type="success" :closable="false" />
            <zx-alert title="消息提示的文案" type="info" :closable="false" />
            <zx-alert title="警告提示的文案" type="warning" :closable="false" />
            <zx-alert title="错误提示的文案" type="error" :closable="false" />
          </view>
        </view>

        <!-- 主题 -->
        <view class="demo-section">
          <view class="demo-title">主题</view>
          <view class="demo-desc">Alert 组件提供了两个不同的主题：light 和 dark。</view>
          <view class="demo-block">
            <zx-alert title="主要提示的文案" type="primary" effect="dark" :closable="false" />
            <zx-alert title="成功提示的文案" type="success" effect="dark" :closable="false" />
            <zx-alert title="消息提示的文案" type="info" effect="dark" :closable="false" />
            <zx-alert title="警告提示的文案" type="warning" effect="dark" :closable="false" />
            <zx-alert title="错误提示的文案" type="error" effect="dark" :closable="false" />
          </view>
        </view>

        <!-- 自定义关闭按钮 -->
        <view class="demo-section">
          <view class="demo-title">自定义关闭按钮</view>
          <view class="demo-desc">你可以自定义关闭按钮为文字或其他符号。</view>
          <view class="demo-block">
            <zx-alert v-if="alerts.unclosable" title="不可关闭的alert" type="success" :closable="false" />
            <zx-alert v-if="alerts.customClose" title="自定义关闭文字" type="info" close-text="知道了" @close="handleCustomClose" />
            <zx-alert v-if="alerts.withCallback" title="设置了回调的alert" type="warning" @close="handleCloseCallback" />
          </view>
          <view class="demo-actions">
            <zx-button @click="resetAlerts" type="primary" size="mini">重置</zx-button>
          </view>
        </view>

        <!-- 带图标 -->
        <view class="demo-section">
          <view class="demo-title">带图标</view>
          <view class="demo-desc">通过设置 show-icon 属性来显示 Alert 的 icon。</view>
          <view class="demo-block">
            <zx-alert title="主要提示的文案" type="primary" show-icon :closable="false" />
            <zx-alert title="成功提示的文案" type="success" show-icon :closable="false" />
            <zx-alert title="消息提示的文案" type="info" show-icon :closable="false" />
            <zx-alert title="警告提示的文案" type="warning" show-icon :closable="false" />
            <zx-alert title="错误提示的文案" type="error" show-icon :closable="false" />
          </view>
        </view>

        <!-- 文字居中 -->
        <view class="demo-section">
          <view class="demo-title">文字居中</view>
          <view class="demo-desc">使用 center 属性来让文字水平居中。</view>
          <view class="demo-block">
            <zx-alert title="主要提示的文案" type="primary" center show-icon :closable="false" />
            <zx-alert title="成功提示的文案" type="success" center show-icon :closable="false" />
            <zx-alert title="消息提示的文案" type="info" center show-icon :closable="false" />
            <zx-alert title="警告提示的文案" type="warning" center show-icon :closable="false" />
            <zx-alert title="错误提示的文案" type="error" center show-icon :closable="false" />
          </view>
        </view>

        <!-- 带描述 -->
        <view class="demo-section">
          <view class="demo-title">带描述</view>
          <view class="demo-desc">为 Alert 组件添加一个更加详细的描述。</view>
          <view class="demo-block">
            <zx-alert 
              title="带描述的提示" 
              type="primary" 
              description="这是一条主要的提示信息，用来告知用户重要内容。"
              :closable="false" 
            />
            <zx-alert 
              title="带描述的提示" 
              type="success" 
              description="这是一条成功的提示信息，用来告知用户操作成功。"
              :closable="false" 
            />
            <zx-alert 
              title="带描述的警告" 
              type="warning" 
              description="这是一条警告信息，提醒用户注意相关风险。"
              :closable="false" 
            />
          </view>
        </view>

        <!-- 带图标和描述 -->
        <view class="demo-section">
          <view class="demo-title">带图标和描述</view>
          <view class="demo-desc">同时显示图标和描述的例子。</view>
          <view class="demo-block">
            <zx-alert 
              title="主要提示" 
              type="primary" 
              description="这是一条详细的主要提示信息，用来说明重要内容和关键信息。"
              show-icon
              :closable="false" 
            />
            <zx-alert 
              title="成功提示" 
              type="success" 
              description="这是一条详细的成功提示信息，用来说明具体的成功内容和相关提示。"
              show-icon
              :closable="false" 
            />
            <zx-alert 
              title="消息提示" 
              type="info" 
              description="这是一条详细的消息提示信息，为用户提供更多的相关信息。"
              show-icon
              :closable="false" 
            />
            <zx-alert 
              title="警告提示" 
              type="warning" 
              description="这是一条详细的警告信息，提醒用户注意可能存在的风险或问题。"
              show-icon
              :closable="false" 
            />
            <zx-alert 
              title="错误提示" 
              type="error" 
              description="这是一条详细的错误信息，说明具体的错误原因和解决建议。"
              show-icon
              :closable="false" 
            />
          </view>
        </view>

        <!-- 自定义插槽 -->
        <view class="demo-section">
          <view class="demo-title">自定义插槽</view>
          <view class="demo-desc">使用插槽自定义内容。</view>
          <view class="demo-block">
            <zx-alert type="warning" show-icon :closable="false">
              <template #title>
                <text style="color: #e6a23c; font-weight: bold;">自定义标题插槽</text>
              </template>
              <view style="color: #606266;">
                这里是通过默认插槽自定义的内容，可以包含更丰富的信息和样式。
              </view>
            </zx-alert>
            
            <zx-alert title="自定义图标" type="info" show-icon :closable="false">
              <template #icon>
                <zx-icon name="heart-fill" size="28" color="#409eff" />
              </template>
            </zx-alert>
          </view>
        </view>

        <!-- 自定义样式 -->
        <view class="demo-section">
          <view class="demo-title">自定义样式</view>
          <view class="demo-desc">通过 custom-style 属性自定义样式。</view>
          <view class="demo-block">
            <zx-alert 
              title="自定义背景色" 
              type="info" 
              :custom-style="{ backgroundColor: '#e1f3d8', borderLeft: '6rpx solid #67c23a' }"
              :closable="false" 
            />
          </view>
        </view>

        <!-- API 说明 -->
        <view class="demo-section">
          <view class="demo-title">API 说明</view>
          <view class="api-table">
            <view class="api-row header">
              <text class="api-col">属性</text>
              <text class="api-col">说明</text>
              <text class="api-col">类型</text>
              <text class="api-col">默认值</text>
            </view>
            <view class="api-row">
              <text class="api-col">title</text>
              <text class="api-col">标题</text>
              <text class="api-col">String</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row">
              <text class="api-col">type</text>
              <text class="api-col">类型</text>
              <text class="api-col">String</text>
              <text class="api-col">info</text>
            </view>
            <view class="api-row">
              <text class="api-col">description</text>
              <text class="api-col">描述性文本</text>
              <text class="api-col">String</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row">
              <text class="api-col">closable</text>
              <text class="api-col">是否可关闭</text>
              <text class="api-col">Boolean</text>
              <text class="api-col">true</text>
            </view>
            <view class="api-row">
              <text class="api-col">center</text>
              <text class="api-col">文字是否居中</text>
              <text class="api-col">Boolean</text>
              <text class="api-col">false</text>
            </view>
            <view class="api-row">
              <text class="api-col">close-text</text>
              <text class="api-col">关闭按钮自定义文本</text>
              <text class="api-col">String</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row">
              <text class="api-col">show-icon</text>
              <text class="api-col">是否显示图标</text>
              <text class="api-col">Boolean</text>
              <text class="api-col">false</text>
            </view>
            <view class="api-row">
              <text class="api-col">effect</text>
              <text class="api-col">主题样式</text>
              <text class="api-col">String</text>
              <text class="api-col">light</text>
            </view>
            <view class="api-row">
              <text class="api-col">custom-style</text>
              <text class="api-col">自定义样式</text>
              <text class="api-col">Object</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row header">
              <text class="api-col">事件名称</text>
              <text class="api-col">说明</text>
              <text class="api-col">回调参数</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row">
              <text class="api-col">close</text>
              <text class="api-col">关闭时触发</text>
              <text class="api-col">event</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row header">
              <text class="api-col">插槽名</text>
              <text class="api-col">说明</text>
              <text class="api-col">—</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row">
              <text class="api-col">default</text>
              <text class="api-col">描述内容</text>
              <text class="api-col">—</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row">
              <text class="api-col">title</text>
              <text class="api-col">标题内容</text>
              <text class="api-col">—</text>
              <text class="api-col">—</text>
            </view>
            <view class="api-row">
              <text class="api-col">icon</text>
              <text class="api-col">图标内容</text>
              <text class="api-col">—</text>
              <text class="api-col">—</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 控制alert显示状态
const alerts = reactive({
  unclosable: true,
  customClose: true,
  withCallback: true
});

// 重置alerts
const resetAlerts = () => {
  alerts.unclosable = true;
  alerts.customClose = true;
  alerts.withCallback = true;
};

// 处理自定义关闭
const handleCustomClose = () => {
  alerts.customClose = false;
  uni.showToast({
    title: '自定义关闭按钮被点击',
    icon: 'none'
  });
};

// 处理关闭回调
const handleCloseCallback = () => {
  alerts.withCallback = false;
  uni.showModal({
    title: '提示',
    content: 'Alert关闭时的回调函数被触发',
    showCancel: false
  });
};

// 返回上级页面
const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 32rpx;
}

.demo-section {
  margin-bottom: 64rpx;
  
  &:last-child {
    margin-bottom: 32rpx;
  }
}

.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
  margin-bottom: 16rpx;
}

.demo-desc {
  font-size: 28rpx;
  color: #606266;
  margin-bottom: 32rpx;
  line-height: 1.6;
}

.demo-block {
  :deep(.zx-alert) {
    margin-bottom: 32rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.demo-actions {
  margin-top: 32rpx;
  text-align: center;
}

.api-table {
  background: #fff;
  border-radius: 8rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.api-row {
  display: flex;
  border-bottom: 1rpx solid #ebeef5;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.header {
    background-color: #f5f7fa;
    font-weight: bold;
  }
}

.api-col {
  flex: 1;
  padding: 24rpx 16rpx;
  font-size: 24rpx;
  color: #606266;
  border-right: 1rpx solid #ebeef5;
  
  &:last-child {
    border-right: none;
  }
  
  .header & {
    color: #303133;
    background-color: #f5f7fa;
  }
}
</style> 