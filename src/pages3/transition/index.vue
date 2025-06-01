<template>
  <view class="container">
    <zx-navbar title="ZxTransition 过渡动画" />
    
    <scroll-view scroll-y class="scroll-view">
      <!-- 基础动画 -->
      <view class="section">
        <view class="section-title">基础动画效果</view>
        
        <view class="demo-item">
          <view class="demo-title">淡入淡出 (fade)</view>
          <view class="demo-content">
            <zx-transition :show="show.fade" mode-class="fade">
              <view class="demo-box fade-box">Fade Animation</view>
            </zx-transition>
          </view>
          <button @click="toggle('fade')" class="demo-btn">
            {{ show.fade ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">从上滑入 (slide-top)</view>
          <view class="demo-content">
            <zx-transition :show="show.slideTop" mode-class="slide-top">
              <view class="demo-box slide-box">Slide Top</view>
            </zx-transition>
          </view>
          <button @click="toggle('slideTop')" class="demo-btn">
            {{ show.slideTop ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">从右滑入 (slide-right)</view>
          <view class="demo-content">
            <zx-transition :show="show.slideRight" mode-class="slide-right">
              <view class="demo-box slide-box">Slide Right</view>
            </zx-transition>
          </view>
          <button @click="toggle('slideRight')" class="demo-btn">
            {{ show.slideRight ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">从下滑入 (slide-bottom)</view>
          <view class="demo-content">
            <zx-transition :show="show.slideBottom" mode-class="slide-bottom">
              <view class="demo-box slide-box">Slide Bottom</view>
            </zx-transition>
          </view>
          <button @click="toggle('slideBottom')" class="demo-btn">
            {{ show.slideBottom ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">从左滑入 (slide-left)</view>
          <view class="demo-content">
            <zx-transition :show="show.slideLeft" mode-class="slide-left">
              <view class="demo-box slide-box">Slide Left</view>
            </zx-transition>
          </view>
          <button @click="toggle('slideLeft')" class="demo-btn">
            {{ show.slideLeft ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">缩放进入 (zoom-in)</view>
          <view class="demo-content">
            <zx-transition :show="show.zoomIn" mode-class="zoom-in">
              <view class="demo-box zoom-box">Zoom In</view>
            </zx-transition>
          </view>
          <button @click="toggle('zoomIn')" class="demo-btn">
            {{ show.zoomIn ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">缩放退出 (zoom-out)</view>
          <view class="demo-content">
            <zx-transition :show="show.zoomOut" mode-class="zoom-out">
              <view class="demo-box zoom-box">Zoom Out</view>
            </zx-transition>
          </view>
          <button @click="toggle('zoomOut')" class="demo-btn">
            {{ show.zoomOut ? '隐藏' : '显示' }}
          </button>
        </view>
      </view>
      
      <!-- 组合动画 -->
      <view class="section">
        <view class="section-title">组合动画效果</view>
        
        <view class="demo-item">
          <view class="demo-title">淡入 + 滑动</view>
          <view class="demo-content">
            <zx-transition :show="show.combo1" :mode-class="['fade', 'slide-top']">
              <view class="demo-box combo-box">Fade + Slide</view>
            </zx-transition>
          </view>
          <button @click="toggle('combo1')" class="demo-btn">
            {{ show.combo1 ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">缩放 + 滑动</view>
          <view class="demo-content">
            <zx-transition :show="show.combo2" :mode-class="['zoom-in', 'slide-bottom']">
              <view class="demo-box combo-box">Zoom + Slide</view>
            </zx-transition>
          </view>
          <button @click="toggle('combo2')" class="demo-btn">
            {{ show.combo2 ? '隐藏' : '显示' }}
          </button>
        </view>
      </view>
      
      <!-- 自定义动画 -->
      <view class="section">
        <view class="section-title">自定义动画</view>
        
        <view class="demo-item">
          <view class="demo-title">自定义动画时长</view>
          <view class="demo-content">
            <zx-transition :show="show.custom1" mode-class="fade" :duration="1000">
              <view class="demo-box custom-box">慢速动画 (1s)</view>
            </zx-transition>
          </view>
          <button @click="toggle('custom1')" class="demo-btn">
            {{ show.custom1 ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">自定义样式</view>
          <view class="demo-content">
            <zx-transition 
              :show="show.custom2" 
              mode-class="zoom-in"
              :styles="{ backgroundColor: '#ff6b6b', borderRadius: '20px' }"
            >
              <view class="demo-box custom-box">自定义样式</view>
            </zx-transition>
          </view>
          <button @click="toggle('custom2')" class="demo-btn">
            {{ show.custom2 ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">手动控制动画</view>
          <view class="demo-content">
            <zx-transition ref="manualTransition" :show="false">
              <view class="demo-box manual-box">手动动画</view>
            </zx-transition>
          </view>
          <view class="btn-group">
            <button @click="runManualAnimation" class="demo-btn small">
              执行动画
            </button>
            <button @click="runComplexAnimation" class="demo-btn small">
              复杂动画
            </button>
          </view>
        </view>
      </view>
      
      <!-- 实际应用场景 -->
      <view class="section">
        <view class="section-title">实际应用场景</view>
        
        <view class="demo-item">
          <view class="demo-title">模态弹窗</view>
          <view class="demo-content">
            <button @click="showModal = true" class="demo-btn">
              打开弹窗
            </button>
            
            <!-- 弹窗遮罩 -->
            <zx-transition :show="showModal" mode-class="fade">
              <view class="modal-overlay" @click="showModal = false">
                <!-- 弹窗内容 -->
                <zx-transition :show="showModal" mode-class="zoom-in">
                  <view class="modal-content" @click.stop>
                    <view class="modal-title">提示</view>
                    <view class="modal-text">这是一个带动画的弹窗</view>
                    <view class="modal-actions">
                      <button @click="showModal = false" class="modal-btn">
                        确定
                      </button>
                    </view>
                  </view>
                </zx-transition>
              </view>
            </zx-transition>
          </view>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">列表动画</view>
          <view class="demo-content">
            <button @click="toggleList" class="demo-btn">
              {{ showList ? '隐藏列表' : '显示列表' }}
            </button>
            
            <view class="list-container">
              <zx-transition 
                v-for="(item, index) in listItems" 
                :key="item.id"
                :show="item.visible" 
                mode-class="slide-left"
                :duration="200 + index * 100"
              >
                <view class="list-item">
                  <view class="list-avatar">{{ item.avatar }}</view>
                  <view class="list-content">
                    <view class="list-title">{{ item.title }}</view>
                    <view class="list-desc">{{ item.desc }}</view>
                  </view>
                </view>
              </zx-transition>
            </view>
          </view>
        </view>
        
        <view class="demo-item">
          <view class="demo-title">消息提示</view>
          <view class="demo-content">
            <button @click="showToast" class="demo-btn">
              显示消息
            </button>
            
            <zx-transition :show="toastVisible" mode-class="slide-top">
              <view class="toast">
                <text class="toast-text">操作成功！</text>
              </view>
            </zx-transition>
          </view>
        </view>
      </view>
      
      <!-- 批量控制 -->
      <view class="section">
        <view class="section-title">批量控制</view>
        
        <view class="demo-item">
          <view class="demo-content">
            <view class="btn-group">
              <button @click="showAll" class="demo-btn">
                显示所有
              </button>
              <button @click="hideAll" class="demo-btn">
                隐藏所有
              </button>
              <button @click="toggleAll" class="demo-btn">
                切换所有
              </button>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// 响应式数据
const show = reactive({
  fade: false,
  slideTop: false,
  slideRight: false,
  slideBottom: false,
  slideLeft: false,
  zoomIn: false,
  zoomOut: false,
  combo1: false,
  combo2: false,
  custom1: false,
  custom2: false
})

const showModal = ref(false)
const showList = ref(false)
const toastVisible = ref(false)
const manualTransition = ref(null)

const listItems = reactive([
  { id: 1, avatar: '👤', title: '用户1', desc: '这是用户1的描述信息', visible: false },
  { id: 2, avatar: '👥', title: '用户2', desc: '这是用户2的描述信息', visible: false },
  { id: 3, avatar: '👨', title: '用户3', desc: '这是用户3的描述信息', visible: false },
  { id: 4, avatar: '👩', title: '用户4', desc: '这是用户4的描述信息', visible: false }
])

// 方法定义
const toggle = (key) => {
  show[key] = !show[key]
}

const showAll = () => {
  Object.keys(show).forEach(key => {
    show[key] = true
  })
}

const hideAll = () => {
  Object.keys(show).forEach(key => {
    show[key] = false
  })
}

const toggleAll = () => {
  Object.keys(show).forEach(key => {
    show[key] = !show[key]
  })
}

const toggleList = () => {
  showList.value = !showList.value
  listItems.forEach((item, index) => {
    setTimeout(() => {
      item.visible = showList.value
    }, index * 100)
  })
}

const showToast = () => {
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2000)
}

const runManualAnimation = () => {
  if (!manualTransition.value) return
  
  manualTransition.value.init({
    duration: 300,
    timingFunction: 'ease-in-out'
  })
  
  manualTransition.value
    .step({
      translateX: [100],
      opacity: [0.5]
    })
    .step({
      translateX: [0],
      opacity: [1]
    })
    .run(() => {
      console.log('手动动画执行完成')
    })
}

const runComplexAnimation = () => {
  if (!manualTransition.value) return
  
  manualTransition.value.init({
    duration: 200,
    timingFunction: 'ease'
  })
  
  manualTransition.value
    .step({
      scale: [1.2],
      rotate: [90]
    })
    .step({
      scale: [0.8],
      rotate: [180]
    })
    .step({
      scale: [1],
      rotate: [360],
      translateY: [-20]
    })
    .step({
      translateY: [0]
    })
    .run(() => {
      console.log('复杂动画执行完成')
    })
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.scroll-view {
  height: calc(100vh - 44px);
  padding: 20rpx;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding: 0 20rpx;
}

.demo-item {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #666;
  margin-bottom: 20rpx;
}

.demo-content {
  min-height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  position: relative;
}

.demo-box {
  padding: 20rpx 40rpx;
  border-radius: 12rpx;
  color: white;
  font-size: 24rpx;
  text-align: center;
  min-width: 200rpx;
}

.fade-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.slide-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.zoom-box {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.combo-box {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.custom-box {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.manual-box {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
}

.demo-btn {
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 16rpx 32rpx;
  font-size: 24rpx;
  margin: 0 10rpx;
}

.demo-btn.small {
  padding: 12rpx 24rpx;
  font-size: 22rpx;
}

.btn-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20rpx;
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16rpx;
  padding: 40rpx;
  margin: 40rpx;
  max-width: 600rpx;
  width: 80%;
}

.modal-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
}

.modal-text {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  margin-bottom: 40rpx;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.modal-btn {
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 16rpx 40rpx;
  font-size: 24rpx;
}

/* 列表样式 */
.list-container {
  margin-top: 20rpx;
}

.list-item {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.list-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: 20rpx;
}

.list-content {
  flex: 1;
}

.list-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 8rpx;
}

.list-desc {
  font-size: 24rpx;
  color: #999;
}

/* 消息提示样式 */
.toast {
  position: fixed;
  top: 100rpx;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20rpx 40rpx;
  border-radius: 8rpx;
  z-index: 1000;
}

.toast-text {
  font-size: 24rpx;
}
</style>