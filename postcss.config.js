module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android >= 4.4',
        'iOS >= 9',
        'Chrome >= 80',
        'Safari >= 9',
        '> 1%',
        'last 2 versions'
      ]
    },
    // 针对uni-app的特殊处理
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true
      }
    }
  }
} 