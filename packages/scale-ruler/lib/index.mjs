import { defineComponent as A, computed as M, openBlock as L, createElementBlock as Y, normalizeStyle as E, toRefs as K, ref as R, onMounted as B, nextTick as te, reactive as W, watch as I, createElementVNode as q, toDisplayString as ne, unref as S, Fragment as D, normalizeClass as oe, renderList as ae, createBlock as $, createCommentVNode as H, mergeDefaults as re, createVNode as P, withCtx as ie, renderSlot as se } from "vue";
const le = /* @__PURE__ */ A({
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
  setup(l) {
    const o = l, e = M(() => {
      var c, a;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((c = o.opt) == null ? void 0 : c.canvasWidth) + "px",
        height: ((a = o.opt) == null ? void 0 : a.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0",
        transform: `translate(${o.canvasInfo.translateX}px, ${o.canvasInfo.translateY}px) scale(${o.canvasInfo.scale})`,
        ...o.opt.canvasStyle
      };
    });
    return (c, a) => (L(), Y("div", {
      ref: "canvasPanel",
      style: E(e.value)
    }, null, 4));
  }
}), N = /* @__PURE__ */ A({
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
    scrollBarOpacity: {
      type: Object,
      required: !0
    },
    transformInfo: {
      type: Object,
      required: !0
    }
  },
  setup(l) {
    const o = l, { scrollBarOpacity: e, transformInfo: c } = K(o), a = M(() => {
      const { opt: n, scrollBarInfo: t, isY: f } = o, { scrollBarConfig: s } = n, v = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: s.bgColor,
        opacity: o.scrollBarOpacity[f ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: s.zIndex,
        width: (f ? s.barSize : t.width) + "px",
        height: (f ? t.height : s.barSize) + "px"
      };
      return f ? (v.top = t.top + "px", v.right = 0) : (v.left = t.left + "px", v.bottom = 0), v;
    }), d = R(null), r = {};
    function u(n) {
      if (n.preventDefault(), !e.value.isMouseDown) return;
      let { translateX: t, translateY: f } = c.value;
      const s = o.scrollBarInfo, { width: v, height: i } = o.containerInfo;
      if (o.isY) {
        const m = n.pageY - r.startY;
        let b = r.top + m;
        b = Math.min(Math.max(0, b), i - s.height);
        const O = b * s.totalHeight / i;
        f = o.opt.containerYPadding - O, c.value.translateY = f;
      } else {
        const m = n.pageX - r.startX;
        let b = r.left + m;
        b = Math.min(Math.max(0, b), v - s.width);
        const O = b * s.totalWidth / v;
        t = o.opt.containerXPadding - O, c.value.translateX = t;
      }
    }
    return B(() => {
      if (d.value) {
        const n = d.value, t = o.isY ? "yOpacity" : "xOpacity";
        n.addEventListener("mouseenter", () => {
          e.value[t] = o.opt.scrollBarConfig.opacity, e.value[o.isY ? "xOpacity" : "yOpacity"] = 0, e.value.isMouseEnter = !0;
        }), n.addEventListener("mouseleave", () => {
          e.value.isMouseEnter = !1, e.value[t] = 0;
        }), n.addEventListener("mousedown", (f) => {
          e.value.isMouseDown = !0, r.startX = f.pageX, r.startY = f.pageY, r.left = o.scrollBarInfo.left, r.top = o.scrollBarInfo.top, document.addEventListener("mousemove", u);
        }), document.addEventListener("mouseup", () => {
          e.value.isMouseDown && (e.value.isMouseDown = !1, document.removeEventListener("mousemove", u));
        });
      }
    }), (n, t) => (L(), Y("div", {
      ref_key: "scrollBarRef",
      ref: d,
      style: E(a.value)
    }, null, 4));
  }
}), ce = (l) => l <= 0.25 ? 40 : l <= 0.5 ? 20 : l <= 1 ? 10 : l <= 2 ? 5 : l <= 4 ? 2 : 1, ue = (l) => {
  const o = l.getBoundingClientRect(), e = o.top + (document.body.scrollTop || document.documentElement.scrollTop), c = o.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top: e, left: c };
}, k = (l, o, e) => {
  const { scale: c, translateX: a, translateY: d } = l;
  return (o - (e ? d : a)) / c;
}, J = (l, o, e) => {
  const { scale: c, translateX: a, translateY: d } = l, r = o * c;
  return (e ? d : a) + r;
};
function Q(l, o, e, c, a, d) {
  const r = { coordinate: a, translate: c }, u = l.length;
  if (u > 0) {
    let n = 0;
    for (; n < u; ) {
      const t = l[n];
      if (Math.abs(a - t) <= e) {
        r.coordinate = t, r.translate = J(o, t, d);
        break;
      } else if (t > a)
        break;
      n++;
    }
  }
  return r;
}
const fe = (l, o, e, c) => {
  te(() => {
    const a = c.value;
    if (a) {
      const d = a.offsetWidth, r = a.offsetHeight, { rulerConfig: u } = l, { bgColor: n, fontFamily: t, fontSize: f, lineColor: s, fontColor: v } = u;
      if (d > 0 && r > 0) {
        const i = a.getContext("2d");
        i.clearRect(0, 0, d, r), n && (i.save(), i.fillStyle = n, i.fillRect(0, 0, d, r), i.restore());
        const m = e ? u.yRulerWidth : u.xRulerHeight, { translateX: b, translateY: O, scale: p } = o, g = e ? O : b, h = ce(p), x = h * p, y = window.devicePixelRatio, C = -g, T = Math.floor(C / x), X = Math.floor(
          ((e ? r : d) - g) / x
        );
        i.save(), i.fillStyle = s, i.font = `${f * y}px ${t}`, i.translate(0.5, 0.5), i.scale(1 / y, 1 / y), e ? i.fillRect((m - 1) * y, 0, 1, r * y) : i.fillRect(0, (m - 1) * y, d * y, 1);
        for (let w = T; w <= X; w++) {
          i.fillStyle = s;
          const _ = (g + w * x) * y;
          let j = m / 4;
          w % 10 === 0 ? j = m * 4 / 5 : w % 5 === 0 && (j = m / 3), e ? i.fillRect((m - j) * y, _, j * y, 1) : (i.fillRect(_, (m - j) * y, 1, j * y), w % 10 === 0 && (i.fillStyle = v, i.fillText(
            String(w * h),
            _ + 2 * y,
            (m + 8 - j) * y
          )));
        }
        if (i.restore(), e) {
          i.font = `${f}px ${t}`;
          let w = T;
          for (; w <= X; )
            if (w % 10)
              w++;
            else {
              i.save();
              const _ = g + w * x + m / 2;
              i.translate(_ + m / 5, _ - m * 6 / 5), i.rotate(Math.PI / 2), i.fillText(String(w * h), m * 4 / 5, _), w += 10, i.restore();
            }
        }
      }
    }
  });
}, de = (l, o) => {
  const e = W([0]);
  function c(t, f = !0) {
    const s = e.indexOf(t);
    f && s === -1 && e.push(t), !f && s > -1 && e.splice(s, 1);
  }
  function a(t, f = !0) {
    Array.isArray(t) ? t.forEach((s) => c(s, f)) : c(t, f);
  }
  function d(t) {
    a(t), e.sort((f, s) => f - s);
  }
  function r(t) {
    a(t, !1);
  }
  const u = M(
    () => l.positionLineConfig[o ? "adsorptionYList" : "adsorptionXList"]
  );
  I(
    () => u.value,
    (t) => {
      d(t);
    },
    {
      deep: !0
    }
  );
  const n = M(
    () => o ? l.canvasWidth : l.canvasHeight
  );
  return I(
    () => n.value,
    (t, f) => {
      f !== void 0 && r(f), d(t);
    },
    {
      immediate: !0
    }
  ), { adsorptionList: e };
}, pe = (l, o, e, c, a, d) => {
  let r = 1;
  const u = W([]);
  let n = -1, t = !1;
  function f(s) {
    if (t && n > -1) {
      s.preventDefault();
      const { xRulerHeight: v, yRulerWidth: i } = l.value.rulerConfig, m = u[n], b = (a ? s.pageY : s.pageX) - m.start, O = m.startTranslate + b, p = O > (a ? v : i), g = k(
        c.value,
        O,
        a
      ), h = Q(
        e,
        c.value,
        l.value.positionLineConfig.adsorptionGap,
        O,
        g,
        a
      );
      u[n].showTip = p, u[n].translate = h.translate, u[n].coordinate = h.coordinate;
    }
  }
  return B(() => {
    if (d.value) {
      const s = d.value;
      s.addEventListener("mousedown", (v) => {
        const i = ue(s), m = a ? v.pageY : v.pageX, b = m - (a ? i.top : i.left), O = {
          startTranslate: b,
          translate: b,
          start: m,
          id: r,
          coordinate: k(
            c.value,
            b,
            a
          ),
          showTip: !1,
          needAnimate: !1
        };
        n = r, u[r++] = O, t = !0, document.addEventListener("mousemove", f);
      }), document.addEventListener("mouseup", () => {
        if (document.removeEventListener("mousemove", f), !t || n < 0) return;
        t = !1;
        const v = u[n], { width: i, height: m } = o.value, { xRulerHeight: b, yRulerWidth: O } = l.value.rulerConfig;
        v.translate <= (a ? b : O) || v.translate >= (a ? m : i) ? delete u[n] : (u[n].showTip = !1, u[n].needAnimate = !0), n = -1;
      });
    }
  }), { positionLineMap: u };
}, ve = (l, o, e, c, a, d, r, u) => {
  let n = !1;
  function t(s) {
    r.value.showTip = s;
  }
  function f(s) {
    if (!n) return;
    const v = (a ? s.pageY : s.pageX) - r.value.start, i = r.value.startTranslate + v, m = k(
      c.value,
      i,
      a
    ), b = Q(
      e.value,
      c.value,
      l.value.positionLineConfig.adsorptionGap,
      i,
      m,
      a
    );
    r.value.coordinate = b.coordinate;
  }
  B(() => {
    if (d.value) {
      const s = d.value;
      s.addEventListener("mouseenter", () => {
        t(!0);
      }), s.addEventListener("mouseleave", () => {
        n || t(!1);
      }), s.addEventListener("mousedown", (v) => {
        v.preventDefault(), n = !0, r.value.showTip = !0;
        const i = a ? v.pageY : v.pageX;
        r.value.start = i, r.value.startTranslate = r.value.translate, r.value.needAnimate = !1, document.addEventListener("mousemove", f);
      }), document.addEventListener("mouseup", () => {
        if (!n) return;
        const { translate: v, id: i } = r.value, { width: m, height: b } = o.value, { xRulerHeight: O, yRulerWidth: p } = l.value.rulerConfig;
        v <= (a ? O : p) || v >= (a ? b : m) ? u(i) : (t(!1), r.value.needAnimate = !0), document.removeEventListener("mousemove", f);
      });
    }
  });
}, he = /* @__PURE__ */ A({
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
  setup(l, { emit: o }) {
    const e = l, { lineInfo: c, adsorptionList: a, transformInfo: d, opt: r, containerInfo: u } = K(e), n = M(() => r.value.positionLineConfig.padding), t = M(() => 2 * n.value + 1), f = M(
      () => J(
        d.value,
        c.value.coordinate,
        e.isY
      )
    ), s = M(() => {
      const { width: h, height: x } = u.value, { isY: y } = e, C = y ? `translate(0, ${f.value}px)` : `translate(${f.value}px, 0)`;
      return {
        position: "absolute",
        width: (y ? h : t.value) + "px",
        height: (y ? t.value : x) + "px",
        cursor: y ? "row-resize" : "col-resize",
        top: (y ? -n.value : 0) + "px",
        left: (y ? 0 : -n.value) + "px",
        transform: C,
        zIndex: e.opt.positionLineConfig.zIndex,
        transition: c.value.needAnimate ? "transform 300ms" : ""
      };
    }), v = M(() => {
      const { isY: h } = e;
      return {
        position: "absolute",
        width: h ? "100%" : "1px",
        height: h ? "1px" : "100%",
        backgroundColor: r.value.positionLineConfig.lineColor,
        top: (h ? n.value : 0) + "px",
        left: (h ? 0 : n.value) + "px"
      };
    }), i = R({}), m = M(() => {
      const { isY: h } = e, { width: x, height: y } = u.value, { tipWidth: C, tipHeight: T } = i.value;
      let X, w;
      return C && T ? (w = h ? "50%" : (f.value + t.value + C >= x ? -C : t.value) + "px", X = h ? (f.value + t.value + T >= y ? -T : t.value) + "px" : "50%") : (w = h ? "50%" : t.value + "px", X = h ? t.value + "px" : "50%"), {
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
        left: w,
        top: X,
        transform: h ? "translate(-50%, 0)" : "translate(0, -50%)",
        visibility: c.value.showTip ? "visible" : "hidden"
      };
    }), b = R(null), O = o;
    function p(h) {
      O("remove-position-line", h);
    }
    ve(
      r,
      u,
      a,
      d,
      e.isY,
      b,
      c,
      p
    );
    const g = R(null);
    return B(() => {
      if (g.value) {
        const h = g.value, x = h.offsetWidth, y = h.offsetHeight;
        i.value.tipWidth = x, i.value.tipHeight = y;
      }
    }), (h, x) => (L(), Y("div", {
      ref_key: "positionLineRef",
      ref: b,
      class: "scale-ruler_position-line",
      style: E(s.value)
    }, [
      q("div", {
        class: "scale-ruler_position-line_inner",
        style: E(v.value)
      }, null, 4),
      q("div", {
        class: "scale-ruler_position-line_tip",
        style: E(m.value),
        ref_key: "tipRef",
        ref: g
      }, ne((l.isY ? "Y" : "X") + ": " + +S(c).coordinate.toFixed(2) + " px"), 5)
    ], 4));
  }
}), ge = ["width", "height"], G = /* @__PURE__ */ A({
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
  setup(l) {
    const o = l, { opt: e, transformInfo: c, containerInfo: a } = K(o), d = M(() => {
      const { isY: s, containerInfo: v, opt: i } = o;
      return {
        width: s ? i.rulerConfig.yRulerWidth : v.width,
        height: s ? v.height : i.rulerConfig.xRulerHeight
      };
    }), r = M(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: o.opt.rulerConfig.zIndex + (o.isY ? 0 : 1)
    })), u = R();
    I(
      [() => o.containerInfo, () => o.canvasInfo],
      () => {
        fe(o.opt, o.canvasInfo, o.isY, u);
      },
      {
        deep: !0
      }
    );
    const { adsorptionList: n } = de(o.opt, o.isY), { positionLineMap: t } = pe(
      e,
      a,
      n,
      c,
      !o.isY,
      u
    );
    function f(s) {
      delete t[s];
    }
    return (s, v) => (L(), Y(D, null, [
      q("canvas", {
        ref_key: "rulerRef",
        ref: u,
        style: E(r.value),
        width: d.value.width,
        height: d.value.height
      }, null, 12, ge),
      o.opt.usePositionLine ? (L(), Y("div", {
        key: 0,
        class: oe("position-line-" + (o.isY ? "x" : "y"))
      }, [
        (L(!0), Y(D, null, ae(Object.keys(S(t)), (i) => (L(), $(he, {
          key: i,
          opt: o.opt,
          "is-y": !o.isY,
          "transform-info": o.transformInfo,
          "container-info": o.containerInfo,
          "line-info": S(t)[i],
          "adsorption-list": S(n),
          onRemovePositionLine: f
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info", "adsorption-list"]))), 128))
      ], 2)) : H("", !0)
    ], 64));
  }
});
function me(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var z, U;
function ye() {
  if (U) return z;
  U = 1;
  var l = function(g) {
    return o(g) && !e(g);
  };
  function o(p) {
    return !!p && typeof p == "object";
  }
  function e(p) {
    var g = Object.prototype.toString.call(p);
    return g === "[object RegExp]" || g === "[object Date]" || d(p);
  }
  var c = typeof Symbol == "function" && Symbol.for, a = c ? Symbol.for("react.element") : 60103;
  function d(p) {
    return p.$$typeof === a;
  }
  function r(p) {
    return Array.isArray(p) ? [] : {};
  }
  function u(p, g) {
    return g.clone !== !1 && g.isMergeableObject(p) ? b(r(p), p, g) : p;
  }
  function n(p, g, h) {
    return p.concat(g).map(function(x) {
      return u(x, h);
    });
  }
  function t(p, g) {
    if (!g.customMerge)
      return b;
    var h = g.customMerge(p);
    return typeof h == "function" ? h : b;
  }
  function f(p) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(p).filter(function(g) {
      return Object.propertyIsEnumerable.call(p, g);
    }) : [];
  }
  function s(p) {
    return Object.keys(p).concat(f(p));
  }
  function v(p, g) {
    try {
      return g in p;
    } catch {
      return !1;
    }
  }
  function i(p, g) {
    return v(p, g) && !(Object.hasOwnProperty.call(p, g) && Object.propertyIsEnumerable.call(p, g));
  }
  function m(p, g, h) {
    var x = {};
    return h.isMergeableObject(p) && s(p).forEach(function(y) {
      x[y] = u(p[y], h);
    }), s(g).forEach(function(y) {
      i(p, y) || (v(p, y) && h.isMergeableObject(g[y]) ? x[y] = t(y, h)(p[y], g[y], h) : x[y] = u(g[y], h));
    }), x;
  }
  function b(p, g, h) {
    h = h || {}, h.arrayMerge = h.arrayMerge || n, h.isMergeableObject = h.isMergeableObject || l, h.cloneUnlessOtherwiseSpecified = u;
    var x = Array.isArray(g), y = Array.isArray(p), C = x === y;
    return C ? x ? h.arrayMerge(p, g, h) : m(p, g, h) : u(g, h);
  }
  b.all = function(g, h) {
    if (!Array.isArray(g))
      throw new Error("first argument should be an array");
    return g.reduce(function(x, y) {
      return b(x, y, h);
    }, {});
  };
  var O = b;
  return z = O, z;
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
  const l = {};
  for (const o in F) {
    const e = F[o];
    typeof e == "object" && e !== null ? l[o] = () => e : l[o] = e;
  }
  return l;
}(), Oe = (l, o) => {
  const e = W({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });
  function c(u, n) {
    new ResizeObserver((f) => {
      for (const s of f)
        if (s.target === n) {
          const v = n.offsetWidth, i = n.offsetHeight;
          (v !== e.originWidth || i !== e.originHeight) && a(u, n);
        }
    }).observe(n);
  }
  function a(u, n, t = !1) {
    const f = u.value;
    f.containerAutoSize ? (e.width = n.offsetWidth, e.height = n.offsetHeight, e.originWidth = e.width, e.originHeight = e.height, t && c(u, n)) : (e.width = f.containerWidth, e.height = f.containerHeight);
    const s = getComputedStyle(n);
    s.boxSizing === "border-box" && (e.width -= parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth), e.height -= parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth)), s.position === "static" && (e.position = "relative");
  }
  B(() => {
    const u = o.value;
    u && a(l, u, !0);
  });
  const d = M(() => ({
    width: e.width,
    height: e.height
  })), r = M(() => {
    const u = l.value, n = {
      overflow: "hidden"
    };
    return u.containerAutoSize || (n.width = e.width + "px", n.height = e.height + "px"), e.position && (n.position = e.position), n;
  });
  return {
    containerInfo: d,
    containerStyle: r
  };
}, Se = (l, o) => {
  const e = W({});
  return I(
    () => o.value,
    () => {
      const c = l.value;
      let a = 0, d = 0, { scale: r } = c;
      const { autoCenter: u, autoScale: n } = c, { width: t, height: f } = o.value;
      if (n) {
        const i = (t - 2 * c.containerXPadding) / c.canvasWidth, m = (f - 2 * c.containerYPadding) / c.canvasHeight;
        r = Math.min(i, m);
      }
      e.scale = r;
      let s = 0, v = 0;
      a = c.canvasWidth * r, d = c.canvasHeight * r, u && (s = Math.floor((t - a) / 2), v = Math.floor((f - d) / 2), e.translateX = s, e.translateY = v);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, we = (l, o, e) => ({ scrollBarInfo: M(() => {
  const a = l.value, { width: d, height: r } = o.value, { translateX: u, translateY: n, scale: t } = e, f = a.canvasWidth * t + 2 * a.containerXPadding, s = a.canvasHeight * t + 2 * a.containerYPadding, v = d < f, i = r < s, m = v || i, b = d * ((a.containerXPadding - u) / f), O = r * ((a.containerYPadding - n) / s), p = d / f * d, g = r / s * r;
  return {
    totalHeight: s,
    totalWidth: f,
    left: b,
    top: O,
    width: p,
    height: g,
    isYLarge: i,
    isXLarge: v,
    isLarge: m
  };
}) });
function Z(l, o, e) {
  const c = l.value, { containerXPadding: a, containerYPadding: d, canvasWidth: r, canvasHeight: u } = c, n = r * e, t = u * e, { width: f, height: s } = o.value, v = Math.max((f - n) / 2, a), i = Math.max((s - t) / 2, d), m = n + 2 * a > f ? f - (n + a) : v, b = t + 2 * d > s ? s - (t + d) : i;
  return {
    maxTranslateX: v,
    maxTranslateY: i,
    minTranslateX: m,
    minTranslateY: b
  };
}
const Me = (l, o, e) => ({ boundaryInfo: M(() => Z(l, o, e.scale)) }), ee = (l, o, e, c) => {
  const a = l.value;
  let { translateX: d, translateY: r, scale: u } = e;
  c = Math.min(Math.max(c, a.minScale), a.maxScale);
  const n = c - u, t = Z(
    l,
    o,
    c
  );
  d -= n * a.canvasWidth / 2, r -= n * a.canvasHeight / 2, d = Math.max(
    Math.min(d, t.maxTranslateX),
    t.minTranslateX
  ), r = Math.max(
    Math.min(r, t.maxTranslateY),
    t.minTranslateY
  ), e.scale = c, e.translateX = d, e.translateY = r;
}, Le = (l, o, e) => {
  l.value.proxyScaleKey && document.addEventListener("keydown", (c) => {
    if (l.value.canScale) {
      const a = c.keyCode;
      if ((c.metaKey || c.ctrlKey) && (a === 187 || a === 189)) {
        c.preventDefault();
        const d = e.scale + (a === 187 ? 0.05 : -0.05);
        ee(l, o, e, d);
      }
    }
  });
}, Ce = (l, o, e, c, a, d) => {
  let r = null;
  const u = W({
    xOpacity: 0,
    yOpacity: 0,
    isMouseDown: !1,
    isMouseEnter: !1
  });
  return B(() => {
    a.value && a.value.addEventListener("wheel", (n) => {
      if (n.metaKey || n.ctrlKey) {
        n.preventDefault();
        const t = -1 * n.deltaY / 100, f = e.scale + t;
        ee(l, o, e, f);
      } else {
        if (!d.value.isLarge || u.isMouseDown)
          return;
        n.preventDefault();
        let { translateX: t, translateY: f } = e;
        r && clearTimeout(r);
        const s = -n.deltaX, v = -n.deltaY;
        let i = "";
        const { opacity: m = 0.4 } = l.value.scrollBarConfig, { isXLarge: b, isYLarge: O } = d.value, { maxTranslateX: p, minTranslateX: g, maxTranslateY: h, minTranslateY: x } = c.value;
        b && Math.abs(s) > Math.abs(v) && (t += s, t = Math.max(
          Math.min(t, p),
          g
        ), u.xOpacity = m, u.yOpacity = 0, e.translateX = t, i = "x"), O && Math.abs(v) > Math.abs(s) && (i = "y", f += v, f = Math.max(
          Math.min(f, h),
          x
        ), u.yOpacity = m, u.xOpacity = 0, e.translateY = f), i && (r = setTimeout(() => {
          u.isMouseEnter || (u[i === "y" ? "yOpacity" : "xOpacity"] = 0);
        }, 1e3));
      }
    });
  }), { scrollBarOpacity: u };
}, Ye = /* @__PURE__ */ A({
  __name: "ScaleRuler",
  props: /* @__PURE__ */ re({
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
  setup(l) {
    const o = l, e = R(
      V(F, o)
    ), c = R(null), { containerInfo: a, containerStyle: d } = Oe(e, c), { transformInfo: r } = Se(e, a), { boundaryInfo: u } = Me(e, a, r), n = M(
      () => Object.assign({}, r, u.value)
    ), { scrollBarInfo: t } = we(e, a, r), f = W({}), s = I(
      () => n.value,
      (i) => {
        if (i.scale) {
          const m = {
            scale: i.scale,
            translateX: i.translateX,
            translateY: i.translateY
          };
          f.scale || Object.assign(f, m), s();
        }
      }
    );
    I(
      () => o,
      () => {
        e.value = V(e.value, o);
      },
      {
        deep: !0
      }
    ), Le(e, a, r);
    const { scrollBarOpacity: v } = Ce(
      e,
      a,
      r,
      u,
      c,
      t
    );
    return (i, m) => (L(), Y("div", {
      ref_key: "container",
      ref: c,
      style: E(S(d))
    }, [
      e.value.useRuler ? (L(), Y(D, { key: 0 }, [
        P(G, {
          opt: e.value,
          "container-info": S(a),
          "canvas-info": n.value,
          "transform-info": S(r)
        }, null, 8, ["opt", "container-info", "canvas-info", "transform-info"]),
        P(G, {
          "is-y": "",
          opt: e.value,
          "container-info": S(a),
          "canvas-info": n.value,
          "transform-info": S(r)
        }, null, 8, ["opt", "container-info", "canvas-info", "transform-info"])
      ], 64)) : H("", !0),
      P(le, {
        "container-info": S(a),
        opt: e.value,
        "canvas-info": n.value,
        "transform-info": S(r)
      }, {
        default: ie(() => [
          se(i.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "canvas-info", "transform-info"]),
      S(t).isXLarge ? (L(), $(N, {
        key: 1,
        opt: e.value,
        "container-info": S(a),
        "scroll-bar-info": S(t),
        "scroll-bar-opacity": S(v),
        "transform-info": S(r)
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "scroll-bar-opacity", "transform-info"])) : H("", !0),
      S(t).isYLarge ? (L(), $(N, {
        key: 2,
        opt: e.value,
        "container-info": S(a),
        "scroll-bar-info": S(t),
        "scroll-bar-opacity": S(v),
        "transform-info": S(r),
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "scroll-bar-opacity", "transform-info"])) : H("", !0)
    ], 4));
  }
});
export {
  Ye as default
};
