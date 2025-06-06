<template>
  <view class="zx-area">
    <zx-popup :show="show" position="bottom" @close="onCancel">
      <view class="zx-area__toolbar">
        <view class="zx-area__toolbar-button zx-area__toolbar-button--cancel" @click="onCancel">{{ cancelButtonText }}</view>
        <view class="zx-area__toolbar-title">{{ title }}</view>
        <view class="zx-area__toolbar-button zx-area__toolbar-button--confirm" @click="onConfirm">{{ confirmButtonText }}</view>
      </view>
      <picker-view v-if="show" :indicator-style="indicatorStyle" :value="pickerValue" @change="onPickerChange" class="zx-area__picker-view">
        <picker-view-column v-if="columnsNum > 0">
          <view v-for="(item, index) in displayColumns[0]" :key="index" class="zx-area__picker-item">{{ item.text }}</view>
        </picker-view-column>
        <picker-view-column v-if="columnsNum > 1">
          <view v-for="(item, index) in displayColumns[1]" :key="index" class="zx-area__picker-item">{{ item.text }}</view>
        </picker-view-column>
        <picker-view-column v-if="columnsNum > 2">
          <view v-for="(item, index) in displayColumns[2]" :key="index" class="zx-area__picker-item">{{ item.text }}</view>
        </picker-view-column>
      </picker-view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue';
import ZxPopup from '../zx-popup/zx-popup.vue'; // Assuming zx-popup is available

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  modelValue: String, // v-model
  title: {
    type: String,
    default: '选择地区'
  },
  areaList: {
    type: Object,
    default: () => ({})
  },
  // 省市区数据，格式见下方
  columnsNum: {
    type: [Number, String],
    default: 3 // 显示列数，3-省市区，2-省市，1-省
  },
  columnsPlaceholder: {
    type: Array,
    default: () => [] // 列占位提示文字
  },
  confirmButtonText: {
    type: String,
    default: '确认'
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  loading: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  itemHeight: {
    type: [Number, String],
    default: 44 // 选项高度，单位px
  },
  visibleItemCount: {
    type: [Number, String],
    default: 5 // 可见的选项个数
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'change', 'update:show']);

const AREA_EMPTY_CODE = '000000';
const pickerValue = ref([]); // 用于 picker-view 的 value
const displayColumns = ref([[], [], []]); // 用于 picker-view 的数据源
const selectedOptions = ref([]);

const indicatorStyle = computed(() => `height: ${props.itemHeight}px;`);

const makeOption = (text = '', value = AREA_EMPTY_CODE, children = undefined) => ({
  text,
  value,
  children
});

const formatDataForCascade = (areaList, columnsNum, placeholder) => {
  const { province_list = {}, city_list = {}, county_list = {} } = areaList;
  const showCity = +columnsNum > 1;
  const showCounty = +columnsNum > 2;

  const provinces = [];
  const cities = [];
  const counties = [];

  // Placeholder handling
  if (placeholder.length > 0 && placeholder[0]) {
    provinces.push(makeOption(placeholder[0], AREA_EMPTY_CODE));
  }
  if (showCity && placeholder.length > 1 && placeholder[1]) {
    cities.push(makeOption(placeholder[1], AREA_EMPTY_CODE));
  }
  if (showCounty && placeholder.length > 2 && placeholder[2]) {
    counties.push(makeOption(placeholder[2], AREA_EMPTY_CODE));
  }

  // Process provinces
  for (const code in province_list) {
    provinces.push(makeOption(province_list[code], code));
  }

  return [provinces, cities, counties];
};

const getCities = (provinceCode) => {
  if (!provinceCode || provinceCode === AREA_EMPTY_CODE || !props.areaList.city_list) {
    return props.columnsPlaceholder.length > 1 && props.columnsPlaceholder[1] ? [makeOption(props.columnsPlaceholder[1], AREA_EMPTY_CODE)] : [];
  }
  const cities = [];
  if (props.columnsPlaceholder.length > 1 && props.columnsPlaceholder[1]) {
     cities.push(makeOption(props.columnsPlaceholder[1], AREA_EMPTY_CODE));
  }
  const prefix = provinceCode.slice(0, 2);
  for (const code in props.areaList.city_list) {
    if (code.startsWith(prefix)) {
      cities.push(makeOption(props.areaList.city_list[code], code));
    }
  }
  return cities.length > (props.columnsPlaceholder.length > 1 && props.columnsPlaceholder[1] ? 1: 0) ? cities : (props.columnsPlaceholder.length > 1 && props.columnsPlaceholder[1] ? [makeOption(props.columnsPlaceholder[1], AREA_EMPTY_CODE)] : []);
};

const getCounties = (cityCode) => {
  if (!cityCode || cityCode === AREA_EMPTY_CODE || !props.areaList.county_list) {
    return props.columnsPlaceholder.length > 2 && props.columnsPlaceholder[2] ? [makeOption(props.columnsPlaceholder[2], AREA_EMPTY_CODE)] : [];
  }
  const counties = [];
   if (props.columnsPlaceholder.length > 2 && props.columnsPlaceholder[2]) {
     counties.push(makeOption(props.columnsPlaceholder[2], AREA_EMPTY_CODE));
  }
  const prefix = cityCode.slice(0, 4);
  for (const code in props.areaList.county_list) {
    if (code.startsWith(prefix)) {
      counties.push(makeOption(props.areaList.county_list[code], code));
    }
  }
  return counties.length > (props.columnsPlaceholder.length > 2 && props.columnsPlaceholder[2] ? 1: 0) ? counties : (props.columnsPlaceholder.length > 2 && props.columnsPlaceholder[2] ? [makeOption(props.columnsPlaceholder[2], AREA_EMPTY_CODE)] : []);
};

const updatePickerValue = (code) => {
  if (!code || !props.areaList.province_list) {
    pickerValue.value = [0, 0, 0].slice(0, props.columnsNum);
    return;
  }

  const provinceCode = `${code.slice(0, 2)}0000`;
  const cityCode = `${code.slice(0, 4)}00`;
  const countyCode = code;

  const newPickerValue = [];
  let pIndex = displayColumns.value[0].findIndex(p => p.value === provinceCode);
  if (pIndex === -1) pIndex = 0;
  newPickerValue.push(pIndex);

  if (props.columnsNum > 1) {
    const cities = getCities(provinceCode);
    displayColumns.value[1] = cities;
    let cIndex = cities.findIndex(c => c.value === cityCode);
    if (cIndex === -1) cIndex = 0;
    newPickerValue.push(cIndex);

    if (props.columnsNum > 2) {
      const counties = getCounties(cityCode);
      displayColumns.value[2] = counties;
      let coIndex = counties.findIndex(co => co.value === countyCode);
      if (coIndex === -1) coIndex = 0;
      newPickerValue.push(coIndex);
    }
  }
  pickerValue.value = newPickerValue;
  updateSelectedOptions(newPickerValue);
};

const updateSelectedOptions = (currentPickerValue) => {
  const options = [];
  if (displayColumns.value[0] && displayColumns.value[0][currentPickerValue[0]]) {
    options.push(displayColumns.value[0][currentPickerValue[0]]);
  }
  if (props.columnsNum > 1 && displayColumns.value[1] && displayColumns.value[1][currentPickerValue[1]]) {
    options.push(displayColumns.value[1][currentPickerValue[1]]);
  }
  if (props.columnsNum > 2 && displayColumns.value[2] && displayColumns.value[2][currentPickerValue[2]]) {
    options.push(displayColumns.value[2][currentPickerValue[2]]);
  }
  selectedOptions.value = options.filter(opt => opt && opt.value !== AREA_EMPTY_CODE);
};

const onPickerChange = (e) => {
  if (props.readonly) return;
  const newPickerValue = e.detail.value;
  const oldPickerValue = [...pickerValue.value];
  pickerValue.value = newPickerValue;

  let changedColumn = -1;
  for (let i = 0; i < newPickerValue.length; i++) {
    if (newPickerValue[i] !== oldPickerValue[i]) {
      changedColumn = i;
      break;
    }
  }

  if (changedColumn === 0 && props.columnsNum > 1) {
    const selectedProvince = displayColumns.value[0][newPickerValue[0]];
    displayColumns.value[1] = getCities(selectedProvince.value);
    pickerValue.value[1] = 0; // Reset city
    if (props.columnsNum > 2) {
      displayColumns.value[2] = getCounties(AREA_EMPTY_CODE); // Reset county with placeholder or empty
      pickerValue.value[2] = 0; // Reset county
    }
  }

  if (changedColumn === 1 && props.columnsNum > 2) {
    const selectedCity = displayColumns.value[1][newPickerValue[1]];
    displayColumns.value[2] = getCounties(selectedCity.value);
    pickerValue.value[2] = 0; // Reset county
  }
  
  updateSelectedOptions(pickerValue.value);

  const lastSelectedOption = selectedOptions.value[selectedOptions.value.length -1];
  const lastCode = lastSelectedOption ? lastSelectedOption.value : '';

  emit('change', {
    selectedValues: selectedOptions.value.map(opt => opt.value),
    selectedOptions: selectedOptions.value,
    selectedIndexes: [...pickerValue.value],
    columnIndex: changedColumn
  });
  
  // Only emit update:modelValue if the actual meaningful code changes
  if (lastCode && lastCode !== AREA_EMPTY_CODE && lastCode !== props.modelValue) {
      emit('update:modelValue', lastCode);
  }
};

const onConfirm = () => {
  if (props.readonly || props.loading) return;
  emit('confirm', {
    selectedValues: selectedOptions.value.map(opt => opt.value),
    selectedOptions: selectedOptions.value,
    selectedIndexes: [...pickerValue.value]
  });
  emit('update:show', false);
};

const onCancel = () => {
  if (props.loading) return;
  emit('cancel', {
      selectedValues: selectedOptions.value.map(opt => opt.value),
      selectedOptions: selectedOptions.value,
      selectedIndexes: [...pickerValue.value]
  });
  emit('update:show', false);
};

const getSelectedOptions = () => {
  return selectedOptions.value;
};

watch(() => props.areaList, (newVal) => {
  if (newVal && Object.keys(newVal.province_list || {}).length) {
    const [provinces] = formatDataForCascade(newVal, props.columnsNum, props.columnsPlaceholder);
    displayColumns.value[0] = provinces;
    // Initialize with modelValue or defaults
    nextTick(() => {
        updatePickerValue(props.modelValue);
    });
  }
}, { immediate: true, deep: true });

watch(() => props.modelValue, (newCode, oldCode) => {
  if (newCode !== oldCode && props.show) {
      nextTick(() => {
        updatePickerValue(newCode);
      });
  }
}, { immediate: true });

watch(() => props.show, (newVal) => {
    if(newVal) {
        nextTick(() => {
            updatePickerValue(props.modelValue);
        });
    }
});

watch(() => props.columnsNum, () => {
    const [provinces] = formatDataForCascade(props.areaList, props.columnsNum, props.columnsPlaceholder);
    displayColumns.value[0] = provinces;
    displayColumns.value[1] = props.columnsNum > 1 ? (props.columnsPlaceholder.length > 1 && props.columnsPlaceholder[1] ? [makeOption(props.columnsPlaceholder[1], AREA_EMPTY_CODE)] : []) : [];
    displayColumns.value[2] = props.columnsNum > 2 ? (props.columnsPlaceholder.length > 2 && props.columnsPlaceholder[2] ? [makeOption(props.columnsPlaceholder[2], AREA_EMPTY_CODE)] : []) : [];
    nextTick(() => {
        updatePickerValue(props.modelValue);
    });
});

defineExpose({
  confirm: onConfirm,
  getSelectedOptions
});

</script>

<style lang="scss" scoped>
.zx-area {
  // Add any specific styles for the area component wrapper if needed
}

.zx-area__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  line-height: 44px;
  background-color: #fff; // Or your theme's toolbar background
  border-bottom: 1px solid #ebedf0; // Or your theme's border color

  &-title {
    font-size: 16px;
    font-weight: 500;
    color: #323233; // Or your theme's title color
    flex: 1;
    text-align: center;
  }

  &-button {
    padding: 0 15px;
    font-size: 14px;
    cursor: pointer;

    &--cancel {
      color: #969799; // Or your theme's cancel button color
    }

    &--confirm {
      color: #576b95; // Or your theme's confirm button color (e.g., primary color)
    }
  }
}

.zx-area__picker-view {
  width: 100%;
  height: 220px; // Default height, can be adjusted based on visibleItemCount and itemHeight
  background-color: #fff;
}

.zx-area__picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #323233;
  // height is controlled by indicator-style in picker-view
  // line-height should match itemHeight for vertical centering if not using flex
}
</style>