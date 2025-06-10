<template>
    <!-- #ifdef APP-NVUE -->
    <refresh :display="display" @refresh="onRefresh" @pullingdown="onPullingDown">
        <slot />
    </refresh>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <view ref="refreshRef" class="zx-refresh" v-show="isShow" :style="{ height: refreshHeight + 'px' }"
        @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <view class="zx-refresh-content">
            <text v-if="refreshStatus === 0 || refreshStatus === 1" class="zx-refresh-icon">↓</text>
            <text v-if="refreshStatus === 2" class="zx-refresh-icon zx-refresh-loading">⟳</text>
            <text v-if="refreshStatus === 3" class="zx-refresh-icon">✔</text>
            <text class="zx-refresh-text">{{ refreshText[refreshStatus] }}</text>
        </view>
        <slot />
    </view>
    <!-- #endif -->
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    display: { type: String, default: 'hide' },
    refreshText: {
        type: Array,
        default: () => ['继续下拉刷新', '松开手指开始刷新', '数据刷新中', '数据已刷新']
    },
    refreshFontSize: { type: Number, default: 28 },
    triggerHeight: { type: Number, default: 50 }
})
const emit = defineEmits(['refresh', 'pullingdown', 'reload'])

const pulling = ref(false)
const isShow = computed(() => props.display === 'show' || pulling.value)

// 非 nvue 下拉刷新状态
const refreshStatus = ref(0) // 0:下拉 1:松手 2:刷新中 3:已刷新
const refreshHeight = ref(0)
let refreshY = 0
let reScrollTop = 0

function touchstart(e) {
    if (reScrollTop > 10) return
    refreshY = e.touches[0].pageY || e.changedTouches[0].pageY
}
function touchmove(e) {
    if (refreshStatus.value >= 1) return
    if (reScrollTop > 10) return
    let moveY = (e.touches[0].pageY || e.changedTouches[0].pageY) - refreshY
    moveY = moveY / 2
    if (moveY >= props.triggerHeight) {
        moveY = props.triggerHeight
        refreshStatus.value = 1
    }
    if (moveY > 15) refreshHeight.value = moveY
}
function touchend(e) {
    if (reScrollTop > 10) return
    if (refreshStatus.value < 1) {
        resetFresh()
    } else if (refreshStatus.value === 1) {
        refreshStatus.value = 2
        emit('reload')
        setTimeout(() => endReload(), 1200)
    }
}
function endReload() {
    refreshStatus.value = 3
    setTimeout(() => resetFresh(), 800)
}
function resetFresh() {
    refreshHeight.value = 0
    refreshStatus.value = 0
}

function onRefresh(e) {
    emit('refresh', e)
}
function onPullingDown(e) {
    emit('pullingdown', e)
}
function onchange(value) {
    pulling.value = value
}
</script>

<style lang="scss" scoped>
.zx-refresh {
    height: 0;
    overflow: hidden;
    transition: height 0.3s;
}

.zx-refresh-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}

.zx-refresh-icon {
    font-size: 24px;
    margin-right: 8px;
}

.zx-refresh-loading {
    animation: zx-spin 1s linear infinite;
}

@keyframes zx-spin {
    100% {
        transform: rotate(360deg);
    }
}

.zx-refresh-text {
    font-size: 14px;
    color: #888;
}
</style>
