<template>
  <view class="zx-address-edit">
    <zx-form ref="formRef" :model="formData" :rules="formRules">
      <view class="zx-address-edit__fields">
        <zx-form-item label="联系人" name="name">
          <zx-input v-model="formData.name" placeholder="收货人姓名" @focus="onFocus('name')" @input="onInputChange('name', $event)" />
        </zx-form-item>
        <zx-form-item label="手机号" name="tel">
          <zx-input type="tel" v-model="formData.tel" placeholder="收货人手机号" :maxlength="props.telMaxlength" @focus="onFocus('tel')" @input="onInputChange('tel', $event)" />
        </zx-form-item>
        <zx-form-item v-if="props.showArea" label="地区" name="areaCode">
          <zx-area
            :area-list="props.areaList"
            :value="formData.areaCode"
            :columns-num="props.areaColumnsNum"
            :columns-placeholder="props.areaColumnsPlaceholder"
            @confirm="onAreaConfirm"
            @cancel="onAreaCancel"
            style="width: 100%;" 
          />
        </zx-form-item>
        <zx-form-item v-if="props.showDetail" label="详细地址" name="addressDetail">
          <zx-textarea
            v-model="formData.addressDetail"
            placeholder="街道门牌、楼层房间号等信息"
            auto-height
            :maxlength="props.detailMaxlength"
            :rows="props.detailRows"
            @focus="onFocus('addressDetail')"
            @blur="onDetailBlur"
            @input="onChangeDetail"
          />
        </zx-form-item>
        <view v-if="showSearchResultValue && searchResultComputed.length" class="zx-address-edit-detail__search-result">
          <view
            v-for="(item, index) in searchResultComputed"
            :key="index"
            class="zx-address-edit-detail__search-item"
            @click="onSelectSearchResult(item)"
          >
            <view class="zx-address-edit-detail__search-item-icon">
              <zx-icon name="location-o" size="16"></zx-icon>
            </view>
            <view class="zx-address-edit-detail__search-item-content">
              <view class="zx-address-edit-detail__search-item-name">{{ item.name }}</view>
              <view class="zx-address-edit-detail__search-item-address">{{ item.address }}</view>
            </view>
          </view>
        </view>

        <slot></slot>
      </view>

      <view v-if="props.showSetDefault && !hideBottomFields" class="zx-address-edit__default">
        <zx-cell title="设为默认地址" :border="false">
          <template #right-icon>
            <zx-switch :model-value="formData.isDefault" @update:modelValue="onDefaultChange" />
          </template>
        </zx-cell>
      </view>

      <view v-if="!hideBottomFields" class="zx-address-edit__buttons">
        <zx-button block round type="primary" :loading="props.isSaving" @click="onSave">
          {{ props.saveButtonText || '保存' }}
        </zx-button>
        <zx-button v-if="props.showDelete" block round :loading="props.isDeleting" @click="onDelete" custom-style="margin-top: 10px;">
          {{ props.deleteButtonText || '删除' }}
        </zx-button>
      </view>
    </zx-form>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';
import zxArea from '@tanzhenxing/zx-area/zx-area.vue';
import zxForm from '@tanzhenxing/zx-form/zx-form.vue';
import zxFormItem from '@tanzhenxing/zx-form-item/zx-form-item.vue';
import zxInput from '@tanzhenxing/zx-input/zx-input.vue';
import zxTextarea from '@tanzhenxing/zx-textarea/zx-textarea.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
import zxSwitch from '@tanzhenxing/zx-switch/zx-switch.vue';
import zxCell from '@tanzhenxing/zx-cell/zx-cell.vue';


const props = defineProps({
  areaList: { // 省市区数据
    type: Object,
    default: () => ({})
  },
  areaColumnsPlaceholder: {
    type: Array,
    default: () => []
  },
  areaPlaceholder: {
    type: String,
    default: '选择省 / 市 / 区'
  },
  addressInfo: { // 初始地址信息
    type: Object,
    default: () => ({})
  },
  searchResult: { // 详细地址搜索结果
    type: Array,
    default: () => []
  },
  showDelete: { // 是否显示删除按钮
    type: Boolean,
    default: false
  },
  showSetDefault: { // 是否显示默认地址栏
    type: Boolean,
    default: false
  },
  showSearchResult: { // 是否显示搜索结果
    type: Boolean,
    default: false
  },
  showArea: { // 是否显示地区选择
    type: Boolean,
    default: true
  },
  showDetail: { // 是否显示详细地址
    type: Boolean,
    default: true
  },
  disableArea: { // 是否禁用地区选择
    type: Boolean,
    default: false
  },
  saveButtonText: { // 保存按钮文字
    type: String,
    default: '保存'
  },
  deleteButtonText: { // 删除按钮文字
    type: String,
    default: '删除'
  },
  detailRows: { // 详细地址输入框行数
    type: [Number, String],
    default: 1
  },
  detailMaxlength: { // 详细地址最大长度
    type: [Number, String],
    default: 200
  },
  isSaving: { // 是否显示保存按钮加载动画
    type: Boolean,
    default: false
  },
  isDeleting: { // 是否显示删除按钮加载动画
    type: Boolean,
    default: false
  },
  telValidator: { // 手机号格式校验函数
    type: Function,
    default: (val) => /^1[3-9]\d{9}$/.test(val) // 默认手机号校验
  },
  telMaxlength: { // 手机号最大长度
    type: [Number, String],
    default: 11
  },
  validator: { // 自定义校验函数 (key, value) => string | boolean
    type: Function
  }
});

const emit = defineEmits([
  'save', 
  'focus', 
  'change', 
  'delete', 
  'select-search', 
  'click-area', 
  'change-area', 
  'change-detail', 
  'change-default'
]);

const DEFAULT_DATA = {
  name: '',
  tel: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  addressDetail: '',
  isDefault: false,
};

const formRef = ref(null);
const areaRef = ref(null); // areaRef 仍然可能被用于zx-area组件实例，暂时保留
const formData = reactive({ ...DEFAULT_DATA });
const detailFocused = ref(false);

// 初始化表单数据
watch(() => props.addressInfo, (newVal) => {
  Object.assign(formData, DEFAULT_DATA, newVal);
  if (newVal && newVal.areaCode && areaRef.value) {
    nextTick(() => {
        // 如果zx-area组件支持，可以在这里回显已选地区文字
    });
  }
}, { immediate: true, deep: true });

const areaText = computed(() => {
  if (formData.province && formData.city && formData.county) {
    const province = formData.province;
    const city = formData.city;
    const county = formData.county;
    if (province === city) {
        return `${province}/${county}`;
    }
    return `${province}/${city}/${county}`;
  }
  return '';
});

const searchResultComputed = computed(() => props.searchResult || []);
const showSearchResultValue = computed(() => props.showSearchResult && detailFocused.value && searchResultComputed.value.length > 0);

const hideBottomFields = computed(() => {
  return searchResultComputed.value.length && detailFocused.value && props.showSearchResult;
});

const formRules = computed(() => {
  const rules = {};
  const requiredRule = (message) => ({ required: true, message, trigger: ['blur', 'change'] });

  if (!props.validator) {
    rules.name = [requiredRule('请填写姓名')];
    rules.tel = [
      requiredRule('请填写手机号'),
      { validator: props.telValidator, message: '手机号格式错误', trigger: ['blur', 'change'] }
    ];
    if (props.showArea) {
      rules.areaCode = [requiredRule('请选择所在地区')];
    }
    if (props.showDetail) {
      rules.addressDetail = [requiredRule('请填写详细地址')];
    }
  } else {
    const customRule = (key, message) => ({
        validator: (rule, value, callback) => {
            const errorMsg = props.validator(key, value);
            if (typeof errorMsg === 'string') {
                callback(new Error(errorMsg));
            } else if (errorMsg === false) {
                callback(new Error(message));
            } else {
                callback();
            }
        },
        trigger: ['blur', 'change']
    });
    rules.name = [customRule('name', '请填写姓名')];
    rules.tel = [customRule('tel', '手机号格式错误')];
    if (props.showArea) {
      rules.areaCode = [customRule('areaCode', '请选择所在地区')];
    }
    if (props.showDetail) {
      rules.addressDetail = [customRule('addressDetail', '请填写详细地址')];
    }
  }
  return rules;
});

const onFocus = (key) => {
  detailFocused.value = key === 'addressDetail';
  emit('focus', key);
};

const onInputChange = (key, value) => {
  // v-model已经更新了formData，这里主要触发change事件
  emit('change', { key, value });
};

const onChangeDetail = (value) => {
  // v-model已经更新了formData.addressDetail
  // 如果zx-textarea的input事件参数是event，需要从event.detail.value取值
  // 假设zx-textarea的input事件直接返回value
  formData.addressDetail = typeof value === 'object' && value.detail ? value.detail.value : value;
  emit('change-detail', formData.addressDetail);
};

const onDetailBlur = () => {
  // 延迟隐藏搜索结果，以便点击事件能够触发
  setTimeout(() => {
    detailFocused.value = false;
  }, 100);
};

const onAreaConfirm = (selectedOptions) => {
  // selectedOptions 格式： [{text:'省',value:'xxx'}, {text:'市',value:'yyy'}, {text:'区',value:'zzz'}]
  // 或者根据zx-area的实际返回格式调整
  if (selectedOptions && selectedOptions.length) {
    formData.province = selectedOptions[0]?.text || '';
    formData.city = selectedOptions[1]?.text || '';
    formData.county = selectedOptions[2]?.text || '';
    formData.areaCode = selectedOptions[selectedOptions.length - 1]?.value || '';
    // 强制触发表单校验
    if (formRef.value) {
        formRef.value.validateField('areaCode');
    }
  } else { // 处理只选择了部分的情况，或者zx-area返回空数组
    formData.province = '';
    formData.city = '';
    formData.county = '';
    formData.areaCode = '';
  }
  emit('change-area', selectedOptions);
};

const onAreaCancel = (selectedOptions) => {
  // 如果zx-area组件直接嵌入，取消事件由其自身处理，父组件可能不需要额外操作
  // emit('cancel-area', selectedOptions); // 视情况保留或移除
};

const onDefaultChange = (value) => {
  formData.isDefault = value;
  emit('change-default', value);
};

const onSelectSearchResult = (item) => {
  formData.addressDetail = `${item.address || ''} ${item.name || ''}`.trim();
  detailFocused.value = false; // 选择后隐藏搜索结果
  emit('select-search', item);
  emit('change-detail', formData.addressDetail);
};

const onSave = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
    emit('save', { ...formData });
  } catch (errors) {
    // 校验失败，zx-form组件内部通常会自动提示
    console.log('校验失败', errors);
    // 可以选择在这里统一处理，或者依赖zx-form的提示
    // uni.showToast({ title: errors[0]?.message || '请检查表单', icon: 'none' });
  }
};

const onDelete = () => {
  emit('delete', { ...formData });
};

// 暴露方法给父组件
defineExpose({
  setAddressDetail: (value) => {
    formData.addressDetail = value;
  },
  setAreaCode: (code) => {
    formData.areaCode = code;
    // 可能需要根据code反查省市区文本，如果zx-area支持
    // areaRef.value?.setCode(code) 然后获取文本
    // 暂时简单处理，不反显文本，只更新areaCode
    if (formRef.value) {
        formRef.value.validateField('areaCode');
    }
  },
  validate: () => {
    return formRef.value?.validate();
  },
  resetValidation: () => {
    formRef.value?.resetValidation();
  },
  getValues: () => {
    return { ...formData };
  }
});

</script>

<style lang="scss" scoped>
.zx-address-edit {
  background-color: #f8f8f8; // 更接近截图的背景色
  min-height: 100vh; // 确保内容区域至少撑满屏幕
  padding-bottom: calc(160rpx + constant(safe-area-inset-bottom)); // 增加底部按钮区域高度
  padding-bottom: calc(160rpx + env(safe-area-inset-bottom));
}

.zx-address-edit__fields {
  background-color: #fff;
  // margin: 24rpx; // 调整外边距
  // border-radius: 16rpx; // 调整圆角
  // overflow: hidden; // 移除，让form-item的边框可以显示
  // padding: 0 24rpx; // 调整内边距
}

// 针对 zx-form-item 的样式调整，如果zx-form-item支持自定义class或style更好
// 这里假设 zx-form-item 内部的 label 和 input 区域可以通过 uniapp 的 deep selector 修改
:deep(.zx-form-item) {
  padding: 20rpx 0; // 调整上下内边距
  border-bottom: 1rpx solid #f0f0f0; // 添加底部分割线，颜色更浅一些

  &:last-child {
    border-bottom: none;
  }

  .zx-form-item__label {
    width: 140rpx !important; // 固定标签宽度，增加一点宽度
    color: #303133; // vant 风格的标签颜色
    font-size: 28rpx;
    margin-right: 20rpx; // 标签和内容的间距
  }
  .zx-form-item__content {
    .zx-input__inner,
    .zx-input__input, // 兼容不同input组件的class
    .zx-textarea__inner,
    .zx-textarea__textarea { // 兼容不同textarea组件的class
      text-align: left !important; // 输入内容左对齐
      font-size: 28rpx !important;
      color: #303133; // 输入文字颜色
    }
    .zx-input__placeholder,
    .zx-textarea__placeholder {
        color: #c0c4cc; // placeholder颜色
    }
  }
}

.zx-address-edit__area-display {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 28rpx;
  color: #303133;
  line-height: 1.5; // 与输入框行高类似
  padding: 10rpx 0; // 模拟输入框的上下padding
}

.zx-address-edit__area-display--placeholder {
  color: #c0c4cc; // placeholder颜色
}


.zx-address-edit__fields {
  padding: 0 30rpx; // 调整内边距以匹配截图
}

.zx-address-edit__default {
  margin: 24rpx 30rpx; // 调整外边距以匹配截图
  border-radius: 16rpx;
  overflow: hidden;
  background-color: #fff;
  // 确保 zx-cell 内部样式符合截图
  :deep(.zx-cell) {
    padding: 24rpx 30rpx !important;
    .zx-cell__title {
        font-size: 28rpx;
        color: #303133;
    }
  }
}

.zx-address-edit__buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: #f8f8f8; // 与页面背景色一致
  display: flex;
  flex-direction: column;
  gap: 20rpx; // 按钮之间的间距
}

// 针对 zx-button 的样式调整
:deep(.zx-button--primary) {
  background-color: #007aff !important; // 主题蓝色
  border-color: #007aff !important;
  color: #fff !important;
  height: 88rpx !important; // 调整按钮高度
  line-height: 88rpx !important;
  font-size: 32rpx !important;
}

:deep(.zx-button.zx-button--default) { // 确保选择器正确，删除按钮是默认样式且无type
  background-color: #fff !important;
  border: 1rpx solid #dddee1 !important; // 截图中的删除按钮有边框
  color: #303133 !important;
  height: 88rpx !important; // 调整按钮高度
  line-height: 88rpx !important;
  font-size: 32rpx !important;
}

.zx-address-edit-detail__search-result {
  background-color: #fff;
  max-height: 400rpx; // 增加最大高度
  overflow-y: auto;
  // box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1); // 添加轻微阴影
  // border-radius: 0 0 16rpx 16rpx; // 如果希望在输入框下方显示，可以添加圆角
  margin: 0 24rpx; // 与fields对齐
}

.zx-address-edit-detail__search-item {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  border-bottom: 1rpx solid #f7f8fa;
  background-color: #fff;

  &:last-child {
    border-bottom: none;
  }
}

.zx-address-edit-detail__search-item-icon {
  margin-right: 16rpx;
  color: #969799;
}

.zx-address-edit-detail__search-item-content {
  flex: 1;
  min-width: 0; // 防止内容溢出
}

.zx-address-edit-detail__search-item-name {
  font-size: 28rpx;
  color: #323233;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.zx-address-edit-detail__search-item-address {
  font-size: 24rpx;
  color: #969799;
  margin-top: 8rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>