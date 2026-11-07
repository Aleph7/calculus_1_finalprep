function Ne(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var W={exports:{}},s={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var X;function Le(){if(X)return s;X=1;var a=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),w=Symbol.for("react.profiler"),z=Symbol.for("react.consumer"),A=Symbol.for("react.context"),M=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),R=Symbol.for("react.memo"),$=Symbol.for("react.lazy"),D=Symbol.for("react.activity"),S=Symbol.for("react.view_transition"),C=Symbol.iterator;function h(e){return e===null||typeof e!="object"?null:(e=C&&e[C]||e["@@iterator"],typeof e=="function"?e:null)}var v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,x={};function _(e,t,o){this.props=e,this.context=t,this.refs=x,this.updater=o||v}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function N(){}N.prototype=_.prototype;function b(e,t,o){this.props=e,this.context=t,this.refs=x,this.updater=o||v}var H=b.prototype=new N;H.constructor=b,E(H,_.prototype),H.isPureReactComponent=!0;var L=Array.isArray;function P(){}var l={H:null,A:null,T:null,S:null},U=Object.prototype.hasOwnProperty;function I(e,t,o){var r=o.ref;return{$$typeof:a,type:e,key:t,ref:r!==void 0?r:null,props:o}}function Se(e,t){return I(e.type,t,e.props)}function q(e){return typeof e=="object"&&e!==null&&e.$$typeof===a}function je(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var G=/\/+/g;function Y(e,t){return typeof e=="object"&&e!==null&&e.key!=null?je(""+e.key):t.toString(36)}function De(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(P,P):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function j(e,t,o,r,i){var d=typeof e;(d==="undefined"||d==="boolean")&&(e=null);var f=!1;if(e===null)f=!0;else switch(d){case"bigint":case"string":case"number":f=!0;break;case"object":switch(e.$$typeof){case a:case n:f=!0;break;case $:return f=e._init,j(f(e._payload),t,o,r,i)}}if(f)return i=i(e),f=r===""?"."+Y(e,0):r,L(i)?(o="",f!=null&&(o=f.replace(G,"$&/")+"/"),j(i,t,o,"",function(Pe){return Pe})):i!=null&&(q(i)&&(i=Se(i,o+(i.key==null||e&&e.key===i.key?"":(""+i.key).replace(G,"$&/")+"/")+f)),t.push(i)),1;f=0;var k=r===""?".":r+":";if(L(e))for(var y=0;y<e.length;y++)r=e[y],d=k+Y(r,y),f+=j(r,t,o,d,i);else if(y=h(e),typeof y=="function")for(e=y.call(e),y=0;!(r=e.next()).done;)r=r.value,d=k+Y(r,y++),f+=j(r,t,o,d,i);else if(d==="object"){if(typeof e.then=="function")return j(De(e),t,o,r,i);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return f}function O(e,t,o){if(e==null)return e;var r=[],i=0;return j(e,r,"","",function(d){return t.call(o,d,i++)}),r}function be(e){if(e._status===-1){var t=e._result,o=t();o.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r,o.status===void 0&&(o.status="fulfilled",o.value=r))},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r,o.status===void 0&&(o.status="rejected",o.reason=r))}),e._status===-1&&(e._status=0,e._result=o)}if(e._status===1)return e._result.default;throw e._result}var K=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function F(e){var t=l.T,o={};o.types=t!==null?t.types:null,l.T=o;try{var r=e(),i=l.S;i!==null&&i(o,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(P,K)}catch(d){K(d)}finally{t!==null&&o.types!==null&&(t.types=o.types),l.T=t}}function Q(e){var t=l.T;if(t!==null){var o=t.types;o===null?t.types=[e]:o.indexOf(e)===-1&&o.push(e)}else F(Q.bind(null,e))}var He={map:O,forEach:function(e,t,o){O(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return O(e,function(){t++}),t},toArray:function(e){return O(e,function(t){return t})||[]},only:function(e){if(!q(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};return s.Activity=D,s.Children=He,s.Component=_,s.Fragment=p,s.Profiler=w,s.PureComponent=b,s.StrictMode=u,s.Suspense=m,s.ViewTransition=S,s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,s.__COMPILER_RUNTIME={__proto__:null,c:function(e){return l.H.useMemoCache(e)}},s.addTransitionType=Q,s.cache=function(e){return function(){return e.apply(null,arguments)}},s.cacheSignal=function(){return null},s.cloneElement=function(e,t,o){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var r=E({},e.props),i=e.key;if(t!=null)for(d in t.key!==void 0&&(i=""+t.key),t)!U.call(t,d)||d==="key"||d==="__self"||d==="__source"||d==="ref"&&t.ref===void 0||(r[d]=t[d]);var d=arguments.length-2;if(d===1)r.children=o;else if(1<d){for(var f=Array(d),k=0;k<d;k++)f[k]=arguments[k+2];r.children=f}return I(e.type,i,r)},s.createContext=function(e){return e={$$typeof:A,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:z,_context:e},e},s.createElement=function(e,t,o){var r,i={},d=null;if(t!=null)for(r in t.key!==void 0&&(d=""+t.key),t)U.call(t,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(i[r]=t[r]);var f=arguments.length-2;if(f===1)i.children=o;else if(1<f){for(var k=Array(f),y=0;y<f;y++)k[y]=arguments[y+2];i.children=k}if(e&&e.defaultProps)for(r in f=e.defaultProps,f)i[r]===void 0&&(i[r]=f[r]);return I(e,d,i)},s.createRef=function(){return{current:null}},s.forwardRef=function(e){return{$$typeof:M,render:e}},s.isValidElement=q,s.lazy=function(e){return{$$typeof:$,_payload:{_status:-1,_result:e},_init:be}},s.memo=function(e,t){return{$$typeof:R,type:e,compare:t===void 0?null:t}},s.startTransition=F,s.unstable_useCacheRefresh=function(){return l.H.useCacheRefresh()},s.use=function(e){return l.H.use(e)},s.useActionState=function(e,t,o){return l.H.useActionState(e,t,o)},s.useCallback=function(e,t){return l.H.useCallback(e,t)},s.useContext=function(e){return l.H.useContext(e)},s.useDebugValue=function(){},s.useDeferredValue=function(e,t){return l.H.useDeferredValue(e,t)},s.useEffect=function(e,t){return l.H.useEffect(e,t)},s.useEffectEvent=function(e){return l.H.useEffectEvent(e)},s.useId=function(){return l.H.useId()},s.useImperativeHandle=function(e,t,o){return l.H.useImperativeHandle(e,t,o)},s.useInsertionEffect=function(e,t){return l.H.useInsertionEffect(e,t)},s.useLayoutEffect=function(e,t){return l.H.useLayoutEffect(e,t)},s.useMemo=function(e,t){return l.H.useMemo(e,t)},s.useOptimistic=function(e,t){return l.H.useOptimistic(e,t)},s.useReducer=function(e,t,o){return l.H.useReducer(e,t,o)},s.useRef=function(e){return l.H.useRef(e)},s.useState=function(e){return l.H.useState(e)},s.useSyncExternalStore=function(e,t,o){return l.H.useSyncExternalStore(e,t,o)},s.useTransition=function(){return l.H.useTransition()},s.version="19.3.1",s}var Z;function Oe(){return Z||(Z=1,W.exports=Le()),W.exports}var g=Oe();const Qe=Ne(g);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=a=>a==null?void 0:a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function qe(a,n,p=[]){if(n==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Ie(a),size:24,node:n,...p.length>0?{aliases:p}:{}}}/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=a=>{let n="",p=!1;for(const u of a){if(u==="-"||u==="_"||u<=" "){p=n.length>0;continue}n.length===0?n+=u.toLowerCase():n+=p?u.toUpperCase():u,p=!1}return n};/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=a=>{const n=Ye(a);return n.charAt(0).toUpperCase()+n.slice(1)};/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=(...a)=>a.filter((n,p,u)=>!!n&&n.trim()!==""&&u.indexOf(n)===p).join(" ").trim();/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function V(a){return a!=null}function Ve(a,n={}){var S,C;const p=n.attributeNames??{},u=h=>p[h]??h,w=a.size??a.width??T.width,z=a.size??a.height??T.height,A=((S=a.aliases)==null?void 0:S.filter(h=>typeof h=="string"&&h.trim()!=="").map(h=>`lucide-${h}`))??[],M=[...a.name?[`lucide-${a.name}`]:[],...A],m=((C=n.className)==null?void 0:C.split(" ").filter(Boolean))??[],R=n.includeDefaultClasses===!1?B(...m):B("lucide",...M,...m),$=n.absoluteStrokeWidth?Number(n.strokeWidth??T["stroke-width"])*Number(a.size??a.width??T.width)/Number(n.size??n.width??T.width):n.strokeWidth??T["stroke-width"];return["svg",{...Object.entries(T).reduce((h,[v,E])=>(h[u(v)]=E,h),{}),..."color"in n&&n.color&&{[u("stroke")]:n.color},..."size"in n&&V(n.size)&&{[u("width")]:n.size,[u("height")]:n.size},..."width"in n&&V(n.width)&&{[u("width")]:n.width},..."height"in n&&V(n.height)&&{[u("height")]:n.height},[u("stroke-width")]:$,...R&&{[u("class")]:R},[u("viewBox")]:`0 0 ${w} ${z}`,...n.hasA11yProp===!1?{[u("aria-hidden")]:"true"}:{},..."attributes"in n&&n.attributes},a.node.map(h=>{const[v,E,x]=h,_=n.nonScalingStroke?{[u("vector-effect")]:"non-scaling-stroke",...E}:E;return x?[v,_,x]:[v,_]})]}/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Be(a,n={}){return Ve(a,{...n,attributeNames:{...n.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=a=>{for(const n in a)if(n.startsWith("aria-")||n==="role"||n==="title")return!0;return!1},Ge=g.createContext({}),Ke=()=>g.useContext(Ge),Fe=g.forwardRef(({color:a,size:n,width:p,height:u,strokeWidth:w,absoluteStrokeWidth:z,nonScalingStroke:A,className:M="",children:m,iconNode:R=[],icon:$={node:R,aliases:[],size:24},...D},S)=>{const{size:C=24,strokeWidth:h=2,absoluteStrokeWidth:v=!1,nonScalingStroke:E=!1,color:x="currentColor",className:_=""}=Ke()??{},N=!!m||Ue(D),[b,H,L=[]]=Be($,{color:a??x,width:p??n??C,height:u??n??C,strokeWidth:w??h,absoluteStrokeWidth:z??v,nonScalingStroke:A??E,className:B(_,M),hasA11yProp:N,attributes:D});return g.createElement(b,{ref:S,...H},[...L.map(([P,l])=>g.createElement(P,l)),...Array.isArray(m)?m:[m]])});/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function c(a,n=[],p=[]){const u=typeof a=="string"?qe(a,n,p):a,w=g.forwardRef(({className:z,...A},M)=>g.createElement(Fe,{ref:M,icon:u,className:z,...A}));return u.name&&(w.displayName=We(u.name)),w}/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J={name:"award",size:24,node:[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]};J.node;const Xe=c(J);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee={name:"book-check",size:24,node:[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m9 9.5 2 2 4-4",key:"1dth82"}]]};ee.node;const Ze=c(ee);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te={name:"book-open",size:24,node:[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]]};te.node;const Je=c(te);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne={name:"bookmark-check",size:24,node:[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}],["path",{d:"m9 10 2 2 4-4",key:"1gnqz4"}]]};ne.node;const et=c(ne);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};oe.node;const tt=c(oe);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};re.node;const nt=c(re);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se={name:"chevron-up",size:24,node:[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]};se.node;const ot=c(se);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae={name:"circle-check-big",size:24,node:[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],aliases:["check-circle"]};ae.node;const rt=c(ae);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};ce.node;const st=c(ce);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie={name:"circle-question-mark",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["help-circle","circle-help"]};ie.node;const at=c(ie);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};ue.node;const ct=c(ue);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};le.node;const it=c(le);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de={name:"eye-off",size:24,node:[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]};de.node;const ut=c(de);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe={name:"eye",size:24,node:[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]};fe.node;const lt=c(fe);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe={name:"file-code",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]]};pe.node;const dt=c(pe);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he={name:"file-text",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]};he.node;const ft=c(he);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye={name:"folder-archive",size:24,node:[["circle",{cx:"15",cy:"19",r:"2",key:"u2pros"}],["path",{d:"M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1",key:"1jj40k"}],["path",{d:"M15 11v-1",key:"cntcp"}],["path",{d:"M15 17v-2",key:"1279jj"}]]};ye.node;const pt=c(ye);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e={name:"funnel",size:24,node:[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],aliases:["filter"]};_e.node;const ht=c(_e);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke={name:"graduation-cap",size:24,node:[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]};ke.node;const yt=c(ke);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me={name:"layers",size:24,node:[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],aliases:["layers-3"]};me.node;const _t=c(me);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve={name:"octagon-exclamation-point",size:24,node:[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]],aliases:["alert-octagon","octagon-alert"]};ve.node;const kt=c(ve);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Ee.node;const mt=c(Ee);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};we.node;const vt=c(we);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};Ce.node;const Et=c(Ce);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};ge.node;const wt=c(ge);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};ze.node;const Ct=c(ze);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae={name:"shield-exclamation-point",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],aliases:["shield-alert"]};Ae.node;const gt=c(Ae);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};Me.node;const zt=c(Me);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe={name:"timer",size:24,node:[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]};xe.node;const At=c(xe);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te={name:"triangle-exclamation-point",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle","triangle-alert"]};Te.node;const Mt=c(Te);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re={name:"trophy",size:24,node:[["path",{d:"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2",key:"pwuv1l"}],["path",{d:"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2",key:"1y54w1"}],["path",{d:"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",key:"e30mpu"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",key:"i0yafy"}]]};Re.node;const xt=c(Re);/**
 * @license lucide-react v1.70.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};$e.node;const Tt=c($e);export{Xe as A,Je as B,st as C,it as D,lt as E,ft as F,yt as G,_t as L,kt as O,mt as P,Et as R,zt as S,At as T,Tt as X,g as a,gt as b,vt as c,Mt as d,ht as e,ut as f,Ne as g,xt as h,tt as i,at as j,ot as k,nt as l,et as m,rt as n,wt as o,ct as p,pt as q,Oe as r,dt as s,Ct as t,Ze as u,Qe as v};
//# sourceMappingURL=icons-BuPIMCPf.js.map
