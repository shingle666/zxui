/**
 * 根据路径获取对象的属性值
 * @param {Object} obj - 目标对象
 * @param {String} path - 属性路径，例如："user.name"
 * @returns {Object} 包含value, key, target属性的对象
 */
export const getPropByPath = (obj, path) => {
  if (!obj || !path) return { value: undefined };

  // 处理数组索引路径，如 "list[0].name"
  let tempPath = path.replace(/\[(\w+)\]/g, '.$1');
  // 处理开头的.
  tempPath = tempPath.replace(/^\./, '');
  // 分割路径
  const keys = tempPath.split('.');
  // 逐层获取
  let temp = obj;
  let key = '';
  let i = 0;
  
  for (i = 0; i < keys.length - 1; i++) {
    key = keys[i];
    if (key in temp) {
      temp = temp[key];
    } else {
      temp = {};
    }
  }
  
  // 最后一级的键名
  key = keys[i];
  
  // 返回值、键和目标对象
  return {
    value: temp[key],
    key,
    target: temp
  };
}; 