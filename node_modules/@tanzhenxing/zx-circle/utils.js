export const props = {
  modelValue: Number, // vue 3 v-model
  currentRate: {
    type: Number,
    default: 0,
  },
  rate: {
    type: [Number, String],
    default: 100,
  },
  size: {
    type: [Number, String],
    default: 100, // 默认100rpx
  },
  color: {
    type: [String, Object],
    default: '#007aff', // 对应设计稿中的默认进度条颜色
  },
  layerColor: {
    type: String,
    default: '#ebedf0', // 对应设计稿中的轨道颜色
  },
  fill: {
    type: String,
    default: 'none',
  },
  speed: {
    type: [Number, String],
    default: 0, // 0 表示无动画
  },
  text: String,
  strokeWidth: {
    type: [Number, String],
    default: 40, // SVG中的stroke-width，非px, 恢复Vant原始默认值
  },
  strokeLinecap: {
    type: String,
    default: 'round', // 'square', 'butt'
  },
  clockwise: {
    type: Boolean,
    default: true,
  },
  startPosition: {
    type: String,
    default: 'top', // 'left', 'right', 'bottom'
  },
};

export function bem(name = 'zx-circle') {
  return (el, mods) => {
    let result = `${name}${el ? `__${el}` : ''}`;
    if (mods) {
      if (typeof mods === 'string') {
        result += ` ${name}${el ? `__${el}` : ''}--${mods}`;
      }
      if (Array.isArray(mods)) {
        mods.forEach(mod => {
          result += ` ${name}${el ? `__${el}` : ''}--${mod}`;
        });
      }
      if (typeof mods === 'object') {
        Object.keys(mods).forEach(key => {
          if (mods[key]) {
            result += ` ${name}${el ? `__${el}` : ''}--${key}`;
          }
        });
      }
    }
    return result;
  };
}