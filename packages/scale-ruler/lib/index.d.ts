import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { CreateComponentPublicInstanceWithMixins } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { GlobalComponents } from 'vue';
import { GlobalDirectives } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<ExtractPropTypes<    {
scale: {
type: NumberConstructor;
default: number;
};
minScale: {
type: NumberConstructor;
default: number;
};
maxScale: {
type: NumberConstructor;
default: number;
};
canScale: {
type: BooleanConstructor;
default: boolean;
};
autoCenter: {
type: BooleanConstructor;
default: boolean;
};
autoScale: {
type: BooleanConstructor;
default: boolean;
};
containerAutoSize: {
type: BooleanConstructor;
default: boolean;
};
containerWidth: {
type: NumberConstructor;
default: number;
};
containerHeight: {
type: NumberConstructor;
default: number;
};
containerXPadding: {
type: NumberConstructor;
default: number;
};
containerYPadding: {
type: NumberConstructor;
default: number;
};
canvasWidth: {
type: NumberConstructor;
default: number;
};
canvasHeight: {
type: NumberConstructor;
default: number;
};
proxyScaleKey: {
type: BooleanConstructor;
default: boolean;
};
useScrollBar: {
type: BooleanConstructor;
default: boolean;
};
useRuler: {
type: BooleanConstructor;
default: boolean;
};
usePositionLine: {
type: BooleanConstructor;
default: boolean;
};
positionLineConfig: {
type: PropType<PositionLineConfig>;
default: Required<PositionLineConfig>;
};
canvasStyle: {
type: PropType<AnyRecord>;
default: AnyRecord;
};
scrollBarConfig: {
type: PropType<ScrollBarConfig>;
default: Required<ScrollBarConfig>;
};
rulerConfig: {
type: PropType<RulerConfig>;
default: Required<RulerConfig>;
};
adsorptionXList: {
type: PropType<number[]>;
default: number[];
};
adsorptionYList: {
type: PropType<number[]>;
default: number[];
};
}>, {
reset: typeof reset;
changeScale: typeof changeScale;
removeAllPositionLine: typeof removeAllPositionLine;
showRuler(): void;
hideRuler(): void;
showAllPositionLine(): void;
hideAllPositionLine(): void;
addAdsorptionLine(data: number | number[], isY?: boolean): void;
removeAdsorptionLine(data: number | number[], isY?: boolean): void;
getPositionLineList: typeof getPositionLineList;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
onMove: (...args: any[]) => void;
"update:scale": (...args: any[]) => void;
onScale: (...args: any[]) => void;
"update:adsorptionXList": (...args: any[]) => void;
"update:adsorptionYList": (...args: any[]) => void;
}, string, PublicProps, Readonly<ExtractPropTypes<    {
scale: {
type: NumberConstructor;
default: number;
};
minScale: {
type: NumberConstructor;
default: number;
};
maxScale: {
type: NumberConstructor;
default: number;
};
canScale: {
type: BooleanConstructor;
default: boolean;
};
autoCenter: {
type: BooleanConstructor;
default: boolean;
};
autoScale: {
type: BooleanConstructor;
default: boolean;
};
containerAutoSize: {
type: BooleanConstructor;
default: boolean;
};
containerWidth: {
type: NumberConstructor;
default: number;
};
containerHeight: {
type: NumberConstructor;
default: number;
};
containerXPadding: {
type: NumberConstructor;
default: number;
};
containerYPadding: {
type: NumberConstructor;
default: number;
};
canvasWidth: {
type: NumberConstructor;
default: number;
};
canvasHeight: {
type: NumberConstructor;
default: number;
};
proxyScaleKey: {
type: BooleanConstructor;
default: boolean;
};
useScrollBar: {
type: BooleanConstructor;
default: boolean;
};
useRuler: {
type: BooleanConstructor;
default: boolean;
};
usePositionLine: {
type: BooleanConstructor;
default: boolean;
};
positionLineConfig: {
type: PropType<PositionLineConfig>;
default: Required<PositionLineConfig>;
};
canvasStyle: {
type: PropType<AnyRecord>;
default: AnyRecord;
};
scrollBarConfig: {
type: PropType<ScrollBarConfig>;
default: Required<ScrollBarConfig>;
};
rulerConfig: {
type: PropType<RulerConfig>;
default: Required<RulerConfig>;
};
adsorptionXList: {
type: PropType<number[]>;
default: number[];
};
adsorptionYList: {
type: PropType<number[]>;
default: number[];
};
}>> & Readonly<{
onOnMove?: ((...args: any[]) => any) | undefined;
"onUpdate:scale"?: ((...args: any[]) => any) | undefined;
onOnScale?: ((...args: any[]) => any) | undefined;
"onUpdate:adsorptionXList"?: ((...args: any[]) => any) | undefined;
"onUpdate:adsorptionYList"?: ((...args: any[]) => any) | undefined;
}>, {
adsorptionYList: number[];
adsorptionXList: number[];
scale: number;
minScale: number;
maxScale: number;
canScale: boolean;
autoCenter: boolean;
autoScale: boolean;
containerAutoSize: boolean;
containerWidth: number;
containerHeight: number;
containerXPadding: number;
containerYPadding: number;
canvasWidth: number;
canvasHeight: number;
proxyScaleKey: boolean;
useScrollBar: boolean;
useRuler: boolean;
usePositionLine: boolean;
positionLineConfig: PositionLineConfig;
canvasStyle: AnyRecord;
scrollBarConfig: ScrollBarConfig;
rulerConfig: RulerConfig;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, HTMLDivElement>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {
        container: HTMLDivElement;
        xRuler: CreateComponentPublicInstanceWithMixins<Readonly<ExtractPropTypes<    {
        containerInfo: {
        type: PropType<ContainerInfo>;
        required: true;
        };
        opt: {
        type: PropType<RequiredScaleRulerOpt>;
        required: true;
        };
        isY: {
        type: BooleanConstructor;
        default: boolean;
        };
        transformInfo: {
        type: PropType<TransformInfo>;
        required: true;
        };
        }>> & Readonly<{
        "onUpdate-adsorption-list"?: ((...args: any[]) => any) | undefined;
        }>, {
        modifyAdsorptionList: (data: number | number[], isAdd?: boolean) => void;
        removeAllPositionLine: () => void;
        togglePositionLine: (show?: boolean) => void;
        toggleRuler: (show?: boolean) => void;
        getPositionLineList: () => number[];
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update-adsorption-list": (...args: any[]) => void;
        }, PublicProps, {
        isY: boolean;
        }, true, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<ExtractPropTypes<    {
        containerInfo: {
        type: PropType<ContainerInfo>;
        required: true;
        };
        opt: {
        type: PropType<RequiredScaleRulerOpt>;
        required: true;
        };
        isY: {
        type: BooleanConstructor;
        default: boolean;
        };
        transformInfo: {
        type: PropType<TransformInfo>;
        required: true;
        };
        }>> & Readonly<{
        "onUpdate-adsorption-list"?: ((...args: any[]) => any) | undefined;
        }>, {
        modifyAdsorptionList: (data: number | number[], isAdd?: boolean) => void;
        removeAllPositionLine: () => void;
        togglePositionLine: (show?: boolean) => void;
        toggleRuler: (show?: boolean) => void;
        getPositionLineList: () => number[];
        }, {}, {}, {}, {
        isY: boolean;
        }> | null;
        yRuler: CreateComponentPublicInstanceWithMixins<Readonly<ExtractPropTypes<    {
        containerInfo: {
        type: PropType<ContainerInfo>;
        required: true;
        };
        opt: {
        type: PropType<RequiredScaleRulerOpt>;
        required: true;
        };
        isY: {
        type: BooleanConstructor;
        default: boolean;
        };
        transformInfo: {
        type: PropType<TransformInfo>;
        required: true;
        };
        }>> & Readonly<{
        "onUpdate-adsorption-list"?: ((...args: any[]) => any) | undefined;
        }>, {
        modifyAdsorptionList: (data: number | number[], isAdd?: boolean) => void;
        removeAllPositionLine: () => void;
        togglePositionLine: (show?: boolean) => void;
        toggleRuler: (show?: boolean) => void;
        getPositionLineList: () => number[];
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update-adsorption-list": (...args: any[]) => void;
        }, PublicProps, {
        isY: boolean;
        }, true, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<ExtractPropTypes<    {
        containerInfo: {
        type: PropType<ContainerInfo>;
        required: true;
        };
        opt: {
        type: PropType<RequiredScaleRulerOpt>;
        required: true;
        };
        isY: {
        type: BooleanConstructor;
        default: boolean;
        };
        transformInfo: {
        type: PropType<TransformInfo>;
        required: true;
        };
        }>> & Readonly<{
        "onUpdate-adsorption-list"?: ((...args: any[]) => any) | undefined;
        }>, {
        modifyAdsorptionList: (data: number | number[], isAdd?: boolean) => void;
        removeAllPositionLine: () => void;
        togglePositionLine: (show?: boolean) => void;
        toggleRuler: (show?: boolean) => void;
        getPositionLineList: () => number[];
        }, {}, {}, {}, {
        isY: boolean;
        }> | null;
    };
    rootEl: HTMLDivElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare interface AnyRecord {
    [key: string]: any;
}

/**
 * 改变尺寸
 */
declare function changeScale(scale: number): void;

/**
 * 容器信息
 */
declare interface ContainerInfo extends AnyRecord {
    originWidth?: number;
    originHeight?: number;
    hasAddResize?: boolean;
    position?: string;
    width?: number;
    height?: number;
}

declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;

/**
 * 获取所有定位线的坐标
 */
declare function getPositionLineList(isY: boolean): number[];

export declare interface PositionLineConfig {
    lineColor?: string;
    padding?: number;
    adsorptionGap?: number;
    zIndex?: number;
}

declare function removeAllPositionLine(): void;

declare interface RequiredScaleRulerOpt extends Required<ScaleRulerOption> {
    positionLineConfig: Required<PositionLineConfig>;
    scrollBarConfig: Required<ScrollBarConfig>;
    rulerConfig: Required<RulerConfig>;
}

declare function reset(): void;

export declare interface RulerConfig {
    xRulerHeight?: number;
    yRulerWidth?: number;
    bgColor?: string;
    fontColor?: string;
    fontSize?: number;
    fontFamily?: string;
    lineColor?: string;
    zIndex?: number;
}

export declare interface ScaleRulerOption {
    scale?: number;
    minScale?: number;
    maxScale?: number;
    canScale?: boolean;
    autoCenter?: boolean;
    autoScale?: boolean;
    containerAutoSize?: boolean;
    containerWidth?: number;
    containerHeight?: number;
    containerXPadding?: number;
    containerYPadding?: number;
    canvasWidth: number;
    canvasHeight: number;
    proxyScaleKey?: boolean;
    useScrollBar?: boolean;
    useRuler?: boolean;
    usePositionLine?: boolean;
    positionLineConfig?: PositionLineConfig;
    canvasStyle?: AnyRecord;
    scrollBarConfig?: ScrollBarConfig;
    rulerConfig?: RulerConfig;
    adsorptionXList?: number[];
    adsorptionYList?: number[];
}

export declare interface ScrollBarConfig {
    bgColor?: string;
    opacity?: number;
    barSize?: number;
    zIndex?: number;
}

/**
 * 画布移动配置
 */
declare interface TransformInfo {
    scale?: number;
    translateX?: number;
    translateY?: number;
}

export { }
