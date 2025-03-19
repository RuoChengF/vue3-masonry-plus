<template>
    <div class="container">
        <h1 class="title">Vue3 Waterfall Demo</h1>
        <div class="controls">
            <button @click="addItems" :disabled="loading" class="load-more-btn">
                <span v-if="!loading">加载更多</span>
                <span v-else class="loading-spinner"></span>
            </button>
        </div>
        <div v-infinite-scroll="loadMore">
            <Waterfall
                :list="imageList"
                :width="300"
                :gutter="16"
                :columns="4"
                img-selector="url"
                animation-effect="fadeIn"
                :animation-duration="1000"
                :animation-delay="300"
                background-color="#f5f5f5"
            >
                <template #item="{ item }">
                    <div class="card">
                        <div class="image-wrapper">
                            <LazyImg
                                :url="item.url"
                                :previewSrcList="[item.url]"
                                :previewIcon="previewIcon"
                            />
                            <!-- <div class="overlay">
                            <span class="zoom-icon">🔍</span>
                        </div> -->
                        </div>
                        <div class="card-content">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.description }}</p>
                            <div class="card-footer">
                                <span class="likes">❤️ {{ item.likes }}</span>
                                <span class="views">👁️ {{ item.views }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </Waterfall>
        </div>
    </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref } from "vue";
import { Waterfall, LazyImg } from "../../lib/index";
import previewIcon from "../assets/previewIcon.png";
interface ImageItem {
    id: number;
    url: string;
    title: string;
    description: string;
    likes: number;
    views: number;
}

const baseImages: ImageItem[] = [
    {
        id: 1,
        url: "https://picsum.photos/300/400",
        title: "自然风光",
        description: "壮丽的山川河流，展现大自然的鬼斧神工",
        likes: 128,
        views: 356,
    },
    {
        id: 2,
        url: "https://picsum.photos/300/500",
        title: "城市风景",
        description: "现代都市的繁华与活力",
        likes: 245,
        views: 589,
    },
    {
        id: 3,
        url: "https://picsum.photos/300/450",
        title: "花卉特写",
        description: "绚丽多彩的花朵，展现生命的美好",
        likes: 167,
        views: 423,
    },
    {
        id: 4,
        url: "https://picsum.photos/300/350",
        title: "海洋世界",
        description: "神秘浩瀚的海洋，孕育着无限生机",
        likes: 198,
        views: 467,
    },
    {
        id: 5,
        url: "https://picsum.photos/300/600",
        title: "动物世界",
        description: "可爱有趣的动物们，带来欢乐与温暖",
        likes: 312,
        views: 678,
    },
];

const imageList = ref<ImageItem[]>(baseImages);
const loading = ref(false);

const addItems = async () => {
    loading.value = true;

    const newItems = baseImages.map((item, index) => ({
        ...item,
        id: imageList.value.length + index + 1,
        url: `${item.url}?random=${Date.now()}-${index}`,
        likes: Math.floor(Math.random() * 500),
        views: Math.floor(Math.random() * 1000),
    }));
    imageList.value.push(...newItems);
    loading.value = false;
};
const loadMore = _.debounce(
    () => {
        addItems();
    },
    1000,
    {
        leading: true,
        trailing: false,
    }
);
</script>

<style scoped>
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 2.5em;
    font-weight: bold;
}

.controls {
    text-align: center;
    margin-bottom: 20px;
}

.load-more-btn {
    padding: 12px 24px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    position: relative;
    min-width: 120px;
}

.load-more-btn:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.load-more-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.card {
    border-radius: 12px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.image-wrapper {
    position: relative;
    overflow: hidden;
}

.image-wrapper img {
    width: 100%;
    display: block;
    transition: transform 0.3s ease;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.card:hover .overlay {
    opacity: 1;
}

.card:hover .image-wrapper img {
    transform: scale(1.1);
}

.zoom-icon {
    font-size: 2em;
    color: white;
}

.card-content {
    padding: 16px;
}

.card-content h3 {
    margin: 0 0 8px;
    color: #333;
    font-size: 1.2em;
    font-weight: bold;
}

.card-content p {
    margin: 0 0 12px;
    color: #666;
    font-size: 0.9em;
    line-height: 1.5;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    color: #888;
    font-size: 0.9em;
}

.likes,
.views {
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>
