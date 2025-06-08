# zx-map 地图组件

## 简介

`zx-map` 是一个基于 uni-app 的地图组件，对原生地图组件进行了封装和增强，提供了更加便捷的地图展示功能。支持地址自动转换为坐标、多个标记点、自定义样式、线条绘制等功能。

## 特性

- 支持地址自动转换为坐标（地理编码）
- 支持自定义地图大小和样式
- 支持多个标记点、线段、圆形区域
- 提供丰富的交互控制选项
- 支持地图点击、标记点点击等事件
- 响应式设计，自动适应数据变化

## 安装和使用

### 引入组件

```vue
// 在页面中引入组件
import zxMap from '@/components/zx-map/zx-map.vue'

// 注册组件
export default {
  components: {
    zxMap
  }
}
```

## 基本用法

### 基础示例

```vue
<template>
  <view>
    <zx-map :mapData="locationData"></zx-map>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const locationData = ref({
  name: '公司名称',
  address: '北京市朝阳区xxx街道xxx号',
  phone: '010-12345678',
  latitude: 39.9042,
  longitude: 116.4074
});
</script>
```

### 使用地址自动转换坐标

如果只有地址没有坐标，组件会自动调用云函数进行地理编码：

```vue
<template>
  <view>
    <zx-map :mapData="locationData"></zx-map>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const locationData = ref({
  name: '公司名称',
  address: '北京市朝阳区xxx街道xxx号',
  phone: '010-12345678'
  // 不提供经纬度，将自动通过地址解析
});
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| ----- | ---- | ----- | ---- |
| mapData | Object | {} | 地图主要数据，包含名称、地址、电话、经纬度等 |
| width | String | '690rpx' | 地图宽度 |
| height | String | '350rpx' | 地图高度 |
| scale | Number | 15 | 地图缩放级别，范围 3-20 |
| minScale | Number | 3 | 最小缩放级别 |
| maxScale | Number | 20 | 最大缩放级别 |
| showLocation | Boolean | false | 是否显示当前位置 |
| enableZoom | Boolean | true | 是否允许缩放 |
| enableScroll | Boolean | true | 是否允许拖动 |
| enableRotate | Boolean | false | 是否允许旋转 |
| enableSatellite | Boolean | false | 是否显示卫星图 |
| enableTraffic | Boolean | false | 是否显示交通状况 |
| enablePoi | Boolean | true | 是否显示兴趣点 |
| enableBuilding | Boolean | true | 是否显示3D建筑 |
| showCompass | Boolean | false | 是否显示指南针 |
| showScale | Boolean | false | 是否显示比例尺 |
| showInfo | Boolean | true | 是否显示信息区域（电话、地址） |
| markerIcons | Array | [] | 自定义标记点图标数组 |
| externalMarkers | Array | [] | 额外的标记点数组 |
| polyline | Array | [] | 线段数组 |
| circles | Array | [] | 圆形区域数组 |

### mapData 对象说明

| 属性名 | 类型 | 说明 |
| ----- | ---- | ---- |
| name | String | 地点名称 |
| address | String | 地点地址 |
| phone | String | 联系电话 |
| latitude | Number | 纬度 |
| longitude | Number | 经度 |
| logo | String | 自定义标记图标路径 |

### markers 数组项说明

```javascript
{
  id: 'marker1', // 标记点ID
  title: '标记点标题', // 标记点标题
  latitude: 39.9042, // 纬度
  longitude: 116.4074, // 经度
  iconPath: '/static/marker.png', // 图标路径
  width: 30, // 图标宽度
  height: 30, // 图标高度
  callout: { // 气泡配置
    content: '气泡内容',
    color: '#333333',
    fontSize: 14,
    borderRadius: 5,
    padding: 10,
    display: 'BYCLICK', // BYCLICK-点击显示，ALWAYS-常显
    textAlign: 'center'
  },
  label: { // 标签配置
    content: '标签内容',
    color: '#333333',
    fontSize: 14,
    padding: 5,
    anchorX: 20,
    anchorY: -35,
    textAlign: 'center'
  }
}
```

### polyline 数组项说明

```javascript
{
  points: [ // 线段点数组
    {
      latitude: 39.9042,
      longitude: 116.4074
    },
    {
      latitude: 39.9142,
      longitude: 116.4174
    }
  ],
  color: '#FF0000', // 线条颜色
  width: 2, // 线条宽度
  dottedLine: false, // 是否虚线
  arrowLine: false, // 是否带箭头
  borderColor: '#000000', // 线条边框颜色
  borderWidth: 1 // 线条边框宽度
}
```

### circles 数组项说明

```javascript
{
  latitude: 39.9042, // 中心点纬度
  longitude: 116.4074, // 中心点经度
  color: '#FF000033', // 填充颜色
  radius: 100, // 半径，单位米
  strokeWidth: 2, // 边框宽度
  strokeColor: '#FF0000' // 边框颜色
}
```

## 事件说明

| 事件名 | 说明 | 返回参数 |
| ----- | ---- | ------- |
| tap | 点击地图时触发 | event |
| markertap | 点击标记点时触发 | {markerId} |
| callouttap | 点击气泡时触发 | {markerId} |
| regionchange | 地图视野变化时触发 | {type, latitude, longitude, scale} |
| updated | 地图更新完成时触发 | event |

## 方法说明

可通过 ref 获取组件实例后调用以下方法：

```vue
<template>
  <zx-map ref="mapRef" :mapData="locationData"></zx-map>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mapRef = ref(null);

onMounted(() => {
  // 调用组件方法
  mapRef.value.geocodeAddress();
});
</script>
```

| 方法名 | 说明 | 参数 |
| ----- | ---- | ---- |
| geocodeAddress | 手动触发地址转坐标 | 无 |
| updateMarkers | 手动更新标记点 | 无 |

## 高级用法示例

### 自定义多个标记点

```vue
<template>
  <zx-map 
    :mapData="locationData"
    :externalMarkers="extraMarkers"
    width="750rpx"
    height="500rpx"
    :enableZoom="true"
    :enableScroll="true"
    @markertap="onMarkerTap"
  ></zx-map>
</template>

<script setup>
import { ref } from 'vue';

const locationData = ref({
  name: '公司总部',
  address: '北京市朝阳区xxx街道xxx号',
  phone: '010-12345678',
  latitude: 39.9042,
  longitude: 116.4074
});

const extraMarkers = ref([
  {
    id: 'branch1',
    title: '分支机构1',
    latitude: 39.9142,
    longitude: 116.4174,
    iconPath: '/static/branch.png',
    width: 30,
    height: 30,
    callout: {
      content: '分支机构1',
      color: '#333333',
      fontSize: 14,
      borderRadius: 5,
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center'
    }
  },
  {
    id: 'branch2',
    title: '分支机构2',
    latitude: 39.9242,
    longitude: 116.3974,
    iconPath: '/static/branch.png',
    width: 30,
    height: 30,
    callout: {
      content: '分支机构2',
      color: '#333333',
      fontSize: 14,
      borderRadius: 5,
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center'
    }
  }
]);

const onMarkerTap = (e) => {
  console.log('点击了标记点', e.markerId);
};
</script>
```

### 添加路线和圆形区域

```vue
<template>
  <zx-map 
    :mapData="locationData"
    :polyline="routes"
    :circles="areas"
    width="750rpx"
    height="500rpx"
  ></zx-map>
</template>

<script setup>
import { ref } from 'vue';

const locationData = ref({
  name: '起点',
  address: '北京市朝阳区xxx街道xxx号',
  latitude: 39.9042,
  longitude: 116.4074
});

const routes = ref([
  {
    points: [
      {
        latitude: 39.9042,
        longitude: 116.4074
      },
      {
        latitude: 39.9142,
        longitude: 116.4174
      },
      {
        latitude: 39.9242,
        longitude: 116.4274
      }
    ],
    color: '#FF0000',
    width: 4,
    arrowLine: true
  }
]);

const areas = ref([
  {
    latitude: 39.9042,
    longitude: 116.4074,
    color: '#FF000033',
    radius: 500,
    strokeWidth: 2,
    strokeColor: '#FF0000'
  }
]);
</script>
```

## 注意事项

1. 需要确保已在项目中配置了地图相关的权限和服务商密钥
2. 地理编码功能依赖于uniCloud云函数`geocoder`，请确保已部署此云函数
3. 在App平台上，不同平台的地图服务商可能有差异，具体请参考uni-app官方文档
4. 组件默认使用的经纬度是国测局坐标（GCJ-02），如使用WGS84坐标（GPS坐标）需要进行转换
5. 如使用高德或腾讯地图，需遵守其审图号规范，在App中显示审图号
