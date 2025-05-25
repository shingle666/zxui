import { createApp, h, ref, watch } from 'vue';
import ZxDialog from './zx-dialog.vue';

/**
 * 显示提示对话框
 * @param {Object} options 配置选项
 * @param {String} options.title 标题
 * @param {String} options.message 消息内容
 * @param {String} options.confirmButtonText 确认按钮文本
 * @param {String} options.cancelButtonText 取消按钮文本
 * @param {Boolean} options.showCancelButton 是否显示取消按钮
 * @param {Boolean} options.closeOnClickModal 点击遮罩是否关闭
 * @param {Function} options.onConfirm 确认回调
 * @param {Function} options.onCancel 取消回调
 * @returns {Promise} 返回Promise
 */
export function showDialog(options = {}) {
  return new Promise((resolve, reject) => {
    // 默认配置
    const defaultOptions = {
      title: '提示',
      message: '',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      closeOnClickModal: false
    };
    
    // 合并配置
    const mergedOptions = { ...defaultOptions, ...options };
    
    // 创建容器
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    // 状态
    const visible = ref(false);
    
    // 创建应用
    const app = createApp({
      setup() {
        // 显示对话框
        visible.value = true;
        
        // 监听对话框关闭
        watch(visible, (val) => {
          if (!val) {
            setTimeout(() => {
              // 销毁应用
              app.unmount();
              container.parentNode.removeChild(container);
            }, 300);
          }
        });
        
        // 确认处理
        const handleConfirm = () => {
          visible.value = false;
          if (typeof mergedOptions.onConfirm === 'function') {
            mergedOptions.onConfirm();
          }
          resolve(true);
        };
        
        // 取消处理
        const handleCancel = () => {
          visible.value = false;
          if (typeof mergedOptions.onCancel === 'function') {
            mergedOptions.onCancel();
          }
          resolve(false);
        };
        
        // 渲染
        return () => h(ZxDialog, {
          modelValue: visible.value,
          'onUpdate:modelValue': (val) => visible.value = val,
          title: mergedOptions.title,
          closeOnClickModal: mergedOptions.closeOnClickModal,
        }, {
          default: () => h('div', { class: 'zx-dialog-message' }, mergedOptions.message),
          footer: () => h('div', { class: 'dialog-footer' }, [
            mergedOptions.showCancelButton && h('button', {
              class: 'zx-button',
              onClick: handleCancel
            }, mergedOptions.cancelButtonText),
            h('button', {
              class: 'zx-button zx-button--primary',
              onClick: handleConfirm
            }, mergedOptions.confirmButtonText)
          ])
        });
      }
    });
    
    // 挂载应用
    app.mount(container);
  });
}

/**
 * 显示确认对话框
 * @param {String|Object} message 消息或配置
 * @param {String} title 标题
 * @param {Object} options 其他配置
 * @returns {Promise}
 */
export function showConfirm(message, title = '确认', options = {}) {
  if (typeof message === 'object') {
    return showDialog(message);
  }
  return showDialog({
    title,
    message,
    showCancelButton: true,
    ...options
  });
}

/**
 * 显示提示对话框（只有确认按钮）
 * @param {String|Object} message 消息或配置
 * @param {String} title 标题
 * @param {Object} options 其他配置
 * @returns {Promise}
 */
export function showAlert(message, title = '提示', options = {}) {
  if (typeof message === 'object') {
    return showDialog({ ...message, showCancelButton: false });
  }
  return showDialog({
    title,
    message,
    showCancelButton: false,
    ...options
  });
}

// 导出方法
export default {
  showDialog,
  showConfirm,
  showAlert
}; 