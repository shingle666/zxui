import ZxSkeleton from './zx-skeleton.vue'
import ZxSkeletonItem from './zx-skeleton-item.vue'

// 组件安装函数
ZxSkeleton.install = function(app) {
	app.component(ZxSkeleton.name, ZxSkeleton)
	app.component(ZxSkeletonItem.name, ZxSkeletonItem)
}

// 单独导出子组件
ZxSkeletonItem.install = function(app) {
	app.component(ZxSkeletonItem.name, ZxSkeletonItem)
}

// 导出组件
export { ZxSkeletonItem }
export default ZxSkeleton 