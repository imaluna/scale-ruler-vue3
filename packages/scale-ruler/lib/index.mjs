import { defineComponent as B, computed as _, openBlock as I, createElementBlock as R, normalizeStyle as P, nextTick as U, ref as Y, watch as V, reactive as D, onMounted as K, mergeDefaults as G, unref as x, Fragment as k, createVNode as W, createCommentVNode as A, withCtx as J, renderSlot as Q, createBlock as L } from "vue";
const Z = /* @__PURE__ */ B({
  __name: "CanvasPanel",
  props: {
    containerInfo: {
      type: Object,
      required: !0
    },
    opt: {
      type: Object,
      required: !0
    },
    canvasInfo: {
      type: Object,
      required: !0
    }
  },
  setup(r) {
    const i = r, e = _(() => {
      var d, t;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((d = i.opt) == null ? void 0 : d.canvasWidth) + "px",
        height: ((t = i.opt) == null ? void 0 : t.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0",
        transform: `translate(${i.canvasInfo.translateX}px, ${i.canvasInfo.translateY}px) scale(${i.canvasInfo.scale})`,
        ...i.opt.canvasStyle
      };
    });
    return (d, t) => (I(), R("div", {
      ref: "canvasPanel",
      style: P(e.value)
    }, null, 4));
  }
}), $ = /* @__PURE__ */ B({
  __name: "ScrollBar",
  props: {
    containerInfo: {
      type: Object,
      required: !0
    },
    opt: {
      type: Object,
      required: !0
    },
    isY: {
      type: Boolean,
      default: !1
    },
    scrollBarInfo: {
      type: Object,
      required: !0
    }
  },
  setup(r) {
    const i = r, e = _(() => {
      const { opt: d, scrollBarInfo: t, isY: a } = i, { scrollBarConfig: c } = d, s = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: c.bgColor,
        opacity: 0.4,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: c.zIndex,
        width: (a ? c.barSize : t.width) + "px",
        height: (a ? t.height : c.barSize) + "px"
      };
      return a ? (s.top = t.top + "px", s.right = 0) : (s.left = t.left + "px", s.bottom = 0), s;
    });
    return (d, t) => (I(), R("div", {
      ref: "scrollBar",
      style: P(e.value)
    }, null, 4));
  }
}), ee = (r) => r <= 0.25 ? 40 : r <= 0.5 ? 20 : r <= 1 ? 10 : r <= 2 ? 5 : r <= 4 ? 2 : 1, te = (r, i, e, d) => {
  U(() => {
    const t = d.value;
    if (t) {
      const a = t.offsetWidth, c = t.offsetHeight, { rulerConfig: s } = r, { bgColor: y, fontFamily: v, fontSize: b, lineColor: m, fontColor: O } = s;
      if (a > 0 && c > 0) {
        const l = t.getContext("2d");
        l.clearRect(0, 0, a, c), y && (l.save(), l.fillStyle = y, l.fillRect(0, 0, a, c), l.restore());
        const p = e ? s.yRulerWidth : s.xRulerHeight, { translateX: w, translateY: M, scale: n } = i, o = e ? M : w, f = ee(n), g = f * n, u = window.devicePixelRatio, z = -o, E = Math.floor(z / g), T = Math.floor(
          ((e ? c : a) - o) / g
        );
        l.save(), l.fillStyle = m, l.font = `${b * u}px ${v}`, l.translate(0.5, 0.5), l.scale(1 / u, 1 / u), e ? l.fillRect((p - 1) * u, 0, 1, c * u) : l.fillRect(0, (p - 1) * u, a * u, 1);
        for (let S = E; S <= T; S++) {
          l.fillStyle = m;
          const j = (o + S * g) * u;
          let C = p / 4;
          S % 10 === 0 ? C = p * 4 / 5 : S % 5 === 0 && (C = p / 3), e ? l.fillRect((p - C) * u, j, C * u, 1) : (l.fillRect(j, (p - C) * u, 1, C * u), S % 10 === 0 && (l.fillStyle = O, l.fillText(
            String(S * f),
            j + 2 * u,
            (p + 8 - C) * u
          )));
        }
        if (l.restore(), e) {
          l.font = `${b}px ${v}`;
          let S = E;
          for (; S <= T; )
            if (S % 10)
              S++;
            else {
              l.save();
              const j = o + S * g + p / 2;
              l.translate(j + p / 5, j - p * 6 / 5), l.rotate(Math.PI / 2), l.fillText(String(S * f), p * 4 / 5, j), S += 10, l.restore();
            }
        }
      }
    }
  });
}, ne = ["width", "height"], q = /* @__PURE__ */ B({
  __name: "Ruler",
  props: {
    containerInfo: {
      type: Object,
      required: !0
    },
    opt: {
      type: Object,
      required: !0
    },
    canvasInfo: {
      type: Object,
      required: !0
    },
    isY: {
      type: Boolean,
      default: !1
    }
  },
  setup(r) {
    const i = r, e = _(() => {
      const { isY: a, containerInfo: c, opt: s } = i;
      return {
        width: a ? s.rulerConfig.yRulerWidth : c.width,
        height: a ? c.height : s.rulerConfig.xRulerHeight
      };
    }), d = _(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: i.opt.rulerConfig.zIndex + (i.isY ? 0 : 1)
    })), t = Y();
    return V(
      [() => i.containerInfo, () => i.canvasInfo],
      () => {
        te(
          i.opt,
          i.canvasInfo,
          i.isY,
          t
        );
      },
      {
        deep: !0
      }
    ), (a, c) => (I(), R("canvas", {
      ref_key: "rulerRef",
      ref: t,
      style: P(d.value),
      width: e.value.width,
      height: e.value.height
    }, null, 12, ne));
  }
});
function re(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var H, F;
function oe() {
  if (F) return H;
  F = 1;
  var r = function(o) {
    return i(o) && !e(o);
  };
  function i(n) {
    return !!n && typeof n == "object";
  }
  function e(n) {
    var o = Object.prototype.toString.call(n);
    return o === "[object RegExp]" || o === "[object Date]" || a(n);
  }
  var d = typeof Symbol == "function" && Symbol.for, t = d ? Symbol.for("react.element") : 60103;
  function a(n) {
    return n.$$typeof === t;
  }
  function c(n) {
    return Array.isArray(n) ? [] : {};
  }
  function s(n, o) {
    return o.clone !== !1 && o.isMergeableObject(n) ? w(c(n), n, o) : n;
  }
  function y(n, o, f) {
    return n.concat(o).map(function(g) {
      return s(g, f);
    });
  }
  function v(n, o) {
    if (!o.customMerge)
      return w;
    var f = o.customMerge(n);
    return typeof f == "function" ? f : w;
  }
  function b(n) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(n).filter(function(o) {
      return Object.propertyIsEnumerable.call(n, o);
    }) : [];
  }
  function m(n) {
    return Object.keys(n).concat(b(n));
  }
  function O(n, o) {
    try {
      return o in n;
    } catch {
      return !1;
    }
  }
  function l(n, o) {
    return O(n, o) && !(Object.hasOwnProperty.call(n, o) && Object.propertyIsEnumerable.call(n, o));
  }
  function p(n, o, f) {
    var g = {};
    return f.isMergeableObject(n) && m(n).forEach(function(u) {
      g[u] = s(n[u], f);
    }), m(o).forEach(function(u) {
      l(n, u) || (O(n, u) && f.isMergeableObject(o[u]) ? g[u] = v(u, f)(n[u], o[u], f) : g[u] = s(o[u], f));
    }), g;
  }
  function w(n, o, f) {
    f = f || {}, f.arrayMerge = f.arrayMerge || y, f.isMergeableObject = f.isMergeableObject || r, f.cloneUnlessOtherwiseSpecified = s;
    var g = Array.isArray(o), u = Array.isArray(n), z = g === u;
    return z ? g ? f.arrayMerge(n, o, f) : p(n, o, f) : s(o, f);
  }
  w.all = function(o, f) {
    if (!Array.isArray(o))
      throw new Error("first argument should be an array");
    return o.reduce(function(g, u) {
      return w(g, u, f);
    }, {});
  };
  var M = w;
  return H = M, H;
}
var ie = oe();
const N = /* @__PURE__ */ re(ie), X = {
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
    adsorptionGap: 4,
    zIndex: 300
  },
  // 画布的样式
  canvasStyle: {},
  // 滚动条配置
  scrollBarConfig: {
    bgColor: "#000000",
    opacity: 0.4,
    zIndex: 500,
    barSize: 8
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
    lineColor: "#000000",
    zIndex: 500
  },
  // 画布缩放回调
  onScale: () => {
  },
  // 画布移动回调
  onMove: () => {
  }
}, ae = function() {
  const r = {};
  for (const i in X) {
    const e = X[i];
    typeof e == "object" && e !== null ? r[i] = () => e : r[i] = e;
  }
  return r;
}(), h = D({
  width: 0,
  height: 0,
  originWidth: 0,
  originHeight: 0
});
function ce(r) {
  new ResizeObserver((e) => {
    for (const d of e)
      if (d.target === r) {
        const t = r.offsetWidth, a = r.offsetHeight;
        t !== h.originWidth || h.originHeight;
      }
  }).observe(r);
}
const se = (r, i) => {
  K(() => {
    const t = r.value, a = i.value;
    if (a) {
      t.containerAutoSize ? (h.width = a.offsetWidth, h.height = a.offsetHeight, h.originWidth = h.width, h.originHeight = h.height, ce(a)) : (h.width = t.containerWidth, h.height = t.containerHeight);
      const c = getComputedStyle(a);
      c.boxSizing === "border-box" && (h.width -= parseFloat(c.borderLeftWidth) + parseFloat(c.borderRightWidth), h.height -= parseFloat(c.borderTopWidth) + parseFloat(c.borderBottomWidth)), c.position === "static" && (h.position = "relative");
    }
  });
  const e = _(() => ({
    width: h.width,
    height: h.height
  })), d = _(() => {
    const t = r.value, a = {
      overflow: "hidden"
    };
    return t.containerAutoSize || (a.width = h.width + "px", a.height = h.height + "px"), h.position && (a.position = h.position), a;
  });
  return {
    containerInfo: e,
    containerStyle: d
  };
};
function le(r, i, e, d) {
  const t = e.value, { containerXPadding: a, containerYPadding: c } = t, { width: s, height: y } = d.value, v = Math.max((s - r) / 2, a), b = Math.max((y - i) / 2, c), m = r + 2 * a > s ? s - (r + a) : v, O = i + 2 * c > y ? y - (i + c) : b;
  return {
    maxTranslateX: v,
    maxTranslateY: b,
    minTranslateX: m,
    minTranslateY: O
  };
}
const ue = (r, i) => _(() => {
  const e = r.value, d = {};
  let { scale: t } = e;
  const { autoCenter: a, autoScale: c } = e, { width: s, height: y } = i.value;
  if (c) {
    const p = (s - 2 * e.containerXPadding) / e.canvasWidth, w = (y - 2 * e.containerYPadding) / e.canvasHeight;
    t = Math.min(p, w);
  }
  d.scale = t;
  let v = 0, b = 0;
  const m = e.canvasWidth * t, O = e.canvasHeight * t;
  a && (v = Math.floor((s - m) / 2), b = Math.floor((y - O) / 2), d.translateX = v, d.translateY = b);
  const l = le(
    m,
    O,
    r,
    i
  );
  return Object.assign(d, l), d;
}), fe = (r, i, e) => _(() => {
  const t = r.value, { width: a, height: c } = i.value, { translateX: s, translateY: y, scale: v } = e.value, b = t.canvasWidth * v + 2 * t.containerXPadding, m = t.canvasHeight * v + 2 * t.containerYPadding, O = a < b, l = c < m, p = O || l, w = t.containerXPadding - s, M = t.containerYPadding - y, n = a / b * a, o = c / m * c;
  return {
    totalHeight: m,
    totalWidth: b,
    left: w,
    top: M,
    width: n,
    height: o,
    isYLarge: l,
    isXLarge: O,
    isLarge: p
  };
}), he = /* @__PURE__ */ B({
  __name: "ScaleRuler",
  props: /* @__PURE__ */ G({
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
  }, ae),
  setup(r) {
    const i = r, e = Y(
      N(X, i)
    ), d = Y(null), { containerInfo: t, containerStyle: a } = se(e, d), c = ue(e, t), s = fe(e, t, c);
    return V(
      () => i,
      () => {
        e.value = N(e.value, i);
      },
      {
        deep: !0
      }
    ), (y, v) => (I(), R("div", {
      ref_key: "container",
      ref: d,
      style: P(x(a))
    }, [
      e.value.useRuler ? (I(), R(k, { key: 0 }, [
        W(q, {
          opt: e.value,
          "container-info": x(t),
          "canvas-info": x(c)
        }, null, 8, ["opt", "container-info", "canvas-info"]),
        W(q, {
          "is-y": "",
          opt: e.value,
          "container-info": x(t),
          "canvas-info": x(c)
        }, null, 8, ["opt", "container-info", "canvas-info"])
      ], 64)) : A("", !0),
      W(Z, {
        "container-info": x(t),
        opt: e.value,
        "canvas-info": x(c)
      }, {
        default: J(() => [
          Q(y.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "canvas-info"]),
      x(s).isXLarge ? (I(), L($, {
        key: 1,
        opt: e.value,
        "container-info": x(t),
        "scroll-bar-info": x(s)
      }, null, 8, ["opt", "container-info", "scroll-bar-info"])) : A("", !0),
      x(s).isYLarge ? (I(), L($, {
        key: 2,
        opt: e.value,
        "container-info": x(t),
        "scroll-bar-info": x(s),
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info"])) : A("", !0)
    ], 4));
  }
});
export {
  he as default
};
