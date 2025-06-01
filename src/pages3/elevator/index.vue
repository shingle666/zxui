<template>
  <view class="elevator-demo">
    <!-- 页面标题 -->
    <zx-navbar title="Elevator 电梯楼层" />
    
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <zx-elevator
          :index-list="basicIndexList"
          height="300px"
          @click-item="onClickItem"
          @click-index="onClickIndex"
          @change="onChange"
        />
      </view>
    </view>

    <!-- 自定义索引 -->
    <view class="demo-section">
      <view class="demo-title">自定义索引</view>
      <view class="demo-content">
        <zx-elevator
          :index-list="customIndexList"
          accept-key="name"
          height="250px"
          @click-item="onClickItem"
        />
      </view>
    </view>

    <!-- 索引吸顶 -->
    <view class="demo-section">
      <view class="demo-title">索引吸顶</view>
      <view class="demo-content">
        <zx-elevator
          :index-list="stickyIndexList"
          :is-sticky="true"
          height="280px"
          @click-item="onClickItem"
        />
      </view>
    </view>

    <!-- 自定义内容 -->
    <view class="demo-section">
      <view class="demo-title">自定义内容</view>
      <view class="demo-content">
        <zx-elevator
          :index-list="customContentList"
          height="320px"
          @click-item="onClickItem"
        >
          <template #default="{ item }">
            <view class="custom-item">
              <view class="custom-item__avatar">
                {{ item.name.charAt(0) }}
              </view>
              <view class="custom-item__info">
                <view class="custom-item__name">{{ item.name }}</view>
                <view class="custom-item__desc">{{ item.desc }}</view>
              </view>
              <view class="custom-item__tag" v-if="item.hot">
                热门
              </view>
            </view>
          </template>
        </zx-elevator>
      </view>
    </view>

    <!-- 城市选择示例 -->
    <view class="demo-section">
      <view class="demo-title">城市选择</view>
      <view class="demo-content">
        <zx-elevator
          :index-list="cityIndexList"
          :is-sticky="true"
          height="350px"
          @click-item="onCityClick"
        >
          <template #default="{ item }">
            <view class="city-item">
              <text class="city-name">{{ item.name }}</text>
              <text class="city-code">{{ item.code }}</text>
            </view>
          </template>
        </zx-elevator>
      </view>
    </view>

    <!-- 联系人列表示例 -->
    <view class="demo-section">
      <view class="demo-title">联系人列表</view>
      <view class="demo-content">
        <zx-elevator
          :index-list="contactIndexList"
          :is-sticky="true"
          height="400px"
          @click-item="onContactClick"
        >
          <template #default="{ item }">
            <view class="contact-item">
              <view class="contact-avatar">
                <image 
                  v-if="item.avatar" 
                  :src="item.avatar" 
                  class="contact-avatar__img"
                />
                <text v-else class="contact-avatar__text">
                  {{ item.name.charAt(0) }}
                </text>
              </view>
              <view class="contact-info">
                <view class="contact-name">{{ item.name }}</view>
                <view class="contact-phone">{{ item.phone }}</view>
              </view>
            </view>
          </template>
        </zx-elevator>
      </view>
    </view>

    <!-- 操作结果提示 -->
    <zx-toast ref="toast" />
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 基础用法数据
const basicIndexList = ref([
  {
    title: 'A',
    list: [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Android' },
      { id: 3, name: 'Ant Design' },
      { id: 4, name: 'Angular' }
    ]
  },
  {
    title: 'B',
    list: [
      { id: 5, name: 'Bootstrap' },
      { id: 6, name: 'Babel' },
      { id: 7, name: 'Blockchain' }
    ]
  },
  {
    title: 'C',
    list: [
      { id: 8, name: 'CSS' },
      { id: 9, name: 'Chrome' },
      { id: 10, name: 'Canvas' },
      { id: 11, name: 'Component' }
    ]
  },
  {
    title: 'D',
    list: [
      { id: 12, name: 'Docker' },
      { id: 13, name: 'Database' },
      { id: 14, name: 'Design' }
    ]
  },
  {
    title: 'E',
    list: [
      { id: 15, name: 'Element' },
      { id: 16, name: 'Express' },
      { id: 17, name: 'Electron' }
    ]
  }
])

// 自定义索引数据
const customIndexList = ref([
  {
    name: '热门',
    list: [
      { id: 1, name: '北京' },
      { id: 2, name: '上海' },
      { id: 3, name: '广州' },
      { id: 4, name: '深圳' }
    ]
  },
  {
    name: '推荐',
    list: [
      { id: 5, name: '杭州' },
      { id: 6, name: '南京' },
      { id: 7, name: '苏州' }
    ]
  },
  {
    name: '其他',
    list: [
      { id: 8, name: '成都' },
      { id: 9, name: '重庆' },
      { id: 10, name: '西安' }
    ]
  }
])

// 索引吸顶数据
const stickyIndexList = ref([
  {
    title: '水果',
    list: [
      { id: 1, name: '苹果' },
      { id: 2, name: '香蕉' },
      { id: 3, name: '橙子' },
      { id: 4, name: '葡萄' },
      { id: 5, name: '草莓' }
    ]
  },
  {
    title: '蔬菜',
    list: [
      { id: 6, name: '白菜' },
      { id: 7, name: '萝卜' },
      { id: 8, name: '土豆' },
      { id: 9, name: '西红柿' }
    ]
  },
  {
    title: '肉类',
    list: [
      { id: 10, name: '猪肉' },
      { id: 11, name: '牛肉' },
      { id: 12, name: '鸡肉' },
      { id: 13, name: '鱼肉' }
    ]
  },
  {
    title: '饮品',
    list: [
      { id: 14, name: '可乐' },
      { id: 15, name: '雪碧' },
      { id: 16, name: '果汁' },
      { id: 17, name: '咖啡' },
      { id: 18, name: '茶' }
    ]
  }
])

// 自定义内容数据
const customContentList = ref([
  {
    title: '前端',
    list: [
      { id: 1, name: 'Vue.js', desc: '渐进式 JavaScript 框架', hot: true },
      { id: 2, name: 'React', desc: '用于构建用户界面的 JavaScript 库', hot: true },
      { id: 3, name: 'Angular', desc: '现代 Web 开发平台' },
      { id: 4, name: 'Svelte', desc: '编译时优化的前端框架' }
    ]
  },
  {
    title: '后端',
    list: [
      { id: 5, name: 'Node.js', desc: 'JavaScript 运行时环境', hot: true },
      { id: 6, name: 'Python', desc: '简洁优雅的编程语言' },
      { id: 7, name: 'Java', desc: '企业级开发首选语言' },
      { id: 8, name: 'Go', desc: '高效的并发编程语言' }
    ]
  },
  {
    title: '数据库',
    list: [
      { id: 9, name: 'MySQL', desc: '最流行的关系型数据库' },
      { id: 10, name: 'MongoDB', desc: '文档型 NoSQL 数据库' },
      { id: 11, name: 'Redis', desc: '高性能键值存储' }
    ]
  }
])

// 城市数据
const cityIndexList = ref([
  {
    title: 'A',
    list: [
      { id: 1, name: '安庆', code: 'AQ' },
      { id: 2, name: '安阳', code: 'AY' },
      { id: 3, name: '鞍山', code: 'AS' }
    ]
  },
  {
    title: 'B',
    list: [
      { id: 4, name: '北京', code: 'BJ' },
      { id: 5, name: '保定', code: 'BD' },
      { id: 6, name: '包头', code: 'BT' },
      { id: 7, name: '本溪', code: 'BX' }
    ]
  },
  {
    title: 'C',
    list: [
      { id: 8, name: '重庆', code: 'CQ' },
      { id: 9, name: '成都', code: 'CD' },
      { id: 10, name: '长沙', code: 'CS' },
      { id: 11, name: '长春', code: 'CC' }
    ]
  },
  {
    title: 'D',
    list: [
      { id: 12, name: '大连', code: 'DL' },
      { id: 13, name: '东莞', code: 'DG' },
      { id: 14, name: '大庆', code: 'DQ' }
    ]
  },
  {
    title: 'G',
    list: [
      { id: 15, name: '广州', code: 'GZ' },
      { id: 16, name: '贵阳', code: 'GY' },
      { id: 17, name: '桂林', code: 'GL' }
    ]
  },
  {
    title: 'H',
    list: [
      { id: 18, name: '杭州', code: 'HZ' },
      { id: 19, name: '哈尔滨', code: 'HEB' },
      { id: 20, name: '合肥', code: 'HF' },
      { id: 21, name: '海口', code: 'HK' }
    ]
  },
  {
    title: 'S',
    list: [
      { id: 22, name: '上海', code: 'SH' },
      { id: 23, name: '深圳', code: 'SZ' },
      { id: 24, name: '苏州', code: 'SZ' },
      { id: 25, name: '沈阳', code: 'SY' }
    ]
  }
])

// 联系人数据
const contactIndexList = ref([
  {
    title: 'A',
    list: [
      { id: 1, name: 'Alice', phone: '138****1234', avatar: '' },
      { id: 2, name: 'Andy', phone: '139****5678', avatar: '' },
      { id: 3, name: 'Anna', phone: '137****9012', avatar: '' }
    ]
  },
  {
    title: 'B',
    list: [
      { id: 4, name: 'Bob', phone: '136****3456', avatar: '' },
      { id: 5, name: 'Betty', phone: '135****7890', avatar: '' },
      { id: 6, name: 'Bruce', phone: '134****1234', avatar: '' }
    ]
  },
  {
    title: 'C',
    list: [
      { id: 7, name: 'Charlie', phone: '133****5678', avatar: '' },
      { id: 8, name: 'Cathy', phone: '132****9012', avatar: '' },
      { id: 9, name: 'Chris', phone: '131****3456', avatar: '' }
    ]
  },
  {
    title: 'D',
    list: [
      { id: 10, name: 'David', phone: '130****7890', avatar: '' },
      { id: 11, name: 'Diana', phone: '189****1234', avatar: '' },
      { id: 12, name: 'Daniel', phone: '188****5678', avatar: '' }
    ]
  },
  {
    title: 'J',
    list: [
      { id: 13, name: 'Jack', phone: '187****9012', avatar: '' },
      { id: 14, name: 'Jane', phone: '186****3456', avatar: '' },
      { id: 15, name: 'John', phone: '185****7890', avatar: '' },
      { id: 16, name: 'Julia', phone: '184****1234', avatar: '' }
    ]
  },
  {
    title: 'M',
    list: [
      { id: 17, name: 'Mike', phone: '183****5678', avatar: '' },
      { id: 18, name: 'Mary', phone: '182****9012', avatar: '' },
      { id: 19, name: 'Mark', phone: '181****3456', avatar: '' }
    ]
  },
  {
    title: 'S',
    list: [
      { id: 20, name: 'Steve', phone: '180****7890', avatar: '' },
      { id: 21, name: 'Sarah', phone: '159****1234', avatar: '' },
      { id: 22, name: 'Sam', phone: '158****5678', avatar: '' }
    ]
  }
])

const toast = ref(null)

// 事件处理
const onClickItem = (key, item) => {
  console.log('点击项目:', key, item)
  showToast(`点击了 ${key} 分类下的 ${item.name}`)
}

const onClickIndex = (key) => {
  console.log('点击索引:', key)
  showToast(`点击了索引 ${key}`)
}

const onChange = (index) => {
  console.log('索引改变:', index)
}

const onCityClick = (key, item) => {
  console.log('选择城市:', item)
  showToast(`选择了城市：${item.name} (${item.code})`)
}

const onContactClick = (key, item) => {
  console.log('选择联系人:', item)
  showToast(`选择了联系人：${item.name} ${item.phone}`)
}

const showToast = (message) => {
  if (toast.value) {
    toast.value.show({
      title: message,
      type: 'success'
    })
  } else {
    uni.showToast({
      title: message,
      icon: 'none'
    })
  }
}
</script>

<style lang="scss" scoped>
.elevator-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.demo-section {
  margin-bottom: 20px;
  background-color: #fff;

  .demo-title {
    padding: 15px 20px 10px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
  }

  .demo-content {
    position: relative;
  }
}

// 自定义内容样式
.custom-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #f5f5f5;

  &__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }

  &__desc {
    font-size: 12px;
    color: #999;
  }

  &__tag {
    padding: 2px 8px;
    font-size: 10px;
    color: #ff4757;
    background-color: #ffe8e8;
    border-radius: 10px;
  }
}

// 城市选择样式
.city-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #f5f5f5;

  .city-name {
    font-size: 14px;
    color: #333;
  }

  .city-code {
    font-size: 12px;
    color: #999;
  }
}

// 联系人样式
.contact-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #f5f5f5;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #007aff;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.contact-phone {
  font-size: 12px;
  color: #999;
}
</style>