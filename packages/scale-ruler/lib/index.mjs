import { defineComponent as H, computed as j, openBlock as Y, createElementBlock as P, normalizeStyle as E, renderSlot as re, toRefs as U, ref as B, onMounted as W, nextTick as ie, reactive as A, watch as T, createElementVNode as $, toDisplayString as se, unref as R, Fragment as N, withDirectives as le, vShow as ce, normalizeClass as ue, renderList as fe, createBlock as F, createCommentVNode as z, createVNode as k, withCtx as de } from "vue";
const pe = (i) => i <= 0.25 ? 40 : i <= 0.5 ? 20 : i <= 1 ? 10 : i <= 2 ? 5 : i <= 4 ? 2 : 1, ve = (i) => {
  const y = i.getBoundingClientRect(), t = y.top + (document.body.scrollTop || document.documentElement.scrollTop), r = y.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top: t, left: r };
}, K = (i, y, t) => {
  const { scale: r, translateX: e, translateY: u } = i;
  return (y - (t ? u : e)) / r;
}, G = (i, y, t) => {
  const { scale: r, translateX: e, translateY: u } = i, l = y * r;
  return (t ? u : e) + l;
};
function I(i, y, t, r, e, u) {
  const l = { coordinate: e, translate: r }, a = i.length;
  if (a > 0) {
    let o = 0;
    for (; o < a; ) {
      const f = i[o];
      if (Math.abs(e - f) <= Math.max(t, t / y.scale)) {
        l.coordinate = f, l.translate = G(y, f, u);
        break;
      } else if (f > e)
        break;
      o++;
    }
  }
  return l;
}
function V(i, y) {
  return y;
}
function D(i) {
  return i.sort((y, t) => y - t);
}
const he = /* @__PURE__ */ H({
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
  setup(i) {
    const y = i, t = j(() => {
      var r, e;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((r = y.opt) == null ? void 0 : r.canvasWidth) + "px",
        height: ((e = y.opt) == null ? void 0 : e.canvasHeight) + "px",
        transformOrigin: "0 0",
        transform: `translate(${y.transformInfo.translateX}px, ${y.transformInfo.translateY}px) scale(${y.transformInfo.scale})`,
        ...y.opt.canvasStyle
      };
    });
    return (r, e) => (Y(), P("div", {
      ref: "canvasPanel",
      style: E(t.value)
    }, [
      re(r.$slots, "default")
    ], 4));
  }
});
function J(i, y, t, r) {
  if (!i) return;
  function e(u) {
    u.preventDefault(), typeof t == "function" && t(u);
  }
  i.addEventListener("mousedown", (u) => {
    u.button === 0 && (u.preventDefault(), typeof y == "function" && y(u), document.addEventListener("mousemove", e));
  }), document.addEventListener("mouseup", (u) => {
    document.removeEventListener("mousemove", e), typeof r == "function" && r(u);
  });
}
const ee = /* @__PURE__ */ H({
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
  setup(i, { emit: y }) {
    const t = i, r = y, { globalInfo: e, transformInfo: u } = U(t), l = j(() => {
      const { opt: h, scrollBarInfo: n, isY: m } = t, { scrollBarConfig: b } = h, L = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: b.bgColor,
        opacity: t.globalInfo[m ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: b.zIndex,
        width: (m ? b.barSize : n.width) + "px",
        height: (m ? n.height : b.barSize) + "px"
      };
      return m ? (L.top = n.top + "px", L.right = 0) : (L.left = n.left + "px", L.bottom = 0), L;
    }), a = B(null), o = {};
    function f(h) {
      if (h.preventDefault(), !e.value.scrollBarMouseDown) return;
      let { translateX: n, translateY: m } = u.value;
      const b = t.scrollBarInfo, { width: L, height: s } = t.containerInfo;
      if (t.isY) {
        const g = h.pageY - o.startY;
        let c = o.top + g;
        c = Math.min(Math.max(0, c), s - b.height);
        const x = c * b.totalHeight / s;
        m = t.opt.containerYPadding - x, u.value.translateY = m;
      } else {
        const g = h.pageX - o.startX;
        let c = o.left + g;
        c = Math.min(Math.max(0, c), L - b.width);
        const x = c * b.totalWidth / L;
        n = t.opt.containerXPadding - x, u.value.translateX = n;
      }
      r(
        "onMove",
        u.value.translateX,
        u.value.translateY
      );
    }
    function d(h) {
      e.value.scrollBarMouseDown = !0, o.startX = h.pageX, o.startY = h.pageY, o.left = t.scrollBarInfo.left, o.top = t.scrollBarInfo.top;
    }
    function v() {
      e.value.scrollBarMouseDown && (e.value.scrollBarMouseDown = !1);
    }
    return W(() => {
      if (a.value) {
        const h = a.value, n = t.isY ? "yOpacity" : "xOpacity";
        h.addEventListener("mouseenter", () => {
          e.value[n] = t.opt.scrollBarConfig.opacity, e.value[t.isY ? "xOpacity" : "yOpacity"] = 0, e.value.scrollBarEnter = !0;
        }), h.addEventListener("mouseleave", () => {
          e.value.scrollBarMouseDown || (e.value.scrollBarEnter = !1, e.value[n] = 0);
        }), J(h, d, f, v);
      }
    }), (h, n) => (Y(), P("div", {
      ref_key: "scrollBarRef",
      ref: a,
      style: E(l.value)
    }, null, 4));
  }
}), ge = (i, y, t, r) => {
  ie(() => {
    const e = r.value;
    if (e) {
      const u = e.offsetWidth, l = e.offsetHeight, { rulerConfig: a } = i, { bgColor: o, fontFamily: f, fontSize: d, lineColor: v, fontColor: h } = a;
      if (u > 0 && l > 0) {
        const n = e.getContext("2d");
        n.clearRect(0, 0, u, l), o && (n.save(), n.fillStyle = o, n.fillRect(0, 0, u, l), n.restore());
        const m = t ? a.yRulerWidth : a.xRulerHeight, { translateX: b, translateY: L, scale: s } = y, g = t ? L : b, c = pe(s), x = c * s, p = window.devicePixelRatio, M = -g, X = Math.floor(M / x), _ = Math.floor(
          ((t ? l : u) - g) / x
        );
        n.save(), n.fillStyle = v, n.font = `${d * p}px ${f}`, n.translate(0.5, 0.5), n.scale(1 / p, 1 / p), t ? n.fillRect((m - 1) * p, 0, 1, l * p) : n.fillRect(0, (m - 1) * p, u * p, 1);
        for (let C = X; C <= _; C++) {
          n.fillStyle = v;
          const S = (g + C * x) * p;
          let w = m / 4;
          C % 10 === 0 ? w = m * 4 / 5 : C % 5 === 0 && (w = m / 3), t ? n.fillRect((m - w) * p, S, w * p, 1) : (n.fillRect(S, (m - w) * p, 1, w * p), C % 10 === 0 && (n.fillStyle = h, n.fillText(
            String(C * c),
            S + 2 * p,
            (m + 8 - w) * p
          )));
        }
        if (n.restore(), t) {
          n.font = `${d}px ${f}`, n.fillStyle = v;
          let C = X;
          for (; C <= _; )
            if (C % 10)
              C++;
            else {
              n.save();
              const S = g + C * x + m / 2;
              n.translate(S + m / 5, S - m * 6 / 5), n.rotate(Math.PI / 2), n.fillText(String(C * c), m * 4 / 5, S), C += 10, n.restore();
            }
        }
      }
    }
  });
}, ye = (i, y, t) => {
  const r = j(
    () => i.value[y ? "adsorptionYList" : "adsorptionXList"].sort()
  ), e = A([]);
  a(0), a(r.value);
  function u(d, v = !0) {
    const h = e.indexOf(d);
    v && h === -1 && e.push(d), !v && h > -1 && e.splice(h, 1), v && D(e);
  }
  function l(d, v = !0) {
    Array.isArray(d) ? d.forEach((h) => u(h, v)) : u(d, v), t(e);
  }
  function a(d) {
    l(d);
  }
  function o(d) {
    l(d, !1);
  }
  T(
    () => r.value,
    (d, v) => {
      D(d), d.join(",") !== D(e).join(",") && ((v == null ? void 0 : v.length) > 0 && o(v), a(d));
    }
  );
  const f = j(
    () => y ? i.value.canvasHeight : i.value.canvasWidth
  );
  return T(
    () => f.value,
    (d, v) => {
      v !== void 0 && o(v), a(d);
    },
    {
      immediate: !0
    }
  ), { adsorptionList: e, modifyAdsorptionList: l };
}, me = (i, y, t, r, e, u) => {
  let l = 1;
  const a = A([]);
  let o = -1, f = !1;
  function d(h) {
    if (f && o > -1) {
      h.preventDefault();
      const { xRulerHeight: n, yRulerWidth: m } = i.value.rulerConfig, b = a[o], L = (e ? h.pageY : h.pageX) - b.start, s = b.startTranslate + L, g = s > (e ? n : m), c = K(
        r.value,
        s,
        e
      ), x = I(
        t,
        r.value,
        i.value.positionLineConfig.adsorptionGap,
        s,
        c,
        e
      );
      a[o].showTip = g, a[o].translate = x.translate, a[o].coordinate = x.coordinate;
    }
  }
  function v() {
    if (!f || o < 0) return;
    f = !1;
    const h = a[o], { width: n, height: m } = y.value, { xRulerHeight: b, yRulerWidth: L } = i.value.rulerConfig;
    if (h.translate <= (e ? b : L) || h.translate >= (e ? m : n))
      delete a[o];
    else {
      const s = I(
        t,
        r.value,
        i.value.positionLineConfig.adsorptionGap,
        h.translate,
        h.coordinate,
        e
      );
      a[o].showTip = !1, a[o].translate = s.translate, a[o].coordinate = s.coordinate;
    }
    o = -1;
  }
  return W(() => {
    if (u.value) {
      let h = function(m) {
        const b = ve(n), L = e ? m.pageY : m.pageX, s = L - (e ? b.top : b.left), g = {
          startTranslate: s,
          translate: s,
          start: L,
          id: l,
          coordinate: K(
            r.value,
            s,
            e
          ),
          showTip: !1,
          show: !0
        };
        o = l, a[l++] = g, f = !0;
      };
      const n = u.value;
      J(n, h, d, v);
    }
  }), { positionLineMap: a };
}, be = (i, y, t, r, e, u, l, a) => {
  let o = !1;
  function f(n) {
    l.value.showTip = n;
  }
  function d(n) {
    if (!o) return;
    const m = (e ? n.pageY : n.pageX) - l.value.start, b = l.value.startTranslate + m, L = K(
      r.value,
      b,
      e
    ), s = I(
      t.value,
      r.value,
      i.value.positionLineConfig.adsorptionGap,
      b,
      L,
      e
    );
    l.value.coordinate = s.coordinate, l.value.translate = s.translate;
  }
  function v(n) {
    o = !0, l.value.showTip = !0;
    const m = e ? n.pageY : n.pageX;
    l.value.start = m, l.value.startTranslate = G(
      r.value,
      l.value.coordinate,
      e
    );
  }
  function h() {
    if (!o) return;
    o = !1;
    const { translate: n, id: m } = l.value, { width: b, height: L } = y.value, { xRulerHeight: s, yRulerWidth: g } = i.value.rulerConfig;
    if (n <= (e ? s : g) || n >= (e ? L : b))
      a(m);
    else {
      f(!1);
      const c = I(
        t.value,
        r.value,
        i.value.positionLineConfig.adsorptionGap,
        n,
        l.value.coordinate,
        e
      );
      l.value.coordinate = c.coordinate, l.value.translate = c.translate;
    }
  }
  W(() => {
    if (u.value) {
      const n = u.value;
      n.addEventListener("mouseenter", () => {
        f(!0);
      }), n.addEventListener("mouseleave", () => {
        o || f(!1);
      }), J(n, v, d, h);
    }
  });
}, xe = /* @__PURE__ */ H({
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
  setup(i, { emit: y }) {
    const t = i, { lineInfo: r, adsorptionList: e, transformInfo: u, opt: l, containerInfo: a } = U(t), o = j(() => l.value.positionLineConfig.padding), f = j(() => 2 * o.value + 1), d = j(
      () => G(
        u.value,
        r.value.coordinate,
        t.isY
      )
    ), v = j(() => {
      const { width: c, height: x } = a.value, { isY: p } = t, M = p ? `translate(0, ${d.value}px)` : `translate(${d.value}px, 0)`;
      return {
        display: r.value.show ? "block" : "none",
        position: "absolute",
        width: (p ? c : f.value) + "px",
        height: (p ? f.value : x) + "px",
        cursor: p ? "row-resize" : "col-resize",
        top: (p ? -o.value : 0) + "px",
        left: (p ? 0 : -o.value) + "px",
        transform: M,
        zIndex: t.opt.positionLineConfig.zIndex
      };
    }), h = j(() => {
      const { isY: c } = t;
      return {
        position: "absolute",
        width: c ? "100%" : "1px",
        height: c ? "1px" : "100%",
        backgroundColor: l.value.positionLineConfig.lineColor,
        top: (c ? o.value : 0) + "px",
        left: (c ? 0 : o.value) + "px"
      };
    }), n = B({}), m = j(() => {
      const { isY: c } = t, { width: x, height: p } = a.value, { tipWidth: M, tipHeight: X } = n.value;
      let _, C;
      return M && X ? (C = c ? "50%" : (d.value + f.value + M >= x ? -M : f.value) + "px", _ = c ? (d.value + f.value + X >= p ? -X : f.value) + "px" : "50%") : (C = c ? "50%" : f.value + "px", _ = c ? f.value + "px" : "50%"), {
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
        left: C,
        top: _,
        transform: c ? "translate(-50%, 0)" : "translate(0, -50%)",
        visibility: r.value.showTip ? "visible" : "hidden"
      };
    }), b = B(null), L = y;
    function s(c) {
      L("remove-position-line", c);
    }
    be(
      l,
      a,
      e,
      u,
      t.isY,
      b,
      r,
      s
    );
    const g = B(null);
    return W(() => {
      if (g.value) {
        const c = g.value, x = c.offsetWidth, p = c.offsetHeight;
        n.value.tipWidth = x, n.value.tipHeight = p;
      }
    }), (c, x) => (Y(), P("div", {
      ref_key: "positionLineRef",
      ref: b,
      class: "scale-ruler_position-line",
      style: E(v.value)
    }, [
      $("div", {
        class: "scale-ruler_position-line_inner",
        style: E(h.value)
      }, null, 4),
      $("div", {
        class: "scale-ruler_position-line_tip",
        style: E(m.value),
        ref_key: "tipRef",
        ref: g
      }, se((i.isY ? "Y" : "X") + ": " + +R(r).coordinate.toFixed(2) + " px"), 5)
    ], 4));
  }
}), Le = ["width", "height"], te = /* @__PURE__ */ H({
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
  emits: ["update-adsorption-list"],
  setup(i, { expose: y, emit: t }) {
    const r = i, { opt: e, transformInfo: u, containerInfo: l } = U(r), a = j(() => {
      const { isY: p, containerInfo: M, opt: X } = r;
      return {
        width: p ? X.rulerConfig.yRulerWidth : M.width,
        height: p ? M.height : X.rulerConfig.xRulerHeight
      };
    }), o = j(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: r.opt.rulerConfig.zIndex + (r.isY ? 0 : 1)
    })), f = B();
    T(
      [() => r.containerInfo, () => r.transformInfo],
      () => {
        ge(r.opt, r.transformInfo, r.isY, f);
      },
      {
        deep: !0
      }
    );
    const d = t;
    function v(p) {
      d("update-adsorption-list", p, !r.isY);
    }
    const { adsorptionList: h, modifyAdsorptionList: n } = ye(
      e,
      !r.isY,
      v
    ), { positionLineMap: m } = me(
      e,
      l,
      h,
      u,
      !r.isY,
      f
    );
    function b(p) {
      delete m[p];
    }
    function L() {
      Object.keys(m).forEach((p) => {
        b(p);
      });
    }
    function s(p = !0) {
      Object.keys(m).forEach((M) => {
        m[M].show = p;
      });
    }
    const g = B(!0);
    function c(p = !0) {
      g.value = p, s(p);
    }
    function x() {
      return m.filter((p) => !!p).map((p) => p.coordinate).sort((p, M) => p - M);
    }
    return y({
      modifyAdsorptionList: n,
      removeAllPositionLine: L,
      togglePositionLine: s,
      toggleRuler: c,
      getPositionLineList: x
    }), (p, M) => (Y(), P(N, null, [
      le($("canvas", {
        ref_key: "rulerRef",
        ref: f,
        style: E(o.value),
        width: a.value.width,
        height: a.value.height
      }, null, 12, Le), [
        [ce, g.value]
      ]),
      r.opt.usePositionLine ? (Y(), P("div", {
        key: 0,
        class: ue("position-line-" + (r.isY ? "x" : "y"))
      }, [
        (Y(!0), P(N, null, fe(Object.keys(R(m)), (X) => (Y(), F(xe, {
          key: X,
          opt: r.opt,
          "is-y": !r.isY,
          "transform-info": r.transformInfo,
          "container-info": r.containerInfo,
          "line-info": R(m)[X],
          "adsorption-list": R(h),
          onRemovePositionLine: b
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info", "adsorption-list"]))), 128))
      ], 2)) : z("", !0)
    ], 64));
  }
});
function Se(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var q, ne;
function Oe() {
  if (ne) return q;
  ne = 1;
  var i = function(g) {
    return y(g) && !t(g);
  };
  function y(s) {
    return !!s && typeof s == "object";
  }
  function t(s) {
    var g = Object.prototype.toString.call(s);
    return g === "[object RegExp]" || g === "[object Date]" || u(s);
  }
  var r = typeof Symbol == "function" && Symbol.for, e = r ? Symbol.for("react.element") : 60103;
  function u(s) {
    return s.$$typeof === e;
  }
  function l(s) {
    return Array.isArray(s) ? [] : {};
  }
  function a(s, g) {
    return g.clone !== !1 && g.isMergeableObject(s) ? b(l(s), s, g) : s;
  }
  function o(s, g, c) {
    return s.concat(g).map(function(x) {
      return a(x, c);
    });
  }
  function f(s, g) {
    if (!g.customMerge)
      return b;
    var c = g.customMerge(s);
    return typeof c == "function" ? c : b;
  }
  function d(s) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(s).filter(function(g) {
      return Object.propertyIsEnumerable.call(s, g);
    }) : [];
  }
  function v(s) {
    return Object.keys(s).concat(d(s));
  }
  function h(s, g) {
    try {
      return g in s;
    } catch {
      return !1;
    }
  }
  function n(s, g) {
    return h(s, g) && !(Object.hasOwnProperty.call(s, g) && Object.propertyIsEnumerable.call(s, g));
  }
  function m(s, g, c) {
    var x = {};
    return c.isMergeableObject(s) && v(s).forEach(function(p) {
      x[p] = a(s[p], c);
    }), v(g).forEach(function(p) {
      n(s, p) || (h(s, p) && c.isMergeableObject(g[p]) ? x[p] = f(p, c)(s[p], g[p], c) : x[p] = a(g[p], c));
    }), x;
  }
  function b(s, g, c) {
    c = c || {}, c.arrayMerge = c.arrayMerge || o, c.isMergeableObject = c.isMergeableObject || i, c.cloneUnlessOtherwiseSpecified = a;
    var x = Array.isArray(g), p = Array.isArray(s), M = x === p;
    return M ? x ? c.arrayMerge(s, g, c) : m(s, g, c) : a(g, c);
  }
  b.all = function(g, c) {
    if (!Array.isArray(g))
      throw new Error("first argument should be an array");
    return g.reduce(function(x, p) {
      return b(x, p, c);
    }, {});
  };
  var L = b;
  return q = L, q;
}
var we = Oe();
const oe = /* @__PURE__ */ Se(we), O = {
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
  containerXPadding: 800,
  containerYPadding: 800,
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
  adsorptionXList: [],
  adsorptionYList: [],
  positionLineConfig: {
    lineColor: "#6CC6A7",
    padding: 3,
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
    yRulerWidth: 20,
    // 水平标尺的高度
    xRulerHeight: 20,
    // 标尺背景色
    // bgColor: '#efefef',
    bgColor: "#f5f5f5",
    // 标尺数值的颜色
    fontColor: "#797B80",
    // 标尺数值的字体大小
    fontSize: 10,
    // 标尺数值的字体
    fontFamily: "Arial",
    // 标尺刻度线的颜色
    lineColor: "#797B80",
    zIndex: 400
  }
};
(function() {
  const i = {};
  for (const y in O) {
    const t = O[y];
    typeof t == "object" && t !== null ? i[y] = () => t : i[y] = t;
  }
  return i;
})();
const Me = {
  scale: {
    type: Number,
    default: O.scale
  },
  minScale: {
    type: Number,
    default: O.minScale
  },
  maxScale: {
    type: Number,
    default: O.maxScale
  },
  canScale: {
    type: Boolean,
    default: O.canScale
  },
  autoCenter: {
    type: Boolean,
    default: O.autoCenter
  },
  autoScale: {
    type: Boolean,
    default: O.autoScale
  },
  containerAutoSize: {
    type: Boolean,
    default: O.containerAutoSize
  },
  containerWidth: {
    type: Number,
    default: O.containerWidth
  },
  containerHeight: {
    type: Number,
    default: O.containerHeight
  },
  containerXPadding: {
    type: Number,
    default: O.containerXPadding
  },
  containerYPadding: {
    type: Number,
    default: O.containerYPadding
  },
  canvasWidth: {
    type: Number,
    default: O.canvasWidth
  },
  canvasHeight: {
    type: Number,
    default: O.canvasHeight
  },
  proxyScaleKey: {
    type: Boolean,
    default: O.proxyScaleKey
  },
  useScrollBar: {
    type: Boolean,
    default: O.useScrollBar
  },
  useRuler: {
    type: Boolean,
    default: O.useRuler
  },
  usePositionLine: {
    type: Boolean,
    default: O.usePositionLine
  },
  positionLineConfig: {
    type: Object,
    default: O.positionLineConfig
  },
  canvasStyle: {
    type: Object,
    default: O.canvasStyle
  },
  scrollBarConfig: {
    type: Object,
    default: O.scrollBarConfig
  },
  rulerConfig: {
    type: Object,
    default: O.rulerConfig
  },
  adsorptionXList: {
    type: Object,
    default: O.adsorptionXList
  },
  adsorptionYList: {
    type: Object,
    default: O.adsorptionYList
  }
}, Ce = (i, y) => {
  const t = A({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });
  function r(a, o) {
    new ResizeObserver((d) => {
      for (const v of d)
        if (v.target === o) {
          const h = o.offsetWidth, n = o.offsetHeight;
          (h !== t.originWidth || n !== t.originHeight) && e(a, o);
        }
    }).observe(o);
  }
  function e(a, o, f = !1) {
    const d = a.value;
    d.containerAutoSize ? (t.width = o.offsetWidth, t.height = o.offsetHeight, t.originWidth = t.width, t.originHeight = t.height, f && r(a, o)) : (t.width = d.containerWidth, t.height = d.containerHeight);
    const v = getComputedStyle(o);
    v.boxSizing === "border-box" && (t.width -= parseFloat(v.borderLeftWidth) + parseFloat(v.borderRightWidth), t.height -= parseFloat(v.borderTopWidth) + parseFloat(v.borderBottomWidth)), v.position === "static" && (t.position = "relative");
  }
  W(() => {
    const a = y.value;
    a && e(i, a, !0);
  });
  const u = j(() => ({
    width: t.width,
    height: t.height
  })), l = j(() => {
    const a = i.value, o = {
      overflow: "hidden"
    };
    return a.containerAutoSize || (o.width = t.width + "px", o.height = t.height + "px"), t.position && (o.position = t.position), o;
  });
  return {
    containerInfo: u,
    containerStyle: l
  };
}, Re = (i, y, t, r) => {
  const e = A({});
  return T(
    () => y.value,
    () => {
      const u = i.value;
      let l = e.translateX || 0, a = e.translateY || 0, o = 0, f = 0, { scale: d } = u;
      const { autoCenter: v, autoScale: h } = u, { width: n, height: m } = y.value;
      if (h) {
        const s = (n - 160) / u.canvasWidth, g = (m - 2 * 80) / u.canvasHeight;
        d = Math.min(s, g);
      }
      e.scale = d;
      let b = 0, L = 0;
      o = u.canvasWidth * d, f = u.canvasHeight * d, v && (b = Math.floor((n - o) / 2), L = Math.floor((m - f) / 2), e.translateX = b, e.translateY = L), u.scale !== d && t(d), (l !== b || a || L) && r(b, L);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, je = (i, y, t) => ({ scrollBarInfo: j(() => {
  const e = i.value, { width: u, height: l } = y.value, { translateX: a, translateY: o, scale: f } = t, d = e.canvasWidth * f + 2 * e.containerXPadding, v = e.canvasHeight * f + 2 * e.containerYPadding, h = u < d, n = l < v, m = h || n, b = u * ((e.containerXPadding - a) / d), L = l * ((e.containerYPadding - o) / v), s = u / d * u, g = l / v * l;
  return {
    totalHeight: v,
    totalWidth: d,
    left: b,
    top: L,
    width: s,
    height: g,
    isYLarge: n,
    isXLarge: h,
    isLarge: m
  };
}) });
function ae(i, y, t) {
  const r = i.value, { containerXPadding: e, containerYPadding: u, canvasWidth: l, canvasHeight: a } = r, o = l * t, f = a * t, { width: d, height: v } = y.value, h = Math.max((d - o) / 2, e), n = Math.max((v - f) / 2, u), m = o + 2 * e > d ? d - (o + e) : h, b = f + 2 * u > v ? v - (f + u) : n;
  return {
    maxTranslateX: h,
    maxTranslateY: n,
    minTranslateX: m,
    minTranslateY: b
  };
}
const Xe = (i, y, t) => ({ boundaryInfo: j(() => ae(i, y, t.scale)) }), Q = (i, y, t, r, e, u) => {
  const l = i.value;
  if (!l.canScale) return;
  let { translateX: a, translateY: o, scale: f } = t, d = a, v = o;
  r = Math.min(Math.max(r, l.minScale), l.maxScale);
  const h = r - f, n = ae(
    i,
    y,
    r
  );
  a -= h * l.canvasWidth / 2, o -= h * l.canvasHeight / 2, a = Math.max(
    Math.min(a, n.maxTranslateX),
    n.minTranslateX
  ), o = Math.max(
    Math.min(o, n.maxTranslateY),
    n.minTranslateY
  ), t.scale = r, t.translateX = a, t.translateY = o, e(r), (d !== a || v !== o) && u(a, o);
}, Ye = (i, y, t, r, e) => {
  i.value.proxyScaleKey && document.addEventListener("keydown", (u) => {
    if (i.value.canScale) {
      const l = u.keyCode;
      if ((u.metaKey || u.ctrlKey) && (l === 187 || l === 189)) {
        u.preventDefault();
        const a = t.scale + (l === 187 ? 0.05 : -0.05);
        Q(i, y, t, a, r, e);
      }
    }
  });
}, Be = (i, y, t, r, e, u, l, a, o) => {
  let f = null;
  Object.assign(l, {
    xOpacity: 0,
    yOpacity: 0,
    scrollBarMouseDown: !1,
    scrollBarEnter: !1
  }), W(() => {
    e.value && e.value.addEventListener("wheel", (d) => {
      if (i.value.canScale)
        if (d.metaKey || d.ctrlKey) {
          d.preventDefault();
          const v = -1 * d.deltaY / 100, h = t.scale + v;
          Q(i, y, t, h, a, o);
        } else {
          if (!u.value.isLarge || l.scrollBarMouseDown)
            return;
          d.preventDefault();
          let { translateX: v, translateY: h } = t;
          f && clearTimeout(f);
          const n = -d.deltaX, m = -d.deltaY;
          let b = "";
          const { opacity: L = 0.4 } = i.value.scrollBarConfig, { isXLarge: s, isYLarge: g } = u.value, { maxTranslateX: c, minTranslateX: x, maxTranslateY: p, minTranslateY: M } = r.value;
          s && Math.abs(n) > Math.abs(m) && (v += n, v = Math.max(
            Math.min(v, c),
            x
          ), l.xOpacity = L, l.yOpacity = 0, t.translateX = v, b = "x"), g && Math.abs(m) > Math.abs(n) && (b = "y", h += m, h = Math.max(
            Math.min(h, p),
            M
          ), l.yOpacity = L, l.xOpacity = 0, t.translateY = h), b && (o(
            t.translateX,
            t.translateY
          ), f = setTimeout(() => {
            l.scrollBarEnter || (l[b === "y" ? "yOpacity" : "xOpacity"] = 0);
          }, 1e3));
        }
    });
  });
}, Pe = /* @__PURE__ */ H({
  __name: "index",
  props: Me,
  emits: [
    "update:scale",
    "onScale",
    "onMove",
    "update:adsorptionXList",
    "update:adsorptionYList"
  ],
  setup(i, { expose: y, emit: t }) {
    const r = i, e = B(
      oe(O, r, { arrayMerge: V })
    ), u = t, l = B(null), { containerInfo: a, containerStyle: o } = Ce(e, l), { transformInfo: f } = Re(e, a, n, m), { boundaryInfo: d } = Xe(e, a, f), { scrollBarInfo: v } = je(e, a, f), h = A({});
    T(
      () => f.scale,
      (S) => {
        if (S) {
          if (!h.scale) {
            const w = {
              scale: S,
              translateX: f.translateX,
              translateY: f.translateY
            };
            Object.assign(h, w);
          }
          u("update:scale", S);
        }
      }
    ), T(
      () => r,
      () => {
        e.value = oe(e.value, r, {
          arrayMerge: V
        });
      },
      {
        deep: !0
      }
    );
    function n(S) {
      u("onScale", S);
    }
    function m(S, w) {
      u("onMove", S, w);
    }
    function b(S) {
      Q(e, a, f, S, n, m);
    }
    T(
      () => e.value.scale,
      (S) => {
        S !== f.scale && b(S);
      }
    ), Ye(e, a, f, n, m);
    const L = A({});
    Be(
      e,
      a,
      f,
      d,
      l,
      v,
      L,
      n,
      m
    );
    function s(S, w) {
      u(`update:adsorption${w ? "Y" : "X"}List`, S);
    }
    function g() {
      Object.assign(f, h);
    }
    const c = B(null), x = B(null);
    function p() {
      e.value.useRuler && (c.value && c.value.removeAllPositionLine(), x.value && x.value.removeAllPositionLine());
    }
    function M(S = !0) {
      e.value.useRuler && (c.value && c.value.toggleRuler(S), x.value && x.value.toggleRuler(S));
    }
    function X(S = !0) {
      e.value.useRuler && (c.value && c.value.togglePositionLine(S), x.value && x.value.togglePositionLine(S));
    }
    function _(S, w = !0, Z = !1) {
      e.value.useRuler && (Z && c.value && c.value.modifyAdsorptionList(S, w), !Z && x.value && x.value.modifyAdsorptionList(S, w));
    }
    function C(S) {
      let w = [];
      return e.value.useRuler && (S ? c.value && (w = c.value.getPositionLineList()) : x.value && (w = x.value.getPositionLineList())), w;
    }
    return y({
      reset: g,
      changeScale: b,
      removeAllPositionLine: p,
      showRuler() {
        M();
      },
      hideRuler() {
        M(!1);
      },
      showAllPositionLine() {
        X();
      },
      hideAllPositionLine() {
        X(!1);
      },
      addAdsorptionLine(S, w = !1) {
        _(S, !0, w);
      },
      removeAdsorptionLine(S, w = !1) {
        _(S, !1, w);
      },
      getPositionLineList: C
    }), (S, w) => (Y(), P("div", {
      class: "scale-ruler",
      ref_key: "container",
      ref: l,
      style: E(R(o))
    }, [
      e.value.useRuler ? (Y(), P(N, { key: 0 }, [
        k(te, {
          ref_key: "xRuler",
          ref: c,
          opt: e.value,
          "container-info": R(a),
          "transform-info": R(f),
          onUpdateAdsorptionList: s
        }, null, 8, ["opt", "container-info", "transform-info"]),
        k(te, {
          ref_key: "yRuler",
          ref: x,
          "is-y": "",
          opt: e.value,
          "container-info": R(a),
          "transform-info": R(f),
          onUpdateAdsorptionList: s
        }, null, 8, ["opt", "container-info", "transform-info"])
      ], 64)) : z("", !0),
      k(he, {
        "container-info": R(a),
        opt: e.value,
        "transform-info": R(f)
      }, {
        default: de(() => [
          re(S.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "transform-info"]),
      R(v).isXLarge ? (Y(), F(ee, {
        key: 1,
        opt: e.value,
        "container-info": R(a),
        "scroll-bar-info": R(v),
        "global-info": L,
        "transform-info": R(f),
        onOnMove: m
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : z("", !0),
      R(v).isYLarge ? (Y(), F(ee, {
        key: 2,
        opt: e.value,
        "container-info": R(a),
        "scroll-bar-info": R(v),
        "global-info": L,
        "transform-info": R(f),
        onOnMove: m,
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : z("", !0)
    ], 4));
  }
});
export {
  Pe as default
};
