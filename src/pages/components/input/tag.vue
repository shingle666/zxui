<template>
  <div class="demo-container">
    <h1>ZxInputTag 标签输入框演示</h1>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <p>按 Enter 键添加标签</p>
      <zx-input-tag 
        v-model="basicTags" 
        placeholder="请输入内容，按回车添加标签"
      />
      <p>当前标签：{{ basicTags }}</p>
    </section>

    <!-- 自定义触发器 -->
    <section class="demo-section">
      <h2>自定义触发器</h2>
      <div class="controls">
        <label>
          <input 
            type="radio" 
            v-model="triggerKey" 
            value="Enter"
          /> Enter 键
        </label>
        <label>
          <input 
            type="radio" 
            v-model="triggerKey" 
            value="Space"
          /> Space 键
        </label>
        <label>
          <input 
            type="radio" 
            v-model="triggerKey" 
            value="Tab"
          /> Tab 键
        </label>
      </div>
      <zx-input-tag 
        v-model="triggerTags" 
        :trigger="triggerKey"
        placeholder="请选择触发键"
      />
    </section>

    <!-- 最大标签数 -->
    <section class="demo-section">
      <h2>最大标签数限制</h2>
      <p>最多允许 3 个标签</p>
      <zx-input-tag 
        v-model="maxTags" 
        :max="3"
        placeholder="最多添加 3 个标签"
      />
    </section>

    <!-- 尺寸 -->
    <section class="demo-section">
      <h2>不同尺寸</h2>
      <div class="size-demo">
        <h3>大号</h3>
        <zx-input-tag 
          v-model="sizeTags" 
          size="large"
          placeholder="大号输入框"
        />
        
        <h3>默认</h3>
        <zx-input-tag 
          v-model="sizeTags" 
          size="default"
          placeholder="默认输入框"
        />
        
        <h3>小号</h3>
        <zx-input-tag 
          v-model="sizeTags" 
          size="small"
          placeholder="小号输入框"
        />
      </div>
    </section>

    <!-- 标签类型和效果 -->
    <section class="demo-section">
      <h2>标签类型和效果</h2>
      <div class="controls">
        <label>类型：</label>
        <select v-model="selectedType">
          <option value="primary">Primary</option>
          <option value="success">Success</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="danger">Danger</option>
        </select>
        
        <label>效果：</label>
        <select v-model="selectedEffect">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="plain">Plain</option>
        </select>
      </div>
      <zx-input-tag 
        v-model="typeTags" 
        :tag-type="selectedType"
        :tag-effect="selectedEffect"
        placeholder="输入标签查看效果"
      />
    </section>

    <!-- 可拖拽 -->
    <section class="demo-section">
      <h2>可拖拽排序</h2>
      <p>拖拽标签可以重新排序</p>
      <zx-input-tag 
        v-model="draggableTags" 
        draggable
        placeholder="拖拽标签进行排序"
      />
    </section>

    <!-- 分隔符 -->
    <section class="demo-section">
      <h2>分隔符支持</h2>
      <p>使用逗号作为分隔符自动创建标签</p>
      <zx-input-tag 
        v-model="delimiterTags" 
        delimiter=","
        placeholder="尝试用逗号分隔输入：标签1,标签2,标签3"
      />
    </section>

    <!-- 可清空 -->
    <section class="demo-section">
      <h2>可清空</h2>
      <zx-input-tag 
        v-model="clearableTags" 
        clearable
        placeholder="带清空按钮的输入框"
      />
    </section>

    <!-- 禁用状态 -->
    <section class="demo-section">
      <h2>禁用状态</h2>
      <zx-input-tag 
        v-model="disabledTags" 
        disabled
        placeholder="禁用状态"
      />
    </section>

    <!-- 只读状态 -->
    <section class="demo-section">
      <h2>只读状态</h2>
      <zx-input-tag 
        v-model="readonlyTags" 
        readonly
        placeholder="只读状态"
      />
    </section>

    <!-- 自定义标签内容 -->
    <section class="demo-section">
      <h2>自定义标签内容</h2>
      <zx-input-tag 
        v-model="customTags" 
        tag-type="primary"
        tag-effect="plain"
        placeholder="自定义标签内容"
      >
        <template #tag="{ value, index }">
          <span style="color: #f56c6c;">🏷️</span>
          <span>{{ value }}</span>
          <span style="color: #909399; margin-left: 4px;">({{ index + 1 }})</span>
        </template>
      </zx-input-tag>
    </section>

    <!-- 前缀和后缀 -->
    <section class="demo-section">
      <h2>前缀和后缀</h2>
      <zx-input-tag 
        v-model="affixTags" 
        clearable
        placeholder="带前缀和后缀的输入框"
      >
        <template #prefix>
          <span style="color: #409eff;">🔍</span>
        </template>
        <template #suffix>
          <span style="color: #67c23a;">✨</span>
        </template>
      </zx-input-tag>
    </section>

    <!-- 事件监听 -->
    <section class="demo-section">
      <h2>事件监听</h2>
      <zx-input-tag 
        v-model="eventTags" 
        @add-tag="onAddTag"
        @remove-tag="onRemoveTag"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @clear="onClear"
        placeholder="查看控制台输出事件信息"
      />
      <div class="event-log">
        <h3>事件日志：</h3>
        <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
          {{ log }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ZxInputTag from './zx-input-tag.vue'

export default {
  name: 'ZxInputTagDemo',
  components: {
    ZxInputTag
  },
  data() {
    return {
      // 基础用法
      basicTags: ['Vue', 'JavaScript'],
      
      // 触发器
      triggerKey: 'Enter',
      triggerTags: [],
      
      // 最大标签数
      maxTags: ['标签1', '标签2'],
      
      // 尺寸
      sizeTags: ['标签'],
      
      // 类型和效果
      selectedType: 'primary',
      selectedEffect: 'light',
      typeTags: ['示例标签'],
      
      // 拖拽
      draggableTags: ['可拖拽1', '可拖拽2', '可拖拽3'],
      
      // 分隔符
      delimiterTags: [],
      
      // 可清空
      clearableTags: ['清空测试1', '清空测试2'],
      
      // 禁用
      disabledTags: ['禁用标签1', '禁用标签2'],
      
      // 只读
      readonlyTags: ['只读标签1', '只读标签2'],
      
      // 自定义
      customTags: ['自定义1', '自定义2'],
      
      // 前缀后缀
      affixTags: [],
      
      // 事件
      eventTags: [],
      eventLogs: []
    }
  },
  methods: {
    onAddTag(tag) {
      this.addEventLog(`添加标签: ${tag}`)
    },
    onRemoveTag(tag) {
      this.addEventLog(`移除标签: ${tag}`)
    },
    onChange(tags) {
      this.addEventLog(`标签变化: [${tags.join(', ')}]`)
    },
    onFocus() {
      this.addEventLog('获得焦点')
    },
    onBlur() {
      this.addEventLog('失去焦点')
    },
    onClear() {
      this.addEventLog('清空标签')
    },
    addEventLog(message) {
      const time = new Date().toLocaleTimeString()
      this.eventLogs.unshift(`[${time}] ${message}`)
      if (this.eventLogs.length > 10) {
        this.eventLogs.pop()
      }
    }
  }
}
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fafafa;
}

.demo-section h2 {
  margin-top: 0;
  color: #409eff;
  font-size: 18px;
}

.demo-section p {
  margin: 10px 0;
  color: #606266;
}

.controls {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.controls select {
  margin-left: 5px;
  padding: 2px 5px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}

.size-demo h3 {
  margin: 15px 0 10px 0;
  color: #606266;
  font-size: 14px;
}

.event-log {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #606266;
}

.log-item {
  padding: 2px 0;
  font-size: 12px;
  color: #909399;
  font-family: 'Courier New', monospace;
}
</style> 