<template>
  <view class="demo-page">
    <view class="container">
      <view class="title">基本用法</view>
      <zx-square-nine
        ref="squareNineRef"
        :prize-list="prizes"
        :prize-id="winningPrizeId"
        :card-img="cardBackImg"
        @start="handleStart"
        @click="handleClick"
        @end="handleEnd"
        @return="handleReturn"
      />

      <view class="controls">
        <button class="control-button" @click="setRandomWinner">随机指定一个中奖奖品</button>
        <button class="control-button" @click="resetDemo">重置演示</button>
      </view>

      <view class="title">使用自定义开始按钮插槽</view>
      <zx-square-nine
        :prize-list="prizes2"
        :prize-id="winningPrizeId2"
        :card-img="cardBackImg2"
        @start="handleStart(2)"
        @click="handleClick"
        @end="handleEnd(2)"
        @return="handleReturn(2)"
      >
        <template #startBtn>
          <view 
            class="custom-start-btn" 
            @click="() => triggerCustomStart(2)" 
          >
            <zx-icon name="star" size="50rpx" color="#fff" />
            <text class="custom-start-text">开始!</text>
          </view>
        </template>
      </zx-square-nine>
       <view class="controls">
        <button class="control-button" @click="() => setRandomWinner(2)">随机指定 (示例2)</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const squareNineRef = ref(null); // Ref for the first instance

// --- Demo 1 Data ---
const cardBackImg = ref('https://img12.360buyimg.com/imagetools/jfs/t1/160909/31/22531/4759/60e6bc51E8c977632/a0f91c40a7dc0961.png');
const prizes = ref([
  { id: '1001', name: '手机', pictureUrl: 'https://via.placeholder.com/60/FF6347/FFFFFF?Text=Phone' },
  { id: '1002', name: '耳机', pictureUrl: 'https://via.placeholder.com/60/4682B4/FFFFFF?Text=Earbuds' },
  { id: '1003', name: '平板', pictureUrl: 'https://via.placeholder.com/60/32CD32/FFFFFF?Text=Tablet' },
  { id: '1004', name: '手表', pictureUrl: 'https://via.placeholder.com/60/FFD700/000000?Text=Watch' },
  { id: '1005', name: '音箱', pictureUrl: 'https://via.placeholder.com/60/6A5ACD/FFFFFF?Text=Speaker' },
  { id: '1006', name: '键盘', pictureUrl: 'https://via.placeholder.com/60/FF8C00/FFFFFF?Text=Keyboard' },
  { id: '1007', name: '鼠标', pictureUrl: 'https://via.placeholder.com/60/20B2AA/FFFFFF?Text=Mouse' },
  { id: '1008', name: '充电宝', pictureUrl: 'https://via.placeholder.com/60/DA70D6/FFFFFF?Text=PowerBank' },
]);
const winningPrizeId = ref(null);

// --- Demo 2 Data (with custom slot) ---
const cardBackImg2 = ref('https://img10.360buyimg.com/imagetools/jfs/t1/170163/1/20009/4759/60e6bc51E8c977632/a0f91c40a7dc0961.png'); // Different card back
const prizes2 = ref([
  { id: '2001', name: '谢谢参与', pictureUrl: 'https://via.placeholder.com/60/D3D3D3/000000?Text=Sorry' },
  { id: '2002', name: '优惠券', pictureUrl: 'https://via.placeholder.com/60/90EE90/000000?Text=Coupon' },
  { id: '2003', name: '小红包', pictureUrl: 'https://via.placeholder.com/60/FFB6C1/000000?Text=RedPacket' },
  { id: '2004', name: '积分', pictureUrl: 'https://via.placeholder.com/60/ADD8E6/000000?Text=Points' },
  { id: '2005', name: '神秘大奖', pictureUrl: 'https://via.placeholder.com/60/FFFFE0/000000?Text=Mystery' },
  { id: '2006', name: '再来一次', pictureUrl: 'https://via.placeholder.com/60/E6E6FA/000000?Text=Again' },
  { id: '2007', name: '惊喜礼品', pictureUrl: 'https://via.placeholder.com/60/FAFAD2/000000?Text=Surprise' },
  { id: '2008', name: '祝福卡', pictureUrl: 'https://via.placeholder.com/60/F0E68C/000000?Text=Blessing' },
]);
const winningPrizeId2 = ref(null);

const showToast = (message) => {
  uni.showToast({ title: message, icon: 'none' });
};

const handleStart = (demoInstance = 1) => {
  showToast(`示例 ${demoInstance} - 抽奖开始`);
  const currentPrizes = demoInstance === 1 ? prizes.value : prizes2.value;
  let currentWinner = demoInstance === 1 ? winningPrizeId.value : winningPrizeId2.value;

  if (!currentWinner) {
    const availablePrizes = currentPrizes.filter(p => p.id !== undefined);
    if (availablePrizes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePrizes.length);
      currentWinner = availablePrizes[randomIndex].id;
      if (demoInstance === 1) winningPrizeId.value = currentWinner;
      else winningPrizeId2.value = currentWinner;
      showToast(`示例 ${demoInstance} - 本次中奖ID (内部设定): ${currentWinner}`);
    } else {
      showToast(`示例 ${demoInstance} - 无可用奖品!`);
      return;
    }
  }
  console.log(`Demo ${demoInstance} Start - Winning ID: ${currentWinner}`);
};

const handleClick = (item) => {
  showToast(`点击卡片: ${item.name}`);
  console.log('Clicked item:', item);
};

const handleEnd = (itemOrDemoInstance) => {
  let item, demoInstance;
  if(typeof itemOrDemoInstance === 'number'){
    demoInstance = itemOrDemoInstance;
    // Need to get the actual item from the component if it's not passed directly
    // This event structure might need adjustment in the component if item is not passed
    // For now, assume item is passed or we log based on instance
    const currentPrizes = demoInstance === 1 ? prizes.value : prizes2.value;
    const currentWinnerId = demoInstance === 1 ? winningPrizeId.value : winningPrizeId2.value;
    item = currentPrizes.find(p => p.id === currentWinnerId);
    showToast(`示例 ${demoInstance} - 抽奖结束，中奖: ${item ? item.name : '未知'}`);
  } else {
    item = itemOrDemoInstance;
    demoInstance = prizes.value.some(p => p.id === item.id) ? 1 : 2; // Infer instance
    showToast(`示例 ${demoInstance} - 抽奖结束，中奖: ${item.name}`);
  }
  console.log(`Demo ${demoInstance} End - Prize:`, item);
  // Reset for next round if desired
  // if (demoInstance === 1) winningPrizeId.value = null;
  // else winningPrizeId2.value = null;
};

const handleReturn = (demoInstance = 1) => {
  showToast(`示例 ${demoInstance} - 返回初始状态`);
  if (demoInstance === 1) winningPrizeId.value = null;
  else winningPrizeId2.value = null;
  console.log(`Demo ${demoInstance} Return`);
};

const setRandomWinner = (demoInstance = 1) => {
  const currentPrizes = demoInstance === 1 ? prizes.value : prizes2.value;
  const availablePrizes = currentPrizes.filter(p => p.id !== undefined);
  if (availablePrizes.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    const newWinnerId = availablePrizes[randomIndex].id;
    if (demoInstance === 1) winningPrizeId.value = newWinnerId;
    else winningPrizeId2.value = newWinnerId;
    showToast(`示例 ${demoInstance} - 已指定新中奖ID: ${newWinnerId}`);
    console.log(`Demo ${demoInstance} - New winner set: ${newWinnerId}`);
  } else {
    showToast(`示例 ${demoInstance} - 无可用奖品来指定中奖者!`);
  }
};

const resetDemo = () => {
  winningPrizeId.value = null;
  // If the component has an internal reset method exposed, call it.
  // For now, we re-initialize by changing a prop or re-creating if necessary.
  // A simple way is to force re-render or call its internal reset if exposed.
  // squareNineRef.value?.reset(); // Assuming component exposes a reset method
  showToast('演示已重置');
  // To fully reset the component's visual state, you might need to trigger its 'return' logic
  // or re-initialize its prizeList if it doesn't fully reset on prop changes alone.
  // Forcing a re-render by changing the key is also an option:
  // <zx-square-nine :key="componentKey" ... />
  // componentKey.value++;
  if (squareNineRef.value && typeof squareNineRef.value.handleCenterClick === 'function') {
    // Check if it's in 'return' state, if not, make it so.
    if (!squareNineRef.value.isDraw) { // isDraw is an internal state, this is a guess
       // squareNineRef.value.handleCenterClick(); // This would toggle it back to start
    }
  }
  // The most reliable way is often to ensure the component itself has robust reset logic triggered by 'return' event or a dedicated method.
   prizes.value = [...prizes.value]; // Force reactivity if needed
   nextTick(() => {
     if (squareNineRef.value && squareNineRef.value.handleCenterClick) {
        // Simulate a return click if the component is in a state where 'return' is possible
        // This depends on the internal state of zx-square-nine, which is not directly accessible.
        // The best approach is for zx-square-nine to handle the 'return' event to fully reset itself.
        // Or provide a public reset method.
     }
   })

};

// For custom slot button to interact with component
// This requires the zx-square-nine component to have its center click logic callable, 
// or the slot click should somehow inform the parent to then call a method on zx-square-nine.
// The current zx-square-nine component's center button has @click="handleCenterClick".
// If the slot replaces this, the slot itself needs to trigger that logic.
// A common pattern is for the component to provide a function through the slot scope, or for the parent to call a ref method.
// Let's assume for now the slot click should call the component's internal start/return logic.
// The component's `handleCenterClick` is not exposed by default.
// A simple way is to have the custom button in the slot emit an event that the parent listens to, 
// then the parent calls a method on the zx-square-nine ref if needed, or directly calls handleStart/handleReturn.
const triggerCustomStart = (demoInstance) => {
    // This function would be called by the custom button in the slot.
    // It then calls the appropriate start/return logic for that demo instance.
    // This is a bit of a workaround. Ideally, the component's center logic is robustly handled.
    // For this example, we'll just call the `handleStart` or `handleReturn` based on the current state.
    // This assumes the slot click is for the center button.
    const compRef = demoInstance === 1 ? squareNineRef.value : null; // Need ref for demo 2 if we want to call its methods
    
    // Simplified: just call the start logic. The component itself should handle if it's a "return" action.
    // This is tricky because the component's internal state (isDraw) determines behavior.
    // The most straightforward way is if the component's center button logic is self-contained or exposed.
    // Given the current zx-square-nine.vue, the center button calls `handleCenterClick` internally.
    // If we replace it with a slot, that slot needs to replicate or trigger that. 
    // The easiest is if the slot is just for visual and the click is still handled by the component's root element for the center.
    // However, the provided zx-square-nine.vue has the click on the inner `nine-ninegrid__item__center` div.
    // So, if slot replaces that, the slot needs its own @click that calls the component's method.
    // This is not directly possible unless the method is exposed or passed via slot-scope.

    // Workaround: Parent calls the start/return handler. The component must be designed to accept this.
    // The current `zx-square-nine` component's `handleCenterClick` is internal.
    // Let's assume the slot click should just trigger the 'start' logic for the demo.
    showToast(`自定义按钮点击 (示例 ${demoInstance})`);
    if (demoInstance === 2) {
        if (winningPrizeId2.value === null) { // If it's in a state to start
            handleStart(2);
        } else { // If it's in a state to return (already played)
            handleReturn(2);
        }
    }
    // This is imperfect. The component should ideally handle its own center click logic robustly even with slots.
    // A better slot design might be: <template #startBtn="{ onStartClick }"> <my-button @click="onStartClick">...</my-button> </template>
    // For now, this example will just log and the actual start/return is tied to the component's internal button logic if not fully overridden.
};

</script>

<style lang="scss" scoped>
.demo-page {
  padding-bottom: 50px;
}
.container {
  padding: 15px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 5px;
  border-left: 3px solid #007aff;
}

.controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.control-button {
  width: 80%;
  max-width: 300px;
  font-size: 14px;
  // Standard button styling from uni-app or custom
}

.custom-start-btn {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff9900; // Custom background
  border-radius: 6px; // Match item border-radius
  padding: 5px;
  box-sizing: border-box;
}

.custom-start-icon {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}

.custom-start-text {
  font-size: 14px;
  color: white;
  font-weight: bold;
}

// Ensure zx-square-nine itself is centered or positioned as desired
::v-deep .zx-square-nine {
    margin-left: auto;
    margin-right: auto;
}

</style>