import { defineComponent as T, computed as R, openBlock as j, createElementBlock as X, normalizeStyle as Y, renderSlot as ie, toRefs as J, ref as P, onMounted as W, nextTick as ce, reactive as I, watch as E, createElementVNode as H, Fragment as $, toDisplayString as ue, unref as _, withDirectives as ae, createVNode as k, vShow as se, normalizeClass as fe, renderList as pe, createBlock as N, createCommentVNode as D, mergeDefaults as de, withCtx as ve } from "vue";
const he = (n) => n <= 0.25 ? 40 : n <= 0.5 ? 20 : n <= 1 ? 10 : n <= 2 ? 5 : n <= 4 ? 2 : 1, ge = (n) => n.getBoundingClientRect(), G = (n, h, t) => {
  const { scale: o, translateX: e, translateY: c } = n;
  return (h - (t ? c : e)) / o;
}, Q = (n, h, t) => {
  const { scale: o, translateX: e, translateY: c } = n, l = h * o;
  return (t ? c : e) + l;
};
function q(n, h, t, o, e, c) {
  const l = { coordinate: e, translate: o }, f = n.length;
  if (f > 0) {
    let s = 0;
    for (; s < f; ) {
      const i = n[s];
      if (Math.abs(e - i) <= Math.max(t, t / h.scale)) {
        l.coordinate = i, l.translate = Q(h, i, c);
        break;
      } else if (i > e)
        break;
      s++;
    }
  }
  return l;
}
function ee(n, h) {
  return h;
}
function z(n) {
  return n.sort((h, t) => h - t);
}
const me = /* @__PURE__ */ T({
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
  setup(n) {
    const h = n, t = R(() => {
      var o, e;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((o = h.opt) == null ? void 0 : o.canvasWidth) + "px",
        height: ((e = h.opt) == null ? void 0 : e.canvasHeight) + "px",
        transformOrigin: "0 0",
        transform: `translate(${h.transformInfo.translateX}px, ${h.transformInfo.translateY}px) scale(${h.transformInfo.scale})`,
        ...h.opt.canvasStyle
      };
    });
    return (o, e) => (j(), X("div", {
      ref: "canvasPanel",
      style: Y(t.value)
    }, [
      ie(o.$slots, "default")
    ], 4));
  }
});
function Z(n, h, t, o) {
  if (!n) return;
  function e(c) {
    c.preventDefault(), typeof t == "function" && t(c);
  }
  n.addEventListener("mousedown", (c) => {
    c.button === 0 && (c.preventDefault(), typeof h == "function" && h(c), document.addEventListener("mousemove", e));
  }), document.addEventListener("mouseup", (c) => {
    document.removeEventListener("mousemove", e), typeof o == "function" && o(c);
  });
}
const te = /* @__PURE__ */ T({
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
  setup(n, { emit: h }) {
    const t = n, o = h, { globalInfo: e, transformInfo: c } = J(t), l = R(() => {
      const { opt: y, scrollBarInfo: r, isY: g } = t, { scrollBarConfig: x } = y, m = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: x.bgColor,
        opacity: t.globalInfo[g ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: x.zIndex,
        width: (g ? x.barSize : r.width) + "px",
        height: (g ? r.height : x.barSize) + "px"
      };
      return g ? (m.top = r.top + "px", m.right = 0) : (m.left = r.left + "px", m.bottom = 0), m;
    }), f = P(null), s = {};
    function i(y) {
      if (y.preventDefault(), !e.value.scrollBarMouseDown) return;
      let { translateX: r, translateY: g } = c.value;
      const x = t.scrollBarInfo, { width: m, height: a } = t.containerInfo;
      if (t.isY) {
        const u = y.pageY - s.startY;
        let b = s.top + u;
        b = Math.min(Math.max(0, b), a - x.height);
        const L = b * x.totalHeight / a;
        g = t.opt.containerYPadding - L, c.value.translateY = g;
      } else {
        const u = y.pageX - s.startX;
        let b = s.left + u;
        b = Math.min(Math.max(0, b), m - x.width);
        const L = b * x.totalWidth / m;
        r = t.opt.containerXPadding - L, c.value.translateX = r;
      }
      o(
        "onMove",
        c.value.translateX,
        c.value.translateY
      );
    }
    function p(y) {
      e.value.scrollBarMouseDown = !0, s.startX = y.pageX, s.startY = y.pageY, s.left = t.scrollBarInfo.left, s.top = t.scrollBarInfo.top;
    }
    function d() {
      e.value.scrollBarMouseDown && (e.value.scrollBarMouseDown = !1);
    }
    return W(() => {
      if (f.value) {
        const y = f.value, r = t.isY ? "yOpacity" : "xOpacity";
        y.addEventListener("mouseenter", () => {
          e.value[r] = t.opt.scrollBarConfig.opacity, e.value[t.isY ? "xOpacity" : "yOpacity"] = 0, e.value.scrollBarEnter = !0;
        }), y.addEventListener("mouseleave", () => {
          e.value.scrollBarMouseDown || (e.value.scrollBarEnter = !1, e.value[r] = 0);
        }), Z(y, p, i, d);
      }
    }), (y, r) => (j(), X("div", {
      ref_key: "scrollBarRef",
      ref: f,
      style: Y(l.value)
    }, null, 4));
  }
}), ye = (n, h, t, o) => {
  ce(() => {
    const e = o.value;
    if (e) {
      const c = e.offsetWidth, l = e.offsetHeight, { rulerConfig: f } = n, { bgColor: s, fontFamily: i, fontSize: p, lineColor: d, fontColor: y } = f;
      if (c > 0 && l > 0) {
        const r = e.getContext("2d");
        r.clearRect(0, 0, c, l), s && (r.save(), r.fillStyle = s, r.fillRect(0, 0, c, l), r.restore());
        const g = t ? f.yRulerWidth : f.xRulerHeight, { translateX: x, translateY: m, scale: a } = h, u = t ? m : x, b = he(a), L = b * a, v = window.devicePixelRatio, O = -u, w = Math.floor(O / L), B = Math.floor(
          ((t ? l : c) - u) / L
        );
        r.save(), r.fillStyle = d, r.font = `${p * v}px ${i}`, r.translate(0.5, 0.5), r.scale(1 / v, 1 / v), t ? r.fillRect((g - 1) * v, 0, 1, l * v) : r.fillRect(0, (g - 1) * v, c * v, 1);
        for (let S = w; S <= B; S++) {
          r.fillStyle = d;
          const C = (u + S * L) * v;
          let M = g / 4;
          S % 10 === 0 ? M = g * 4 / 5 : S % 5 === 0 && (M = g / 3), t ? r.fillRect((g - M) * v, C, M * v, 1) : (r.fillRect(C, (g - M) * v, 1, M * v), S % 10 === 0 && (r.fillStyle = y, r.fillText(
            String(S * b),
            C + 2 * v,
            (g + 8 - M) * v
          )));
        }
        if (r.restore(), t) {
          r.font = `${p}px ${i}`, r.fillStyle = d;
          let S = w;
          for (; S <= B; )
            if (S % 10)
              S++;
            else {
              r.save();
              const C = u + S * L + g / 2;
              r.translate(C + g / 5, C - g * 6 / 5), r.rotate(Math.PI / 2), r.fillText(String(S * b), g * 4 / 5, C), S += 10, r.restore();
            }
        }
      }
    }
  });
}, be = (n, h, t) => {
  const o = R(
    () => z(
      n.value.positionLineConfig[h ? "adsorptionYList" : "adsorptionXList"]
    )
  ), e = I(o.value);
  f(0);
  function c(p, d = !0) {
    const y = e.indexOf(p);
    d && y === -1 && e.push(p), !d && y > -1 && e.splice(y, 1), d && z(e);
  }
  function l(p, d = !0) {
    Array.isArray(p) ? p.forEach((y) => c(y, d)) : c(p, d), t(e);
  }
  function f(p) {
    l(p);
  }
  function s(p) {
    l(p, !1);
  }
  E(
    () => o.value,
    (p, d) => {
      z(p), p.join(",") !== z(e).join(",") && ((d == null ? void 0 : d.length) > 0 && s(d), f(p));
    }
  );
  const i = R(
    () => h ? n.value.canvasHeight : n.value.canvasWidth
  );
  return E(
    () => i.value,
    (p, d) => {
      d !== void 0 && s(d), f(p);
    },
    {
      immediate: !0
    }
  ), { adsorptionList: e, modifyAdsorptionList: l };
}, xe = (n, h, t, o, e, c, l) => {
  let f = 1;
  const s = I([]);
  let i = -1, p = !1;
  function d(r) {
    if (p && i > -1) {
      r.preventDefault();
      const { xRulerHeight: g, yRulerWidth: x } = n.value.rulerConfig, m = s[i], a = (e ? r.pageY : r.pageX) - m.start, u = m.startTranslate + a, b = u > (e ? g : x), L = G(
        o.value,
        u,
        e
      ), v = q(
        t,
        o.value,
        n.value.positionLineConfig.adsorptionGap,
        u,
        L,
        e
      );
      s[i].showTip = b, s[i].translate = v.translate, s[i].coordinate = v.coordinate;
    }
  }
  function y() {
    if (!p || i < 0) return;
    p = !1;
    const r = s[i], { width: g, height: x } = h.value, { xRulerHeight: m, yRulerWidth: a } = n.value.rulerConfig;
    if (r.translate <= (e ? m : a) || r.translate >= (e ? x : g))
      delete s[i];
    else {
      const u = q(
        t,
        o.value,
        n.value.positionLineConfig.adsorptionGap,
        r.translate,
        r.coordinate,
        e
      );
      s[i].translate = u.translate, s[i].coordinate = u.coordinate, l();
    }
    i = -1;
  }
  return W(() => {
    if (c.value) {
      let r = function(x) {
        const m = ge(g), a = e ? x.pageY : x.pageX, u = a - (e ? m.y : m.x), b = {
          startTranslate: u,
          translate: u,
          start: a,
          id: f,
          coordinate: G(
            o.value,
            u,
            e
          ),
          showTip: !1,
          show: !0
        };
        i = f, s[f++] = b, p = !0;
      };
      const g = c.value;
      Z(g, r, d, y);
    }
  }), { positionLineMap: s };
}, Le = {
  t: "1737358597390",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "4475",
  width: "128",
  height: "128"
}, Ce = ["fill"], we = /* @__PURE__ */ T({
  __name: "RemoveIcon",
  props: {
    fillColor: String
  },
  setup(n) {
    return (h, t) => (j(), X("svg", Le, [
      H("path", {
        d: "M555.096563 512.000978L894.74651 172.351031a29.254124 29.254124 0 0 0 8.626944-20.779801c0-16.210984-13.14293-29.350001-29.350001-29.350001a29.244341 29.244341 0 0 0-20.752407 8.597594l-0.001957-0.001957-339.679297 339.677341L173.918321 130.822736a29.256081 29.256081 0 0 0-20.756321-8.601507c-16.209027 0-29.351957 13.140974-29.351957 29.350001a29.252167 29.252167 0 0 0 8.59955 20.754364l339.677341 339.677341-339.679298 339.677341a29.248254 29.248254 0 0 0-8.59955 20.752407c0 16.209027 13.14293 29.348044 29.351957 29.348044 8.108427 0 15.445927-3.2872 20.756321-8.601507l339.673428-339.671471 339.679297 339.679298 0.001957-0.001957a29.252167 29.252167 0 0 0 20.752407 8.597594c16.20707 0 29.350001-13.139017 29.350001-29.350001 0-8.120167-3.300897-15.465494-8.626944-20.7798L555.096563 512.000978z",
        fill: n.fillColor,
        "p-id": "4476"
      }, null, 8, Ce)
    ]));
  }
}), Se = (n, h, t, o, e, c, l, f, s) => {
  let i = !1;
  const p = I({});
  function d(m) {
    l.value.showTip = m;
  }
  function y(m) {
    if (!i) return;
    const a = (e ? m.pageY : m.pageX) - l.value.start, u = l.value.startTranslate + a, b = G(
      o.value,
      u,
      e
    ), L = q(
      t.value,
      o.value,
      n.value.positionLineConfig.adsorptionGap,
      u,
      b,
      e
    );
    l.value.coordinate = L.coordinate, l.value.translate = L.translate;
  }
  function r(m) {
    i = !0, l.value.showTip = !0;
    const a = e ? m.pageY : m.pageX;
    l.value.start = a, l.value.startTranslate = Q(
      o.value,
      l.value.coordinate,
      e
    );
  }
  function g() {
    if (!i) return;
    i = !1;
    const { translate: m, id: a } = l.value, { width: u, height: b } = h.value, { xRulerHeight: L, yRulerWidth: v } = n.value.rulerConfig;
    if (m <= (e ? L : v) || m >= (e ? b : u))
      f(a);
    else {
      const O = q(
        t.value,
        o.value,
        n.value.positionLineConfig.adsorptionGap,
        m,
        l.value.coordinate,
        e
      );
      l.value.coordinate = O.coordinate, l.value.translate = O.translate, s();
    }
  }
  function x() {
    p.show = !1, document.removeEventListener("click", x);
  }
  return W(() => {
    if (c.value) {
      const m = c.value;
      m.addEventListener("mouseenter", () => {
        d(!0);
      }), m.addEventListener("mouseleave", () => {
        i || d(!1);
      }), m.addEventListener("contextmenu", (a) => {
        a.preventDefault();
        let u = a.pageX + 10, b = a.pageY - (e ? 20 : 10);
        p.top = b, p.left = u, p.show = !0, document.addEventListener("click", x);
      }), Z(m, r, y, g);
    }
  }), { removeIconInfo: p };
}, Me = /* @__PURE__ */ T({
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
  emits: ["removePositionLine", "positionLineChange"],
  setup(n, { emit: h }) {
    const t = n, { lineInfo: o, adsorptionList: e, transformInfo: c, opt: l, containerInfo: f } = J(t), s = R(() => l.value.positionLineConfig.padding), i = R(() => 2 * s.value + 1), p = R(
      () => l.value.positionLineConfig.removeIcon || we
    ), d = R(
      () => Q(
        c.value,
        o.value.coordinate,
        t.isY
      )
    ), y = R(() => {
      const { width: w, height: B } = f.value, { isY: S } = t, C = S ? `translate(0, ${d.value}px)` : `translate(${d.value}px, 0)`;
      return {
        display: o.value.show ? "block" : "none",
        width: (S ? w : i.value) + "px",
        height: (S ? i.value : B) + "px",
        cursor: S ? "row-resize" : "col-resize",
        top: (S ? -s.value : 0) + "px",
        left: (S ? 0 : -s.value) + "px",
        transform: C,
        zIndex: t.opt.positionLineConfig.zIndex
      };
    }), r = R(() => {
      const { isY: w } = t;
      return {
        width: w ? "100%" : "1px",
        height: w ? "1px" : "100%",
        backgroundColor: l.value.positionLineConfig.lineColor,
        top: (w ? s.value : 0) + "px",
        left: (w ? 0 : s.value) + "px"
      };
    }), g = P({}), x = R(() => {
      const { isY: w } = t, { width: B, height: S } = f.value, { tipWidth: C, tipHeight: M } = g.value;
      let A, F;
      return C && M ? (F = w ? "50%" : (d.value + i.value + C >= B ? -C : i.value) + "px", A = w ? (d.value + i.value + M >= S ? -M : i.value) + "px" : "50%") : (F = w ? "50%" : i.value + "px", A = w ? i.value + "px" : "50%"), {
        padding: "5px",
        lineHeight: "18px",
        minWidth: "80px",
        backgroundColor: "rgba(0,0,0,.8)",
        color: "#fff",
        fontSize: "12px",
        borderRadius: "4px",
        userSelect: "none",
        textAlign: "center",
        left: F,
        top: A,
        transform: w ? "translate(-50%, 0)" : "translate(0, -50%)",
        visibility: o.value.showTip ? "visible" : "hidden"
      };
    }), m = P(null), a = h;
    function u(w) {
      a("removePositionLine", w);
    }
    function b() {
      a("positionLineChange");
    }
    const { removeIconInfo: L } = Se(
      l,
      f,
      e,
      c,
      t.isY,
      m,
      o,
      u,
      b
    ), v = R(() => ({
      top: L.top + "px",
      left: L.left + "px"
    })), O = P(null);
    return W(() => {
      if (O.value) {
        const w = O.value, B = w.offsetWidth, S = w.offsetHeight;
        g.value.tipWidth = B, g.value.tipHeight = S;
      }
    }), (w, B) => (j(), X($, null, [
      H("div", {
        ref_key: "positionLineRef",
        ref: m,
        class: "scale-ruler_position-line",
        style: Y(y.value)
      }, [
        H("div", {
          class: "scale-ruler_position-line_inner",
          style: Y(r.value)
        }, null, 4),
        H("div", {
          class: "scale-ruler_position-line_tip",
          style: Y(x.value),
          ref_key: "tipRef",
          ref: O
        }, ue((n.isY ? "Y" : "X") + ": " + +_(o).coordinate.toFixed(2) + " px"), 5)
      ], 4),
      ae(k(_(p), {
        class: "scale-ruler_position-line_remove",
        style: Y(v.value),
        "fill-color": _(l).positionLineConfig.removeIconFillColor,
        onClick: B[0] || (B[0] = (S) => u(_(o).id))
      }, null, 8, ["style", "fill-color"]), [
        [se, _(L).show]
      ])
    ], 64));
  }
}), Oe = (n, h) => {
  const t = n.__vccOpts || n;
  for (const [o, e] of h)
    t[o] = e;
  return t;
}, _e = /* @__PURE__ */ Oe(Me, [["__scopeId", "data-v-6845710d"]]), Re = ["width", "height"], ne = /* @__PURE__ */ T({
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
  emits: ["adsorptionLineChange", "positionLineChange"],
  setup(n, { expose: h, emit: t }) {
    const o = n, { opt: e, transformInfo: c, containerInfo: l } = J(o), f = R(() => {
      const { isY: v, containerInfo: O, opt: w } = o;
      return {
        width: v ? w.rulerConfig.yRulerWidth : O.width,
        height: v ? O.height : w.rulerConfig.xRulerHeight
      };
    }), s = R(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: o.opt.rulerConfig.zIndex + (o.isY ? 0 : 1)
    })), i = P();
    E(
      [() => o.containerInfo, () => o.transformInfo],
      () => {
        ye(o.opt, o.transformInfo, o.isY, i);
      },
      {
        deep: !0
      }
    );
    const p = t;
    function d(v) {
      p("adsorptionLineChange", v, !o.isY);
    }
    const { adsorptionList: y, modifyAdsorptionList: r } = be(
      e,
      !o.isY,
      d
    ), { positionLineMap: g } = xe(
      e,
      l,
      y,
      c,
      !o.isY,
      i,
      x
    );
    function x() {
      const v = g.filter((O) => !!O.show).map((O) => O.coordinate);
      p("positionLineChange", v, !o.isY);
    }
    function m(v) {
      delete g[v], x();
    }
    function a() {
      Object.keys(g).forEach((v) => {
        m(v);
      }), x();
    }
    function u(v = !0) {
      Object.keys(g).forEach((O) => {
        g[O].show = v;
      }), x();
    }
    const b = P(!0);
    function L(v = !0) {
      b.value = v, u(v);
    }
    return h({
      modifyAdsorptionList: r,
      removeAllPositionLine: a,
      togglePositionLine: u,
      toggleRuler: L
    }), (v, O) => (j(), X($, null, [
      ae(H("canvas", {
        ref_key: "rulerRef",
        ref: i,
        style: Y(s.value),
        width: f.value.width,
        height: f.value.height
      }, null, 12, Re), [
        [se, b.value]
      ]),
      o.opt.usePositionLine ? (j(), X("div", {
        key: 0,
        class: fe("position-line-" + (o.isY ? "x" : "y"))
      }, [
        (j(!0), X($, null, pe(Object.keys(_(g)), (w) => (j(), N(_e, {
          key: w,
          opt: o.opt,
          "is-y": !o.isY,
          "transform-info": o.transformInfo,
          "container-info": o.containerInfo,
          "line-info": _(g)[w],
          "adsorption-list": _(y),
          onRemovePositionLine: m,
          onPositionLineChange: x
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info", "adsorption-list"]))), 128))
      ], 2)) : D("", !0)
    ], 64));
  }
});
function Be(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var K, oe;
function je() {
  if (oe) return K;
  oe = 1;
  var n = function(u) {
    return h(u) && !t(u);
  };
  function h(a) {
    return !!a && typeof a == "object";
  }
  function t(a) {
    var u = Object.prototype.toString.call(a);
    return u === "[object RegExp]" || u === "[object Date]" || c(a);
  }
  var o = typeof Symbol == "function" && Symbol.for, e = o ? Symbol.for("react.element") : 60103;
  function c(a) {
    return a.$$typeof === e;
  }
  function l(a) {
    return Array.isArray(a) ? [] : {};
  }
  function f(a, u) {
    return u.clone !== !1 && u.isMergeableObject(a) ? x(l(a), a, u) : a;
  }
  function s(a, u, b) {
    return a.concat(u).map(function(L) {
      return f(L, b);
    });
  }
  function i(a, u) {
    if (!u.customMerge)
      return x;
    var b = u.customMerge(a);
    return typeof b == "function" ? b : x;
  }
  function p(a) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(a).filter(function(u) {
      return Object.propertyIsEnumerable.call(a, u);
    }) : [];
  }
  function d(a) {
    return Object.keys(a).concat(p(a));
  }
  function y(a, u) {
    try {
      return u in a;
    } catch {
      return !1;
    }
  }
  function r(a, u) {
    return y(a, u) && !(Object.hasOwnProperty.call(a, u) && Object.propertyIsEnumerable.call(a, u));
  }
  function g(a, u, b) {
    var L = {};
    return b.isMergeableObject(a) && d(a).forEach(function(v) {
      L[v] = f(a[v], b);
    }), d(u).forEach(function(v) {
      r(a, v) || (y(a, v) && b.isMergeableObject(u[v]) ? L[v] = i(v, b)(a[v], u[v], b) : L[v] = f(u[v], b));
    }), L;
  }
  function x(a, u, b) {
    b = b || {}, b.arrayMerge = b.arrayMerge || s, b.isMergeableObject = b.isMergeableObject || n, b.cloneUnlessOtherwiseSpecified = f;
    var L = Array.isArray(u), v = Array.isArray(a), O = L === v;
    return O ? L ? b.arrayMerge(a, u, b) : g(a, u, b) : f(u, b);
  }
  x.all = function(u, b) {
    if (!Array.isArray(u))
      throw new Error("first argument should be an array");
    return u.reduce(function(L, v) {
      return x(L, v, b);
    }, {});
  };
  var m = x;
  return K = m, K;
}
var Pe = je();
const re = /* @__PURE__ */ Be(Pe), U = {
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
    adsorptionYList: [],
    useRemove: !0,
    removeIcon: "",
    removeIconFillColor: "#525252"
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
}, Xe = function() {
  const n = {};
  for (const h in U) {
    const t = U[h];
    typeof t == "object" && t !== null ? n[h] = () => t : n[h] = t;
  }
  return n;
}(), Ye = (n, h) => {
  const t = I({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });
  function o(f, s) {
    new ResizeObserver((p) => {
      for (const d of p)
        if (d.target === s) {
          const y = s.offsetWidth, r = s.offsetHeight;
          (y !== t.originWidth || r !== t.originHeight) && e(f, s);
        }
    }).observe(s);
  }
  function e(f, s, i = !1) {
    const p = f.value;
    p.containerAutoSize ? (t.width = s.offsetWidth, t.height = s.offsetHeight, t.originWidth = t.width, t.originHeight = t.height, i && o(f, s)) : (t.width = p.containerWidth, t.height = p.containerHeight);
    const d = getComputedStyle(s);
    d.boxSizing === "border-box" && (t.width -= parseFloat(d.borderLeftWidth) + parseFloat(d.borderRightWidth), t.height -= parseFloat(d.borderTopWidth) + parseFloat(d.borderBottomWidth)), d.position === "static" && (t.position = "relative");
  }
  W(() => {
    const f = h.value;
    f && e(n, f, !0);
  });
  const c = R(() => ({
    width: t.width,
    height: t.height
  })), l = R(() => {
    const f = n.value, s = {
      overflow: "hidden"
    };
    return f.containerAutoSize || (s.width = t.width + "px", s.height = t.height + "px"), t.position && (s.position = t.position), s;
  });
  return {
    containerInfo: c,
    containerStyle: l
  };
}, Ee = (n, h, t, o) => {
  const e = I({});
  return E(
    () => h.value,
    () => {
      const c = n.value;
      let l = e.translateX || 0, f = e.translateY || 0, s = 0, i = 0, { scale: p } = c;
      const { autoCenter: d, autoScale: y } = c, { width: r, height: g } = h.value;
      if (y) {
        const a = (r - 160) / c.canvasWidth, u = (g - 2 * 80) / c.canvasHeight;
        p = Math.min(a, u);
      }
      e.scale = p;
      let x = 0, m = 0;
      s = c.canvasWidth * p, i = c.canvasHeight * p, d && (x = Math.floor((r - s) / 2), m = Math.floor((g - i) / 2), e.translateX = x, e.translateY = m), c.scale !== p && t(p), (l !== x || f || m) && o(x, m);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, Ie = (n, h, t) => ({ scrollBarInfo: R(() => {
  const e = n.value, { width: c, height: l } = h.value, { translateX: f, translateY: s, scale: i } = t, p = e.canvasWidth * i + 2 * e.containerXPadding, d = e.canvasHeight * i + 2 * e.containerYPadding, y = c < p, r = l < d, g = y || r, x = c * ((e.containerXPadding - f) / p), m = l * ((e.containerYPadding - s) / d), a = c / p * c, u = l / d * l;
  return {
    totalHeight: d,
    totalWidth: p,
    left: x,
    top: m,
    width: a,
    height: u,
    isYLarge: r,
    isXLarge: y,
    isLarge: g
  };
}) });
function le(n, h, t) {
  const o = n.value, { containerXPadding: e, containerYPadding: c, canvasWidth: l, canvasHeight: f } = o, s = l * t, i = f * t, { width: p, height: d } = h.value, y = Math.max((p - s) / 2, e), r = Math.max((d - i) / 2, c), g = s + 2 * e > p ? p - (s + e) : y, x = i + 2 * c > d ? d - (i + c) : r;
  return {
    maxTranslateX: y,
    maxTranslateY: r,
    minTranslateX: g,
    minTranslateY: x
  };
}
const Ae = (n, h, t) => ({ boundaryInfo: R(() => le(n, h, t.scale)) }), V = (n, h, t, o, e, c) => {
  const l = n.value;
  if (!l.canScale) return;
  let { translateX: f, translateY: s, scale: i } = t, p = f, d = s;
  o = Math.min(Math.max(o, l.minScale), l.maxScale);
  const y = o - i, r = le(
    n,
    h,
    o
  );
  f -= y * l.canvasWidth / 2, s -= y * l.canvasHeight / 2, f = Math.max(
    Math.min(f, r.maxTranslateX),
    r.minTranslateX
  ), s = Math.max(
    Math.min(s, r.maxTranslateY),
    r.minTranslateY
  ), t.scale = o, t.translateX = f, t.translateY = s, e(o), (p !== f || d !== s) && c(f, s);
}, Te = (n, h, t, o, e) => {
  n.value.proxyScaleKey && document.addEventListener("keydown", (c) => {
    if (n.value.canScale) {
      const l = c.keyCode;
      if ((c.metaKey || c.ctrlKey) && (l === 187 || l === 189)) {
        c.preventDefault();
        const f = t.scale + (l === 187 ? 0.05 : -0.05);
        V(n, h, t, f, o, e);
      }
    }
  });
}, We = (n, h, t, o, e, c, l, f, s) => {
  let i = null;
  Object.assign(l, {
    xOpacity: 0,
    yOpacity: 0,
    scrollBarMouseDown: !1,
    scrollBarEnter: !1
  }), W(() => {
    e.value && e.value.addEventListener("wheel", (p) => {
      if (n.value.canScale)
        if (p.metaKey || p.ctrlKey) {
          p.preventDefault();
          const d = -1 * p.deltaY / 100, y = t.scale + d;
          V(n, h, t, y, f, s);
        } else {
          if (!c.value.isLarge || l.scrollBarMouseDown)
            return;
          p.preventDefault();
          let { translateX: d, translateY: y } = t;
          i && clearTimeout(i);
          const r = -p.deltaX, g = -p.deltaY;
          let x = "";
          const { opacity: m = 0.4 } = n.value.scrollBarConfig, { isXLarge: a, isYLarge: u } = c.value, { maxTranslateX: b, minTranslateX: L, maxTranslateY: v, minTranslateY: O } = o.value;
          a && Math.abs(r) > Math.abs(g) && (d += r, d = Math.max(
            Math.min(d, b),
            L
          ), l.xOpacity = m, l.yOpacity = 0, t.translateX = d, x = "x"), u && Math.abs(g) > Math.abs(r) && (x = "y", y += g, y = Math.max(
            Math.min(y, v),
            O
          ), l.yOpacity = m, l.xOpacity = 0, t.translateY = y), x && (s(
            t.translateX,
            t.translateY
          ), i = setTimeout(() => {
            l.scrollBarEnter || (l[x === "y" ? "yOpacity" : "xOpacity"] = 0);
          }, 1e3));
        }
    });
  });
}, ke = /* @__PURE__ */ T({
  __name: "index",
  props: /* @__PURE__ */ de({
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
    rulerConfig: {}
  }, Xe),
  emits: [
    "update:scale",
    "onScale",
    "onMove",
    "adsorptionLineChange",
    "positionLineChange"
  ],
  setup(n, { expose: h, emit: t }) {
    const o = n, e = P(
      re(U, o, { arrayMerge: ee })
    ), c = t, l = P(null), { containerInfo: f, containerStyle: s } = Ye(e, l), { transformInfo: i } = Ee(e, f, r, g), { boundaryInfo: p } = Ae(e, f, i), { scrollBarInfo: d } = Ie(e, f, i), y = I({});
    E(
      () => i.scale,
      (C) => {
        if (C) {
          if (!y.scale) {
            const M = {
              scale: C,
              translateX: i.translateX,
              translateY: i.translateY
            };
            Object.assign(y, M);
          }
          c("update:scale", C);
        }
      }
    ), E(
      () => o,
      () => {
        e.value = re(e.value, o, {
          arrayMerge: ee
        });
      },
      {
        deep: !0
      }
    );
    function r(C) {
      c("onScale", C);
    }
    function g(C, M) {
      c("onMove", C, M);
    }
    function x(C) {
      V(e, f, i, C, r, g);
    }
    E(
      () => e.value.scale,
      (C) => {
        C !== i.scale && x(C);
      }
    ), Te(e, f, i, r, g);
    const m = I({});
    We(
      e,
      f,
      i,
      p,
      l,
      d,
      m,
      r,
      g
    );
    function a(C, M) {
      c("adsorptionLineChange", C, M);
    }
    function u(C, M) {
      c("positionLineChange", C, M);
    }
    function b() {
      Object.assign(i, y);
    }
    const L = P(null), v = P(null);
    function O() {
      e.value.useRuler && (L.value && L.value.removeAllPositionLine(), v.value && v.value.removeAllPositionLine());
    }
    function w(C = !0) {
      e.value.useRuler && (L.value && L.value.toggleRuler(C), v.value && v.value.toggleRuler(C));
    }
    function B(C = !0) {
      e.value.useRuler && (L.value && L.value.togglePositionLine(C), v.value && v.value.togglePositionLine(C));
    }
    function S(C, M = !0, A = !1) {
      e.value.useRuler && (A && L.value && L.value.modifyAdsorptionList(C, M), !A && v.value && v.value.modifyAdsorptionList(C, M));
    }
    return h({
      reset: b,
      changeScale: x,
      removeAllPositionLine: O,
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
      addAdsorptionLine(C, M = !1) {
        S(C, !0, M);
      },
      removeAdsorptionLine(C, M = !1) {
        S(C, !1, M);
      }
    }), (C, M) => (j(), X("div", {
      class: "scale-ruler",
      ref_key: "container",
      ref: l,
      style: Y(_(s))
    }, [
      e.value.useRuler ? (j(), X($, { key: 0 }, [
        k(ne, {
          ref_key: "xRuler",
          ref: L,
          opt: e.value,
          "container-info": _(f),
          "transform-info": _(i),
          onAdsorptionLineChange: a,
          onPositionLineChange: u
        }, null, 8, ["opt", "container-info", "transform-info"]),
        k(ne, {
          ref_key: "yRuler",
          ref: v,
          "is-y": "",
          opt: e.value,
          "container-info": _(f),
          "transform-info": _(i),
          onAdsorptionLineChange: a,
          onPositionLineChange: u
        }, null, 8, ["opt", "container-info", "transform-info"])
      ], 64)) : D("", !0),
      k(me, {
        "container-info": _(f),
        opt: e.value,
        "transform-info": _(i)
      }, {
        default: ve(() => [
          ie(C.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "transform-info"]),
      _(d).isXLarge ? (j(), N(te, {
        key: 1,
        opt: e.value,
        "container-info": _(f),
        "scroll-bar-info": _(d),
        "global-info": m,
        "transform-info": _(i),
        onOnMove: g
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : D("", !0),
      _(d).isYLarge ? (j(), N(te, {
        key: 2,
        opt: e.value,
        "container-info": _(f),
        "scroll-bar-info": _(d),
        "global-info": m,
        "transform-info": _(i),
        onOnMove: g,
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : D("", !0)
    ], 4));
  }
});
export {
  ke as default
};
