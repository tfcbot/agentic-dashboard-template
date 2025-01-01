"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[763],{7045:function(t,e,n){n.d(e,{j:function(){return r}});var i=n(4112),s=n(5345),r=new class extends i.l{#t;#e;#n;constructor(){super(),this.#n=t=>{if(!s.sk&&window.addEventListener){let e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}}}onSubscribe(){this.#e||this.setEventListener(this.#n)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#n=t,this.#e?.(),this.#e=t(t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()})}setFocused(t){this.#t!==t&&(this.#t=t,this.onFocus())}onFocus(){let t=this.isFocused();this.listeners.forEach(e=>{e(t)})}isFocused(){return"boolean"==typeof this.#t?this.#t:globalThis.document?.visibilityState!=="hidden"}}},8238:function(t,e,n){n.d(e,{V:function(){return i}});var i=function(){let t=[],e=0,n=t=>{t()},i=t=>{t()},s=t=>setTimeout(t,0),r=i=>{e?t.push(i):s(()=>{n(i)})},o=()=>{let e=t;t=[],e.length&&s(()=>{i(()=>{e.forEach(t=>{n(t)})})})};return{batch:t=>{let n;e++;try{n=t()}finally{--e||o()}return n},batchCalls:t=>(...e)=>{r(()=>{t(...e)})},schedule:r,setNotifyFunction:t=>{n=t},setBatchNotifyFunction:t=>{i=t},setScheduler:t=>{s=t}}}()},7853:function(t,e,n){n.d(e,{N:function(){return r}});var i=n(4112),s=n(5345),r=new class extends i.l{#i=!0;#e;#n;constructor(){super(),this.#n=t=>{if(!s.sk&&window.addEventListener){let e=()=>t(!0),n=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",n,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",n)}}}}onSubscribe(){this.#e||this.setEventListener(this.#n)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#n=t,this.#e?.(),this.#e=t(this.setOnline.bind(this))}setOnline(t){this.#i!==t&&(this.#i=t,this.listeners.forEach(e=>{e(t)}))}isOnline(){return this.#i}}},1733:function(t,e,n){n.d(e,{A:function(){return u},z:function(){return a}});var i=n(5345),s=n(8238),r=n(1255),o=n(7989),u=class extends o.F{#s;#r;#o;#u;#a;#c;constructor(t){super(),this.#c=!1,this.#a=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.#o=t.cache,this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.#s=function(t){let e="function"==typeof t.initialData?t.initialData():t.initialData,n=void 0!==e,i=n?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:n?i??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}(this.options),this.state=t.state??this.#s,this.scheduleGc()}get meta(){return this.options.meta}get promise(){return this.#u?.promise}setOptions(t){this.options={...this.#a,...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#o.remove(this)}setData(t,e){let n=(0,i.oE)(this.state.data,t,this.options);return this.#h({data:n,type:"success",dataUpdatedAt:e?.updatedAt,manual:e?.manual}),n}setState(t,e){this.#h({type:"setState",state:t,setStateOptions:e})}cancel(t){let e=this.#u?.promise;return this.#u?.cancel(t),e?e.then(i.ZT).catch(i.ZT):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#s)}isActive(){return this.observers.some(t=>!1!==(0,i.Nc)(t.options.enabled,this))}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===i.CN||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return!!this.state.isInvalidated||(this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):void 0===this.state.data)}isStaleByTime(t=0){return this.state.isInvalidated||void 0===this.state.data||!(0,i.Kp)(this.state.dataUpdatedAt,t)}onFocus(){let t=this.observers.find(t=>t.shouldFetchOnWindowFocus());t?.refetch({cancelRefetch:!1}),this.#u?.continue()}onOnline(){let t=this.observers.find(t=>t.shouldFetchOnReconnect());t?.refetch({cancelRefetch:!1}),this.#u?.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.#o.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(this.#u&&(this.#c?this.#u.cancel({revert:!0}):this.#u.cancelRetry()),this.scheduleGc()),this.#o.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#h({type:"invalidate"})}fetch(t,e){if("idle"!==this.state.fetchStatus){if(void 0!==this.state.data&&e?.cancelRefetch)this.cancel({silent:!0});else if(this.#u)return this.#u.continueRetry(),this.#u.promise}if(t&&this.setOptions(t),!this.options.queryFn){let t=this.observers.find(t=>t.options.queryFn);t&&this.setOptions(t.options)}let n=new AbortController,s=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(this.#c=!0,n.signal)})},o={fetchOptions:e,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:()=>{let t=(0,i.cG)(this.options,e),n={queryKey:this.queryKey,meta:this.meta};return(s(n),this.#c=!1,this.options.persister)?this.options.persister(t,n,this):t(n)}};s(o),this.options.behavior?.onFetch(o,this),this.#r=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==o.fetchOptions?.meta)&&this.#h({type:"fetch",meta:o.fetchOptions?.meta});let u=t=>{(0,r.DV)(t)&&t.silent||this.#h({type:"error",error:t}),(0,r.DV)(t)||(this.#o.config.onError?.(t,this),this.#o.config.onSettled?.(this.state.data,t,this)),this.scheduleGc()};return this.#u=(0,r.Mz)({initialPromise:e?.initialPromise,fn:o.fetchFn,abort:n.abort.bind(n),onSuccess:t=>{if(void 0===t){u(Error(`${this.queryHash} data is undefined`));return}try{this.setData(t)}catch(t){u(t);return}this.#o.config.onSuccess?.(t,this),this.#o.config.onSettled?.(t,this.state.error,this),this.scheduleGc()},onError:u,onFail:(t,e)=>{this.#h({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#h({type:"pause"})},onContinue:()=>{this.#h({type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0}),this.#u.start()}#h(t){this.state=(e=>{switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":return{...e,...a(e.data,this.options),fetchMeta:t.meta??null};case"success":return{...e,data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let n=t.error;if((0,r.DV)(n)&&n.revert&&this.#r)return{...this.#r,fetchStatus:"idle"};return{...e,error:n,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:n,fetchStatus:"idle",status:"error"};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}})(this.state),s.V.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate()}),this.#o.notify({query:this,type:"updated",action:t})})}};function a(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:(0,r.Kw)(e.networkMode)?"fetching":"paused",...void 0===t&&{error:null,status:"pending"}}}},7989:function(t,e,n){n.d(e,{F:function(){return s}});var i=n(5345),s=class{#l;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,i.PN)(this.gcTime)&&(this.#l=setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(i.sk?1/0:3e5))}clearGcTimeout(){this.#l&&(clearTimeout(this.#l),this.#l=void 0)}}},1255:function(t,e,n){n.d(e,{DV:function(){return h},Kw:function(){return a},Mz:function(){return l}});var i=n(7045),s=n(7853),r=n(6803),o=n(5345);function u(t){return Math.min(1e3*2**t,3e4)}function a(t){return(t??"online")!=="online"||s.N.isOnline()}var c=class extends Error{constructor(t){super("CancelledError"),this.revert=t?.revert,this.silent=t?.silent}};function h(t){return t instanceof c}function l(t){let e,n=!1,h=0,l=!1,f=(0,r.O)(),d=()=>i.j.isFocused()&&("always"===t.networkMode||s.N.isOnline())&&t.canRun(),p=()=>a(t.networkMode)&&t.canRun(),y=n=>{l||(l=!0,t.onSuccess?.(n),e?.(),f.resolve(n))},v=n=>{l||(l=!0,t.onError?.(n),e?.(),f.reject(n))},b=()=>new Promise(n=>{e=t=>{(l||d())&&n(t)},t.onPause?.()}).then(()=>{e=void 0,l||t.onContinue?.()}),m=()=>{let e;if(l)return;let i=0===h?t.initialPromise:void 0;try{e=i??t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(y).catch(e=>{if(l)return;let i=t.retry??(o.sk?0:3),s=t.retryDelay??u,r="function"==typeof s?s(h,e):s,a=!0===i||"number"==typeof i&&h<i||"function"==typeof i&&i(h,e);if(n||!a){v(e);return}h++,t.onFail?.(h,e),(0,o._v)(r).then(()=>d()?void 0:b()).then(()=>{n?v(e):m()})})};return{promise:f,cancel:e=>{l||(v(new c(e)),t.abort?.())},continue:()=>(e?.(),f),cancelRetry:()=>{n=!0},continueRetry:()=>{n=!1},canStart:p,start:()=>(p()?m():b().then(m),f)}}},4112:function(t,e,n){n.d(e,{l:function(){return i}});var i=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}},6803:function(t,e,n){n.d(e,{O:function(){return i}});function i(){let t,e;let n=new Promise((n,i)=>{t=n,e=i});function i(t){Object.assign(n,t),delete n.resolve,delete n.reject}return n.status="pending",n.catch(()=>{}),n.resolve=e=>{i({status:"fulfilled",value:e}),t(e)},n.reject=t=>{i({status:"rejected",reason:t}),e(t)},n}},5345:function(t,e,n){n.d(e,{CN:function(){return O},Ht:function(){return F},KC:function(){return a},Kp:function(){return u},Nc:function(){return c},PN:function(){return o},Rm:function(){return f},SE:function(){return r},VS:function(){return y},VX:function(){return w},X7:function(){return l},Ym:function(){return d},ZT:function(){return s},_v:function(){return g},_x:function(){return h},cG:function(){return C},oE:function(){return S},sk:function(){return i},to:function(){return p}});var i="undefined"==typeof window||"Deno"in globalThis;function s(){}function r(t,e){return"function"==typeof t?t(e):t}function o(t){return"number"==typeof t&&t>=0&&t!==1/0}function u(t,e){return Math.max(t+(e||0)-Date.now(),0)}function a(t,e){return"function"==typeof t?t(e):t}function c(t,e){return"function"==typeof t?t(e):t}function h(t,e){let{type:n="all",exact:i,fetchStatus:s,predicate:r,queryKey:o,stale:u}=t;if(o){if(i){if(e.queryHash!==f(o,e.options))return!1}else if(!p(e.queryKey,o))return!1}if("all"!==n){let t=e.isActive();if("active"===n&&!t||"inactive"===n&&t)return!1}return("boolean"!=typeof u||e.isStale()===u)&&(!s||s===e.state.fetchStatus)&&(!r||!!r(e))}function l(t,e){let{exact:n,status:i,predicate:s,mutationKey:r}=t;if(r){if(!e.options.mutationKey)return!1;if(n){if(d(e.options.mutationKey)!==d(r))return!1}else if(!p(e.options.mutationKey,r))return!1}return(!i||e.state.status===i)&&(!s||!!s(e))}function f(t,e){return(e?.queryKeyHashFn||d)(t)}function d(t){return JSON.stringify(t,(t,e)=>b(e)?Object.keys(e).sort().reduce((t,n)=>(t[n]=e[n],t),{}):e)}function p(t,e){return t===e||typeof t==typeof e&&!!t&&!!e&&"object"==typeof t&&"object"==typeof e&&!Object.keys(e).some(n=>!p(t[n],e[n]))}function y(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(let n in t)if(t[n]!==e[n])return!1;return!0}function v(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function b(t){if(!m(t))return!1;let e=t.constructor;if(void 0===e)return!0;let n=e.prototype;return!!(m(n)&&n.hasOwnProperty("isPrototypeOf"))&&Object.getPrototypeOf(t)===Object.prototype}function m(t){return"[object Object]"===Object.prototype.toString.call(t)}function g(t){return new Promise(e=>{setTimeout(e,t)})}function S(t,e,n){return"function"==typeof n.structuralSharing?n.structuralSharing(t,e):!1!==n.structuralSharing?function t(e,n){if(e===n)return e;let i=v(e)&&v(n);if(i||b(e)&&b(n)){let s=i?e:Object.keys(e),r=s.length,o=i?n:Object.keys(n),u=o.length,a=i?[]:{},c=0;for(let r=0;r<u;r++){let u=i?r:o[r];(!i&&s.includes(u)||i)&&void 0===e[u]&&void 0===n[u]?(a[u]=void 0,c++):(a[u]=t(e[u],n[u]),a[u]===e[u]&&void 0!==e[u]&&c++)}return r===u&&c===r?e:a}return n}(t,e):e}function w(t,e,n=0){let i=[...t,e];return n&&i.length>n?i.slice(1):i}function F(t,e,n=0){let i=[e,...t];return n&&i.length>n?i.slice(0,-1):i}var O=Symbol();function C(t,e){return!t.queryFn&&e?.initialPromise?()=>e.initialPromise:t.queryFn&&t.queryFn!==O?t.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${t.queryHash}'`))}},9827:function(t,e,n){n.d(e,{NL:function(){return o},aH:function(){return u}});var i=n(2265),s=n(7437),r=i.createContext(void 0),o=t=>{let e=i.useContext(r);if(t)return t;if(!e)throw Error("No QueryClient set, use QueryClientProvider to set one");return e},u=t=>{let{client:e,children:n}=t;return i.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),(0,s.jsx)(r.Provider,{value:e,children:n})}}}]);