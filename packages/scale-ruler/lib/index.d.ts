import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

declare const __VLS_component: DefineComponent<ScaleRulerOption, {
reset: typeof reset;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ScaleRulerOption> & Readonly<{}>, {
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
onScale: (scale: number) => void;
onMove: (translateX: number, translateY: number) => void;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare function __VLS_template(): {
    slots: {
        default?(_: {}): any;
    };
    refs: {
        container: HTMLDivElement;
    };
    attrs: Partial<{}>;
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

declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;

export declare interface PositionLineConfig {
    lineColor: string;
    padding: number;
    adsorptionXList: number[];
    adsorptionYList: number[];
    adsorptionGap: number;
    zIndex: number;
}

declare function reset(): void;

export declare interface RulerConfig {
    xRulerHeight: number;
    yRulerWidth: number;
    bgColor: string;
    fontColor: string;
    fontSize: number;
    fontFamily: string;
    lineColor: string;
    zIndex: number;
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
    onScale?: (scale: number) => void;
    onMove?: (translateX: number, translateY: number) => void;
}

export declare interface ScrollBarConfig {
    bgColor: string;
    opacity: number;
    barSize: number;
    zIndex: number;
}

export { }
