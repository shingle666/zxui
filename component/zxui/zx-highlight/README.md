# zx-highlight 文本高亮组件

`zx-highlight` 组件用于在一段文本中高亮显示一个或多个关键字。

## 特性

- 支持单个或多个关键字高亮。
- 支持大小写敏感和不敏感匹配。
- 支持自动转义关键字中的正则表达式特殊字符。
- 可自定义高亮和非高亮部分的 HTML 标签及 CSS 类名。
- 兼容 H5、小程序和 App 端。

## 使用方法

### 默认用法

```vue
<template>
  <view>
    <zx-highlight
      :keywords="keywords"
      :source-string="text"
      :case-sensitive="caseSensitive"
      highlight-class="custom-highlight"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('这是一段包含敏感词和关键词的文本，敏感词需要高亮显示。');
const keywords = ref(['敏感词', '关键词']);
const caseSensitive = ref(false);
</script>

<style>
.custom-highlight {
  color: red;
  font-weight: bold;
}
</style>
```

### 使用作用域插槽自定义渲染

```vue
<template>
  <view>
    <zx-highlight :keywords="keywords" :source-string="text">
      <template v-slot:default="{ chunks, sourceString: slotSourceString }">
        <text v-for="(chunk, index) in chunks" :key="index">
          <text 
            v-if="chunk.highlight"
            style="color: blue; font-weight: bold;"
          >
            {{ slotSourceString.slice(chunk.start, chunk.end) }}
          </text>
          <text v-else>
            {{ slotSourceString.slice(chunk.start, chunk.end) }}
          </text>
        </text>
      </template>
    </zx-highlight>
  </view>
</template>

<script setup>
import { ref } from 'vue';
const text = ref('使用作用域插槽来自定义渲染逻辑。');
const keywords = ref('作用域插槽');
</script>
```

## Props

| 参数             | 说明                                                                 | 类型             | 默认值   | 必填 | 版本 |
| ---------------- | -------------------------------------------------------------------- | ---------------- | -------- | ---- | ---- |
| `keywords`       | 需要高亮的关键字，可以是字符串或字符串数组                             | `String`, `Array`  | `''`     | 是   |      |
| `source-string`  | 待匹配的源字符串                                                       | `String`         | `''`     | 否   |      |
| `case-sensitive` | 是否区分大小写                                                           | `Boolean`        | `false`  | 否   |      |
| `auto-escape`    | 是否自动转义 `keywords` 中的正则表达式特殊字符                         | `Boolean`        | `true`   | 否   |      |
| `highlight-tag`  | (默认插槽使用) 应用于高亮 `<text>` 元素的额外类名                      | `String`         | `''`     | 否   |      |
| `highlight-class`| (默认插槽使用) 高亮部分的 CSS 类名                                      | `String`         | `''`     | 否   |      |
| `unhighlight-tag`| (默认插槽使用) 应用于未高亮 `<text>` 元素的额外类名                    | `String`         | `''`     | 否   |      |
| `unhighlight-class`| (默认插槽使用) 未高亮部分的 CSS 类名                                    | `String`         | `''`     | 否   |      |

## Slots

| 名称    | 说明                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------- |
| default | 自定义整体渲染逻辑。插槽 prop 包括：<br/>- `chunks: Array<{start: number, end: number, highlight: boolean}>`：分词后的片段数组。<br/>- `sourceString: String`：原始的源字符串。 | 

## Events

该组件暂无自定义事件。

## 样式变量

| 名称                      | 说明               | 默认值   |
| ------------------------- | ------------------ | -------- |
| `--zx-highlight-tag-color` | 高亮文字的颜色     | `#1989fa`|

用户可以通过在全局样式或页面样式中覆盖此 CSS 变量来修改默认的高亮颜色。

```css
/* 例如，在 app.vue 或页面的 style 中 */
page {
  --zx-highlight-tag-color: orange;
}
```

## 注意事项

- 在小程序等环境中，`tag`、`highlight-tag` 和 `unhighlight-tag` 属性应使用平台支持的组件标签，如 `view`, `text` 等。默认值为 `text` 是为了更好的文本语义和兼容性。
- `auto-escape` 默认为 `true`，这意味着如果你的关键字中包含如 `.` `*` `+` `?` `^` `$` `{` `}` `(` `)` `|` `[` `]` `\` 等正则表达式的特殊字符，它们会被自动转义，以便作为普通文本进行匹配。如果你需要使用正则表达式本身进行匹配，请将 `auto-escape` 设置为 `false`，并确保你的关键字是有效的正则表达式字符串。