// 引入配置
import baseConfig from "./config";

/*
 * 全局请求封装
 * @param path 请求路径
 * @param method 请求类型(GET/POST/DELETE等)
 * @oaram data 请求体数据
 */
export const request = (path, method, data = {}, config = {}, custom = {}) => {
	//从缓存中获取登陆信息
	let token = baseConfig.getToken();
	if (custom.loading === undefined) {
		if (baseConfig.custom.loading) {
			uni.showLoading({
				title: "加载中...",
				mask: true
			});
		};
	} else {
		if (custom.loading) {
			uni.showLoading({
				title: "加载中...",
				mask: true
			});
		}
	}

	//根据token进行调用函数
	if (token != '') {
		return tokenRequest(path, method, data, token, config, custom)
	} else {
		return noTokenRequest(path, method, data, config, custom)
	}
};

// 响应成功数据处理
function responseSuccess(response, custom) {
	let data = response.data
	// 上传oss，无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档
	if (response.statusCode == 204) {
		return data || {};
	}

	if (data.code != 0) {
		if (data.code == 200) {
			return data || {};
		}

		if (data.code == 401) {
			data.message = "token错误，无权限访问";
		}
		if (custom.toast === undefined) {
			if (baseConfig.custom.toast) {
				setTimeout(() => {
					if (data.message || data.msg) {
						uni.showToast({
							icon: "none",
							title: data.message || data.msg
						});
					}
				})
			}
		} else {
			if (custom.toast) {
				setTimeout(() => {
					if (data.message || data.msg) {
						uni.showToast({
							icon: "none",
							title: data.message || data.msg
						});
					}
				})
			}
		}

	}
	return data || {};
}


// 无token时发送请求函数
function noTokenRequest(path, method, data, config = {}, custom = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			...config,
			url: baseConfig.apiUrl + path,
			method: method,
			data,
			timeout: custom.timeout || baseConfig.custom.timeout || 60000,
			success(response) {
				console.log("成功响应拦截器：", response)
				const data = responseSuccess(response, custom)
				resolve(data);
			},
			fail(err) {
				console.log("失败响应拦截器：", err)
				if (baseConfig.custom.toast) {
					uni.showToast({
						icon: "none",
						title: '服务响应失败'
					});
				}
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
}


// 有token时发送请求函数
function tokenRequest(path, method, data, token, config = {}, custom = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			...config,
			url: baseConfig.apiUrl + path,
			method: method,
			data,
			header: {
				"token": token
			},
			timeout: custom.timeout || baseConfig.custom.timeout || 60000,
			success(response) {
				console.log("成功响应拦截器：", response)
				const data = responseSuccess(response, custom)
				resolve(data);
			},
			fail(err) {
				console.log("失败响应拦截器：", err)
				if (baseConfig.custom.toast) {
					uni.showToast({
						icon: "none",
						title: '服务响应失败'
					});
				}
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
}