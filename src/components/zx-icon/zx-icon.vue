<template>
  <view class="zx-icon">
    <image v-if="isImg" class="zx-icon-image" :src="name" :mode="mode" :style="imgStyle" @click="onClick" @error="onImageError"
      @load="onImageLoad"></image>
    <image v-else-if="isSvg && svgBase64" class="zx-icon-image" :src="svgBase64" :mode="mode" :style="imgStyle" @click="onClick"
      @error="onSvgError" @load="onSvgLoad"></image>
    <text v-else-if="isSvg && !svgBase64" class="zx-icon-error" :style="errorStyle" @click="onClick">SVG加载失败</text>
    <text v-else class="zx-icon-text" :style="iconStyle" :class="iconClass" @click="onClick"></text>
  </view>
</template>

<script setup>
/**
 * icon 图标
 * @description 可以同时使用字体图标、图片和SVG。支持SVG字符串和SVG文件路径。
 * @tutorial https://zxui.org/components/icon
 * @property {String}			name			图标名称、图片路径、SVG字符串或SVG文件路径
 * @property {String}			color			图标颜色
 * @property {String | Number}	size			图标字体大小
 * @property {Boolean}			bold			是否显示粗体
 * @property {String}			customPrefix	自定义扩展前缀
 * @property {String}			mode			图片的mode
 * @property {String | Number}	width			显示图片小图标时的宽度
 * @property {String | Number}	height			显示图片小图标时的高度
 * @property {String | Number}	top				图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途
 * @event {Function}            onClick         点击图标时触发
 * @event {Function}            onLoad          图片加载成功时触发
 * @event {Function}            onError         图片加载失败时触发
 * @event {Function}            onSvgLoad       SVG加载成功时触发
 * @event {Function}            onSvgError      SVG加载失败时触发
 * @method {Function}           getSvgBase64    获取SVG的base64编码
 * @method {Function}           getIconType     获取图标类型(font/image/svg)
 * @example
 * <!-- 字体图标 -->
 * <zx-icon name="eye"></zx-icon>
 * 
 * <!-- 图片图标 -->
 * <zx-icon name="/static/icon.png"></zx-icon>
 * 
 * <!-- SVG文件 -->
 * <zx-icon name="/static/icon.svg"></zx-icon>
 * 
 * <!-- SVG字符串 -->
 * <zx-icon name="<svg>...</svg>"></zx-icon>
 */
import { computed, ref, getCurrentInstance, watch, onMounted } from "vue";
// 静态导入CSS文件
import './zx-icon.css';
import './uni-icon.css';

const { proxy } = getCurrentInstance();

const props = defineProps({
  // 图标类名
  name: {
    type: String,
    default: "",
  },
  // 图标颜色，可接受主题色
  color: {
    type: String,
    default: "#b0b0b0",
  },
  // 字体大小
  size: {
    type: [String, Number],
    default: "34rpx",
  },
  // 是否显示粗体
  bold: {
    type: Boolean,
    default: false,
  },
  // 自定义扩展前缀，方便用户扩展自己的图标库
  customPrefix: {
    type: String,
    default: "zx-icon",
  },
  // 图片的mode
  mode: {
    type: String,
    default: "aspectFill",
  },
  // 用于显示图片小图标时，图片的宽度
  width: {
    type: String,
    default: "",
  },
  // 用于显示图片小图标时，图片的高度
  height: {
    type: String,
    default: "",
  },
  // 用于解决某些情况下，让图标垂直居中的用途
  top: {
    type: String,
    default: "",
  },
});

// svg base64
const svgBase64 = ref('');
const iconName = ref('');

// 图标样式
const iconStyle = computed(() => ({
  color: props.color,
  fontSize: props.size,
  fontWeight: props.bold ? "bold" : "normal",
  top: props.top,
}));

// 图标类名
const iconClass = computed(() => [
  props.customPrefix,
  `${props.customPrefix}-${props.name}`,
]);

// 判断传入的name属性是否为图片路径
const isImg = computed(() => {
  if (!props.name || typeof props.name !== 'string') return false;
  
  const name = props.name.trim();
  
  // 如果是SVG字符串内容，不认为是图片路径
  if (validateSvgContent(name)) return false;
  
  // 检查是否为图片文件扩展名
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico'];
  const hasImageExtension = imageExtensions.some(ext => 
    name.toLowerCase().endsWith(ext)
  );
  
  // 检查是否包含路径分隔符
  const hasPathSeparator = name.includes('/') || name.includes('\\');
  
  // 检查是否为网络地址
  const isUrl = /^(https?:|data:|blob:|\/\/)/i.test(name);
  
  // 检查是否为base64图片
  const isBase64Image = /^data:image\//i.test(name);
  
  // 满足以下任一条件认为是图片路径：
  // 1. 有图片扩展名且有路径分隔符
  // 2. 是网络地址
  // 3. 是base64图片
  // 4. 包含路径分隔符且不是纯文本（长度合理）
  return hasImageExtension && hasPathSeparator || 
         isUrl || 
         isBase64Image || 
         (hasPathSeparator && name.length < 200 && !name.includes('<'));
});

// SVG内容验证函数
const validateSvgContent = (content) => {
  if (!content || typeof content !== 'string') return false;

  // 检查是否包含SVG标签（支持大小写）
  const svgRegex = /<svg[^>]*>.*?<\/svg>/is;
  return svgRegex.test(content.trim());
};

// 字符串转base64（兼容多平台）
const stringToBase64 = (str) => {
  try {
    // 参数验证
    if (!str || typeof str !== 'string') {
      throw new Error('输入参数必须是非空字符串');
    }
    
    // #ifdef MP
    // 小程序环境优先使用uni.arrayBufferToBase64
    if (typeof uni !== 'undefined' && uni.arrayBufferToBase64) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      return uni.arrayBufferToBase64(data.buffer);
    }
    // #endif
    
    // H5和APP环境使用btoa
    if (typeof btoa !== 'undefined') {
      // 对于包含非ASCII字符的字符串，需要先进行UTF-8编码
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(str);
      
      // 将Uint8Array转换为二进制字符串
      let binaryString = '';
      const chunkSize = 8192; // 分块处理，避免栈溢出
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.slice(i, i + chunkSize);
        binaryString += String.fromCharCode.apply(null, chunk);
      }
      
      return btoa(binaryString);
    }
    
    // 备用方案：手动实现base64编码
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let result = '';
    
    for (let i = 0; i < bytes.length; i += 3) {
      const a = bytes[i];
      const b = bytes[i + 1] || 0;
      const c = bytes[i + 2] || 0;
      
      const bitmap = (a << 16) | (b << 8) | c;
      
      result += chars.charAt((bitmap >> 18) & 63);
      result += chars.charAt((bitmap >> 12) & 63);
      result += i + 1 < bytes.length ? chars.charAt((bitmap >> 6) & 63) : '=';
      result += i + 2 < bytes.length ? chars.charAt(bitmap & 63) : '=';
    }
    
    return result;
    
  } catch (error) {
    console.error('Base64编码失败:', error);
    return null;
  }
};

// 判断是否为SVG文件路径
const isSvgFile = computed(() => {
  if (!props.name || typeof props.name !== 'string') return false;
  return props.name.toLowerCase().endsWith('.svg') && props.name.indexOf('/') !== -1;
});

// 判断是否为SVG字符串内容
const isSvgContent = computed(() => {
  if (!props.name || typeof props.name !== 'string') return false;
  return validateSvgContent(props.name);
});

// 综合判断是否为SVG
const isSvg = computed(() => {
  const isSvgType = isSvgFile.value || isSvgContent.value;

  if (isSvgType) {
    if (isSvgContent.value) {
      // SVG字符串内容，转换为base64
      const base64String = stringToBase64(props.name);
      if (base64String) {
        svgBase64.value = `data:image/svg+xml;base64,${base64String}`;
        console.log('SVG字符串转换base64成功',svgBase64.value);
      } else {
        console.error('SVG字符串转换base64失败');
        svgBase64.value = '';
        return false;
      }
    } else if (isSvgFile.value) {
      // SVG文件路径，直接使用
      svgBase64.value = props.name;
      console.log('使用SVG文件路径:', props.name);
    }
  }

  return isSvgType;
});

// 图片样式
const imgStyle = computed(() => ({
  width: props.width || props.size,
  height: props.height || props.size,
}));

// 错误提示样式
const errorStyle = computed(() => ({
  color: '#ff4757',
  fontSize: '24rpx',
  width: props.width || props.size,
  height: props.height || props.size,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

// 点击事件处理
const onClick = (e) => {
  proxy.$emit("click", e);
};

// 图片加载成功事件
const onImageLoad = (e) => {
  console.log('图片加载成功:', props.name);
  proxy.$emit("load", e);
};

// 图片加载失败事件
const onImageError = (e) => {
  console.error('图片加载失败:', props.name, e);
  proxy.$emit("error", e);
};

// SVG加载成功事件
const onSvgLoad = (e) => {
  console.log('SVG加载成功');
  proxy.$emit("svgLoad", e);
};

// SVG加载失败事件
const onSvgError = (e) => {
  console.error('SVG加载失败:', e);
  proxy.$emit("svgError", e);
};

// 暴露一些有用的方法给父组件
const getSvgBase64 = () => svgBase64.value;
const getIconType = () => {
  if (isImg.value) return 'image';
  if (isSvg.value) return 'svg';
  return 'font';
};

// 使用defineExpose暴露方法
defineExpose({
  getSvgBase64,
  getIconType,
  isSvg: isSvg.value,
  isImg: isImg.value
});
</script>

<style lang="scss" scoped>
.zx-icon {
  display: inline-block;
  position: relative;

  // 确保图片和SVG正确显示
  .zx-icon-image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  // 错误提示样式
  .zx-icon-error {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20rpx;
    color: #ff4757;
    background-color: #fff5f5;
    border: 1px solid #fed7d7;
    border-radius: 4rpx;
    padding: 4rpx;
    box-sizing: border-box;
  }

  // 添加过渡效果
  .zx-icon-text,
  .zx-icon-image {
    transition: all 0.3s ease;
  }

  // 悬停效果（H5端）
  // #ifdef H5
  &:hover {

    .zx-icon-text,
    .zx-icon-image {
      transform: scale(1.1);
    }
  }

  // #endif
}
</style>
