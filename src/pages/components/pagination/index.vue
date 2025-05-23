 <template>
  <view class="container">
    <view class="title">zx-pagination 分页组件</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="section-desc">当页数较少时</view>
      <view class="demo-block">
        <zx-pagination 
          layout="prev, pager, next" 
          :total="50" 
          @current-change="handleCurrentChange"
        />
      </view>
      <view class="section-desc">当页数较多时</view>
      <view class="demo-block">
        <zx-pagination 
          layout="prev, pager, next" 
          :total="1000" 
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 设置最大页码按钮数 -->
    <view class="section">
      <view class="section-title">设置最大页码按钮数</view>
      <view class="section-desc">通过 pager-count 属性可以设置最大页码按钮数</view>
      <view class="demo-block">
        <zx-pagination
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 带有背景色的分页 -->
    <view class="section">
      <view class="section-title">带有背景色的分页</view>
      <view class="section-desc">设置 background 属性可以为分页按钮添加背景色</view>
      <view class="demo-block">
        <zx-pagination 
          background 
          layout="prev, pager, next" 
          :total="1000" 
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 小型分页 -->
    <view class="section">
      <view class="section-title">小型分页</view>
      <view class="section-desc">在空间有限的情况下，可以使用简单的小型分页</view>
      <view class="demo-block">
        <zx-pagination 
          size="small" 
          layout="prev, pager, next" 
          :total="50" 
          @current-change="handleCurrentChange"
        />
      </view>
      <view class="demo-block">
        <zx-pagination
          size="small"
          background
          layout="prev, pager, next"
          :total="50"
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 大型分页 -->
    <view class="section">
      <view class="section-title">大型分页</view>
      <view class="section-desc">可以使用更大的分页组件</view>
      <view class="demo-block">
        <zx-pagination 
          size="large" 
          layout="prev, pager, next" 
          :total="50" 
          @current-change="handleCurrentChange"
        />
      </view>
      <view class="demo-block">
        <zx-pagination
          size="large"
          background
          layout="prev, pager, next"
          :total="50"
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 当只有一页时隐藏分页 -->
    <view class="section">
      <view class="section-title">当只有一页时隐藏分页</view>
      <view class="section-desc">当只有一页时，通过设置 hide-on-single-page 属性来隐藏分页</view>
      <view class="demo-block">
        <view class="switch-row">
          <text>隐藏单页：</text>
          <zx-switch v-model="hideSinglePage" />
        </view>
        <zx-pagination
          :hide-on-single-page="hideSinglePage"
          :total="5"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 附加功能 -->
    <view class="section">
      <view class="section-title">附加功能</view>
      <view class="section-desc">根据场景需要，可以添加其他功能模块</view>
      
      <!-- 显示总数 -->
      <view class="demo-block">
        <view class="demo-title">显示总数</view>
        <zx-pagination
          v-model:current-page="currentPage1"
          :page-size="100"
          :size="sizeOptions"
          :disabled="disabled"
          :background="background"
          layout="total, prev, pager, next"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </view>

      <!-- 改变页面大小 -->
      <view class="demo-block">
        <view class="demo-title">改变页面大小</view>
        <zx-pagination
          v-model:current-page="currentPage2"
          v-model:page-size="pageSize2"
          :page-sizes="[100, 200, 300, 400]"
          :size="sizeOptions"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </view>

      <!-- 跳转到指定页 -->
      <view class="demo-block">
        <view class="demo-title">跳转到指定页</view>
        <zx-pagination
          v-model:current-page="currentPage3"
          v-model:page-size="pageSize3"
          :size="sizeOptions"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </view>

      <!-- 完整功能 -->
      <view class="demo-block">
        <view class="demo-title">完整功能</view>
        <zx-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :size="sizeOptions"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </view>

      <!-- 右对齐布局 -->
      <view class="demo-block">
        <view class="demo-title">右对齐布局</view>
        <zx-pagination
          v-model:current-page="currentPage5"
          v-model:page-size="pageSize5"
          :page-sizes="[100, 200, 300, 400]"
          :size="sizeOptions"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, ->, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 自定义文本 -->
    <view class="section">
      <view class="section-title">自定义文本</view>
      <view class="section-desc">可以自定义上一页和下一页的文本</view>
      <view class="demo-block">
        <zx-pagination
          layout="prev, pager, next"
          :total="1000"
          prev-text="上一页"
          next-text="下一页"
          @current-change="handleCurrentChange"
        />
      </view>
    </view>

    <!-- 控制选项 -->
    <view class="section">
      <view class="section-title">控制选项</view>
      <view class="control-options">
        <view class="control-row">
          <text>尺寸：</text>
          <zx-radio-group v-model="sizeOptions">
            <zx-radio value="small">小</zx-radio>
            <zx-radio value="default">默认</zx-radio>
            <zx-radio value="large">大</zx-radio>
          </zx-radio-group>
        </view>
        <view class="control-row">
          <text>背景色：</text>
          <zx-switch v-model="background" />
        </view>
        <view class="control-row">
          <text>禁用状态：</text>
          <zx-switch v-model="disabled" />
        </view>
      </view>
    </view>

    <!-- 禁用状态演示 -->
    <view class="section">
      <view class="section-title">禁用状态</view>
      <view class="section-desc">分页组件可以设置为禁用状态</view>
      <view class="demo-block">
        <zx-pagination
          disabled
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 控制选项
const sizeOptions = ref('default')
const background = ref(false)
const disabled = ref(false)
const hideSinglePage = ref(false)

// 分页状态
const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
const currentPage4 = ref(1)
const currentPage5 = ref(1)

const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const pageSize5 = ref(100)

// 事件处理
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
  uni.showToast({
    title: `每页 ${val} 条`,
    icon: 'none'
  })
}

const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  uni.showToast({
    title: `当前页: ${val}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #303133;
  text-align: center;
  margin-bottom: 60rpx;
}

.section {
  margin-bottom: 80rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #303133;
  padding: 40rpx 40rpx 20rpx;
  border-bottom: 2rpx solid #ebeef5;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background: -webkit-linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  margin: 0;
}

.section-desc {
  font-size: 28rpx;
  color: #909399;
  padding: 20rpx 40rpx;
  background-color: #f8f9fa;
  border-left: 8rpx solid #409eff;
  margin: 0;
}

.demo-block {
  padding: 40rpx;
  border-bottom: 2rpx solid #ebeef5;

  &:last-child {
    border-bottom: none;
  }
}

.demo-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #606266;
  margin-bottom: 20rpx;
}

.switch-row {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  font-size: 28rpx;
  color: #606266;
  
  text {
    margin-right: 20rpx;
  }
}

.control-options {
  padding: 40rpx;
  background-color: #f8f9fa;
  border-radius: 12rpx;
  margin: 20rpx 0;
}

.control-row {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  font-size: 28rpx;
  color: #606266;

  &:last-child {
    margin-bottom: 0;
  }
  
  text {
    margin-right: 30rpx;
    min-width: 120rpx;
  }
}

// 分页组件样式调整
:deep(.zx-pagination) {
  justify-content: center;
  margin: 20rpx 0;
  
  &:first-child {
    margin-top: 0;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
}
</style>