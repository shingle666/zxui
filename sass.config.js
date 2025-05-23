module.exports = {
  // 使用现代Sass编译器API
  api: 'modern-compiler',
  
  // 静默弃用警告
  silenceDeprecations: ['legacy-js-api'],
  
  // 输出样式
  outputStyle: 'expanded',
  
  // 源映射
  sourceMap: true,
  
  // 包含路径
  includePaths: ['node_modules'],
  
  // 精度
  precision: 8,
  
  // 缩进类型
  indentType: 'space',
  
  // 缩进宽度
  indentWidth: 2
} 