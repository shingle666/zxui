<template>
  <view @touchmove.stop.prevent="stop">
    <!-- 遮罩层 -->
    <view
      class="zx-cascader__mask"
      :class="{ 'zx-cascader__mask--show': show }"
      :style="getStyles"
      @tap.stop="maskClose"
    ></view>

    <!-- 级联选择器主体 -->
    <view
      class="zx-cascader__wrap"
      :class="{ 'zx-cascader__wrap--show': show }"
      :style="{
        borderTopLeftRadius: radius + 'rpx',
        borderTopRightRadius: radius + 'rpx',
        background: background,
        zIndex: zIndex,
      }"
    >
      <!-- 头部工具栏 -->
      <view
        class="zx-cascader__header"
        :style="{
          background: background,
          borderTopLeftRadius: radius + 'rpx',
          borderTopRightRadius: radius + 'rpx',
        }"
      >
        <text
          class="zx-cascader__header-text"
          :style="{
            fontSize: titleSize + 'rpx',
            color: titleColor,
            fontWeight: fontWeight,
          }"
          >{{ title }}</text
        >
        <view class="zx-cascader__header-close" @tap.stop="handleClose">
          <icon type="clear" color="#ccc" :size="16"></icon>
        </view>
        <view
          class="zx-cascader__header-line"
          :style="{ background: dividerColor }"
        ></view>
      </view>

      <!-- 级联选择区域 -->
      <view class="zx-cascader__content" :style="{ height: height + 'rpx' }">
        <!-- 层级标签 -->
        <view v-if="showTabs" class="zx-cascader__tabs">
          <view
            v-for="(tab, index) in activeTabs"
            :key="index"
            class="zx-cascader__tab"
            :class="{ 'zx-cascader__tab--active': index === activeTabIndex }"
            :style="{ color: index === activeTabIndex ? activeColor : tabColor }"
            @tap="switchTab(index)"
          >
            {{ tab }}
          </view>
        </view>

        <!-- 选项列表 -->
        <scroll-view
          scroll-y
          class="zx-cascader__scroll"
          :show-scrollbar="false"
          :style="{ height: (showTabs ? height - 80 : height) + 'rpx' }"
        >
          <view class="zx-cascader__list">
            <view
              v-for="(item, index) in currentOptions"
              :key="getItemKey(item, index)"
              class="zx-cascader__item"
              :class="{
                'zx-cascader__item--active': isItemSelected(item),
                'zx-cascader__item--disabled': item[disabledKey],
              }"
              :style="{ padding: padding }"
              @tap="selectItem(item, index)"
            >
              <!-- 选项内容 -->
              <view class="zx-cascader__item-content">
                <!-- 图标 -->
                <view
                  v-if="item[iconKey]"
                  class="zx-cascader__icon"
                  :style="{ width: iconSize + 'rpx', height: iconSize + 'rpx' }"
                >
                  <image
                    :src="item[iconKey]"
                    :style="{ width: iconSize + 'rpx', height: iconSize + 'rpx' }"
                    mode="aspectFit"
                  />
                </view>

                <!-- 文本 -->
                <text
                  class="zx-cascader__item-text"
                  :style="{
                    fontSize: size + 'rpx',
                    color: isItemSelected(item)
                      ? activeColor
                      : item[disabledKey]
                      ? disabledColor
                      : color,
                  }"
                  >{{ item[labelKey] }}</text
                >

                <!-- 右侧箭头或选中图标 -->
                <view class="zx-cascader__item-suffix">
                  <!-- 多选模式的复选框 -->
                  <view
                    v-if="multiple && !checkStrictly"
                    class="zx-cascader__checkbox"
                    :class="{ 'zx-cascader__checkbox--checked': item.checked }"
                    :style="{
                      background: item.checked ? checkboxColor : 'transparent',
                      borderColor: item.checked ? checkboxColor : borderColor,
                    }"
                  >
                    <view
                      v-if="item.checked"
                      class="zx-cascader__checkmark"
                      :style="{
                        borderBottomColor: checkmarkColor,
                        borderRightColor: checkmarkColor,
                      }"
                    ></view>
                  </view>

                  <!-- 有子级的箭头 -->
                  <view v-else-if="hasChildren(item)" class="zx-cascader__arrow">
                    <icon
                      type="clear"
                      color="#ccc"
                      :size="12"
                      style="transform: rotate(-90deg)"
                    ></icon>
                  </view>

                  <!-- 单选模式的选中标记 -->
                  <view
                    v-else-if="!multiple && isItemSelected(item)"
                    class="zx-cascader__check"
                  >
                    <icon type="success_no_circle" :color="activeColor" :size="16"></icon>
                  </view>
                </view>
              </view>

              <!-- 分割线 -->
              <view
                v-if="dividerLine && index < currentOptions.length - 1"
                class="zx-cascader__item-line"
                :style="{ background: dividerColor }"
              ></view>
            </view>

            <!-- 空状态 -->
            <view v-if="currentOptions.length === 0" class="zx-cascader__empty">
              <text
                class="zx-cascader__empty-text"
                :style="{ color: '#999', fontSize: '28rpx' }"
              >
                {{ emptyText }}
              </text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 底部按钮 -->
      <view class="zx-cascader__footer">
        <view class="zx-cascader__btn-group">
          <view
            class="zx-cascader__btn zx-cascader__btn--cancel"
            :style="{ color: cancelColor }"
            @tap.stop="handleCancel"
          >
            {{ cancelText }}
          </view>
          <view
            class="zx-cascader__btn zx-cascader__btn--confirm"
            :style="{ background: confirmBackground, color: confirmColor }"
            @tap.stop="handleConfirm"
          >
            {{ confirmText }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";

// 定义 props
const props = defineProps({
  // 是否显示
  show: {
    type: Boolean,
    default: false,
  },
  // 选项数据源
  options: {
    type: Array,
    default: () => [],
  },
  // 选中的值
  value: {
    type: Array,
    default: () => [],
  },
  // 高度
  height: {
    type: [Number, String],
    default: 600,
  },
  // 圆角
  radius: {
    type: [Number, String],
    default: 24,
  },
  // 标题
  title: {
    type: String,
    default: "请选择",
  },
  // 标题字体大小
  titleSize: {
    type: [Number, String],
    default: 32,
  },
  // 标题颜色
  titleColor: {
    type: String,
    default: "#333",
  },
  // 标题字重
  fontWeight: {
    type: [Number, String],
    default: 400,
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 是否严格的遵守父子节点不互相关联
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  // 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组
  emitPath: {
    type: Boolean,
    default: true,
  },
  // 背景色
  background: {
    type: String,
    default: "#fff",
  },
  // 内边距
  padding: {
    type: String,
    default: "30rpx",
  },
  // 选择框选中后颜色
  checkboxColor: {
    type: String,
    default: "#5677fc",
  },
  // 边框颜色
  borderColor: {
    type: String,
    default: "#ccc",
  },
  // 对勾颜色
  checkmarkColor: {
    type: String,
    default: "#fff",
  },
  // 分割线
  dividerLine: {
    type: Boolean,
    default: true,
  },
  // 分割线颜色
  dividerColor: {
    type: String,
    default: "#EEEEEE",
  },
  // 图标大小
  iconSize: {
    type: [Number, String],
    default: 48,
  },
  // 字体大小
  size: {
    type: [Number, String],
    default: 30,
  },
  // 字体颜色
  color: {
    type: String,
    default: "#333",
  },
  // 激活颜色
  activeColor: {
    type: String,
    default: "#5677fc",
  },
  // 禁用颜色
  disabledColor: {
    type: String,
    default: "#c0c4cc",
  },
  // 标签页颜色
  tabColor: {
    type: String,
    default: "#666",
  },
  // 是否显示标签页
  showTabs: {
    type: Boolean,
    default: true,
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: "取消",
  },
  // 取消按钮颜色
  cancelColor: {
    type: String,
    default: "#666",
  },
  // 确认按钮文字
  confirmText: {
    type: String,
    default: "确定",
  },
  // 确认按钮背景色
  confirmBackground: {
    type: String,
    default: "#5677fc",
  },
  // 确认按钮颜色
  confirmColor: {
    type: String,
    default: "#fff",
  },
  // 遮罩背景
  maskBackground: {
    type: String,
    default: "rgba(0,0,0,.6)",
  },
  // 点击遮罩是否关闭
  maskClosable: {
    type: Boolean,
    default: false,
  },
  // 层级
  zIndex: {
    type: [Number, String],
    default: 1000,
  },
  // 空状态文字
  emptyText: {
    type: String,
    default: "暂无数据",
  },
  // 自定义字段名配置
  props: {
    type: Object,
    default: () => ({
      value: "value",
      label: "label",
      children: "children",
      disabled: "disabled",
      icon: "icon",
    }),
  },
});

// 定义 emits
const emit = defineEmits(["update:value", "change", "close", "confirm", "cancel"]);

// 字段名配置
const valueKey = computed(() => props.props.value || "value");
const labelKey = computed(() => props.props.label || "label");
const childrenKey = computed(() => props.props.children || "children");
const disabledKey = computed(() => props.props.disabled || "disabled");
const iconKey = computed(() => props.props.icon || "icon");

// 响应式数据
const selectedPath = ref([]); // 选中路径
const currentLevel = ref(0); // 当前层级
const activeTabIndex = ref(0); // 当前激活的标签页
const internalValue = ref([]); // 内部值
const levelOptions = ref([]); // 各层级选项

// 计算属性
const getStyles = computed(() => {
  return `background:${props.maskBackground};z-index:${Number(props.zIndex) - 1};`;
});

// 当前显示的选项
const currentOptions = computed(() => {
  return levelOptions.value[currentLevel.value] || [];
});

// 激活的标签页
const activeTabs = computed(() => {
  const tabs = ["请选择"];
  selectedPath.value.forEach((item, index) => {
    if (item && item[labelKey.value]) {
      tabs[index] = item[labelKey.value];
    }
    if (index < selectedPath.value.length - 1 || hasChildren(item)) {
      tabs.push("请选择");
    }
  });
  return tabs;
});

// 初始化数据
const initData = () => {
  selectedPath.value = [];
  currentLevel.value = 0;
  activeTabIndex.value = 0;
  levelOptions.value = [props.options];
  internalValue.value = [...props.value];

  // 根据初始值设置选中路径
  if (props.value && props.value.length > 0) {
    buildSelectedPath();
  }
};

// 构建选中路径
const buildSelectedPath = () => {
  let currentOptions = props.options;
  let path = [];

  for (let i = 0; i < props.value.length; i++) {
    const value = props.value[i];
    const item = currentOptions.find((option) => option[valueKey.value] === value);

    if (item) {
      path.push(item);
      if (hasChildren(item)) {
        currentOptions = item[childrenKey.value];
        levelOptions.value[i + 1] = currentOptions;
      }
    } else {
      break;
    }
  }

  selectedPath.value = path;
  currentLevel.value = path.length;
  activeTabIndex.value = path.length;
};

// 判断是否有子级
const hasChildren = (item) => {
  return (
    item && Array.isArray(item[childrenKey.value]) && item[childrenKey.value].length > 0
  );
};

// 判断选项是否被选中
const isItemSelected = (item) => {
  if (props.multiple) {
    return item.checked;
  }
  return (
    selectedPath.value[currentLevel.value] &&
    selectedPath.value[currentLevel.value][valueKey.value] === item[valueKey.value]
  );
};

// 获取选项key
const getItemKey = (item, index) => {
  return item[valueKey.value] || index;
};

// 选择选项
const selectItem = (item, index) => {
  if (item[disabledKey.value]) return;

  if (props.multiple) {
    handleMultipleSelect(item);
  } else {
    handleSingleSelect(item, index);
  }
};

// 单选模式选择
const handleSingleSelect = (item, index) => {
  // 更新选中路径
  selectedPath.value = selectedPath.value.slice(0, currentLevel.value);
  selectedPath.value[currentLevel.value] = item;

  if (hasChildren(item)) {
    // 有子级，展开下一级
    currentLevel.value++;
    activeTabIndex.value = currentLevel.value;
    levelOptions.value[currentLevel.value] = item[childrenKey.value];
  } else {
    // 没有子级，选择完成
    updateValue();
    if (!props.multiple) {
      emit("change", getEmitValue());
    }
  }
};

// 多选模式选择
const handleMultipleSelect = (item) => {
  item.checked = !item.checked;

  if (props.checkStrictly) {
    // 严格模式，不关联父子
    updateMultipleValue();
  } else {
    // 非严格模式，关联父子
    handleParentChildCheck(item);
  }
};

// 处理父子关联选择
const handleParentChildCheck = (item) => {
  // 处理子级选中状态
  if (hasChildren(item)) {
    setChildrenChecked(item[childrenKey.value], item.checked);
  }

  // 处理父级选中状态
  updateParentChecked();
  updateMultipleValue();
};

// 设置子级选中状态
const setChildrenChecked = (children, checked) => {
  children.forEach((child) => {
    if (!child[disabledKey.value]) {
      child.checked = checked;
      if (hasChildren(child)) {
        setChildrenChecked(child[childrenKey.value], checked);
      }
    }
  });
};

// 更新父级选中状态
const updateParentChecked = () => {
  // 递归更新所有父级的选中状态
  const updateParent = (options) => {
    options.forEach((item) => {
      if (hasChildren(item)) {
        const children = item[childrenKey.value].filter(
          (child) => !child[disabledKey.value]
        );
        const checkedChildren = children.filter((child) => child.checked);

        if (checkedChildren.length === 0) {
          item.checked = false;
        } else if (checkedChildren.length === children.length) {
          item.checked = true;
        } else {
          item.checked = false; // 或者设置为半选状态
        }

        updateParent(item[childrenKey.value]);
      }
    });
  };

  updateParent(props.options);
};

// 更新多选值
const updateMultipleValue = () => {
  const getCheckedValues = (options, path = []) => {
    let values = [];
    options.forEach((item) => {
      const currentPath = [...path, item[valueKey.value]];
      if (item.checked) {
        values.push(props.emitPath ? currentPath : item[valueKey.value]);
      }
      if (hasChildren(item)) {
        values.push(...getCheckedValues(item[childrenKey.value], currentPath));
      }
    });
    return values;
  };

  internalValue.value = getCheckedValues(props.options);
};

// 更新单选值
const updateValue = () => {
  const path = selectedPath.value.map((item) => item[valueKey.value]);
  internalValue.value = props.emitPath ? path : path[path.length - 1] || "";
};

// 获取要emit的值
const getEmitValue = () => {
  return internalValue.value;
};

// 切换标签页
const switchTab = (index) => {
  if (index <= selectedPath.value.length) {
    currentLevel.value = index;
    activeTabIndex.value = index;
  }
};

// 确认选择
const handleConfirm = () => {
  if (!props.multiple) {
    updateValue();
  }

  const value = getEmitValue();
  emit("update:value", value);
  emit("confirm", {
    value: value,
    selectedPath: selectedPath.value,
  });
  emit("change", value);
  handleClose();
};

// 取消选择
const handleCancel = () => {
  emit("cancel");
  handleClose();
};

// 关闭弹窗
const handleClose = () => {
  emit("close");
};

// 遮罩点击
const maskClose = () => {
  if (props.maskClosable) {
    handleClose();
  }
};

// 防止滑动穿透
const stop = () => {};

// 监听显示状态
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      initData();
    }
  }
);

// 监听选项数据变化
watch(
  () => props.options,
  () => {
    initData();
  },
  { deep: true }
);

// 监听值变化
watch(
  () => props.value,
  () => {
    if (props.show) {
      initData();
    }
  },
  { deep: true }
);

// 组件挂载
onMounted(() => {
  initData();
});
</script>

<style scoped>
.zx-cascader__mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all ease-in-out 0.3s;
  visibility: hidden;
  opacity: 0;
}

.zx-cascader__mask--show {
  opacity: 1;
  visibility: visible;
}

.zx-cascader__wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  transform: translate3d(0, 100%, 0);
  transition: all 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  flex-direction: column;
}

.zx-cascader__wrap--show {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

.zx-cascader__header {
  width: 100%;
  display: flex;
  height: 98rpx;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.zx-cascader__header-line {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 0 100%;
  z-index: 1;
}

.zx-cascader__header-text {
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  padding: 0 88rpx;
}

.zx-cascader__header-close {
  width: 50rpx;
  height: 50rpx;
  position: absolute;
  right: 32rpx;
  top: 24rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-cascader__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.zx-cascader__tabs {
  display: flex;
  height: 80rpx;
  align-items: center;
  padding: 0 32rpx;
  border-bottom: 1px solid #eeeeee;
  flex-shrink: 0;
}

.zx-cascader__tab {
  font-size: 28rpx;
  padding: 0 24rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 30rpx;
  margin-right: 16rpx;
  background: #f8f8f8;
  transition: all 0.3s;
}

.zx-cascader__tab--active {
  background: #e8f3ff;
}

.zx-cascader__scroll {
  flex: 1;
  width: 100%;
}

.zx-cascader__list {
  width: 100%;
}

.zx-cascader__item {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.zx-cascader__item--disabled {
  opacity: 0.5;
}

.zx-cascader__item-content {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 88rpx;
}

.zx-cascader__icon {
  margin-right: 24rpx;
  flex-shrink: 0;
}

.zx-cascader__item-text {
  flex: 1;
  word-break: break-all;
}

.zx-cascader__item-suffix {
  margin-left: 24rpx;
  display: flex;
  align-items: center;
}

.zx-cascader__checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-cascader__checkbox--checked {
  border-color: transparent;
}

.zx-cascader__checkmark {
  width: 20rpx;
  height: 32rpx;
  border-bottom: 3rpx solid;
  border-right: 3rpx solid;
  transform: rotate(45deg) scale(0.5);
}

.zx-cascader__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-cascader__check {
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-cascader__item-line {
  height: 1px;
  margin-left: 32rpx;
  transform: scaleY(0.5);
  transform-origin: 0 100%;
}

.zx-cascader__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200rpx;
}

.zx-cascader__empty-text {
  color: #999;
  font-size: 28rpx;
}

.zx-cascader__footer {
  border-top: 1px solid #eeeeee;
  padding: 32rpx;
  flex-shrink: 0;
}

.zx-cascader__btn-group {
  display: flex;
  gap: 32rpx;
}

.zx-cascader__btn {
  flex: 1;
  height: 84rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 42rpx;
  font-size: 32rpx;
  font-weight: 500;
}

.zx-cascader__btn--cancel {
  background: #f8f8f8;
}

.zx-cascader__btn--confirm {
  color: #fff;
}

/* 激活状态 */
.zx-cascader__item--active .zx-cascader__item-content {
  background: rgba(86, 119, 252, 0.1);
}

/* 响应式 */
/* #ifdef H5 */
.zx-cascader__item-content:hover {
  background: rgba(0, 0, 0, 0.05);
}

.zx-cascader__btn {
  cursor: pointer;
}

.zx-cascader__tab {
  cursor: pointer;
}

.zx-cascader__header-close {
  cursor: pointer;
}
/* #endif */
</style>
