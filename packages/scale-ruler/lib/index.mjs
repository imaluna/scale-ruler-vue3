import { defineComponent as H, computed as j, openBlock as _, createElementBlock as Y, normalizeStyle as E, renderSlot as re, toRefs as G, ref as P, onMounted as W, nextTick as ie, reactive as A, watch as T, createElementVNode as $, toDisplayString as se, unref as R, Fragment as N, withDirectives as le, vShow as ce, normalizeClass as ue, renderList as fe, createBlock as F, createCommentVNode as I, createVNode as D, withCtx as de } from "vue";
const pe = (i) => i <= 0.25 ? 40 : i <= 0.5 ? 20 : i <= 1 ? 10 : i <= 2 ? 5 : i <= 4 ? 2 : 1, ve = (i) => {
  const y = i.getBoundingClientRect(), t = y.top + (document.body.scrollTop || document.documentElement.scrollTop), r = y.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top: t, left: r };
}, K = (i, y, t) => {
  const { scale: r, translateX: e, translateY: u } = i;
  return (y - (t ? u : e)) / r;
}, U = (i, y, t) => {
  const { scale: r, translateX: e, translateY: u } = i, l = y * r;
  return (t ? u : e) + l;
};
function k(i, y, t, r, e, u) {
  const l = { coordinate: e, translate: r }, a = i.length;
  if (a > 0) {
    let o = 0;
    for (; o < a; ) {
      const f = i[o];
      if (Math.abs(e - f) <= Math.max(t, t / y.scale)) {
        l.coordinate = f, l.translate = U(y, f, u);
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
function z(i) {
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
    return (r, e) => (_(), Y("div", {
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
    const t = i, r = y, { globalInfo: e, transformInfo: u } = G(t), l = j(() => {
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
    }), a = P(null), o = {};
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
    }), (h, n) => (_(), Y("div", {
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
        const m = t ? a.yRulerWidth : a.xRulerHeight, { translateX: b, translateY: L, scale: s } = y, g = t ? L : b, c = pe(s), x = c * s, p = window.devicePixelRatio, w = -g, B = Math.floor(w / x), X = Math.floor(
          ((t ? l : u) - g) / x
        );
        n.save(), n.fillStyle = v, n.font = `${d * p}px ${f}`, n.translate(0.5, 0.5), n.scale(1 / p, 1 / p), t ? n.fillRect((m - 1) * p, 0, 1, l * p) : n.fillRect(0, (m - 1) * p, u * p, 1);
        for (let M = B; M <= X; M++) {
          n.fillStyle = v;
          const S = (g + M * x) * p;
          let O = m / 4;
          M % 10 === 0 ? O = m * 4 / 5 : M % 5 === 0 && (O = m / 3), t ? n.fillRect((m - O) * p, S, O * p, 1) : (n.fillRect(S, (m - O) * p, 1, O * p), M % 10 === 0 && (n.fillStyle = h, n.fillText(
            String(M * c),
            S + 2 * p,
            (m + 8 - O) * p
          )));
        }
        if (n.restore(), t) {
          n.font = `${d}px ${f}`, n.fillStyle = v;
          let M = B;
          for (; M <= X; )
            if (M % 10)
              M++;
            else {
              n.save();
              const S = g + M * x + m / 2;
              n.translate(S + m / 5, S - m * 6 / 5), n.rotate(Math.PI / 2), n.fillText(String(M * c), m * 4 / 5, S), M += 10, n.restore();
            }
        }
      }
    }
  });
}, ye = (i, y, t) => {
  const r = j(
    () => z(
      i.value.positionLineConfig[y ? "adsorptionYList" : "adsorptionXList"]
    )
  ), e = A(r.value);
  a(0);
  function u(d, v = !0) {
    const h = e.indexOf(d);
    v && h === -1 && e.push(d), !v && h > -1 && e.splice(h, 1), v && z(e);
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
      z(d), d.join(",") !== z(e).join(",") && ((v == null ? void 0 : v.length) > 0 && o(v), a(d));
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
      ), x = k(
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
      const s = k(
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
    ), s = k(
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
    l.value.start = m, l.value.startTranslate = U(
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
      const c = k(
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
    const t = i, { lineInfo: r, adsorptionList: e, transformInfo: u, opt: l, containerInfo: a } = G(t), o = j(() => l.value.positionLineConfig.padding), f = j(() => 2 * o.value + 1), d = j(
      () => U(
        u.value,
        r.value.coordinate,
        t.isY
      )
    ), v = j(() => {
      const { width: c, height: x } = a.value, { isY: p } = t, w = p ? `translate(0, ${d.value}px)` : `translate(${d.value}px, 0)`;
      return {
        display: r.value.show ? "block" : "none",
        position: "absolute",
        width: (p ? c : f.value) + "px",
        height: (p ? f.value : x) + "px",
        cursor: p ? "row-resize" : "col-resize",
        top: (p ? -o.value : 0) + "px",
        left: (p ? 0 : -o.value) + "px",
        transform: w,
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
    }), n = P({}), m = j(() => {
      const { isY: c } = t, { width: x, height: p } = a.value, { tipWidth: w, tipHeight: B } = n.value;
      let X, M;
      return w && B ? (M = c ? "50%" : (d.value + f.value + w >= x ? -w : f.value) + "px", X = c ? (d.value + f.value + B >= p ? -B : f.value) + "px" : "50%") : (M = c ? "50%" : f.value + "px", X = c ? f.value + "px" : "50%"), {
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
        left: M,
        top: X,
        transform: c ? "translate(-50%, 0)" : "translate(0, -50%)",
        visibility: r.value.showTip ? "visible" : "hidden"
      };
    }), b = P(null), L = y;
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
    const g = P(null);
    return W(() => {
      if (g.value) {
        const c = g.value, x = c.offsetWidth, p = c.offsetHeight;
        n.value.tipWidth = x, n.value.tipHeight = p;
      }
    }), (c, x) => (_(), Y("div", {
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
  emits: ["adsorptionLineChange"],
  setup(i, { expose: y, emit: t }) {
    const r = i, { opt: e, transformInfo: u, containerInfo: l } = G(r), a = j(() => {
      const { isY: p, containerInfo: w, opt: B } = r;
      return {
        width: p ? B.rulerConfig.yRulerWidth : w.width,
        height: p ? w.height : B.rulerConfig.xRulerHeight
      };
    }), o = j(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: r.opt.rulerConfig.zIndex + (r.isY ? 0 : 1)
    })), f = P();
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
      d("adsorptionLineChange", p, !r.isY);
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
      Object.keys(m).forEach((w) => {
        m[w].show = p;
      });
    }
    const g = P(!0);
    function c(p = !0) {
      g.value = p, s(p);
    }
    function x() {
      return m.filter((p) => !!p).map((p) => p.coordinate).sort((p, w) => p - w);
    }
    return y({
      modifyAdsorptionList: n,
      removeAllPositionLine: L,
      togglePositionLine: s,
      toggleRuler: c,
      getPositionLineList: x
    }), (p, w) => (_(), Y(N, null, [
      le($("canvas", {
        ref_key: "rulerRef",
        ref: f,
        style: E(o.value),
        width: a.value.width,
        height: a.value.height
      }, null, 12, Le), [
        [ce, g.value]
      ]),
      r.opt.usePositionLine ? (_(), Y("div", {
        key: 0,
        class: ue("position-line-" + (r.isY ? "x" : "y"))
      }, [
        (_(!0), Y(N, null, fe(Object.keys(R(m)), (B) => (_(), F(xe, {
          key: B,
          opt: r.opt,
          "is-y": !r.isY,
          "transform-info": r.transformInfo,
          "container-info": r.containerInfo,
          "line-info": R(m)[B],
          "adsorption-list": R(h),
          onRemovePositionLine: b
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info", "adsorption-list"]))), 128))
      ], 2)) : I("", !0)
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
    var x = Array.isArray(g), p = Array.isArray(s), w = x === p;
    return w ? x ? c.arrayMerge(s, g, c) : m(s, g, c) : a(g, c);
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
var Ce = Oe();
const oe = /* @__PURE__ */ Se(Ce), C = {
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
  positionLineConfig: {
    lineColor: "#6CC6A7",
    padding: 3,
    // 吸附距离
    adsorptionGap: 4,
    zIndex: 300,
    adsorptionXList: [],
    adsorptionYList: []
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
  for (const y in C) {
    const t = C[y];
    typeof t == "object" && t !== null ? i[y] = () => t : i[y] = t;
  }
  return i;
})();
const we = {
  scale: {
    type: Number,
    default: C.scale
  },
  minScale: {
    type: Number,
    default: C.minScale
  },
  maxScale: {
    type: Number,
    default: C.maxScale
  },
  canScale: {
    type: Boolean,
    default: C.canScale
  },
  autoCenter: {
    type: Boolean,
    default: C.autoCenter
  },
  autoScale: {
    type: Boolean,
    default: C.autoScale
  },
  containerAutoSize: {
    type: Boolean,
    default: C.containerAutoSize
  },
  containerWidth: {
    type: Number,
    default: C.containerWidth
  },
  containerHeight: {
    type: Number,
    default: C.containerHeight
  },
  containerXPadding: {
    type: Number,
    default: C.containerXPadding
  },
  containerYPadding: {
    type: Number,
    default: C.containerYPadding
  },
  canvasWidth: {
    type: Number,
    default: C.canvasWidth
  },
  canvasHeight: {
    type: Number,
    default: C.canvasHeight
  },
  proxyScaleKey: {
    type: Boolean,
    default: C.proxyScaleKey
  },
  useScrollBar: {
    type: Boolean,
    default: C.useScrollBar
  },
  useRuler: {
    type: Boolean,
    default: C.useRuler
  },
  usePositionLine: {
    type: Boolean,
    default: C.usePositionLine
  },
  positionLineConfig: {
    type: Object,
    default: C.positionLineConfig
  },
  canvasStyle: {
    type: Object,
    default: C.canvasStyle
  },
  scrollBarConfig: {
    type: Object,
    default: C.scrollBarConfig
  },
  rulerConfig: {
    type: Object,
    default: C.rulerConfig
  }
}, Me = (i, y) => {
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
const Be = (i, y, t) => ({ boundaryInfo: j(() => ae(i, y, t.scale)) }), Q = (i, y, t, r, e, u) => {
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
}, _e = (i, y, t, r, e) => {
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
}, Pe = (i, y, t, r, e, u, l, a, o) => {
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
          const { opacity: L = 0.4 } = i.value.scrollBarConfig, { isXLarge: s, isYLarge: g } = u.value, { maxTranslateX: c, minTranslateX: x, maxTranslateY: p, minTranslateY: w } = r.value;
          s && Math.abs(n) > Math.abs(m) && (v += n, v = Math.max(
            Math.min(v, c),
            x
          ), l.xOpacity = L, l.yOpacity = 0, t.translateX = v, b = "x"), g && Math.abs(m) > Math.abs(n) && (b = "y", h += m, h = Math.max(
            Math.min(h, p),
            w
          ), l.yOpacity = L, l.xOpacity = 0, t.translateY = h), b && (o(
            t.translateX,
            t.translateY
          ), f = setTimeout(() => {
            l.scrollBarEnter || (l[b === "y" ? "yOpacity" : "xOpacity"] = 0);
          }, 1e3));
        }
    });
  });
}, Ye = /* @__PURE__ */ H({
  __name: "index",
  props: we,
  emits: [
    "update:scale",
    "onScale",
    "onMove",
    "adsorptionLineChange"
  ],
  setup(i, { expose: y, emit: t }) {
    const r = i, e = P(
      oe(C, r, { arrayMerge: V })
    ), u = t, l = P(null), { containerInfo: a, containerStyle: o } = Me(e, l), { transformInfo: f } = Re(e, a, n, m), { boundaryInfo: d } = Be(e, a, f), { scrollBarInfo: v } = je(e, a, f), h = A({});
    T(
      () => f.scale,
      (S) => {
        if (S) {
          if (!h.scale) {
            const O = {
              scale: S,
              translateX: f.translateX,
              translateY: f.translateY
            };
            Object.assign(h, O);
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
    function m(S, O) {
      u("onMove", S, O);
    }
    function b(S) {
      Q(e, a, f, S, n, m);
    }
    T(
      () => e.value.scale,
      (S) => {
        S !== f.scale && b(S);
      }
    ), _e(e, a, f, n, m);
    const L = A({});
    Pe(
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
    function s(S, O) {
      u("adsorptionLineChange", S, O);
    }
    function g() {
      Object.assign(f, h);
    }
    const c = P(null), x = P(null);
    function p() {
      e.value.useRuler && (c.value && c.value.removeAllPositionLine(), x.value && x.value.removeAllPositionLine());
    }
    function w(S = !0) {
      e.value.useRuler && (c.value && c.value.toggleRuler(S), x.value && x.value.toggleRuler(S));
    }
    function B(S = !0) {
      e.value.useRuler && (c.value && c.value.togglePositionLine(S), x.value && x.value.togglePositionLine(S));
    }
    function X(S, O = !0, Z = !1) {
      e.value.useRuler && (Z && c.value && c.value.modifyAdsorptionList(S, O), !Z && x.value && x.value.modifyAdsorptionList(S, O));
    }
    function M(S) {
      let O = [];
      return e.value.useRuler && (S ? c.value && (O = c.value.getPositionLineList()) : x.value && (O = x.value.getPositionLineList())), O;
    }
    return y({
      reset: g,
      changeScale: b,
      removeAllPositionLine: p,
      showRuler() {
        w();
      },
      hideRuler() {
        w(!1);
      },
      showAllPositionLine() {
        B();
      },
      hideAllPositionLine() {
        B(!1);
      },
      addAdsorptionLine(S, O = !1) {
        X(S, !0, O);
      },
      removeAdsorptionLine(S, O = !1) {
        X(S, !1, O);
      },
      getPositionLineList: M
    }), (S, O) => (_(), Y("div", {
      class: "scale-ruler",
      ref_key: "container",
      ref: l,
      style: E(R(o))
    }, [
      e.value.useRuler ? (_(), Y(N, { key: 0 }, [
        D(te, {
          ref_key: "xRuler",
          ref: c,
          opt: e.value,
          "container-info": R(a),
          "transform-info": R(f),
          onAdsorptionLineChange: s
        }, null, 8, ["opt", "container-info", "transform-info"]),
        D(te, {
          ref_key: "yRuler",
          ref: x,
          "is-y": "",
          opt: e.value,
          "container-info": R(a),
          "transform-info": R(f),
          onAdsorptionLineChange: s
        }, null, 8, ["opt", "container-info", "transform-info"])
      ], 64)) : I("", !0),
      D(he, {
        "container-info": R(a),
        opt: e.value,
        "transform-info": R(f)
      }, {
        default: de(() => [
          re(S.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "transform-info"]),
      R(v).isXLarge ? (_(), F(ee, {
        key: 1,
        opt: e.value,
        "container-info": R(a),
        "scroll-bar-info": R(v),
        "global-info": L,
        "transform-info": R(f),
        onOnMove: m
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : I("", !0),
      R(v).isYLarge ? (_(), F(ee, {
        key: 2,
        opt: e.value,
        "container-info": R(a),
        "scroll-bar-info": R(v),
        "global-info": L,
        "transform-info": R(f),
        onOnMove: m,
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : I("", !0)
    ], 4));
  }
});
export {
  Ye as default
};
