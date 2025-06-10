<template>
  <view :class="classes">
    <view v-for="(item, index) in gridList" :key="index"
      :class="['nine-ninegrid__item', { active: activeState || (index !== 4 && index === currIndex) }]"
      :style="getItemStyle(index)" @click="handleItemClick(index)">
      <template v-if="index === 4">
        <slot name="startBtn">
          <view class="nine-ninegrid__item__center" @click="handleCenterClick">
            <text>{{ drawTitle }}</text>
            <text>{{ drawDesc }}</text>
          </view>
        </slot>
      </template>
      <template v-else>
        <view class="front">
          <image :src="cardImg" class="card-img" mode="aspectFit" />
        </view>
        <view class="back">
          <text>{{ item.name || '' }}</text>
          <image v-if="item.pictureUrl" :src="item.pictureUrl" class="prize-img" mode="aspectFit" />
        </view>
      </template>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
  prizeList: {
    type: Array,
    default: () => []
  },
  prizeId: {
    type: [Number, String],
    default: null
  },
  cardImg: {
    type: String,
    default: '' // Default empty or a placeholder card back image
  },
  // Animation related props, if needed
  shuffleDuration: {
    type: Number,
    default: 1500 // ms, total duration for cards to settle after shuffle
  },
  shuffleItemDelay: {
    type: Number,
    default: 150 // ms, delay between each card moving during shuffle
  }
});

const emit = defineEmits(['click', 'start', 'end', 'return']);

const componentName = 'zx-square-nine';
const classes = computed(() => {
  const prefixCls = componentName;
  return {
    [prefixCls]: true,
  };
});

const gridList = ref([]);
const oldGridList = ref([]);
const activeState = ref(true); // true: show front, false: show back (during shuffle)
const currIndex = ref(-1); // Index of the card being flipped, -1 means none
const drawTitle = ref('开始抽奖');
const drawDesc = ref('请翻牌');
const isBeginClick = ref(false); // Prevents multiple clicks on start button
const isDraw = ref(true); // true: start button, false: return button
const isStartDraw = ref(false); // true: cards can be flipped, false: shuffling or initial state

// For shuffle animation
const itemPositions = ref([]); // Stores { x, y } for each item's translation
const isShuffling = ref(false);

const initializeGrid = (list) => {
  if (!list || list.length === 0) {
    gridList.value = [];
    oldGridList.value = [];
    return;
  }
  let tempGrid = [...list];
  if (tempGrid.length === 8 && !(tempGrid[4] && Object.keys(tempGrid[4]).length > 0)) {
    // Ensure 9 items, with center potentially empty or special
    tempGrid.splice(4, 0, { isCenterPlaceholder: true });
  }
  if (tempGrid.length !== 9) {
    console.warn('prizeList should ideally have 8 or 9 items for a 3x3 grid.');
    // Pad or truncate if necessary, or handle as error
    while (tempGrid.length < 9) tempGrid.push({});
    if (tempGrid.length > 9) tempGrid = tempGrid.slice(0, 9);
    if (!(tempGrid[4] && Object.keys(tempGrid[4]).length > 0)) {
      tempGrid[4] = { isCenterPlaceholder: true };
    }
  }

  gridList.value = tempGrid.map((item, index) => ({
    ...item,
    id: item.id !== undefined ? item.id : `item-${index}`,
    originalIndex: index,
    twoArry: { x: index % 3, y: Math.floor(index / 3) } // Original grid position (0,0) to (2,2)
  }));
  oldGridList.value = JSON.parse(JSON.stringify(gridList.value));
  itemPositions.value = gridList.value.map(() => ({ x: 0, y: 0, transition: 'none' }));
};

watch(() => props.prizeList, (newList) => {
  initializeGrid(newList);
}, { immediate: true, deep: true });

const getItemStyle = (index) => {
  if (isShuffling.value && itemPositions.value[index]) {
    return {
      transform: `translate(${itemPositions.value[index].x}px, ${itemPositions.value[index].y}px)`,
      transition: itemPositions.value[index].transition || 'transform 0.3s ease-out'
    };
  }
  return {};
};

const handleItemClick = (index) => {
  if (index === 4 || !isStartDraw.value || currIndex.value !== -1 || activeState.value === false) {
    // Center item is handled by handleCenterClick, or not clickable during shuffle/reveal
    return;
  }
  if (isBeginClick.value) return; // Prevent flipping while shuffling animation is about to start

  currIndex.value = index;
  emit('click', gridList.value[index]);

  // Show all as the winning prize briefly, then revert
  const winningPrize = gridList.value.find(p => p.id === props.prizeId);
  if (!winningPrize) {
    console.error('Winning prizeId not found in prizeList');
    // Fallback: reveal the clicked card as is
    const revealedCard = oldGridList.value.find(p => p.originalIndex === gridList.value[index].originalIndex);
    gridList.value[index] = { ...revealedCard };
    activeState.value = true;
    isDraw.value = true;
    drawTitle.value = '开始抽奖';
    drawDesc.value = '请翻牌';
    isStartDraw.value = false; // Reset to allow starting again
    emit('end', gridList.value[index]);
    return;
  }

  const tempShowAllWinning = gridList.value.map((item, i) => {
    if (i === 4) return item; // Keep center as is
    return { ...winningPrize, originalIndex: item.originalIndex, twoArry: item.twoArry };
  });
  gridList.value = tempShowAllWinning;

  setTimeout(() => {
    // Revert to original, but with the clicked card revealed
    gridList.value = oldGridList.value.map((oldItem, i) => {
      if (gridList.value[index] && oldItem.originalIndex === gridList.value[index].originalIndex) {
        return oldGridList.value.find(p => p.id === props.prizeId) || oldItem; // Show the actual prize
      }
      return oldItem;
    });
    // Ensure the specific clicked card shows its true prize
    const finalGrid = JSON.parse(JSON.stringify(oldGridList.value));
    const prizeToReveal = oldGridList.value.find(p => p.id === props.prizeId);
    if (prizeToReveal) {
      const originalPositionOfPrize = finalGrid.findIndex(p => p.originalIndex === gridList.value[index].originalIndex);
      if (originalPositionOfPrize !== -1) {
        finalGrid[originalPositionOfPrize] = { ...prizeToReveal };
      }
    }
    gridList.value = finalGrid;

    activeState.value = true; // Show fronts again
    isDraw.value = true;
    drawTitle.value = '开始抽奖';
    drawDesc.value = '请翻牌';
    isStartDraw.value = false; // Reset to allow starting again
    currIndex.value = index; // Keep the revealed card shown
    emit('end', gridList.value[index]);
  }, props.shuffleDuration); // Duration for the "all winning" display
};

const shuffleAnimation = async (targetTranslate = 110) => {
  isShuffling.value = true;
  activeState.value = false; // Flip to show card backs (or cardImg)

  // Calculate translations for each card to move towards/away from center
  // This is a simplified shuffle, actual DOM element size would be needed for precise center alignment
  // For uni-app, we avoid direct DOM measurement if possible.
  // The original logic used item.twoArry: { x, y } where x,y are 0,1,2.
  // A common point (e.g., center of the grid) can be (1,1).
  // Translation = (targetGridPos - currentGridPos) * cardSize (approx)
  // Or, as in original: pos * (1 - item.twoArry.x)
  // Let's try to replicate the visual effect of cards moving.

  const cardWidth = 80; // Approximate card width in px, adjust as needed or make prop

  for (let i = 0; i < gridList.value.length; i++) {
    if (i === 4) continue; // Skip center
    const item = gridList.value[i];
    // Calculate translation relative to center (1,1)
    // Target is to move them 'targetTranslate' amount based on their original position from center
    const dx = (item.twoArry.x - 1) * (targetTranslate > 0 ? cardWidth : -cardWidth) * (targetTranslate > 0 ? 0.5 : 1) * (targetTranslate / 110);
    const dy = (item.twoArry.y - 1) * (targetTranslate > 0 ? cardWidth : -cardWidth) * (targetTranslate > 0 ? 0.5 : 1) * (targetTranslate / 110);

    itemPositions.value[i] = {
      x: dx,
      y: dy,
      transition: `transform ${props.shuffleDuration / 2000}s ease-in-out`
    };
    await new Promise(resolve => setTimeout(resolve, props.shuffleItemDelay / 2));
  }

  // Randomize gridList internally (the data model)
  let tempArray = gridList.value.filter((_, i) => i !== 4);
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  const newGrid = [];
  let tempArrayIndex = 0;
  for (let i = 0; i < 9; i++) {
    if (i === 4) {
      newGrid.push(gridList.value[4]);
    } else {
      newGrid.push(tempArray[tempArrayIndex++]);
    }
  }
  gridList.value = newGrid;
  // Update oldGridList to reflect new visual positions if needed for reveal logic
  // oldGridList.value = JSON.parse(JSON.stringify(gridList.value)); 
  // No, oldGridList should remain the original set of prizes for revealing the correct one.

  // Move cards to their new shuffled positions (visually back to grid)
  for (let i = 0; i < gridList.value.length; i++) {
    if (i === 4) continue;
    itemPositions.value[i] = {
      x: 0,
      y: 0,
      transition: `transform ${props.shuffleDuration / 2000}s ease-in-out ${props.shuffleItemDelay * gridList.value.length / 2000}s`
    };
    await new Promise(resolve => setTimeout(resolve, props.shuffleItemDelay / 2));
  }

  await new Promise(resolve => setTimeout(resolve, props.shuffleDuration)); // Wait for animation to complete
  isShuffling.value = false;
  itemPositions.value = gridList.value.map(() => ({ x: 0, y: 0, transition: 'none' }));
};

const handleCenterClick = async () => {
  if (isBeginClick.value) return;

  if (isDraw.value) { // Start Draw
    if (!props.prizeId) {
      console.error("prizeId is not set. Cannot determine winning prize.");
      // Optionally, trigger a 'return' or show an error to user
      emit('return');
      return;
    }
    // Ensure there's a prize to be won
    const winningPrizeExists = oldGridList.value.some(p => p.id === props.prizeId);
    if (!winningPrizeExists) {
      console.error(`Prize with id '${props.prizeId}' not found in the initial prizeList.`);
      emit('return');
      return;
    }

    emit('start');
    isBeginClick.value = true;
    isStartDraw.value = false;
    currIndex.value = -1; // Reset any revealed card
    drawTitle.value = '返回';
    drawDesc.value = '';

    // Restore to original visual state before shuffle if cards were already shuffled and one revealed
    if (activeState.value === true && oldGridList.value.length > 0) {
      gridList.value = JSON.parse(JSON.stringify(oldGridList.value));
      itemPositions.value = gridList.value.map(() => ({ x: 0, y: 0, transition: 'none' }));
    }
    activeState.value = false; // Flip to show card backs

    await shuffleAnimation(110); // Move out
    await nextTick();
    await shuffleAnimation(0);   // Move back to new positions

    isStartDraw.value = true; // Allow flipping
    isDraw.value = false; // Change button to 'Return'
    isBeginClick.value = false;

  } else { // Return
    emit('return');
    drawTitle.value = '开始抽奖';
    drawDesc.value = '请翻牌';
    activeState.value = true; // Show fronts
    isDraw.value = true;
    isStartDraw.value = false;
    currIndex.value = -1;
    // Reset to original grid state
    gridList.value = JSON.parse(JSON.stringify(oldGridList.value));
    itemPositions.value = gridList.value.map(() => ({ x: 0, y: 0, transition: 'none' }));
  }
};

onMounted(() => {
  initializeGrid(props.prizeList);
});

// Expose methods if needed via defineExpose, e.g., for parent to trigger shuffle
// defineExpose({ startShuffle: handleCenterClick });

</script>

<style lang="scss" scoped>
.zx-square-nine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  width: 300px; // Example width, make it configurable or responsive
  height: 300px; // Example height
  padding: 10px;
  perspective: 1000px; // For 3D flip effect
  box-sizing: border-box;
  background-color: #f0f0f0; // Example background
  border-radius: 8px;
}

.nine-ninegrid__item {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff; // Default item background
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.active .front {
    transform: rotateY(0deg);
  }

  &.active .back {
    transform: rotateY(180deg);
  }

  // When not active (shuffling or initial back shown)
  &:not(.active) .front {
    transform: rotateY(-180deg);
  }

  &:not(.active) .back {
    transform: rotateY(0deg);
  }
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 6px;
  overflow: hidden;
}

.front {
  background-color: #e0e0e0; // Card back color or image placeholder
  z-index: 2;

  .card-img {
    width: 100%;
    height: 100%;
  }
}

.back {
  background-color: #ffffff; // Card front color
  transform: rotateY(180deg);
  z-index: 1;

  .prize-img {
    max-width: 80%;
    max-height: 60%;
    margin-top: 5px;
  }

  text {
    font-size: 12px;
    color: #333;
  }
}

.nine-ninegrid__item__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ffcc00; // Center button color
  color: #333;
  border-radius: 6px;

  text {
    &:first-child {
      font-weight: bold;
      font-size: 16px;
    }

    &:last-child {
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
</style>