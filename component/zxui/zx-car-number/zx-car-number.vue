<template>
  <zx-popup ref="guipopupforcarnumber" :show="show" width="750rpx" position="bottom" :isSwitchPage="isSwitchPage"
    @close="close" :canCloseByShade="true">
    <view @click.stop.prevent="stopfun" class="zx-bg-white zx-dark-bg-level-3">
      <view class="zx-flex zx-rows zx-space-between zx-align-items-center" style="padding: 20rpx">
        <!-- 类型 -->
        <view style="width: 320rpx"><zx-segmented :items="['普通车牌', '新能源牌']" :current="carType"
            @change="changeType"></zx-segmented></view>
        <text class="zx-car-number-submit zx-block zx-primary-color" @click="confirm">确定</text>
      </view>
      <!-- 车牌展示 -->
      <view class="zx-flex zx-rows zx-nowrap zx-justify-content-center"
        style="padding-top: 20rpx; padding-bottom: 20rpx">
        <text class="zx-car-number-item zx-block zx-border" :class="[
          idx == inputIndex ? 'zx-bg-gray' : '',
          idx == inputIndex ? 'zx-a-shade' : '',
        ]" v-for="(item, idx) in carNumberArray" :key="idx" @click="numberTap(idx)">
          {{ item }}
        </text>
      </view>
      <!-- 错误信息 -->
      <view v-if="errorshow" style="padding: 20rpx; margin-bottom: 10rpx"><text
          class="zx-text zx-block zx-color-red zx-text-center">请输入完整车牌号码</text></view>
      <view style="padding: 15rpx">
        <!-- 省份前缀键盘 -->
        <view class="zx-flex zx-rows zx-wrap zx-overflow-hidden" :style="{ height: inputIndex == 0 ? '' : '0px' }">
          <view class="zx-car-number-key zx-border" hover-class="zx-tap" :hover-stay-time="50"
            v-for="(item, idx) in provinces" :key="idx" @click="provinceTap(item)">
            <text class="zx-car-number-key-txt zx-block-text">{{ item }}</text>
          </view>
        </view>
        <!-- 号码键盘 -->
        <view class="zx-flex zx-rows zx-wrap zx-space-between zx-overflow-hidden"
          :style="{ height: inputIndex > 0 ? '' : '0px' }">
          <view class="zx-car-number-key zx-border" hover-class="zx-tap" :hover-stay-time="50"
            v-for="(item, idx) in keyWords" :key="idx" @click="keyTap(item)">
            <text class="zx-car-number-key-txt zx-block zx-primary-text">{{ item }}</text>
          </view>
          <view class="zx-car-number-key" hover-class="zx-tap" @click="deleteNumber">
            <text class="zx-car-number-key-txt zx-block zx-primary-text zx-icons">&#xe623;</text>
          </view>
        </view>
      </view>
    </view>
  </zx-popup>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 定义属性
const props = defineProps({
  isSwitchPage: { type: Boolean, default: false },
});

// 定义事件
const emits = defineEmits(["confirm", "open", "close"]);

// 响应式数据
const carNumber = ref("");
const carNumberArray = ref([]);
const carType = ref(0);
const inputIndex = ref(0);
const errorshow = ref(false);
const show = ref(false);

// 省份数据
const provinces = [
  "京",
  "津",
  "沪",
  "渝",
  "冀",
  "豫",
  "云",
  "辽",
  "黑",
  "湘",
  "皖",
  "鲁",
  "新",
  "苏",
  "浙",
  "赣",
  "鄂",
  "桂",
  "甘",
  "晋",
  "蒙",
  "陕",
  "吉",
  "闽",
  "贵",
  "粤",
  "青",
  "藏",
  "川",
  "宁",
  "琼",
  "使",
  "领",
  "新",
];

// 键盘数据
const keyWords = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "港",
  "澳",
  "学",
  "领",
  "警",
];

// 显示错误信息
const showError = () => {
  errorshow.value = true;
  setTimeout(() => {
    errorshow.value = false;
  }, 2000);
};

// 确认车牌
const confirm = () => {
  let carNumberLength = carType.value == 0 ? 7 : 8;
  if (carNumber.value.length < carNumberLength) {
    showError();
    return;
  }
  emits("confirm", carNumber.value);
  close();
};

// 点击车牌位置
const numberTap = (idx) => {
  inputIndex.value = idx;
};

// 点击省份
const provinceTap = (key) => {
  carNumberArray.value[0] = key;
  carNumber.value = carNumberArray.value.join("");
  showNumber();
};

// 点击数字/字母
const keyTap = (key) => {
  let carNumberLength = carType.value == 0 ? 7 : 8;
  if (inputIndex.value >= carNumberLength) {
    return;
  }
  carNumberArray.value[inputIndex.value] = key;
  carNumber.value = carNumberArray.value.join("");
  showNumber();
};

// 显示车牌
const showNumber = () => {
  let carNumberArray_temp = carNumber.value.split("");
  let carNumberLength = carType.value == 0 ? 7 : 8;
  let carNumberArrLength = carNumberArray_temp.length;
  carNumberArray.value = [];
  let inputIdx = 0;
  for (let i = 0; i < carNumberLength; i++) {
    if (carNumberArrLength > i) {
      carNumberArray.value[i] = carNumberArray_temp[i];
      inputIdx++;
    } else {
      carNumberArray.value[i] = "";
    }
  }
  carNumber.value = carNumberArray.value.join("");
  inputIndex.value = inputIdx;
};

// 切换车牌类型
const changeType = (e) => {
  carType.value = e;
  showNumber();
};

// 设置车牌类型
const setType = (type) => {
  carType.value = type;
  showNumber();
};

// 设置车牌号
const setVal = (val) => {
  carNumber.value = val;
  showNumber();
};

// 删除车牌号
const deleteNumber = () => {
  if (inputIndex.value <= 0) {
    return;
  }
  carNumberArray.value.splice(inputIndex.value - 1, 1, "");
  carNumber.value = carNumberArray.value.join("");
  showNumber();
};

// 打开组件
const open = () => {
  show.value = true;
  emits("open");
};

// 点击阻止冒泡
const stopfun = (e) => {
  e.stopPropagation();
  return;
};

// 关闭组件
const close = () => {
  show.value = false;
  emits("close");
};

// 初始化
onMounted(() => {
  showNumber();
});

// 向外暴露方法
defineExpose({
  open,
  close,
  setType,
  setVal,
});
</script>

<style lang="scss" scoped>
.zx-car-number-item {
  width: 75rpx;
  height: 75rpx;
  line-height: 75rpx;
  margin: 0 10rpx;
  font-size: 42rpx;
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
  color: #333333;
}

.zx-car-number-key {
  width: 84rpx;
  height: 84rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
  background-color: #ffffff;
}

.zx-car-number-key-txt {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
}

.zx-car-number-submit {
  padding: 5rpx 30rpx;
  font-size: 30rpx;
}
</style>
