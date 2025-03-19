export interface ViewCard {
  src?: any;
  id?: string;
  name?: string;
  star?: boolean;
  backgroundColor?: string;
  [key: string]: any;
}

export interface WaterfallProps {
  columns: number;
  width: number;
  animationDuration: number;
  animationDelay: number;
  animationEffect: string;
  hasAroundGutter: boolean;
  gutter: number;
  list: ViewCard[];
  animationPrefix: string;
  backgroundColor: string;
  lazyload: boolean;
  loadProps: Record<string, any>;
  crossOrigin: boolean;
  delay: number;
  rowKey: string;
  imgSelector: string;
}

export interface ItemWidthProps {
  wrapperWidth: number;
  gutter: number;
  hasAroundGutter: boolean;
  columns: number;
}
