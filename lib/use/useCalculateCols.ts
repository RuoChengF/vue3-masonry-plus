import { computed, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import { getItemWidth } from "../utils/itemWidth";
import type { WaterfallProps } from "../types/waterfall";
import type { Nullable } from "../types/util";

export function useCalculateCols(props: WaterfallProps) {
    const wrapperWidth = ref<number>(0);
    const waterfallWrapper = ref<Nullable<HTMLElement>>(null);

    useResizeObserver(waterfallWrapper, (entries) => {
        const entry = entries[0];
        const { width } = entry.contentRect;
        if (width === 0) return;
        wrapperWidth.value = width;
    });

    // 列实际宽度
    const colWidth = computed(() => {
        return getItemWidth({
            wrapperWidth: wrapperWidth.value,
            gutter: props.gutter,
            hasAroundGutter: props.hasAroundGutter,
            columns: props.columns,
        });
    });

    // 列
    const cols = computed(() => props.columns);

    // 偏移
    const offsetX = computed(() => {
        const offset = props.hasAroundGutter ? props.gutter : -props.gutter;
        const contextWidth =
            cols.value * (colWidth.value + props.gutter) + offset;
        return (wrapperWidth.value - contextWidth) / 2;
    });

    return {
        waterfallWrapper,
        wrapperWidth,
        colWidth,
        cols,
        offsetX,
    };
}
