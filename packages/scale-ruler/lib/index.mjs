import { defineComponent as B, computed as M, openBlock as I, createElementBlock as j, normalizeStyle as X, toRefs as Q, ref as E, onMounted as R, nextTick as Z, reactive as Y, watch as C, createElementVNode as T, Fragment as H, renderList as ee, unref as x, createBlock as q, mergeDefaults as te, createVNode as W, createCommentVNode as z, withCtx as ne, renderSlot as oe } from "vue";
const re = /* @__PURE__ */ B({
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
    const t = c, e = M(() => {
      var s, r;
      return {
        position: "absolute",
        left: 0,
        top: 0,
        width: ((s = t.opt) == null ? void 0 : s.canvasWidth) + "px",
        height: ((r = t.opt) == null ? void 0 : r.canvasHeight) + "px",
        transition: "transform 300ms",
        transformOrigin: "0 0",
        transform: `translate(${t.canvasInfo.translateX}px, ${t.canvasInfo.translateY}px) scale(${t.canvasInfo.scale})`,
        ...t.opt.canvasStyle
      };
    });
    return (s, r) => (I(), j("div", {
      ref: "canvasPanel",
      style: X(e.value)
    }, null, 4));
  }
}), k = /* @__PURE__ */ B({
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
  setup(c) {
    const t = c, { scrollBarOpacity: e, transformInfo: s } = Q(t), r = M(() => {
      const { opt: o, scrollBarInfo: n, isY: l } = t, { scrollBarConfig: f } = o, g = {
        position: "absolute",
        borderRadius: "4px",
        backgroundColor: f.bgColor,
        opacity: t.scrollBarOpacity[l ? "yOpacity" : "xOpacity"] || 0,
        transition: "opacity 300ms",
        cursor: "pointer",
        zIndex: f.zIndex,
        width: (l ? f.barSize : n.width) + "px",
        height: (l ? n.height : f.barSize) + "px"
      };
      return l ? (g.top = n.top + "px", g.right = 0) : (g.left = n.left + "px", g.bottom = 0), g;
    }), d = E(null), a = {};
    function i(o) {
      if (o.preventDefault(), !e.value.isMouseDown) return;
      let { translateX: n, translateY: l } = s.value;
      const f = t.scrollBarInfo, { width: g, height: u } = t.containerInfo;
      if (t.isY) {
        const v = o.pageY - a.startY;
        let b = a.top + v;
        b = Math.min(Math.max(0, b), u - f.height);
        const w = b * f.totalHeight / u;
        l = t.opt.containerYPadding - w, s.value.translateY = l;
      } else {
        const v = o.pageX - a.startX;
        let b = a.left + v;
        b = Math.min(Math.max(0, b), g - f.width);
        const w = b * f.totalWidth / g;
        n = t.opt.containerXPadding - w, s.value.translateX = n;
      }
    }
    return R(() => {
      if (d.value) {
        const o = d.value, n = t.isY ? "yOpacity" : "xOpacity";
        o.addEventListener("mouseenter", () => {
          e.value[n] = t.opt.scrollBarConfig.opacity, e.value[t.isY ? "xOpacity" : "yOpacity"] = 0, e.value.isMouseEnter = !0;
        }), o.addEventListener("mouseleave", () => {
          e.value.isMouseEnter = !1, e.value[n] = 0;
        }), o.addEventListener("mousedown", (l) => {
          e.value.isMouseDown = !0, a.startX = l.pageX, a.startY = l.pageY, a.left = t.scrollBarInfo.left, a.top = t.scrollBarInfo.top, document.addEventListener("mousemove", i);
        }), document.addEventListener("mouseup", () => {
          e.value.isMouseDown = !1, document.removeEventListener("mousemove", i);
        });
      }
    }), (o, n) => (I(), j("div", {
      ref_key: "scrollBarRef",
      ref: d,
      style: X(r.value)
    }, null, 4));
  }
}), ae = (c) => c <= 0.25 ? 40 : c <= 0.5 ? 20 : c <= 1 ? 10 : c <= 2 ? 5 : c <= 4 ? 2 : 1, ie = (c) => {
  const t = c.getBoundingClientRect(), e = t.top + (document.body.scrollTop || document.documentElement.scrollTop), s = t.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
  return { top: e, left: s };
}, se = (c, t, e, s) => {
  Z(() => {
    const r = s.value;
    if (r) {
      const d = r.offsetWidth, a = r.offsetHeight, { rulerConfig: i } = c, { bgColor: o, fontFamily: n, fontSize: l, lineColor: f, fontColor: g } = i;
      if (d > 0 && a > 0) {
        const u = r.getContext("2d");
        u.clearRect(0, 0, d, a), o && (u.save(), u.fillStyle = o, u.fillRect(0, 0, d, a), u.restore());
        const v = e ? i.yRulerWidth : i.xRulerHeight, { translateX: b, translateY: w, scale: p } = t, h = e ? w : b, y = ae(p), O = y * p, m = window.devicePixelRatio, P = -h, D = Math.floor(P / O), F = Math.floor(
          ((e ? a : d) - h) / O
        );
        u.save(), u.fillStyle = f, u.font = `${l * m}px ${n}`, u.translate(0.5, 0.5), u.scale(1 / m, 1 / m), e ? u.fillRect((v - 1) * m, 0, 1, a * m) : u.fillRect(0, (v - 1) * m, d * m, 1);
        for (let S = D; S <= F; S++) {
          u.fillStyle = f;
          const L = (h + S * O) * m;
          let _ = v / 4;
          S % 10 === 0 ? _ = v * 4 / 5 : S % 5 === 0 && (_ = v / 3), e ? u.fillRect((v - _) * m, L, _ * m, 1) : (u.fillRect(L, (v - _) * m, 1, _ * m), S % 10 === 0 && (u.fillStyle = g, u.fillText(
            String(S * y),
            L + 2 * m,
            (v + 8 - _) * m
          )));
        }
        if (u.restore(), e) {
          u.font = `${l}px ${n}`;
          let S = D;
          for (; S <= F; )
            if (S % 10)
              S++;
            else {
              u.save();
              const L = h + S * O + v / 2;
              u.translate(L + v / 5, L - v * 6 / 5), u.rotate(Math.PI / 2), u.fillText(String(S * y), v * 4 / 5, L), S += 10, u.restore();
            }
        }
      }
    }
  });
}, ce = (c, t) => {
  const e = Y([0]);
  function s(n, l = !0) {
    const f = e.indexOf(n);
    l && f === -1 && e.push(n), !l && f > -1 && e.splice(f, 1);
  }
  function r(n, l = !0) {
    Array.isArray(n) ? n.forEach((f) => s(f, l)) : s(n, l);
  }
  function d(n) {
    r(n), e.sort((l, f) => l - f);
  }
  function a(n) {
    r(n, !1);
  }
  const i = M(
    () => c.positionLineConfig[t ? "adsorptionYList" : "adsorptionXList"]
  );
  C(
    () => i.value,
    (n) => {
      d(n);
    },
    {
      deep: !0
    }
  );
  const o = M(
    () => t ? c.canvasHeight : c.canvasWidth
  );
  return C(
    () => o.value,
    (n, l) => {
      a(l), d(n);
    }
  ), { adsorptionList: e };
}, K = (c, t, e) => {
  const { scale: s, translateX: r, translateY: d } = t;
  return (c - (e ? d : r)) / s;
}, le = (c, t, e) => {
  const { scale: s, translateX: r, translateY: d } = t, a = c * s;
  return (e ? d : r) + a;
};
function ue(c, t, e, s, r, d) {
  const a = { coordinate: r, translate: s }, i = c.length;
  if (i > 0) {
    let o = 0;
    for (; o < i; ) {
      const n = c[o];
      if (Math.abs(r - n) <= e) {
        a.coordinate = n, a.translate = le(n, t, d);
        break;
      } else if (n > r)
        break;
      o++;
    }
  }
  return a;
}
const fe = (c, t, e, s, r) => {
  let d = 1;
  const a = Y({});
  let i = {}, o = !1;
  function n(l) {
    if (o && i.id) {
      const f = s ? l.pageY : l.pageX - i.start, g = i.translate + f, u = K(g, e, s), v = ue(
        t,
        e,
        c.positionLineConfig.adsorptionGap,
        g,
        u,
        s
      );
      Object.assign(i, v), a[i.id] = i;
    }
  }
  return R(() => {
    if (r.value) {
      const l = r.value;
      l.addEventListener("mousedown", (f) => {
        const g = ie(l), u = s ? f.pageY : f.pageX, v = u - (s ? g.top : g.left), b = {
          translate: v,
          start: u,
          id: d,
          coordinate: K(v, e, s)
        };
        i = b, a[d++] = b, o = !0, document.addEventListener("mousemove", n);
      }), document.addEventListener("mouseup", (f) => {
        document.removeEventListener("mousemove", n), o && (o = !1, i = {});
      });
    }
  }), { positionLineMap: a };
}, de = /* @__PURE__ */ B({
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
    }
  },
  setup(c) {
    const t = c, e = M(() => t.opt.positionLineConfig.padding), s = M(() => 2 * e.value + 1), r = M(() => {
      const { width: d, height: a } = t.containerInfo, { isY: i, lineInfo: o } = t;
      console.log(o, t, "-lineInfo-");
      const { translate: n } = o, l = i ? `translate(0, ${n}px)` : `translate(${n}px, 0)`;
      return {
        width: (i ? d : s.value) + "px",
        height: (i ? s.value : a) + "px",
        cursor: i ? "row-resize" : "col-resize",
        top: (i ? 0 : -e.value) + "px",
        left: (i ? -e.value : 0) + "px",
        transform: l
      };
    });
    return (d, a) => (I(), j("div", {
      class: "scale-ruler_position-line",
      style: X(r.value)
    }, a[0] || (a[0] = [
      T("div", { class: "scale-ruler_position-line_inner" }, null, -1),
      T("div", { class: "scale-ruler_position-line_tip" }, null, -1)
    ]), 4));
  }
}), pe = ["width", "height"], N = /* @__PURE__ */ B({
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
    const t = c, e = M(() => {
      const { isY: i, containerInfo: o, opt: n } = t;
      return {
        width: i ? n.rulerConfig.yRulerWidth : o.width,
        height: i ? o.height : n.rulerConfig.xRulerHeight
      };
    }), s = M(() => ({
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: t.opt.rulerConfig.zIndex + (t.isY ? 0 : 1)
    })), r = E();
    C(
      [() => t.containerInfo, () => t.canvasInfo],
      () => {
        se(t.opt, t.canvasInfo, t.isY, r);
      },
      {
        deep: !0
      }
    );
    const { adsorptionList: d } = ce(t.opt, t.isY), { positionLineMap: a } = fe(
      t.opt,
      d,
      t.transformInfo,
      t.isY,
      r
    );
    return console.log(a), (i, o) => (I(), j(H, null, [
      T("canvas", {
        ref_key: "rulerRef",
        ref: r,
        style: X(s.value),
        width: e.value.width,
        height: e.value.height
      }, null, 12, pe),
      T("div", null, [
        (I(!0), j(H, null, ee(Object.keys(x(a)), (n) => (I(), q(de, {
          key: n,
          opt: t.opt,
          "is-y": !t.isY,
          "transform-info": t.transformInfo,
          "container-info": t.containerInfo,
          "line-info": x(a)[n]
        }, null, 8, ["opt", "is-y", "transform-info", "container-info", "line-info"]))), 128))
      ])
    ], 64));
  }
});
function he(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var A, U;
function ge() {
  if (U) return A;
  U = 1;
  var c = function(h) {
    return t(h) && !e(h);
  };
  function t(p) {
    return !!p && typeof p == "object";
  }
  function e(p) {
    var h = Object.prototype.toString.call(p);
    return h === "[object RegExp]" || h === "[object Date]" || d(p);
  }
  var s = typeof Symbol == "function" && Symbol.for, r = s ? Symbol.for("react.element") : 60103;
  function d(p) {
    return p.$$typeof === r;
  }
  function a(p) {
    return Array.isArray(p) ? [] : {};
  }
  function i(p, h) {
    return h.clone !== !1 && h.isMergeableObject(p) ? b(a(p), p, h) : p;
  }
  function o(p, h, y) {
    return p.concat(h).map(function(O) {
      return i(O, y);
    });
  }
  function n(p, h) {
    if (!h.customMerge)
      return b;
    var y = h.customMerge(p);
    return typeof y == "function" ? y : b;
  }
  function l(p) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(p).filter(function(h) {
      return Object.propertyIsEnumerable.call(p, h);
    }) : [];
  }
  function f(p) {
    return Object.keys(p).concat(l(p));
  }
  function g(p, h) {
    try {
      return h in p;
    } catch {
      return !1;
    }
  }
  function u(p, h) {
    return g(p, h) && !(Object.hasOwnProperty.call(p, h) && Object.propertyIsEnumerable.call(p, h));
  }
  function v(p, h, y) {
    var O = {};
    return y.isMergeableObject(p) && f(p).forEach(function(m) {
      O[m] = i(p[m], y);
    }), f(h).forEach(function(m) {
      u(p, m) || (g(p, m) && y.isMergeableObject(h[m]) ? O[m] = n(m, y)(p[m], h[m], y) : O[m] = i(h[m], y));
    }), O;
  }
  function b(p, h, y) {
    y = y || {}, y.arrayMerge = y.arrayMerge || o, y.isMergeableObject = y.isMergeableObject || c, y.cloneUnlessOtherwiseSpecified = i;
    var O = Array.isArray(h), m = Array.isArray(p), P = O === m;
    return P ? O ? y.arrayMerge(p, h, y) : v(p, h, y) : i(h, y);
  }
  b.all = function(h, y) {
    if (!Array.isArray(h))
      throw new Error("first argument should be an array");
    return h.reduce(function(O, m) {
      return b(O, m, y);
    }, {});
  };
  var w = b;
  return A = w, A;
}
var ve = ge();
const G = /* @__PURE__ */ he(ve), $ = {
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
}, ye = function() {
  const c = {};
  for (const t in $) {
    const e = $[t];
    typeof e == "object" && e !== null ? c[t] = () => e : c[t] = e;
  }
  return c;
}(), me = (c, t) => {
  const e = Y({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0
  });
  function s(i, o) {
    new ResizeObserver((l) => {
      for (const f of l)
        if (f.target === o) {
          const g = o.offsetWidth, u = o.offsetHeight;
          (g !== e.originWidth || u !== e.originHeight) && r(i, o);
        }
    }).observe(o);
  }
  function r(i, o, n = !1) {
    const l = i.value;
    l.containerAutoSize ? (e.width = o.offsetWidth, e.height = o.offsetHeight, e.originWidth = e.width, e.originHeight = e.height, n && s(i, o)) : (e.width = l.containerWidth, e.height = l.containerHeight);
    const f = getComputedStyle(o);
    f.boxSizing === "border-box" && (e.width -= parseFloat(f.borderLeftWidth) + parseFloat(f.borderRightWidth), e.height -= parseFloat(f.borderTopWidth) + parseFloat(f.borderBottomWidth)), f.position === "static" && (e.position = "relative");
  }
  R(() => {
    const i = t.value;
    i && r(c, i, !0);
  });
  const d = M(() => ({
    width: e.width,
    height: e.height
  })), a = M(() => {
    const i = c.value, o = {
      overflow: "hidden"
    };
    return i.containerAutoSize || (o.width = e.width + "px", o.height = e.height + "px"), e.position && (o.position = e.position), o;
  });
  return {
    containerInfo: d,
    containerStyle: a
  };
}, be = (c, t) => {
  const e = Y({});
  return C(
    () => t.value,
    () => {
      const s = c.value;
      let r = 0, d = 0, { scale: a } = s;
      const { autoCenter: i, autoScale: o } = s, { width: n, height: l } = t.value;
      if (o) {
        const u = (n - 2 * s.containerXPadding) / s.canvasWidth, v = (l - 2 * s.containerYPadding) / s.canvasHeight;
        a = Math.min(u, v);
      }
      e.scale = a;
      let f = 0, g = 0;
      r = s.canvasWidth * a, d = s.canvasHeight * a, i && (f = Math.floor((n - r) / 2), g = Math.floor((l - d) / 2), e.translateX = f, e.translateY = g);
    },
    {
      deep: !0
    }
  ), { transformInfo: e };
}, xe = (c, t, e) => ({ scrollBarInfo: M(() => {
  const r = c.value, { width: d, height: a } = t.value, { translateX: i, translateY: o, scale: n } = e, l = r.canvasWidth * n + 2 * r.containerXPadding, f = r.canvasHeight * n + 2 * r.containerYPadding, g = d < l, u = a < f, v = g || u, b = d * ((r.containerXPadding - i) / l), w = a * ((r.containerYPadding - o) / l), p = d / l * d, h = a / f * a;
  return {
    totalHeight: f,
    totalWidth: l,
    left: b,
    top: w,
    width: p,
    height: h,
    isYLarge: u,
    isXLarge: g,
    isLarge: v
  };
}) });
function V(c, t, e) {
  const s = c.value, { containerXPadding: r, containerYPadding: d, canvasWidth: a, canvasHeight: i } = s, o = a * e, n = i * e, { width: l, height: f } = t.value, g = Math.max((l - o) / 2, r), u = Math.max((f - n) / 2, d), v = o + 2 * r > l ? l - (o + r) : g, b = n + 2 * d > f ? f - (n + d) : u;
  return {
    maxTranslateX: g,
    maxTranslateY: u,
    minTranslateX: v,
    minTranslateY: b
  };
}
const Oe = (c, t, e) => ({ boundaryInfo: M(() => V(c, t, e.scale)) }), J = (c, t, e, s) => {
  const r = c.value;
  let { translateX: d, translateY: a, scale: i } = e;
  s = Math.min(Math.max(s, r.minScale), r.maxScale);
  const o = s - i, n = V(
    c,
    t,
    s
  );
  d -= o * r.canvasWidth / 2, a -= o * r.canvasHeight / 2, d = Math.max(
    Math.min(d, n.maxTranslateX),
    n.minTranslateX
  ), a = Math.max(
    Math.min(a, n.maxTranslateY),
    n.minTranslateY
  ), e.scale = s, e.translateX = d, e.translateY = a;
}, Se = (c, t, e) => {
  c.value.proxyScaleKey && document.addEventListener("keydown", (s) => {
    if (c.value.canScale) {
      const r = s.keyCode;
      if ((s.metaKey || s.ctrlKey) && (r === 187 || r === 189)) {
        s.preventDefault();
        const d = e.scale + (r === 187 ? 0.05 : -0.05);
        J(c, t, e, d);
      }
    }
  });
}, Me = (c, t, e, s, r, d) => {
  let a = null;
  const i = Y({
    xOpacity: 0,
    yOpacity: 0,
    isMouseDown: !1,
    isMouseEnter: !1
  });
  return R(() => {
    r.value && r.value.addEventListener("wheel", (o) => {
      if (o.metaKey || o.ctrlKey) {
        o.preventDefault();
        const n = -1 * o.deltaY / 100, l = e.scale + n;
        J(c, t, e, l);
      } else {
        if (!d.value.isLarge || i.isMouseDown)
          return;
        o.preventDefault();
        let { translateX: n, translateY: l } = e;
        a && clearTimeout(a);
        const f = -o.deltaX, g = -o.deltaY;
        let u = "";
        const { opacity: v = 0.4 } = c.value.scrollBarConfig, { isXLarge: b, isYLarge: w } = d.value, { maxTranslateX: p, minTranslateX: h, maxTranslateY: y, minTranslateY: O } = s.value;
        b && Math.abs(f) > Math.abs(g) && (n += f, n = Math.max(
          Math.min(n, p),
          h
        ), i.xOpacity = v, i.yOpacity = 0, e.translateX = n, u = "x"), w && Math.abs(g) > Math.abs(f) && (u = "y", l += g, l = Math.max(
          Math.min(l, y),
          O
        ), i.yOpacity = v, i.xOpacity = 0, e.translateY = l), u && (a = setTimeout(() => {
          i.isMouseEnter || (i[u === "y" ? "yOpacity" : "xOpacity"] = 0);
        }, 1e3));
      }
    });
  }), { scrollBarOpacity: i };
}, Ie = /* @__PURE__ */ B({
  __name: "ScaleRuler",
  props: /* @__PURE__ */ te({
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
  }, ye),
  setup(c) {
    const t = c, e = E(
      G($, t)
    ), s = E(null), { containerInfo: r, containerStyle: d } = me(e, s), { transformInfo: a } = be(e, r), { boundaryInfo: i } = Oe(e, r, a), o = M(
      () => Object.assign({}, a, i.value)
    ), { scrollBarInfo: n } = xe(e, r, a), l = Y({}), f = C(
      () => o.value,
      (u) => {
        if (u.scale) {
          const v = {
            scale: u.scale,
            translateX: u.translateX,
            translateY: u.translateY
          };
          l.scale || Object.assign(l, v), f();
        }
      }
    );
    C(
      () => t,
      () => {
        e.value = G(e.value, t);
      },
      {
        deep: !0
      }
    ), Se(e, r, a);
    const { scrollBarOpacity: g } = Me(
      e,
      r,
      a,
      i,
      s,
      n
    );
    return console.log(g, "--scrollBarOpacity-"), (u, v) => (I(), j("div", {
      ref_key: "container",
      ref: s,
      style: X(x(d))
    }, [
      e.value.useRuler ? (I(), j(H, { key: 0 }, [
        W(N, {
          opt: e.value,
          "container-info": x(r),
          "canvas-info": o.value,
          "transform-info": x(a)
        }, null, 8, ["opt", "container-info", "canvas-info", "transform-info"]),
        W(N, {
          "is-y": "",
          opt: e.value,
          "container-info": x(r),
          "canvas-info": o.value,
          "transform-info": x(a)
        }, null, 8, ["opt", "container-info", "canvas-info", "transform-info"])
      ], 64)) : z("", !0),
      W(re, {
        "container-info": x(r),
        opt: e.value,
        "canvas-info": o.value,
        "transform-info": x(a)
      }, {
        default: ne(() => [
          oe(u.$slots, "default")
        ]),
        _: 3
      }, 8, ["container-info", "opt", "canvas-info", "transform-info"]),
      x(n).isXLarge ? (I(), q(k, {
        key: 1,
        opt: e.value,
        "container-info": x(r),
        "scroll-bar-info": x(n),
        "scroll-bar-opacity": x(g),
        "transform-info": x(a)
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "scroll-bar-opacity", "transform-info"])) : z("", !0),
      x(n).isYLarge ? (I(), q(k, {
        key: 2,
        opt: e.value,
        "container-info": x(r),
        "scroll-bar-info": x(n),
        "scroll-bar-opacity": x(g),
        "transform-info": x(a),
        "is-y": ""
      }, null, 8, ["opt", "container-info", "scroll-bar-info", "scroll-bar-opacity", "transform-info"])) : z("", !0)
    ], 4));
  }
});
export {
  Ie as default
};
