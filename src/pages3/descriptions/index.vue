<template>
  <view class="container">
    <text class="title">ZxDescriptions 描述列表组件</text>
    
    <!-- 基础用法 -->
    <view class="section">
      <text class="section-title">基础用法</text>
      <zx-descriptions title="用户信息">
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
        <zx-descriptions-item label="备注">学校</zx-descriptions-item>
        <zx-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </view>

    <!-- 带边框 -->
    <view class="section">
      <text class="section-title">带边框</text>
      <zx-descriptions title="用户信息" :column="3" border>
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
        <zx-descriptions-item label="备注">学校</zx-descriptions-item>
        <zx-descriptions-item label="联系地址">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </view>

    <!-- 不同尺寸 -->
    <view class="section">
      <text class="section-title">不同尺寸</text>
      <view class="size-demo">
        <text class="size-label">大尺寸：</text>
        <zx-descriptions title="用户信息" size="large" border>
          <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
          <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        </zx-descriptions>
      </view>
      
      <view class="size-demo">
        <text class="size-label">默认尺寸：</text>
        <zx-descriptions title="用户信息" size="default" border>
          <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
          <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        </zx-descriptions>
      </view>
      
      <view class="size-demo">
        <text class="size-label">小尺寸：</text>
        <zx-descriptions title="用户信息" size="small" border>
          <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
          <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        </zx-descriptions>
      </view>
    </view>

    <!-- 垂直列表 -->
    <view class="section">
      <text class="section-title">垂直列表</text>
      <zx-descriptions title="垂直列表" direction="vertical" border>
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
      </zx-descriptions>
    </view>

    <!-- 自定义样式 -->
    <view class="section">
      <text class="section-title">自定义样式</text>
      <zx-descriptions title="自定义样式列表" :column="3" border>
        <zx-descriptions-item
          label="用户名"
          label-align="right"
          align="center"
          width="150px"
        >
          kooriookami
        </zx-descriptions-item>
        <zx-descriptions-item label="手机号" label-align="right" align="center">
          18100000000
        </zx-descriptions-item>
        <zx-descriptions-item label="居住地" label-align="right" align="center">
          苏州市
        </zx-descriptions-item>
      </zx-descriptions>
    </view>

    <!-- 跨行跨列 -->
    <view class="section">
      <text class="section-title">跨行跨列</text>
      <zx-descriptions title="跨行跨列示例" :column="4" border>
        <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
        <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
        <zx-descriptions-item label="居住地" :span="2">苏州市吴中区</zx-descriptions-item>
        <zx-descriptions-item label="备注" :span="3">学校</zx-descriptions-item>
        <zx-descriptions-item label="联系地址" :span="4">
          江苏省苏州市吴中区吴中大道 1188 号
        </zx-descriptions-item>
      </zx-descriptions>
    </view>

    <!-- API 说明 -->
    <view class="section">
      <text class="section-title">API 说明</text>
      <view class="api-section">
        <text class="api-title">ZxDescriptions 属性</text>
        <view class="api-table">
          <view class="api-row header">
            <text class="api-cell">属性名</text>
            <text class="api-cell">说明</text>
            <text class="api-cell">类型</text>
            <text class="api-cell">默认值</text>
          </view>
          <view class="api-row">
            <text class="api-cell">border</text>
            <text class="api-cell">是否带有边框</text>
            <text class="api-cell">Boolean</text>
            <text class="api-cell">false</text>
          </view>
          <view class="api-row">
            <text class="api-cell">column</text>
            <text class="api-cell">一行的项目数量</text>
            <text class="api-cell">Number</text>
            <text class="api-cell">3</text>
          </view>
          <view class="api-row">
            <text class="api-cell">direction</text>
            <text class="api-cell">排列方向</text>
            <text class="api-cell">String</text>
            <text class="api-cell">horizontal</text>
          </view>
          <view class="api-row">
            <text class="api-cell">size</text>
            <text class="api-cell">尺寸</text>
            <text class="api-cell">String</text>
            <text class="api-cell">default</text>
          </view>
          <view class="api-row">
            <text class="api-cell">title</text>
            <text class="api-cell">标题文本</text>
            <text class="api-cell">String</text>
            <text class="api-cell">-</text>
          </view>
        </view>

        <text class="api-title">ZxDescriptionsItem 属性</text>
        <view class="api-table">
          <view class="api-row header">
            <text class="api-cell">属性名</text>
            <text class="api-cell">说明</text>
            <text class="api-cell">类型</text>
            <text class="api-cell">默认值</text>
          </view>
          <view class="api-row">
            <text class="api-cell">label</text>
            <text class="api-cell">标签文本</text>
            <text class="api-cell">String</text>
            <text class="api-cell">-</text>
          </view>
          <view class="api-row">
            <text class="api-cell">span</text>
            <text class="api-cell">列的数量</text>
            <text class="api-cell">Number</text>
            <text class="api-cell">1</text>
          </view>
          <view class="api-row">
            <text class="api-cell">align</text>
            <text class="api-cell">内容对齐方式</text>
            <text class="api-cell">String</text>
            <text class="api-cell">left</text>
          </view>
          <view class="api-row">
            <text class="api-cell">label-align</text>
            <text class="api-cell">标签对齐方式</text>
            <text class="api-cell">String</text>
            <text class="api-cell">-</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
// 定义组件名称
defineOptions({
  name: 'DescriptionsDemo'
})
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 30px;
  display: block;
  text-align: center;
}

.section {
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 15px;
  display: block;
  border-bottom: 2px solid #409eff;
  padding-bottom: 8px;
}

.size-demo {
  margin-bottom: 20px;
}

.size-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 10px;
  display: block;
  font-weight: 500;
}

.api-section {
  margin-top: 20px;
}

.api-title {
  font-size: 16px;
  font-weight: 600;
  color: #409eff;
  margin: 20px 0 10px 0;
  display: block;
}

.api-table {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.api-row {
  display: flex;
  border-bottom: 1px solid #ebeef5;
}

.api-row:last-child {
  border-bottom: none;
}

.api-row.header .api-cell {
  background-color: #f2f6fc;
  font-weight: 600;
  color: #303133;
}

.api-cell {
  flex: 1;
  padding: 12px;
  font-size: 14px;
  color: #606266;
  border-right: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  min-height: 20px;
}

.api-cell:last-child {
  border-right: none;
}

.api-row:nth-child(even):not(.header) .api-cell {
  background-color: #f9f9f9;
}
</style> 