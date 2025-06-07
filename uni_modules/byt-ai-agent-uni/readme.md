# byt-ai-agent-uni 插件文档


## 项目接入流程

### 一、点击右上角"下载插件并导入HBuilderX"到项目中


### 二、引入样式文件

在项目的 uni.scss 文件或者App.vue文件（二选一）中引入

```scss
@import "@/uni_modules/byt-ai-agent-uni/index.scss";
```

### 三、注册并使用组件

#### 1、全局范围

##### 注册
配置之后就可以全局使用核心对话组件

注意：如果组件包位置不在uni_modules中则无效，需要在pages.json路径引入组件使用

```json
"custom": {
  "^byt-(.*)": "@/uni_modules/byt-ai-agent-uni/components/agent-dialogue/byt-$1/byt-$1.vue",
}
```

##### 调用
也可以直接调用 （设置了全局注册组件规则）

```vue
<--> config：内部有默认
  agentId：不传则会根据token查询默认智能体
  agentName：不传则会根据token查询默认智能体 </-->
<byt-dialogue
  :config="agentConfig"
  :agentId="agentId"
  :agentName="agentName"
></byt-dialogue>
```

#### 2、局部范围

##### 注册
组件地址引入

```json
// 通用方法
import BytDialogue from '@/uni_modules/byt-ai-agent-uni/components/agent-dialogue/byt-dialogue/byt-dialogue.vue';
```

##### 调用
```vue
<byt-dialogue
  :config="agentConfig"
  :agentId="agentId"
  :agentName="agentName"
></byt-dialogue>
```



### 四、组件属性(props)说明
组件 props

```js
props: {
	config: {
		type: Object,
		default: () => ({
			// 颜色和图标
			colorIcon: {
				// 主题色
				mainColor: '#448ef7',
				// 辅助色
				assistColor: '#a8ecff',
				// 字体主色
				textMainColor: '#1890ff',
				// 渐变色
				linearColor: '#27c9ff,#a8ecff',

				// 用户消息字体颜色
				userTextColor: '#FFFFFF',
				// 用户消息背景色
				userBgColor: '#448ef7',

				// 做活动按钮图标
				actionIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/action.svg',
				// 复制按钮图标
				copyIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/copy.svg',
				// 重新提问图标
				refreshIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh.svg',

				// 猜你想问背景颜色
                guessBgColor: 'url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMengDefauld.svg)',
				// 猜你想问换一换 字体颜色
				guessChangeColor: '#1890ff',
				// 猜你想问换一换图标
				guessChange: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_change.svg',
				//猜你想问文字头部左边图标
				guessIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_icon.svg',

				// 发送框左边图标
				sendLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft233.svg',
				// 发送框右边发送按钮
				sendRightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendBtn.svg',
				// 发送框快速提问关闭图标
				sendQuickCloseIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose.svg',
				// 发送框快速提问内容左侧图标
				sendQuickContentLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon1.svg'
			},
			// 头部启动栏欢迎语
			startup: {
				// 欢迎语
				tip: '我是红商AI助手。您有任何关于红商集团的问题，我可以随时帮您解答。',
				//欢迎语人物头像
				avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg', // 1,2
				// 头像回答旋转动效图标
				rotateIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_icon_outline.png',
				// 欢迎语右边背景图标
				rightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_banner_right.png'
			},
			// 主体内容
			main: {
				// 背景色
				// (1.数字类型， 1-4
				background: 1,
				// (2.对象类型 { type: 'image' | 'linear' | 'coLor' }
				//背景图片
				// background: {
				// 	type: 'image',
				// 	url: "https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg", // 1-4
				// },
				//渐变色
				// background: {
				// 	type: 'linear',
				// 	url: "-webkit-linear-gradient(top, #ffffff, #f3f4f8 120rpx)", // 1-4
				// },
				//纯色
				// background: {
				// 	type: 'color',
				// 	url: "rgb(217 224 255)", // 1-4
				// },
				// 背景角色图片
				role: 1 // 1-4
			},
			// 发送框工具栏功能
			toolList: [
				{
					id: 1,
					icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu.svg',
					activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu_active2.svg',
					name: '深度思考'
				},
				{
					id: 2,
					icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang.svg',
					activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang_avtive2.svg',
					name: '联网搜索'
				}
			],
			// 更多工具
			moreList: [
				{
					id: 1,
					icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/paishe.svg',
					name: '拍摄'
				},
				{
					id: 1,
					icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/xiangce.svg',
					name: '相册'
				},
				{
					id: 2,
					icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/luyin.svg',
					name: '录音'
				},

				{
					id: 2,
					icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/wendang.svg',
					name: '文档'
				}
			],
			// 更多工具显示开关
			moreListShow: true,
			// 快速提问显示开关
			quickShow: true,
			// 猜你喜欢提示语组件显示开关
			guess: false,
			// 输入框音频识别开关
			audio: true,
			// 基础消息配置
			message: {
				// 回答等待状态提示语
				answerWait: 'AI助手思考中',
				// 打开组件问候语
				greeting: '您好！有什么可以帮助您的？'
			},
			// 支持的消息类型，目前支持 text、chart，其他类型后续待开发
			typeWhiteList: ['text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'],
			// 消息角色配置
			roles: {
				// AI助手消息配置
				ai: {
					// 有名称就显示，没有就不显示
					name: 'AI助手',
					// 头像
					avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg', // 1,2
					// 位置
					placement: 'start'
				},
				// 用户消息配置
				user: {
					name: '用户名称1',
					avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/default_avatar.png',
					placement: 'end'
				}
			},
			// 业务用户信息
			userInfo: {
				//用户id必传，查询历史消息需要
				userId: '1670672134393978882'
			}
		})
	},
    //ai对话智能体id(必传！！)没有则不可使用
    //1、如果有智能体列表页面（例如listHome页面）的项目，只需要根据token查询平台下的智能体列表，点击对应智能体，将id传给组件即可使用
    //2、如果没有则需要向后端询问查询平台默认智能体对象的接口，在打开对话组件之前先调用获取智能体对象，将id传给组件即可使用
	agentId: {
		type: String,
		default: null
	},
    //对话头部名称
	agentName: {
		type: String,
		default: 'AI助手'
	},
    //整体宽度
	width: {
		type: String,
		default: '750rpx'
	},
    //整体宽度
	height: {
		type: String,
		default: '100vh'
	},
	// 是否显示头部页面返回按钮
	backShow: {
		type: Boolean,
		default: true
	}
},

```

### 五、大屏悬浮窗(不支持小程序)

#### 1.调用方式

1、局部引入调用

```js
// 导入
import BytDialogueFloating from '@/uni_modules/byt-ai-agent-uni/components/agent-dialogue/byt-dialogueFloating/byt-dialogueFloating.vue';
```

2、全局直接调用 （设置了全局注册组件规则）

```vue
<!-- #ifdef VUE2 -->
<byt-dialogueFloating
  :type.sync="floatingWindowType"
  :typeButton="true"
  :show.sync="floatingWindowShow"
></byt-dialogueFloating>
<!-- #endif -->
<!-- #ifdef VUE3 -->
<byt-dialogueFloating
  v-model:type="floatingWindowType"
  :typeButton="true"
  v-model:show="floatingWindowShow"
></byt-dialogueFloating>
<!-- #endif -->

<script>
    data(){ 
     return { 
      // 弹窗显示
      floatingWindowShow: false,
      //模式1、悬浮拖动，2、吸附，3、全屏
      floatingWindowType: 1, 
     } 
    }
</script>
```

#### 2.组件 props

```js
   props: {
        // 弹窗显示
        show: {
            type: Boolean,
            default: false
        },
        // 模式1、悬浮拖动，2、吸附，3、全屏
        type: {
            type: Number,
            default: 1
        },
        // 是否显示组件默认类型切换按钮 
        //如果这个设置为true则必须给type双向绑定变量才可以!!
        typeButton: {
            type: Boolean,
            default: false
        }
    },
```


#### 3.离线demo对话示例组件
1、局部调用

```js
// 通用导入
import BytDialogueDemo from '@/uni_modules/byt-ai-agent-uni/components/agent-dialogue/byt-dialogue-demo/byt-dialogue-demo.vue';
```

2、全局直接调用 （设置了全局注册组件规则）

```vue
<byt-dialogue-demo></byt-dialogue-demo>
```

3、组件 props

```js
 props: {
    config: {
        type: Object,
        default: () => ({
            // 颜色和图标
            // 颜色和图标
            colorIcon: {
            	// 主题色
            	mainColor: '#448ef7',
            	// 辅助色
            	assistColor: '#a8ecff',
            	// 字体主色
            	textMainColor: '#1890ff',
            	// 渐变色
            	linearColor: '#27c9ff,#a8ecff',
            
            	// 用户消息字体颜色
            	userTextColor: '#FFFFFF',
            	// 用户消息背景色
            	userBgColor: '#448ef7',
            
            	// 做活动按钮图标
            	actionIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/action.svg',
            	// 复制按钮图标
            	copyIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/copy.svg',
            	// 重新提问图标
            	refreshIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh.svg',
            
            	// 猜你想问背景颜色
            	guessBgColor: 'url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMengDefauld.svg)',
            	// 猜你想问换一换 字体颜色
            	guessChangeColor: '#1890ff',
            	// 猜你想问换一换图标
            	guessChange: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_change.svg',
            	//猜你想问文字头部左边图标
            	guessIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_icon.svg',
            
            	// 发送框左边图标
            	sendLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft233.svg',
            	// 发送框右边发送按钮
            	sendRightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendBtn.svg',
            	// 发送框快速提问关闭图标
            	sendQuickCloseIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose.svg',
            	// 发送框快速提问内容左侧图标
            	sendQuickContentLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon1.svg'
            },
            // 头部启动栏欢迎语
            startup: {
            	// 欢迎语
            	tip: '我是红商AI助手。您有任何关于红商集团的问题，我可以随时帮您解答。',
            	//欢迎语人物头像
            	avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg', // 1,2
            	// 头像回答旋转动效图标
            	rotateIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_icon_outline.png',
            	// 欢迎语右边背景图标
            	rightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_banner_right.png'
            },
            // 主体内容
            main: {
            	// 背景色
            	// (1.数字类型， 1-4
            	background: 1,
            	// (2.对象类型 { type: 'image' | 'linear' | 'coLor' }
            	//背景图片
            	// background: {
            	// 	type: 'image',
            	// 	url: "https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg", // 1-4
            	// },
            	//渐变色
            	// background: {
            	// 	type: 'linear',
            	// 	url: "-webkit-linear-gradient(top, #ffffff, #f3f4f8 120rpx)", // 1-4
            	// },
            	//纯色
            	// background: {
            	// 	type: 'color',
            	// 	url: "rgb(217 224 255)", // 1-4
            	// },
            	// 背景角色图片
            	role: 1 // 1-4
            },
            // 发送框工具栏功能
            toolList: [
            	{
            		id: 1,
            		icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu.svg',
            		activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu_active2.svg',
            		name: '深度思考'
            	},
            	{
            		id: 2,
            		icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang.svg',
            		activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang_avtive2.svg',
            		name: '联网搜索'
            	}
            ],
            // 更多工具
            moreList: [
            	{
            		id: 1,
            		icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/paishe.svg',
            		name: '拍摄'
            	},
            	{
            		id: 1,
            		icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/xiangce.svg',
            		name: '相册'
            	},
            	{
            		id: 2,
            		icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/luyin.svg',
            		name: '录音'
            	},
            
            	{
            		id: 2,
            		icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/wendang.svg',
            		name: '文档'
            	}
            ],
            // 更多工具显示开关
            moreListShow: true,
            // 快速提问显示开关
            quickShow: true,
            // 猜你喜欢提示语组件显示开关
            guess: true,
            // 输入框音频识别开关
            audio: false,
            // 基础消息配置
            message: {
                // 回答等待状态提示语
                answerWait: 'AI助手思考中',
                // 打开组件问候语
                greeting: '您好！有什么可以帮助您的？'
            },
            // 支持的消息类型，目前支持 text、chart，其他类型后续待开发
            typeWhiteList: ['text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'],
            // 消息角色配置
            roles: {
                // AI助手消息配置
                ai: {
                    // 有名称就显示，没有就不显示
                    name: 'AI助手',
                    // 头像
                    avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg', // 1,2
                    // 位置
                    placement: 'start'
                },
                // 用户消息配置
                user: {
                    name: '用户名称1',
                    avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/default_avatar.png',
                    placement: 'end'
                }
            },
            // 业务用户信息
            userInfo: {
                //用户id必传，查询历史消息需要
                userId: '1670672134393978882'
            }
        })
    },
    //对话头部名称
    agentName: {
        type: String,
        default: 'AI助手'
    },
    //整体宽度
    width: {
        type: String,
        default: '100%'
    },
    //整体宽度
    height: {
        type: String,
        default: '100vh'
    },
    // 是否显示头部页面返回按钮
    backShow: {
        type: Boolean,
        default: true
    }
},
```


### 六、组件相关配置

#### 1.api 接口相关

```js
在common/api.js中定义了对应的对话请求接口（一般不进行修改!!）


在common/config.js中定义了开发环境和生产环境下的请求地址
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
	// token鉴权（函数类型，否则会报错）
	getToken: () => uni.getStorageSync("bytToken")
};

// 开源连接配置
// export default baseConfig;

// 内部员工配置（此文件复制一份到项目中@/assets/config.js，配置内部服务地址（找后端询问））
import baseConfig2 from '@/assets/config.js'
export default baseConfig2

```

#### 2.page 示例页面相关

```vue
在listHome.vue中定义了跳转ai对话列表页地址
<script>
toChat(item) {
  uni.navigateTo({
    url: `/uni_modules/byt-ai-agent-uni/pages/index?agentType=${
      item.agentType
    }&agentId=${item.agentId || item.aiAgentId}&agentName=${
      item.agentName
    }`,
  });
},
</script>

如果包不在uni_modules中，请修改
例如： /uni_modules/byt-ai-agent-uni/pages/index"修改成真实的ai对话列表页地址

```

#### 3.subPackages 分包相关

```javascript
为了减少主包的大小，可以采用局部注册秋云图表，修改Chart组件引入地址
//byt-ai-agent-uni/components/core/Chart/Chart.vue
import qiunDataCharts from './components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue';
export default {
	name: 'Chart',
	components: {
		qiunDataCharts
	},
	...
}
```







## 组件文档

### 导出使用：

```js
// 小程序不适配 ，通用方法是具体到组件vue文件位置
import {组件名称1,组件名称2} from '@/uni_modules/byt-ai-agent-uni/components'
```



### 一、基础组件

#### 路径：

```js
/uni_modules/byt-ai-agent-uni/components/basic
```

#### 导出文件：index.js

```js

// 按钮
import BasicButton from './basic-button/basic-button.vue'
// 空状态
import BasicEmpty from './basic-empty/basic-empty.vue'
// 图标
import BasicIcon from './basic-icon/basic-icon.vue'
// 图片
import BasicImage from './basic-image/basic-image.vue'
// 加载更多
import BasicLoadmore from './basic-loadmore/basic-loadmore.vue'
// 弹窗
import BasicPopup from './basic-popup/basic-popup.vue'

export {
	BasicButton,
	BasicEmpty,
	BasicIcon,
	BasicImage,
	BasicLoadmore,
	BasicPopup
}
```



#### 1、按钮组件

```vue
<script>
//click:点击按钮触发
emits:['click'],
props: {
    // 按钮文字
    text: String,
    // 按钮背景颜色
    color: {
        type: String,
        default: '#b8b8b8'
    },
    //按钮形状 square:方形 circle:圆形
    shape: {
        type: String,
        default: 'square'
    }
},

</script>

```



#### 2、空状态组件

```vue
<script>
props: {
    //图标路径(网络或者本地)
    iconName: {
        type: String,
        default: 'https://img.yummall.cn/baiyetong/byt-uni-ui/empty.svg'
    },
    //图标颜色
    iconColor: {
        type: String,
        default: '#b8b8b8'
    },
    //图标大小
    iconSize: {
        type: String,
        default: '56px'
    },
    //字体大小
    fontSize: {
        type: String,
        default: '16px'
    },
    //字体颜色
    fontColor: {
        type: String,
        default: '#a1a1a2'
    }
},

</script>

```



#### 3、图标组件

```vue
<script>
//click:点击图标触发
emits:['click'],
props: {
    // 内置图标名称或者网络图片地址
    name: String,
    //图标颜色
    color: {
        type: String,
        default: '#b8b8b8'
    },
    //图标大小
    size: {
        type: String,
        default: '28rpx'
    },
    //图标行政
    // circle: 圆形
    // default: 默认
    shape: {
        type: String,
        default: 'default'
    }
},
methods: {
    onClick() {
        this.$emit('click');
    }
}
</script>

```



#### 4、图片组件

```vue
<script>
//click:点击图片触发
emits:['click'],
props: {
    // 图片路径
    src: String,
    //图片宽度
    width: {
        type: String,
        default: '28rpx'
    },
    //图片高度
    height: {
        type: String,
        default: '28rpx'
    }
},
methods: {
    onClick() {
        this.$emit('click');
    }
}

</script>

```



#### 5、加载更多组件

```vue
<script>
props: {
    //状态: loadmore:加载更多, nomore:没有更多了, loading:加载中
    status: {
        type: String,
        default: 'loading'
    }
},
computed: {
    statusName: function () {
        switch (this.status) {
            case 'loadmore':
                return '加载更多';
            case 'nomore':
                return '没有更多了';
            case 'loading':
                return '加载中';
            default:
                return '加载中';
        }
    }
},
</script>
```



#### 6、弹窗组件

```vue
<script>
//update:show:显示隐藏触发
emits:['update:show'],
props: {
    // 显示控制
    show: {
        type: Boolean,
        value: false
    },
    //高度
    height: {
        type: String,
        value: '160rpx'
    },
    //宽度
    width: {
        type: String,
        value: '600rpx'
    }
},
methods: {
    changeShow() {
        this.$emit('update:show', false);
    }
}
</script>
```





































































