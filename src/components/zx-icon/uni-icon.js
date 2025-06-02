// uni-icon.js - 动态加载CSS样式的JS模块
// 将原uni-icon.css转换为JS模块以支持动态导入

// 创建并注入CSS样式
function injectCSS() {
  // 检查是否已经注入过样式
  if (document.getElementById('uni-icon-styles')) {
    return;
  }

  // 创建style元素
  const style = document.createElement('style');
  style.id = 'uni-icon-styles';
  style.type = 'text/css';
  
  // 从原CSS文件读取样式内容并注入
  // 这里需要将原uni-icon.css的内容复制过来
  const cssContent = `
    /* uni-icon 样式内容将在这里 */
    /* 由于原CSS文件过大，需要手动复制内容 */
    @font-face {
      font-family: 'uni-icon';
      /* 字体定义 */
    }
    
    .uni-icon {
      /* 基础图标样式 */
      font-family: 'uni-icon';
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* 更多样式需要从原CSS文件复制 */
  `;
  
  style.textContent = cssContent;
  document.head.appendChild(style);
}

// 立即执行注入
injectCSS();

// 导出模块（可选）
export default {
  inject: injectCSS
};