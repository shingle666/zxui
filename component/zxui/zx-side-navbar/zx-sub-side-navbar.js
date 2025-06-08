export const zxSubSideNavbarProps = {
  /**
   * @description 导航标题
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * @description 导航是否默认展开
   */
  open: {
    type: Boolean,
    default: true
  },
}

export const zxSubSideNavbarEmits = {
  'title-click': (data) => true,
}