import { defineComponent as W, computed as R, openBlock as C, createElementBlock as E, normalizeStyle as Y, toRefs as K, ref as _, onMounted as A, nextTick as te, reactive as X, watch as T, createElementVNode as D, toDisplayString as ne, unref as S, Fragment as k, withDirectives as oe, vShow as re, normalizeClass as ae, renderList as ie, createBlock as q, createCommentVNode as I, mergeDefaults as se, createVNode as H, withCtx as le, renderSlot as ce } from "vue";
const ue = /* @__PURE__ */ W({
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
    transformInfo: {
      type: Object,
      required: !0
    }
  },
  setup(s) {
    const f = s, e = R(() => {
      var l, n;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((l = f.opt) == null ? void 0 : l.canvasWidth) + "px",
        height: ((n = f.opt) == null ? void 0 : n.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0",
        transform: `translate(${f.transformInfo.translateX}px, ${f.transformInfo.translateY}px) scale(${f.transformInfo.scale})`,
        ...f.opt.canvasStyle
      };
    });
    return (l, n) => (C(), E("div", {
      ref: "canvasPanel",
      style: Y(e.value)
    }, null, 4));
  }
}), U = /* @__PURE__ */ W({
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
    },
    globalInfo: {
      type: Object,
      required: !0
    },
    transformInfo: {
      type: Object,
      required: !0
    }
  },
  setup(s) {
    const f = s, { globalInfo: e, transformInfo: l } = K(f), n = R(() => {
      const { opt: o, scrollBarInfo: t, isY: d } = f, { scrollBarConfig: i } = o, g = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: i.bgColor,
        opacity: f.globalInfo[d ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: i.zIndex,
        width: (d ? i.barSize : t.width) + "px",
        height: (d ? t.height : i.barSize) + "px"
      };
      return d ? (g.top = t.top + "px", g.right = 0) : (g.left = t.left + "px", g.bottom = 0), g;
    }), h = _(null), r = {};
    function c(o) {
      if (o.preventDefault(), !e.value.scrollBarMouseDown) return;
      let { translateX: t, translateY: d } = l.value;
      const i = f.scrollBarInfo, { width: g, height: u } = f.containerInfo;
      if (f.isY) {
        const m = o.pageY - r.startY;
        let b = r.top + m;
        b = Math.min(Math.max(0, b), u - i.height);
        const x = b * i.totalHeight / u;
        d = f.opt.containerYPadding - x, l.value.translateY = d;
      } else {
        const m = o.pageX - r.startX;
        let b = r.left + m;
        b = Math.min(Math.max(0, b), g - i.width);
        const x = b * i.totalWidth / g;
        t = f.opt.containerXPadding - x, l.value.translateX = t;
      }
    }
    return A(() => {
      if (h.value) {
        const o = h.value, t = f.isY ? "yOpacity" : "xOpacity";
        o.addEventListener("mouseenter", () => {
          e.value[t] = f.opt.scrollBarConfig.opacity, e.value[f.isY ? "xOpacity" : "yOpacity"] = 0, e.value.scrollBarEnter = !0;
        }), o.addEventListener("mouseleave", () => {
          e.value.scrollBarMouseDown || (e.value.scrollBarEnter = !1, e.value[t] = 0);
        }), o.addEventListener("mousedown", (d) => {
          d.preventDefault(), e.value.scrollBarMouseDown = !0, r.startX = d.pageX, r.startY = d.pageY, r.left = f.scrollBarInfo.left, r.top = f.scrollBarInfo.top, document.addEventListener("mousemove", c);
        }), document.addEventListener("mouseup", () => {
          e.value.scrollBarMouseDown && (e.value.scrollBarMouseDown = !1, document.removeEventListener("mousemove", c));
        });
      }
    }), (o, t) => (C(), E("div", {
      ref_key: "scrollBarRef",
      ref: h,
      style: Y(n.value)
    }, null, 4));
  }
}), fe = (s) => s <= 0.25 ? 40 : s <= 0.5 ? 20 : s <= 1 ? 10 : s <= 2 ? 5 : s <= 4 ? 2 : 1, de = (s) => {
  const f = s.getBoundingClientRect(), e = f.top + (document.body.scrollTop || document.documentElement.scrollTop), l = f.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top: e, left: l };
}, $ = (s, f, e) => {
  const { scale: l, translateX: n, translateY: h } = s;
  return (f - (e ? h : n)) / l;
}, N = (s, f, e) => {
  const { scale: l, translateX: n, translateY: h } = s, r = f * l;
  return (e ? h : n) + r;
};
function Z(s, f, e, l, n, h) {
  const r = { coordinate: n, translate: l }, c = s.length;
  if (c > 0) {
    let o = 0;
    for (; o < c; ) {
      const t = s[o];
      if (Math.abs(n - t) <= e) {
        r.coordinate = t, r.translate = N(f, t, h);
        break;
      } else if (t > n)
        break;
      o++;
    }
  }
  return r;
}
const pe = (s, f, e, l) => {
  te(() => {
    const n = l.value;
    if (n) {
      const h = n.offsetWidth, r = n.offsetHeight, { rulerConfig: c } = s, { bgColor: o, fontFamily: t, fontSize: d, lineColor: i, fontColor: g } = c;
      if (h > 0 && r > 0) {
        const u = n.getContext("2d");
        u.clearRect(0, 0, h, r), o && (u.save(), u.fillStyle = o, u.fillRect(0, 0, h, r), u.restore());
        const m = e ? c.yRulerWidth : c.xRulerHeight, { translateX: b, translateY: x, scale: a } = f, v = e ? x : b, p = fe(a), w = p * a, y = window.devicePixelRatio, L = -v, M = Math.floor(L / w), j = Math.floor(
          ((e ? r : h) - v) / w
        );
        u.save(), u.fillStyle = i, u.font = `${d * y}px ${t}`, u.translate(0.5, 0.5), u.scale(1 / y, 1 / y), e ? u.fillRect((m - 1) * y, 0, 1, r * y) : u.fillRect(0, (m - 1) * y, h * y, 1);
        for (let O = M; O <= j; O++) {
          u.fillStyle = i;
          const B = (v + O * w) * y;
          let P = m / 4;
          O % 10 === 0 ? P = m * 4 / 5 : O % 5 === 0 && (P = m / 3), e ? u.fillRect((m - P) * y, B, P * y, 1) : (u.fillRect(B, (m - P) * y, 1, P * y), O % 10 === 0 && (u.fillStyle = g, u.fillText(
            String(O * p),
            B + 2 * y,
            (m + 8 - P) * y
          )));
        }
        if (u.restore(), e) {
          u.font = `${d}px ${t}`;
          let O = M;
          for (; O <= j; )
            if (O % 10)
              O++;
            else {
              u.save();
              const B = v + O * w + m / 2;
              u.translate(B + m / 5, B - m * 6 / 5), u.rotate(Math.PI / 2), u.fillText(String(O * p), m * 4 / 5, B), O += 10, u.restore();
            }
        }
      }
    }
  });
}, ve = (s, f) => {
  const e = X([0]);
  function l(t, d = !0) {
    const i = e.indexOf(t);
    d && i === -1 && e.push(t), !d && i > -1 && e.splice(i, 1), d && e.sort((g, u) => g - u);
  }
  function n(t, d = !0) {
    Array.isArray(t) ? t.forEach((i) => l(i, d)) : l(t, d);
  }
  function h(t) {
    n(t);
  }
  function r(t) {
    n(t, !1);
  }
  const c = R(
    () => s.positionLineConfig[f ? "adsorptionYList" : "adsorptionXList"]
  );
  T(
    () => c.value,
    (t) => {
      h(t);
    },
    {
      deep: !0
    }
  );
  const o = R(
    () => f ? s.canvasWidth : s.canvasHeight
  );
  return T(
    () => o.value,
    (t, d) => {
      d !== void 0 && r(d), h(t);
    },
    {
      immediate: !0
    }
  ), { adsorptionList: e, modifyAdsorptionList: n };
}, he = (s, f, e, l, n, h) => {
  let r = 1;
  const c = X([]);
  let o = -1, t = !1;
  function d(i) {
    if (t && o > -1) {
      i.preventDefault();
      const { xRulerHeight: g, yRulerWidth: u } = s.value.rulerConfig, m = c[o], b = (n ? i.pageY : i.pageX) - m.start, x = m.startTranslate + b, a = x > (n ? g : u), v = $(
        l.value,
        x,
        n
      ), p = Z(
        e,
        l.value,
        s.value.positionLineConfig.adsorptionGap,
        x,
        v,
        n
      );
      c[o].showTip = a, c[o].coordinate = p.coordinate;
    }
  }
  return A(() => {
    if (h.value) {
      const i = h.value;
      i.addEventListener("mousedown", (g) => {
        const u = de(i), m = n ? g.pageY : g.pageX, b = m - (n ? u.top : u.left), x = {
          startTranslate: b,
          start: m,
          id: r,
          coordinate: $(
            l.value,
            b,
            n
          ),
          showTip: !1,
          show: !0,
          needAnimate: !1
        };
        o = r, c[r++] = x, t = !0, document.addEventListener("mousemove", d);
      }), document.addEventListener("mouseup", () => {
        if (document.removeEventListener("mousemove", d), !t || o < 0) return;
        t = !1;
        const g = c[o], { width: u, height: m } = f.value, { xRulerHeight: b, yRulerWidth: x } = s.value.rulerConfig;
        g.translate <= (n ? b : x) || g.translate >= (n ? m : u) ? delete c[o] : (c[o].showTip = !1, c[o].needAnimate = !0), o = -1;
      });
    }
  }), { positionLineMap: c };
}, ge = (s, f, e, l, n, h, r, c) => {
  let o = !1;
  function t(i) {
    r.value.showTip = i;
  }
  function d(i) {
    if (!o) return;
    const g = (n ? i.pageY : i.pageX) - r.value.start, u = r.value.startTranslate + g, m = $(
      l.value,
      u,
      n
    ), b = Z(
      e.value,
      l.value,
      s.value.positionLineConfig.adsorptionGap,
      u,
      m,
      n
    );
    r.value.coordinate = b.coordinate;
  }
  A(() => {
    if (h.value) {
      const i = h.value;
      i.addEventListener("mouseenter", () => {
        t(!0);
      }), i.addEventListener("mouseleave", () => {
        console.log({ isMouseDown: o }), o || t(!1);
      }), i.addEventListener("mousedown", (g) => {
        g.preventDefault(), o = !0, r.value.showTip = !0;
        const u = n ? g.pageY : g.pageX;
        r.value.start = u, r.value.startTranslate = N(
          l.value,
          r.value.coordinate,
          n
        ), r.value.needAnimate = !1, document.addEventListener("mousemove", d);
      }), document.addEventListener("mouseup", () => {
        if (!o) return;
        o = !1;
        const { translate: g, id: u } = r.value, { width: m, height: b } = f.value, { xRulerHeight: x, yRulerWidth: a } = s.value.rulerConfig;
        g <= (n ? x : a) || g >= (n ? b : m) ? c(u) : (t(!1), r.value.needAnimate = !0), document.removeEventListener("mousemove", d);
      });
    }
  });
}, me = /* @__PURE__ */ W({
  __name: "PositionLine",
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
    transformInfo: {
      type: Object,
      required: !0
    },
    lineInfo: {
      type: Object,
      required: !0
    },
    adsorptionList: {
      type: Array,
      required: !0
    }
  },
  emits: ["remove-position-line"],
  setup(s, { emit: f }) {
    const e = s, { lineInfo: l, adsorptionList: n, transformInfo: h, opt: r, containerInfo: c } = K(e), o = R(() => r.value.positionLineConfig.padding), t = R(() => 2 * o.value + 1), d = R(
      () => N(
        h.value,
        l.value.coordinate,
        e.isY
      )
    ), i = R(() => {
      const { width: p, height: w } = c.value, { isY: y } = e, L = y ? `translate(0, ${d.value}px)` : `translate(${d.value}px, 0)`;
      return {
        display: l.value.show ? "block" : "none",
        position: "absolute",
        width: (y ? p : t.value) + "px",
        height: (y ? t.value : w) + "px",
        cursor: y ? "row-resize" : "col-resize",
        top: (y ? -o.value : 0) + "px",
        left: (y ? 0 : -o.value) + "px",
        transform: L,
        zIndex: e.opt.positionLineConfig.zIndex,
        transition: l.value.needAnimate ? "transform 300ms" : ""
      };
    }), g = R(() => {
      const { isY: p } = e;
      return {
        position: "absolute",
        width: p ? "100%" : "1px",
        height: p ? "1px" : "100%",
        backgroundColor: r.value.positionLineConfig.lineColor,
        top: (p ? o.value : 0) + "px",
        left: (p ? 0 : o.value) + "px"
      };
    }), u = _({}), m = R(() => {
      const { isY: p } = e, { width: w, height: y } = c.value, { tipWidth: L, tipHeight: M } = u.value;
      let j, O;
      return L && M ? (O = p ? "50%" : (d.value + t.value + L >= w ? -L : t.value) + "px", j = p ? (d.value + t.value + M >= y ? -M : t.value) + "px" : "50%") : (O = p ? "50%" : t.value + "px", j = p ? t.value + "px" : "50%"), {
        position: "absolute",
        padding: "5px",
        lineHeight: "18px",
        minWidth: "80px",
        backgroundColor: "rgba(0,0,0,.8)",
        color: "#fff",
        fontSize: "12px",
        borderRadius: "4px",
        userSelect: "none",
        textAlign: "center",
        left: O,
        top: j,
        transform: p ? "translate(-50%, 0)" : "translate(0, -50%)",
        visibility: l.value.showTip ? "visible" : "hidden"
      };
    }), b = _(null), x = f;
    function a(p) {
      x("remove-position-line", p);
    }
    ge(
      r,
      c,
      n,
      h,
      e.isY,
      b,
      l,
      a
    );
    const v = _(null);
    return A(() => {
      if (v.value) {
        const p = v.value, w = p.offsetWidth, y = p.offsetHeight;
        u.value.tipWidth = w, u.value.tipHeight = y;
      }
    }), (p, w) => (C(), E("div", {
      ref_key: "positionLineRef",
      ref: b,
      class: "scale-ruler_position-line",
      style: Y(i.value)
    }, [
      D("div", {
        class: "scale-ruler_position-line_inner",
        style: Y(g.value)
      }, null, 4),
      D("div", {
        class: "scale-ruler_position-line_tip",
        style: Y(m.value),
        ref_key: "tipRef",
        ref: v
      }, ne((s.isY ? "Y" : "X") + ": " + +S(l).coordinate.toFixed(2) + " px"), 5)
    ], 4));
  }
}), ye = ["width", "height"], V = /* @__PURE__ */ W({
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
    isY: {
      type: Boolean,
      default: !1
    },
    transformInfo: {
      type: Object,
      required: !0
    }
  },
  setup(s, { expose: f }) {
    const e = s, { opt: l, transformInfo: n, containerInfo: h } = K(e), r = R(() => {
      const { isY: a, containerInfo: v, opt: p } = e;
      return {
        width: a ? p.rulerConfig.yRulerWidth : v.width,
        height: a ? v.height : p.rulerConfig.xRulerHeight
      };
    }), c = R(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: e.opt.rulerConfig.zIndex + (e.isY ? 0 : 1)
    })), o = _();
    T(
      [() => e.containerInfo, () => e.transformInfo],
      () => {
        pe(e.opt, e.transformInfo, e.isY, o);
      },
      {
        deep: !0
      }
    );
    const { adsorptionList: t, modifyAdsorptionList: d } = ve(
      e.opt,
      e.isY
    ), { positionLineMap: i } = he(
      l,
      h,
      t,
      n,
      !e.isY,
      o
    );
    function g(a) {
      delete i[a];
    }
    function u() {
      Object.keys(i).forEach((a) => {
        g(a);
      });
    }
    function m(a = !0) {
      Object.keys(i).forEach((v) => {
        i[v].show = a;
      });
    }
    const b = _(!0);
    function x(a = !0) {
      b.value = a, m(a);
    }
    return f({
      modifyAdsorptionList: d,
      removeAllPositionLine: u,
      togglePositionLine: m,
      toggleRuler: x
    }), (a, v) => (C(), E(k, null, [
      oe(D("canvas", {
        ref_key: "rulerRef",
        ref: o,
        style: Y(c.value),
        width: r.value.width,
        height: r.value.height
      }, null, 12, ye), [
        [re, b.value]
      ]),
      e.opt.usePositionLine ? (C(), E("div", {
        key: 0,
        class: ae("position-line-" + (e.isY ? "x" : "y"))
      }, [
        (C(!0), E(k, null, ie(Object.keys(S(i)), (p) => (C(), q(me, {
          key: p,
          opt: e.opt,
          "is-y": !e.isY,
          "transform-info": e.transformInfo,
          "container-info": e.containerInfo,
          "line-info": S(i)[p],
          "adsorption-list": S(t),
          onRemovePositionLine: g
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info", "adsorption-list"]))), 128))
      ], 2)) : I("", !0)
    ], 64));
  }
});
function be(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var z, J;
function xe() {
  if (J) return z;
  J = 1;
  var s = function(v) {
    return f(v) && !e(v);
  };
  function f(a) {
    return !!a && typeof a == "object";
  }
  function e(a) {
    var v = Object.prototype.toString.call(a);
    return v === "[object RegExp]" || v === "[object Date]" || h(a);
  }
  var l = typeof Symbol == "function" && Symbol.for, n = l ? Symbol.for("react.element") : 60103;
  function h(a) {
    return a.$$typeof === n;
  }
  function r(a) {
    return Array.isArray(a) ? [] : {};
  }
  function c(a, v) {
    return v.clone !== !1 && v.isMergeableObject(a) ? b(r(a), a, v) : a;
  }
  function o(a, v, p) {
    return a.concat(v).map(function(w) {
      return c(w, p);
    });
  }
  function t(a, v) {
    if (!v.customMerge)
      return b;
    var p = v.customMerge(a);
    return typeof p == "function" ? p : b;
  }
  function d(a) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(a).filter(function(v) {
      return Object.propertyIsEnumerable.call(a, v);
    }) : [];
  }
  function i(a) {
    return Object.keys(a).concat(d(a));
  }
  function g(a, v) {
    try {
      return v in a;
    } catch {
      return !1;
    }
  }
  function u(a, v) {
    return g(a, v) && !(Object.hasOwnProperty.call(a, v) && Object.propertyIsEnumerable.call(a, v));
  }
  function m(a, v, p) {
    var w = {};
    return p.isMergeableObject(a) && i(a).forEach(function(y) {
      w[y] = c(a[y], p);
    }), i(v).forEach(function(y) {
      u(a, y) || (g(a, y) && p.isMergeableObject(v[y]) ? w[y] = t(y, p)(a[y], v[y], p) : w[y] = c(v[y], p));
    }), w;
  }
  function b(a, v, p) {
    p = p || {}, p.arrayMerge = p.arrayMerge || o, p.isMergeableObject = p.isMergeableObject || s, p.cloneUnlessOtherwiseSpecified = c;
    var w = Array.isArray(v), y = Array.isArray(a), L = w === y;
    return L ? w ? p.arrayMerge(a, v, p) : m(a, v, p) : c(v, p);
  }
  b.all = function(v, p) {
    if (!Array.isArray(v))
      throw new Error("first argument should be an array");
    return v.reduce(function(w, y) {
      return b(w, y, p);
    }, {});
  };
  var x = b;
  return z = x, z;
}
var Le = xe();
const Q = /* @__PURE__ */ be(Le), F = {
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
  canvasHeight: 1e3,
  // 是否代理放大和缩小快捷键 ctrl+ "+" 和 ctrl + "-"
  proxyScaleKey: !0,
  // 是否展示滚动条
  useScrollBar: !0,
  // 是否使用标尺
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
    zIndex: 400
  },
  // 画布缩放回调
  onScale: () => {
  },
  // 画布移动回调
  onMove: () => {
  }
}, we = function() {
  const s = {};
  for (const f in F) {
    const e = F[f];
    typeof e == "object" && e !== null ? s[f] = () => e : s[f] = e;
  }
  return s;
}(), Se = (s, f) => {
  const e = X({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });
  function l(c, o) {
    new ResizeObserver((d) => {
      for (const i of d)
        if (i.target === o) {
          const g = o.offsetWidth, u = o.offsetHeight;
          (g !== e.originWidth || u !== e.originHeight) && n(c, o);
        }
    }).observe(o);
  }
  function n(c, o, t = !1) {
    const d = c.value;
    d.containerAutoSize ? (e.width = o.offsetWidth, e.height = o.offsetHeight, e.originWidth = e.width, e.originHeight = e.height, t && l(c, o)) : (e.width = d.containerWidth, e.height = d.containerHeight);
    const i = getComputedStyle(o);
    i.boxSizing === "border-box" && (e.width -= parseFloat(i.borderLeftWidth) + parseFloat(i.borderRightWidth), e.height -= parseFloat(i.borderTopWidth) + parseFloat(i.borderBottomWidth)), i.position === "static" && (e.position = "relative");
  }
  A(() => {
    const c = f.value;
    c && n(s, c, !0);
  });
  const h = R(() => ({
    width: e.width,
    height: e.height
  })), r = R(() => {
    const c = s.value, o = {
      overflow: "hidden"
    };
    return c.containerAutoSize || (o.width = e.width + "px", o.height = e.height + "px"), e.position && (o.position = e.position), o;
  });
  return {
    containerInfo: h,
    containerStyle: r
  };
}, Oe = (s, f) => {
  const e = X({});
  return T(
    () => f.value,
    () => {
      const l = s.value;
      let n = 0, h = 0, { scale: r } = l;
      const { autoCenter: c, autoScale: o } = l, { width: t, height: d } = f.value;
      if (o) {
        const u = (t - 2 * l.containerXPadding) / l.canvasWidth, m = (d - 2 * l.containerYPadding) / l.canvasHeight;
        r = Math.min(u, m);
      }
      e.scale = r;
      let i = 0, g = 0;
      n = l.canvasWidth * r, h = l.canvasHeight * r, c && (i = Math.floor((t - n) / 2), g = Math.floor((d - h) / 2), e.translateX = i, e.translateY = g);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, Me = (s, f, e) => ({ scrollBarInfo: R(() => {
  const n = s.value, { width: h, height: r } = f.value, { translateX: c, translateY: o, scale: t } = e, d = n.canvasWidth * t + 2 * n.containerXPadding, i = n.canvasHeight * t + 2 * n.containerYPadding, g = h < d, u = r < i, m = g || u, b = h * ((n.containerXPadding - c) / d), x = r * ((n.containerYPadding - o) / i), a = h / d * h, v = r / i * r;
  return {
    totalHeight: i,
    totalWidth: d,
    left: b,
    top: x,
    width: a,
    height: v,
    isYLarge: u,
    isXLarge: g,
    isLarge: m
  };
}) });
function ee(s, f, e) {
  const l = s.value, { containerXPadding: n, containerYPadding: h, canvasWidth: r, canvasHeight: c } = l, o = r * e, t = c * e, { width: d, height: i } = f.value, g = Math.max((d - o) / 2, n), u = Math.max((i - t) / 2, h), m = o + 2 * n > d ? d - (o + n) : g, b = t + 2 * h > i ? i - (t + h) : u;
  return {
    maxTranslateX: g,
    maxTranslateY: u,
    minTranslateX: m,
    minTranslateY: b
  };
}
const Re = (s, f, e) => ({ boundaryInfo: R(() => ee(s, f, e.scale)) }), G = (s, f, e, l) => {
  const n = s.value;
  let { translateX: h, translateY: r, scale: c } = e;
  l = Math.min(Math.max(l, n.minScale), n.maxScale);
  const o = l - c, t = ee(
    s,
    f,
    l
  );
  h -= o * n.canvasWidth / 2, r -= o * n.canvasHeight / 2, h = Math.max(
    Math.min(h, t.maxTranslateX),
    t.minTranslateX
  ), r = Math.max(
    Math.min(r, t.maxTranslateY),
    t.minTranslateY
  ), e.scale = l, e.translateX = h, e.translateY = r;
}, Ce = (s, f, e) => {
  s.value.proxyScaleKey && document.addEventListener("keydown", (l) => {
    if (s.value.canScale) {
      const n = l.keyCode;
      if ((l.metaKey || l.ctrlKey) && (n === 187 || n === 189)) {
        l.preventDefault();
        const h = e.scale + (n === 187 ? 0.05 : -0.05);
        G(s, f, e, h);
      }
    }
  });
}, _e = (s, f, e, l, n, h, r) => {
  let c = null;
  Object.assign(r, {
    xOpacity: 0,
    yOpacity: 0,
    scrollBarMouseDown: !1,
    scrollBarEnter: !1
  }), A(() => {
    n.value && n.value.addEventListener("wheel", (o) => {
      if (s.value.canScale)
        if (o.metaKey || o.ctrlKey) {
          o.preventDefault();
          const t = -1 * o.deltaY / 100, d = e.scale + t;
          G(s, f, e, d);
        } else {
          if (!h.value.isLarge || r.scrollBarMouseDown)
            return;
          o.preventDefault();
          let { translateX: t, translateY: d } = e;
          c && clearTimeout(c);
          const i = -o.deltaX, g = -o.deltaY;
          let u = "";
          const { opacity: m = 0.4 } = s.value.scrollBarConfig, { isXLarge: b, isYLarge: x } = h.value, { maxTranslateX: a, minTranslateX: v, maxTranslateY: p, minTranslateY: w } = l.value;
          b && Math.abs(i) > Math.abs(g) && (t += i, t = Math.max(
            Math.min(t, a),
            v
          ), r.xOpacity = m, r.yOpacity = 0, e.translateX = t, u = "x"), x && Math.abs(g) > Math.abs(i) && (u = "y", d += g, d = Math.max(
            Math.min(d, p),
            w
          ), r.yOpacity = m, r.xOpacity = 0, e.translateY = d), u && (c = setTimeout(() => {
            r.scrollBarEnter || (r[u === "y" ? "yOpacity" : "xOpacity"] = 0);
          }, 1e3));
        }
    });
  });
}, Be = /* @__PURE__ */ W({
  __name: "index",
  props: /* @__PURE__ */ se({
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
  }, we),
  emits: ["update:scale"],
  setup(s, { expose: f, emit: e }) {
    const l = s, n = _(
      Q(F, l)
    ), h = e, r = _(null), { containerInfo: c, containerStyle: o } = Se(n, r), { transformInfo: t } = Oe(n, c), { boundaryInfo: d } = Re(n, c, t), { scrollBarInfo: i } = Me(n, c, t), g = X({});
    T(
      () => t.scale,
      (L) => {
        if (L) {
          if (!g.scale) {
            const M = {
              scale: L,
              translateX: t.translateX,
              translateY: t.translateY
            };
            Object.assign(g, M);
          }
          h("update:scale", L);
        }
      }
    ), T(
      () => l,
      () => {
        n.value = Q(n.value, l);
      },
      {
        deep: !0
      }
    );
    function u(L) {
      G(n, c, t, L);
    }
    T(
      () => n.value.scale,
      (L) => {
        L !== t.scale && u(L);
      }
    ), Ce(n, c, t);
    const m = X({});
    _e(
      n,
      c,
      t,
      d,
      r,
      i,
      m
    );
    function b() {
      Object.assign(t, g);
    }
    const x = _(null), a = _(null);
    function v() {
      n.value.useRuler && (x.value && x.value.removeAllPositionLine(), a.value && a.value.removeAllPositionLine());
    }
    function p(L = !0) {
      n.value.useRuler && (x.value && x.value.toggleRuler(L), a.value && a.value.toggleRuler(L));
    }
    function w(L = !0) {
      n.value.useRuler && (x.value && x.value.togglePositionLine(L), a.value && a.value.togglePositionLine(L));
    }
    function y(L, M = !0, j = !1) {
      n.value.useRuler && (j && x.value && x.value.modifyAdsorptionList(L, M), !j && a.value && a.value.modifyAdsorptionList(L, M));
    }
    return f({
      reset: b,
      changeScale: u,
      removeAllPositionLine: v,
      showRuler() {
        p();
      },
      hideRuler() {
        p(!1);
      },
      showAllPositionLine() {
        w();
      },
      hideAllPositionLine() {
        w(!1);
      },
      addAdsorptionLine(L, M = !1) {
        y(L, !0, M);
      },
      removeAdsorptionLine(L, M = !1) {
        y(L, !1, M);
      }
    }), (L, M) => (C(), E("div", {
      ref_key: "container",
      ref: r,
      style: Y(S(o))
    }, [
      n.value.useRuler ? (C(), E(k, { key: 0 }, [
        H(V, {
          ref_key: "xRuler",
          ref: x,
          opt: n.value,
          "container-info": S(c),
          "transform-info": S(t)
        }, null, 8, ["opt", "container-info", "transform-info"]),
        H(V, {
          ref_key: "yRuler",
          ref: a,
          "is-y": "",
          opt: n.value,
          "container-info": S(c),
          "transform-info": S(t)
        }, null, 8, ["opt", "container-info", "transform-info"])
      ], 64)) : I("", !0),
      H(ue, {
        "container-info": S(c),
        opt: n.value,
        "transform-info": S(t)
      }, {
        default: le(() => [
          ce(L.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "transform-info"]),
      S(i).isXLarge ? (C(), q(U, {
        key: 1,
        opt: n.value,
        "container-info": S(c),
        "scroll-bar-info": S(i),
        "global-info": m,
        "transform-info": S(t)
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : I("", !0),
      S(i).isYLarge ? (C(), q(U, {
        key: 2,
        opt: n.value,
        "container-info": S(c),
        "scroll-bar-info": S(i),
        "global-info": m,
        "transform-info": S(t),
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : I("", !0)
    ], 4));
  }
});
export {
  Be as default
};
