"use strict";const e=require("vue"),N=o=>o<=.25?40:o<=.5?20:o<=1?10:o<=2?5:o<=4?2:1,F=o=>o.getBoundingClientRect(),Y=(o,g,n)=>{const{scale:r,translateX:t,translateY:u}=o;return(g-(n?u:t))/r},I=(o,g,n)=>{const{scale:r,translateX:t,translateY:u}=o,c=g*r;return(n?u:t)+c};function j(o,g,n,r,t,u){const c={coordinate:t,translate:r},p=o.length;if(p>0){let s=0;for(;s<p;){const a=o[s];if(Math.abs(t-a)<=Math.max(n,n/g.scale)){c.coordinate=a,c.translate=I(g,a,u);break}else if(a>t)break;s++}}return c}function z(o,g){return g}function E(o){return o.sort((g,n)=>g-n)}const K=e.defineComponent({__name:"CanvasPanel",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},transformInfo:{type:Object,required:!0}},setup(o){const g=o,n=e.computed(()=>{var r,t;return{position:"absolute",left:0,top:0,width:((r=g.opt)==null?void 0:r.canvasWidth)+"px",height:((t=g.opt)==null?void 0:t.canvasHeight)+"px",transformOrigin:"0 0",transform:`translate(${g.transformInfo.translateX}px, ${g.transformInfo.translateY}px) scale(${g.transformInfo.scale})`,...g.opt.canvasStyle}});return(r,t)=>(e.openBlock(),e.createElementBlock("div",{ref:"canvasPanel",style:e.normalizeStyle(n.value)},[e.renderSlot(r.$slots,"default")],4))}});function A(o,g,n,r){if(!o)return;function t(u){u.preventDefault(),typeof n=="function"&&n(u)}o.addEventListener("mousedown",u=>{u.button===0&&(u.preventDefault(),typeof g=="function"&&g(u),document.addEventListener("mousemove",t))}),document.addEventListener("mouseup",u=>{document.removeEventListener("mousemove",t),typeof r=="function"&&r(u)})}const W=e.defineComponent({__name:"ScrollBar",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},isY:{type:Boolean,default:!1},scrollBarInfo:{type:Object,required:!0},globalInfo:{type:Object,required:!0},transformInfo:{type:Object,required:!0}},emits:["onMove"],setup(o,{emit:g}){const n=o,r=g,{globalInfo:t,transformInfo:u}=e.toRefs(n),c=e.computed(()=>{const{opt:b,scrollBarInfo:i,isY:m}=n,{scrollBarConfig:L}=b,y={position:"absolute",borderRadius:"4px",backgroundColor:L.bgColor,opacity:n.globalInfo[m?"yOpacity":"xOpacity"]||0,transition:"opacity 300ms",cursor:"pointer",zIndex:L.zIndex,width:(m?L.barSize:i.width)+"px",height:(m?i.height:L.barSize)+"px"};return m?(y.top=i.top+"px",y.right=0):(y.left=i.left+"px",y.bottom=0),y}),p=e.ref(null),s={};function a(b){if(b.preventDefault(),!t.value.scrollBarMouseDown)return;let{translateX:i,translateY:m}=u.value;const L=n.scrollBarInfo,{width:y,height:l}=n.containerInfo;if(n.isY){const f=b.pageY-s.startY;let x=s.top+f;x=Math.min(Math.max(0,x),l-L.height);const C=x*L.totalHeight/l;m=n.opt.containerYPadding-C,u.value.translateY=m}else{const f=b.pageX-s.startX;let x=s.left+f;x=Math.min(Math.max(0,x),y-L.width);const C=x*L.totalWidth/y;i=n.opt.containerXPadding-C,u.value.translateX=i}r("onMove",u.value.translateX,u.value.translateY)}function d(b){t.value.scrollBarMouseDown=!0,s.startX=b.pageX,s.startY=b.pageY,s.left=n.scrollBarInfo.left,s.top=n.scrollBarInfo.top}function v(){t.value.scrollBarMouseDown&&(t.value.scrollBarMouseDown=!1)}return e.onMounted(()=>{if(p.value){const b=p.value,i=n.isY?"yOpacity":"xOpacity";b.addEventListener("mouseenter",()=>{t.value[i]=n.opt.scrollBarConfig.opacity,t.value[n.isY?"xOpacity":"yOpacity"]=0,t.value.scrollBarEnter=!0}),b.addEventListener("mouseleave",()=>{t.value.scrollBarMouseDown||(t.value.scrollBarEnter=!1,t.value[i]=0)}),A(b,d,a,v)}}),(b,i)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"scrollBarRef",ref:p,style:e.normalizeStyle(c.value)},null,4))}}),G=(o,g,n,r)=>{e.nextTick(()=>{const t=r.value;if(t){const u=t.offsetWidth,c=t.offsetHeight,{rulerConfig:p}=o,{bgColor:s,fontFamily:a,fontSize:d,lineColor:v,fontColor:b}=p;if(u>0&&c>0){const i=t.getContext("2d");i.clearRect(0,0,u,c),s&&(i.save(),i.fillStyle=s,i.fillRect(0,0,u,c),i.restore());const m=n?p.yRulerWidth:p.xRulerHeight,{translateX:L,translateY:y,scale:l}=g,f=n?y:L,x=N(l),C=x*l,h=window.devicePixelRatio,O=-f,S=Math.floor(O/C),_=Math.floor(((n?c:u)-f)/C);i.save(),i.fillStyle=v,i.font=`${d*h}px ${a}`,i.translate(.5,.5),i.scale(1/h,1/h),n?i.fillRect((m-1)*h,0,1,c*h):i.fillRect(0,(m-1)*h,u*h,1);for(let M=S;M<=_;M++){i.fillStyle=v;const w=(f+M*C)*h;let B=m/4;M%10===0?B=m*4/5:M%5===0&&(B=m/3),n?i.fillRect((m-B)*h,w,B*h,1):(i.fillRect(w,(m-B)*h,1,B*h),M%10===0&&(i.fillStyle=b,i.fillText(String(M*x),w+2*h,(m+8-B)*h)))}if(i.restore(),n){i.font=`${d}px ${a}`,i.fillStyle=v;let M=S;for(;M<=_;)if(M%10)M++;else{i.save();const w=f+M*C+m/2;i.translate(w+m/5,w-m*6/5),i.rotate(Math.PI/2),i.fillText(String(M*x),m*4/5,w),M+=10,i.restore()}}}}})},V=(o,g,n)=>{const r=e.computed(()=>E(o.value.positionLineConfig[g?"adsorptionYList":"adsorptionXList"])),t=e.reactive(r.value);p(0);function u(d,v=!0){const b=t.indexOf(d);v&&b===-1&&t.push(d),!v&&b>-1&&t.splice(b,1),v&&E(t)}function c(d,v=!0){Array.isArray(d)?d.forEach(b=>u(b,v)):u(d,v),n(t)}function p(d){c(d)}function s(d){c(d,!1)}e.watch(()=>r.value,(d,v)=>{E(d),d.join(",")!==E(t).join(",")&&((v==null?void 0:v.length)>0&&s(v),p(d))});const a=e.computed(()=>g?o.value.canvasHeight:o.value.canvasWidth);return e.watch(()=>a.value,(d,v)=>{v!==void 0&&s(v),p(d)},{immediate:!0}),{adsorptionList:t,modifyAdsorptionList:c}},U=(o,g,n,r,t,u,c)=>{let p=1;const s=e.reactive([]);let a=-1,d=!1;function v(i){if(d&&a>-1){i.preventDefault();const{xRulerHeight:m,yRulerWidth:L}=o.value.rulerConfig,y=s[a],l=(t?i.pageY:i.pageX)-y.start,f=y.startTranslate+l,x=f>(t?m:L),C=Y(r.value,f,t),h=j(n,r.value,o.value.positionLineConfig.adsorptionGap,f,C,t);s[a].showTip=x,s[a].translate=h.translate,s[a].coordinate=h.coordinate}}function b(){if(!d||a<0)return;d=!1;const i=s[a],{width:m,height:L}=g.value,{xRulerHeight:y,yRulerWidth:l}=o.value.rulerConfig;if(i.translate<=(t?y:l)||i.translate>=(t?L:m))delete s[a];else{const f=j(n,r.value,o.value.positionLineConfig.adsorptionGap,i.translate,i.coordinate,t);s[a].translate=f.translate,s[a].coordinate=f.coordinate,c()}a=-1}return e.onMounted(()=>{if(u.value){let i=function(L){const y=F(m),l=t?L.pageY:L.pageX,f=l-(t?y.y:y.x),x={startTranslate:f,translate:f,start:l,id:p,coordinate:Y(r.value,f,t),showTip:!1,show:!0};a=p,s[p++]=x,d=!0};const m=u.value;A(m,i,v,b)}}),{positionLineMap:s}},J={t:"1737358597390",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4475",width:"128",height:"128"},Q=["fill"],Z=e.defineComponent({__name:"RemoveIcon",props:{fillColor:String},setup(o){return(g,n)=>(e.openBlock(),e.createElementBlock("svg",J,[e.createElementVNode("path",{d:"M555.096563 512.000978L894.74651 172.351031a29.254124 29.254124 0 0 0 8.626944-20.779801c0-16.210984-13.14293-29.350001-29.350001-29.350001a29.244341 29.244341 0 0 0-20.752407 8.597594l-0.001957-0.001957-339.679297 339.677341L173.918321 130.822736a29.256081 29.256081 0 0 0-20.756321-8.601507c-16.209027 0-29.351957 13.140974-29.351957 29.350001a29.252167 29.252167 0 0 0 8.59955 20.754364l339.677341 339.677341-339.679298 339.677341a29.248254 29.248254 0 0 0-8.59955 20.752407c0 16.209027 13.14293 29.348044 29.351957 29.348044 8.108427 0 15.445927-3.2872 20.756321-8.601507l339.673428-339.671471 339.679297 339.679298 0.001957-0.001957a29.252167 29.252167 0 0 0 20.752407 8.597594c16.20707 0 29.350001-13.139017 29.350001-29.350001 0-8.120167-3.300897-15.465494-8.626944-20.7798L555.096563 512.000978z",fill:o.fillColor,"p-id":"4476"},null,8,Q)]))}}),ee=(o,g,n,r,t,u,c,p,s)=>{let a=!1;const d=e.reactive({});function v(y){c.value.showTip=y}function b(y){if(!a)return;const l=(t?y.pageY:y.pageX)-c.value.start,f=c.value.startTranslate+l,x=Y(r.value,f,t),C=j(n.value,r.value,o.value.positionLineConfig.adsorptionGap,f,x,t);c.value.coordinate=C.coordinate,c.value.translate=C.translate}function i(y){a=!0,c.value.showTip=!0;const l=t?y.pageY:y.pageX;c.value.start=l,c.value.startTranslate=I(r.value,c.value.coordinate,t)}function m(){if(!a)return;a=!1;const{translate:y,id:l}=c.value,{width:f,height:x}=g.value,{xRulerHeight:C,yRulerWidth:h}=o.value.rulerConfig;if(y<=(t?C:h)||y>=(t?x:f))p(l);else{const O=j(n.value,r.value,o.value.positionLineConfig.adsorptionGap,y,c.value.coordinate,t);c.value.coordinate=O.coordinate,c.value.translate=O.translate,s()}}function L(){d.show=!1,document.removeEventListener("click",L)}return e.onMounted(()=>{if(u.value){const y=u.value;y.addEventListener("mouseenter",()=>{v(!0)}),y.addEventListener("mouseleave",()=>{a||v(!1)}),y.addEventListener("contextmenu",l=>{l.preventDefault();let f=l.pageX+10,x=l.pageY-(t?20:10);d.top=x,d.left=f,d.show=!0,document.addEventListener("click",L)}),A(y,i,b,m)}}),{removeIconInfo:d}},te=e.defineComponent({__name:"PositionLine",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},isY:{type:Boolean,default:!1},transformInfo:{type:Object,required:!0},lineInfo:{type:Object,required:!0},adsorptionList:{type:Array,required:!0}},emits:["removePositionLine","positionLineChange"],setup(o,{emit:g}){const n=o,{lineInfo:r,adsorptionList:t,transformInfo:u,opt:c,containerInfo:p}=e.toRefs(n),s=e.computed(()=>c.value.positionLineConfig.padding),a=e.computed(()=>2*s.value+1),d=e.computed(()=>c.value.positionLineConfig.removeIcon||Z),v=e.computed(()=>I(u.value,r.value.coordinate,n.isY)),b=e.computed(()=>{const{width:S,height:_}=p.value,{isY:M}=n,w=M?`translate(0, ${v.value}px)`:`translate(${v.value}px, 0)`;return{display:r.value.show?"block":"none",width:(M?S:a.value)+"px",height:(M?a.value:_)+"px",cursor:M?"row-resize":"col-resize",top:(M?-s.value:0)+"px",left:(M?0:-s.value)+"px",transform:w,zIndex:n.opt.positionLineConfig.zIndex}}),i=e.computed(()=>{const{isY:S}=n;return{width:S?"100%":"1px",height:S?"1px":"100%",backgroundColor:c.value.positionLineConfig.lineColor,top:(S?s.value:0)+"px",left:(S?0:s.value)+"px"}}),m=e.ref({}),L=e.computed(()=>{const{isY:S}=n,{width:_,height:M}=p.value,{tipWidth:w,tipHeight:B}=m.value;let R,P;return w&&B?(P=S?"50%":(v.value+a.value+w>=_?-w:a.value)+"px",R=S?(v.value+a.value+B>=M?-B:a.value)+"px":"50%"):(P=S?"50%":a.value+"px",R=S?a.value+"px":"50%"),{padding:"5px",lineHeight:"18px",minWidth:"80px",backgroundColor:"rgba(0,0,0,.8)",color:"#fff",fontSize:"12px",borderRadius:"4px",userSelect:"none",textAlign:"center",left:P,top:R,transform:S?"translate(-50%, 0)":"translate(0, -50%)",visibility:r.value.showTip?"visible":"hidden"}}),y=e.ref(null),l=g;function f(S){l("removePositionLine",S)}function x(){l("positionLineChange")}const{removeIconInfo:C}=ee(c,p,t,u,n.isY,y,r,f,x),h=e.computed(()=>({top:C.top+"px",left:C.left+"px"})),O=e.ref(null);return e.onMounted(()=>{if(O.value){const S=O.value,_=S.offsetWidth,M=S.offsetHeight;m.value.tipWidth=_,m.value.tipHeight=M}}),(S,_)=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[e.createElementVNode("div",{ref_key:"positionLineRef",ref:y,class:"scale-ruler_position-line",style:e.normalizeStyle(b.value)},[e.createElementVNode("div",{class:"scale-ruler_position-line_inner",style:e.normalizeStyle(i.value)},null,4),e.createElementVNode("div",{class:"scale-ruler_position-line_tip",style:e.normalizeStyle(L.value),ref_key:"tipRef",ref:O},e.toDisplayString((o.isY?"Y":"X")+": "+ +e.unref(r).coordinate.toFixed(2)+" px"),5)],4),e.withDirectives(e.createVNode(e.unref(d),{class:"scale-ruler_position-line_remove",style:e.normalizeStyle(h.value),"fill-color":e.unref(c).positionLineConfig.removeIconFillColor,onClick:_[0]||(_[0]=M=>f(e.unref(r).id))},null,8,["style","fill-color"]),[[e.vShow,e.unref(C).show]])],64))}}),ne=(o,g)=>{const n=o.__vccOpts||o;for(const[r,t]of g)n[r]=t;return n},oe=ne(te,[["__scopeId","data-v-6845710d"]]),re=["width","height"],H=e.defineComponent({__name:"Ruler",props:{containerInfo:{type:Object,required:!0},opt:{type:Object,required:!0},isY:{type:Boolean,default:!1},transformInfo:{type:Object,required:!0}},emits:["adsorptionLineChange","positionLineChange"],setup(o,{expose:g,emit:n}){const r=o,{opt:t,transformInfo:u,containerInfo:c}=e.toRefs(r),p=e.computed(()=>{const{isY:h,containerInfo:O,opt:S}=r;return{width:h?S.rulerConfig.yRulerWidth:O.width,height:h?O.height:S.rulerConfig.xRulerHeight}}),s=e.computed(()=>({position:"absolute",left:0,top:0,zIndex:r.opt.rulerConfig.zIndex+(r.isY?0:1)})),a=e.ref();e.watch([()=>r.containerInfo,()=>r.transformInfo],()=>{G(r.opt,r.transformInfo,r.isY,a)},{deep:!0});const d=n;function v(h){d("adsorptionLineChange",h,!r.isY)}const{adsorptionList:b,modifyAdsorptionList:i}=V(t,!r.isY,v),{positionLineMap:m}=U(t,c,b,u,!r.isY,a,L);function L(){const h=m.filter(O=>!!O.show).map(O=>O.coordinate);d("positionLineChange",h,!r.isY)}function y(h){delete m[h],L()}function l(){Object.keys(m).forEach(h=>{y(h)}),L()}function f(h=!0){Object.keys(m).forEach(O=>{m[O].show=h}),L()}const x=e.ref(!0);function C(h=!0){x.value=h,f(h)}return g({modifyAdsorptionList:i,removeAllPositionLine:l,togglePositionLine:f,toggleRuler:C}),(h,O)=>(e.openBlock(),e.createElementBlock(e.Fragment,null,[e.withDirectives(e.createElementVNode("canvas",{ref_key:"rulerRef",ref:a,style:e.normalizeStyle(s.value),width:p.value.width,height:p.value.height},null,12,re),[[e.vShow,x.value]]),r.opt.usePositionLine?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass("position-line-"+(r.isY?"x":"y"))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(Object.keys(e.unref(m)),S=>(e.openBlock(),e.createBlock(oe,{key:S,opt:r.opt,"is-y":!r.isY,"transform-info":r.transformInfo,"container-info":r.containerInfo,"line-info":e.unref(m)[S],"adsorption-list":e.unref(b),onRemovePositionLine:y,onPositionLineChange:L},null,8,["opt","is-y","transform-info","container-info","line-info","adsorption-list"]))),128))],2)):e.createCommentVNode("",!0)],64))}});function ie(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var X,D;function ae(){if(D)return X;D=1;var o=function(f){return g(f)&&!n(f)};function g(l){return!!l&&typeof l=="object"}function n(l){var f=Object.prototype.toString.call(l);return f==="[object RegExp]"||f==="[object Date]"||u(l)}var r=typeof Symbol=="function"&&Symbol.for,t=r?Symbol.for("react.element"):60103;function u(l){return l.$$typeof===t}function c(l){return Array.isArray(l)?[]:{}}function p(l,f){return f.clone!==!1&&f.isMergeableObject(l)?L(c(l),l,f):l}function s(l,f,x){return l.concat(f).map(function(C){return p(C,x)})}function a(l,f){if(!f.customMerge)return L;var x=f.customMerge(l);return typeof x=="function"?x:L}function d(l){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(l).filter(function(f){return Object.propertyIsEnumerable.call(l,f)}):[]}function v(l){return Object.keys(l).concat(d(l))}function b(l,f){try{return f in l}catch{return!1}}function i(l,f){return b(l,f)&&!(Object.hasOwnProperty.call(l,f)&&Object.propertyIsEnumerable.call(l,f))}function m(l,f,x){var C={};return x.isMergeableObject(l)&&v(l).forEach(function(h){C[h]=p(l[h],x)}),v(f).forEach(function(h){i(l,h)||(b(l,h)&&x.isMergeableObject(f[h])?C[h]=a(h,x)(l[h],f[h],x):C[h]=p(f[h],x))}),C}function L(l,f,x){x=x||{},x.arrayMerge=x.arrayMerge||s,x.isMergeableObject=x.isMergeableObject||o,x.cloneUnlessOtherwiseSpecified=p;var C=Array.isArray(f),h=Array.isArray(l),O=C===h;return O?C?x.arrayMerge(l,f,x):m(l,f,x):p(f,x)}L.all=function(f,x){if(!Array.isArray(f))throw new Error("first argument should be an array");return f.reduce(function(C,h){return L(C,h,x)},{})};var y=L;return X=y,X}var le=ae();const $=ie(le),k={scale:1,canScale:!0,maxScale:10,minScale:.1,autoCenter:!0,autoScale:!0,containerAutoSize:!1,containerWidth:1e3,containerHeight:500,containerXPadding:800,containerYPadding:800,canvasWidth:1920,canvasHeight:1e3,proxyScaleKey:!0,useScrollBar:!0,useRuler:!0,usePositionLine:!0,positionLineConfig:{lineColor:"#6CC6A7",padding:3,adsorptionGap:4,zIndex:300,adsorptionXList:[],adsorptionYList:[],useRemove:!0,removeIcon:"",removeIconFillColor:"#525252"},canvasStyle:{},scrollBarConfig:{bgColor:"#000000",opacity:.4,zIndex:500,barSize:8},rulerConfig:{yRulerWidth:20,xRulerHeight:20,bgColor:"#f5f5f5",fontColor:"#797B80",fontSize:10,fontFamily:"Arial",lineColor:"#797B80",zIndex:400}},se=function(){const o={};for(const g in k){const n=k[g];typeof n=="object"&&n!==null?o[g]=()=>n:o[g]=n}return o}(),ce=(o,g)=>{const n=e.reactive({width:0,height:0,originWidth:0,originHeight:0});function r(p,s){new ResizeObserver(d=>{for(const v of d)if(v.target===s){const b=s.offsetWidth,i=s.offsetHeight;(b!==n.originWidth||i!==n.originHeight)&&t(p,s)}}).observe(s)}function t(p,s,a=!1){const d=p.value;d.containerAutoSize?(n.width=s.offsetWidth,n.height=s.offsetHeight,n.originWidth=n.width,n.originHeight=n.height,a&&r(p,s)):(n.width=d.containerWidth,n.height=d.containerHeight);const v=getComputedStyle(s);v.boxSizing==="border-box"&&(n.width-=parseFloat(v.borderLeftWidth)+parseFloat(v.borderRightWidth),n.height-=parseFloat(v.borderTopWidth)+parseFloat(v.borderBottomWidth)),v.position==="static"&&(n.position="relative")}e.onMounted(()=>{const p=g.value;p&&t(o,p,!0)});const u=e.computed(()=>({width:n.width,height:n.height})),c=e.computed(()=>{const p=o.value,s={overflow:"hidden"};return p.containerAutoSize||(s.width=n.width+"px",s.height=n.height+"px"),n.position&&(s.position=n.position),s});return{containerInfo:u,containerStyle:c}},ue=(o,g,n,r)=>{const t=e.reactive({});return e.watch(()=>g.value,()=>{const u=o.value;let c=t.translateX||0,p=t.translateY||0,s=0,a=0,{scale:d}=u;const{autoCenter:v,autoScale:b}=u,{width:i,height:m}=g.value;if(b){const l=(i-160)/u.canvasWidth,f=(m-2*80)/u.canvasHeight;d=Math.min(l,f)}t.scale=d;let L=0,y=0;s=u.canvasWidth*d,a=u.canvasHeight*d,v&&(L=Math.floor((i-s)/2),y=Math.floor((m-a)/2),t.translateX=L,t.translateY=y),u.scale!==d&&n(d),(c!==L||p||y)&&r(L,y)},{deep:!0}),{transformInfo:t}},fe=(o,g,n)=>({scrollBarInfo:e.computed(()=>{const t=o.value,{width:u,height:c}=g.value,{translateX:p,translateY:s,scale:a}=n,d=t.canvasWidth*a+2*t.containerXPadding,v=t.canvasHeight*a+2*t.containerYPadding,b=u<d,i=c<v,m=b||i,L=u*((t.containerXPadding-p)/d),y=c*((t.containerYPadding-s)/v),l=u/d*u,f=c/v*c;return{totalHeight:v,totalWidth:d,left:L,top:y,width:l,height:f,isYLarge:i,isXLarge:b,isLarge:m}})});function q(o,g,n){const r=o.value,{containerXPadding:t,containerYPadding:u,canvasWidth:c,canvasHeight:p}=r,s=c*n,a=p*n,{width:d,height:v}=g.value,b=Math.max((d-s)/2,t),i=Math.max((v-a)/2,u),m=s+2*t>d?d-(s+t):b,L=a+2*u>v?v-(a+u):i;return{maxTranslateX:b,maxTranslateY:i,minTranslateX:m,minTranslateY:L}}const pe=(o,g,n)=>({boundaryInfo:e.computed(()=>q(o,g,n.scale))}),T=(o,g,n,r,t,u)=>{const c=o.value;if(!c.canScale)return;let{translateX:p,translateY:s,scale:a}=n,d=p,v=s;r=Math.min(Math.max(r,c.minScale),c.maxScale);const b=r-a,i=q(o,g,r);p-=b*c.canvasWidth/2,s-=b*c.canvasHeight/2,p=Math.max(Math.min(p,i.maxTranslateX),i.minTranslateX),s=Math.max(Math.min(s,i.maxTranslateY),i.minTranslateY),n.scale=r,n.translateX=p,n.translateY=s,t(r),(d!==p||v!==s)&&u(p,s)},de=(o,g,n,r,t)=>{o.value.proxyScaleKey&&document.addEventListener("keydown",u=>{if(o.value.canScale){const c=u.keyCode;if((u.metaKey||u.ctrlKey)&&(c===187||c===189)){u.preventDefault();const p=n.scale+(c===187?.05:-.05);T(o,g,n,p,r,t)}}})},ve=(o,g,n,r,t,u,c,p,s)=>{let a=null;Object.assign(c,{xOpacity:0,yOpacity:0,scrollBarMouseDown:!1,scrollBarEnter:!1}),e.onMounted(()=>{t.value&&t.value.addEventListener("wheel",d=>{if(o.value.canScale)if(d.metaKey||d.ctrlKey){d.preventDefault();const v=-1*d.deltaY/100,b=n.scale+v;T(o,g,n,b,p,s)}else{if(!u.value.isLarge||c.scrollBarMouseDown)return;d.preventDefault();let{translateX:v,translateY:b}=n;a&&clearTimeout(a);const i=-d.deltaX,m=-d.deltaY;let L="";const{opacity:y=.4}=o.value.scrollBarConfig,{isXLarge:l,isYLarge:f}=u.value,{maxTranslateX:x,minTranslateX:C,maxTranslateY:h,minTranslateY:O}=r.value;l&&Math.abs(i)>Math.abs(m)&&(v+=i,v=Math.max(Math.min(v,x),C),c.xOpacity=y,c.yOpacity=0,n.translateX=v,L="x"),f&&Math.abs(m)>Math.abs(i)&&(L="y",b+=m,b=Math.max(Math.min(b,h),O),c.yOpacity=y,c.xOpacity=0,n.translateY=b),L&&(s(n.translateX,n.translateY),a=setTimeout(()=>{c.scrollBarEnter||(c[L==="y"?"yOpacity":"xOpacity"]=0)},1e3))}})})},he=e.defineComponent({__name:"index",props:e.mergeDefaults({scale:{},minScale:{},maxScale:{},canScale:{type:Boolean},autoCenter:{type:Boolean},autoScale:{type:Boolean},containerAutoSize:{type:Boolean},containerWidth:{},containerHeight:{},containerXPadding:{},containerYPadding:{},canvasWidth:{},canvasHeight:{},proxyScaleKey:{type:Boolean},useScrollBar:{type:Boolean},useRuler:{type:Boolean},usePositionLine:{type:Boolean},positionLineConfig:{},canvasStyle:{},scrollBarConfig:{},rulerConfig:{}},se),emits:["update:scale","onScale","onMove","adsorptionLineChange","positionLineChange"],setup(o,{expose:g,emit:n}){const r=o,t=e.ref($(k,r,{arrayMerge:z})),u=n,c=e.ref(null),{containerInfo:p,containerStyle:s}=ce(t,c),{transformInfo:a}=ue(t,p,i,m),{boundaryInfo:d}=pe(t,p,a),{scrollBarInfo:v}=fe(t,p,a),b=e.reactive({});e.watch(()=>a.scale,w=>{if(w){if(!b.scale){const B={scale:w,translateX:a.translateX,translateY:a.translateY};Object.assign(b,B)}u("update:scale",w)}}),e.watch(()=>r,()=>{t.value=$(t.value,r,{arrayMerge:z})},{deep:!0});function i(w){u("onScale",w)}function m(w,B){u("onMove",w,B)}function L(w){T(t,p,a,w,i,m)}e.watch(()=>t.value.scale,w=>{w!==a.scale&&L(w)}),de(t,p,a,i,m);const y=e.reactive({});ve(t,p,a,d,c,v,y,i,m);function l(w,B){u("adsorptionLineChange",w,B)}function f(w,B){u("positionLineChange",w,B)}function x(){Object.assign(a,b)}const C=e.ref(null),h=e.ref(null);function O(){t.value.useRuler&&(C.value&&C.value.removeAllPositionLine(),h.value&&h.value.removeAllPositionLine())}function S(w=!0){t.value.useRuler&&(C.value&&C.value.toggleRuler(w),h.value&&h.value.toggleRuler(w))}function _(w=!0){t.value.useRuler&&(C.value&&C.value.togglePositionLine(w),h.value&&h.value.togglePositionLine(w))}function M(w,B=!0,R=!1){t.value.useRuler&&(R&&C.value&&C.value.modifyAdsorptionList(w,B),!R&&h.value&&h.value.modifyAdsorptionList(w,B))}return g({reset:x,changeScale:L,removeAllPositionLine:O,showRuler(){S()},hideRuler(){S(!1)},showAllPositionLine(){_()},hideAllPositionLine(){_(!1)},addAdsorptionLine(w,B=!1){M(w,!0,B)},removeAdsorptionLine(w,B=!1){M(w,!1,B)}}),(w,B)=>(e.openBlock(),e.createElementBlock("div",{class:"scale-ruler",ref_key:"container",ref:c,style:e.normalizeStyle(e.unref(s))},[t.value.useRuler?(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createVNode(H,{ref_key:"xRuler",ref:C,opt:t.value,"container-info":e.unref(p),"transform-info":e.unref(a),onAdsorptionLineChange:l,onPositionLineChange:f},null,8,["opt","container-info","transform-info"]),e.createVNode(H,{ref_key:"yRuler",ref:h,"is-y":"",opt:t.value,"container-info":e.unref(p),"transform-info":e.unref(a),onAdsorptionLineChange:l,onPositionLineChange:f},null,8,["opt","container-info","transform-info"])],64)):e.createCommentVNode("",!0),e.createVNode(K,{"container-info":e.unref(p),opt:t.value,"transform-info":e.unref(a)},{default:e.withCtx(()=>[e.renderSlot(w.$slots,"default")]),_:3},8,["container-info","opt","transform-info"]),e.unref(v).isXLarge?(e.openBlock(),e.createBlock(W,{key:1,opt:t.value,"container-info":e.unref(p),"scroll-bar-info":e.unref(v),"global-info":y,"transform-info":e.unref(a),onOnMove:m},null,8,["opt","container-info","scroll-bar-info","global-info","transform-info"])):e.createCommentVNode("",!0),e.unref(v).isYLarge?(e.openBlock(),e.createBlock(W,{key:2,opt:t.value,"container-info":e.unref(p),"scroll-bar-info":e.unref(v),"global-info":y,"transform-info":e.unref(a),onOnMove:m,"is-y":""},null,8,["opt","container-info","scroll-bar-info","global-info","transform-info"])):e.createCommentVNode("",!0)],4))}});module.exports=he;
