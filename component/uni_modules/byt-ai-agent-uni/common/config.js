const serivceEnv = {
	development: {
		// 开发服务
		apiUrl: "http://127.0.0.1:9195",
		// ws接口服务
		wsUrl: "ws://127.0.0.1:9195",
		// AI流式访问地址
		wsChartPath: "/ws-hello/chat.ws",
	},
	production: {
		// 正式服务
		apiUrl: "https://api.example.com",
		// ws接口服务
		wsUrl: "wss://api.example.com",
		// AI流式访问地址
		wsChartPath: "/ws-anno/chat.ws",
	}
}

const baseConfig = {
	// 接口地址
	apiUrl: serivceEnv[process.env.NODE_ENV].apiUrl,
	wsUrl: serivceEnv[process.env.NODE_ENV].wsUrl,
	//AI流式访问地址
	wsChartPath: serivceEnv[process.env.NODE_ENV].wsChartPath,
	// 百度语音识别 https://vop.baidu.com/pro_api
	// 通过后端接口包裹，可以避免h5端跨域跨域问题
	baiduAudioUrl: serivceEnv[process.env.NODE_ENV].apiUrl + '/cms/aiDialogueHistory/VoiceToText',
	// 请求接口加载状态
	custom: {
		//加载中开关
		loading: true,
		//相应错误提示开关
		toast: true,
		// 超时时间
		timeout: 60000
	},
	// token鉴权
	getToken: () => uni.getStorageSync("bytToken")
};

// 开源连接配置
export default baseConfig;

// 内部员工配置
// import baseConfig2 from '@/assets/config.js'
// export default baseConfig2