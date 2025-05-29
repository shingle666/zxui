<template>
    <view class="zx-editor">
        <view class="zx-border-b">
            <textarea class="zx-editor-title" maxlength="-1" v-model="article.title" placeholder="# 请输入标题"
                auto-height />
        </view>

        <!-- 编辑器工具栏 -->
        <view class="zx-editor-toolbar" v-if="useEditor">
            <!-- 第一行工具栏 -->
            <view class="zx-flex zx-row zx-align-items-center zx-space-around zx-border-box zx-border-t">
                <view class="zx-editor-toolbar-item" @tap="format('bold')" :class="{ 'active': formats.bold }">
                    <zx-icon name="bold" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="format('italic')" :class="{ 'active': formats.italic }">
                    <zx-icon name="italic" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="format('underline')" :class="{ 'active': formats.underline }">
                    <zx-icon name="underline" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="format('strike')" :class="{ 'active': formats.strike }">
                    <zx-icon name="strikethrough" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="showHeaderMenu">
                    <zx-icon name="title" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="showAlignMenu">
                    <zx-icon name="align-center" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="format('list', 'bullet')"
                    :class="{ 'active': formats.list === 'bullet' }">
                    <zx-icon name="list" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="format('list', 'ordered')"
                    :class="{ 'active': formats.list === 'ordered' }">
                    <zx-icon name="ordered-list" color="inherit" size="34" />
                </view>
            </view>

            <!-- 第二行工具栏 -->
            <view class="zx-flex zx-row zx-align-items-center zx-space-around zx-border-box zx-border-t">
                <view class="zx-editor-toolbar-item" @tap="insertImage">
                    <zx-icon name="image" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="insertDivider">
                    <zx-icon name="minus" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="insertLink">
                    <zx-icon name="link" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="removeFormat">
                    <zx-icon name="format-clear" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="undo" :class="{ 'disabled': !canUndo }">
                    <zx-icon name="undo" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="redo" :class="{ 'disabled': !canRedo }">
                    <zx-icon name="redo" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="getSelectionText">
                    <zx-icon name="select" color="inherit" size="34" />
                </view>
                <view class="zx-editor-toolbar-item" @tap="toggleMode">
                    <zx-icon name="swap" color="inherit" size="34" />
                </view>
            </view>

            <!-- 标题菜单 -->
            <view class="zx-editor-submenu" v-if="showHeaderSubmenu">
                <view class="zx-flex zx-row zx-align-items-center zx-space-around">
                    <view class="zx-editor-toolbar-item" @tap="format('header', 'H1')">
                        <text class="zx-editor-submenu-text">H1</text>
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('header', 'H2')">
                        <text class="zx-editor-submenu-text">H2</text>
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('header', 'H3')">
                        <text class="zx-editor-submenu-text">H3</text>
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('header', 'H4')">
                        <text class="zx-editor-submenu-text">H4</text>
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('header', 'H5')">
                        <text class="zx-editor-submenu-text">H5</text>
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('header', 'H6')">
                        <text class="zx-editor-submenu-text">H6</text>
                    </view>
                </view>
            </view>

            <!-- 对齐菜单 -->
            <view class="zx-editor-submenu" v-if="showAlignSubmenu">
                <view class="zx-flex zx-row zx-align-items-center zx-space-around">
                    <view class="zx-editor-toolbar-item" @tap="format('align', 'left')">
                        <zx-icon name="align-left" color="inherit" size="34" />
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('align', 'center')">
                        <zx-icon name="align-center" color="inherit" size="34" />
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('align', 'right')">
                        <zx-icon name="align-right" color="inherit" size="34" />
                    </view>
                    <view class="zx-editor-toolbar-item" @tap="format('align', 'justify')">
                        <zx-icon name="align-justify" color="inherit" size="34" />
                    </view>
                </view>
            </view>
        </view>

        <!-- 官方富文本编辑器 -->
        <view class="zx-editor-container" v-if="useEditor">
            <editor id="editor" class="zx-editor-content" show-img-size show-img-toolbar show-img-resize
                @ready="onEditorReady" @input="onEditorInput" @statuschange="onStatusChange" @focus="onEditorFocus"
                @blur="onEditorBlur" :placeholder="'请输入正文内容...'"></editor>
        </view>

        <!-- 空内容提示 -->
        <view v-if="article.contents.length < 1 && !useEditor">
            <text class="zx-color-gray zx-editor-empty">请点击下面的按钮，添加内容。</text>
        </view>

        <!-- 传统编辑模式内容区域 -->
        <view v-if="!useEditor">
            <view v-for="(item, index) in article.contents" :key="index" class="zx-editor-items">
                <!-- 加粗 -->
                <view class="zx-bg-gray zx-dark-bg-level-2" v-if="item.type == 'h3'">
                    <textarea class="zx-editor-strong zx-border-box" :data-index="index" maxlength="-1"
                        :focus="item.focusin" @input="graceEditorInput" :value="item.content" @blur="blur"
                        placeholder="请输入标题" />
                </view>
                <!-- 普通文本 -->
                <view class="zx-bg-gray zx-dark-bg-level-2" v-else-if="item.type == 'txt'">
                    <textarea class="zx-editor-txt zx-border-box" maxlength="-1" @blur="blur" :data-index="index"
                        :focus="item.focusin" @input="graceEditorInput" :value="item.content" placeholder="请填写文本内容" />
                </view>
                <!-- 居中文本 -->
                <view v-else-if="item.type == 'center'"
                    class="zx-flex zx-rows zx-justify-content-center zx-bg-gray zx-dark-bg-level-2"
                    style="padding:20rpx;">
                    <input type="text" class="zx-editor-center" @blur="blur" maxlength="-1" :data-index="index"
                        :focus="item.focusin" @input="graceEditorInput" :value="item.content" placeholder="请填写居中文本" />
                </view>
                <!-- 图片 -->
                <view v-else-if="item.type == 'img'" class="zx-editor-img-wrap">
                    <image :src="item.content" class="zx-editor-img" :data-index="index" mode="aspectFit"></image>
                    <view v-if="item.error" class="zx-editor-img-error zx-flex zx-columns zx-justify-content-center">
                        <text class="zx-editor-img-error-text zx-block zx-text-center">
                            <zx-icon name="warning" color="#FFFFFF" size="28" /> 上传失败，请重试
                        </text>
                    </view>
                </view>
                <!-- 引用 -->
                <view class="zx-bg-gray zx-dark-bg-level-2" v-else-if="item.type == 'quote'">
                    <textarea class="zx-editor-quote zx-border-box" maxlength="-1" @blur="blur" :data-index="index"
                        @input="graceEditorInput" :focus="item.focusin" :value="item.content" placeholder="请输入引用内容" />
                </view>
                <!-- 代码 -->
                <view class="zx-bg-gray zx-dark-bg-level-2" v-else-if="item.type == 'code'">
                    <textarea class="zx-editor-quote zx-border-box" maxlength="-1" @blur="blur" style="height:300rpx;"
                        :data-index="index" @input="graceEditorInput" :focus="item.focusin" :value="item.content"
                        placeholder="请输入代码" />
                </view>
                <!-- 加粗 -->
                <view class="zx-bg-gray zx-dark-bg-level-2" v-else-if="item.type == 'strong'">
                    <textarea class="zx-editor-strong zx-border-box" :data-index="index" maxlength="-1"
                        :focus="item.focusin" @input="graceEditorInput" :value="item.content" @blur="blur"
                        placeholder="请输入加粗内容" />
                </view>
                <!-- 链接 -->
                <view class="zx-bg-gray zx-dark-bg-level-2" v-else-if="item.type == 'link'">
                    <input type="text" class="zx-editor-link zx-border-box" :focus="item.focusin" :data-index="index"
                        @input="graceEditorInput" @blur="blur" :value="item.content" placeholder="请输入连接地址" />
                </view>
                <!-- 分割 -->
                <view v-else-if="item.type == 'spline'">
                    <text class="zx-editor-spline zx-block" :data-index="index">● ● ●</text>
                </view>
                <!-- 功能 -->
                <view class="zx-flex zx-row zx-justify-content-end zx-editor-item-btns-wrap">
                    <view class="zx-editor-item-btns" hover-class="zx-tap" :data-index="index" @tap="moveup">
                        <text class="zx-editor-item-btns-text zx-block">
                            <zx-icon name="arrow-up" color="#FFFFFF" size="20" /> 上移
                        </text>
                    </view>
                    <view class="zx-editor-item-btns" hover-class="zx-tap" :data-index="index" @tap="movedown">
                        <text class="zx-editor-item-btns-text zx-block">
                            <zx-icon name="arrow-down" color="#FFFFFF" size="20" /> 下移
                        </text>
                    </view>
                    <view class="zx-editor-item-btns" @tap="deleteItem" hover-class="zx-tap" :data-index="index">
                        <text class="zx-editor-item-btns-text zx-block">
                            <zx-icon name="delete" color="#FFFFFF" size="20" /> 删除
                        </text>
                    </view>
                </view>
            </view>
        </view>
        <view class="zx-margin-top-large" v-if="article.contents.length >= 1 && !useEditor"></view>

        <!-- 选项类型选择 -->
        <view v-if="!useEditor">
            <view
                class="zx-flex zx-row zx-align-items-center zx-space-between zx-editor-menus zx-border-box zx-border-t">
                <zx-icon name="title" color="#898989" size="46" data-type="h3" @tap="graceEditorAddItem" />
                <zx-icon name="text" color="#898989" size="32" data-type="txt" @tap="graceEditorAddItem" />
                <zx-icon name="align-center" color="#898989" size="34" data-type="center" @tap="graceEditorAddItem" />
                <zx-icon name="image" color="#898989" size="34" data-type="img" @tap="graceEditorAddItem" />
                <zx-icon name="quote" color="#898989" size="34" data-type="quote" @tap="graceEditorAddItem" />
                <zx-icon name="code" color="#898989" size="40" data-type="code" @tap="graceEditorAddItem" />
                <zx-icon name="bold" color="#898989" size="32" data-type="strong" @tap="graceEditorAddItem" />
                <zx-icon name="link" color="#898989" size="38" data-type="link" @tap="graceEditorAddItem" />
                <zx-icon name="list" color="#898989" size="34" data-type="spline" @tap="graceEditorAddItem" />
            </view>
            <view>
                <zx-safe-bottom></zx-safe-bottom>
            </view>
        </view>

        <!-- 切换编辑模式按钮 -->
        <view class="zx-editor-switch" v-if="!useEditor">
            <button class="zx-editor-switch-btn" @tap="toggleMode">切换到富文本编辑器</button>
        </view>

        <!-- 链接插入弹窗 -->
        <uni-popup ref="linkPopup" type="dialog">
            <uni-popup-dialog type="input" placeholder="请输入链接地址" title="插入链接" v-model="linkUrl"
                @confirm="confirmInsertLink" @close="closeLinkDialog">
            </uni-popup-dialog>
        </uni-popup>

        <!-- 状态栏 -->
        <view class="zx-editor-status" v-if="useEditor && showStatus">
            <text class="zx-editor-status-text">字数：{{ wordCount }}</text>
            <text class="zx-editor-status-text" v-if="selectedText">选中：{{ selectedText.length }}字</text>
        </view>
    </view>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick, watch } from 'vue';

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

// 撤销重做状态
const canUndo = ref(false);
const canRedo = ref(false);

// 菜单显示状态
const showHeaderSubmenu = ref(false);
const showAlignSubmenu = ref(false);

// 链接相关
const linkUrl = ref('');

// 状态相关
const showStatus = ref(true);
const wordCount = ref(0);
const selectedText = ref('');

// 编辑器聚焦状态
const isEditorFocused = ref(false);

// Props定义
const props = defineProps({
    // 是否显示状态栏
    showStatusBar: {
        type: Boolean,
        default: true
    },
    // 初始使用富文本模式
    defaultUseEditor: {
        type: Boolean,
        default: false
    },
    // 最大字符数
    maxLength: {
        type: Number,
        default: -1
    },
    // 自定义工具栏
    customToolbar: {
        type: Array,
        default: () => []
    }
});

// 监听props变化
watch(() => props.showStatusBar, (val) => {
    showStatus.value = val;
});

watch(() => props.defaultUseEditor, (val) => {
    if (val !== useEditor.value) {
        useEditor.value = val;
    }
});

// 初始化
onMounted(() => {
    useEditor.value = props.defaultUseEditor;
    showStatus.value = props.showStatusBar;
});

// 初始化编辑器
const onEditorReady = () => {
    uni.createSelectorQuery().select('#editor').context((res) => {
        editorCtx = res.context;
        console.log('编辑器初始化成功');

        // 如果有内容需要转换导入到editor
        if (article.contents.length > 0) {
            importToEditor();
        }
    }).exec();
};

// 监听编辑器输入
const onEditorInput = (e) => {
    console.log('编辑器内容变化:', e.detail);
    // 更新字数统计
    if (e.detail.text) {
        wordCount.value = e.detail.text.length;
    }
};

// 监听编辑器状态变化
const onStatusChange = (e) => {
    console.log('编辑器状态变化:', e.detail);
    // 更新格式状态
    Object.assign(formats, e.detail);
};

// 编辑器聚焦
const onEditorFocus = () => {
    isEditorFocused.value = true;
    console.log('编辑器聚焦');
};

// 编辑器失焦
const onEditorBlur = () => {
    isEditorFocused.value = false;
    hideAllSubmenus();
    console.log('编辑器失焦');
};

// 隐藏所有子菜单
const hideAllSubmenus = () => {
    showHeaderSubmenu.value = false;
    showAlignSubmenu.value = false;
};

// 格式化文本
const format = (name, value) => {
    if (!editorCtx) return;
    hideAllSubmenus();

    try {
        editorCtx.format(name, value);
        console.log(`应用格式: ${name} = ${value}`);
    } catch (error) {
        console.error('格式化失败:', error);
        uni.showToast({
            title: '格式化失败',
            icon: 'none'
        });
    }
};

// 显示标题菜单
const showHeaderMenu = () => {
    showAlignSubmenu.value = false;
    showHeaderSubmenu.value = !showHeaderSubmenu.value;
};

// 显示对齐菜单
const showAlignMenu = () => {
    showHeaderSubmenu.value = false;
    showAlignSubmenu.value = !showAlignSubmenu.value;
};

// 插入图片
const insertImage = () => {
    hideAllSubmenus();

    uni.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            if (!editorCtx) return;

            const tempFilePaths = res.tempFilePaths;
            tempFilePaths.forEach((path, index) => {
                setTimeout(() => {
                    editorCtx.insertImage({
                        src: path,
                        alt: `图片${index + 1}`,
                        width: '100%',
                        height: 'auto',
                        success: () => {
                            console.log(`插入图片成功: ${path}`);
                        },
                        fail: (error) => {
                            console.error('插入图片失败:', error);
                            uni.showToast({
                                title: '插入图片失败',
                                icon: 'none'
                            });
                        }
                    });
                }, index * 100); // 避免同时插入多张图片造成问题
            });
        },
        fail: (error) => {
            console.error('选择图片失败:', error);
            uni.showToast({
                title: '选择图片失败',
                icon: 'none'
            });
        }
    });
};

// 插入分割线
const insertDivider = () => {
    if (!editorCtx) return;
    hideAllSubmenus();

    try {
        editorCtx.insertDivider({
            success: () => {
                console.log('插入分割线成功');
            },
            fail: (error) => {
                console.error('插入分割线失败:', error);
                uni.showToast({
                    title: '插入分割线失败',
                    icon: 'none'
                });
            }
        });
    } catch (error) {
        console.error('插入分割线失败:', error);
    }
};

// 插入链接
const insertLink = () => {
    hideAllSubmenus();

    // 先获取选中的文本
    getSelectionText().then(text => {
        if (text && text.trim()) {
            // 如果有选中文本，直接提示输入链接
            uni.showModal({
                title: '插入链接',
                editable: true,
                placeholderText: '请输入链接地址',
                success: (res) => {
                    if (res.confirm && res.content) {
                        insertTextWithLink(text, res.content);
                    }
                }
            });
        } else {
            // 如果没有选中文本，提示输入链接文字和地址
            uni.showModal({
                title: '插入链接',
                content: '请先选中要添加链接的文字，或在传统模式下添加链接',
                showCancel: false
            });
        }
    });
};

// 插入带链接的文本
const insertTextWithLink = (text, url) => {
    if (!editorCtx) return;

    try {
        // 由于uni-app的editor组件API限制，我们使用HTML方式插入链接
        const linkHtml = `<a href="${url}" target="_blank">${text}</a>`;
        editorCtx.insertText({
            text: linkHtml
        });
    } catch (error) {
        console.error('插入链接失败:', error);
        uni.showToast({
            title: '插入链接失败',
            icon: 'none'
        });
    }
};

// 清除格式
const removeFormat = () => {
    if (!editorCtx) return;
    hideAllSubmenus();

    try {
        editorCtx.removeFormat({
            success: () => {
                console.log('清除格式成功');
                uni.showToast({
                    title: '已清除格式',
                    icon: 'success'
                });
            },
            fail: (error) => {
                console.error('清除格式失败:', error);
                uni.showToast({
                    title: '清除格式失败',
                    icon: 'none'
                });
            }
        });
    } catch (error) {
        console.error('清除格式失败:', error);
    }
};

// 撤销
const undo = () => {
    if (!editorCtx || !canUndo.value) return;
    hideAllSubmenus();

    try {
        editorCtx.undo({
            success: () => {
                console.log('撤销成功');
            },
            fail: (error) => {
                console.error('撤销失败:', error);
            }
        });
    } catch (error) {
        console.error('撤销失败:', error);
    }
};

// 重做
const redo = () => {
    if (!editorCtx || !canRedo.value) return;
    hideAllSubmenus();

    try {
        editorCtx.redo({
            success: () => {
                console.log('重做成功');
            },
            fail: (error) => {
                console.error('重做失败:', error);
            }
        });
    } catch (error) {
        console.error('重做失败:', error);
    }
};

// 获取选中文本
const getSelectionText = () => {
    return new Promise((resolve) => {
        if (!editorCtx) {
            resolve('');
            return;
        }

        try {
            editorCtx.getSelectionText({
                success: (res) => {
                    selectedText.value = res.text || '';
                    resolve(res.text || '');
                },
                fail: (error) => {
                    console.error('获取选中文本失败:', error);
                    resolve('');
                }
            });
        } catch (error) {
            console.error('获取选中文本失败:', error);
            resolve('');
        }
    });
};

// 编辑器失焦
const blurEditor = () => {
    if (!editorCtx) return;

    try {
        editorCtx.blur({
            success: () => {
                console.log('编辑器失焦成功');
            }
        });
    } catch (error) {
        console.error('编辑器失焦失败:', error);
    }
};

// 将传统编辑器内容导入到富文本编辑器
const importToEditor = () => {
    if (!editorCtx) return;

    // 清空当前内容
    editorCtx.clear();

    // 延迟执行确保编辑器已准备好
    setTimeout(() => {
        try {
            // 构建HTML内容
            let html = '';
            article.contents.forEach(item => {
                switch (item.type) {
                    case 'h3':
                        html += `<h3>${item.content || ''}</h3>`;
                        break;
                    case 'txt':
                        html += `<p>${item.content || ''}</p>`;
                        break;
                    case 'center':
                        html += `<p style="text-align:center">${item.content || ''}</p>`;
                        break;
                    case 'img':
                        html += `<img src="${item.content}" style="max-width:100%; height:auto;" />`;
                        break;
                    case 'quote':
                        html += `<p style="border-left: 4px solid #ddd; padding-left: 16px; margin: 16px 0; color: #666;">${item.content || ''}</p>`;
                        break;
                    case 'code':
                        html += `<pre style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; overflow-x: auto;"><code>${item.content || ''}</code></pre>`;
                        break;
                    case 'strong':
                        html += `<p><strong>${item.content || ''}</strong></p>`;
                        break;
                    case 'link':
                        html += `<p><a href="${item.content}" target="_blank">${item.content}</a></p>`;
                        break;
                    case 'spline':
                        html += `<hr style="border: none; border-top: 1px dashed #ddd; margin: 20px 0;" />`;
                        break;
                }
            });

            // 设置编辑器内容
            editorCtx.setContents({
                html: html,
                success: () => {
                    console.log('内容导入成功');
                    // 更新字数统计
                    setTimeout(() => {
                        updateWordCount();
                    }, 500);
                },
                fail: (error) => {
                    console.error('内容导入失败:', error);
                    uni.showToast({
                        title: '内容导入失败',
                        icon: 'none'
                    });
                }
            });
        } catch (error) {
            console.error('导入内容时发生错误:', error);
        }
    }, 300);
};

// 从富文本编辑器导出内容到传统模式
const exportFromEditor = () => {
    return new Promise((resolve) => {
        if (!editorCtx) {
            resolve();
            return;
        }

        try {
            editorCtx.getContents({
                success: (res) => {
                    console.log('导出内容:', res);

                    // 清空现有内容
                    article.contents = [];

                    // 简单的HTML解析，将富文本内容转换为传统模式
                    if (res.html) {
                        parseHtmlToContents(res.html);
                    }

                    console.log('内容导出成功');
                    resolve();
                },
                fail: (error) => {
                    console.error('内容导出失败:', error);
                    resolve();
                }
            });
        } catch (error) {
            console.error('导出内容时发生错误:', error);
            resolve();
        }
    });
};

// 简单的HTML解析函数
const parseHtmlToContents = (html) => {
    // 这是一个简化的HTML解析，实际项目中可能需要更复杂的解析
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const children = tempDiv.children;
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        const tagName = element.tagName.toLowerCase();
        const textContent = element.textContent || '';

        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
            article.contents.push({
                type: 'h3',
                content: textContent,
                focusin: false
            });
        } else if (tagName === 'p') {
            const style = element.getAttribute('style') || '';
            if (style.includes('text-align:center') || style.includes('text-align: center')) {
                article.contents.push({
                    type: 'center',
                    content: textContent,
                    focusin: false
                });
            } else {
                article.contents.push({
                    type: 'txt',
                    content: textContent,
                    focusin: false
                });
            }
        } else if (tagName === 'blockquote') {
            article.contents.push({
                type: 'quote',
                content: textContent,
                focusin: false
            });
        } else if (tagName === 'pre') {
            article.contents.push({
                type: 'code',
                content: textContent,
                focusin: false
            });
        } else if (tagName === 'img') {
            const src = element.getAttribute('src');
            if (src) {
                article.contents.push({
                    type: 'img',
                    content: src,
                    focusin: false
                });
            }
        } else if (tagName === 'hr') {
            article.contents.push({
                type: 'spline',
                content: '',
                focusin: false
            });
        }
    }
};

// 更新字数统计
const updateWordCount = () => {
    if (!editorCtx) return;

    try {
        editorCtx.getContents({
            success: (res) => {
                if (res.text) {
                    wordCount.value = res.text.length;
                }
            }
        });
    } catch (error) {
        console.error('更新字数统计失败:', error);
    }
};

// 切换编辑模式
const toggleMode = async () => {
    hideAllSubmenus();

    if (useEditor.value) {
        // 从富文本模式切换到传统模式
        await exportFromEditor();
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

    uni.showToast({
        title: useEditor.value ? '已切换到富文本模式' : '已切换到传统模式',
        icon: 'success'
    });
};

// 添加编辑器项目
const graceEditorAddItem = (e) => {
    const type = e.currentTarget.dataset.type;
    if (type == 'img') {
        uni.chooseImage({
            count: 9,
            success: (e) => {
                const imgs = e.tempFilePaths;
                for (let i = 0; i < imgs.length; i++) {
                    article.contents.push({ type: type, content: imgs[i], focusin: false });
                }
            }
        });
    } else if (type == 'spline') {
        article.contents.push({ type: type, content: '', focusin: false });
    } else {
        article.contents.push({ type: type, content: '', focusin: true });
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
            if (e.confirm) {
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
    if (index > 0) {
        article.contents[index] = article.contents.splice(index - 1, 1, article.contents[index])[0];
    }
};

// 下移项目
const movedown = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    if (index < article.contents.length - 1) {
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
                        delta: res.delta,
                        wordCount: wordCount.value,
                        mode: 'editor'
                    });
                },
                fail: () => {
                    resolve({
                        title: article.title,
                        contents: article.contents,
                        mode: 'traditional'
                    });
                }
            });
        });
    }
    return {
        title: article.title,
        contents: article.contents,
        mode: 'traditional'
    };
};

// 设置编辑器数据
const setData = (data) => {
    if (data.title !== undefined) {
        article.title = data.title;
    }

    if (data.contents) {
        article.contents = data.contents;
    }

    if (data.html && useEditor.value && editorCtx) {
        editorCtx.setContents({
            html: data.html,
            success: () => {
                console.log('设置内容成功');
                updateWordCount();
            }
        });
    }

    if (data.mode === 'editor' && !useEditor.value) {
        toggleMode();
    } else if (data.mode === 'traditional' && useEditor.value) {
        toggleMode();
    }
};

// 清空编辑器
const clear = () => {
    article.title = '';
    article.contents = [];
    wordCount.value = 0;
    selectedText.value = '';

    if (useEditor.value && editorCtx) {
        editorCtx.clear({
            success: () => {
                console.log('清空编辑器成功');
            }
        });
    }
};

// 设置上传错误
const setError = (index) => {
    if (!useEditor.value && article.contents[index]) {
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

// 验证内容
const validate = () => {
    if (!article.title.trim()) {
        uni.showToast({
            title: '请输入标题',
            icon: 'none'
        });
        return false;
    }

    if (useEditor.value) {
        if (wordCount.value === 0) {
            uni.showToast({
                title: '请输入内容',
                icon: 'none'
            });
            return false;
        }
    } else {
        if (article.contents.length === 0) {
            uni.showToast({
                title: '请添加内容',
                icon: 'none'
            });
            return false;
        }
    }

    if (props.maxLength > 0 && wordCount.value > props.maxLength) {
        uni.showToast({
            title: `内容超出限制（${props.maxLength}字）`,
            icon: 'none'
        });
        return false;
    }

    return true;
};

// 确认插入链接
const confirmInsertLink = (value) => {
    linkUrl.value = value;
    if (value && selectedText.value) {
        insertTextWithLink(selectedText.value, value);
    }
};

// 关闭链接对话框
const closeLinkDialog = () => {
    linkUrl.value = '';
};

// 暴露方法给父组件
defineExpose({
    getData,
    setData,
    setError,
    setDefault,
    getEditorCtx: () => editorCtx,
    clear,
    validate,
    toggleMode,
    blurEditor,
    getSelectionText,
    updateWordCount
});
</script>

<style scoped>
.zx-editor {
    padding: 10rpx 25rpx;
    border-radius: 6rpx;
}

.zx-editor-title {
    padding: 25rpx 0;
    width: 690rpx;
    font-size: 32rpx;
    line-height: 50rpx;
}

.zx-editor-empty {
    line-height: 120rpx;
    font-size: 26rpx;
}

.zx-editor-items {
    margin-top: 20rpx;
}

.zx-editor-item-btns-wrap {
    padding: 20rpx 5rpx;
}

.zx-editor-item-btns {
    width: 100rpx;
    border-radius: 30rpx;
    margin-left: 20rpx;
    background-color: #898989;
}

.zx-editor-item-btns-text {
    text-align: center;
    font-size: 20rpx;
    line-height: 38rpx;
    border-radius: 30rpx;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

.zx-editor-txt {
    width: 650rpx;
    font-size: 26rpx;
    line-height: 35rpx;
    padding: 20rpx;
    height: 150rpx;
}

.zx-editor-center {
    width: 500rpx;
    text-align: center;
    font-size: 28rpx;
    height: 60rpx;
    line-height: 60rpx;
}

.zx-editor-img-wrap {
    width: 650rpx;
    height: 320rpx;
    overflow: hidden;
    position: relative;
    font-size: 0;
}

.zx-editor-img {
    width: 650rpx;
    height: 320rpx;
}

.zx-editor-quote {
    width: 650rpx;
    font-size: 26rpx;
    line-height: 35rpx;
    padding: 20rpx;
    height: 100rpx;
}

.zx-editor-strong {
    width: 650rpx;
    font-size: 26rpx;
    line-height: 35rpx;
    padding: 20rpx;
    height: 100rpx;
    font-weight: bold;
}

.zx-editor-link {
    width: 650rpx;
    font-size: 26rpx;
    line-height: 35rpx;
    padding: 20rpx;
    height: 100rpx;
    color: #008AFF;
}

.zx-editor-spline {
    width: 650rpx;
    line-height: 60rpx;
    text-align: center;
    color: #8788A3;
    font-size: 28rpx;
    opacity: 0.6;
}

.zx-editor-img-error {
    position: absolute;
    width: 650rpx;
    height: 320rpx;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
}

.zx-editor-img-error-text {
    font-size: 28rpx;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
}

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
    background-color: #fff;
}

.zx-editor-toolbar {
    border-bottom: 1rpx solid #ccc;
    padding: 10rpx 0;
    background-color: #f8f8f8;
}

.zx-editor-toolbar-item {
    padding: 10rpx;
    transition: all 0.3s ease;
    border-radius: 6rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
}

.zx-editor-toolbar-item.active {
    background-color: #007aff;
}

.zx-editor-toolbar-item.active :deep(.zx-icon) {
    color: #ffffff !important;
}

.zx-editor-toolbar-item.disabled {
    opacity: 0.4;
    pointer-events: none;
}

.zx-editor-toolbar-item :deep(.zx-icon) {
    color: #898989;
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
    border: none;
    border-radius: 8rpx;
}

/* 子菜单样式 */
.zx-editor-submenu {
    background-color: #ffffff;
    border-top: 1rpx solid #eee;
    padding: 10rpx 0;
}

.zx-editor-submenu-text {
    font-size: 24rpx;
    color: #333;
    font-weight: bold;
}

/* 底部菜单样式 */
.zx-editor-menus {
    padding: 20rpx;
}

.zx-editor-menus :deep(.zx-icon) {
    margin: 5rpx;
    transition: all 0.3s ease;
}

.zx-editor-menus :deep(.zx-icon):active {
    transform: scale(1.1);
}

/* 状态栏样式 */
.zx-editor-status {
    margin-top: 20rpx;
    padding: 10rpx 20rpx;
    background-color: #f5f5f5;
    border-radius: 6rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.zx-editor-status-text {
    font-size: 24rpx;
    color: #666;
}

/* 响应式设计 */
@media screen and (max-width: 750rpx) {
    .zx-editor-toolbar-item {
        width: 50rpx;
        height: 50rpx;
        padding: 8rpx;
    }

    .zx-editor-content {
        height: 500rpx;
    }
}

/* 暗黑模式支持 */
@media (prefers-color-scheme: dark) {
    .zx-editor-toolbar {
        background-color: #2c2c2c;
    }

    .zx-editor-content {
        background-color: #1e1e1e;
        border-color: #444;
        color: #fff;
    }

    .zx-editor-status {
        background-color: #2c2c2c;
    }

    .zx-editor-status-text {
        color: #ccc;
    }

    .zx-editor-toolbar-item :deep(.zx-icon) {
        color: #ccc;
    }

    .zx-editor-toolbar-item.active :deep(.zx-icon) {
        color: #ffffff !important;
    }
}
</style>