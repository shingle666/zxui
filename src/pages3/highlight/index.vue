<template>
  <view class="container">
    <view class="content">
      <zx-group title="基础用法">
        <view class="demo-block">
          <zx-highlight :keywords="keyword1" :source-string="text1"></zx-highlight>
        </view>
      </zx-group>

      <zx-group title="多个关键字">
        <view class="demo-block">
          <zx-highlight :keywords="keywords2" :source-string="text2"></zx-highlight>
        </view>
      </zx-group>

      <zx-group title="大小写敏感">
        <view class="demo-block">
          <zx-highlight :keywords="keyword3" :source-string="text3" :case-sensitive="true"></zx-highlight>
        </view>
      </zx-group>

      <zx-group title="自定义高亮样式">
        <view class="demo-block">
          <zx-highlight :keywords="keyword4" :source-string="text4" highlight-class="custom-highlight-style"></zx-highlight>
        </view>
      </zx-group>

      <zx-group title="自定义标签和类名">
        <view class="demo-block">
          <zx-highlight
            :keywords="keyword5"
            :source-string="text5"
            tag="view"
            highlight-tag="text"
            highlight-class="my-highlight"
            unhighlight-tag="text"
            unhighlight-class="my-unhighlight"
          ></zx-highlight>
        </view>
      </zx-group>

      <zx-group title="包含正则特殊字符的关键字 (autoEscape=true)">
        <view class="demo-block">
          <zx-highlight :keywords="keyword6" :source-string="text6"></zx-highlight>
        </view>
      </zx-group>

      <zx-group title="使用正则表达式进行匹配 (autoEscape=false)">
        <view class="demo-block">
          <zx-highlight :keywords="keyword7Regex" :source-string="text7" :auto-escape="false"></zx-highlight>
        </view>
      </zx-group>

      <zx-group title="空源字符串或无关键字">
        <view class="demo-block">
          <zx-highlight :keywords="keyword1" source-string=""></zx-highlight>
          <view style="margin-top: 10rpx;">
            <zx-highlight :keywords="[]" :source-string="text1"></zx-highlight>
          </view>
           <view style="margin-top: 10rpx;">
            <zx-highlight keywords="" :source-string="text1"></zx-highlight>
          </view>
        </view>
      </zx-group>

      <zx-group title="使用作用域插槽自定义渲染">
        <view class="demo-block">
          <zx-highlight :keywords="keywordSlot" :source-string="textSlot">
            <template v-slot:default="{ chunks, sourceString: slotSourceString }">
              <text v-for="(chunk, index) in chunks" :key="index">
                <text 
                  v-if="chunk.highlight"
                  style="color: purple; text-decoration: underline;"
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
      </zx-group>

    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxHighlight from '@tanzhenxing/zx-highlight/zx-highlight.vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';
import zxGroup from '@tanzhenxing/zx-group/zx-group.vue';

const text1 = ref('欢迎使用 zxUI 组件库，zxUI 提供了丰富的组件。');
const keyword1 = ref('zxUI');

const text2 = ref('这是一段包含多个高亮词的文本，例如苹果、香蕉和橙子。');
const keywords2 = ref(['苹果', '香蕉', '橙子']);

const text3 = ref('This is a Test String. TEST and test should be different.');
const keyword3 = ref('Test');

const text4 = ref('自定义高亮样式，让关键字更醒目。');
const keyword4 = ref('醒目');

const text5 = ref('使用不同的HTML标签和CSS类来渲染高亮文本。');
const keyword5 = ref('HTML标签');

const text6 = ref('关键字是 "[zxUI]"，它包含了特殊字符。');
const keyword6 = ref('[zxUI]');

const text7 = ref('匹配所有以 "zx" 开头，后跟一个或多个字母的单词: zxOne, zxTwo, but not zx1.');
const keyword7Regex = ref('zx[A-Za-z]+');

const textSlot = ref('通过作用域插槽，我们可以完全控制每个片段的渲染方式。');
const keywordSlot = ref('作用域插槽');

</script>

<style lang="scss" scoped>
.container {
  background-color: #f8f8f8;
  min-height: 100vh;
}
.content {
  padding: 20rpx;
}

.demo-block {
  background-color: #ffffff;
  padding: 20rpx;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #333;
}

.custom-highlight-style {
  color: #ff0000;
  background-color: #ffff00;
  padding: 2rpx 4rpx;
  border-radius: 4rpx;
}

.my-highlight {
  color: green;
  font-style: italic;
}

.my-unhighlight {
  color: #666;
}
</style>