<template>
  <view class="zx-code-display">
    <!-- 工具栏 -->
    <view class="code-toolbar" v-if="showCode">
      <view class="toolbar-left">
        <text class="code-title">{{ title || "源代码" }}</text>
        <view class="language-tag" v-if="language">
          <text class="language-text">{{ language.toUpperCase() }}</text>
        </view>
      </view>
      <view class="toolbar-right">
        <view class="tool-btn" @click="toggleLineNumber">
          <text class="icon">{{ showLineNumber ? "🔢" : "📄" }}</text>
          <text class="btn-text">{{ showLineNumber ? "隐藏行号" : "显示行号" }}</text>
        </view>
        <view class="tool-btn" @click="toggleWrap">
          <text class="icon">{{ wrapCode ? "📖" : "📜" }}</text>
          <text class="btn-text">{{ wrapCode ? "不换行" : "自动换行" }}</text>
        </view>
        <view class="tool-btn" @click="copyCode">
          <text class="icon">📋</text>
          <text class="btn-text">复制代码</text>
        </view>
        <view class="tool-btn" @click="toggleFullscreen" v-if="enableFullscreen">
          <text class="icon">{{ isFullscreen ? "🗗" : "🗖" }}</text>
          <text class="btn-text">{{ isFullscreen ? "退出全屏" : "全屏" }}</text>
        </view>
      </view>
    </view>

    <!-- 代码内容 -->
    <view class="code-container" v-if="showCode" :class="{ fullscreen: isFullscreen }">
      <view class="code-block" :style="codeBlockStyle">
        <!-- 行号列 -->
        <view class="line-numbers" v-if="showLineNumber">
          <view class="line-number" v-for="(line, index) in codeLines" :key="index" :style="{ height: lineHeight }">
            {{ index + 1 }}
          </view>
        </view>

        <!-- 代码内容 -->
        <view class="code-content-wrapper" :class="{ 'with-line-numbers': showLineNumber }">
          <view class="code-line" v-for="(line, index) in codeLines" :key="index" :style="codeLineStyle">
            <text class="code-text" v-html="highlightedCode[index] || line"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 代码统计信息 -->
    <view class="code-stats" v-if="showCode && showStats">
      <text class="stats-item">共 {{ codeLines.length }} 行</text>
      <text class="stats-item">{{ sourceCode.length }} 字符</text>
      <text class="stats-item" v-if="language">语言: {{ language }}</text>
    </view>

    <!-- 复制成功提示 -->
    <view class="copy-toast" v-if="showCopyToast" :class="{ show: showCopyToast }">
      <text class="toast-text">代码已复制到剪贴板</text>
    </view>
  </view>
</template>

<script setup>
/**
 * zx-code 增强版源代码展示组件
 * @property {String} sourceCode 源代码内容
 * @property {Boolean} showCode 是否显示源代码，默认 true
 * @property {String} language 编程语言类型，用于语法高亮
 * @property {String} title 代码块标题
 * @property {String|Number} fontSize 字体大小，默认 26rpx
 * @property {String|Number} lineHeight 行高，默认 40rpx
 * @property {Boolean} showLineNumber 是否显示行号，默认 true
 * @property {Boolean} enableCopy 是否启用复制功能，默认 true
 * @property {Boolean} enableFullscreen 是否启用全屏功能，默认 true
 * @property {Boolean} wrapCode 是否自动换行，默认 false
 * @property {Boolean} showStats 是否显示代码统计信息，默认 true
 * @property {String} theme 代码主题，默认 'light'
 */
import { ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  // 源代码
  sourceCode: {
    type: String,
    default: "",
  },
  // 是否显示源代码
  showCode: {
    type: Boolean,
    default: true,
  },
  // 编程语言
  language: {
    type: String,
    default: "javascript",
  },
  // 代码块标题
  title: {
    type: String,
    default: "",
  },
  // 字体大小
  fontSize: {
    type: [String, Number],
    default: "26rpx",
  },
  // 行高
  lineHeight: {
    type: [String, Number],
    default: "40rpx",
  },
  // 是否显示行号
  showLineNumber: {
    type: Boolean,
    default: true,
  },
  // 是否启用复制功能
  enableCopy: {
    type: Boolean,
    default: true,
  },
  // 是否启用全屏功能
  enableFullscreen: {
    type: Boolean,
    default: true,
  },
  // 是否自动换行
  wrapCode: {
    type: Boolean,
    default: false,
  },
  // 是否显示统计信息
  showStats: {
    type: Boolean,
    default: true,
  },
  // 主题
  theme: {
    type: String,
    default: "light",
  },
});

// 响应式数据
const showLineNumberRef = ref(props.showLineNumber);
const wrapCodeRef = ref(props.wrapCode);
const isFullscreen = ref(false);
const showCopyToast = ref(false);

// 计算属性
const codeLines = computed(() => {
  if (!props.sourceCode) return [];
  return props.sourceCode.split("\n");
});

const codeBlockStyle = computed(() => {
  return {
    fontSize:
      typeof props.fontSize === "number" ? `${props.fontSize}rpx` : props.fontSize,
    lineHeight:
      typeof props.lineHeight === "number" ? `${props.lineHeight}rpx` : props.lineHeight,
  };
});

const codeLineStyle = computed(() => {
  return {
    height:
      typeof props.lineHeight === "number" ? `${props.lineHeight}rpx` : props.lineHeight,
    whiteSpace: wrapCodeRef.value ? "pre-wrap" : "pre",
    wordBreak: wrapCodeRef.value ? "break-all" : "normal",
  };
});

// 简单的语法高亮（基础版本）
const highlightedCode = computed(() => {
  if (!props.language || !props.sourceCode) return codeLines.value;

  return codeLines.value.map((line) => {
    let highlighted = line;

    // JavaScript/TypeScript 语法高亮
    if (["javascript", "js", "typescript", "ts"].includes(props.language.toLowerCase())) {
      // 关键字
      highlighted = highlighted.replace(
        /\b(const|let|var|function|if|else|for|while|return|import|export|class|interface|type|async|await|try|catch|finally)\b/g,
        '<span style="color: #d73a49; font-weight: bold;">$1</span>'
      );
      // 字符串
      highlighted = highlighted.replace(
        /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g,
        '<span style="color: #032f62;">$1$2$1</span>'
      );
      // 注释
      highlighted = highlighted.replace(
        /\/\/.*$/g,
        '<span style="color: #6a737d; font-style: italic;">$&</span>'
      );
      highlighted = highlighted.replace(
        /\/\*[\s\S]*?\*\//g,
        '<span style="color: #6a737d; font-style: italic;">$&</span>'
      );
    }

    // HTML 语法高亮
    else if (["html", "xml"].includes(props.language.toLowerCase())) {
      // 标签
      highlighted = highlighted.replace(
        /<\/?[\w\s="/.':;#-\/]*>/g,
        '<span style="color: #22863a;">$&</span>'
      );
    }

    // CSS 语法高亮
    else if (["css", "scss", "sass"].includes(props.language.toLowerCase())) {
      // 属性
      highlighted = highlighted.replace(
        /[\w-]+(?=\s*:)/g,
        '<span style="color: #d73a49;">$&</span>'
      );
      // 值
      highlighted = highlighted.replace(
        /:\s*([^;]+)/g,
        ': <span style="color: #032f62;">$1</span>'
      );
    }

    return highlighted;
  });
});

// 方法
const toggleLineNumber = () => {
  showLineNumberRef.value = !showLineNumberRef.value;
};

const toggleWrap = () => {
  wrapCodeRef.value = !wrapCodeRef.value;
};

const copyCode = async () => {
  if (!props.enableCopy) return;

  try {
    // #ifdef H5
    await navigator.clipboard.writeText(props.sourceCode);
    // #endif

    // #ifndef H5
    uni.setClipboardData({
      data: props.sourceCode,
      success: () => {
        console.log("复制成功");
      },
    });
    // #endif

    showCopyToast.value = true;
    setTimeout(() => {
      showCopyToast.value = false;
    }, 2000);
  } catch (error) {
    console.error("复制失败:", error);
    uni.showToast({
      title: "复制失败",
      icon: "error",
    });
  }
};

const toggleFullscreen = () => {
  if (!props.enableFullscreen) return;
  isFullscreen.value = !isFullscreen.value;
};

// 暴露给父组件的方法
defineExpose({
  copyCode,
  toggleFullscreen,
  toggleLineNumber,
  toggleWrap,
});
</script>

<style lang="scss" scoped>
.zx-code-display {
  position: relative;
  background-color: #fff;
  border-radius: 12rpx;
  margin: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .code-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 32rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;

    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .code-title {
        font-size: 32rpx;
        font-weight: bold;
      }

      .language-tag {
        background-color: rgba(255, 255, 255, 0.2);
        padding: 8rpx 16rpx;
        border-radius: 20rpx;

        .language-text {
          font-size: 24rpx;
          font-weight: 500;
        }
      }
    }

    .toolbar-right {
      display: flex;
      gap: 16rpx;

      .tool-btn {
        display: flex;
        align-items: center;
        gap: 8rpx;
        padding: 12rpx 16rpx;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 8rpx;
        transition: background-color 0.3s;

        &:active {
          background-color: rgba(255, 255, 255, 0.25);
        }

        .icon {
          font-size: 24rpx;
        }

        .btn-text {
          font-size: 24rpx;
        }
      }
    }
  }

  .code-container {
    &.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      background-color: #fff;
      margin: 0;
      border-radius: 0;
    }

    .code-block {
      display: flex;
      background-color: #f8f9fa;
      max-height: 800rpx;
      overflow: auto;

      .line-numbers {
        background-color: #e9ecef;
        padding: 20rpx 16rpx 20rpx 24rpx;
        border-right: 2rpx solid #dee2e6;
        min-width: 80rpx;
        user-select: none;

        .line-number {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
          font-size: 24rpx;
          color: #6c757d;
          padding-right: 16rpx;
        }
      }

      .code-content-wrapper {
        flex: 1;
        padding: 20rpx;
        overflow: auto;

        &.with-line-numbers {
          padding-left: 24rpx;
        }

        .code-line {
          display: flex;
          align-items: center;

          .code-text {
            font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
            font-size: 26rpx;
            color: #495057;
            line-height: inherit;
          }
        }
      }
    }
  }

  .code-stats {
    display: flex;
    gap: 32rpx;
    padding: 20rpx 32rpx;
    background-color: #f1f3f4;
    border-top: 1rpx solid #e9ecef;

    .stats-item {
      font-size: 24rpx;
      color: #6c757d;
    }
  }

  .copy-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 24rpx 48rpx;
    border-radius: 8rpx;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s;

    &.show {
      opacity: 1;
    }

    .toast-text {
      font-size: 28rpx;
    }
  }
}

// 响应式设计
@media (max-width: 750rpx) {
  .zx-code-display {
    margin: 10rpx;

    .code-toolbar {
      padding: 16rpx 20rpx;
      flex-direction: column;
      gap: 16rpx;

      .toolbar-left,
      .toolbar-right {
        width: 100%;
        justify-content: center;
      }

      .toolbar-right {
        gap: 8rpx;

        .tool-btn {
          flex: 1;
          justify-content: center;

          .btn-text {
            display: none;
          }
        }
      }
    }

    .code-container .code-block {
      max-height: 600rpx;
    }
  }
}
</style>
