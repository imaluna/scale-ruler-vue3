"use strict";const n=require("vue"),E=n.defineComponent({__name:"CanvasPanel",props:{containerInfo:{type:Object},opt:Object},setup(i){const s=i,a=n.computed(()=>{var c,u;return{position:"absolute",left:0,top:0,width:((c=s.opt)==null?void 0:c.canvasWidth)+"px",height:((u=s.opt)==null?void 0:u.canvasHeight)+"px",transition:"transform 300ms",transformOrigin:"0 0"}});return(c,u)=>(n.openBlock(),n.createElementBlock("div",{ref:"canvasPanel",style:n.normalizeStyle(a.value)},null,4))}});function B(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var j,C;function W(){if(C)return j;C=1;var i=function(t){return s(t)&&!a(t)};function s(e){return!!e&&typeof e=="object"}function a(e){var t=Object.prototype.toString.call(e);return t==="[object RegExp]"||t==="[object Date]"||m(e)}var c=typeof Symbol=="function"&&Symbol.for,u=c?Symbol.for("react.element"):60103;function m(e){return e.$$typeof===u}function v(e){return Array.isArray(e)?[]:{}}function y(e,t){return t.clone!==!1&&t.isMergeableObject(e)?b(v(e),e,t):e}function l(e,t,r){return e.concat(t).map(function(p){return y(p,r)})}function d(e,t){if(!t.customMerge)return b;var r=t.customMerge(e);return typeof r=="function"?r:b}function g(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[]}function h(e){return Object.keys(e).concat(g(e))}function f(e,t){try{return t in e}catch{return!1}}function O(e,t){return f(e,t)&&!(Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))}function A(e,t,r){var p={};return r.isMergeableObject(e)&&h(e).forEach(function(o){p[o]=y(e[o],r)}),h(t).forEach(function(o){O(e,o)||(f(e,o)&&r.isMergeableObject(t[o])?p[o]=d(o,r)(e[o],t[o],r):p[o]=y(t[o],r))}),p}function b(e,t,r){r=r||{},r.arrayMerge=r.arrayMerge||l,r.isMergeableObject=r.isMergeableObject||i,r.cloneUnlessOtherwiseSpecified=y;var p=Array.isArray(t),o=Array.isArray(e),w=p===o;return w?p?r.arrayMerge(e,t,r):A(e,t,r):y(t,r)}b.all=function(t,r){if(!Array.isArray(t))throw new Error("first argument should be an array");return t.reduce(function(p,o){return b(p,o,r)},{})};var _=b;return j=_,j}var P=W();const M=B(P),S={scale:1,canScale:!0,maxScale:10,minScale:.1,autoCenter:!0,autoScale:!0,containerAutoSize:!1,containerWidth:1e3,containerHeight:500,containerXPadding:80,containerYPadding:80,canvasWidth:1920,canvasHeight:2e3,proxyScaleKey:!0,useScrollBar:!0,useRuler:!0,usePositionLine:!0,positionLineConfig:{lineColor:"#24aa61",padding:3,adsorptionXList:[],adsorptionYList:[],adsorptionGap:4},canvasStyle:{},scrollBarConfig:{bgColor:"#000000",opacity:.4},rulerConfig:{yRulerWidth:30,xRulerHeight:30,bgColor:"#efefef",fontColor:"#000000",fontSize:12,fontFamily:"Arial",lineColor:"#000000"},onScale:()=>{},onMove:()=>{}},R=function(){const i={};for(const s in S){const a=S[s];typeof a=="object"&&a!==null?i[s]=()=>a:i[s]=a}return i}(),z=n.defineComponent({__name:"ScaleRuler",props:n.mergeDefaults({scale:{},minScale:{},maxScale:{},canScale:{type:Boolean},autoCenter:{type:Boolean},autoScale:{type:Boolean},containerAutoSize:{type:Boolean},containerWidth:{},containerHeight:{},containerXPadding:{},containerYPadding:{},canvasWidth:{},canvasHeight:{},proxyScaleKey:{type:Boolean},useScrollBar:{type:Boolean},useRuler:{type:Boolean},usePositionLine:{type:Boolean},positionLineConfig:{},canvasStyle:{},scrollBarConfig:{},rulerConfig:{},onScale:{type:Function},onMove:{type:Function}},R),setup(i){const s=i,a=n.ref(S);n.watch(()=>s,()=>{a.value=M(a.value,s),console.log(a.value)},{deep:!0});const c=n.reactive({}),u=n.reactive({}),m=n.ref(null);function v(){if(!m.value)return;const l=m.value;let d=0,g=0;const h=a.value;if(h.containerAutoSize)d=l.offsetWidth,g=l.offsetHeight,c.originWidth=d,c.originHeight=g,c.hasAddResize||y(l);else{if(!h.containerWidth||!h.containerHeight)throw Error("");d=h.containerWidth,g=h.containerHeight,u.width=d,u.height=g}const f=getComputedStyle(l);f.boxSizing==="border-box"&&(d-=parseFloat(f.borderLeftWidth)+parseFloat(f.borderRightWidth),g-=parseFloat(f.borderTopWidth)+parseFloat(f.borderBottomWidth)),c.width=d,c.height=g,f.position==="static"&&(u.position="relative"),u.overflow="hidden"}function y(l){c.hasAddResize=!0,new ResizeObserver(g=>{for(const h of g)if(h.target===l){const f=l.offsetWidth,O=l.offsetHeight;(f!==c.originWidth||O!==c.originHeight)&&v()}}).observe(l)}return n.onMounted(()=>{a.value=M(S,s),v()}),(l,d)=>(n.openBlock(),n.createElementBlock("div",{ref_key:"container",ref:m,style:n.normalizeStyle(u)},[n.createVNode(E,{"container-info":c,opt:a.value},{default:n.withCtx(()=>[n.renderSlot(l.$slots,"default")]),_:3},8,["container-info","opt"])],4))}});module.exports=z;
