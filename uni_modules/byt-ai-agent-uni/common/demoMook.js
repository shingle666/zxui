// 活动json
const activityJson = '[{"id":1,"name":"双111活动"},{"id":2,"name":"双22活动2"},{"id":3,"name":"双22活动23这是活动名称这是活动名称"}]'
// 优惠券json
const couponJson =
	'[{"id":1,"price":3000,"fullPrice":1000,"name":"满减券","deadlineStart":"2024/10/12","deadlineEnd":"2024/11/12"},{"id":2,"price":3000,"fullPrice":1000,"name":"折扣券","deadlineStart":"2024/10/12","deadlineEnd":"2024/11/12"},{"id":3,"price":3000,"fullPrice":1000,"name":"这是券的名称这是券的名称这是券的名称这是券的名称","deadlineStart":"2024/10/12","deadlineEnd":"2024/11/12"}]'
// 商品json
const goodsJson =
	'[{"id":1,"price":3000,"url":"https://img.alicdn.com/bao/uploaded/i3/2055770076/O1CN01jEkYK61CQr2Na3EO7_!!0-saturn_solar.jpg","name":"我是商品","desc":"好衣服你知道"},{"id":2,"price":3000,"url":"https://img.alicdn.com/imgextra/i3/2187216215/O1CN01sEeK2J1vmWYkhJGxP_!!2187216215-0-alimamacc.jpg","name":"上哦民擦擦擦","desc":"商品介绍商品介绍商品介绍商品介绍"},{"id":3,"price":3000,"url":"https://img.alicdn.com/imgextra/i4/2187216215/O1CN01wJNoxl1vmWYmoUyrH_!!2187216215-0-alimamacc.jpg","name":"商品名称商品名称","desc":"商品介绍商品介绍商品介绍商品介绍"}]'

// 图表json
const chartJson =
	'[{"name":"一班","value":50},{"name":"二班","value":30},{"name":"三班","value":20},{"name":"四班","value":18},{"name":"五班","value":8}]'
// 表格json
const tablesJson =
	'{"tableColumns": [{ "title": "苹果","key": "a","align": "center" },{  "title": "橘子", "key": "b", "align": "center"}],"tableData": [{"a": "10000元/斤","b": "200元/斤"},{"a": "2200元/斤","b": "2300元/斤"}]}'


// 深度思考数据  markdown语法中  在内容前面加上 > 即可格式化深度思考的样式，，然后 \n\n 就可以结束
const deepContentList = ['[SEEK]', "首", "先", "，", "我", "需", "要", "理", "解", "用", "户", "的", "具", "体", "需", "求", "。",
	"根",
	"据", "用",
	"户", "之", "前", "的", "对", "话", "历", "史", "，", "他", "曾", "提", "到", "过", "「", "深", "度", "思", "考", "的", "流", "式",
	"回", "答", "数", "组", "」", "，", "并", "希", "望", "结", "合", "动", "态", "生", "成", "和", "展", "示", "思", "考", "过", "程",
	"的", "数", "据", "结", "构", "。",
	"\n\n", "接", "下", "来", "，", "我", "需", "要", "查", "看", "用", "户", "提", "供", "的", "搜", "索", "结", "果", "。", "用",
	"户",
	"提", "供", "了", "多", "个", "网", "页", "，", "其", "中", "网", "页", "4", "和", "网", "页", "5", "提", "到", "了", "D", "e",
	"e", "p", "S", "e", "e", "k", "的", "深", "度", "思", "考", "功", "能", "，", "特", "别", "是", "网", "页", "4", "详", "细",
	"介", "绍", "了", "D", "e", "e", "p", "S", "e", "e", "k", "-", "R", "1", "模", "型", "的", "思", "维", "链", "生", "成",
	"过", "程", "，", "包", "括", "如", "何", "分", "步", "骤", "展", "示", "思", "考", "路", "径", "。"
]


// 查询历史消息 
export const chatHistoryListMook = async (data) => {
	if (data.pagination.pageNum > 1) {
		return []
	}
	return [{
			key: '1',
			createTime: '2022-09-09 12:12:12',
			type: 1,
			content: '活动',
			contentType: 'text'
		},
		{
			key: '2',
			createTime: '2022-11-11 09:30:00',
			type: 2,
			content: '双11限时满减活动进行中',
			contentType: 'activity',
			contentAppendData: activityJson
		},
		{
			key: '3',
			createTime: '2023-02-14 18:45:23',
			type: 1,
			content: '优惠券',
			contentType: 'text'
		},
		{
			key: '4',
			createTime: '2023-06-18 15:20:18',
			type: 2,
			content: '好的，这是给你推荐的优惠券',
			contentType: 'coupon',
			contentAppendData: couponJson
		},
		{
			key: '3',
			createTime: '2023-02-14 18:45:23',
			type: 1,
			content: '商品',
			contentType: 'text'
		},
		{
			key: '5',
			createTime: '2023-09-21 11:11:11',
			type: 2,
			content: '【新品上架】衣服服装上线X1',
			contentType: 'goods',
			contentAppendData: goodsJson
		},
		{
			key: '3',
			createTime: '2023-02-14 18:45:23',
			type: 1,
			content: '图表',
			contentType: 'text'
		},
		{
			key: '6',
			createTime: '2024-01-01 00:05:00',
			type: 2,
			content: '好的这是趋势分析图',
			contentType: 'chart_1',
			contentAppendData: chartJson
		},
		{
			key: '333',
			createTime: '2023-02-14 18:45:23',
			type: 1,
			content: '表格',
			contentType: 'text'
		},
		{
			key: '622',
			createTime: '2024-01-01 00:05:00',
			type: 2,
			content: '好的这是表格',
			contentType: 'tables',
			contentAppendData: tablesJson
		},
		{
			key: '7',
			createTime: '2024-03-15 14:30:00',
			type: 1,
			content: '查看最新库存数据表格',
			contentType: 'text'
		},
		{
			key: '9',
			createTime: '2024-12-25 10:00:00',
			type: 2,
			content: '系统维护通知：01:00-03:00暂停服务',
			contentType: 'text'
		},
		{
			key: '10',
			createTime: '2025-04-08 16:30:00',
			type: 2,
			content: " 已经为您生成了一张活泼可爱的小女孩的图片。 ![](https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/50706fe64cbbdddc2c8c99d27eb64d4d.jpeg?x-oss-process=image%2fresize%2cm_lfit%2cw_3840%2ch_2160) 希望这张图片符合您的期望！如果有任何其他需求或想要调整的地方，请随时告诉我。",
			contentType: 'text'
		}
	]
}

// 根据发送的消息文字返回消息数组
const getChatList = (message = '') => {
	if (message.includes('活动')) {
		const data = {
			type: 'activity',
			dataStr: activityJson
		}
		return {
			contentList: ["好", "的", "，", "这", "是", "活", "动", "："],
			jsonData: JSON.stringify(data),
			startStr: '[JSON]',
			endStr: '[DONE]',
		}
	} else if (message.includes('优惠券')) {
		const data = {
			type: 'coupon',
			dataStr: couponJson
		}
		return {
			contentList: ["好", "的", "，", "这", "是", "优", "惠", "券", "："],
			jsonData: JSON.stringify(data),
			startStr: '[JSON]',
			endStr: '[DONE]',
		}
	} else if (message.includes('商品')) {
		const data = {
			type: 'goods',
			dataStr: goodsJson
		}
		return {
			contentList: ["好", "的", "，", "这", "是", "商", "品", "："],
			jsonData: JSON.stringify(data),
			startStr: '[JSON]',
			endStr: '[DONE]',
		}
	} else if (message.includes('图表')) {
		const data = {
			type: 'chart_1',
			dataStr: chartJson
		}
		return {
			contentList: ["好", "的", "，", "这", "是", "图", "表", "："],
			jsonData: JSON.stringify(data),
			startStr: '[JSON]',
			endStr: '[DONE]',
		}
	} else if (message.includes('表格')) {
		const data = {
			type: 'tables',
			dataStr: tablesJson
		}
		return {
			contentList: ["好", "的", "，", "这", "是", "表", "格", "："],
			jsonData: JSON.stringify(data),
			startStr: '[JSON]',
			endStr: '[DONE]',
		}
	} else if (message.includes('图片')) {
		return {
			// https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/50706fe64cbbdddc2c8c99d27eb64d4d.jpeg?x-oss-process=image%2fresize%2cm_lfit%2cw_3840%2ch_2160
			contentList: [
				'已', '经', '为', '您', '生', '成', '了', '一', '张', '活', '泼', '可', '爱', '的', '小', '女', '孩', '的', '图',
				'片', '。', ' ![](https://img-baofun.zhhainiao.com/pcwallpaper',
				'_ugc/static/50706fe64cbbdddc2c8c99d27eb64d4d.jpeg',
				'?x-oss-process=image%2fresize%2cm_lfit%2cw', '_3840%2ch_2160)',
				'希', '望', '这', '张', '图', '片', '符', '合', '您', '的', '期', '望', '！',
				'如', '果', '有', '任', '何', '其', '他', '需', '求', '或', '想', '要', '调', '整', '的', '地', '方', '，',
				'请', '随', '时', '告', '诉', '我', '。'
			],
			jsonData: '',
			startStr: '[TEXT]',
			endStr: '[DONE]',
		}
	} else {
		return {
			contentList: ["可", "以", "问", ":", "活", "动", "、", "优", "惠", "券", "、", "商", "品", "、",
				"图", "表", "、", "表", "格", "、", "图", "片", "。", "这", "些", "关", "键", "词", "触", "发",
				"对", "应", "的", "回", "答", "，", "让", "你", "体", "验", "！",
			],
			jsonData: '',
			startStr: '[TEXT]',
			endStr: '[DONE]',
		}


	}

}

// WebSocket双向通信示例方法
export const WebSocketMook = () => {
	// 触发消息回调函数
	const emitMessage = (data, deep = false) => {
		let contentList = []
		if (data.startStr == '[TEXT]') {
			contentList = [data.startStr, ...data.contentList, data.endStr]
		} else {
			// json数据
			contentList = ['[TEXT]', ...data.contentList, data.startStr, data.jsonData, data.endStr]
		}
		if (deep) {
			contentList = [...deepContentList, ...contentList]
		}

		// 模拟延迟
		setTimeout(() => {
			console.log("sssssss:", contentList);
			contentList.forEach((item, index) => {
				setTimeout(() => {
					uni.$emit('socketTaskOnMessage', {
						data: item
					});
				}, index * 105);
			});
		}, 3000);
	}

	return {
		onOpen: (fn) => {
			fn({
				data: '连接正常'
			});
		},
		send: (data, deep = false) => {
			// 返回成功信息
			data.success();
			// 拿到消息
			const message = data.data;

			// 返回示例消息
			const responseChunks = getChatList(message)
			emitMessage(responseChunks, deep)
		},
		close: (data) => {
			// 关闭成功回调
			const success = data.success;
			// 关闭失败回调
			const fail = data.fail;
			try {
				uni.$off('socketTaskOnMessage');
				success({
					msg: '关闭成功'
				});
			} catch (e) {
				fail(e)
			}
		},
		onMessage: (fn) => {
			uni.$on('socketTaskOnMessage', (data) => {
				fn(data);
			});
		}
	};
}



// 获取快速提问列表
export const getQuickQuestionList = async () => {
	return [{
			id: 1,
			name: '帮我查一下最新商品'
		},
		{
			id: 2,
			name: '帮我查一下最近会员数据图表'
		},
		{
			id: 3,
			name: '帮我查一下优惠券'
		},
		{
			id: 4,
			name: '帮我查一下618可以参加的一些优惠活动'
		},
		{
			id: 5,
			name: '帮我生成图片'
		},
		{
			id: 6,
			name: '帮我生成小女孩的图片'
		}
	]
}