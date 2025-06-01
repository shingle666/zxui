<template>
  <view class="container">
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">Gap 组件用于在内容块之间创建间隔，默认高度为 20px，背景透明。</view>
          <view class="demo-block">
            <view class="content-block">内容块 1</view>
            <zx-gap></zx-gap>
            <view class="content-block">内容块 2</view>
            <zx-gap></zx-gap>
            <view class="content-block">内容块 3</view>
          </view>
        </view>

        <!-- 自定义高度 -->
        <view class="demo-section">
          <view class="demo-title">自定义高度</view>
          <view class="demo-desc">通过 height 属性设置间隔槽的高度，支持数字和字符串。</view>
          <view class="demo-block">
            <view class="content-block">高度 10px</view>
            <zx-gap height="10" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">高度 30px</view>
            <zx-gap height="30" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">高度 50px</view>
            <zx-gap height="50" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">高度 2rem</view>
            <zx-gap height="2rem" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">结束</view>
          </view>
        </view>

        <!-- 自定义背景色 -->
        <view class="demo-section">
          <view class="demo-title">自定义背景色</view>
          <view class="demo-desc">通过 bgColor 属性设置间隔槽的背景颜色。</view>
          <view class="demo-block">
            <view class="content-block">透明背景（默认）</view>
            <zx-gap height="30"></zx-gap>
            <view class="content-block">灰色背景</view>
            <zx-gap height="30" bgColor="#f5f5f5"></zx-gap>
            <view class="content-block">蓝色背景</view>
            <zx-gap height="30" bgColor="#e3f2fd"></zx-gap>
            <view class="content-block">绿色背景</view>
            <zx-gap height="30" bgColor="#e8f5e8"></zx-gap>
            <view class="content-block">红色背景</view>
            <zx-gap height="30" bgColor="#ffebee"></zx-gap>
            <view class="content-block">结束</view>
          </view>
        </view>

        <!-- 设置边距 -->
        <view class="demo-section">
          <view class="demo-title">设置边距</view>
          <view class="demo-desc">通过 marginTop 和 marginBottom 属性设置与前后元素的距离。</view>
          <view class="demo-block">
            <view class="content-block">无边距</view>
            <zx-gap height="20" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">上边距 20px</view>
            <zx-gap height="20" marginTop="20" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">下边距 20px</view>
            <zx-gap height="20" marginBottom="20" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">上下边距各 15px</view>
            <zx-gap height="20" marginTop="15" marginBottom="15" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">结束</view>
          </view>
        </view>

        <!-- 自定义样式 -->
        <view class="demo-section">
          <view class="demo-title">自定义样式</view>
          <view class="demo-desc">通过 customStyle 属性可以传入自定义样式对象。</view>
          <view class="demo-block">
            <view class="content-block">圆角边框样式</view>
            <zx-gap 
              height="40" 
              bgColor="#e3f2fd"
              :customStyle="{
                borderRadius: '8px',
                border: '2px solid #2196f3',
                margin: '0 20px'
              }"
            ></zx-gap>
            <view class="content-block">渐变背景样式</view>
            <zx-gap 
              height="50" 
              :customStyle="{
                background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                borderRadius: '25px',
                margin: '10px 30px'
              }"
            ></zx-gap>
            <view class="content-block">阴影样式</view>
            <zx-gap 
              height="30" 
              bgColor="#fff"
              :customStyle="{
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: '4px',
                margin: '0 10px'
              }"
            ></zx-gap>
            <view class="content-block">结束</view>
          </view>
        </view>

        <!-- 实际应用场景 -->
        <view class="demo-section">
          <view class="demo-title">实际应用场景</view>
          <view class="demo-desc">在实际项目中的常见使用场景。</view>
          <view class="demo-block">
            <!-- 模拟卡片列表 -->
            <view class="card">
              <view class="card-title">用户信息</view>
              <view class="card-content">张三 | 前端工程师</view>
            </view>
            <zx-gap height="12" bgColor="#f8f9fa"></zx-gap>
            
            <view class="card">
              <view class="card-title">联系方式</view>
              <view class="card-content">手机：138****8888</view>
            </view>
            <zx-gap height="12" bgColor="#f8f9fa"></zx-gap>
            
            <view class="card">
              <view class="card-title">工作经历</view>
              <view class="card-content">5年前端开发经验</view>
            </view>
            <zx-gap height="20" bgColor="#e9ecef"></zx-gap>
            
            <!-- 模拟设置项 -->
            <view class="setting-item">
              <text>账号设置</text>
              <text class="arrow">></text>
            </view>
            <zx-gap height="1" bgColor="#dee2e6"></zx-gap>
            
            <view class="setting-item">
              <text>隐私设置</text>
              <text class="arrow">></text>
            </view>
            <zx-gap height="1" bgColor="#dee2e6"></zx-gap>
            
            <view class="setting-item">
              <text>通知设置</text>
              <text class="arrow">></text>
            </view>
            <zx-gap height="20" bgColor="#f8f9fa"></zx-gap>
            
            <view class="setting-item">
              <text>关于我们</text>
              <text class="arrow">></text>
            </view>
          </view>
        </view>

        <!-- 不同单位支持 -->
        <view class="demo-section">
          <view class="demo-title">不同单位支持</view>
          <view class="demo-desc">组件支持多种CSS单位，会自动处理单位转换。</view>
          <view class="demo-block">
            <view class="content-block">数字（自动添加px）</view>
            <zx-gap height="25" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">px 单位</view>
            <zx-gap height="25px" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">rpx 单位（小程序）</view>
            <zx-gap height="50rpx" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">rem 单位</view>
            <zx-gap height="1.5rem" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">vh 单位</view>
            <zx-gap height="3vh" bgColor="#f0f0f0"></zx-gap>
            <view class="content-block">结束</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
// 定义页面配置
defineOptions({
  name: 'GapDemo'
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}

.content {
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 20px;
  }
}

.demo-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.demo-desc {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 16px;
  line-height: 1.5;
}

.demo-block {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.content-block {
  padding: 15px 20px;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  color: #495057;
  text-align: center;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e9ecef;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.card-content {
  font-size: 14px;
  color: #6c757d;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  font-size: 16px;
  color: #2c3e50;
}

.arrow {
  color: #adb5bd;
  font-size: 18px;
}

/* 暗色主题支持 */
.dark {
  .container {
    background-color: #1a1a1a;
  }
  
  .demo-title {
    color: #e9ecef;
  }
  
  .demo-desc {
    color: #adb5bd;
  }
  
  .demo-block {
    background-color: #2d3748;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .content-block {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e9ecef;
  }
  
  .card {
    background-color: #2d3748;
    border-color: #4a5568;
  }
  
  .card-title {
    color: #e9ecef;
  }
  
  .card-content {
    color: #a0aec0;
  }
  
  .setting-item {
    background-color: #2d3748;
    color: #e9ecef;
  }
}
</style>