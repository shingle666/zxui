export const isImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)$/i.test(url);
};

export const isPlainObject = (val) => {
  return val !== null && typeof val === 'object' && val.constructor === Object;
};