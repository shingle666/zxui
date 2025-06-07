<template>
    <view v-if="show" class="zx-fixed-button" :class="[
        `zx-fixed-button--${position}`,
        { 'zx-fixed-button--shadow': shadow },
        { 'zx-fixed-button--fixed': isFixed },
        { 'zx-fixed-button--absolute': !isFixed }
    ]" :style="fixedButtonStyle" @click="handleClick">
        <!-- 默认插槽，支持自定义内容 -->
        <slot>
            <!-- 默认图标按钮 -->
            <view class="zx-fixed-button__default">
                <zx-icon :name="icon" :size="iconSize" :color="iconColor"></zx-icon>
                <text v-if="text" class="zx-fixed-button__text" :style="{ color: textColor }">{{ text }}</text>
            </view>
        </slot>
    </view>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-fixed-button'

// 定义 props
const props = defineProps({
    // 是否显示
    show: {
        type: Boolean,
        default: true
    },
    // 是否使用固定定位
    isFixed: {
        type: Boolean,
        default: true
    },
    // 悬浮位置：top-left, top-right, bottom-left, bottom-right, top-center, bottom-center, left-center, right-center
    position: {
        type: String,
        default: 'bottom-right',
        validator: (val) => [
            'top-left', 'top-right', 'top-center',
            'bottom-left', 'bottom-right', 'bottom-center',
            'left-center', 'right-center'
        ].includes(val)
    },
    // 距离边缘的距离
    margin: {
        type: [Number, String],
        default: 30
    },
    // 自定义top距离
    top: {
        type: [Number, String],
        default: null
    },
    // 自定义bottom距离
    bottom: {
        type: [Number, String],
        default: null
    },
    // 自定义left距离
    left: {
        type: [Number, String],
        default: null
    },
    // 自定义right距离
    right: {
        type: [Number, String],
        default: null
    },
    // 按钮宽度
    width: {
        type: [Number, String],
        default: 120
    },
    // 按钮高度
    height: {
        type: [Number, String],
        default: 120
    },
    // 背景颜色
    bgColor: {
        type: String,
        default: '#007AFF'
    },
    // 圆角大小
    borderRadius: {
        type: [Number, String],
        default: 60
    },
    // 是否显示阴影
    shadow: {
        type: Boolean,
        default: true
    },
    // 层级
    zIndex: {
        type: Number,
        default: 999
    },
    // 默认图标
    icon: {
        type: String,
        default: 'plus'
    },
    // 图标大小
    iconSize: {
        type: [Number, String],
        default: 50
    },
    // 图标颜色
    iconColor: {
        type: String,
        default: '#ffffff'
    },
    // 文字内容
    text: {
        type: String,
        default: ''
    },
    // 文字颜色
    textColor: {
        type: String,
        default: '#ffffff'
    },
    // 透明度
    opacity: {
        type: Number,
        default: 1
    },
    // 动画持续时间
    animationDuration: {
        type: Number,
        default: 300
    }
})

// 定义 emits
const emit = defineEmits(['click'])

// 计算样式
const fixedButtonStyle = computed(() => {
    const style = {
        width: typeof props.width === 'number' ? `${props.width}rpx` : props.width,
        height: typeof props.height === 'number' ? `${props.height}rpx` : props.height,
        backgroundColor: props.bgColor,
        borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}rpx` : props.borderRadius,
        zIndex: props.zIndex,
        opacity: props.opacity,
        transitionDuration: `${props.animationDuration}ms`
    }

    // 处理位置
    const marginValue = typeof props.margin === 'number' ? `${props.margin}rpx` : props.margin

    // 自定义位置优先
    if (props.top !== null) {
        style.top = typeof props.top === 'number' ? `${props.top}rpx` : props.top
    }
    if (props.bottom !== null) {
        style.bottom = typeof props.bottom === 'number' ? `${props.bottom}rpx` : props.bottom
    }
    if (props.left !== null) {
        style.left = typeof props.left === 'number' ? `${props.left}rpx` : props.left
    }
    if (props.right !== null) {
        style.right = typeof props.right === 'number' ? `${props.right}rpx` : props.right
    }

    // 如果没有自定义位置，使用预设位置
    if (props.top === null && props.bottom === null && props.left === null && props.right === null) {
        switch (props.position) {
            case 'top-left':
                style.top = marginValue
                style.left = marginValue
                break
            case 'top-right':
                style.top = marginValue
                style.right = marginValue
                break
            case 'top-center':
                style.top = marginValue
                style.left = '50%'
                style.transform = 'translateX(-50%)'
                break
            case 'bottom-left':
                style.bottom = marginValue
                style.left = marginValue
                break
            case 'bottom-right':
                style.bottom = marginValue
                style.right = marginValue
                break
            case 'bottom-center':
                style.bottom = marginValue
                style.left = '50%'
                style.transform = 'translateX(-50%)'
                break
            case 'left-center':
                style.left = marginValue
                style.top = '50%'
                style.transform = 'translateY(-50%)'
                break
            case 'right-center':
                style.right = marginValue
                style.top = '50%'
                style.transform = 'translateY(-50%)'
                break
        }
    }


    return style
})

// 点击事件处理
const handleClick = (e) => {
    emit('click', e)
}
</script>

<style lang="scss" scoped>
.zx-fixed-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    &--shadow {
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
    }

    &--fixed {
        position: fixed;
    }

    &--relative {
        position: relative;
    }

    &--absolute {
        position: absolute;
    }
}

.zx-fixed-button__default {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.zx-fixed-button__text {
    font-size: 24rpx;
    margin-top: 8rpx;
    text-align: center;
    line-height: 1;
}

/* H5 适配安全区域 */
/* #ifdef H5 */
.zx-fixed-button--top-left {
    top: calc(var(--status-bar-height, 0px) + var(--window-top, 0px));
    left: calc(var(--window-left, 0px));
}

.zx-fixed-button--top-right {
    top: calc(var(--status-bar-height, 0px) + var(--window-top, 0px));
    right: calc(var(--window-right, 0px));
}

.zx-fixed-button--top-center {
    top: calc(var(--status-bar-height, 0px) + var(--window-top, 0px));
}

.zx-fixed-button--bottom-left {
    bottom: calc(var(--window-bottom, 0px));
    left: calc(var(--window-left, 0px));
}

.zx-fixed-button--bottom-right {
    bottom: calc(var(--window-bottom, 0px));
    right: calc(var(--window-right, 0px));
}

.zx-fixed-button--bottom-center {
    bottom: calc(var(--window-bottom, 0px));
}

.zx-fixed-button--left-center {
    left: calc(var(--window-left, 0px));
}

.zx-fixed-button--right-center {
    right: calc(var(--window-right, 0px));
}

/* #endif */
</style>