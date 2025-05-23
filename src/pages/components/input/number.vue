<template>
  <div class="demo-container">
    <h1>ZxInputNumber 数字输入框组件演示</h1>
    
    <section class="demo-section">
      <h2>基础用法</h2>
      <p>要使用它，只需要在 <code>&lt;zx-input-number&gt;</code> 元素中使用 <code>v-model</code> 绑定变量即可</p>
      <zx-input-number v-model="basicValue" :min="1" :max="10" @change="handleChange" />
      <p>当前值: {{ basicValue }}</p>
    </section>

    <section class="demo-section">
      <h2>禁用状态</h2>
      <p><code>disabled</code> 属性接受一个 Boolean，设置为 true 即可禁用整个组件</p>
      <zx-input-number v-model="disabledValue" :disabled="true" />
    </section>

    <section class="demo-section">
      <h2>步进</h2>
      <p>设置 <code>step</code> 属性可以控制步长</p>
      <zx-input-number v-model="stepValue" :step="2" />
      <p>当前值: {{ stepValue }}</p>
    </section>

    <section class="demo-section">
      <h2>严格步进</h2>
      <p><code>step-strictly</code> 属性接受一个 Boolean。如果这个属性被设置为 true，则只能输入步进的倍数</p>
      <zx-input-number v-model="strictStepValue" :step="2" step-strictly />
      <p>当前值: {{ strictStepValue }}</p>
    </section>

    <section class="demo-section">
      <h2>精度</h2>
      <p>设置 <code>precision</code> 属性可以控制数值精度</p>
      <zx-input-number v-model="precisionValue" :precision="2" :step="0.1" :max="10" />
      <p>当前值: {{ precisionValue }}</p>
    </section>

    <section class="demo-section">
      <h2>不同的输入框尺寸</h2>
      <p>使用 <code>size</code> 属性额外配置尺寸，可选的尺寸大小为：large 或 small</p>
      <div class="size-demo">
        <zx-input-number v-model="sizeValue1" size="large" />
        <zx-input-number v-model="sizeValue2" />
        <zx-input-number v-model="sizeValue3" size="small" />
      </div>
    </section>

    <section class="demo-section">
      <h2>按钮位置</h2>
      <p>设置 <code>controls-position</code> 属性可以控制按钮位置</p>
      <div class="position-demo">
        <zx-input-number
          v-model="positionValue"
          :min="1"
          :max="10"
          controls-position="right"
          size="large"
          @change="handleChange"
        />
        <zx-input-number
          v-model="positionValue"
          :min="1"
          :max="10"
          controls-position="right"
          @change="handleChange"
        />
        <zx-input-number
          v-model="positionValue"
          :min="1"
          :max="10"
          size="small"
          controls-position="right"
          @change="handleChange"
        />
      </div>
    </section>

    <section class="demo-section">
      <h2>自定义图标</h2>
      <p>使用 <code>decrease-icon</code> 和 <code>increase-icon</code> 插槽设置自定义图标</p>
      <div class="icon-demo">
        <zx-input-number v-model="iconValue1">
          <template #decrease-icon>
            <span>⬇</span>
          </template>
          <template #increase-icon>
            <span>⬆</span>
          </template>
        </zx-input-number>
        
        <zx-input-number v-model="iconValue2" controls-position="right">
          <template #decrease-icon>
            <span>➖</span>
          </template>
          <template #increase-icon>
            <span>➕</span>
          </template>
        </zx-input-number>
      </div>
    </section>

    <section class="demo-section">
      <h2>带前缀和后缀</h2>
      <p>使用前缀和后缀插槽</p>
      <div class="affix-demo">
        <zx-input-number v-model="affixValue1" :min="1" :max="10">
          <template #prefix>
            <span>￥</span>
          </template>
        </zx-input-number>
        
        <zx-input-number v-model="affixValue2" :min="1" :max="10">
          <template #suffix>
            <span>RMB</span>
          </template>
        </zx-input-number>
      </div>
    </section>

    <section class="demo-section">
      <h2>只读状态</h2>
      <p><code>readonly</code> 属性设置为 true 时，输入框变为只读状态</p>
      <zx-input-number v-model="readonlyValue" :readonly="true" />
    </section>

    <section class="demo-section">
      <h2>无控制按钮</h2>
      <p>设置 <code>controls</code> 为 false 可以隐藏控制按钮</p>
      <zx-input-number v-model="noControlsValue" :controls="false" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ZxInputNumber from './zx-input-number.vue'

// 各种演示数据
const basicValue = ref(1)
const disabledValue = ref(1)
const stepValue = ref(5)
const strictStepValue = ref(2)
const precisionValue = ref(1)
const sizeValue1 = ref(1)
const sizeValue2 = ref(2)
const sizeValue3 = ref(3)
const positionValue = ref(1)
const iconValue1 = ref(1)
const iconValue2 = ref(1)
const affixValue1 = ref(1)
const affixValue2 = ref(1)
const readonlyValue = ref(5)
const noControlsValue = ref(1)

const handleChange = (value) => {
  console.log('值改变:', value)
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.demo-section h2 {
  margin-top: 0;
  color: #409eff;
}

.demo-section p {
  margin-bottom: 15px;
  color: #606266;
}

.size-demo,
.position-demo,
.icon-demo,
.affix-demo {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

code {
  background-color: #f5f7fa;
  color: #e6a23c;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
}
</style> 