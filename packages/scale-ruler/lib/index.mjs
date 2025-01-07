import { defineComponent as W, computed as M, openBlock as _, createElementBlock as E, normalizeStyle as X, toRefs as K, ref as j, onMounted as A, nextTick as te, reactive as T, watch as P, createElementVNode as D, toDisplayString as ne, unref as w, Fragment as k, withDirectives as oe, vShow as re, normalizeClass as ae, renderList as ie, createBlock as q, createCommentVNode as I, mergeDefaults as se, createVNode as H, withCtx as le, renderSlot as ce } from "vue";
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
  setup(l) {
    const g = l, e = M(() => {
      var f, t;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((f = g.opt) == null ? void 0 : f.canvasWidth) + "px",
        height: ((t = g.opt) == null ? void 0 : t.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0",
        transform: `translate(${g.transformInfo.translateX}px, ${g.transformInfo.translateY}px) scale(${g.transformInfo.scale})`,
        ...g.opt.canvasStyle
      };
    });
    return (f, t) => (_(), E("div", {
      ref: "canvasPanel",
      style: X(e.value)
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
  emits: ["onMove"],
  setup(l, { emit: g }) {
    const e = l, f = g, { globalInfo: t, transformInfo: h } = K(e), s = M(() => {
      const { opt: u, scrollBarInfo: o, isY: v } = e, { scrollBarConfig: i } = u, m = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: i.bgColor,
        opacity: e.globalInfo[v ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: i.zIndex,
        width: (v ? i.barSize : o.width) + "px",
        height: (v ? o.height : i.barSize) + "px"
      };
      return v ? (m.top = o.top + "px", m.right = 0) : (m.left = o.left + "px", m.bottom = 0), m;
    }), c = j(null), a = {};
    function n(u) {
      if (u.preventDefault(), !t.value.scrollBarMouseDown) return;
      let { translateX: o, translateY: v } = h.value;
      const i = e.scrollBarInfo, { width: m, height: b } = e.containerInfo;
      if (e.isY) {
        const L = u.pageY - a.startY;
        let r = a.top + L;
        r = Math.min(Math.max(0, r), b - i.height);
        const d = r * i.totalHeight / b;
        v = e.opt.containerYPadding - d, h.value.translateY = v;
      } else {
        const L = u.pageX - a.startX;
        let r = a.left + L;
        r = Math.min(Math.max(0, r), m - i.width);
        const d = r * i.totalWidth / m;
        o = e.opt.containerXPadding - d, h.value.translateX = o;
      }
      f(
        "onMove",
        h.value.translateX,
        h.value.translateY
      );
    }
    return A(() => {
      if (c.value) {
        const u = c.value, o = e.isY ? "yOpacity" : "xOpacity";
        u.addEventListener("mouseenter", () => {
          t.value[o] = e.opt.scrollBarConfig.opacity, t.value[e.isY ? "xOpacity" : "yOpacity"] = 0, t.value.scrollBarEnter = !0;
        }), u.addEventListener("mouseleave", () => {
          t.value.scrollBarMouseDown || (t.value.scrollBarEnter = !1, t.value[o] = 0);
        }), u.addEventListener("mousedown", (v) => {
          v.preventDefault(), t.value.scrollBarMouseDown = !0, a.startX = v.pageX, a.startY = v.pageY, a.left = e.scrollBarInfo.left, a.top = e.scrollBarInfo.top, document.addEventListener("mousemove", n);
        }), document.addEventListener("mouseup", () => {
          t.value.scrollBarMouseDown && (t.value.scrollBarMouseDown = !1, document.removeEventListener("mousemove", n));
        });
      }
    }), (u, o) => (_(), E("div", {
      ref_key: "scrollBarRef",
      ref: c,
      style: X(s.value)
    }, null, 4));
  }
}), fe = (l) => l <= 0.25 ? 40 : l <= 0.5 ? 20 : l <= 1 ? 10 : l <= 2 ? 5 : l <= 4 ? 2 : 1, de = (l) => {
  const g = l.getBoundingClientRect(), e = g.top + (document.body.scrollTop || document.documentElement.scrollTop), f = g.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top: e, left: f };
}, $ = (l, g, e) => {
  const { scale: f, translateX: t, translateY: h } = l;
  return (g - (e ? h : t)) / f;
}, N = (l, g, e) => {
  const { scale: f, translateX: t, translateY: h } = l, s = g * f;
  return (e ? h : t) + s;
};
function Z(l, g, e, f, t, h) {
  const s = { coordinate: t, translate: f }, c = l.length;
  if (c > 0) {
    let a = 0;
    for (; a < c; ) {
      const n = l[a];
      if (Math.abs(t - n) <= e) {
        s.coordinate = n, s.translate = N(g, n, h);
        break;
      } else if (n > t)
        break;
      a++;
    }
  }
  return s;
}
const pe = (l, g, e, f) => {
  te(() => {
    const t = f.value;
    if (t) {
      const h = t.offsetWidth, s = t.offsetHeight, { rulerConfig: c } = l, { bgColor: a, fontFamily: n, fontSize: u, lineColor: o, fontColor: v } = c;
      if (h > 0 && s > 0) {
        const i = t.getContext("2d");
        i.clearRect(0, 0, h, s), a && (i.save(), i.fillStyle = a, i.fillRect(0, 0, h, s), i.restore());
        const m = e ? c.yRulerWidth : c.xRulerHeight, { translateX: b, translateY: L, scale: r } = g, d = e ? L : b, p = fe(r), O = p * r, y = window.devicePixelRatio, R = -d, B = Math.floor(R / O), x = Math.floor(
          ((e ? s : h) - d) / O
        );
        i.save(), i.fillStyle = o, i.font = `${u * y}px ${n}`, i.translate(0.5, 0.5), i.scale(1 / y, 1 / y), e ? i.fillRect((m - 1) * y, 0, 1, s * y) : i.fillRect(0, (m - 1) * y, h * y, 1);
        for (let S = B; S <= x; S++) {
          i.fillStyle = o;
          const C = (d + S * O) * y;
          let Y = m / 4;
          S % 10 === 0 ? Y = m * 4 / 5 : S % 5 === 0 && (Y = m / 3), e ? i.fillRect((m - Y) * y, C, Y * y, 1) : (i.fillRect(C, (m - Y) * y, 1, Y * y), S % 10 === 0 && (i.fillStyle = v, i.fillText(
            String(S * p),
            C + 2 * y,
            (m + 8 - Y) * y
          )));
        }
        if (i.restore(), e) {
          i.font = `${u}px ${n}`;
          let S = B;
          for (; S <= x; )
            if (S % 10)
              S++;
            else {
              i.save();
              const C = d + S * O + m / 2;
              i.translate(C + m / 5, C - m * 6 / 5), i.rotate(Math.PI / 2), i.fillText(String(S * p), m * 4 / 5, C), S += 10, i.restore();
            }
        }
      }
    }
  });
}, ve = (l, g) => {
  const e = T([0]);
  function f(n, u = !0) {
    const o = e.indexOf(n);
    u && o === -1 && e.push(n), !u && o > -1 && e.splice(o, 1), u && e.sort((v, i) => v - i);
  }
  function t(n, u = !0) {
    Array.isArray(n) ? n.forEach((o) => f(o, u)) : f(n, u);
  }
  function h(n) {
    t(n);
  }
  function s(n) {
    t(n, !1);
  }
  const c = M(
    () => l.positionLineConfig[g ? "adsorptionYList" : "adsorptionXList"]
  );
  P(
    () => c.value,
    (n) => {
      h(n);
    },
    {
      deep: !0
    }
  );
  const a = M(
    () => g ? l.canvasWidth : l.canvasHeight
  );
  return P(
    () => a.value,
    (n, u) => {
      u !== void 0 && s(u), h(n);
    },
    {
      immediate: !0
    }
  ), { adsorptionList: e, modifyAdsorptionList: t };
}, he = (l, g, e, f, t, h) => {
  let s = 1;
  const c = T([]);
  let a = -1, n = !1;
  function u(o) {
    if (n && a > -1) {
      o.preventDefault();
      const { xRulerHeight: v, yRulerWidth: i } = l.value.rulerConfig, m = c[a], b = (t ? o.pageY : o.pageX) - m.start, L = m.startTranslate + b, r = L > (t ? v : i), d = $(
        f.value,
        L,
        t
      ), p = Z(
        e,
        f.value,
        l.value.positionLineConfig.adsorptionGap,
        L,
        d,
        t
      );
      c[a].showTip = r, c[a].coordinate = p.coordinate;
    }
  }
  return A(() => {
    if (h.value) {
      const o = h.value;
      o.addEventListener("mousedown", (v) => {
        const i = de(o), m = t ? v.pageY : v.pageX, b = m - (t ? i.top : i.left), L = {
          startTranslate: b,
          start: m,
          id: s,
          coordinate: $(
            f.value,
            b,
            t
          ),
          showTip: !1,
          show: !0,
          needAnimate: !1
        };
        a = s, c[s++] = L, n = !0, document.addEventListener("mousemove", u);
      }), document.addEventListener("mouseup", () => {
        if (document.removeEventListener("mousemove", u), !n || a < 0) return;
        n = !1;
        const v = c[a], { width: i, height: m } = g.value, { xRulerHeight: b, yRulerWidth: L } = l.value.rulerConfig;
        v.translate <= (t ? b : L) || v.translate >= (t ? m : i) ? delete c[a] : (c[a].showTip = !1, c[a].needAnimate = !0), a = -1;
      });
    }
  }), { positionLineMap: c };
}, ge = (l, g, e, f, t, h, s, c) => {
  let a = !1;
  function n(o) {
    s.value.showTip = o;
  }
  function u(o) {
    if (!a) return;
    const v = (t ? o.pageY : o.pageX) - s.value.start, i = s.value.startTranslate + v, m = $(
      f.value,
      i,
      t
    ), b = Z(
      e.value,
      f.value,
      l.value.positionLineConfig.adsorptionGap,
      i,
      m,
      t
    );
    s.value.coordinate = b.coordinate;
  }
  A(() => {
    if (h.value) {
      const o = h.value;
      o.addEventListener("mouseenter", () => {
        n(!0);
      }), o.addEventListener("mouseleave", () => {
        console.log({ isMouseDown: a }), a || n(!1);
      }), o.addEventListener("mousedown", (v) => {
        v.preventDefault(), a = !0, s.value.showTip = !0;
        const i = t ? v.pageY : v.pageX;
        s.value.start = i, s.value.startTranslate = N(
          f.value,
          s.value.coordinate,
          t
        ), s.value.needAnimate = !1, document.addEventListener("mousemove", u);
      }), document.addEventListener("mouseup", () => {
        if (!a) return;
        a = !1;
        const { translate: v, id: i } = s.value, { width: m, height: b } = g.value, { xRulerHeight: L, yRulerWidth: r } = l.value.rulerConfig;
        v <= (t ? L : r) || v >= (t ? b : m) ? c(i) : (n(!1), s.value.needAnimate = !0), document.removeEventListener("mousemove", u);
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
  setup(l, { emit: g }) {
    const e = l, { lineInfo: f, adsorptionList: t, transformInfo: h, opt: s, containerInfo: c } = K(e), a = M(() => s.value.positionLineConfig.padding), n = M(() => 2 * a.value + 1), u = M(
      () => N(
        h.value,
        f.value.coordinate,
        e.isY
      )
    ), o = M(() => {
      const { width: p, height: O } = c.value, { isY: y } = e, R = y ? `translate(0, ${u.value}px)` : `translate(${u.value}px, 0)`;
      return {
        display: f.value.show ? "block" : "none",
        position: "absolute",
        width: (y ? p : n.value) + "px",
        height: (y ? n.value : O) + "px",
        cursor: y ? "row-resize" : "col-resize",
        top: (y ? -a.value : 0) + "px",
        left: (y ? 0 : -a.value) + "px",
        transform: R,
        zIndex: e.opt.positionLineConfig.zIndex,
        transition: f.value.needAnimate ? "transform 300ms" : ""
      };
    }), v = M(() => {
      const { isY: p } = e;
      return {
        position: "absolute",
        width: p ? "100%" : "1px",
        height: p ? "1px" : "100%",
        backgroundColor: s.value.positionLineConfig.lineColor,
        top: (p ? a.value : 0) + "px",
        left: (p ? 0 : a.value) + "px"
      };
    }), i = j({}), m = M(() => {
      const { isY: p } = e, { width: O, height: y } = c.value, { tipWidth: R, tipHeight: B } = i.value;
      let x, S;
      return R && B ? (S = p ? "50%" : (u.value + n.value + R >= O ? -R : n.value) + "px", x = p ? (u.value + n.value + B >= y ? -B : n.value) + "px" : "50%") : (S = p ? "50%" : n.value + "px", x = p ? n.value + "px" : "50%"), {
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
        left: S,
        top: x,
        transform: p ? "translate(-50%, 0)" : "translate(0, -50%)",
        visibility: f.value.showTip ? "visible" : "hidden"
      };
    }), b = j(null), L = g;
    function r(p) {
      L("remove-position-line", p);
    }
    ge(
      s,
      c,
      t,
      h,
      e.isY,
      b,
      f,
      r
    );
    const d = j(null);
    return A(() => {
      if (d.value) {
        const p = d.value, O = p.offsetWidth, y = p.offsetHeight;
        i.value.tipWidth = O, i.value.tipHeight = y;
      }
    }), (p, O) => (_(), E("div", {
      ref_key: "positionLineRef",
      ref: b,
      class: "scale-ruler_position-line",
      style: X(o.value)
    }, [
      D("div", {
        class: "scale-ruler_position-line_inner",
        style: X(v.value)
      }, null, 4),
      D("div", {
        class: "scale-ruler_position-line_tip",
        style: X(m.value),
        ref_key: "tipRef",
        ref: d
      }, ne((l.isY ? "Y" : "X") + ": " + +w(f).coordinate.toFixed(2) + " px"), 5)
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
  setup(l, { expose: g }) {
    const e = l, { opt: f, transformInfo: t, containerInfo: h } = K(e), s = M(() => {
      const { isY: r, containerInfo: d, opt: p } = e;
      return {
        width: r ? p.rulerConfig.yRulerWidth : d.width,
        height: r ? d.height : p.rulerConfig.xRulerHeight
      };
    }), c = M(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: e.opt.rulerConfig.zIndex + (e.isY ? 0 : 1)
    })), a = j();
    P(
      [() => e.containerInfo, () => e.transformInfo],
      () => {
        pe(e.opt, e.transformInfo, e.isY, a);
      },
      {
        deep: !0
      }
    );
    const { adsorptionList: n, modifyAdsorptionList: u } = ve(
      e.opt,
      e.isY
    ), { positionLineMap: o } = he(
      f,
      h,
      n,
      t,
      !e.isY,
      a
    );
    function v(r) {
      delete o[r];
    }
    function i() {
      Object.keys(o).forEach((r) => {
        v(r);
      });
    }
    function m(r = !0) {
      Object.keys(o).forEach((d) => {
        o[d].show = r;
      });
    }
    const b = j(!0);
    function L(r = !0) {
      b.value = r, m(r);
    }
    return g({
      modifyAdsorptionList: u,
      removeAllPositionLine: i,
      togglePositionLine: m,
      toggleRuler: L
    }), (r, d) => (_(), E(k, null, [
      oe(D("canvas", {
        ref_key: "rulerRef",
        ref: a,
        style: X(c.value),
        width: s.value.width,
        height: s.value.height
      }, null, 12, ye), [
        [re, b.value]
      ]),
      e.opt.usePositionLine ? (_(), E("div", {
        key: 0,
        class: ae("position-line-" + (e.isY ? "x" : "y"))
      }, [
        (_(!0), E(k, null, ie(Object.keys(w(o)), (p) => (_(), q(me, {
          key: p,
          opt: e.opt,
          "is-y": !e.isY,
          "transform-info": e.transformInfo,
          "container-info": e.containerInfo,
          "line-info": w(o)[p],
          "adsorption-list": w(n),
          onRemovePositionLine: v
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info", "adsorption-list"]))), 128))
      ], 2)) : I("", !0)
    ], 64));
  }
});
function be(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var z, J;
function xe() {
  if (J) return z;
  J = 1;
  var l = function(d) {
    return g(d) && !e(d);
  };
  function g(r) {
    return !!r && typeof r == "object";
  }
  function e(r) {
    var d = Object.prototype.toString.call(r);
    return d === "[object RegExp]" || d === "[object Date]" || h(r);
  }
  var f = typeof Symbol == "function" && Symbol.for, t = f ? Symbol.for("react.element") : 60103;
  function h(r) {
    return r.$$typeof === t;
  }
  function s(r) {
    return Array.isArray(r) ? [] : {};
  }
  function c(r, d) {
    return d.clone !== !1 && d.isMergeableObject(r) ? b(s(r), r, d) : r;
  }
  function a(r, d, p) {
    return r.concat(d).map(function(O) {
      return c(O, p);
    });
  }
  function n(r, d) {
    if (!d.customMerge)
      return b;
    var p = d.customMerge(r);
    return typeof p == "function" ? p : b;
  }
  function u(r) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(r).filter(function(d) {
      return Object.propertyIsEnumerable.call(r, d);
    }) : [];
  }
  function o(r) {
    return Object.keys(r).concat(u(r));
  }
  function v(r, d) {
    try {
      return d in r;
    } catch {
      return !1;
    }
  }
  function i(r, d) {
    return v(r, d) && !(Object.hasOwnProperty.call(r, d) && Object.propertyIsEnumerable.call(r, d));
  }
  function m(r, d, p) {
    var O = {};
    return p.isMergeableObject(r) && o(r).forEach(function(y) {
      O[y] = c(r[y], p);
    }), o(d).forEach(function(y) {
      i(r, y) || (v(r, y) && p.isMergeableObject(d[y]) ? O[y] = n(y, p)(r[y], d[y], p) : O[y] = c(d[y], p));
    }), O;
  }
  function b(r, d, p) {
    p = p || {}, p.arrayMerge = p.arrayMerge || a, p.isMergeableObject = p.isMergeableObject || l, p.cloneUnlessOtherwiseSpecified = c;
    var O = Array.isArray(d), y = Array.isArray(r), R = O === y;
    return R ? O ? p.arrayMerge(r, d, p) : m(r, d, p) : c(d, p);
  }
  b.all = function(d, p) {
    if (!Array.isArray(d))
      throw new Error("first argument should be an array");
    return d.reduce(function(O, y) {
      return b(O, y, p);
    }, {});
  };
  var L = b;
  return z = L, z;
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
}, Se = function() {
  const l = {};
  for (const g in F) {
    const e = F[g];
    typeof e == "object" && e !== null ? l[g] = () => e : l[g] = e;
  }
  return l;
}(), Oe = (l, g) => {
  const e = T({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });
  function f(c, a) {
    new ResizeObserver((u) => {
      for (const o of u)
        if (o.target === a) {
          const v = a.offsetWidth, i = a.offsetHeight;
          (v !== e.originWidth || i !== e.originHeight) && t(c, a);
        }
    }).observe(a);
  }
  function t(c, a, n = !1) {
    const u = c.value;
    u.containerAutoSize ? (e.width = a.offsetWidth, e.height = a.offsetHeight, e.originWidth = e.width, e.originHeight = e.height, n && f(c, a)) : (e.width = u.containerWidth, e.height = u.containerHeight);
    const o = getComputedStyle(a);
    o.boxSizing === "border-box" && (e.width -= parseFloat(o.borderLeftWidth) + parseFloat(o.borderRightWidth), e.height -= parseFloat(o.borderTopWidth) + parseFloat(o.borderBottomWidth)), o.position === "static" && (e.position = "relative");
  }
  A(() => {
    const c = g.value;
    c && t(l, c, !0);
  });
  const h = M(() => ({
    width: e.width,
    height: e.height
  })), s = M(() => {
    const c = l.value, a = {
      overflow: "hidden"
    };
    return c.containerAutoSize || (a.width = e.width + "px", a.height = e.height + "px"), e.position && (a.position = e.position), a;
  });
  return {
    containerInfo: h,
    containerStyle: s
  };
}, we = (l, g) => {
  const e = T({});
  return P(
    () => g.value,
    () => {
      const f = l.value;
      let t = 0, h = 0, { scale: s } = f;
      const { autoCenter: c, autoScale: a } = f, { width: n, height: u } = g.value;
      if (a) {
        const i = (n - 2 * f.containerXPadding) / f.canvasWidth, m = (u - 2 * f.containerYPadding) / f.canvasHeight;
        s = Math.min(i, m);
      }
      e.scale = s;
      let o = 0, v = 0;
      t = f.canvasWidth * s, h = f.canvasHeight * s, c && (o = Math.floor((n - t) / 2), v = Math.floor((u - h) / 2), e.translateX = o, e.translateY = v);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, Me = (l, g, e) => ({ scrollBarInfo: M(() => {
  const t = l.value, { width: h, height: s } = g.value, { translateX: c, translateY: a, scale: n } = e, u = t.canvasWidth * n + 2 * t.containerXPadding, o = t.canvasHeight * n + 2 * t.containerYPadding, v = h < u, i = s < o, m = v || i, b = h * ((t.containerXPadding - c) / u), L = s * ((t.containerYPadding - a) / o), r = h / u * h, d = s / o * s;
  return {
    totalHeight: o,
    totalWidth: u,
    left: b,
    top: L,
    width: r,
    height: d,
    isYLarge: i,
    isXLarge: v,
    isLarge: m
  };
}) });
function ee(l, g, e) {
  const f = l.value, { containerXPadding: t, containerYPadding: h, canvasWidth: s, canvasHeight: c } = f, a = s * e, n = c * e, { width: u, height: o } = g.value, v = Math.max((u - a) / 2, t), i = Math.max((o - n) / 2, h), m = a + 2 * t > u ? u - (a + t) : v, b = n + 2 * h > o ? o - (n + h) : i;
  return {
    maxTranslateX: v,
    maxTranslateY: i,
    minTranslateX: m,
    minTranslateY: b
  };
}
const Re = (l, g, e) => ({ boundaryInfo: M(() => ee(l, g, e.scale)) }), G = (l, g, e, f, t) => {
  const h = l.value;
  let { translateX: s, translateY: c, scale: a } = e;
  f = Math.min(Math.max(f, h.minScale), h.maxScale);
  const n = f - a, u = ee(
    l,
    g,
    f
  );
  s -= n * h.canvasWidth / 2, c -= n * h.canvasHeight / 2, s = Math.max(
    Math.min(s, u.maxTranslateX),
    u.minTranslateX
  ), c = Math.max(
    Math.min(c, u.maxTranslateY),
    u.minTranslateY
  ), e.scale = f, e.translateX = s, e.translateY = c, t(f);
}, Ce = (l, g, e) => {
  l.value.proxyScaleKey && document.addEventListener("keydown", (f) => {
    if (l.value.canScale) {
      const t = f.keyCode;
      if ((f.metaKey || f.ctrlKey) && (t === 187 || t === 189)) {
        f.preventDefault();
        const h = e.scale + (t === 187 ? 0.05 : -0.05);
        G(l, g, e, h);
      }
    }
  });
}, _e = (l, g, e, f, t, h, s, c, a) => {
  let n = null;
  Object.assign(s, {
    xOpacity: 0,
    yOpacity: 0,
    scrollBarMouseDown: !1,
    scrollBarEnter: !1
  }), A(() => {
    t.value && t.value.addEventListener("wheel", (u) => {
      if (l.value.canScale)
        if (u.metaKey || u.ctrlKey) {
          u.preventDefault();
          const o = -1 * u.deltaY / 100, v = e.scale + o;
          G(l, g, e, v, c);
        } else {
          if (!h.value.isLarge || s.scrollBarMouseDown)
            return;
          u.preventDefault();
          let { translateX: o, translateY: v } = e;
          n && clearTimeout(n);
          const i = -u.deltaX, m = -u.deltaY;
          let b = "";
          const { opacity: L = 0.4 } = l.value.scrollBarConfig, { isXLarge: r, isYLarge: d } = h.value, { maxTranslateX: p, minTranslateX: O, maxTranslateY: y, minTranslateY: R } = f.value;
          r && Math.abs(i) > Math.abs(m) && (o += i, o = Math.max(
            Math.min(o, p),
            O
          ), s.xOpacity = L, s.yOpacity = 0, e.translateX = o, b = "x"), d && Math.abs(m) > Math.abs(i) && (b = "y", v += m, v = Math.max(
            Math.min(v, y),
            R
          ), s.yOpacity = L, s.xOpacity = 0, e.translateY = v), b && (a(
            e.translateX,
            e.translateY
          ), n = setTimeout(() => {
            s.scrollBarEnter || (s[b === "y" ? "yOpacity" : "xOpacity"] = 0);
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
  }, Se),
  emits: ["update:scale", "onScale", "onMove"],
  setup(l, { expose: g, emit: e }) {
    const f = l, t = j(
      Q(F, f)
    ), h = e, s = j(null), { containerInfo: c, containerStyle: a } = Oe(t, s), { transformInfo: n } = we(t, c), { boundaryInfo: u } = Re(t, c, n), { scrollBarInfo: o } = Me(t, c, n), v = T({});
    P(
      () => n.scale,
      (x) => {
        if (x) {
          if (!v.scale) {
            const S = {
              scale: x,
              translateX: n.translateX,
              translateY: n.translateY
            };
            Object.assign(v, S);
          }
          h("update:scale", x);
        }
      }
    ), P(
      () => f,
      () => {
        t.value = Q(t.value, f);
      },
      {
        deep: !0
      }
    );
    function i(x) {
      h("onScale", x);
    }
    function m(x, S) {
      h("onMove", x, S);
    }
    function b(x) {
      G(t, c, n, x, i);
    }
    P(
      () => t.value.scale,
      (x) => {
        x !== n.scale && b(x);
      }
    ), Ce(t, c, n);
    const L = T({});
    _e(
      t,
      c,
      n,
      u,
      s,
      o,
      L,
      i,
      m
    );
    function r() {
      Object.assign(n, v);
    }
    const d = j(null), p = j(null);
    function O() {
      t.value.useRuler && (d.value && d.value.removeAllPositionLine(), p.value && p.value.removeAllPositionLine());
    }
    function y(x = !0) {
      t.value.useRuler && (d.value && d.value.toggleRuler(x), p.value && p.value.toggleRuler(x));
    }
    function R(x = !0) {
      t.value.useRuler && (d.value && d.value.togglePositionLine(x), p.value && p.value.togglePositionLine(x));
    }
    function B(x, S = !0, C = !1) {
      t.value.useRuler && (C && d.value && d.value.modifyAdsorptionList(x, S), !C && p.value && p.value.modifyAdsorptionList(x, S));
    }
    return g({
      reset: r,
      changeScale: b,
      removeAllPositionLine: O,
      showRuler() {
        y();
      },
      hideRuler() {
        y(!1);
      },
      showAllPositionLine() {
        R();
      },
      hideAllPositionLine() {
        R(!1);
      },
      addAdsorptionLine(x, S = !1) {
        B(x, !0, S);
      },
      removeAdsorptionLine(x, S = !1) {
        B(x, !1, S);
      }
    }), (x, S) => (_(), E("div", {
      ref_key: "container",
      ref: s,
      style: X(w(a))
    }, [
      t.value.useRuler ? (_(), E(k, { key: 0 }, [
        H(V, {
          ref_key: "xRuler",
          ref: d,
          opt: t.value,
          "container-info": w(c),
          "transform-info": w(n)
        }, null, 8, ["opt", "container-info", "transform-info"]),
        H(V, {
          ref_key: "yRuler",
          ref: p,
          "is-y": "",
          opt: t.value,
          "container-info": w(c),
          "transform-info": w(n)
        }, null, 8, ["opt", "container-info", "transform-info"])
      ], 64)) : I("", !0),
      H(ue, {
        "container-info": w(c),
        opt: t.value,
        "transform-info": w(n)
      }, {
        default: le(() => [
          ce(x.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "transform-info"]),
      w(o).isXLarge ? (_(), q(U, {
        key: 1,
        opt: t.value,
        "container-info": w(c),
        "scroll-bar-info": w(o),
        "global-info": L,
        "transform-info": w(n),
        onOnMove: m
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : I("", !0),
      w(o).isYLarge ? (_(), q(U, {
        key: 2,
        opt: t.value,
        "container-info": w(c),
        "scroll-bar-info": w(o),
        "global-info": L,
        "transform-info": w(n),
        onOnMove: m,
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : I("", !0)
    ], 4));
  }
});
export {
  Be as default
};
