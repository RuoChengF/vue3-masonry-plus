export interface ViewCard {
    src: any;
    id?: string;
    name?: string;
    star?: boolean;
    backgroundColor?: string;
    [attr: string]: any;
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
}

export interface ItemWidthProps {
    wrapperWidth: number;
    gutter: number;
    hasAroundGutter: boolean;
    columns: number;
}
