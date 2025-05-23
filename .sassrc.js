module.exports = {
  // 使用现代Sass编译器
  api: 'modern-compiler',
  
  // 静默特定的弃用警告
  silenceDeprecations: ['legacy-js-api'],
  
  // 启用现代特性
  modernCompiler: true,
  
  // 优化输出
  sourceMap: process.env.NODE_ENV === 'development',
  
  // 压缩输出（生产环境）
  outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded'
} 