<template>
    <view class="demo-page">
        <zx-navbar title="zx-fixed-button 悬浮按钮" :border="false"></zx-navbar>
        
        <view class="demo-content">
            <zx-fixed-button bgColor="#ffff00" position="top-right" :borderRadius="0" :width="200" :height="50" :top="100" :right="10" :isFixed="false">
				<view>
					按钮
				</view>
			</zx-fixed-button>
            <!-- 基础用法 -->
            <zx-section title="基础用法" padding>
                <view class="demo-item">
                    <text class="demo-text">默认悬浮按钮（右下角）</text>
                </view>
            </zx-section>
            
            <!-- 不同位置 -->
            <zx-section title="不同位置" padding>
                <view class="demo-item">
                    <text class="demo-text">查看屏幕四周的悬浮按钮</text>
                </view>
            </zx-section>
            
            <!-- 非固定定位模式 -->
            <zx-section title="非固定定位模式" padding>
                <view class="demo-item">
                    <text class="demo-text">使用相对定位，不会固定在屏幕上：</text>
                    <view class="relative-button-container">
                        <zx-fixed-button
                            :is-fixed="false"
                            bg-color="#52c41a"
                            icon="check"
                            :width="80"
                            :height="80"
                            @click="handleRelativeClick"
                        />
                        <text class="relative-text">这是相对定位的按钮</text>
                    </view>
                </view>
            </zx-section>
            
            <!-- 自定义样式 -->
            <zx-section title="自定义样式" padding>
                <view class="demo-item">
                    <text class="demo-text">自定义颜色和图标</text>
                </view>
            </zx-section>
            
            <!-- 自定义内容 -->
            <zx-section title="自定义内容" padding>
                <view class="demo-item">
                    <text class="demo-text">使用插槽自定义内容</text>
                </view>
            </zx-section>
            
            <!-- 控制按钮 -->
            <zx-section title="控制显示" padding>
                <view class="demo-item">
                    <zx-button @click="toggleShow" :type="showButtons ? 'primary' : 'default'">
                        {{ showButtons ? '隐藏悬浮按钮' : '显示悬浮按钮' }}
                    </zx-button>
                </view>
            </zx-section>
        </view>
        
        <!-- 固定定位的悬浮按钮 -->
        <!-- 默认按钮 -->
        <zx-fixed-button 
            v-if="showButtons"
            @click="handleClick('默认按钮')"
        />
        
        <!-- 左上角 -->
        <zx-fixed-button 
            v-if="showButtons"
            position="top-left"
            icon="menu"
            bg-color="#ff6b6b"
            @click="handleClick('左上角按钮')"
        />
        
        <!-- 右上角 -->
        <zx-fixed-button 
            v-if="showButtons"
            position="top-right"
            icon="search"
            bg-color="#4ecdc4"
            @click="handleClick('右上角按钮')"
        />
        
        <!-- 左下角 -->
        <zx-fixed-button 
            v-if="showButtons"
            position="bottom-left"
            icon="message"
            bg-color="#45b7d1"
            @click="handleClick('左下角按钮')"
        />
        
        <!-- 顶部居中 -->
        <zx-fixed-button 
            v-if="showButtons"
            position="top-center"
            icon="bell"
            bg-color="#f9ca24"
            :width="100"
            :height="60"
            :border-radius="30"
            @click="handleClick('顶部居中按钮')"
        />
        
        <!-- 自定义内容按钮 -->
        <zx-fixed-button 
            v-if="showButtons"
            :right="30"
            :bottom="200"
            bg-color="#6c5ce7"
            :width="120"
            :height="120"
            @click="handleClick('自定义内容按钮')"
        >
            <view class="custom-content">
                <zx-icon name="heart" size="40" color="#ffffff"></zx-icon>
                <text class="custom-text">收藏</text>
            </view>
        </zx-fixed-button>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const showButtons = ref(true)

const toggleShow = () => {
    showButtons.value = !showButtons.value
}

const handleClick = (buttonName) => {
    uni.showToast({
        title: `点击了${buttonName}`,
        icon: 'none'
    })
}

const handleRelativeClick = () => {
    uni.showToast({
        title: '点击了相对定位按钮',
        icon: 'none'
    })
}
</script>

<style lang="scss" scoped>
.demo-page {
    background-color: #f5f5f5;
    min-height: 100vh;
}

.demo-content {
    padding-bottom: 100rpx;
}

.demo-item {
    padding: 30rpx 0;
}

.demo-text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.5;
}

.relative-button-container {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    padding: 20rpx;
    background-color: #f0f0f0;
    border-radius: 16rpx;
}

.relative-text {
    margin-left: 20rpx;
    font-size: 24rpx;
    color: #999;
}

.custom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.custom-text {
    font-size: 20rpx;
    color: #ffffff;
    margin-top: 8rpx;
}
</style>