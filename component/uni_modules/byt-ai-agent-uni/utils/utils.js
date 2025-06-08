// 归纳数组通类型数据
export function Group(arr = [], key) {
	return key ?
		arr.reduce(
			(t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {}
		) : {};
}

/**
 * 功能：判断是否是json字符串
 * @param {Object} str
 */
export function isJsonString(str) {
	// 先快速检查是否为空字符串
	if (typeof str !== "string") {
		return false;
	}

	// 去掉两端的空白字符
	str = str.trim();

	// 判断是否是空字符串
	if (str === "") {
		return false;
	}

	// 检查是否是对象或数组的基本结构
	if (
		(str.startsWith("{") && str.endsWith("}")) ||
		(str.startsWith("[") && str.endsWith("]"))
	) {
		try {
			// 尝试解析
			JSON.parse(str);
			return true;
		} catch (e) {
			// 如果解析失败，返回 false
			return false;
		}
	}

	return false;
}

// 获取当前时间
export function getCurrentDateTime() {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero based
	const day = String(now.getDate()).padStart(2, '0');
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 功能:判断是否为空
 * @param v ：判断的数据
 * @returns {boolean}
 */
export function isEmpty(v) {
	switch (typeof v) {
		case 'undefined':
			return true;
		case 'string':
			if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
			break;
		case 'boolean':
			if (!v) return true;
			break;
		case 'number':
			if (v === 0 || isNaN(v)) return true;
			break;
		case 'object':
			if (v === null || v.length === 0) return true;
			for (const i in v) {
				return false;
			}
			return true;
			break;
		default:
			return false;
	}
	return false;
}

// 提示
export function showToast(message) {
	uni.showToast({
		icon: "none",
		title: message
	})
}

// 获取base64数据
export function removeBase64Prefix(data) {
	if (!data || typeof data != "string") {
		return null;
	}
	return data.slice(data.indexOf("base64,") + 7)
}

// 防抖函数
export function debounce(fn, delay) {
	// 1.先将一个变量保存到闭包中
	// 2.在闭包中获取点击事件的参数， 并将其返回给回调函数
	// 3.返回当前的闭包函数

	let timeout = null;
	return function() { // 形成一个毕包 ， timeout形成闭包中的局部变量
		let arg = arguments; // 获取当前事件的默认参数。
		clearTimeout(timeout); // 清除毕包中的定时器。
		timeout = setTimeout(() => {
			fn.apply(this, arg); // 将回调函数绑定当前的对象。
		}, delay)
	}
}

// 节流函数
export function throttle(fn, delay) {
	let prev = Date.now(); // 初始化时间

	return function() { // 形成闭包中的局部变量
		let arg = arguments; // 获取默认参数
		let now = Date.now(); // 事件触发的时间
		if (now - prev > delay) {
			fn.apply(this, arg);
			prev = Date.now(); // 更新初始化时间
		}
	}
}