<template>
  <view
    ref="affixRef"
    :class="['zx-affix', { 'zx-affix--fixed': isFixed }]"
    :style="wrapperStyle"
  >
    <view
      ref="contentRef"
      :class="['zx-affix__content', { 'zx-affix__content--fixed': isFixed }]"
      :style="contentStyle"
    >
      <slot />
    </view>
  </view>
</template>

<script setup>
/**
 * affix 固钉组件
 * @description 将页面元素固定在特定可视区域，参考 Element Plus Affix 组件
 * @tutorial https://zxui.org/components/affix
 * @property {Number}			offset			偏移距离 （默认 0）
 * @property {String}			position		固钉位置，可选值为 top、bottom （默认 top）
 * @property {String}			target			指定容器（CSS 选择器）
 * @property {Number}			zIndex			z-index （默认 100）
 * @event {Function}			change			固钉状态改变时触发的事件，参数为是否固定状态
 * @event {Function}			scroll			滚动时触发的事件，参数为滚动位置信息
 * @example <zx-affix :offset="120"><button>固定按钮</button></zx-affix>
 */

import {  ref,  computed,  onMounted,  onUnmounted,  getCurrentInstance,  nextTick,  watch,} from "vue";

const { proxy } = getCurrentInstance();

const props = defineProps({
  // 偏移距离
  offset: {
    type: Number,
    default: 0,
  },
  // 固钉位置
  position: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value),
  },
  // 指定容器（CSS 选择器）
  target: {
    type: String,
    default: "",
  },
  // z-index
  zIndex: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits(["change", "scroll"]);

// 响应式数据
const affixRef = ref(null);
const contentRef = ref(null);
const isFixed = ref(false);
const affixRect = ref({});
const targetRect = ref({});
const placeholderHeight = ref(0);
const placeholderWidth = ref(0);
const scrollTop = ref(0);
const windowHeight = ref(0);

// 包装器样式 - 用于占位
const wrapperStyle = computed(() => {
  if (isFixed.value) {
    return {
      height: `${placeholderHeight.value}px`,
      width: `${placeholderWidth.value}px`,
    };
  }
  return {};
});

// 固定内容样式
const contentStyle = computed(() => {
  if (!isFixed.value) return {};

  const styles = {
    position: "fixed",
    zIndex: props.zIndex,
    left: `${affixRect.value.left || 0}px`,
    width: `${affixRect.value.width || "auto"}px`,
  };

  if (props.position === "top") {
    styles.top = `${props.offset}px`;
  } else {
    styles.bottom = `${props.offset}px`;
  }

  // 微信小程序兼容性处理
  // #ifdef MP-WEIXIN
  styles.position = "fixed";
  styles.left = `${affixRect.value.left || 0}px`;
  styles.top = props.position === "top" ? `${props.offset}px` : "auto";
  styles.bottom = props.position === "bottom" ? `${props.offset}px` : "auto";
  // #endif

  return styles;
});

// 获取元素位置信息
const getElementRect = (selector) => {
  return new Promise((resolve) => {
    // 微信小程序中，增加更精确的选择器查询
    const query = uni.createSelectorQuery();
    
    // #ifdef MP-WEIXIN
    query.in(proxy);
    // #endif
    
    query
      .select(selector)
      .boundingClientRect((rect) => {
        resolve(rect || {});
      })
      .exec();
  });
};

// 获取系统信息
const getSystemInfo = () => {
  return new Promise((resolve) => {
    uni.getSystemInfo({
      success: (res) => {
        windowHeight.value = res.windowHeight || res.screenHeight;
        // #ifdef MP-WEIXIN
        // 微信小程序需要减去状态栏高度
        if (res.statusBarHeight) {
          windowHeight.value = res.windowHeight - res.statusBarHeight;
        }
        // #endif
        resolve(res);
      },
      fail: () => {
        resolve({ windowHeight: 667 }); // 默认高度
      },
    });
  });
};

// 更新固钉状态
const updateAffixStatus = async () => {
  if (!affixRef.value) return;

  try {
    // 获取元素位置信息
    const rect = await getElementRect(".zx-affix");
    if (!rect || !rect.width) {
      // #ifdef MP-WEIXIN
      // 微信小程序中，如果获取不到元素，尝试延迟重试
      setTimeout(() => {
        updateAffixStatus();
      }, 100);
      // #endif
      return;
    }

    affixRect.value = rect;
    placeholderHeight.value = rect.height;
    placeholderWidth.value = rect.width;

    // 获取系统信息
    const systemInfo = await getSystemInfo();

    // 计算是否需要固定
    let shouldFixed = false;

    if (props.target) {
      // 指定容器模式
      shouldFixed = await calculateTargetFixed(rect, systemInfo);
    } else {
      // 全局模式
      shouldFixed = calculateGlobalFixed(rect, systemInfo);
    }

    // #ifdef MP-WEIXIN
    // 微信小程序调试信息
    console.log('微信小程序固钉状态计算:', {
      rect,
      systemInfo: { windowHeight: systemInfo.windowHeight },
      shouldFixed,
      position: props.position,
      offset: props.offset
    });
    // #endif

    // 更新固定状态
    if (shouldFixed !== isFixed.value) {
      isFixed.value = shouldFixed;
      emit("change", shouldFixed);
    }

    // 触发滚动事件
    emit("scroll", {
      scrollTop: scrollTop.value,
      fixed: isFixed.value,
      rect: rect,
    });
  } catch (error) {
    console.warn("zx-affix updateAffixStatus error:", error);
    
    // #ifdef MP-WEIXIN
    console.error("微信小程序固钉更新失败:", error);
    // 在小程序中，如果出错，尝试重新初始化
    setTimeout(() => {
      updateAffixStatus();
    }, 500);
    // #endif
  }
};

// 计算全局固定状态
const calculateGlobalFixed = (affixRect, systemInfo) => {
  if (props.position === "top") {
    return affixRect.top <= props.offset;
  } else {
    return affixRect.bottom >= systemInfo.windowHeight - props.offset;
  }
};

// 计算指定容器固定状态
const calculateTargetFixed = async (affixRect, systemInfo) => {
  if (!props.target) return false;

  try {
    const targetRect = await getElementRect(props.target);
    if (!targetRect || !targetRect.width) return false;

    let shouldFixed = false;

    if (props.position === "top") {
      // 顶部固定：元素顶部到达设置的偏移距离且在容器内
      shouldFixed =
        affixRect.top <= props.offset &&
        affixRect.top >= targetRect.top &&
        affixRect.bottom <= targetRect.bottom;
    } else {
      // 底部固定：元素底部到达设置的偏移距离且在容器内
      shouldFixed =
        affixRect.bottom >= systemInfo.windowHeight - props.offset &&
        affixRect.bottom <= targetRect.bottom &&
        affixRect.top >= targetRect.top;
    }

    // 如果元素完全超出容器范围，则不固定
    if (affixRect.top > targetRect.bottom || affixRect.bottom < targetRect.top) {
      shouldFixed = false;
    }

    return shouldFixed;
  } catch (error) {
    console.warn("zx-affix calculateTargetFixed error:", error);
    return false;
  }
};

// 页面滚动事件处理
const handlePageScroll = (e) => {
  scrollTop.value = e.scrollTop || 0;
  updateAffixStatus();
};

// 手动更新固钉状态
const update = () => {
  nextTick(() => {
    updateAffixStatus();
  });
};

// 手动更新根元素的盒模型信息
const updateRoot = () => {
  nextTick(async () => {
    if (!affixRef.value) return;

    try {
      const rect = await getElementRect(".zx-affix");
      if (rect) {
        affixRect.value = rect;
        placeholderHeight.value = rect.height;
        placeholderWidth.value = rect.width;
        updateAffixStatus();
      }
    } catch (error) {
      console.warn("zx-affix updateRoot error:", error);
    }
  });
};

// 防抖处理
let scrollTimer = null;
const throttledScroll = (e) => {
  if (scrollTimer) return;

  scrollTimer = setTimeout(() => {
    handlePageScroll(e);
    scrollTimer = null;
  }, 16); // 约60fps
};

// 窗口大小变化处理
const handleWindowResize = () => {
  updateRoot();
};

// 监听属性变化
watch([() => props.offset, () => props.position, () => props.target], () => {
  nextTick(() => {
    updateAffixStatus();
  });
});

onMounted(() => {
  nextTick(() => {
    // 初始化更新状态
    setTimeout(() => {
      updateAffixStatus();
    }, 100);

    // 监听页面滚动
    // #ifdef MP-WEIXIN
    // 微信小程序中，增强滚动事件监听
    if (uni.onPageScroll) {
      uni.onPageScroll(throttledScroll);
    }
    // 备用方案：监听页面滚动
    const pages = getCurrentPages();
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.onPageScroll) {
        const originalOnPageScroll = currentPage.onPageScroll;
        currentPage.onPageScroll = function(e) {
          throttledScroll(e);
          if (originalOnPageScroll) {
            originalOnPageScroll.call(this, e);
          }
        };
      }
    }
    // #endif

    // #ifndef MP-WEIXIN
    uni.onPageScroll && uni.onPageScroll(throttledScroll);
    // #endif

    // 监听窗口大小变化
    uni.onWindowResize && uni.onWindowResize(handleWindowResize);
    
    // 微信小程序额外初始化
    // #ifdef MP-WEIXIN
    // 延迟更新，确保页面渲染完成
    setTimeout(() => {
      updateAffixStatus();
    }, 300);
    // #endif
  });
});

onUnmounted(() => {
  // 清理定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer);
    scrollTimer = null;
  }

  // 移除事件监听
  try {
    uni.offPageScroll && uni.offPageScroll(throttledScroll);
    uni.offWindowResize && uni.offWindowResize(handleWindowResize);
  } catch (error) {
    console.warn("zx-affix cleanup error:", error);
  }
});

// 暴露方法
defineExpose({
  update,
  updateRoot,
});
</script>

<style scoped>
.zx-affix {
  position: relative;
}

.zx-affix__content {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.zx-affix__content--fixed {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 微信小程序固定定位优化 */
  /* #ifdef MP-WEIXIN */
  position: fixed !important;
  left: 0;
  right: 0;
  /* #endif */
}

/* 兼容性样式 */
.zx-affix--fixed {
  /* 确保占位空间 */
}

/* 微信小程序特殊处理 */
/* #ifdef MP-WEIXIN */
.zx-affix__content--fixed {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
}
/* #endif */

/* 动画效果 */
@keyframes zx-affix-slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes zx-affix-slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.zx-affix__content--fixed {
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

/* 根据位置应用不同动画 */
.zx-affix[data-position="top"] .zx-affix__content--fixed {
  animation-name: zx-affix-slide-down;
}

.zx-affix[data-position="bottom"] .zx-affix__content--fixed {
  animation-name: zx-affix-slide-up;
}

/* 微信小程序适配 */
/* #ifdef MP-WEIXIN */
.zx-affix__content--fixed {
  /* 确保在微信小程序中正确显示 */
  position: fixed !important;
  z-index: 999;
}
/* #endif */
</style>
