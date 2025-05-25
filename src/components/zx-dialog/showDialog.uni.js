import { ref } from 'vue';

// 创建全局状态
const dialogState = ref({
  visible: false,
  title: '提示',
  message: '',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  showCancelButton: true,
  closeOnClickModal: false,
  resolve: null,
  reject: null
});

// 创建一个Vue组件，并在页面根节点挂载
// 注意：需要在应用的App.vue中引入并使用该组件
export const DialogComponent = {
  setup() {
    // 确认处理
    const handleConfirm = () => {
      dialogState.value.visible = false;
      if (dialogState.value.resolve) {
        dialogState.value.resolve(true);
      }
    };
    
    // 取消处理
    const handleCancel = () => {
      dialogState.value.visible = false;
      if (dialogState.value.resolve) {
        dialogState.value.resolve(false);
      }
    };
    
    // 关闭处理
    const handleClose = () => {
      dialogState.value.visible = false;
      if (dialogState.value.resolve) {
        dialogState.value.resolve(false);
      }
    };
    
    return {
      dialogState,
      handleConfirm,
      handleCancel,
      handleClose
    };
  },
  template: `
    <zx-dialog 
      v-model="dialogState.visible"
      :title="dialogState.title"
      :close-on-click-modal="dialogState.closeOnClickModal"
      @close="handleClose"
      width="80%"
    >
      <view class="zx-dialog-message">{{ dialogState.message }}</view>
      <template #footer>
        <view class="dialog-footer">
          <zx-button 
            v-if="dialogState.showCancelButton"
            @click="handleCancel"
          >{{ dialogState.cancelButtonText }}</zx-button>
          <zx-button 
            type="primary" 
            @click="handleConfirm"
          >{{ dialogState.confirmButtonText }}</zx-button>
        </view>
      </template>
    </zx-dialog>
  `
};

/**
 * 显示对话框
 * @param {Object} options 配置选项
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
    
    // 更新状态
    dialogState.value = {
      ...dialogState.value,
      ...mergedOptions,
      visible: true,
      resolve,
      reject
    };
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
  showAlert,
  DialogComponent
}; 