<template>
	<view :style="containerStyle">
		<rich-text 
			ref="richTextRef"
			:nodes="processedNodes"
			:space="space"
			:selectable="selectable"
			:image-menu-prevent="imageMenuPrevent"
			:preview="preview"
			@itemclick="handleItemClick"
		></rich-text>
	</view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const richTextRef = ref(null);

const props = defineProps({
	// 内容 - 支持字符串和数组格式
	content: {
		type: [String, Array],
		default: ''
	},
	// rich-text 组件原生属性
	space: {
		type: String,
		default: '',
		validator: (value) => ['', 'ensp', 'emsp', 'nbsp'].includes(value)
	},
	selectable: {
		type: Boolean,
		default: true
	},
	imageMenuPrevent: {
		type: Boolean,
		default: false
	},
	preview: {
		type: Boolean,
		default: true
	},
	
	// 样式相关属性
	fontFamily: {
		type: String,
		default: 'PingFangSC-Regular'
	},
	fontSize: {
		type: String,
		default: '28rpx'
	},
	color: {
		type: String,
		default: '#333333'
	},
	lineHeight: {
		type: String,
		default: '1.6'
	},
	textAlign: {
		type: String,
		default: 'left',
		validator: (value) => ['left', 'center', 'right', 'justify'].includes(value)
	},
	textIndent: {
		type: [Boolean, String],
		default: false
	},
	
	// 图片处理相关
	imgMaxWidth: {
		type: String,
		default: '100%'
	},
	imgWidth: {
		type: String,
		default: 'auto'
	},
	imgBorderRadius: {
		type: String,
		default: '0'
	},
	
	// 内容处理选项
	autoProcess: {
		type: Boolean,
		default: true
	},
	httpToHttps: {
		type: Boolean,
		default: true
	},
	removeScript: {
		type: Boolean,
		default: true
	},
	removeStyle: {
		type: Boolean,
		default: false
	},
	
	// 外部图片代理
	externalImageProxy: {
		type: String,
		default: ''
	},
	
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	}
});

// 事件定义
const emits = defineEmits(['itemclick', 'ready', 'error']);

// 容器样式
const containerStyle = computed(() => {
	const baseStyle = {
		fontFamily: props.fontFamily,
		fontSize: props.fontSize,
		color: props.color,
		lineHeight: props.lineHeight,
		textAlign: props.textAlign,
		wordWrap: 'break-word',
		wordBreak: 'break-all'
	};
	
	// 处理首行缩进
	if (props.textIndent) {
		if (typeof props.textIndent === 'boolean') {
			baseStyle.textIndent = '2em';
		} else {
			baseStyle.textIndent = props.textIndent;
		}
	}
	
	// 合并自定义样式
	return { ...baseStyle, ...props.customStyle };
});

// HTML 内容处理函数
const processHtmlContent = (htmlString) => {
	if (!htmlString || typeof htmlString !== 'string') return '';
	
	let content = htmlString;
	
	if (props.autoProcess) {
		// 移除脚本标签（安全考虑）
		if (props.removeScript) {
			content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
		}
		
		// 移除style标签（如果需要）
		if (props.removeStyle) {
			content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
		}
		
		// HTTP 转 HTTPS
		if (props.httpToHttps) {
			content = content.replace(/http:/g, 'https:');
		}
		
		// 处理图片
		content = processImages(content);
		
		// 处理视频（rich-text 不支持video标签，转换为图片或移除）
		content = processVideo(content);
		
		// 移除不受信任的标签和属性
		content = sanitizeHtml(content);
	}
	
	return content;
};

// 图片处理
const processImages = (content) => {
	return content.replace(/<img([^>]*)>/gi, (match, attrs) => {
		// 提取现有属性
		const srcMatch = attrs.match(/src\s*=\s*["']([^"']*)["']/i);
		const altMatch = attrs.match(/alt\s*=\s*["']([^"']*)["']/i);
		const classMatch = attrs.match(/class\s*=\s*["']([^"']*)["']/i);
		
		if (!srcMatch) return match; // 没有src属性的图片忽略
		
		let src = srcMatch[1];
		const alt = altMatch ? altMatch[1] : '';
		const className = classMatch ? classMatch[1] : '';
		
		// 外部图片代理处理
		if (props.externalImageProxy) {
			// 检查是否为外部图片（简单判断）
			const isExternal = src.startsWith('http') && !src.includes('localhost') && !src.includes('127.0.0.1');
			if (isExternal) {
				src = props.externalImageProxy + encodeURIComponent(src);
			}
		}
		
		// 构建新的图片标签
		const imgStyle = `max-width:${props.imgMaxWidth};width:${props.imgWidth};height:auto;border-radius:${props.imgBorderRadius};`;
		
		return `<img src="${src}" alt="${alt}" class="${className}" style="${imgStyle}">`;
	});
};

// 视频处理（rich-text不支持video，转换处理）
const processVideo = (content) => {
	// rich-text 不支持 video 标签，这里可以转换为图片或移除
	return content.replace(/<video[^>]*>[\s\S]*?<\/video>/gi, 
		'<p style="color:#999;text-align:center;padding:20px;background:#f5f5f5;border-radius:4px;">视频内容无法在富文本中显示</p>'
	);
};

// HTML内容清理，移除不受信任的标签和属性
const sanitizeHtml = (content) => {
	// 受信任的标签列表（基于官方文档）
	const allowedTags = [
		'a', 'abbr', 'b', 'br',  'col', 'colgroup', 
		'dd', 'del', 'div', 'dl', 'dt', 'em', 'fieldset', 'h1', 'h2', 'h3', 
		'h4', 'h5', 'h6', 'hr', 'i',  'ins', 'label', 'legend', 'li', 
		'ol', 'p', 'q', 'span', 'strong', 'sub', 'sup', 'table', 'tbody', 
		'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
	];
	
	// 移除id属性（rich-text不支持）
	content = content.replace(/\s+id\s*=\s*["'][^"']*["']/gi, '');
	
	// 这里可以添加更复杂的HTML清理逻辑
	// 为了简化，暂时保持基本的处理
	
	return content;
};

// 将字符串转换为nodes数组（性能优化）
const convertToNodes = (htmlString) => {
	// 这里应该实现HTML字符串到nodes数组的转换
	// 由于uni-app推荐使用数组格式以提高性能
	// 简化处理，直接返回字符串给rich-text组件内部转换
	return htmlString;
};

// 处理后的内容
const processedNodes = computed(() => {
	if (!props.content) return [];
	
	// 如果传入的是数组，直接使用
	if (Array.isArray(props.content)) {
		return props.content;
	}
	
	// 如果是字符串，处理后返回
	const processedHtml = processHtmlContent(props.content);
	return processedHtml;
});

// 事件处理
const handleItemClick = (e) => {
	emits('itemclick', e);
	
	// 处理链接点击
	if (e.detail && e.detail.node) {
		const node = e.detail.node;
		if (node.name === 'a' && node.attrs && node.attrs.href) {
			// 可以在这里处理链接跳转逻辑
			console.log('链接点击:', node.attrs.href);
		} else if (node.name === 'img' && node.attrs && node.attrs.src) {
			// 处理图片点击
			console.log('图片点击:', node.attrs.src);
		}
	}
};

// 组件就绪
const handleReady = () => {
	emits('ready');
};

// 错误处理
const handleError = (error) => {
	console.error('zx-richtext error:', error);
	emits('error', error);
};

// 暴露的方法
defineExpose({
	// 获取rich-text组件实例
	getRichTextRef: () => richTextRef.value,
	// 刷新内容
	refresh: () => {
		// 强制重新计算processedNodes
		if (richTextRef.value) {
			// rich-text组件没有refresh方法，这里只是触发重新渲染
			console.log('刷新富文本内容');
		}
	},
	// 获取处理后的内容
	getProcessedContent: () => processedNodes.value
});

// 组件挂载完成
onMounted(() => {
	handleReady();
});
</script>

<style scoped>
/* 富文本容器样式 */
.rich-text-container {
	word-wrap: break-word;
	word-break: break-all;
}
</style>
