// 获取设备信息
const systemInfo = uni.getSystemInfoSync()

/**
 * 获取navbar高度
 */
export function getNavbarHeight() {
	// #ifndef MP-WEIXIN
	return systemInfo.statusBarHeight + 44
	// #endif

	// #ifdef MP-WEIXIN
	//微信端 navbar 安卓 高度为 48 ios高度为44
	return systemInfo.osName === 'ios' ? systemInfo.statusBarHeight + 44 : systemInfo.statusBarHeight + 48
	// #endif
}

/*
 * heightDifference:高度差值，默认为0（整个页面高度），
 */
export function getHeight(heightDifference = 0) {
	// systemInfo.statusBarHeight ：状态栏高度
	// 52:自定义头部组件高度
	// 头部navbar高度
	// #ifdef H5
	console.log("vsystemInfo", systemInfo);
	const navbarHeight = getNavbarHeight() + 10
	// #endif
	// #ifndef H5
	const navbarHeight = getNavbarHeight() + 10
	// #endif

	return systemInfo.windowHeight - navbarHeight - heightDifference
}