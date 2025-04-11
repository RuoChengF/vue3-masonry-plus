
# Vue3 瀑布流组件

一个基于Vue3的瀑布流组件，支持PC和移动端，支持animate动画效果，内置图片懒加载功能。

## 预览
![项目预览地址](http://www.ruocheng.site/)

## 运行项目
 ```bash
 cd demo
# 安装依赖
npm install
# 运行项目
npm run dev
```
## 特性

- 🚀 基于Vue3和TypeScript开发
- 📱 响应式布局，支持PC和移动端
- 🎨 支持animate.css的所有动画效果
- 🖼️ 内置图片懒加载功能
- 🔄 自动计算布局
- ⚡ 高性能，支持大量图片加载
- 🔍 支持图片预览功能

## 安装

```bash
npm install vue3-masonry-plus
# or
yarn add vue3-masonry-plus
```

## 基本使用

```vue
<template>
  <Waterfall
    ref="waterfallRef"
    :list="list"
    :width="200"
    :columns="4"
    :gutter="10"
    animation-effect="fadeIn"
    :animation-duration="1000"
    :animation-delay="300"
    background-color="#f5f5f5"
  >
    <template #item="{ item }">
      <div class="card">
        <LazyImg :url="item.src" :preview-src-list="[item.src]" :preview-icon="previewIcon" />
        <div class="info">
          <h3>{{ item.name }}</h3>
        </div>
      </div>
    </template>
  </Waterfall>
</template>

<script setup lang="ts">
import { Waterfall, LazyImg } from 'vue3-masonry-plus'
import { ref } from 'vue'

const waterfallRef = ref()
const previewIcon = 'path/to/preview-icon.png' // 自定义预览图标
const list = [
  { id: '1', src: 'image1.jpg', name: 'Image 1' },
  { id: '2', src: 'image2.jpg', name: 'Image 2' },
  // ...
]

// 强制更新瀑布流布局
const forceUpdate = () => {
  waterfallRef.value?.renderer()
}

// 清空并重新加载数据
const clearAndReload = () => {
  waterfallRef.value?.clearAndReload()
}

</script>
```

## 组件属性

### Waterfall 组件

| 属性名            | 类型    | 默认值              | 说明                       |
| ----------------- | ------- | ------------------- | -------------------------- |
| list              | Array   | []                  | 瀑布流数据列表             |
| rowKey            | String  | 'id'                | 列表项的唯一标识           |
| imgSelector       | String  | 'src'               | 图片地址在数据项中的属性名 |
| width             | Number  | 200                 | 卡片的基础宽度             |
| columns           | Number  | 3                   | 瀑布流列数                 |
| gutter            | Number  | 10                  | 卡片之间的间距             |
| hasAroundGutter   | Boolean | true                | 是否启用外围间距           |
| animationPrefix   | String  | 'animate__animated' | 动画类名前缀               |
| animationEffect   | String  | 'fadeIn'            | 动画效果名称               |
| animationDuration | Number  | 1000                | 动画持续时间(ms)           |
| animationDelay    | Number  | 300                 | 动画延迟时间(ms)           |
| backgroundColor   | String  | '#fff'              | 容器背景色                 |
| lazyload          | Boolean | true                | 是否启用图片懒加载         |
| loadProps         | Object  | {}                  | 懒加载配置项               |
| crossOrigin       | Boolean | true                | 是否启用跨域加载           |
| delay             | Number  | 300                 | 布局更新延迟时间(ms)       |

### LazyImg 组件

| 属性名           | 类型    | 默认值 | 说明                           |
| ---------------- | ------- | ------ | ------------------------------ |
| url              | String  | ''     | 图片地址                       |
| loading          | String  | -      | 加载中显示的图片地址           |
| errorImg         | String  | -      | 加载失败显示的图片地址         |
| previewSrcList   | Array   | []     | 开启图片预览功能的图片列表     |
| previewIcon      | String  | ''     | 自定义预览图标的图片地址       |
| hideOnClickModal | Boolean | false  | 是否可以通过点击遮罩层关闭预览 |

## 插槽

### Waterfall 组件

| 插槽名 | 说明             | 作用域参数                                       |
| ------ | ---------------- | ------------------------------------------------ |
| item   | 自定义列表项内容 | { item: 列表项数据, index: 索引, url: 图片地址 } |

## 事件
### Waterfall 组件

| 方法名         | 说明                                                       | 参数 |
| -------------- | ---------------------------------------------------------- | ---- |
| renderer       | 强制更新瀑布流布局，用于在数据变化后手动触发重新计算和渲染 | 无   |
| clearAndReload | 清空当前数据并重新加载渲染，用于解决特定场景下的布局问题   | 无   |

 

## 注意事项

1. 确保提供的图片地址是有效的
2. 建议设置合适的基础宽度和间距，以获得最佳的视觉效果
3. 动画效果基于animate.css，使用前需要引入相应的样式文件
4. 图片预览功能基于element-plus的ElImage组件，支持查看大图和图片切换

 

## License

MIT


## keywords

`vue3` `typescript` `waterfall` `masonry` `瀑布流` `懒加载` `图片预览` `响应式` `动画效果`
