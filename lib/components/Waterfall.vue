<template>
  <div
    ref="waterfallWrapper"
    class="waterfall-list"
    :style="{ height: `${wrapperHeight}px` }"
  >
    <div
      v-for="(item, index) in list"
      :key="getKey(item, index)"
      class="waterfall-item"
    >
      <div class="waterfall-card">
        <slot
          name="item"
          :item="item"
          :index="index"
          :url="getRenderURL(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { provide, ref, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useCalculateCols, useLayout } from "../use";
import Lazy from "../utils/Lazy";
import { getValue } from "../utils/util";
import type { ViewCard } from "../types/waterfall";

const props = defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  rowKey: {
    type: String,
    default: "id",
  },
  imgSelector: {
    type: String,
    default: "src",
  },
  width: {
    type: Number,
    default: 200,
  },
  columns: {
    type: Number,
    default: 3,
  },
  gutter: {
    type: Number,
    default: 10,
  },
  hasAroundGutter: {
    type: Boolean,
    default: true,
  },
  animationPrefix: {
    type: String,
    default: "animate__animated",
  },
  animationEffect: {
    type: String,
    default: "fadeIn",
  },
  animationDuration: {
    type: Number,
    default: 1000,
  },
  animationDelay: {
    type: Number,
    default: 300,
  },
  backgroundColor: {
    type: String,
    default: "#fff",
  },
  lazyload: {
    type: Boolean,
    default: true,
  },
  loadProps: {
    type: Object,
    default: () => {},
  },
  crossOrigin: {
    type: Boolean,
    default: true,
  },
  delay: {
    type: Number,
    default: 300,
  },
});

const lazy = new Lazy(props.lazyload, props.loadProps, props.crossOrigin);
provide("lazy", lazy);

// 容器块信息
const { waterfallWrapper, wrapperWidth, colWidth, cols, offsetX } =
  useCalculateCols(props);

// 容器高度，块定位
const { wrapperHeight, layoutHandle } = useLayout(
  props,
  colWidth,
  cols,
  offsetX,
  waterfallWrapper
);

// 1s内最多执行一次排版，减少性能开销
const renderer = useDebounceFn(() => {
  layoutHandle();
  //   console.log("强制更新排版");
}, props.delay);

// 列表发生变化直接触发排版
watch(
  () => [wrapperWidth, colWidth, props.list],
  () => {
    renderer();
  },
  { deep: true }
);

// 尺寸宽度变化防抖触发
const sizeChangeTime = ref(0);

provide("sizeChangeTime", sizeChangeTime);

// 图片加载完成
provide("imgLoaded", renderer);

// 根据选择器获取图片地址
const getRenderURL = (item: ViewCard): string => {
  return getValue(item, props.imgSelector)[0];
};

// 获取唯一值
const getKey = (item: ViewCard, index: number): string => {
  return item[props.rowKey] || index;
};

const clearAndReload = () => {
  const originalList = [...props.list];
  props.list.length = 0;
  setTimeout(() => {
    props.list.push(...originalList);
    renderer();
  }, 0);
};

defineExpose({
  waterfallWrapper,
  wrapperHeight,
  getRenderURL,
  getKey,
  list: props.list,
  backgroundColor: props.backgroundColor,
  renderer,
  clearAndReload,
});
</script>

<style scoped>
.waterfall-list {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: v-bind(backgroundColor);
}
.waterfall-item {
  position: absolute;
  left: 0;
  top: 0;
  /* transition: .3s; */
  /* 初始位置设置到屏幕以外，避免懒加载失败 */
  transform: translate3d(0, 3000px, 0);
  visibility: hidden;
}

/* 初始的入场效果 */
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
</style>
