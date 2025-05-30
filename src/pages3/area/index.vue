<template>
  <view class="area-demo">
    <view class="demo-section">
      <view class="demo-title">基本用法</view>
      <view class="demo-item" @click="showPicker1 = true">
        <text>当前选择：{{ selectedArea1 || '未选择' }}</text>
        <text class="arrow">></text>
      </view>
      <zx-area
        :show="showPicker1"
        v-model="selectedCode1"
        :area-list="areaListData"
        @confirm="handleConfirm1"
        @cancel="showPicker1 = false"
        @change="handleChange1"
        @update:show="s => showPicker1 = s"
      />
    </view>

    <view class="demo-section">
      <view class="demo-title">配置显示列数 (省市)</view>
      <view class="demo-item" @click="showPicker2 = true">
        <text>当前选择：{{ selectedArea2 || '未选择' }}</text>
        <text class="arrow">></text>
      </view>
      <zx-area
        :show="showPicker2"
        v-model="selectedCode2"
        :area-list="areaListData"
        :columns-num="2"
        title="选择省市"
        @confirm="handleConfirm2"
        @cancel="showPicker2 = false"
        @update:show="s => showPicker2 = s"
      />
    </view>

    <view class="demo-section">
      <view class="demo-title">配置列占位提示文字</view>
      <view class="demo-item" @click="showPicker3 = true">
        <text>当前选择：{{ selectedArea3 || '未选择' }}</text>
        <text class="arrow">></text>
      </view>
      <zx-area
        :show="showPicker3"
        v-model="selectedCode3"
        :area-list="areaListData"
        :columns-placeholder="['选省份', '选城市', '选区县']"
        @confirm="handleConfirm3"
        @cancel="showPicker3 = false"
        @update:show="s => showPicker3 = s"
      />
    </view>
    
    <view class="demo-section">
      <view class="demo-title">通过方法获取选中项</view>
      <view class="demo-item" @click="showPicker4 = true">
        <text>点击打开，确认后查看控制台</text>
        <text class="arrow">></text>
      </view>
       <button @click="getSelectedOptionsManual">手动获取选中项</button>
      <zx-area
        ref="areaRef4"
        :show="showPicker4"
        v-model="selectedCode4"
        :area-list="areaListData"
        @confirm="handleConfirm4"
        @cancel="showPicker4 = false"
        @update:show="s => showPicker4 = s"
      />
    </view>

     <view class="demo-section">
      <view class="demo-title">只显示省份</view>
      <view class="demo-item" @click="showPicker5 = true">
        <text>当前选择：{{ selectedArea5 || '未选择' }}</text>
        <text class="arrow">></text>
      </view>
      <zx-area
        :show="showPicker5"
        v-model="selectedCode5"
        :area-list="areaListData"
        :columns-num="1"
        title="选择省份"
        @confirm="handleConfirm5"
        @cancel="showPicker5 = false"
        @update:show="s => showPicker5 = s"
      />
    </view>

  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 导入数据 @vant/area-data 
import { areaList as vantAreaData } from '@vant/area-data';

const areaListData = ref({}); // Initialize as an empty object, will be populated

// --- Data Loading --- 
onMounted(() => {
  if (vantAreaData && Object.keys(vantAreaData.province_list || {}).length > 0) {
    areaListData.value = vantAreaData;
    console.log('成功加载 @vant/area-data');
  } else {
    console.warn('加载 @vant/area-data 失败或数据为空，使用内置精简数据。');
    areaListData.value = {
      province_list: {
        110000: '北京市',
        120000: '天津市',
        310000: '上海市',
        330000: '浙江省',
        440000: '广东省',
      },
      city_list: {
        110100: '北京市',
        120100: '天津市',
        310100: '上海市',
        330100: '杭州市',
        330200: '宁波市',
        330300: '温州市',
        440100: '广州市',
        440300: '深圳市',
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
        310101: '黄浦区',
        330102: '上城区',
        330103: '下城区',
        330106: '西湖区',
        330203: '海曙区',
        330205: '江北区',
        330302: '鹿城区',
        440103: '荔湾区',
        440104: '越秀区',
        440303: '罗湖区',
        440304: '福田区',
      },
    };
  }
  // Re-initialize display values after data is loaded
  initDisplay();
});

const showPicker1 = ref(false);
const selectedCode1 = ref('330102'); // 默认选中 浙江省 - 杭州市 - 上城区
const selectedArea1 = ref('');

const showPicker2 = ref(false);
const selectedCode2 = ref('440100'); // 默认选中 广东省 - 广州市
const selectedArea2 = ref('');

const showPicker3 = ref(false);
const selectedCode3 = ref('');
const selectedArea3 = ref('');

const showPicker4 = ref(false);
const selectedCode4 = ref('110101');
const areaRef4 = ref(null);

const showPicker5 = ref(false);
const selectedCode5 = ref('310000'); // 默认选中 上海市
const selectedArea5 = ref('');

const formatSelectedArea = (options) => {
  return options.map(opt => opt.text).join(' / ');
};

// --- Picker 1 Callbacks ---
const handleConfirm1 = (data) => {
  console.log('Picker 1 Confirmed:', data);
  selectedArea1.value = formatSelectedArea(data.selectedOptions);
  selectedCode1.value = data.selectedValues[data.selectedValues.length -1];
  showPicker1.value = false;
};
const handleChange1 = (data) => {
  console.log('Picker 1 Changed:', data);
};

// --- Picker 2 Callbacks ---
const handleConfirm2 = (data) => {
  console.log('Picker 2 Confirmed:', data);
  selectedArea2.value = formatSelectedArea(data.selectedOptions);
  selectedCode2.value = data.selectedValues[data.selectedValues.length -1];
  showPicker2.value = false;
};

// --- Picker 3 Callbacks ---
const handleConfirm3 = (data) => {
  console.log('Picker 3 Confirmed:', data);
  if (data.selectedOptions && data.selectedOptions.length > 0) {
      selectedArea3.value = formatSelectedArea(data.selectedOptions);
      selectedCode3.value = data.selectedValues[data.selectedValues.length -1];
  } else {
      selectedArea3.value = '未选择有效地区';
      selectedCode3.value = '';
  }
  showPicker3.value = false;
};

// --- Picker 4 Callbacks ---
const handleConfirm4 = (data) => {
  console.log('Picker 4 Confirmed:', data);
  const options = areaRef4.value?.getSelectedOptions();
  console.log('Manually getSelectedOptions after confirm:', options);
  showPicker4.value = false;
};

const getSelectedOptionsManual = () => {
    if (areaRef4.value) {
        const currentOptions = areaRef4.value.getSelectedOptions();
        console.log('Manually triggered getSelectedOptions:', currentOptions);
        uni.showToast({
            title: '选中项已打印到控制台',
            icon: 'none'
        })
    } else {
        console.log('areaRef4 is not available');
    }
}

// --- Picker 5 Callbacks ---
const handleConfirm5 = (data) => {
  console.log('Picker 5 Confirmed:', data);
  selectedArea5.value = formatSelectedArea(data.selectedOptions);
  selectedCode5.value = data.selectedValues[data.selectedValues.length -1];
  showPicker5.value = false;
};

// Initialize display values based on initial codes
const initDisplay = () => {
    // Helper to find options based on code for initial display
    const getOptionsByCode = (code, list) => {
        if (!code || !list || !list.province_list || Object.keys(list.province_list).length === 0) return [];
        const provinceCode = `${code.slice(0, 2)}0000`;
        const cityCode = `${code.slice(0, 4)}00`;
        const countyCode = code;

        const options = [];
        if (list.province_list[provinceCode]) {
            options.push({ text: list.province_list[provinceCode], value: provinceCode });
        }
        if (list.city_list[cityCode] && code.length >= 4) {
            options.push({ text: list.city_list[cityCode], value: cityCode });
        }
        if (list.county_list[countyCode] && code.length >= 6) {
            options.push({ text: list.county_list[countyCode], value: countyCode });
        }
        return options;
    };

    if (selectedCode1.value) selectedArea1.value = formatSelectedArea(getOptionsByCode(selectedCode1.value, areaListData.value));
    if (selectedCode2.value) selectedArea2.value = formatSelectedArea(getOptionsByCode(selectedCode2.value, areaListData.value).slice(0,2)); // only province and city
    if (selectedCode3.value) selectedArea3.value = formatSelectedArea(getOptionsByCode(selectedCode3.value, areaListData.value));
    if (selectedCode5.value) selectedArea5.value = formatSelectedArea(getOptionsByCode(selectedCode5.value, areaListData.value).slice(0,1)); // only province
};

// initDisplay(); // Call initDisplay in onMounted after data is ready

</script>

<style lang="scss" scoped>
.area-demo {
  padding: 15px;
  background-color: #f7f8fa;
}

.demo-section {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 15px;
}

.demo-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.demo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 14px;
  color: #323233;
  border-bottom: 1px solid #ebedf0;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  .arrow {
    color: #969799;
    font-size: 16px;
  }
}

button {
    margin: 10px 0;
    font-size: 14px;
}
</style>