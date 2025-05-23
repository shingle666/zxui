<template>
<view class="zx-editor">
	<view class="zx-border-b">
		<textarea 
		class="zx-editor-title" 
		maxlength="-1" 
		v-model="article.title" 
		placeholder="# 请输入标题" 
		auto-height />
	</view>
	
	<!-- 编辑器工具栏 -->
	<view class="zx-editor-toolbar" v-if="useEditor">
		<view class="zx-flex zx-row zx-align-items-center zx-space-around zx-border-box zx-border-t">
			<view class="zx-editor-toolbar-item" @tap="format('bold')">
				<text class="zx-editor-icons zx-icons">&#xe640;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="format('italic')">
				<text class="zx-editor-icons zx-icons">&#xe646;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="format('underline')">
				<text class="zx-editor-icons zx-icons">&#xe64f;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="format('header', 1)">
				<text class="zx-editor-icons zx-icons">&#xe64d;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="format('list', 'bullet')">
				<text class="zx-editor-icons zx-icons">&#xe61b;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="format('list', 'ordered')">
				<text class="zx-editor-icons zx-icons">&#xe62a;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="format('align', 'center')">
				<text class="zx-editor-icons zx-icons">&#xe621;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="insertImage">
				<text class="zx-editor-icons zx-icons">&#xe63d;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="removeFormat">
				<text class="zx-editor-icons zx-icons">&#xe639;</text>
			</view>
			<view class="zx-editor-toolbar-item" @tap="toggleMode">
				<text class="zx-editor-icons zx-icons">&#xe603;</text>
			</view>
		</view>
	</view>
	
	<!-- 官方富文本编辑器 -->
	<view class="zx-editor-container" v-if="useEditor">
		<editor 
			id="editor" 
			class="zx-editor-content" 
			show-img-size 
			show-img-toolbar 
			show-img-resize 
			@ready="onEditorReady" 
			@input="onEditorInput"
			:placeholder="'请输入正文内容...'"
		></editor>
	</view>
	
	<!-- 空内容提示 -->
	<view 
	v-if="article.contents.length < 1 && !useEditor">
		<text 
		class="zx-color-gray zx-editor-empty">请点击下面的按钮，添加内容。</text>
	</view>
	
	<!-- 传统编辑模式内容区域 -->
	<view 
	v-if="!useEditor"
	v-for="(item, index) in article.contents" 
	:key="index" 
	class="zx-editor-items">
		<!-- 加粗 -->
		<view 
		class="zx-bg-gray zx-dark-bg-level-2" 
		v-if="item.type == 'h3'">
			<textarea 
			class="zx-editor-strong zx-border-box" 
			:data-index="index" 
			maxlength="-1" 
			:focus="item.focusin" 
			@input="graceEditorInput" 
			:value="item.content" 
			@blur="blur" 
			placeholder="请输入标题" />
		</view>
		<!-- 普通文本 -->
		<view 
		class="zx-bg-gray zx-dark-bg-level-2" 
		v-else-if="item.type == 'txt'">
			<textarea 
			class="zx-editor-txt zx-border-box" 
			maxlength="-1" 
			@blur="blur" 
			:data-index="index" 
			:focus="item.focusin" 
			@input="graceEditorInput" 
			:value="item.content" 
			placeholder="请填写文本内容" />
		</view>
		<!-- 居中文本 -->
		<view 
		v-else-if="item.type == 'center'" 
		class="zx-flex zx-rows zx-justify-content-center zx-bg-gray zx-dark-bg-level-2" 
		style="padding:20rpx;">
			<input 
			type="text" 
			class="zx-editor-center" 
			@blur="blur" 
			maxlength="-1" 
			:data-index="index" 
			:focus="item.focusin" 
			@input="graceEditorInput" 
			:value="item.content" 
			placeholder="请填写居中文本" />
		</view>
		<!-- 图片 -->
		<view 
		v-else-if="item.type == 'img'" 
		class="zx-editor-img-wrap">
			<image 
			:src="item.content" 
			class="zx-editor-img" 
			:data-index="index" 
			mode="aspectFit"></image>
			<view 
			v-if="item.error" 
			class="zx-editor-img-error zx-flex zx-columns zx-justify-content-center">
				<text 
				class="zx-editor-img-error-text zx-block zx-text-center zx-icons">&#xe6a1; 上传失败，请重试</text>
			</view>
		</view>
		<!-- 引用 -->
		<view 
		class="zx-bg-gray zx-dark-bg-level-2" 
		v-else-if="item.type == 'quote'">
			<textarea 
			class="zx-editor-quote zx-border-box" 
			maxlength="-1" @blur="blur" 
			:data-index="index" 
			@input="graceEditorInput" 
			:focus="item.focusin" 
			:value="item.content" 
			placeholder="请输入引用内容" />
		</view>
		<!-- 代码 -->
		<view 
		class="zx-bg-gray zx-dark-bg-level-2" 
		v-else-if="item.type == 'code'">
			<textarea 
			class="zx-editor-quote zx-border-box" 
			maxlength="-1" 
			@blur="blur" 
			style="height:300rpx;"
			:data-index="index" 
			@input="graceEditorInput" 
			:focus="item.focusin" 
			:value="item.content" 
			placeholder="请输入代码" />
		</view>
		<!-- 加粗 -->
		<view 
		class="zx-bg-gray zx-dark-bg-level-2" 
		v-else-if="item.type == 'strong'">
			<textarea 
			class="zx-editor-strong zx-border-box" 
			:data-index="index" 
			maxlength="-1" 
			:focus="item.focusin" 
			@input="graceEditorInput" 
			:value="item.content" 
			@blur="blur" 
			placeholder="请输入加粗内容" />
		</view>
		<!-- 链接 -->
		<view 
		class="zx-bg-gray zx-dark-bg-level-2" 
		v-else-if="item.type == 'link'">
			<input 
			type="text" 
			class="zx-editor-link zx-border-box" 
			:focus="item.focusin" 
			:data-index="index" 
			@input="graceEditorInput" 
			@blur="blur" 
			:value="item.content" 
			placeholder="请输入连接地址" />
		</view>
		<!-- 分割 -->
		<view 
		v-else-if="item.type == 'spline'">
			<text 
			class="zx-editor-spline zx-block" 
			:data-index="index">● ● ●</text>
		</view>
		<!-- 功能 -->
		<view class="zx-flex zx-row zx-justify-content-end zx-editor-item-btns-wrap">
			<view 
			class="zx-editor-item-btns" 
			hover-class="zx-tap" 
			:data-index="index" 
			@tap="moveup">
				<text 
				class="zx-editor-item-btns-text zx-block zx-icons">&#xe654; 上移</text>
			</view>
			<view 
			class="zx-editor-item-btns" 
			hover-class="zx-tap" 
			:data-index="index" 
			@tap="movedown">
				<text 
				class="zx-editor-item-btns-text zx-block zx-icons">&#xe603; 下移</text>
			</view>
			<view 
			class="zx-editor-item-btns" 
			@tap="deleteItem" 
			hover-class="zx-tap" 
			:data-index="index">
				<text 
				class="zx-editor-item-btns-text zx-block zx-icons">&#xe636; 删除</text>
			</view>
		</view>
	</view>
	<view class="zx-margin-top-large" 
	v-if="article.contents.length >= 1 && !useEditor"></view>
	
	<!-- 选项类型选择 -->
	<view v-if="!useEditor">
		<view
		class="zx-flex zx-row zx-align-items-center zx-space-between zx-editor-menus zx-border-box zx-border-t">
			<text 
			class="zx-editor-icons zx-icons" 
			data-type="h3"
			@tap="graceEditorAddItem" 
			style="font-size:46rpx;">&#xe64d;</text>
			<text 
			class="zx-editor-icons zx-icons" 
			data-type="txt" 
			@tap="graceEditorAddItem" 
			style="font-size:32rpx;">&#xe9e4;</text>
			<text 
			class="zx-editor-icons zx-icons" 
			data-type="center" 
			@tap="graceEditorAddItem">&#xe621;</text>
			<text 
			class="zx-editor-icons zx-icons" 
			data-type="img" 
			@tap="graceEditorAddItem">&#xe63d;</text>
			<text 
			class="zx-editor-icons zx-icons" 
			data-type="quote" 
			@tap="graceEditorAddItem">&#xe620;</text>
			<text 
			class="zx-editor-icons zx-icons" 
			data-type="code"
			@tap="graceEditorAddItem" 
			style="font-size:40rpx;">&#xe64e;</text>
			<text 
			class="zx-editor-icons zx-icons" 
			data-type="strong" 
			style="font-size:32rpx;" 
			@tap="graceEditorAddItem">&#xe640;</text>
			<text 
			class="zx-editor-icons zx-icons zx-bold" 
			data-type="link" 
			@tap="graceEditorAddItem" 
			style="font-size:38rpx;">&#xe61e;</text>
			<text 
			class="zx-editor-icons zx-icons zx-bold" 
			data-type="spline" 
			@tap="graceEditorAddItem">&#xe61b;</text>
		</view>
		<view>
			<zx-safe-bottom></zx-safe-bottom>
		</view>
	</view>
	
	<!-- 切换编辑模式按钮 -->
	<view class="zx-editor-switch" v-if="!useEditor">
		<button class="zx-editor-switch-btn" @tap="toggleMode">切换到富文本编辑器</button>
	</view>
</view>
</template>

<script setup>
import { reactive, ref, defineExpose, onMounted, nextTick } from 'vue';

// 响应式状态
const article = reactive({ 
    title: '', 
    contents: [] 
});

// 是否使用官方editor组件
const useEditor = ref(false);

// 编辑器实例
let editorCtx = null;

// 格式信息
const formats = reactive({});

// 初始化编辑器
const onEditorReady = () => {
    uni.createSelectorQuery().select('#editor').context((res) => {
        editorCtx = res.context;
        // 如果有内容需要转换导入到editor
        if (article.contents.length > 0) {
            importToEditor();
        }
    }).exec();
};

// 监听编辑器输入
const onEditorInput = (e) => {
    // 可以处理编辑器内容变化
    console.log('编辑器内容变化:', e.detail);
};

// 格式化文本
const format = (name, value) => {
    if (!editorCtx) return;
    editorCtx.format(name, value);
};

// 插入图片
const insertImage = () => {
    uni.chooseImage({
        count: 1,
        success: (res) => {
            if (!editorCtx) return;
            editorCtx.insertImage({
                src: res.tempFilePaths[0],
                alt: '图片',
                success: () => {
                    console.log('插入图片成功');
                }
            });
        }
    });
};

// 清除格式
const removeFormat = () => {
    if (!editorCtx) return;
    editorCtx.removeFormat();
};

// 将传统编辑器内容导入到富文本编辑器
const importToEditor = () => {
    if (!editorCtx) return;
    
    // 清空当前内容
    editorCtx.clear();
    
    // 延迟执行确保编辑器已准备好
    setTimeout(() => {
        // 构建HTML内容
        let html = '';
        article.contents.forEach(item => {
            switch(item.type) {
                case 'h3':
                    html += `<h3>${item.content}</h3>`;
                    break;
                case 'txt':
                    html += `<p>${item.content}</p>`;
                    break;
                case 'center':
                    html += `<p style="text-align:center">${item.content}</p>`;
                    break;
                case 'img':
                    html += `<img src="${item.content}" style="max-width:100%;" />`;
                    break;
                case 'quote':
                    html += `<blockquote>${item.content}</blockquote>`;
                    break;
                case 'code':
                    html += `<pre><code>${item.content}</code></pre>`;
                    break;
                case 'strong':
                    html += `<p><strong>${item.content}</strong></p>`;
                    break;
                case 'link':
                    html += `<a href="${item.content}">${item.content}</a>`;
                    break;
                case 'spline':
                    html += `<p style="text-align:center">● ● ●</p>`;
                    break;
            }
        });
        
        // 设置编辑器内容
        editorCtx.setContents({
            html: html,
            success: () => {
                console.log('内容导入成功');
            }
        });
    }, 300);
};

// 从富文本编辑器导出内容到传统模式
const exportFromEditor = () => {
    if (!editorCtx) return;
    
    editorCtx.getContents({
        success: (res) => {
            // 清空现有内容
            article.contents = [];
            
            // 解析HTML内容
            const html = res.html;
            // 这里需要一个简单的HTML解析逻辑
            // 为简化示例，我们添加一个文本节点
            article.contents.push({
                type: 'txt',
                content: '从富文本编辑器导入的内容',
                focusin: false
            });
            
            console.log('内容导出成功');
        }
    });
};

// 切换编辑模式
const toggleMode = () => {
    if (useEditor.value) {
        // 从富文本模式切换到传统模式
        exportFromEditor();
    }
    
    // 切换模式
    useEditor.value = !useEditor.value;
    
    // 如果切换到富文本模式，等待DOM渲染后初始化编辑器
    if (useEditor.value) {
        nextTick(() => {
            // 在下一个渲染周期尝试初始化编辑器
            setTimeout(() => {
                if (!editorCtx) {
                    onEditorReady();
                } else {
                    importToEditor();
                }
            }, 300);
        });
    }
};

// 添加编辑器项目
const graceEditorAddItem = (e) => {
    const type = e.currentTarget.dataset.type;
    if(type == 'img'){
        uni.chooseImage({
            success: (e) => {
                const imgs = e.tempFilePaths;
                for(let i = 0; i < imgs.length; i++){
                    article.contents.push({type: type, content: imgs[i], focusin: false});
                }
            }
        });
    } else if(type == 'spline'){
        article.contents.push({type: type, content: '', focusin: false});
    } else {
        article.contents.push({type: type, content: '', focusin: true});
    }
};

// 编辑器输入处理
const graceEditorInput = (e) => {
    const index = e.currentTarget.dataset.index;
    const val = e.detail.value;
    article.contents[index].content = val;
};

// 删除项目
const deleteItem = (e) => {
    const index = e.currentTarget.dataset.index;
    uni.showModal({
        title: "提示",
        content: "确定要删除项目吗?",
        success: (e) => {
            if(e.confirm){
                article.contents.splice(index, 1);
            }
        }
    });
};

// 失去焦点
const blur = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    article.contents[index].focusin = false;
    article.contents.splice(index, 1, article.contents[index]);
};

// 上移项目
const moveup = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    if(index > 0){
        article.contents[index] = article.contents.splice(index - 1, 1, article.contents[index])[0];
    }
};

// 下移项目
const movedown = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    if(index < article.contents.length - 1){
        article.contents[index] = article.contents.splice(index + 1, 1, article.contents[index])[0];
    }
};

// 获取编辑器数据
const getData = () => {
    if (useEditor.value && editorCtx) {
        return new Promise((resolve) => {
            editorCtx.getContents({
                success: (res) => {
                    resolve({
                        title: article.title,
                        html: res.html,
                        text: res.text,
                        delta: res.delta
                    });
                },
                fail: () => {
                    resolve({
                        title: article.title,
                        contents: article.contents
                    });
                }
            });
        });
    }
    return {
        title: article.title,
        contents: article.contents
    };
};

// 设置上传错误
const setError = (index) => {
    if (!useEditor.value) {
        article.contents[index].error = true;
        article.contents.splice(index, 1, article.contents[index]);
    }
};

// 设置默认内容
const setDefault = (defaultArticle) => {
    Object.assign(article, defaultArticle);
    
    // 如果当前是富文本模式，需要导入内容
    if (useEditor.value && editorCtx) {
        importToEditor();
    }
};

// 暴露方法给父组件
defineExpose({
    getData,
    setError,
    setDefault,
    getEditorCtx: () => editorCtx
});
</script>

<style scoped>
.zx-editor{padding:10rpx 25rpx; border-radius:6rpx;}
.zx-editor-title{padding:25rpx 0; width:690rpx; font-size:32rpx; line-height:50rpx;}
.zx-editor-empty{line-height:120rpx; font-size:26rpx;}
.zx-editor-icons{width:80rpx; height:80rpx; color:#898989; line-height:88rpx; text-align:center; font-size:34rpx; margin:5rpx 0;}
.zx-editor-items{margin-top:20rpx;}
.zx-editor-item-btns-wrap{padding:20rpx 5rpx;}
.zx-editor-item-btns{width:100rpx; border-radius:30rpx; margin-left:20rpx; background-color:#898989;}
.zx-editor-item-btns-text{text-align:center; font-size:20rpx; line-height:38rpx; border-radius:30rpx; color:#FFFFFF;}
/* #ifndef APP-NVUE */
.zx-editor-icons{display:block;}
/* #endif */
.zx-editor-txt{width:650rpx; font-size:26rpx; line-height:35rpx; padding:20rpx; height:150rpx;}
.zx-editor-center{width:500rpx; text-align:center; font-size:28rpx; height:60rpx; line-height:60rpx;}
.zx-editor-img-wrap{width:650rpx; height:320rpx; overflow:hidden; position:relative; font-size:0;}
.zx-editor-img{width:650rpx; height:320rpx;}
.zx-editor-quote{width:650rpx; font-size:26rpx; line-height:35rpx; padding:20rpx; height:100rpx;}
.zx-editor-strong{width:650rpx; font-size:26rpx; line-height:35rpx; padding:20rpx; height:100rpx; font-weight:bold;}
.zx-editor-link{width:650rpx; font-size:26rpx; line-height:35rpx; padding:20rpx; height:100rpx; color:#008AFF;}
.zx-editor-spline{width:650rpx; line-height:60rpx; text-align:center; color:#8788A3; font-size:28rpx; opacity:0.6;}

.zx-editor-img-error{position:absolute; width:650rpx; height:320rpx; left:0; top:0; background-color:rgba(0,0,0,0.8);}
.zx-editor-img-error-text{font-size:28rpx; color:#FFFFFF;}

/* 富文本编辑器样式 */
.zx-editor-container {
  padding: 20rpx 0;
  width: 100%;
}
.zx-editor-content {
  width: 100%;
  height: 600rpx;
  border: 1rpx solid #ccc;
  border-radius: 10rpx;
  padding: 20rpx;
  box-sizing: border-box;
}
.zx-editor-toolbar {
  border-bottom: 1rpx solid #ccc;
  padding: 10rpx 0;
}
.zx-editor-toolbar-item {
  padding: 0 10rpx;
}
.zx-editor-switch {
  margin-top: 30rpx;
  padding: 10rpx 0;
}
.zx-editor-switch-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
  background-color: #f1f1f1;
  color: #333;
}
</style>