<template>
    <div class="lazy__box">
        <div class="lazy__resource">
            <div class="image-container">
                <el-image
                    ref="lazyRef"
                    class="lazy__img"
                    :src="url"
                    :preview-src-list="
                        previewSrcList.length > 0 ? previewSrcList : []
                    "
                    fit="contain"
                    :preview-teleported="true"
                    :initial-index="0"
                    :hide-on-click-modal="false"
                    @load="handleLoad"
                    @error="handleError"
                >
                    <template #placeholder>
                        <img :src="loading" alt="loading" />
                    </template>
                    <template #error>
                        <img :src="errorImg" alt="error" />
                    </template>
                </el-image>
                <div
                    class="overlay"
                    v-if="previewSrcList.length > 0 && previewIcon"
                    @click="hanldeShowPreview"
                >
                    <div class="preview-icon">
                        <img :src="previewIcon" alt="preview" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, toRefs } from "vue";
import { ElImage } from "element-plus";
import type { Nullable } from "../types/util";
import loadingImg from "../assets/loading.gif";
import loadError from "../assets/loadError.png";
import type { PropType } from "vue";
const props = defineProps({
    previewIcon: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    },
    loading: {
        type: String,
        default: loadingImg,
    },
    errorImg: {
        type: String,
        default: loadError,
    },
    previewSrcList: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
});
const { url, loading, errorImg, previewSrcList } = toRefs(props);

const imgLoaded = inject("imgLoaded") as () => void;
const lazyRef = ref<Nullable<InstanceType<typeof ElImage>>>(null);

const handleLoad = () => {
    imgLoaded();
};

const handleError = () => {
    // 可以在这里添加错误处理逻辑
};
// 显示预览
const hanldeShowPreview = () => {
    if (lazyRef.value) {
        lazyRef.value.showPreview();
    }
};
onMounted(() => {
    if (lazyRef.value) {
        imgLoaded();
    }
});
</script>

<style scoped>
.lazy__box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lazy__resource {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lazy__img {
    width: 100%;
    height: auto;
    display: block;
}

:deep(.el-image) {
    width: 100%;
    display: block;
}

:deep(.el-image__inner) {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.lazy__img img[alt="loading"],
.lazy__img img[alt="error"] {
    width: 48px;
    height: 48px;
    padding: 1em;
    margin: 0 auto;
    display: block;
}

.image-container {
    position: relative;
    width: 100%;
    cursor: pointer;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-container:hover .overlay {
    opacity: 1;
}

.preview-icon {
    color: white;
    width: 32px;
    height: 32px;
}

:deep(.el-image__placeholder),
:deep(.el-image__error) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.el-image__placeholder) img,
:deep(.el-image__error) img {
    width: 48px;
    height: 48px;
    object-fit: contain;
}
</style>
