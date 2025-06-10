/**
 * ZXUI 组件库工具函数
 * 为 zx-index-bar 和其他组件提供通用工具函数
 */

/**
 * 创建BEM规范的命名空间
 * @param {String} name 组件名称
 * @returns {Array} [prefixedName, bem] 返回组件名和BEM函数
 */
export function createNamespace(name) {
    const prefixedName = `zx-${name}`;
    const bem = (modifier, subModifier) => {
      if (modifier && typeof modifier === 'string') {
        const base = `${prefixedName}__${modifier}`;
        if (subModifier && typeof subModifier === 'string') {
          return `${base}_${subModifier}`;
        }
        return base;
      }
      if (modifier && typeof modifier === 'object') {
        // bem('block', { mod1: true, mod2: false }) => 'zx-block zx-block--mod1'
        let result = prefixedName;
        for (const key in modifier) {
          if (Object.prototype.hasOwnProperty.call(modifier, key) && modifier[key]) {
            result += ` ${prefixedName}--${key}`;
          }
        }
        return result;
      }
      return prefixedName;
    };
    return [prefixedName, bem];
  }
  
  /**
   * 判断值是否已定义（不为 null 和 undefined）
   * @param {*} val 待判断的值
   * @returns {Boolean} 是否已定义
   */
  export function isDef(val) {
    return val !== undefined && val !== null;
  }
  
  /**
   * 获取滚动容器的滚动距离
   * @param {Element} element 滚动容器元素
   * @returns {Number} 滚动距离
   */
  export function getScrollTop(element) {
    const top = 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
    return Math.max(top, 0);
  }
  
  /**
   * 获取根容器的滚动距离
   * @returns {Number} 根容器滚动距离
   */
  export function getRootScrollTop() {
    // #ifdef H5
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // #endif
    
    // #ifdef MP || APP-PLUS
    return 0;
    // #endif
  }
  
  /**
   * 设置根容器的滚动距离
   * @param {Number} value 滚动距离
   */
  export function setRootScrollTop(value) {
    // #ifdef H5
    if (document.documentElement.scrollTop) {
      document.documentElement.scrollTop = value;
    } else {
      document.body.scrollTop = value;
    }
    // #endif
  }
  
  /**
   * 阻止默认事件
   * @param {Event} event 事件对象
   * @param {Boolean} isStopPropagation 是否阻止冒泡
   */
  export function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
      event.preventDefault();
    }
    if (isStopPropagation) {
      event.stopPropagation();
    }
  }
  
  /**
   * 真值属性定义
   */
  export const truthProp = {
    type: Boolean,
    default: true
  };
  
  /**
   * 数值属性定义
   */
  export const numericProp = {
    type: [Number, String]
  };
  
  /**
   * 创建数字属性
   * @param {Number} defaultVal 默认值
   * @returns {Object} 属性定义对象
   */
  export function makeNumberProp(defaultVal) {
    return {
      type: Number,
      default: defaultVal
    };
  }
  
  /**
   * 创建数值属性（支持字符串数字）
   * @param {Number|String} defaultVal 默认值
   * @returns {Object} 属性定义对象
   */
  export function makeNumericProp(defaultVal) {
    return {
      type: [Number, String],
      default: defaultVal
    };
  }
  
  /**
   * 创建字符串属性
   * @param {String} defaultVal 默认值
   * @returns {Object} 属性定义对象
   */
  export function makeStringProp(defaultVal) {
    return {
      type: String,
      default: defaultVal
    };
  }
  
  /**
   * 创建数组属性
   * @param {Array} defaultVal 默认值
   * @returns {Object} 属性定义对象
   */
  export function makeArrayProp(defaultVal = []) {
    return {
      type: Array,
      default: () => defaultVal
    };
  }
  
  /**
   * 获取元素的边界矩形信息
   * @param {Element} element DOM元素
   * @returns {Promise<Object>} 边界矩形信息
   */
  export function useRect(element) {
    return new Promise((resolve) => {
      // #ifdef H5
      if (element && element.getBoundingClientRect) {
        const rect = element.getBoundingClientRect();
        resolve({
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        });
      } else {
        resolve({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 });
      }
      // #endif
      
      // #ifdef MP || APP-PLUS
      if (element && element.$el) {
        uni.createSelectorQuery().select(element.$el).boundingClientRect((rect) => {
          resolve(rect || { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 });
        }).exec();
      } else {
        resolve({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 });
      }
      // #endif
    });
  }
  
  /**
   * 获取滚动父容器
   * @param {Element} element 子元素
   * @returns {Element} 滚动父容器
   */
  export function useScrollParent(element) {
    // #ifdef H5
    let parent = element?.parentElement;
    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;
      if (overflowY === 'scroll' || overflowY === 'auto') {
        return parent;
      }
      parent = parent.parentElement;
    }
    return window;
    // #endif
    
    // #ifdef MP || APP-PLUS
    return null;
    // #endif
  }
  
  /**
   * 触摸事件处理 Hook
   * @returns {Object} 触摸事件处理对象
   */
  export function useTouch() {
    const startX = ref(0);
    const startY = ref(0);
    const deltaX = ref(0);
    const deltaY = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const direction = ref('');
    
    const isVertical = () => direction.value === 'vertical';
    const isHorizontal = () => direction.value === 'horizontal';
    
    const reset = () => {
      deltaX.value = 0;
      deltaY.value = 0;
      offsetX.value = 0;
      offsetY.value = 0;
      direction.value = '';
    };
    
    const start = (event) => {
      reset();
      startX.value = event.touches[0].clientX;
      startY.value = event.touches[0].clientY;
    };
    
    const move = (event) => {
      const touch = event.touches[0];
      deltaX.value = touch.clientX - startX.value;
      deltaY.value = touch.clientY - startY.value;
      offsetX.value = Math.abs(deltaX.value);
      offsetY.value = Math.abs(deltaY.value);
      
      if (!direction.value) {
        direction.value = offsetX.value > offsetY.value ? 'horizontal' : 'vertical';
      }
    };
    
    return {
      startX,
      startY,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      direction,
      isVertical,
      isHorizontal,
      reset,
      start,
      move
    };
  }
  
  /**
   * INDEX_BAR_KEY - 用于 provide/inject 的键
   */
  export const INDEX_BAR_KEY = Symbol('zx-index-bar');
  
  /**
   * 为数字或字符串添加单位，默认'px'
   * @param {String | Number} value 需要添加单位的值
   * @param {String} unit 单位，默认'px'
   * @returns {String} 添加单位后的值
   */
  export function addUnit(value, unit = 'px') {
    if (value == null) {
      return undefined;
    }
    return /^-?\d+(\.\d+)?$/.test(String(value)) ? `${value}${unit}` : String(value);
  }
  
  // 导出默认对象
  export default {
    createNamespace,
    isDef,
    getScrollTop,
    getRootScrollTop,
    setRootScrollTop,
    preventDefault,
    truthProp,
    numericProp,
    makeNumberProp,
    makeNumericProp,
    makeStringProp,
    makeArrayProp,
    useRect,
    useScrollParent,
    useTouch,
    INDEX_BAR_KEY,
    addUnit
  };