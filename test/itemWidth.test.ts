import { describe, expect, it } from "vitest";
import { getItemWidth } from "../lib/utils/itemWidth";

describe("item 的宽度", () => {
  it("hasAroundGutter 为 true 时的宽度计算", () => {
    const params = {
      columns: 3,
      wrapperWidth: 1200,
      gutter: 10,
      hasAroundGutter: true,
    };
    expect(getItemWidth(params)).toBe(390);
  });

  it("hasAroundGutter 为 false 时的宽度计算", () => {
    const params = {
      columns: 3,
      wrapperWidth: 1200,
      gutter: 10,
      hasAroundGutter: false,
    };
    expect(getItemWidth(params)).toBe(393.3333333333333);
  });

  it("不同列数的宽度计算", () => {
    const params = {
      columns: 4,
      wrapperWidth: 1000,
      gutter: 20,
      hasAroundGutter: true,
    };
    expect(getItemWidth(params)).toBe(225);
  });
});
