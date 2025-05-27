# zxUI

<p align="center">
  <img src="https://zxui.org/logo.png" width="160" alt="zxUI Logo">
</p>

<p align="center">
  <strong>多平台快速开发的UI框架</strong>
</p>

<p align="center">
  <a href="https://zxui.org">官方网站</a> |
  <a href="https://github.com/shingle666/zxui">GitHub</a> |
  <a href="https://zxui.org/components/intro.html">组件文档</a>
</p>

## 📖 项目介绍

zxUI是一套基于uni-app开发的跨平台UI框架，提供了丰富的组件、布局及界面库。它能够显著提升您的前端开发效率，实现一套代码多端发布。

### 🎯 项目愿景

zxUI的取名来源于开发者姓名拼音"zhen xing"的首字母缩写 + UI，寓意着为开发者提供真正实用的UI解决方案。

## ✨ 主要特性

- 🌍 **跨平台支持** - 支持iOS、Android、H5、微信小程序等14个平台
- 🚀 **高性能** - 基于uni-app，性能优异，高效运行
- 📱 **响应式设计** - 智能适配各种屏幕尺寸与设备
- 🎨 **丰富组件** - 提供100+精美UI组件，满足各类场景需求
- 📚 **详细文档** - 完善的使用文档和丰富的示例代码
- 🔧 **易于使用** - 支持按需引入，开箱即用，降低学习成本
- 🎯 **主题定制** - 灵活的主题系统，支持全局定制与组件级别样式覆盖
- 🔄 **平台适配** - 智能识别运行平台，自动适配平台特性
- 🛠️ **开发工具** - 配套VSCode插件，提供代码提示与自动补全

## 🚀 支持平台

<table>
  <tr>
    <td align="center">
      <img src="https://zxui.org/static/img/android.png" width="40"><br>
      <strong>Android</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/ios.png" width="40"><br>
      <strong>iOS</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/h5.png" width="40"><br>
      <strong>H5</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/wechat.png" width="40"><br>
      <strong>微信小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/qq.png" width="40"><br>
      <strong>QQ小程序</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://zxui.org/static/img/baidu.png" width="40"><br>
      <strong>百度小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/alipay.png" width="40"><br>
      <strong>支付宝小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/toutiao.png" width="40"><br>
      <strong>头条小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/dingtalk.png" width="40"><br>
      <strong>钉钉小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/weibo.png" width="40"><br>
      <strong>微博小程序</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://zxui.org/static/img/jd.png" width="40"><br>
      <strong>京东小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/kuaishou.png" width="40"><br>
      <strong>快手小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/qianfan.png" width="40"><br>
      <strong>千帆小程序</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/desktop.png" width="40"><br>
      <strong>Windows/MacOS</strong>
    </td>
    <td align="center">
      <img src="https://zxui.org/static/img/360.png" width="40"><br>
      <strong>360小程序</strong>
    </td>
  </tr>
</table>

## 📦 安装

### npm 安装
```bash
npm install @tanzhenxing/zxui
```

### yarn 安装
```bash
yarn add @tanzhenxing/zxui
```

## 🔧 快速开始

### 1. 自动导入（推荐）

在 `pages.json` 中增加 easycom 自动加载配置：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^zx-(.*)": "@tanzhenxing/zx-$1/zx-$1.vue"
    }
  }
}
```

### 2. 手动导入

```vue
<template>
  <view>
    <zx-button type="primary">确认</zx-button>
  </view>
</template>

<script>
import ZxButton from '@tanzhenxing/zx-button/zx-button.vue'

export default {
  components: {
    ZxButton
  }
}
</script>
```

### 3. 全局样式

在 `main.js` 中引入样式：

```javascript
import 'zx-button/theme.scss'
```

## 🎨 组件库

### 基础组件
- **Button 按钮** - 支持多种类型、大小、形状的按钮
- **Icon 图标** - 丰富的图标库
- **Text 文本** - 文本显示组件
- **Image 图片** - 图片展示组件
- **Line 分割线** - 分割线组件

### 布局组件
- **Layout 布局** - 栅格布局系统
- **Grid 宫格** - 宫格布局
- **Cell 单元格** - 列表单元格
- **Sticky 吸顶** - 吸顶布局
- **Safe Bottom 安全底部** - 底部安全区域

### 表单组件
- **Form 表单** - 表单容器
- **Input 输入框** - 文本输入
- **Textarea 文本域** - 多行文本输入
- **Radio 单选框** - 单选组件
- **Checkbox 复选框** - 多选组件
- **Switch 开关** - 开关选择器
- **Slider 滑动选择器** - 滑动选择
- **Picker 选择器** - 各种选择器
- **Upload 上传** - 文件上传

### 数据展示
- **Table 表格** - 数据表格
- **Tree 树形控件** - 树形数据展示
- **Progress 进度条** - 进度显示
- **Rate 评分** - 星级评分
- **Tag 标签** - 标签组件
- **Badge 徽标** - 徽标数字
- **Avatar 头像** - 用户头像
- **Card 卡片** - 卡片容器

### 反馈组件
- **Alert 警告** - 警告提示
- **Dialog 对话框** - 对话框
- **Toast 轻提示** - 消息提示
- **Loading 加载** - 加载状态
- **Skeleton 骨架屏** - 骨架屏加载
- **Empty 空状态** - 空数据状态

### 导航组件
- **Navbar 导航栏** - 顶部导航
- **Tabs 标签页** - 标签页切换
- **Tabbar 底部导航** - 底部导航栏
- **Menu 菜单** - 导航菜单
- **Breadcrumb 面包屑** - 面包屑导航
- **Steps 步骤条** - 步骤指示器

### 高级组件
- **Calendar 日历** - 日历组件
- **Date Picker 日期选择器** - 日期时间选择
- **Color Picker 颜色选择器** - 颜色选择
- **Swiper 轮播图** - 图片轮播
- **Watermark 水印** - 水印组件
- **Qrcode 二维码** - 二维码生成

## 🛠️ 工具库

zxUI还提供了丰富的JavaScript工具函数，所有方法均挂载在 `$zx` 对象下：

```javascript
// 在JS中使用
uni.$zx.trim(' hello world ') // 去除空格

// 在模板中使用
{{ $zx.trim(str, 'all') }}
```

### 常用工具
- **trim** - 去除空格
- **random** - 随机数生成
- **test** - 规则校验
- **route** - 路由跳转
- **time** - 时间格式化
- **color** - 颜色转换
- **getRect** - 节点信息获取

## 📱 平台兼容性

| 组件 | H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 | App |
|------|----|---------|-----------|---------|---------|---------|----|  
| 基础组件 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 表单组件 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 反馈组件 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 导航组件 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 高级组件 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## 🌐 跨平台开发

### 为什么选择跨平台？

当今数字化时代，用户通过多种设备访问应用程序，包括智能手机、平板电脑、桌面电脑和各类小程序平台。开发和维护针对每个平台的独立代码库成本高昂且耗时。跨平台开发解决了这一挑战，让您能够：

- **一次编写，多端运行** - 显著减少开发时间和维护成本
- **统一用户体验** - 确保在所有平台上保持一致的品牌形象和用户体验
- **更快的市场响应** - 同时在多个平台上发布更新和新功能
- **资源优化** - 集中开发资源，避免重复工作

### zxUI 的跨平台优势

作为基于 uni-app 的跨平台 UI 框架，zxUI 提供了多项独特优势：

#### 1. 智能平台适配

- **自动特性检测** - zxUI 会自动检测当前运行平台并调整组件行为
- **平台专属API封装** - 屏蔽平台差异，提供统一的 API 接口
- **条件编译支持** - 可使用 `#ifdef` 和 `#ifndef` 编写平台特定代码

```vue
<!-- 条件编译示例 -->
<template>
  <view class="container">
    <!-- 在所有平台通用的组件 -->
    <zx-button type="primary">提交</zx-button>
    
    <!-- 仅在 H5 平台显示的内容 -->
    <view v-if="platform === 'h5'">
      <zx-tag type="info">H5 专属功能</zx-tag>
    </view>
    
    <!-- 使用条件编译，仅在微信小程序显示 -->
    <!-- #ifdef MP-WEIXIN -->
    <zx-tag type="success">微信小程序专属功能</zx-tag>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      platform: ''
    }
  },
  created() {
    // 获取当前平台信息
    this.platform = uni.$zx.platform()
  }
}
</script>
```

#### 2. 自适应布局系统

- **弹性盒模型** - 基于 Flexbox 的响应式布局
- **栅格系统** - 24 列栅格布局，适配各种屏幕尺寸
- **响应式断点** - 预设的响应式断点，自动适应不同设备
- **安全区适配** - 自动处理各类设备的安全区域（如刘海屏、底部操作区）

#### 3. 统一的主题系统

- **CSS 变量** - 基于 CSS 变量的主题系统，易于定制
- **多主题支持** - 内置明暗主题，可扩展自定义主题
- **按平台定制** - 可针对不同平台设置不同的视觉风格

#### 4. 性能优化

- **按需编译** - 自动剔除未使用的组件和样式
- **体积优化** - 针对不同平台的打包优化
- **渲染性能** - 优化的渲染策略，减少重绘和回流

### 开发工作流

使用 zxUI 进行跨平台开发的典型工作流：

1. **项目初始化** - 使用 uni-app CLI 创建项目并安装 zxUI
2. **开发界面** - 使用 zxUI 组件构建统一的用户界面
3. **平台适配** - 使用条件编译处理平台特定逻辑
4. **本地测试** - 在各目标平台上进行调试和测试
5. **打包发布** - 为各平台构建和发布应用

#### 一次开发，多端部署示例

```bash
# 开发完成后，一键构建多平台应用

# 构建 H5 版本
npm run build:h5

# 构建微信小程序
npm run build:mp-weixin

# 构建 App (使用 HBuilderX 发行)
npm run build:app-plus

# 同时构建多个小程序平台
npm run build:mp
```

## 💻 开发

### 本地开发

```bash
# 克隆项目
git clone https://github.com/shingle666/zxui.git

# 安装依赖
npm install

# 启动H5开发服务器
npm run dev:h5

# 启动微信小程序开发
npm run dev:mp-weixin

# 构建生产版本
npm run build:h5
```

### 目录结构

```
zxui/
├── src/                    # 源代码目录
│   ├── components/         # UI组件库
│   │   ├── zx-button/     # 按钮组件
│   │   ├── zx-input/      # 输入框组件
│   │   └── ...            # 其他组件
│   ├── pages/             # 演示页面
│   ├── utils/             # 工具函数
│   ├── styles/            # 样式文件
│   └── main.js            # 入口文件
├── dist/                  # 构建输出目录
├── package.json           # 项目配置
└── README.md             # 项目说明
```

## 📚 文档

- [官方文档](https://zxui.org)
- [组件文档](https://zxui.org/components/intro.html)
- [快速上手](https://zxui.org/components/quickstart.html)
- [更新日志](https://zxui.org/components/changelog.html)

## 🤝 贡献

我们欢迎所有的贡献，请阅读 [贡献指南](https://github.com/shingle666/zxui/blob/master/CONTRIBUTING.md) 来了解如何参与项目开发。

### 贡献者

感谢所有为zxUI做出贡献的开发者们！

## 📄 版权信息

本项目基于 [MIT](https://github.com/shingle666/zxui/blob/main/LICENSE) 协议发布。

**注意：** 请勿将zxUI应用到非法领域，如涉及赌博、暴力等方面。如因此产生纠纷或法律问题，zxUI不承担任何责任。

## 🌟 Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=shingle666/zxui&type=Date)](https://star-history.com/#shingle666/zxui&Date)

## 📞 联系我们

- 官方网站：[https://zxui.org](https://zxui.org)
- GitHub：[https://github.com/shingle666/zxui](https://github.com/shingle666/zxui)
- 邮箱：support@zxui.org

---

Copyright © 2022 - 2025 zxui.org All Rights Reserved.