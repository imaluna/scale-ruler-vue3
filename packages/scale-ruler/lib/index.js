"use strict";const e=require("vue"),H=e.defineComponent({__name:"CanvasPanel",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},canvasInfo:{type:Object,required:!0}},setup(c){const r=c,t=e.computed(()=>{var u,a;return{position:"absolute",left:0,top:0,width:((u=r.opt)==null?void 0:u.canvasWidth)+"px",height:((a=r.opt)==null?void 0:a.canvasHeight)+"px",transition:"transform 300ms",transformOrigin:"0 0",transform:`translate(${r.canvasInfo.translateX}px, ${r.canvasInfo.translateY}px) scale(${r.canvasInfo.scale})`,...r.opt.canvasStyle}});return(u,a)=>(e.openBlock(),e.createElementBlock("div",{ref:"canvasPanel",style:e.normalizeStyle(t.value)},null,4))}}),R=e.defineComponent({__name:"ScrollBar",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},isY:{type:Boolean,default:!1},scrollBarInfo:{type:Object,required:!0},scrollBarOpacity:{type:Object,required:!0},transformInfo:{type:Object,required:!0}},setup(c){const r=c,{scrollBarOpacity:t,transformInfo:u}=e.toRefs(r),a=e.computed(()=>{const{opt:o,scrollBarInfo:n,isY:d}=r,{scrollBarConfig:l}=o,h={position:"absolute",borderRadius:"4px",backgroundColor:l.bgColor,opacity:r.scrollBarOpacity[d?"yOpacity":"xOpacity"]||0,transition:"opacity 300ms",cursor:"pointer",zIndex:l.zIndex,width:(d?l.barSize:n.width)+"px",height:(d?n.height:l.barSize)+"px"};return d?(h.top=n.top+"px",h.right=0):(h.left=n.left+"px",h.bottom=0),h}),p=e.ref(null),i={};function f(o){if(o.preventDefault(),!t.value.isMouseDown)return;let{translateX:n,translateY:d}=u.value;const l=r.scrollBarInfo,{width:h,height:s}=r.containerInfo;if(r.isY){const y=o.pageY-i.startY;let x=i.top+y;x=Math.min(Math.max(0,x),s-l.height);const O=x*l.totalHeight/s;d=r.opt.containerYPadding-O,u.value.translateY=d}else{const y=o.pageX-i.startX;let x=i.left+y;x=Math.min(Math.max(0,x),h-l.width);const O=x*l.totalWidth/h;n=r.opt.containerXPadding-O,u.value.translateX=n}}return e.onMounted(()=>{if(p.value){const o=p.value,n=r.isY?"yOpacity":"xOpacity";o.addEventListener("mouseenter",()=>{t.value[n]=r.opt.scrollBarConfig.opacity,t.value[r.isY?"xOpacity":"yOpacity"]=0,t.value.isMouseEnter=!0}),o.addEventListener("mouseleave",()=>{t.value.isMouseEnter=!1,t.value[n]=0}),o.addEventListener("mousedown",d=>{t.value.isMouseDown=!0,i.startX=d.pageX,i.startY=d.pageY,i.left=r.scrollBarInfo.left,i.top=r.scrollBarInfo.top,document.addEventListener("mousemove",f)}),document.addEventListener("mouseup",()=>{t.value.isMouseDown&&(t.value.isMouseDown=!1,document.removeEventListener("mousemove",f))})}}),(o,n)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"scrollBarRef",ref:p,style:e.normalizeStyle(a.value)},null,4))}}),P=c=>c<=.25?40:c<=.5?20:c<=1?10:c<=2?5:c<=4?2:1,q=c=>{const r=c.getBoundingClientRect(),t=r.top+(document.body.scrollTop||document.documentElement.scrollTop),u=r.left+(document.body.scrollLeft||document.documentElement.scrollLeft);return{top:t,left:u}},Y=(c,r,t)=>{const{scale:u,translateX:a,translateY:p}=c;return(r-(t?p:a))/u},W=(c,r,t)=>{const{scale:u,translateX:a,translateY:p}=c,i=r*u;return(t?p:a)+i};function z(c,r,t,u,a,p){const i={coordinate:a,translate:u},f=c.length;if(f>0){let o=0;for(;o<f;){const n=c[o];if(Math.abs(a-n)<=t){i.coordinate=n,i.translate=W(r,n,p);break}else if(n>a)break;o++}}return i}const D=(c,r,t,u)=>{e.nextTick(()=>{const a=u.value;if(a){const p=a.offsetWidth,i=a.offsetHeight,{rulerConfig:f}=c,{bgColor:o,fontFamily:n,fontSize:d,lineColor:l,fontColor:h}=f;if(p>0&&i>0){const s=a.getContext("2d");s.clearRect(0,0,p,i),o&&(s.save(),s.fillStyle=o,s.fillRect(0,0,p,i),s.restore());const y=t?f.yRulerWidth:f.xRulerHeight,{translateX:x,translateY:O,scale:v}=r,g=t?O:x,m=P(v),S=m*v,b=window.devicePixelRatio,M=-g,B=Math.floor(M/S),E=Math.floor(((t?i:p)-g)/S);s.save(),s.fillStyle=l,s.font=`${d*b}px ${n}`,s.translate(.5,.5),s.scale(1/b,1/b),t?s.fillRect((y-1)*b,0,1,i*b):s.fillRect(0,(y-1)*b,p*b,1);for(let w=B;w<=E;w++){s.fillStyle=l;const C=(g+w*S)*b;let L=y/4;w%10===0?L=y*4/5:w%5===0&&(L=y/3),t?s.fillRect((y-L)*b,C,L*b,1):(s.fillRect(C,(y-L)*b,1,L*b),w%10===0&&(s.fillStyle=h,s.fillText(String(w*m),C+2*b,(y+8-L)*b)))}if(s.restore(),t){s.font=`${d}px ${n}`;let w=B;for(;w<=E;)if(w%10)w++;else{s.save();const C=g+w*S+y/2;s.translate(C+y/5,C-y*6/5),s.rotate(Math.PI/2),s.fillText(String(w*m),y*4/5,C),w+=10,s.restore()}}}}})},$=(c,r)=>{const t=e.reactive([0]);function u(n,d=!0){const l=t.indexOf(n);d&&l===-1&&t.push(n),!d&&l>-1&&t.splice(l,1)}function a(n,d=!0){Array.isArray(n)?n.forEach(l=>u(l,d)):u(n,d)}function p(n){a(n),t.sort((d,l)=>d-l)}function i(n){a(n,!1)}const f=e.computed(()=>c.positionLineConfig[r?"adsorptionYList":"adsorptionXList"]);e.watch(()=>f.value,n=>{p(n)},{deep:!0});const o=e.computed(()=>r?c.canvasWidth:c.canvasHeight);return e.watch(()=>o.value,(n,d)=>{d!==void 0&&i(d),p(n)},{immediate:!0}),{adsorptionList:t}},F=(c,r,t,u,a,p)=>{let i=1;const f=e.reactive([]);let o=-1,n=!1;function d(l){if(n&&o>-1){l.preventDefault();const{xRulerHeight:h,yRulerWidth:s}=c.value.rulerConfig,y=f[o],x=(a?l.pageY:l.pageX)-y.start,O=y.startTranslate+x,v=O>(a?h:s),g=Y(u.value,O,a),m=z(t,u.value,c.value.positionLineConfig.adsorptionGap,O,g,a);f[o].showTip=v,f[o].translate=m.translate,f[o].coordinate=m.coordinate}}return e.onMounted(()=>{if(p.value){const l=p.value;l.addEventListener("mousedown",h=>{const s=q(l),y=a?h.pageY:h.pageX,x=y-(a?s.top:s.left),O={startTranslate:x,translate:x,start:y,id:i,coordinate:Y(u.value,x,a),showTip:!1,needAnimate:!1};o=i,f[i++]=O,n=!0,document.addEventListener("mousemove",d)}),document.addEventListener("mouseup",()=>{if(document.removeEventListener("mousemove",d),!n||o<0)return;n=!1;const h=f[o],{width:s,height:y}=r.value,{xRulerHeight:x,yRulerWidth:O}=c.value.rulerConfig;h.translate<=(a?x:O)||h.translate>=(a?y:s)?delete f[o]:(f[o].showTip=!1,f[o].needAnimate=!0),o=-1})}}),{positionLineMap:f}},N=(c,r,t,u,a,p,i,f)=>{let o=!1;function n(l){i.value.showTip=l}function d(l){if(!o)return;const h=(a?l.pageY:l.pageX)-i.value.start,s=i.value.startTranslate+h,y=Y(u.value,s,a),x=z(t.value,u.value,c.value.positionLineConfig.adsorptionGap,s,y,a);i.value.coordinate=x.coordinate}e.onMounted(()=>{if(p.value){const l=p.value;l.addEventListener("mouseenter",()=>{n(!0)}),l.addEventListener("mouseleave",()=>{o||n(!1)}),l.addEventListener("mousedown",h=>{h.preventDefault(),o=!0,i.value.showTip=!0;const s=a?h.pageY:h.pageX;i.value.start=s,i.value.startTranslate=i.value.translate,i.value.needAnimate=!1,document.addEventListener("mousemove",d)}),document.addEventListener("mouseup",()=>{if(!o)return;const{translate:h,id:s}=i.value,{width:y,height:x}=r.value,{xRulerHeight:O,yRulerWidth:v}=c.value.rulerConfig;h<=(a?O:v)||h>=(a?x:y)?f(s):(n(!1),i.value.needAnimate=!0),document.removeEventListener("mousemove",d)})}})},K=e.defineComponent({__name:"PositionLine",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},isY:{type:Boolean,default:!1},transformInfo:{type:Object,required:!0},lineInfo:{type:Object,required:!0},adsorptionList:{type:Array,required:!0}},emits:["remove-position-line"],setup(c,{emit:r}){const t=c,{lineInfo:u,adsorptionList:a,transformInfo:p,opt:i,containerInfo:f}=e.toRefs(t),o=e.computed(()=>i.value.positionLineConfig.padding),n=e.computed(()=>2*o.value+1),d=e.computed(()=>W(p.value,u.value.coordinate,t.isY)),l=e.computed(()=>{const{width:m,height:S}=f.value,{isY:b}=t,M=b?`translate(0, ${d.value}px)`:`translate(${d.value}px, 0)`;return{position:"absolute",width:(b?m:n.value)+"px",height:(b?n.value:S)+"px",cursor:b?"row-resize":"col-resize",top:(b?-o.value:0)+"px",left:(b?0:-o.value)+"px",transform:M,zIndex:t.opt.positionLineConfig.zIndex,transition:u.value.needAnimate?"transform 300ms":""}}),h=e.computed(()=>{const{isY:m}=t;return{position:"absolute",width:m?"100%":"1px",height:m?"1px":"100%",backgroundColor:i.value.positionLineConfig.lineColor,top:(m?o.value:0)+"px",left:(m?0:o.value)+"px"}}),s=e.ref({}),y=e.computed(()=>{const{isY:m}=t,{width:S,height:b}=f.value,{tipWidth:M,tipHeight:B}=s.value;let E,w;return M&&B?(w=m?"50%":(d.value+n.value+M>=S?-M:n.value)+"px",E=m?(d.value+n.value+B>=b?-B:n.value)+"px":"50%"):(w=m?"50%":n.value+"px",E=m?n.value+"px":"50%"),{position:"absolute",padding:"5px",lineHeight:"18px",minWidth:"80px",backgroundColor:"rgba(0,0,0,.8)",color:"#fff",fontSize:"12px",borderRadius:"4px",userSelect:"none",textAlign:"center",left:w,top:E,transform:m?"translate(-50%, 0)":"translate(0, -50%)",visibility:u.value.showTip?"visible":"hidden"}}),x=e.ref(null),O=r;function v(m){O("remove-position-line",m)}N(i,f,a,p,t.isY,x,u,v);const g=e.ref(null);return e.onMounted(()=>{if(g.value){const m=g.value,S=m.offsetWidth,b=m.offsetHeight;s.value.tipWidth=S,s.value.tipHeight=b}}),(m,S)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"positionLineRef",ref:x,class:"scale-ruler_position-line",style:e.normalizeStyle(l.value)},[e.createElementVNode("div",{class:"scale-ruler_position-line_inner",style:e.normalizeStyle(h.value)},null,4),e.createElementVNode("div",{class:"scale-ruler_position-line_tip",style:e.normalizeStyle(y.value),ref_key:"tipRef",ref:g},e.toDisplayString((c.isY?"Y":"X")+": "+ +e.unref(u).coordinate.toFixed(2)+" px"),5)],4))}}),V=["width","height"],T=e.defineComponent({__name:"Ruler",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},canvasInfo:{type:Object,required:!0},isY:{type:Boolean,default:!1},transformInfo:{type:Object,required:!0}},setup(c){const r=c,{opt:t,transformInfo:u,containerInfo:a}=e.toRefs(r),p=e.computed(()=>{const{isY:l,containerInfo:h,opt:s}=r;return{width:l?s.rulerConfig.yRulerWidth:h.width,height:l?h.height:s.rulerConfig.xRulerHeight}}),i=e.computed(()=>({position:"absolute",left:0,top:0,zIndex:r.opt.rulerConfig.zIndex+(r.isY?0:1)})),f=e.ref();e.watch([()=>r.containerInfo,()=>r.canvasInfo],()=>{D(r.opt,r.canvasInfo,r.isY,f)},{deep:!0});const{adsorptionList:o}=$(r.opt,r.isY),{positionLineMap:n}=F(t,a,o,u,!r.isY,f);function d(l){delete n[l]}return(l,h)=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[e.createElementVNode("canvas",{ref_key:"rulerRef",ref:f,style:e.normalizeStyle(i.value),width:p.value.width,height:p.value.height},null,12,V),r.opt.usePositionLine?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass("position-line-"+(r.isY?"x":"y"))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(Object.keys(e.unref(n)),s=>(e.openBlock(),e.createBlock(K,{key:s,opt:r.opt,"is-y":!r.isY,"transform-info":r.transformInfo,"container-info":r.containerInfo,"line-info":e.unref(n)[s],"adsorption-list":e.unref(o),onRemovePositionLine:d},null,8,["opt","is-y","transform-info","container-info","line-info","adsorption-list"]))),128))],2)):e.createCommentVNode("",!0)],64))}});function G(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}var _,X;function U(){if(X)return _;X=1;var c=function(g){return r(g)&&!t(g)};function r(v){return!!v&&typeof v=="object"}function t(v){var g=Object.prototype.toString.call(v);return g==="[object RegExp]"||g==="[object Date]"||p(v)}var u=typeof Symbol=="function"&&Symbol.for,a=u?Symbol.for("react.element"):60103;function p(v){return v.$$typeof===a}function i(v){return Array.isArray(v)?[]:{}}function f(v,g){return g.clone!==!1&&g.isMergeableObject(v)?x(i(v),v,g):v}function o(v,g,m){return v.concat(g).map(function(S){return f(S,m)})}function n(v,g){if(!g.customMerge)return x;var m=g.customMerge(v);return typeof m=="function"?m:x}function d(v){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(v).filter(function(g){return Object.propertyIsEnumerable.call(v,g)}):[]}function l(v){return Object.keys(v).concat(d(v))}function h(v,g){try{return g in v}catch{return!1}}function s(v,g){return h(v,g)&&!(Object.hasOwnProperty.call(v,g)&&Object.propertyIsEnumerable.call(v,g))}function y(v,g,m){var S={};return m.isMergeableObject(v)&&l(v).forEach(function(b){S[b]=f(v[b],m)}),l(g).forEach(function(b){s(v,b)||(h(v,b)&&m.isMergeableObject(g[b])?S[b]=n(b,m)(v[b],g[b],m):S[b]=f(g[b],m))}),S}function x(v,g,m){m=m||{},m.arrayMerge=m.arrayMerge||o,m.isMergeableObject=m.isMergeableObject||c,m.cloneUnlessOtherwiseSpecified=f;var S=Array.isArray(g),b=Array.isArray(v),M=S===b;return M?S?m.arrayMerge(v,g,m):y(v,g,m):f(g,m)}x.all=function(g,m){if(!Array.isArray(g))throw new Error("first argument should be an array");return g.reduce(function(S,b){return x(S,b,m)},{})};var O=x;return _=O,_}var J=U();const I=G(J),j={scale:1,canScale:!0,maxScale:10,minScale:.1,autoCenter:!0,autoScale:!0,containerAutoSize:!1,containerWidth:1e3,containerHeight:500,containerXPadding:80,containerYPadding:80,canvasWidth:1920,canvasHeight:2e3,proxyScaleKey:!0,useScrollBar:!0,useRuler:!0,usePositionLine:!0,positionLineConfig:{lineColor:"#24aa61",padding:3,adsorptionXList:[],adsorptionYList:[],adsorptionGap:4,zIndex:300},canvasStyle:{},scrollBarConfig:{bgColor:"#000000",opacity:.4,zIndex:500,barSize:8},rulerConfig:{yRulerWidth:30,xRulerHeight:30,bgColor:"#efefef",fontColor:"#000000",fontSize:12,fontFamily:"Arial",lineColor:"#000000",zIndex:400},onScale:()=>{},onMove:()=>{}},Q=function(){const c={};for(const r in j){const t=j[r];typeof t=="object"&&t!==null?c[r]=()=>t:c[r]=t}return c}(),Z=(c,r)=>{const t=e.reactive({width:0,height:0,originWidth:0,originHeight:0});function u(f,o){new ResizeObserver(d=>{for(const l of d)if(l.target===o){const h=o.offsetWidth,s=o.offsetHeight;(h!==t.originWidth||s!==t.originHeight)&&a(f,o)}}).observe(o)}function a(f,o,n=!1){const d=f.value;d.containerAutoSize?(t.width=o.offsetWidth,t.height=o.offsetHeight,t.originWidth=t.width,t.originHeight=t.height,n&&u(f,o)):(t.width=d.containerWidth,t.height=d.containerHeight);const l=getComputedStyle(o);l.boxSizing==="border-box"&&(t.width-=parseFloat(l.borderLeftWidth)+parseFloat(l.borderRightWidth),t.height-=parseFloat(l.borderTopWidth)+parseFloat(l.borderBottomWidth)),l.position==="static"&&(t.position="relative")}e.onMounted(()=>{const f=r.value;f&&a(c,f,!0)});const p=e.computed(()=>({width:t.width,height:t.height})),i=e.computed(()=>{const f=c.value,o={overflow:"hidden"};return f.containerAutoSize||(o.width=t.width+"px",o.height=t.height+"px"),t.position&&(o.position=t.position),o});return{containerInfo:p,containerStyle:i}},ee=(c,r)=>{const t=e.reactive({});return e.watch(()=>r.value,()=>{const u=c.value;let a=0,p=0,{scale:i}=u;const{autoCenter:f,autoScale:o}=u,{width:n,height:d}=r.value;if(o){const s=(n-2*u.containerXPadding)/u.canvasWidth,y=(d-2*u.containerYPadding)/u.canvasHeight;i=Math.min(s,y)}t.scale=i;let l=0,h=0;a=u.canvasWidth*i,p=u.canvasHeight*i,f&&(l=Math.floor((n-a)/2),h=Math.floor((d-p)/2),t.translateX=l,t.translateY=h)},{deep:!0}),{transformInfo:t}},te=(c,r,t)=>({scrollBarInfo:e.computed(()=>{const a=c.value,{width:p,height:i}=r.value,{translateX:f,translateY:o,scale:n}=t,d=a.canvasWidth*n+2*a.containerXPadding,l=a.canvasHeight*n+2*a.containerYPadding,h=p<d,s=i<l,y=h||s,x=p*((a.containerXPadding-f)/d),O=i*((a.containerYPadding-o)/l),v=p/d*p,g=i/l*i;return{totalHeight:l,totalWidth:d,left:x,top:O,width:v,height:g,isYLarge:s,isXLarge:h,isLarge:y}})});function k(c,r,t){const u=c.value,{containerXPadding:a,containerYPadding:p,canvasWidth:i,canvasHeight:f}=u,o=i*t,n=f*t,{width:d,height:l}=r.value,h=Math.max((d-o)/2,a),s=Math.max((l-n)/2,p),y=o+2*a>d?d-(o+a):h,x=n+2*p>l?l-(n+p):s;return{maxTranslateX:h,maxTranslateY:s,minTranslateX:y,minTranslateY:x}}const ne=(c,r,t)=>({boundaryInfo:e.computed(()=>k(c,r,t.scale))}),A=(c,r,t,u)=>{const a=c.value;let{translateX:p,translateY:i,scale:f}=t;u=Math.min(Math.max(u,a.minScale),a.maxScale);const o=u-f,n=k(c,r,u);p-=o*a.canvasWidth/2,i-=o*a.canvasHeight/2,p=Math.max(Math.min(p,n.maxTranslateX),n.minTranslateX),i=Math.max(Math.min(i,n.maxTranslateY),n.minTranslateY),t.scale=u,t.translateX=p,t.translateY=i},oe=(c,r,t)=>{c.value.proxyScaleKey&&document.addEventListener("keydown",u=>{if(c.value.canScale){const a=u.keyCode;if((u.metaKey||u.ctrlKey)&&(a===187||a===189)){u.preventDefault();const p=t.scale+(a===187?.05:-.05);A(c,r,t,p)}}})},re=(c,r,t,u,a,p)=>{let i=null;const f=e.reactive({xOpacity:0,yOpacity:0,isMouseDown:!1,isMouseEnter:!1});return e.onMounted(()=>{a.value&&a.value.addEventListener("wheel",o=>{if(o.metaKey||o.ctrlKey){o.preventDefault();const n=-1*o.deltaY/100,d=t.scale+n;A(c,r,t,d)}else{if(!p.value.isLarge||f.isMouseDown)return;o.preventDefault();let{translateX:n,translateY:d}=t;i&&clearTimeout(i);const l=-o.deltaX,h=-o.deltaY;let s="";const{opacity:y=.4}=c.value.scrollBarConfig,{isXLarge:x,isYLarge:O}=p.value,{maxTranslateX:v,minTranslateX:g,maxTranslateY:m,minTranslateY:S}=u.value;x&&Math.abs(l)>Math.abs(h)&&(n+=l,n=Math.max(Math.min(n,v),g),f.xOpacity=y,f.yOpacity=0,t.translateX=n,s="x"),O&&Math.abs(h)>Math.abs(l)&&(s="y",d+=h,d=Math.max(Math.min(d,m),S),f.yOpacity=y,f.xOpacity=0,t.translateY=d),s&&(i=setTimeout(()=>{f.isMouseEnter||(f[s==="y"?"yOpacity":"xOpacity"]=0)},1e3))}})}),{scrollBarOpacity:f}},ae=e.defineComponent({__name:"ScaleRuler",props:e.mergeDefaults({scale:{},minScale:{},maxScale:{},canScale:{type:Boolean},autoCenter:{type:Boolean},autoScale:{type:Boolean},containerAutoSize:{type:Boolean},containerWidth:{},containerHeight:{},containerXPadding:{},containerYPadding:{},canvasWidth:{},canvasHeight:{},proxyScaleKey:{type:Boolean},useScrollBar:{type:Boolean},useRuler:{type:Boolean},usePositionLine:{type:Boolean},positionLineConfig:{},canvasStyle:{},scrollBarConfig:{},rulerConfig:{},onScale:{type:Function},onMove:{type:Function}},Q),setup(c){const r=c,t=e.ref(I(j,r)),u=e.ref(null),{containerInfo:a,containerStyle:p}=Z(t,u),{transformInfo:i}=ee(t,a),{boundaryInfo:f}=ne(t,a,i),o=e.computed(()=>Object.assign({},i,f.value)),{scrollBarInfo:n}=te(t,a,i),d=e.reactive({}),l=e.watch(()=>o.value,s=>{if(s.scale){const y={scale:s.scale,translateX:s.translateX,translateY:s.translateY};d.scale||Object.assign(d,y),l()}});e.watch(()=>r,()=>{t.value=I(t.value,r)},{deep:!0}),oe(t,a,i);const{scrollBarOpacity:h}=re(t,a,i,f,u,n);return(s,y)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"container",ref:u,style:e.normalizeStyle(e.unref(p))},[t.value.useRuler?(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createVNode(T,{opt:t.value,"container-info":e.unref(a),"canvas-info":o.value,"transform-info":e.unref(i)},null,8,["opt","container-info","canvas-info","transform-info"]),e.createVNode(T,{"is-y":"",opt:t.value,"container-info":e.unref(a),"canvas-info":o.value,"transform-info":e.unref(i)},null,8,["opt","container-info","canvas-info","transform-info"])],64)):e.createCommentVNode("",!0),e.createVNode(H,{"container-info":e.unref(a),opt:t.value,"canvas-info":o.value,"transform-info":e.unref(i)},{default:e.withCtx(()=>[e.renderSlot(s.$slots,"default")]),_:3},8,["container-info","opt","canvas-info","transform-info"]),e.unref(n).isXLarge?(e.openBlock(),e.createBlock(R,{key:1,opt:t.value,"container-info":e.unref(a),"scroll-bar-info":e.unref(n),"scroll-bar-opacity":e.unref(h),"transform-info":e.unref(i)},null,8,["opt","container-info","scroll-bar-info","scroll-bar-opacity","transform-info"])):e.createCommentVNode("",!0),e.unref(n).isYLarge?(e.openBlock(),e.createBlock(R,{key:2,opt:t.value,"container-info":e.unref(a),"scroll-bar-info":e.unref(n),"scroll-bar-opacity":e.unref(h),"transform-info":e.unref(i),"is-y":""},null,8,["opt","container-info","scroll-bar-info","scroll-bar-opacity","transform-info"])):e.createCommentVNode("",!0)],4))}});module.exports=ae;
