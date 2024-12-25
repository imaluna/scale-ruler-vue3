import { defineComponent as _, computed as x, openBlock as w, createElementBlock as E, normalizeStyle as W, mergeDefaults as z, ref as j, watch as H, reactive as C, onMounted as F, createVNode as I, withCtx as L, renderSlot as T } from "vue";
const N = /* @__PURE__ */ _({
  __name: "CanvasPanel",
  props: {
    containerInfo: {
      type: Object
    },
    opt: Object
  },
  setup(o) {
    const l = o, i = x(() => {
      var a, s;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((a = l.opt) == null ? void 0 : a.canvasWidth) + "px",
        height: ((s = l.opt) == null ? void 0 : s.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0"
      };
    });
    return (a, s) => (w(), E("div", {
      ref: "canvasPanel",
      style: W(i.value)
    }, null, 4));
  }
});
function U(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var O, M;
function Y() {
  if (M) return O;
  M = 1;
  var o = function(t) {
    return l(t) && !i(t);
  };
  function l(e) {
    return !!e && typeof e == "object";
  }
  function i(e) {
    var t = Object.prototype.toString.call(e);
    return t === "[object RegExp]" || t === "[object Date]" || b(e);
  }
  var a = typeof Symbol == "function" && Symbol.for, s = a ? Symbol.for("react.element") : 60103;
  function b(e) {
    return e.$$typeof === s;
  }
  function m(e) {
    return Array.isArray(e) ? [] : {};
  }
  function h(e, t) {
    return t.clone !== !1 && t.isMergeableObject(e) ? y(m(e), e, t) : e;
  }
  function c(e, t, r) {
    return e.concat(t).map(function(f) {
      return h(f, r);
    });
  }
  function p(e, t) {
    if (!t.customMerge)
      return y;
    var r = t.customMerge(e);
    return typeof r == "function" ? r : y;
  }
  function d(e) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
      return Object.propertyIsEnumerable.call(e, t);
    }) : [];
  }
  function g(e) {
    return Object.keys(e).concat(d(e));
  }
  function u(e, t) {
    try {
      return t in e;
    } catch {
      return !1;
    }
  }
  function S(e, t) {
    return u(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
  }
  function B(e, t, r) {
    var f = {};
    return r.isMergeableObject(e) && g(e).forEach(function(n) {
      f[n] = h(e[n], r);
    }), g(t).forEach(function(n) {
      S(e, n) || (u(e, n) && r.isMergeableObject(t[n]) ? f[n] = p(n, r)(e[n], t[n], r) : f[n] = h(t[n], r));
    }), f;
  }
  function y(e, t, r) {
    r = r || {}, r.arrayMerge = r.arrayMerge || c, r.isMergeableObject = r.isMergeableObject || o, r.cloneUnlessOtherwiseSpecified = h;
    var f = Array.isArray(t), n = Array.isArray(e), R = f === n;
    return R ? f ? r.arrayMerge(e, t, r) : B(e, t, r) : h(t, r);
  }
  y.all = function(t, r) {
    if (!Array.isArray(t))
      throw new Error("first argument should be an array");
    return t.reduce(function(f, n) {
      return y(f, n, r);
    }, {});
  };
  var P = y;
  return O = P, O;
}
var $ = Y();
const A = /* @__PURE__ */ U($), v = {
  // 画布缩放比例
  scale: 1,
  // 是否允许缩放
  canScale: !0,
  // 最大缩放比例
  maxScale: 10,
  // 最小缩放比例
  minScale: 0.1,
  // 初始化是否自动居中
  autoCenter: !0,
  // 初始化时是否自动计算画布缩放比例，此时忽略scale
  autoScale: !0,
  // 是否自动计算容器的宽高，默认false，为true会监控container宽高变化并重新绘制
  containerAutoSize: !1,
  // 容器宽度，containerAutoSize为true后，不取该值
  containerWidth: 1e3,
  // 容器高度，containerAutoSize为true后，不取该值
  containerHeight: 500,
  containerXPadding: 80,
  containerYPadding: 80,
  canvasWidth: 1920,
  canvasHeight: 2e3,
  // 是否代理放大和缩小快捷键 ctrl+ "+" 和 ctrl + "-"
  proxyScaleKey: !0,
  // 是否展示滚动条
  useScrollBar: !0,
  // 是否展示标尺
  useRuler: !0,
  // 是否使用定位线
  usePositionLine: !0,
  positionLineConfig: {
    lineColor: "#24aa61",
    padding: 3,
    adsorptionXList: [],
    adsorptionYList: [],
    // 吸附距离
    adsorptionGap: 4
  },
  // 画布的样式
  canvasStyle: {},
  // 滚动条配置
  scrollBarConfig: {
    bgColor: "#000000",
    opacity: 0.4
  },
  // 标尺配置
  rulerConfig: {
    // 垂直标尺的宽度
    yRulerWidth: 30,
    // 水平标尺的高度
    xRulerHeight: 30,
    // 标尺背景色
    bgColor: "#efefef",
    // 标尺数值的颜色
    fontColor: "#000000",
    // 标尺数值的字体大小
    fontSize: 12,
    // 标尺数值的字体
    fontFamily: "Arial",
    // 标尺刻度线的颜色
    lineColor: "#000000"
  },
  // 画布缩放回调
  onScale: () => {
  },
  // 画布移动回调
  onMove: () => {
  }
}, D = function() {
  const o = {};
  for (const l in v) {
    const i = v[l];
    typeof i == "object" && i !== null ? o[l] = () => i : o[l] = i;
  }
  return o;
}(), X = /* @__PURE__ */ _({
  __name: "ScaleRuler",
  props: /* @__PURE__ */ z({
    scale: {},
    minScale: {},
    maxScale: {},
    canScale: { type: Boolean },
    autoCenter: { type: Boolean },
    autoScale: { type: Boolean },
    containerAutoSize: { type: Boolean },
    containerWidth: {},
    containerHeight: {},
    containerXPadding: {},
    containerYPadding: {},
    canvasWidth: {},
    canvasHeight: {},
    proxyScaleKey: { type: Boolean },
    useScrollBar: { type: Boolean },
    useRuler: { type: Boolean },
    usePositionLine: { type: Boolean },
    positionLineConfig: {},
    canvasStyle: {},
    scrollBarConfig: {},
    rulerConfig: {},
    onScale: { type: Function },
    onMove: { type: Function }
  }, D),
  setup(o) {
    const l = o, i = j(v);
    H(
      () => l,
      () => {
        i.value = A(i.value, l), console.log(i.value);
      },
      {
        deep: !0
      }
    );
    const a = C({}), s = C({}), b = j(null);
    function m() {
      if (!b.value) return;
      const c = b.value;
      let p = 0, d = 0;
      const g = i.value;
      if (g.containerAutoSize)
        p = c.offsetWidth, d = c.offsetHeight, a.originWidth = p, a.originHeight = d, a.hasAddResize || h(c);
      else {
        if (!g.containerWidth || !g.containerHeight)
          throw Error("");
        p = g.containerWidth, d = g.containerHeight, s.width = p, s.height = d;
      }
      const u = getComputedStyle(c);
      u.boxSizing === "border-box" && (p -= parseFloat(u.borderLeftWidth) + parseFloat(u.borderRightWidth), d -= parseFloat(u.borderTopWidth) + parseFloat(u.borderBottomWidth)), a.width = p, a.height = d, u.position === "static" && (s.position = "relative"), s.overflow = "hidden";
    }
    function h(c) {
      a.hasAddResize = !0, new ResizeObserver((d) => {
        for (const g of d)
          if (g.target === c) {
            const u = c.offsetWidth, S = c.offsetHeight;
            (u !== a.originWidth || S !== a.originHeight) && m();
          }
      }).observe(c);
    }
    return F(() => {
      i.value = A(v, l), m();
    }), (c, p) => (w(), E("div", {
      ref_key: "container",
      ref: b,
      style: W(s)
    }, [
      I(N, {
        "container-info": a,
        opt: i.value
      }, {
        default: L(() => [
          T(c.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt"])
    ], 4));
  }
});
export {
  X as default
};
