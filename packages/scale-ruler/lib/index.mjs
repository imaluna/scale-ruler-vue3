import { defineComponent as P, computed as M, openBlock as L, createElementBlock as j, normalizeStyle as Y, toRefs as K, ref as T, onMounted as W, nextTick as te, reactive as X, watch as I, createElementVNode as D, toDisplayString as ne, unref as w, Fragment as q, normalizeClass as oe, renderList as re, createBlock as $, createCommentVNode as A, mergeDefaults as ae, createVNode as H, withCtx as ie, renderSlot as se } from "vue";
const le = /* @__PURE__ */ P({
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
  setup(c) {
    const o = c, e = M(() => {
      var r, a;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((r = o.opt) == null ? void 0 : r.canvasWidth) + "px",
        height: ((a = o.opt) == null ? void 0 : a.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0",
        transform: `translate(${o.canvasInfo.translateX}px, ${o.canvasInfo.translateY}px) scale(${o.canvasInfo.scale})`,
        ...o.opt.canvasStyle
      };
    });
    return (r, a) => (L(), j("div", {
      ref: "canvasPanel",
      style: Y(e.value)
    }, null, 4));
  }
}), N = /* @__PURE__ */ P({
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
  setup(c) {
    const o = c, { globalInfo: e, transformInfo: r } = K(o), a = M(() => {
      const { opt: n, scrollBarInfo: t, isY: f } = o, { scrollBarConfig: s } = n, h = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: s.bgColor,
        opacity: o.globalInfo[f ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: s.zIndex,
        width: (f ? s.barSize : t.width) + "px",
        height: (f ? t.height : s.barSize) + "px"
      };
      return f ? (h.top = t.top + "px", h.right = 0) : (h.left = t.left + "px", h.bottom = 0), h;
    }), d = T(null), i = {};
    function l(n) {
      if (n.preventDefault(), !e.value.scrollBarMouseDown) return;
      let { translateX: t, translateY: f } = r.value;
      const s = o.scrollBarInfo, { width: h, height: u } = o.containerInfo;
      if (o.isY) {
        const m = n.pageY - i.startY;
        let y = i.top + m;
        y = Math.min(Math.max(0, y), u - s.height);
        const x = y * s.totalHeight / u;
        f = o.opt.containerYPadding - x, r.value.translateY = f;
      } else {
        const m = n.pageX - i.startX;
        let y = i.left + m;
        y = Math.min(Math.max(0, y), h - s.width);
        const x = y * s.totalWidth / h;
        t = o.opt.containerXPadding - x, r.value.translateX = t;
      }
    }
    return W(() => {
      if (d.value) {
        const n = d.value, t = o.isY ? "yOpacity" : "xOpacity";
        n.addEventListener("mouseenter", () => {
          e.value[t] = o.opt.scrollBarConfig.opacity, e.value[o.isY ? "xOpacity" : "yOpacity"] = 0, e.value.scrollBarEnter = !0;
        }), n.addEventListener("mouseleave", () => {
          e.value.scrollBarMouseDown || (e.value.scrollBarEnter = !1, e.value[t] = 0);
        }), n.addEventListener("mousedown", (f) => {
          f.preventDefault(), e.value.scrollBarMouseDown = !0, i.startX = f.pageX, i.startY = f.pageY, i.left = o.scrollBarInfo.left, i.top = o.scrollBarInfo.top, document.addEventListener("mousemove", l);
        }), document.addEventListener("mouseup", () => {
          e.value.scrollBarMouseDown && (e.value.scrollBarMouseDown = !1, document.removeEventListener("mousemove", l));
        });
      }
    }), (n, t) => (L(), j("div", {
      ref_key: "scrollBarRef",
      ref: d,
      style: Y(a.value)
    }, null, 4));
  }
}), ce = (c) => c <= 0.25 ? 40 : c <= 0.5 ? 20 : c <= 1 ? 10 : c <= 2 ? 5 : c <= 4 ? 2 : 1, ue = (c) => {
  const o = c.getBoundingClientRect(), e = o.top + (document.body.scrollTop || document.documentElement.scrollTop), r = o.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top: e, left: r };
}, k = (c, o, e) => {
  const { scale: r, translateX: a, translateY: d } = c;
  return (o - (e ? d : a)) / r;
}, J = (c, o, e) => {
  const { scale: r, translateX: a, translateY: d } = c, i = o * r;
  return (e ? d : a) + i;
};
function Q(c, o, e, r, a, d) {
  const i = { coordinate: a, translate: r }, l = c.length;
  if (l > 0) {
    let n = 0;
    for (; n < l; ) {
      const t = c[n];
      if (Math.abs(a - t) <= e) {
        i.coordinate = t, i.translate = J(o, t, d);
        break;
      } else if (t > a)
        break;
      n++;
    }
  }
  return i;
}
const fe = (c, o, e, r) => {
  te(() => {
    const a = r.value;
    if (a) {
      const d = a.offsetWidth, i = a.offsetHeight, { rulerConfig: l } = c, { bgColor: n, fontFamily: t, fontSize: f, lineColor: s, fontColor: h } = l;
      if (d > 0 && i > 0) {
        const u = a.getContext("2d");
        u.clearRect(0, 0, d, i), n && (u.save(), u.fillStyle = n, u.fillRect(0, 0, d, i), u.restore());
        const m = e ? l.yRulerWidth : l.xRulerHeight, { translateX: y, translateY: x, scale: p } = o, g = e ? x : y, v = ce(p), S = v * p, b = window.devicePixelRatio, C = -g, E = Math.floor(C / S), R = Math.floor(
          ((e ? i : d) - g) / S
        );
        u.save(), u.fillStyle = s, u.font = `${f * b}px ${t}`, u.translate(0.5, 0.5), u.scale(1 / b, 1 / b), e ? u.fillRect((m - 1) * b, 0, 1, i * b) : u.fillRect(0, (m - 1) * b, d * b, 1);
        for (let O = E; O <= R; O++) {
          u.fillStyle = s;
          const _ = (g + O * S) * b;
          let B = m / 4;
          O % 10 === 0 ? B = m * 4 / 5 : O % 5 === 0 && (B = m / 3), e ? u.fillRect((m - B) * b, _, B * b, 1) : (u.fillRect(_, (m - B) * b, 1, B * b), O % 10 === 0 && (u.fillStyle = h, u.fillText(
            String(O * v),
            _ + 2 * b,
            (m + 8 - B) * b
          )));
        }
        if (u.restore(), e) {
          u.font = `${f}px ${t}`;
          let O = E;
          for (; O <= R; )
            if (O % 10)
              O++;
            else {
              u.save();
              const _ = g + O * S + m / 2;
              u.translate(_ + m / 5, _ - m * 6 / 5), u.rotate(Math.PI / 2), u.fillText(String(O * v), m * 4 / 5, _), O += 10, u.restore();
            }
        }
      }
    }
  });
}, de = (c, o) => {
  const e = X([0]);
  function r(t, f = !0) {
    const s = e.indexOf(t);
    f && s === -1 && e.push(t), !f && s > -1 && e.splice(s, 1);
  }
  function a(t, f = !0) {
    Array.isArray(t) ? t.forEach((s) => r(s, f)) : r(t, f);
  }
  function d(t) {
    a(t), e.sort((f, s) => f - s);
  }
  function i(t) {
    a(t, !1);
  }
  const l = M(
    () => c.positionLineConfig[o ? "adsorptionYList" : "adsorptionXList"]
  );
  I(
    () => l.value,
    (t) => {
      d(t);
    },
    {
      deep: !0
    }
  );
  const n = M(
    () => o ? c.canvasWidth : c.canvasHeight
  );
  return I(
    () => n.value,
    (t, f) => {
      f !== void 0 && i(f), d(t);
    },
    {
      immediate: !0
    }
  ), { adsorptionList: e };
}, pe = (c, o, e, r, a, d) => {
  let i = 1;
  const l = X([]);
  let n = -1, t = !1;
  function f(s) {
    if (t && n > -1) {
      s.preventDefault();
      const { xRulerHeight: h, yRulerWidth: u } = c.value.rulerConfig, m = l[n], y = (a ? s.pageY : s.pageX) - m.start, x = m.startTranslate + y, p = x > (a ? h : u), g = k(
        r.value,
        x,
        a
      ), v = Q(
        e,
        r.value,
        c.value.positionLineConfig.adsorptionGap,
        x,
        g,
        a
      );
      l[n].showTip = p, l[n].translate = v.translate, l[n].coordinate = v.coordinate;
    }
  }
  return W(() => {
    if (d.value) {
      const s = d.value;
      s.addEventListener("mousedown", (h) => {
        const u = ue(s), m = a ? h.pageY : h.pageX, y = m - (a ? u.top : u.left), x = {
          startTranslate: y,
          translate: y,
          start: m,
          id: i,
          coordinate: k(
            r.value,
            y,
            a
          ),
          showTip: !1,
          needAnimate: !1
        };
        n = i, l[i++] = x, t = !0, document.addEventListener("mousemove", f);
      }), document.addEventListener("mouseup", () => {
        if (document.removeEventListener("mousemove", f), !t || n < 0) return;
        t = !1;
        const h = l[n], { width: u, height: m } = o.value, { xRulerHeight: y, yRulerWidth: x } = c.value.rulerConfig;
        h.translate <= (a ? y : x) || h.translate >= (a ? m : u) ? delete l[n] : (l[n].showTip = !1, l[n].needAnimate = !0), n = -1;
      });
    }
  }), { positionLineMap: l };
}, ve = (c, o, e, r, a, d, i, l) => {
  let n = !1;
  function t(s) {
    i.value.showTip = s;
  }
  function f(s) {
    if (!n) return;
    const h = (a ? s.pageY : s.pageX) - i.value.start, u = i.value.startTranslate + h, m = k(
      r.value,
      u,
      a
    ), y = Q(
      e.value,
      r.value,
      c.value.positionLineConfig.adsorptionGap,
      u,
      m,
      a
    );
    i.value.coordinate = y.coordinate;
  }
  W(() => {
    if (d.value) {
      const s = d.value;
      s.addEventListener("mouseenter", () => {
        t(!0);
      }), s.addEventListener("mouseleave", () => {
        n || t(!1);
      }), s.addEventListener("mousedown", (h) => {
        h.preventDefault(), n = !0, i.value.showTip = !0;
        const u = a ? h.pageY : h.pageX;
        i.value.start = u, i.value.startTranslate = i.value.translate, i.value.needAnimate = !1, document.addEventListener("mousemove", f);
      }), document.addEventListener("mouseup", () => {
        if (!n) return;
        const { translate: h, id: u } = i.value, { width: m, height: y } = o.value, { xRulerHeight: x, yRulerWidth: p } = c.value.rulerConfig;
        h <= (a ? x : p) || h >= (a ? y : m) ? l(u) : (t(!1), i.value.needAnimate = !0), document.removeEventListener("mousemove", f);
      });
    }
  });
}, he = /* @__PURE__ */ P({
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
  setup(c, { emit: o }) {
    const e = c, { lineInfo: r, adsorptionList: a, transformInfo: d, opt: i, containerInfo: l } = K(e), n = M(() => i.value.positionLineConfig.padding), t = M(() => 2 * n.value + 1), f = M(
      () => J(
        d.value,
        r.value.coordinate,
        e.isY
      )
    ), s = M(() => {
      const { width: v, height: S } = l.value, { isY: b } = e, C = b ? `translate(0, ${f.value}px)` : `translate(${f.value}px, 0)`;
      return {
        position: "absolute",
        width: (b ? v : t.value) + "px",
        height: (b ? t.value : S) + "px",
        cursor: b ? "row-resize" : "col-resize",
        top: (b ? -n.value : 0) + "px",
        left: (b ? 0 : -n.value) + "px",
        transform: C,
        zIndex: e.opt.positionLineConfig.zIndex,
        transition: r.value.needAnimate ? "transform 300ms" : ""
      };
    }), h = M(() => {
      const { isY: v } = e;
      return {
        position: "absolute",
        width: v ? "100%" : "1px",
        height: v ? "1px" : "100%",
        backgroundColor: i.value.positionLineConfig.lineColor,
        top: (v ? n.value : 0) + "px",
        left: (v ? 0 : n.value) + "px"
      };
    }), u = T({}), m = M(() => {
      const { isY: v } = e, { width: S, height: b } = l.value, { tipWidth: C, tipHeight: E } = u.value;
      let R, O;
      return C && E ? (O = v ? "50%" : (f.value + t.value + C >= S ? -C : t.value) + "px", R = v ? (f.value + t.value + E >= b ? -E : t.value) + "px" : "50%") : (O = v ? "50%" : t.value + "px", R = v ? t.value + "px" : "50%"), {
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
        top: R,
        transform: v ? "translate(-50%, 0)" : "translate(0, -50%)",
        visibility: r.value.showTip ? "visible" : "hidden"
      };
    }), y = T(null), x = o;
    function p(v) {
      x("remove-position-line", v);
    }
    ve(
      i,
      l,
      a,
      d,
      e.isY,
      y,
      r,
      p
    );
    const g = T(null);
    return W(() => {
      if (g.value) {
        const v = g.value, S = v.offsetWidth, b = v.offsetHeight;
        u.value.tipWidth = S, u.value.tipHeight = b;
      }
    }), (v, S) => (L(), j("div", {
      ref_key: "positionLineRef",
      ref: y,
      class: "scale-ruler_position-line",
      style: Y(s.value)
    }, [
      D("div", {
        class: "scale-ruler_position-line_inner",
        style: Y(h.value)
      }, null, 4),
      D("div", {
        class: "scale-ruler_position-line_tip",
        style: Y(m.value),
        ref_key: "tipRef",
        ref: g
      }, ne((c.isY ? "Y" : "X") + ": " + +w(r).coordinate.toFixed(2) + " px"), 5)
    ], 4));
  }
}), ge = ["width", "height"], G = /* @__PURE__ */ P({
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
    },
    transformInfo: {
      type: Object,
      required: !0
    }
  },
  setup(c) {
    const o = c, { opt: e, transformInfo: r, containerInfo: a } = K(o), d = M(() => {
      const { isY: s, containerInfo: h, opt: u } = o;
      return {
        width: s ? u.rulerConfig.yRulerWidth : h.width,
        height: s ? h.height : u.rulerConfig.xRulerHeight
      };
    }), i = M(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: o.opt.rulerConfig.zIndex + (o.isY ? 0 : 1)
    })), l = T();
    I(
      [() => o.containerInfo, () => o.canvasInfo],
      () => {
        fe(o.opt, o.canvasInfo, o.isY, l);
      },
      {
        deep: !0
      }
    );
    const { adsorptionList: n } = de(o.opt, o.isY), { positionLineMap: t } = pe(
      e,
      a,
      n,
      r,
      !o.isY,
      l
    );
    function f(s) {
      delete t[s];
    }
    return (s, h) => (L(), j(q, null, [
      D("canvas", {
        ref_key: "rulerRef",
        ref: l,
        style: Y(i.value),
        width: d.value.width,
        height: d.value.height
      }, null, 12, ge),
      o.opt.usePositionLine ? (L(), j("div", {
        key: 0,
        class: oe("position-line-" + (o.isY ? "x" : "y"))
      }, [
        (L(!0), j(q, null, re(Object.keys(w(t)), (u) => (L(), $(he, {
          key: u,
          opt: o.opt,
          "is-y": !o.isY,
          "transform-info": o.transformInfo,
          "container-info": o.containerInfo,
          "line-info": w(t)[u],
          "adsorption-list": w(n),
          onRemovePositionLine: f
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info", "adsorption-list"]))), 128))
      ], 2)) : A("", !0)
    ], 64));
  }
});
function me(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var z, U;
function ye() {
  if (U) return z;
  U = 1;
  var c = function(g) {
    return o(g) && !e(g);
  };
  function o(p) {
    return !!p && typeof p == "object";
  }
  function e(p) {
    var g = Object.prototype.toString.call(p);
    return g === "[object RegExp]" || g === "[object Date]" || d(p);
  }
  var r = typeof Symbol == "function" && Symbol.for, a = r ? Symbol.for("react.element") : 60103;
  function d(p) {
    return p.$$typeof === a;
  }
  function i(p) {
    return Array.isArray(p) ? [] : {};
  }
  function l(p, g) {
    return g.clone !== !1 && g.isMergeableObject(p) ? y(i(p), p, g) : p;
  }
  function n(p, g, v) {
    return p.concat(g).map(function(S) {
      return l(S, v);
    });
  }
  function t(p, g) {
    if (!g.customMerge)
      return y;
    var v = g.customMerge(p);
    return typeof v == "function" ? v : y;
  }
  function f(p) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(p).filter(function(g) {
      return Object.propertyIsEnumerable.call(p, g);
    }) : [];
  }
  function s(p) {
    return Object.keys(p).concat(f(p));
  }
  function h(p, g) {
    try {
      return g in p;
    } catch {
      return !1;
    }
  }
  function u(p, g) {
    return h(p, g) && !(Object.hasOwnProperty.call(p, g) && Object.propertyIsEnumerable.call(p, g));
  }
  function m(p, g, v) {
    var S = {};
    return v.isMergeableObject(p) && s(p).forEach(function(b) {
      S[b] = l(p[b], v);
    }), s(g).forEach(function(b) {
      u(p, b) || (h(p, b) && v.isMergeableObject(g[b]) ? S[b] = t(b, v)(p[b], g[b], v) : S[b] = l(g[b], v));
    }), S;
  }
  function y(p, g, v) {
    v = v || {}, v.arrayMerge = v.arrayMerge || n, v.isMergeableObject = v.isMergeableObject || c, v.cloneUnlessOtherwiseSpecified = l;
    var S = Array.isArray(g), b = Array.isArray(p), C = S === b;
    return C ? S ? v.arrayMerge(p, g, v) : m(p, g, v) : l(g, v);
  }
  y.all = function(g, v) {
    if (!Array.isArray(g))
      throw new Error("first argument should be an array");
    return g.reduce(function(S, b) {
      return y(S, b, v);
    }, {});
  };
  var x = y;
  return z = x, z;
}
var be = ye();
const V = /* @__PURE__ */ me(be), F = {
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
    zIndex: 400
  },
  // 画布缩放回调
  onScale: () => {
  },
  // 画布移动回调
  onMove: () => {
  }
}, xe = function() {
  const c = {};
  for (const o in F) {
    const e = F[o];
    typeof e == "object" && e !== null ? c[o] = () => e : c[o] = e;
  }
  return c;
}(), Se = (c, o) => {
  const e = X({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });
  function r(l, n) {
    new ResizeObserver((f) => {
      for (const s of f)
        if (s.target === n) {
          const h = n.offsetWidth, u = n.offsetHeight;
          (h !== e.originWidth || u !== e.originHeight) && a(l, n);
        }
    }).observe(n);
  }
  function a(l, n, t = !1) {
    const f = l.value;
    f.containerAutoSize ? (e.width = n.offsetWidth, e.height = n.offsetHeight, e.originWidth = e.width, e.originHeight = e.height, t && r(l, n)) : (e.width = f.containerWidth, e.height = f.containerHeight);
    const s = getComputedStyle(n);
    s.boxSizing === "border-box" && (e.width -= parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth), e.height -= parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth)), s.position === "static" && (e.position = "relative");
  }
  W(() => {
    const l = o.value;
    l && a(c, l, !0);
  });
  const d = M(() => ({
    width: e.width,
    height: e.height
  })), i = M(() => {
    const l = c.value, n = {
      overflow: "hidden"
    };
    return l.containerAutoSize || (n.width = e.width + "px", n.height = e.height + "px"), e.position && (n.position = e.position), n;
  });
  return {
    containerInfo: d,
    containerStyle: i
  };
}, we = (c, o) => {
  const e = X({});
  return I(
    () => o.value,
    () => {
      const r = c.value;
      let a = 0, d = 0, { scale: i } = r;
      const { autoCenter: l, autoScale: n } = r, { width: t, height: f } = o.value;
      if (n) {
        const u = (t - 2 * r.containerXPadding) / r.canvasWidth, m = (f - 2 * r.containerYPadding) / r.canvasHeight;
        i = Math.min(u, m);
      }
      e.scale = i;
      let s = 0, h = 0;
      a = r.canvasWidth * i, d = r.canvasHeight * i, l && (s = Math.floor((t - a) / 2), h = Math.floor((f - d) / 2), e.translateX = s, e.translateY = h);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, Oe = (c, o, e) => ({ scrollBarInfo: M(() => {
  const a = c.value, { width: d, height: i } = o.value, { translateX: l, translateY: n, scale: t } = e, f = a.canvasWidth * t + 2 * a.containerXPadding, s = a.canvasHeight * t + 2 * a.containerYPadding, h = d < f, u = i < s, m = h || u, y = d * ((a.containerXPadding - l) / f), x = i * ((a.containerYPadding - n) / s), p = d / f * d, g = i / s * i;
  return {
    totalHeight: s,
    totalWidth: f,
    left: y,
    top: x,
    width: p,
    height: g,
    isYLarge: u,
    isXLarge: h,
    isLarge: m
  };
}) });
function Z(c, o, e) {
  const r = c.value, { containerXPadding: a, containerYPadding: d, canvasWidth: i, canvasHeight: l } = r, n = i * e, t = l * e, { width: f, height: s } = o.value, h = Math.max((f - n) / 2, a), u = Math.max((s - t) / 2, d), m = n + 2 * a > f ? f - (n + a) : h, y = t + 2 * d > s ? s - (t + d) : u;
  return {
    maxTranslateX: h,
    maxTranslateY: u,
    minTranslateX: m,
    minTranslateY: y
  };
}
const Me = (c, o, e) => ({ boundaryInfo: M(() => Z(c, o, e.scale)) }), ee = (c, o, e, r) => {
  const a = c.value;
  let { translateX: d, translateY: i, scale: l } = e;
  r = Math.min(Math.max(r, a.minScale), a.maxScale);
  const n = r - l, t = Z(
    c,
    o,
    r
  );
  d -= n * a.canvasWidth / 2, i -= n * a.canvasHeight / 2, d = Math.max(
    Math.min(d, t.maxTranslateX),
    t.minTranslateX
  ), i = Math.max(
    Math.min(i, t.maxTranslateY),
    t.minTranslateY
  ), e.scale = r, e.translateX = d, e.translateY = i;
}, Le = (c, o, e) => {
  c.value.proxyScaleKey && document.addEventListener("keydown", (r) => {
    if (c.value.canScale) {
      const a = r.keyCode;
      if ((r.metaKey || r.ctrlKey) && (a === 187 || a === 189)) {
        r.preventDefault();
        const d = e.scale + (a === 187 ? 0.05 : -0.05);
        ee(c, o, e, d);
      }
    }
  });
}, Ce = (c, o, e, r, a, d, i) => {
  let l = null;
  Object.assign(i, {
    xOpacity: 0,
    yOpacity: 0,
    scrollBarMouseDown: !1,
    scrollBarEnter: !1
  }), W(() => {
    a.value && a.value.addEventListener("wheel", (n) => {
      if (c.value.canScale)
        if (n.metaKey || n.ctrlKey) {
          n.preventDefault();
          const t = -1 * n.deltaY / 100, f = e.scale + t;
          ee(c, o, e, f);
        } else {
          if (!d.value.isLarge || i.scrollBarMouseDown)
            return;
          n.preventDefault();
          let { translateX: t, translateY: f } = e;
          l && clearTimeout(l);
          const s = -n.deltaX, h = -n.deltaY;
          let u = "";
          const { opacity: m = 0.4 } = c.value.scrollBarConfig, { isXLarge: y, isYLarge: x } = d.value, { maxTranslateX: p, minTranslateX: g, maxTranslateY: v, minTranslateY: S } = r.value;
          y && Math.abs(s) > Math.abs(h) && (t += s, t = Math.max(
            Math.min(t, p),
            g
          ), i.xOpacity = m, i.yOpacity = 0, e.translateX = t, u = "x"), x && Math.abs(h) > Math.abs(s) && (u = "y", f += h, f = Math.max(
            Math.min(f, v),
            S
          ), i.yOpacity = m, i.xOpacity = 0, e.translateY = f), u && (l = setTimeout(() => {
            i.scrollBarEnter || (i[u === "y" ? "yOpacity" : "xOpacity"] = 0);
          }, 1e3));
        }
    });
  });
}, je = /* @__PURE__ */ P({
  __name: "ScaleRuler",
  props: /* @__PURE__ */ ae({
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
  }, xe),
  setup(c, { expose: o }) {
    const e = c, r = T(
      V(F, e)
    ), a = T(null), { containerInfo: d, containerStyle: i } = Se(r, a), { transformInfo: l } = we(r, d), { boundaryInfo: n } = Me(r, d, l), t = M(
      () => Object.assign({}, l, n.value)
    ), { scrollBarInfo: f } = Oe(r, d, l), s = X({}), h = I(
      () => l.scale,
      (y) => {
        if (console.log(y, "--newVal-"), y) {
          const x = {
            scale: y,
            translateX: l.translateX,
            translateY: l.translateY
          };
          s.scale || Object.assign(s, x), h();
        }
      }
    );
    I(
      () => e,
      () => {
        r.value = V(r.value, e);
      },
      {
        deep: !0
      }
    ), Le(r, d, l);
    const u = X({});
    Ce(
      r,
      d,
      l,
      n,
      a,
      f,
      u
    );
    function m() {
      Object.assign(l, s);
    }
    return o({ reset: m }), (y, x) => (L(), j("div", {
      ref_key: "container",
      ref: a,
      style: Y(w(i))
    }, [
      r.value.useRuler ? (L(), j(q, { key: 0 }, [
        H(G, {
          opt: r.value,
          "container-info": w(d),
          "canvas-info": t.value,
          "transform-info": w(l)
        }, null, 8, ["opt", "container-info", "canvas-info", "transform-info"]),
        H(G, {
          "is-y": "",
          opt: r.value,
          "container-info": w(d),
          "canvas-info": t.value,
          "transform-info": w(l)
        }, null, 8, ["opt", "container-info", "canvas-info", "transform-info"])
      ], 64)) : A("", !0),
      H(le, {
        "container-info": w(d),
        opt: r.value,
        "canvas-info": t.value,
        "transform-info": w(l)
      }, {
        default: ie(() => [
          se(y.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "canvas-info", "transform-info"]),
      w(f).isXLarge ? (L(), $(N, {
        key: 1,
        opt: r.value,
        "container-info": w(d),
        "scroll-bar-info": w(f),
        "global-info": u,
        "transform-info": w(l)
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : A("", !0),
      w(f).isYLarge ? (L(), $(N, {
        key: 2,
        opt: r.value,
        "container-info": w(d),
        "scroll-bar-info": w(f),
        "global-info": u,
        "transform-info": w(l),
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "global-info", "transform-info"])) : A("", !0)
    ], 4));
  }
});
export {
  je as default
};
