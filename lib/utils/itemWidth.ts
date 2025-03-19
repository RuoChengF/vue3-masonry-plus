import type { ItemWidthProps } from "../types/waterfall";

/**
 * @description: 获取当前窗口尺寸下格子的宽度
 * @param {ItemWidthProps} param1
 * @return {*}
 */
export const getItemWidth = ({
    wrapperWidth,
    gutter,
    hasAroundGutter,
    columns,
}: ItemWidthProps) => {
    if (hasAroundGutter) {
        return (wrapperWidth - gutter) / columns - gutter;
    } else {
        return (wrapperWidth - (columns - 1) * gutter) / columns;
    }
};
