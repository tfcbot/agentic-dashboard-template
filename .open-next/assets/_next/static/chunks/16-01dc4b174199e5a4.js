"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[16],{16:function(e,t,r){let s;r.d(t,{a:function(){return w}});var i=r(7045),n=r(8238),u=r(1733),a=r(4112),h=r(6803),c=r(5345),o=class extends a.l{constructor(e,t){super(),this.options=t,this.#e=e,this.#t=null,this.#r=(0,h.O)(),this.options.experimental_prefetchInRender||this.#r.reject(Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(t)}#e;#s=void 0;#i=void 0;#n=void 0;#u;#a;#r;#t;#h;#c;#o;#l;#d;#p;#f=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#s.addObserver(this),l(this.#s,this.options)?this.#y():this.updateResult(),this.#R())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return d(this.#s,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return d(this.#s,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#v(),this.#b(),this.#s.removeObserver(this)}setOptions(e,t){let r=this.options,s=this.#s;if(this.options=this.#e.defaultQueryOptions(e),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled&&"function"!=typeof this.options.enabled&&"boolean"!=typeof(0,c.Nc)(this.options.enabled,this.#s))throw Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#Q(),this.#s.setOptions(this.options),r._defaulted&&!(0,c.VS)(this.options,r)&&this.#e.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#s,observer:this});let i=this.hasListeners();i&&p(this.#s,s,this.options,r)&&this.#y(),this.updateResult(t),i&&(this.#s!==s||(0,c.Nc)(this.options.enabled,this.#s)!==(0,c.Nc)(r.enabled,this.#s)||(0,c.KC)(this.options.staleTime,this.#s)!==(0,c.KC)(r.staleTime,this.#s))&&this.#m();let n=this.#g();i&&(this.#s!==s||(0,c.Nc)(this.options.enabled,this.#s)!==(0,c.Nc)(r.enabled,this.#s)||n!==this.#p)&&this.#O(n)}getOptimisticResult(e){let t=this.#e.getQueryCache().build(this.#e,e),r=this.createResult(t,e);return(0,c.VS)(this.getCurrentResult(),r)||(this.#n=r,this.#a=this.options,this.#u=this.#s.state),r}getCurrentResult(){return this.#n}trackResult(e,t){let r={};return Object.keys(e).forEach(s=>{Object.defineProperty(r,s,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(s),t?.(s),e[s])})}),r}trackProp(e){this.#f.add(e)}getCurrentQuery(){return this.#s}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){let t=this.#e.defaultQueryOptions(e),r=this.#e.getQueryCache().build(this.#e,t);return r.fetch().then(()=>this.createResult(r,t))}fetch(e){return this.#y({...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#n))}#y(e){this.#Q();let t=this.#s.fetch(this.options,e);return e?.throwOnError||(t=t.catch(c.ZT)),t}#m(){this.#v();let e=(0,c.KC)(this.options.staleTime,this.#s);if(c.sk||this.#n.isStale||!(0,c.PN)(e))return;let t=(0,c.Kp)(this.#n.dataUpdatedAt,e);this.#l=setTimeout(()=>{this.#n.isStale||this.updateResult()},t+1)}#g(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#s):this.options.refetchInterval)??!1}#O(e){this.#b(),this.#p=e,!c.sk&&!1!==(0,c.Nc)(this.options.enabled,this.#s)&&(0,c.PN)(this.#p)&&0!==this.#p&&(this.#d=setInterval(()=>{(this.options.refetchIntervalInBackground||i.j.isFocused())&&this.#y()},this.#p))}#R(){this.#m(),this.#O(this.#g())}#v(){this.#l&&(clearTimeout(this.#l),this.#l=void 0)}#b(){this.#d&&(clearInterval(this.#d),this.#d=void 0)}createResult(e,t){let r;let s=this.#s,i=this.options,n=this.#n,a=this.#u,o=this.#a,d=e!==s?e.state:this.#i,{state:y}=e,R={...y},v=!1;if(t._optimisticResults){let r=this.hasListeners(),n=!r&&l(e,t),a=r&&p(e,s,t,i);(n||a)&&(R={...R,...(0,u.z)(y.data,e.options)}),"isRestoring"===t._optimisticResults&&(R.fetchStatus="idle")}let{error:b,errorUpdatedAt:Q,status:m}=R;if(t.select&&void 0!==R.data){if(n&&R.data===a?.data&&t.select===this.#h)r=this.#c;else try{this.#h=t.select,r=t.select(R.data),r=(0,c.oE)(n?.data,r,t),this.#c=r,this.#t=null}catch(e){this.#t=e}}else r=R.data;if(void 0!==t.placeholderData&&void 0===r&&"pending"===m){let e;if(n?.isPlaceholderData&&t.placeholderData===o?.placeholderData)e=n.data;else if(e="function"==typeof t.placeholderData?t.placeholderData(this.#o?.state.data,this.#o):t.placeholderData,t.select&&void 0!==e)try{e=t.select(e),this.#t=null}catch(e){this.#t=e}void 0!==e&&(m="success",r=(0,c.oE)(n?.data,e,t),v=!0)}this.#t&&(b=this.#t,r=this.#c,Q=Date.now(),m="error");let g="fetching"===R.fetchStatus,O="pending"===m,I="error"===m,C=O&&g,S=void 0!==r,T={status:m,fetchStatus:R.fetchStatus,isPending:O,isSuccess:"success"===m,isError:I,isInitialLoading:C,isLoading:C,data:r,dataUpdatedAt:R.dataUpdatedAt,error:b,errorUpdatedAt:Q,failureCount:R.fetchFailureCount,failureReason:R.fetchFailureReason,errorUpdateCount:R.errorUpdateCount,isFetched:R.dataUpdateCount>0||R.errorUpdateCount>0,isFetchedAfterMount:R.dataUpdateCount>d.dataUpdateCount||R.errorUpdateCount>d.errorUpdateCount,isFetching:g,isRefetching:g&&!O,isLoadingError:I&&!S,isPaused:"paused"===R.fetchStatus,isPlaceholderData:v,isRefetchError:I&&S,isStale:f(e,t),refetch:this.refetch,promise:this.#r};if(this.options.experimental_prefetchInRender){let t=e=>{"error"===T.status?e.reject(T.error):void 0!==T.data&&e.resolve(T.data)},r=()=>{t(this.#r=T.promise=(0,h.O)())},i=this.#r;switch(i.status){case"pending":e.queryHash===s.queryHash&&t(i);break;case"fulfilled":("error"===T.status||T.data!==i.value)&&r();break;case"rejected":("error"!==T.status||T.error!==i.reason)&&r()}}return T}updateResult(e){let t=this.#n,r=this.createResult(this.#s,this.options);if(this.#u=this.#s.state,this.#a=this.options,void 0!==this.#u.data&&(this.#o=this.#s),(0,c.VS)(r,t))return;this.#n=r;let s={};e?.listeners!==!1&&(()=>{if(!t)return!0;let{notifyOnChangeProps:e}=this.options,r="function"==typeof e?e():e;if("all"===r||!r&&!this.#f.size)return!0;let s=new Set(r??this.#f);return this.options.throwOnError&&s.add("error"),Object.keys(this.#n).some(e=>this.#n[e]!==t[e]&&s.has(e))})()&&(s.listeners=!0),this.#I({...s,...e})}#Q(){let e=this.#e.getQueryCache().build(this.#e,this.options);if(e===this.#s)return;let t=this.#s;this.#s=e,this.#i=e.state,this.hasListeners()&&(t?.removeObserver(this),e.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#R()}#I(e){n.V.batch(()=>{e.listeners&&this.listeners.forEach(e=>{e(this.#n)}),this.#e.getQueryCache().notify({query:this.#s,type:"observerResultsUpdated"})})}};function l(e,t){return!1!==(0,c.Nc)(t.enabled,e)&&void 0===e.state.data&&!("error"===e.state.status&&!1===t.retryOnMount)||void 0!==e.state.data&&d(e,t,t.refetchOnMount)}function d(e,t,r){if(!1!==(0,c.Nc)(t.enabled,e)){let s="function"==typeof r?r(e):r;return"always"===s||!1!==s&&f(e,t)}return!1}function p(e,t,r,s){return(e!==t||!1===(0,c.Nc)(s.enabled,e))&&(!r.suspense||"error"!==e.state.status)&&f(e,r)}function f(e,t){return!1!==(0,c.Nc)(t.enabled,e)&&e.isStaleByTime((0,c.KC)(t.staleTime,e))}var y=r(2265),R=r(9827);r(7437);var v=y.createContext((s=!1,{clearReset:()=>{s=!1},reset:()=>{s=!0},isReset:()=>s})),b=()=>y.useContext(v);function Q(){}var m=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&!t.isReset()&&(e.retryOnMount=!1)},g=e=>{y.useEffect(()=>{e.clearReset()},[e])},O=e=>{var t;let{result:r,errorResetBoundary:s,throwOnError:i,query:n}=e;return r.isError&&!s.isReset()&&!r.isFetching&&n&&(t=[r.error,n],"function"==typeof i?i(...t):!!i)},I=y.createContext(!1),C=()=>y.useContext(I);I.Provider;var S=e=>{e.suspense&&(void 0===e.staleTime&&(e.staleTime=1e3),"number"==typeof e.gcTime&&(e.gcTime=Math.max(e.gcTime,1e3)))},T=(e,t)=>e.isLoading&&e.isFetching&&!t,E=(e,t)=>e?.suspense&&t.isPending,k=(e,t,r)=>t.fetchOptimistic(e).catch(()=>{r.clearReset()});function w(e,t){return function(e,t,r){var s,i,u,a,h;let o=(0,R.NL)(r),l=C(),d=b(),p=o.defaultQueryOptions(e);null===(i=o.getDefaultOptions().queries)||void 0===i||null===(s=i._experimental_beforeQuery)||void 0===s||s.call(i,p),p._optimisticResults=l?"isRestoring":"optimistic",S(p),m(p,d),g(d);let f=!o.getQueryCache().get(p.queryHash),[v]=y.useState(()=>new t(o,p)),I=v.getOptimisticResult(p);if(y.useSyncExternalStore(y.useCallback(e=>{let t=l?Q:v.subscribe(n.V.batchCalls(e));return v.updateResult(),t},[v,l]),()=>v.getCurrentResult(),()=>v.getCurrentResult()),y.useEffect(()=>{v.setOptions(p,{listeners:!1})},[p,v]),E(p,I))throw k(p,v,d);if(O({result:I,errorResetBoundary:d,throwOnError:p.throwOnError,query:o.getQueryCache().get(p.queryHash)}))throw I.error;if(null===(a=o.getDefaultOptions().queries)||void 0===a||null===(u=a._experimental_afterQuery)||void 0===u||u.call(a,p,I),p.experimental_prefetchInRender&&!c.sk&&T(I,l)){let e=f?k(p,v,d):null===(h=o.getQueryCache().get(p.queryHash))||void 0===h?void 0:h.promise;null==e||e.catch(Q).finally(()=>{v.updateResult()})}return p.notifyOnChangeProps?I:v.trackResult(I)}(e,o,t)}}}]);