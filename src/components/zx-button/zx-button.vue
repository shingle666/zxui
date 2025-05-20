<template>
	<button
		:form-type="formType"
		:open-type="openType"
		:type="type"
		:plain="plain"
		:disabled="disabled"
		:loading="loading"
		:hover-class="hoverClass"
		:hover-start-time="hoverStartTime"
		:hover-stay-time="hoverStayTime"
		:hover-stop-propagation="hoverStopPropagation"
		:app-parameter="appParameter"
		:lang="lang"
		:session-from="sessionFrom"
		:send-message-title="sendMessageTitle"
		:send-message-path="sendMessagePath"
		:send-message-img="sendMessageImg"
		:show-message-card="showMessageCard"
		:group-id="groupId"
		:guild-id="guildId"
		:public-id="publicId"
		:data-im-id="dataImId"
		:data-im-type="dataImType"
		:data-goods-id="dataGoodsId"
		:data-order-id="dataOrderId"
		:data-biz-line="dataBizLine"
		:style="getStyle"
		@getphonenumber="getPhoneNumber"
		@getuserinfo="getUserInfo"
		@error="error"
		@opensetting="openSetting"
		@launchapp="launchApp"
		@contact="contact"
		@chooseavatar="chooseAvatar"
		@agreeprivacyauthorization="agreePrivacyAuthorization"
		@addgroupapp="addGroupApp"
		@chooseaddress="chooseAddress"
		@chooseinvoicetitle="chooseInvoiceTitle"
		@subscribe="subscribe"
		@login="login"
		@im="im"
		@click="click"
	>
		<slot>
			<view class="zx-button" :style="style">
				<view v-if="icon" style="margin-right: 10rpx;">
					<zx-icon :name="icon" :size="iconSize" :color="iconColor"></zx-icon>
				</view>
				<view>
					<text>{{ text }}</text>
				</view>
			</view>
		</slot>
	</button>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	// 按钮的大小
	size: {
		type: String,
		default: '90rpx'
	},
	// 按钮的样式类型: default, primary,warn
	type: {
		type: String,
		default: 'default'
	},
	// 按钮是否镂空，背景色透明
	plain: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 名称前是否带 loading 图标
	loading: {
		type: Boolean,
		default: false
	},
	// 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
	formType: {
		type: String,
		default: ''
	},
	// 开放能力
	openType: {
		type: String,
		default: ''
	},
	// 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
	hoverClass: {
		type: String,
		default: 'button-hover'
	},
	// 按住后多久出现点击态，单位毫秒
	hoverStartTime: {
		type: Number,
		default: 50
	},
	// 手指松开后点击态保留时间，单位毫秒
	hoverStayTime: {
		type: Number,
		default: 500
	},
	// 指定是否阻止本节点的祖先节点出现点击态
	hoverStopPropagation: {
		type: Boolean,
		default: true
	},
	// 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
	appParameter: {
		type: String,
		default: ''
	},
	// 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
	lang: {
		type: String,
		default: 'zh_CN'
	},
	// 会话来源，open-type="contact"时有效
	sessionFrom: {
		type: String,
		default: ''
	},
	// 会话内消息卡片标题，open-type="contact"时有效
	sendMessageTitle: {
		type: String,
		default: ''
	},
	// 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
	sendMessagePath: {
		type: String,
		default: ''
	},
	// 会话内消息卡片图片，open-type="contact"时有效
	sendMessageImg: {
		type: String,
		default: ''
	},
	// 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
	showMessageCard: {
		type: String,
		default: ''
	},
	// 打开群资料卡时，传递的群号
	groupId: {
		type: String,
		default: ''
	},
	// 打开频道页面时，传递的频道号
	guildId: {
		type: String,
		default: ''
	},
	// 打开公众号资料卡时，传递的号码
	publicId: {
		type: String,
		default: ''
	},
	// 客服的抖音号
	dataImId: {
		type: String,
		default: ''
	},
	// IM卡片类型
	dataImType: {
		type: String,
		default: ''
	},
	// 商品的id，仅支持泛知识课程库和生活服务商品库中的商品
	dataGoodsId: {
		type: String,
		default: ''
	},
	// 订单的id，仅支持交易2.0订单
	dataOrderId: {
		type: String,
		default: ''
	},
	// 商品类型，“1”代表生活服务，“2”代表泛知识
	dataBizLine: {
		type: String,
		default: ''
	},
	// 按钮文字
	text: {
		type: String,
		default: ''
	},
	// 按钮形状： 圆角 square, 圆形 circle,圆角 round
	shape: {
		type: String,
		default: ''
	},
	// 文字颜色
	color: {
		type: String,
		default: ''
	},
	// 按钮背景色
	backgroundColor: {
		type: String,
		default: ''
	},
	icon: {
		type: String,
		default: ''
	},
	iconColor: {
		type: String,
		default: '#ffffff'
	},
	iconSize:{
		type: String,
		default: '36rpx'
	},
	// 自定义样式
	style: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const getStyle = ref({});

onMounted(() => {
	if (props.shape) {
		// 圆形
		if (props.shape === 'circle') {
			getStyle.value.height = props.size;
			getStyle.value.width = props.size;
			getStyle.value.borderRadius = parseInt(props.size)*0.5+'rpx';
		}
		// 圆角
		if (props.shape === 'round') {
			getStyle.value.height = props.size;
			getStyle.value.borderRadius = parseInt(props.size)*0.5+'rpx';
		}
	}
	if (props.backgroundColor) {
		getStyle.value.backgroundColor = props.backgroundColor;
	}
	if (props.color) {
		getStyle.value.color = props.color;
	}
	if (props.size) {
		getStyle.value.height = props.size;
	}
});

const getPhoneNumber = (e) => {
	proxy.$emit('getPhoneNumber', e);
	console.log(JSON.stringify(e));
};
const getUserInfo = (e) => {
	proxy.$emit('getUserInfo', e);
	console.log(JSON.stringify(e));
};
const error = (e) => {
	proxy.$emit('error', e);
	console.log(JSON.stringify(e));
};
const openSetting = (e) => {
	proxy.$emit('openSetting', e);
	console.log(JSON.stringify(e));
};
const launchApp = (e) => {
	proxy.$emit('launchApp', e);
	console.log(JSON.stringify(e));
};
const contact = (e) => {
	proxy.$emit('contact', e);
	console.log(JSON.stringify(e));
};
const chooseAvatar = (e) => {
	proxy.$emit('chooseAvatar', e);
	console.log(JSON.stringify(e));
};
const agreePrivacyAuthorization = (e) => {
	proxy.$emit('agreePrivacyAuthorization', e);
	console.log(JSON.stringify(e));
};
const addGroupApp = (e) => {
	proxy.$emit('addGroupApp', e);
	console.log(JSON.stringify(e));
};
const chooseAddress = (e) => {
	proxy.$emit('chooseAddress', e);
	console.log(JSON.stringify(e));
};
const chooseInvoiceTitle = (e) => {
	proxy.$emit('chooseInvoiceTitle', e);
	console.log(JSON.stringify(e));
};
const subscribe = (e) => {
	proxy.$emit('subscribe', e);
	console.log(JSON.stringify(e));
};
const login = (e) => {
	proxy.$emit('login', e);
	console.log(JSON.stringify(e));
};
const im = (e) => {
	proxy.$emit('im', e);
	console.log(JSON.stringify(e));
};
const click = (e) => {
	// 设置主题样式
	switch (props.type) {
		case 'success':
			setTimeout(() => {
				getStyle.value.backgroundColor = '#529b2e';
			}, props.hoverStartTime);
			setTimeout(() => {
				getStyle.value.backgroundColor = '#67C23A';
			}, props.hoverStayTime);
			break;
		case 'warning':
			setTimeout(() => {
				getStyle.value.backgroundColor = '#b88230';
			}, props.hoverStartTime);
			setTimeout(() => {
				getStyle.value.backgroundColor = '#e6a23c';
			}, props.hoverStayTime);
			break;
		case 'danger':
			setTimeout(() => {
				getStyle.value.backgroundColor = '#c45656';
			}, props.hoverStartTime);
			setTimeout(() => {
				getStyle.value.backgroundColor = '#F56C6C';
			}, props.hoverStayTime);
			break;
		case 'info':
			setTimeout(() => {
				getStyle.value.backgroundColor = '#73767a';
			}, props.hoverStartTime);
			setTimeout(() => {
				getStyle.value.backgroundColor = '#909399';
			}, props.hoverStayTime);
			break;
	}

	//console.log(JSON.stringify(e))
	proxy.$emit('click', e);
};
</script>

<style scoped>
.zx-button {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
uni-button {
	padding-left: 0px;
	padding-right: 0px;
}
uni-button[type='success'] {
	color: #ffffff;
	background-color: #67c23a;
}
uni-button[type='warning'] {
	color: #ffffff;
	background-color: #e6a23c;
}
uni-button[type='danger'] {
	color: #ffffff;
	background-color: #f56c6c;
}
uni-button[type='info'] {
	color: #ffffff;
	background-color: #909399;
}
</style>
