import {
	request
} from "./request.js"

// 获取历史对话消息
export const chatHistoryList = (params, config = {}) =>
	request("/cms/aiDialogueRecord/getPageList", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});

//获取语音识别的token
export const chatAudioToken = (params, config = {}) =>
	request("/cms/aiDialogueHistory/getBaiduToken", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});

//清除chatGPT的上下文内容
export const chatClearMessage = (params, config = {}) =>
	request("/cms/aiDialogueHistory/delMessage", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});

// 获取打开一个新的对话的historyId
export const chatOpenNewHistory = (params, config = {}) =>
	request("/cms/aiDialogueHistory/add", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});


// 获取所有常问问题
export const chatGuessProblem = (params, config = {}) =>
	request("/digitalPortal/manage/problem/all", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});

// 对话列表
export const chatSessionList = (params, config = {}) =>
	request("/cms/aiDialogueHistory/getPageList", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});



// 新智能体列表
export const chatTechnologyList = (params, config = {}) =>
	request("/cms/aiAgent/list", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});

// 获取智能体列表详情
export const chatTechnologyDetail = (params, config = {}) =>
	request("/cms/aiAgent/detail", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});

// 获取默认智能体
export const getDefaultAgent = (params, config = {}) =>
	request("/cms/aiAgent/getDefaultAgent", 'post', params, config, {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	});