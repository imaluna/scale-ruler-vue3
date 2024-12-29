import { defineComponent as R, computed as Y, openBlock as C, createElementBlock as _, normalizeStyle as W, toRefs as V, ref as I, onMounted as A, nextTick as J, watch as X, reactive as E, mergeDefaults as Q, unref as S, Fragment as Z, createVNode as T, createCommentVNode as L, withCtx as ee, renderSlot as te, createBlock as $ } from "vue";
const ne = /* @__PURE__ */ R({
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
  setup(a) {
    const n = a, e = Y(() => {
      var l, t;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((l = n.opt) == null ? void 0 : l.canvasWidth) + "px",
        height: ((t = n.opt) == null ? void 0 : t.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0",
        transform: `translate(${n.canvasInfo.translateX}px, ${n.canvasInfo.translateY}px) scale(${n.canvasInfo.scale})`,
        ...n.opt.canvasStyle
      };
    });
    return (l, t) => (C(), _("div", {
      ref: "canvasPanel",
      style: W(e.value)
    }, null, 4));
  }
}), F = /* @__PURE__ */ R({
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
  setup(a) {
    const n = a, { scrollBarOpacity: e, transformInfo: l } = V(n), t = Y(() => {
      const { opt: f, scrollBarInfo: c, isY: d } = n, { scrollBarConfig: p } = f, m = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: p.bgColor,
        opacity: n.scrollBarOpacity[d ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: p.zIndex,
        width: (d ? p.barSize : c.width) + "px",
        height: (d ? c.height : p.barSize) + "px"
      };
      return d ? (m.top = c.top + "px", m.right = 0) : (m.left = c.left + "px", m.bottom = 0), m;
    }), o = I(null), r = {};
    function h(f) {
      if (f.preventDefault(), !e.value.isMouseDown) return;
      let { translateX: c, translateY: d } = l.value;
      const p = n.scrollBarInfo, { width: m, height: i } = n.containerInfo;
      if (n.isY) {
        const v = f.pageY - r.startY;
        let b = r.top + v;
        b = Math.min(Math.max(0, b), i - p.height);
        const w = b * p.totalHeight / i;
        d = n.opt.containerYPadding - w, l.value.translateY = d;
      } else {
        const v = f.pageX - r.startX;
        let b = r.left + v;
        b = Math.min(Math.max(0, b), i - p.height);
        const w = b * p.totalWidth / i;
        c = n.opt.containerXPadding - w, l.value.translateX = c;
      }
    }
    return A(() => {
      if (o.value) {
        const f = o.value, c = n.isY ? "yOpacity" : "xOpacity";
        f.addEventListener("mouseenter", () => {
          e.value[c] = n.opt.scrollBarConfig.opacity, e.value[n.isY ? "xOpacity" : "yOpacity"] = 0, e.value.isMouseEnter = !0;
        }), f.addEventListener("mouseleave", () => {
          e.value.isMouseEnter = !1, e.value[c] = 0;
        }), f.addEventListener("mousedown", (d) => {
          e.value.isMouseDown = !0, r.startX = d.pageX, r.startY = d.pageY, r.left = n.scrollBarInfo.left, r.top = n.scrollBarInfo.top, document.addEventListener("mousemove", h);
        }), document.addEventListener("mouseup", () => {
          e.value.isMouseDown = !1, document.removeEventListener("mousemove", h);
        });
      }
    }), (f, c) => (C(), _("div", {
      ref_key: "scrollBarRef",
      ref: o,
      style: W(t.value)
    }, null, 4));
  }
}), re = (a) => a <= 0.25 ? 40 : a <= 0.5 ? 20 : a <= 1 ? 10 : a <= 2 ? 5 : a <= 4 ? 2 : 1, ae = (a, n, e, l) => {
  J(() => {
    const t = l.value;
    if (t) {
      const o = t.offsetWidth, r = t.offsetHeight, { rulerConfig: h } = a, { bgColor: f, fontFamily: c, fontSize: d, lineColor: p, fontColor: m } = h;
      if (o > 0 && r > 0) {
        const i = t.getContext("2d");
        i.clearRect(0, 0, o, r), f && (i.save(), i.fillStyle = f, i.fillRect(0, 0, o, r), i.restore());
        const v = e ? h.yRulerWidth : h.xRulerHeight, { translateX: b, translateY: w, scale: s } = n, u = e ? w : b, g = re(s), O = g * s, y = window.devicePixelRatio, P = -u, q = Math.floor(P / O), D = Math.floor(
          ((e ? r : o) - u) / O
        );
        i.save(), i.fillStyle = p, i.font = `${d * y}px ${c}`, i.translate(0.5, 0.5), i.scale(1 / y, 1 / y), e ? i.fillRect((v - 1) * y, 0, 1, r * y) : i.fillRect(0, (v - 1) * y, o * y, 1);
        for (let M = q; M <= D; M++) {
          i.fillStyle = p;
          const B = (u + M * O) * y;
          let j = v / 4;
          M % 10 === 0 ? j = v * 4 / 5 : M % 5 === 0 && (j = v / 3), e ? i.fillRect((v - j) * y, B, j * y, 1) : (i.fillRect(B, (v - j) * y, 1, j * y), M % 10 === 0 && (i.fillStyle = m, i.fillText(
            String(M * g),
            B + 2 * y,
            (v + 8 - j) * y
          )));
        }
        if (i.restore(), e) {
          i.font = `${d}px ${c}`;
          let M = q;
          for (; M <= D; )
            if (M % 10)
              M++;
            else {
              i.save();
              const B = u + M * O + v / 2;
              i.translate(B + v / 5, B - v * 6 / 5), i.rotate(Math.PI / 2), i.fillText(String(M * g), v * 4 / 5, B), M += 10, i.restore();
            }
        }
      }
    }
  });
}, oe = ["width", "height"], K = /* @__PURE__ */ R({
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
  setup(a) {
    const n = a, e = Y(() => {
      const { isY: o, containerInfo: r, opt: h } = n;
      return {
        width: o ? h.rulerConfig.yRulerWidth : r.width,
        height: o ? r.height : h.rulerConfig.xRulerHeight
      };
    }), l = Y(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: n.opt.rulerConfig.zIndex + (n.isY ? 0 : 1)
    })), t = I();
    return X(
      [() => n.containerInfo, () => n.canvasInfo],
      () => {
        ae(
          n.opt,
          n.canvasInfo,
          n.isY,
          t
        );
      },
      {
        deep: !0
      }
    ), (o, r) => (C(), _("canvas", {
      ref_key: "rulerRef",
      ref: t,
      style: W(l.value),
      width: e.value.width,
      height: e.value.height
    }, null, 12, oe));
  }
});
function ie(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var H, N;
function se() {
  if (N) return H;
  N = 1;
  var a = function(u) {
    return n(u) && !e(u);
  };
  function n(s) {
    return !!s && typeof s == "object";
  }
  function e(s) {
    var u = Object.prototype.toString.call(s);
    return u === "[object RegExp]" || u === "[object Date]" || o(s);
  }
  var l = typeof Symbol == "function" && Symbol.for, t = l ? Symbol.for("react.element") : 60103;
  function o(s) {
    return s.$$typeof === t;
  }
  function r(s) {
    return Array.isArray(s) ? [] : {};
  }
  function h(s, u) {
    return u.clone !== !1 && u.isMergeableObject(s) ? b(r(s), s, u) : s;
  }
  function f(s, u, g) {
    return s.concat(u).map(function(O) {
      return h(O, g);
    });
  }
  function c(s, u) {
    if (!u.customMerge)
      return b;
    var g = u.customMerge(s);
    return typeof g == "function" ? g : b;
  }
  function d(s) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(s).filter(function(u) {
      return Object.propertyIsEnumerable.call(s, u);
    }) : [];
  }
  function p(s) {
    return Object.keys(s).concat(d(s));
  }
  function m(s, u) {
    try {
      return u in s;
    } catch {
      return !1;
    }
  }
  function i(s, u) {
    return m(s, u) && !(Object.hasOwnProperty.call(s, u) && Object.propertyIsEnumerable.call(s, u));
  }
  function v(s, u, g) {
    var O = {};
    return g.isMergeableObject(s) && p(s).forEach(function(y) {
      O[y] = h(s[y], g);
    }), p(u).forEach(function(y) {
      i(s, y) || (m(s, y) && g.isMergeableObject(u[y]) ? O[y] = c(y, g)(s[y], u[y], g) : O[y] = h(u[y], g));
    }), O;
  }
  function b(s, u, g) {
    g = g || {}, g.arrayMerge = g.arrayMerge || f, g.isMergeableObject = g.isMergeableObject || a, g.cloneUnlessOtherwiseSpecified = h;
    var O = Array.isArray(u), y = Array.isArray(s), P = O === y;
    return P ? O ? g.arrayMerge(s, u, g) : v(s, u, g) : h(u, g);
  }
  b.all = function(u, g) {
    if (!Array.isArray(u))
      throw new Error("first argument should be an array");
    return u.reduce(function(O, y) {
      return b(O, y, g);
    }, {});
  };
  var w = b;
  return H = w, H;
}
var le = se();
const U = /* @__PURE__ */ ie(le), z = {
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
}, ce = function() {
  const a = {};
  for (const n in z) {
    const e = z[n];
    typeof e == "object" && e !== null ? a[n] = () => e : a[n] = e;
  }
  return a;
}(), x = E({
  width: 0,
  height: 0,
  originWidth: 0,
  originHeight: 0
});
function ue(a) {
  new ResizeObserver((e) => {
    for (const l of e)
      if (l.target === a) {
        const t = a.offsetWidth, o = a.offsetHeight;
        t !== x.originWidth || x.originHeight;
      }
  }).observe(a);
}
const fe = (a, n) => {
  A(() => {
    const t = a.value, o = n.value;
    if (o) {
      t.containerAutoSize ? (x.width = o.offsetWidth, x.height = o.offsetHeight, x.originWidth = x.width, x.originHeight = x.height, ue(o)) : (x.width = t.containerWidth, x.height = t.containerHeight);
      const r = getComputedStyle(o);
      r.boxSizing === "border-box" && (x.width -= parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), x.height -= parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth)), r.position === "static" && (x.position = "relative");
    }
  });
  const e = Y(() => ({
    width: x.width,
    height: x.height
  })), l = Y(() => {
    const t = a.value, o = {
      overflow: "hidden"
    };
    return t.containerAutoSize || (o.width = x.width + "px", o.height = x.height + "px"), x.position && (o.position = x.position), o;
  });
  return {
    containerInfo: e,
    containerStyle: l
  };
}, de = (a, n) => {
  const e = E({});
  return X(
    () => n.value,
    () => {
      const l = a.value;
      let t = 0, o = 0, { scale: r } = l;
      const { autoCenter: h, autoScale: f } = l, { width: c, height: d } = n.value;
      if (f) {
        const i = (c - 2 * l.containerXPadding) / l.canvasWidth, v = (d - 2 * l.containerYPadding) / l.canvasHeight;
        r = Math.min(i, v);
      }
      e.scale = r;
      let p = 0, m = 0;
      t = l.canvasWidth * r, o = l.canvasHeight * r, h && (p = Math.floor((c - t) / 2), m = Math.floor((d - o) / 2), e.translateX = p, e.translateY = m);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, he = (a, n, e) => ({ scrollBarInfo: Y(() => {
  console.log(e, "--transformInfo-33");
  const t = a.value, { width: o, height: r } = n.value, { translateX: h, translateY: f, scale: c } = e, d = t.canvasWidth * c + 2 * t.containerXPadding, p = t.canvasHeight * c + 2 * t.containerYPadding, m = o < d, i = r < p, v = m || i, b = o * ((t.containerXPadding - h) / d), w = r * ((t.containerYPadding - f) / d), s = o / d * o, u = r / p * r;
  return {
    totalHeight: p,
    totalWidth: d,
    left: b,
    top: w,
    width: s,
    height: u,
    isYLarge: i,
    isXLarge: m,
    isLarge: v
  };
}) });
function k(a, n, e) {
  const l = a.value, { containerXPadding: t, containerYPadding: o, canvasWidth: r, canvasHeight: h } = l, f = r * e, c = h * e, { width: d, height: p } = n.value, m = Math.max((d - f) / 2, t), i = Math.max((p - c) / 2, o), v = f + 2 * t > d ? d - (f + t) : m, b = c + 2 * o > p ? p - (c + o) : i;
  return {
    maxTranslateX: m,
    maxTranslateY: i,
    minTranslateX: v,
    minTranslateY: b
  };
}
const pe = (a, n, e) => ({ boundaryInfo: Y(() => k(a, n, e.scale)) }), G = (a, n, e, l) => {
  const t = a.value;
  let { translateX: o, translateY: r, scale: h } = e;
  l = Math.min(Math.max(l, t.minScale), t.maxScale);
  const f = l - h, c = k(
    a,
    n,
    l
  );
  o -= f * t.canvasWidth / 2, r -= f * t.canvasHeight / 2, o = Math.max(
    Math.min(o, c.maxTranslateX),
    c.minTranslateX
  ), r = Math.max(
    Math.min(r, c.maxTranslateY),
    c.minTranslateY
  ), e.scale = l, e.translateX = o, e.translateY = r;
}, ge = (a, n, e) => {
  a.value.proxyScaleKey && document.addEventListener("keydown", (l) => {
    if (a.value.canScale) {
      const t = l.keyCode;
      if ((l.metaKey || l.ctrlKey) && (t === 187 || t === 189)) {
        l.preventDefault();
        const o = e.scale + (t === 187 ? 0.05 : -0.05);
        G(a, n, e, o);
      }
    }
  });
}, ye = (a, n, e, l, t, o) => {
  let r = null;
  const h = E({
    xOpacity: 0,
    yOpacity: 0,
    isMouseDown: !1,
    isMouseEnter: !1
  });
  return A(() => {
    t.value && t.value.addEventListener("wheel", (f) => {
      if (f.metaKey || f.ctrlKey) {
        f.preventDefault();
        const c = -1 * f.deltaY / 100, d = e.scale + c;
        G(a, n, e, d);
      } else {
        if (console.log(h, "--scrollBarOpacity-1-"), !o.value.isLarge || h.isMouseDown)
          return;
        f.preventDefault();
        let { translateX: c, translateY: d } = e;
        r && clearTimeout(r);
        const p = -f.deltaX, m = -f.deltaY;
        let i = "";
        const { opacity: v = 0.4 } = a.value.scrollBarConfig, { isXLarge: b, isYLarge: w } = o.value, { maxTranslateX: s, minTranslateX: u, maxTranslateY: g, minTranslateY: O } = l.value;
        b && Math.abs(p) > Math.abs(m) && (c += p, c = Math.max(
          Math.min(c, s),
          u
        ), h.xOpacity = v, h.yOpacity = 0, e.translateX = c, i = "x"), w && Math.abs(m) > Math.abs(p) && (i = "y", d += m, d = Math.max(
          Math.min(d, g),
          O
        ), h.yOpacity = v, h.xOpacity = 0, e.translateY = d), i && (r = setTimeout(() => {
          h.isMouseEnter || (h[i === "y" ? "yOpacity" : "xOpacity"] = 0);
        }, 1e3));
      }
    });
  }), { scrollBarOpacity: h };
}, me = /* @__PURE__ */ R({
  __name: "ScaleRuler",
  props: /* @__PURE__ */ Q({
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
  }, ce),
  setup(a) {
    const n = a, e = I(
      U(z, n)
    ), l = I(null), { containerInfo: t, containerStyle: o } = fe(e, l), { transformInfo: r } = de(e, t), { boundaryInfo: h } = pe(e, t, r), f = Y(
      () => Object.assign({}, r, h.value)
    ), { scrollBarInfo: c } = he(e, t, r), d = E({}), p = X(
      () => f.value,
      (i) => {
        if (i.scale) {
          const v = {
            scale: i.scale,
            translateX: i.translateX,
            translateY: i.translateY
          };
          d.scale || Object.assign(d, v), p();
        }
      }
    );
    X(
      () => n,
      () => {
        e.value = U(e.value, n);
      },
      {
        deep: !0
      }
    ), ge(e, t, r);
    const { scrollBarOpacity: m } = ye(
      e,
      t,
      r,
      h,
      l,
      c
    );
    return console.log(m, "--scrollBarOpacity-"), (i, v) => (C(), _("div", {
      ref_key: "container",
      ref: l,
      style: W(S(o))
    }, [
      e.value.useRuler ? (C(), _(Z, { key: 0 }, [
        T(K, {
          opt: e.value,
          "container-info": S(t),
          "canvas-info": f.value
        }, null, 8, ["opt", "container-info", "canvas-info"]),
        T(K, {
          "is-y": "",
          opt: e.value,
          "container-info": S(t),
          "canvas-info": f.value
        }, null, 8, ["opt", "container-info", "canvas-info"])
      ], 64)) : L("", !0),
      T(ne, {
        "container-info": S(t),
        opt: e.value,
        "canvas-info": f.value,
        "transform-info": S(r)
      }, {
        default: ee(() => [
          te(i.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "canvas-info", "transform-info"]),
      S(c).isXLarge ? (C(), $(F, {
        key: 1,
        opt: e.value,
        "container-info": S(t),
        "scroll-bar-info": S(c),
        "scroll-bar-opacity": S(m),
        "transform-info": S(r)
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "scroll-bar-opacity", "transform-info"])) : L("", !0),
      S(c).isYLarge ? (C(), $(F, {
        key: 2,
        opt: e.value,
        "container-info": S(t),
        "scroll-bar-info": S(c),
        "scroll-bar-opacity": S(m),
        "transform-info": S(r),
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "scroll-bar-opacity", "transform-info"])) : L("", !0)
    ], 4));
  }
});
export {
  me as default
};
