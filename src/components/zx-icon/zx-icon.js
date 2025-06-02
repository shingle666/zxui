// zx-icon.js - 动态加载CSS样式的JS模块
// 将原zx-icon.css转换为JS模块以支持动态导入

// 创建并注入CSS样式
function injectCSS() {
  // 检查是否已经注入过样式
  if (document.getElementById('zx-icon-styles')) {
    return;
  }

  // 创建style元素
  const style = document.createElement('style');
  style.id = 'zx-icon-styles';
  style.type = 'text/css';
  
  // 从原CSS文件读取样式内容并注入
  // 这里需要将原zx-icon.css的内容复制过来
  const cssContent = `
    /* zx-icon 样式内容将在这里 */
    /* 由于原CSS文件过大，需要手动复制内容 */
    @font-face {
      font-family: 'zx-icon';
      /* 字体定义 */
    }
    
    .zx-icon {
      /* 基础图标样式 */
      font-family: 'zx-icon';
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