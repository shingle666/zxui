<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">ZxPopup 弹出层组件</text>
      <text class="page-desc">支持多种弹出方式和动画效果</text>
    </view>

    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="button-group">
        <button class="demo-button" @click="showCenter = true">居中弹出</button>
        <button class="demo-button" @click="showTop = true">顶部弹出</button>
        <button class="demo-button" @click="showBottom = true">底部弹出</button>
        <button class="demo-button" @click="showLeft = true">左侧弹出</button>
        <button class="demo-button" @click="showRight = true">右侧弹出</button>
      </view>
    </view>

    <!-- 高级用法 -->
    <view class="demo-section">
      <view class="section-title">高级用法</view>
      <view class="button-group">
        <button class="demo-button" @click="showNoMask = true">禁用遮罩点击</button>
        <button class="demo-button" @click="showNoOverlay = true">隐藏遮罩</button>
        <button class="demo-button" @click="showNoAnimation = true">禁用动画</button>
        <button class="demo-button" @click="showCustomStyle = true">自定义样式</button>
      </view>
    </view>

    <!-- 事件监听 -->
    <view class="demo-section">
      <view class="section-title">事件监听</view>
      <view class="button-group">
        <button class="demo-button" @click="showWithEvents = true">监听事件</button>
        <button class="demo-button" @click="openByRef">通过 ref 打开</button>
        <button class="demo-button" @click="closeByRef">通过 ref 关闭</button>
      </view>
    </view>

    <!-- 实际应用场景 -->
    <view class="demo-section">
      <view class="section-title">实际应用场景</view>
      <view class="button-group">
        <button class="demo-button" @click="showActionSheet = true">操作菜单</button>
        <button class="demo-button" @click="showImagePreview = true">图片预览</button>
        <button class="demo-button" @click="showForm = true">表单弹窗</button>
        <button class="demo-button" @click="showConfirm = true">确认对话框</button>
      </view>
    </view>

    <!-- 事件日志 -->
    <view class="demo-section">
      <view class="section-title">事件日志</view>
      <view class="event-log">
        <view v-for="(log, index) in eventLogs" :key="index" class="log-item">
          <text class="log-time">{{ log.time }}</text>
          <text class="log-content">{{ log.content }}</text>
        </view>
        <view v-if="eventLogs.length === 0" class="log-empty">
          <text>暂无事件日志</text>
        </view>
      </view>
      <button class="demo-button clear-btn" @click="clearLogs">清空日志</button>
    </view>

    <!-- 基础弹窗 -->
    <!-- 居中弹出 -->
    <zx-popup v-model:show="showCenter" type="center" @change="onPopupChange">
      <view class="popup-content center-content">
        <view class="popup-header">
          <text class="popup-title">居中弹窗</text>
        </view>
        <view class="popup-body">
          <text>这是一个居中弹出的弹窗，支持点击遮罩关闭。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button" @click="showCenter = false">关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 顶部弹出 -->
    <zx-popup v-model:show="showTop" type="top" @change="onPopupChange">
      <view class="popup-content top-content">
        <view class="popup-header">
          <text class="popup-title">顶部弹窗</text>
          <text class="close-btn" @click="showTop = false">×</text>
        </view>
        <view class="popup-body">
          <text>这是一个从顶部滑入的弹窗。</text>
        </view>
      </view>
    </zx-popup>

    <!-- 底部弹出 -->
    <zx-popup v-model:show="showBottom" type="bottom" @change="onPopupChange">
      <view class="popup-content bottom-content">
        <view class="popup-header">
          <view class="drag-handle"></view>
          <text class="popup-title">底部弹窗</text>
        </view>
        <view class="popup-body">
          <text>这是一个从底部滑入的弹窗，适合展示操作菜单。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button" @click="showBottom = false">关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 左侧弹出 -->
    <zx-popup v-model:show="showLeft" type="left" @change="onPopupChange">
      <view class="popup-content side-content">
        <view class="popup-header">
          <text class="popup-title">左侧弹窗</text>
          <text class="close-btn" @click="showLeft = false">×</text>
        </view>
        <view class="popup-body">
          <text>这是一个从左侧滑入的弹窗，常用于导航菜单。</text>
        </view>
      </view>
    </zx-popup>

    <!-- 右侧弹出 -->
    <zx-popup v-model:show="showRight" type="right" @change="onPopupChange">
      <view class="popup-content side-content">
        <view class="popup-header">
          <text class="popup-title">右侧弹窗</text>
          <text class="close-btn" @click="showRight = false">×</text>
        </view>
        <view class="popup-body">
          <text>这是一个从右侧滑入的弹窗，常用于设置面板。</text>
        </view>
      </view>
    </zx-popup>

    <!-- 高级用法弹窗 -->
    <!-- 禁用遮罩点击 -->
    <zx-popup v-model:show="showNoMask" type="center" :mask-click="false" @change="onPopupChange">
      <view class="popup-content center-content">
        <view class="popup-header">
          <text class="popup-title">禁用遮罩点击</text>
        </view>
        <view class="popup-body">
          <text>点击遮罩无法关闭此弹窗，只能通过按钮关闭。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button" @click="showNoMask = false">手动关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 隐藏遮罩 -->
    <zx-popup v-model:show="showNoOverlay" type="center" :overlay="false" @change="onPopupChange">
      <view class="popup-content center-content no-overlay">
        <view class="popup-header">
          <text class="popup-title">无遮罩弹窗</text>
        </view>
        <view class="popup-body">
          <text>这个弹窗没有遮罩层。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button" @click="showNoOverlay = false">关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 禁用动画 -->
    <zx-popup v-model:show="showNoAnimation" type="center" :animation="false" @change="onPopupChange">
      <view class="popup-content center-content">
        <view class="popup-header">
          <text class="popup-title">无动画弹窗</text>
        </view>
        <view class="popup-body">
          <text>这个弹窗没有动画效果，直接显示/隐藏。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button" @click="showNoAnimation = false">关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 自定义样式 -->
    <zx-popup 
      v-model:show="showCustomStyle" 
      type="center" 
      background-color="#f0f9ff"
      mask-background-color="rgba(59, 130, 246, 0.3)"
      border-radius="24rpx"
      :z-index="1000"
      @change="onPopupChange"
    >
      <view class="popup-content center-content custom-style">
        <view class="popup-header">
          <text class="popup-title">自定义样式</text>
        </view>
        <view class="popup-body">
          <text>这个弹窗使用了自定义的背景色、遮罩色和圆角。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button custom-button" @click="showCustomStyle = false">关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 事件监听弹窗 -->
    <zx-popup 
      v-model:show="showWithEvents" 
      type="center"
      @open="onOpen"
      @opened="onOpened"
      @close="onClose"
      @closed="onClosed"
      @mask-click="onMaskClick"
      @change="onPopupChange"
    >
      <view class="popup-content center-content">
        <view class="popup-header">
          <text class="popup-title">事件监听</text>
        </view>
        <view class="popup-body">
          <text>这个弹窗会触发各种事件，请查看下方的事件日志。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button" @click="showWithEvents = false">关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 通过 ref 控制的弹窗 -->
    <zx-popup ref="refPopup" type="center" @change="onPopupChange">
      <view class="popup-content center-content">
        <view class="popup-header">
          <text class="popup-title">通过 ref 控制</text>
        </view>
        <view class="popup-body">
          <text>这个弹窗通过 ref 调用方法来控制显示/隐藏。</text>
        </view>
        <view class="popup-footer">
          <button class="popup-button" @click="closeByRef">关闭</button>
        </view>
      </view>
    </zx-popup>

    <!-- 实际应用场景弹窗 -->
    <!-- 操作菜单 -->
    <zx-popup v-model:show="showActionSheet" type="bottom" @change="onPopupChange">
      <view class="action-sheet">
        <view class="action-header">
          <text class="action-title">选择操作</text>
        </view>
        <view class="action-list">
          <view class="action-item" @click="handleAction('拍照')">
            <text class="action-text">拍照</text>
          </view>
          <view class="action-item" @click="handleAction('从相册选择')">
            <text class="action-text">从相册选择</text>
          </view>
          <view class="action-item danger" @click="handleAction('删除')">
            <text class="action-text">删除</text>
          </view>
        </view>
        <view class="action-cancel" @click="showActionSheet = false">
          <text class="action-text">取消</text>
        </view>
      </view>
    </zx-popup>

    <!-- 图片预览 -->
    <zx-popup v-model:show="showImagePreview" type="center" background-color="#000" @change="onPopupChange">
      <view class="image-preview">
        <view class="preview-header">
          <text class="preview-title">图片预览</text>
          <text class="close-btn" @click="showImagePreview = false">×</text>
        </view>
        <view class="preview-content">
          <image class="preview-image" src="https://cdn.mp.ac.cn/icon/demo.png" mode="aspectFit" />
        </view>
        <view class="preview-footer">
          <text class="preview-info">1 / 1</text>
        </view>
      </view>
    </zx-popup>

    <!-- 表单弹窗 -->
    <zx-popup v-model:show="showForm" type="center" :mask-click="false" @change="onPopupChange">
      <view class="form-popup">
        <view class="form-header">
          <text class="form-title">用户信息</text>
          <text class="close-btn" @click="showForm = false">×</text>
        </view>
        <view class="form-content">
          <view class="form-item">
            <text class="form-label">姓名</text>
            <input class="form-input" v-model="formData.name" placeholder="请输入姓名" />
          </view>
          <view class="form-item">
            <text class="form-label">邮箱</text>
            <input class="form-input" v-model="formData.email" placeholder="请输入邮箱" />
          </view>
          <view class="form-item">
            <text class="form-label">备注</text>
            <textarea class="form-textarea" v-model="formData.remark" placeholder="请输入备注" />
          </view>
        </view>
        <view class="form-footer">
          <button class="form-button cancel" @click="showForm = false">取消</button>
          <button class="form-button confirm" @click="submitForm">确定</button>
        </view>
      </view>
    </zx-popup>

    <!-- 确认对话框 -->
    <zx-popup v-model:show="showConfirm" type="center" @change="onPopupChange">
      <view class="confirm-dialog">
        <view class="confirm-header">
          <text class="confirm-title">确认删除</text>
        </view>
        <view class="confirm-content">
          <text class="confirm-message">确定要删除这个项目吗？删除后无法恢复。</text>
        </view>
        <view class="confirm-footer">
          <button class="confirm-button cancel" @click="showConfirm = false">取消</button>
          <button class="confirm-button confirm" @click="confirmDelete">确定</button>
        </view>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import zxPopup from '@/components/zx-popup/zx-popup.vue'

// 基础弹窗状态
const showCenter = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)

// 高级用法弹窗状态
const showNoMask = ref(false)
const showNoOverlay = ref(false)
const showNoAnimation = ref(false)
const showCustomStyle = ref(false)

// 事件监听弹窗状态
const showWithEvents = ref(false)

// 实际应用场景弹窗状态
const showActionSheet = ref(false)
const showImagePreview = ref(false)
const showForm = ref(false)
const showConfirm = ref(false)

// ref 引用
const refPopup = ref()

// 表单数据
const formData = reactive({
  name: '',
  email: '',
  remark: ''
})

// 事件日志
const eventLogs = ref([])

// 添加事件日志
const addLog = (content) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  eventLogs.value.unshift({ time, content })
  
  // 限制日志数量
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

// 清空日志
const clearLogs = () => {
  eventLogs.value = []
}

// 通过 ref 打开弹窗
const openByRef = () => {
  refPopup.value?.open()
  addLog('通过 ref 打开弹窗')
}

// 通过 ref 关闭弹窗
const closeByRef = () => {
  refPopup.value?.close()
  addLog('通过 ref 关闭弹窗')
}

// 事件处理函数
const onOpen = () => {
  addLog('弹窗开始打开 (open)')
}

const onOpened = () => {
  addLog('弹窗打开完成 (opened)')
}

const onClose = () => {
  addLog('弹窗开始关闭 (close)')
}

const onClosed = () => {
  addLog('弹窗关闭完成 (closed)')
}

const onMaskClick = () => {
  addLog('点击了遮罩 (maskClick)')
}

const onPopupChange = (e) => {
  addLog(`弹窗状态改变: ${e.show ? '显示' : '隐藏'} (${e.type})`)
}

// 操作菜单处理
const handleAction = (action) => {
  showActionSheet.value = false
  uni.showToast({
    title: `选择了: ${action}`,
    icon: 'none'
  })
  addLog(`操作菜单: ${action}`)
}

// 提交表单
const submitForm = () => {
  if (!formData.name || !formData.email) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }
  
  showForm.value = false
  uni.showToast({
    title: '提交成功',
    icon: 'success'
  })
  addLog(`表单提交: ${formData.name} - ${formData.email}`)
  
  // 重置表单
  formData.name = ''
  formData.email = ''
  formData.remark = ''
}

// 确认删除
const confirmDelete = () => {
  showConfirm.value = false
  uni.showToast({
    title: '删除成功',
    icon: 'success'
  })
  addLog('确认删除操作')
}
</script>

<style scoped>
.container {
  padding: 32rpx;
  background-color: #f7f8fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 48rpx;
}

.page-title {
  font-size: 48rpx;
  font-weight: 600;
  color: #323233;
  display: block;
  margin-bottom: 16rpx;
}

.page-desc {
  font-size: 28rpx;
  color: #969799;
  display: block;
}

.demo-section {
  margin-bottom: 48rpx;
  padding: 32rpx;
  background-color: #fff;
  border-radius: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
  margin-bottom: 32rpx;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.demo-button {
  flex: 1;
  min-width: 200rpx;
  height: 80rpx;
  background-color: #1989fa;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-button:active {
  background-color: #0570d9;
}

.clear-btn {
  width: 100%;
  background-color: #ff976a;
  margin-top: 16rpx;
}

.clear-btn:active {
  background-color: #ff6a00;
}

/* 事件日志样式 */
.event-log {
  max-height: 400rpx;
  overflow-y: auto;
  background-color: #f7f8fa;
  border-radius: 8rpx;
  padding: 16rpx;
  margin-bottom: 16rpx;
}

.log-item {
  display: flex;
  margin-bottom: 8rpx;
  font-size: 24rpx;
}

.log-time {
  color: #969799;
  margin-right: 16rpx;
  min-width: 120rpx;
}

.log-content {
  color: #323233;
  flex: 1;
}

.log-empty {
  text-align: center;
  color: #969799;
  font-size: 24rpx;
  padding: 32rpx;
}

/* 弹窗内容样式 */
.popup-content {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.center-content {
  width: 600rpx;
  max-width: 90vw;
}

.top-content,
.bottom-content {
  width: 100%;
}

.top-content {
  border-radius: 0 0 16rpx 16rpx;
}

.bottom-content {
  border-radius: 16rpx 16rpx 0 0;
}

.side-content {
  width: 500rpx;
  height: 100%;
  border-radius: 0;
}

.no-overlay {
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
}

.custom-style {
  border: 4rpx solid #3b82f6;
}

.popup-header {
  padding: 32rpx 32rpx 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #ebedf0;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
}

.close-btn {
  font-size: 48rpx;
  color: #969799;
  line-height: 1;
  padding: 8rpx;
}

.drag-handle {
  width: 60rpx;
  height: 8rpx;
  background-color: #ebedf0;
  border-radius: 4rpx;
  margin: 0 auto 16rpx;
}

.popup-body {
  padding: 32rpx;
  font-size: 28rpx;
  color: #646566;
  line-height: 1.6;
}

.popup-footer {
  padding: 16rpx 32rpx 32rpx;
  display: flex;
  justify-content: center;
}

.popup-button {
  width: 200rpx;
  height: 72rpx;
  background-color: #1989fa;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.popup-button:active {
  background-color: #0570d9;
}

.custom-button {
  background-color: #3b82f6;
}

.custom-button:active {
  background-color: #2563eb;
}

/* 操作菜单样式 */
.action-sheet {
  background-color: #fff;
  border-radius: 16rpx 16rpx 0 0;
}

.action-header {
  padding: 32rpx;
  text-align: center;
  border-bottom: 1rpx solid #ebedf0;
}

.action-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
}

.action-list {
  padding: 16rpx 0;
}

.action-item {
  padding: 32rpx;
  text-align: center;
  border-bottom: 1rpx solid #ebedf0;
}

.action-item:last-child {
  border-bottom: none;
}

.action-item.danger .action-text {
  color: #ee0a24;
}

.action-text {
  font-size: 32rpx;
  color: #323233;
}

.action-cancel {
  padding: 32rpx;
  text-align: center;
  background-color: #f7f8fa;
  margin-top: 16rpx;
}

/* 图片预览样式 */
.image-preview {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.preview-header {
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-title {
  font-size: 32rpx;
  color: #fff;
}

.preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  max-width: 90%;
  max-height: 90%;
}

.preview-footer {
  padding: 32rpx;
  text-align: center;
}

.preview-info {
  font-size: 28rpx;
  color: #fff;
}

/* 表单弹窗样式 */
.form-popup {
  width: 640rpx;
  max-width: 90vw;
  background-color: #fff;
  border-radius: 16rpx;
}

.form-header {
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #ebedf0;
}

.form-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
}

.form-content {
  padding: 32rpx;
}

.form-item {
  margin-bottom: 32rpx;
}

.form-label {
  display: block;
  font-size: 28rpx;
  color: #323233;
  margin-bottom: 16rpx;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 24rpx;
  border: 1rpx solid #ebedf0;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #323233;
  box-sizing: border-box;
}

.form-textarea {
  height: 120rpx;
  resize: none;
}

.form-footer {
  padding: 16rpx 32rpx 32rpx;
  display: flex;
  gap: 16rpx;
}

.form-button {
  flex: 1;
  height: 72rpx;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.form-button.cancel {
  background-color: #f7f8fa;
  color: #646566;
}

.form-button.confirm {
  background-color: #1989fa;
  color: #fff;
}

/* 确认对话框样式 */
.confirm-dialog {
  width: 560rpx;
  max-width: 90vw;
  background-color: #fff;
  border-radius: 16rpx;
}

.confirm-header {
  padding: 32rpx 32rpx 16rpx;
  text-align: center;
}

.confirm-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
}

.confirm-content {
  padding: 16rpx 32rpx 32rpx;
  text-align: center;
}

.confirm-message {
  font-size: 28rpx;
  color: #646566;
  line-height: 1.6;
}

.confirm-footer {
  padding: 0 32rpx 32rpx;
  display: flex;
  gap: 16rpx;
}

.confirm-button {
  flex: 1;
  height: 72rpx;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.confirm-button.cancel {
  background-color: #f7f8fa;
  color: #646566;
}

.confirm-button.confirm {
  background-color: #ee0a24;
  color: #fff;
}
</style>
