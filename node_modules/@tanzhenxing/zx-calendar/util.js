import calendar from './calendar.js'

/**
 * 日历类，处理日期计算和状态管理
 */
class Calendar {
	/**
	 * 创建日历对象
	 * @param {Object} options - 配置选项
	 * @param {Date|string} [options.date] - 初始日期
	 * @param {Array} [options.selected=[]] - 选中的日期数组
	 * @param {string} [options.startDate] - 可选日期范围开始
	 * @param {string} [options.endDate] - 可选日期范围结束
	 * @param {boolean} [options.range] - 是否支持范围选择
	 */
	constructor({
		date,
		selected = [],
		startDate,
		endDate,
		range
	} = {}) {
		// 当前日期
		this.date = this.getDate(new Date()) // 当前初入日期
		// 打点信息
		this.selected = selected || [];
		// 范围开始
		this.startDate = startDate
		// 范围结束
		this.endDate = endDate
		this.range = range
		// 多选状态
		this.cleanMultipleStatus()
		// 每周日期
		this.weeks = {}
		// this._getWeek(this.date.fullDate)
	}
	/**
	 * 设置日期
	 * @param {string|Date} date - 日期
	 */
	setDate(date) {
		if (!date) return;
		this.selectDate = this.getDate(date)
		this._getWeek(this.selectDate.fullDate)
	}

	/**
	 * 清理多选状态
	 */
	cleanMultipleStatus() {
		this.multipleStatus = {
			before: '',
			after: '',
			data: []
		}
	}

	/**
	 * 重置开始日期
	 * @param {string} startDate - 开始日期
	 */
	resetSatrtDate(startDate) {
		// 范围开始
		this.startDate = startDate

	}

	/**
	 * 重置结束日期
	 * @param {string} endDate - 结束日期
	 */
	resetEndDate(endDate) {
		// 范围结束
		this.endDate = endDate
	}

	/**
	 * 获取任意时间的日期对象
	 * @param {Date|string} date - 日期对象或日期字符串
	 * @param {number} [addDayCount=0] - 要添加的天数
	 * @param {string} [type='day'] - 添加的类型：'day'|'month'|'year'
	 * @returns {Object} 日期对象，包含 fullDate、year、month、date、day 属性
	 */
	getDate(date, addDayCount = 0, type = 'day') {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)
		switch (type) {
			case 'day':
				dd.setDate(dd.getDate() + addDayCount) // 获取addDayCount天后的日期
				break
			case 'month':
				if (dd.getDate() === 31 && addDayCount>0) {
					dd.setDate(dd.getDate() + addDayCount)
				} else {
					const preMonth = dd.getMonth()
					dd.setMonth(preMonth + addDayCount) // 获取addDayCount月后的日期
					const nextMonth = dd.getMonth()
					// 处理月份切换问题，特别是针对2月份的特殊情况
					// 处理 pre 切换月份目标月份为2月没有当前日(30 31) 切换错误问题
					if(addDayCount<0 && preMonth!==0 && nextMonth-preMonth>addDayCount){
						dd.setMonth(nextMonth+(nextMonth-preMonth+addDayCount))
					}
					// 处理 next 切换月份目标月份为2月没有当前日(30 31) 切换错误问题
					if(addDayCount>0 && nextMonth-preMonth>addDayCount){
						dd.setMonth(nextMonth-(nextMonth-preMonth-addDayCount))
					}
				}
				break
			case 'year':
				dd.setFullYear(dd.getFullYear() + addDayCount) // 获取addDayCount年后的日期
				break
			default:
				break
		}
		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 月份不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 日期不足10补0
		return {
			fullDate: `${y}-${m}-${d}`,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}


	/**
	 * 获取上月剩余天数
	 * @param {number} firstDay - 本月第一天是星期几
	 * @param {Object} full - 当前月份信息
	 * @returns {Array} 日期数组
	 */
	_getLastMonthDays(firstDay, full) {
		let dateArr = []
		for (let i = firstDay; i > 0; i--) {
			const beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate()
			dateArr.push({
				date: beforeDate,
				month: full.month - 1,
				lunar: this.getlunar(full.year, full.month - 1, beforeDate),
				disable: true
			})
		}
		return dateArr
	}
	/**
	 * 获取本月天数
	 * @param {number} dateData - 本月天数
	 * @param {Object} full - 当前月份信息
	 * @returns {Array} 日期数组
	 */
	_currentMonthDys(dateData, full) {
		let dateArr = []
		let fullDate = this.date.fullDate
		for (let i = 1; i <= dateData; i++) {
			let nowDate = `${full.year}-${full.month < 10 ?
				full.month : full.month}-${i < 10 ?
				'0' + i : i}`
			// 是否今天
			let isDay = fullDate === nowDate
			// 获取打点信息
			let info = this.selected && this.selected.find((item) => {
				if (this.dateEqual(nowDate, item.date)) {
					return item
				}
			})

			// 日期禁用
			let disableBefore = true
			let disableAfter = true
			if (this.startDate) {
				// let dateCompBefore = this.dateCompare(this.startDate, fullDate)
				// disableBefore = this.dateCompare(dateCompBefore ? this.startDate : fullDate, nowDate)
				disableBefore = this.dateCompare(this.startDate, nowDate)
			}

			if (this.endDate) {
				// let dateCompAfter = this.dateCompare(fullDate, this.endDate)
				// disableAfter = this.dateCompare(nowDate, dateCompAfter ? this.endDate : fullDate)
				disableAfter = this.dateCompare(nowDate, this.endDate)
			}
			let multiples = this.multipleStatus.data
			let checked = false
			let multiplesStatus = -1
			if (this.range) {
				if (multiples) {
					multiplesStatus = multiples.findIndex((item) => {
						return this.dateEqual(item, nowDate)
					})
				}
				if (multiplesStatus !== -1) {
					checked = true
				}
			}
			let data = {
				fullDate: nowDate,
				year: full.year,
				date: i,
				multiple: this.range ? checked : false,
				beforeMultiple: this.dateEqual(this.multipleStatus.before, nowDate),
				afterMultiple: this.dateEqual(this.multipleStatus.after, nowDate),
				month: full.month,
				lunar: this.getlunar(full.year, full.month, i),
				disable: !(disableBefore && disableAfter),
				isDay
			}
			if (info) {
				data.extraInfo = info
			}

			dateArr.push(data)
		}
		return dateArr
	}
	/**
	 * 获取下月天数
	 * @param {number} surplus - 剩余格子数
	 * @param {Object} full - 当前月份信息
	 * @returns {Array} 日期数组
	 */
	_getNextMonthDays(surplus, full) {
		let dateArr = []
		for (let i = 1; i < surplus + 1; i++) {
			dateArr.push({
				date: i,
				month: Number(full.month) + 1,
				lunar: this.getlunar(full.year, Number(full.month) + 1, i),
				disable: true
			})
		}
		return dateArr
	}

	/**
	 * 获取当前日期详情
	 * @param {string|Date} date - 日期
	 * @returns {Object} 日期详情
	 */
	getInfo(date) {
		if (!date) {
			date = new Date()
		}
		if (!this.canlender) {
			return {}
		}
		const dateInfo = this.canlender.find(item => item.fullDate === this.getDate(date).fullDate)
		return dateInfo || {}
	}

	/**
	 * 比较时间大小
	 * @param {string} startDate - 开始日期
	 * @param {string} endDate - 结束日期
	 * @returns {boolean} 如果startDate小于等于endDate则返回true
	 */
	dateCompare(startDate, endDate) {
		try {
			// 计算截止时间
			const start = new Date(startDate.replace(/-/g, '/'))
			// 计算详细项的截止时间
			const end = new Date(endDate.replace(/-/g, '/'))
			return start <= end
		} catch (e) {
			console.error('日期比较错误', e)
			return false
		}
	}

	/**
	 * 比较时间是否相等
	 * @param {string} before - 日期1
	 * @param {string} after - 日期2
	 * @returns {boolean} 如果日期相等则返回true
	 */
	dateEqual(before, after) {
		try {
			// 计算截止时间
			const beforeDate = new Date(before.replace(/-/g, '/'))
			// 计算详细项的截止时间
			const afterDate = new Date(after.replace(/-/g, '/'))
			return beforeDate.getTime() === afterDate.getTime()
		} catch (e) {
			console.error('日期相等比较错误', e)
			return false
		}
	}


	/**
	 * 获取日期范围内所有日期
	 * @param {string} begin - 开始日期
	 * @param {string} end - 结束日期
	 * @returns {Array} 日期数组
	 */
	geDateAll(begin, end) {
		var arr = []
		var ab = begin.split('-')
		var ae = end.split('-')
		var db = new Date()
		db.setFullYear(ab[0], ab[1] - 1, ab[2])
		var de = new Date()
		de.setFullYear(ae[0], ae[1] - 1, ae[2])
		var unixDb = db.getTime() - 24 * 60 * 60 * 1000
		var unixDe = de.getTime() - 24 * 60 * 60 * 1000
		for (var k = unixDb; k <= unixDe;) {
			k = k + 24 * 60 * 60 * 1000
			arr.push(this.getDate(new Date(parseInt(k))).fullDate)
		}
		return arr
	}
	/**
	 * 计算农历日期显示
	 * @param {number} year - 年
	 * @param {number} month - 月
	 * @param {number} date - 日
	 * @returns {Object} 农历信息
	 */
	getlunar(year, month, date) {
		return calendar.solar2lunar(year, month, date)
	}
	/**
	 * 设置打点
	 * @param {string} data - 日期
	 * @param {Array} value - 打点数据
	 */
	setSelectInfo(data, value) {
		this.selected = value
		this._getWeek(data)
	}

	/**
	 *  获取多选状态
	 */
	setMultiple(fullDate) {
		let {
			before,
			after
		} = this.multipleStatus

		if (!this.range) return
		if (before && after) {
			this.multipleStatus.before = ''
			this.multipleStatus.after = ''
			this.multipleStatus.data = []
		} else {
			if (!before) {
				this.multipleStatus.before = fullDate
			} else {
				this.multipleStatus.after = fullDate
				if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
					this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
				} else {
					this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
				}
			}
		}
		this._getWeek(fullDate)
	}

	/**
	 * 获取每周数据
	 * @param {string} dateData - 日期
	 */
	_getWeek(dateData) {
		try {
			const { year, month } = this.getDate(dateData);
			const firstDay = new Date(year, month - 1, 1).getDay();
			const currentDay = new Date(year, month, 0).getDate();
			
			const dates = {
				lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)), // 上个月末尾几天
				currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)), // 本月天数
				nextMonthDays: [], // 下个月开始几天
				weeks: []
			};
			
			let canlender = [];
			const surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
			dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
			
			canlender = [...dates.lastMonthDays, ...dates.currentMonthDys, ...dates.nextMonthDays];
			
			let weeks = {};
			// 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
			for (let i = 0; i < canlender.length; i++) {
				if (i % 7 === 0) {
					weeks[parseInt(i / 7)] = new Array(7);
				}
				weeks[parseInt(i / 7)][i % 7] = canlender[i];
			}
			
			this.canlender = canlender;
			this.weeks = weeks;
		} catch (e) {
			console.error('获取周数据错误', e);
		}
	}

	//静态方法
	// static init(date) {
	// 	if (!this.instance) {
	// 		this.instance = new Calendar(date);
	// 	}
	// 	return this.instance;
	// }
}


export default Calendar
