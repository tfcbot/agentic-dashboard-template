(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2],{7293:function(e,t,n){Promise.resolve().then(n.bind(n,9677))},3438:function(e,t,n){"use strict";n.d(t,{pC:function(){return h},O3:function(){return f}});var r=n(2265),i=n(16),s=n(2711);let o="https://development-api.agenticstarter.com/v1",a={"Content-Type":"application/json"},c=e=>{if(!o)throw Error("NEXT_API_URL is not defined");return new URL("/v1"+e,o).toString()},u=e=>({...a,Authorization:"Bearer ".concat(e)});async function l(e){let t=c("/checkout"),n=await fetch(t,{method:"POST",headers:u(e),body:JSON.stringify({quantity:1,amount:100})});return(await n.json()).id}let d={credits:1e4};function f(){let{getToken:e}=(0,s.y)();return(0,i.a)({queryKey:["userCreditsRemaining"],queryFn:async()=>(await new Promise(e=>setTimeout(e,500)),d)})}function h(){let[e,t]=r.useState(!1),[n,i]=r.useState(null);return{getSessionId:async e=>{t(!0),i(null);try{let t=await l(e);if(!t)throw Error("Failed to create checkout session");return t}catch(e){throw i(e instanceof Error?e:Error("An unknown error occurred")),n}finally{t(!1)}},isLoading:e,error:n}}n(257).env.NEXT_PUBLIC_API_URL},9677:function(e,t,n){"use strict";n.d(t,{DashboardHeader:function(){return o}});var r=n(7437),i=n(3438),s=n(336);function o(e){var t,n;let{title:o}=e,{data:a,isLoading:c}=(0,i.O3)();return(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold text-white",children:o}),(0,r.jsx)("div",{className:"text-gray-300",children:c?(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)(s.Z,{}),(0,r.jsx)("span",{children:"Loading credits..."})]}):(0,r.jsxs)("span",{children:["Credits: ",null!==(n=null==a?void 0:null===(t=a.credits)||void 0===t?void 0:t.toLocaleString())&&void 0!==n?n:0]})})]})}},336:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(7437);function i(){return(0,r.jsx)("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"})}}},function(e){e.O(0,[711,763,16,971,117,744],function(){return e(e.s=7293)}),_N_E=e.O()}]);