export const ZX_SIDE_NAVBAR_KEY = Symbol('zx-side-navbar')

export const zxSideNavbarProps = {
  /**
   * @description 导航缩进宽度
   */
  offset: {
    type: [Number, String],
    default: 15
  },
}