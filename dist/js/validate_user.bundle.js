(()=>{"use strict";var e,t={335:(e,t,n)=>{function o(){const e=document.createElement("div");e.classList.add("loading-btn-effect","btn-action");const t=document.createElement("div");t.classList.add("inline-block","h-8","w-8","animate-spin","rounded-full","border-4","border-solid","border-current","border-r-transparent","align-[-0.125em]","motion-reduce:animate-[spin_1.5s_linear_infinite]"),t.setAttribute("role","status");const n=document.createElement("span");return n.classList.add("!absolute","!-m-px","!h-px","!w-px","!overflow-hidden","!whitespace-nowrap","!border-0","!p-0","![clip:rect(0,0,0,0)]"),n.innerText="Loading...",t.appendChild(n),e.appendChild(t),e}n.d(t,{yx:()=>o}),o()}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e=o(335),document.body.addEventListener("click",(t=>{const n=(0,e.yx)();if(t.target.classList.contains("logout")){document.body.appendChild(n),localStorage.removeItem("accessToken");const e="http://127.0.0.1:5500/";setTimeout((()=>{window.location.href=e}),1e3)}}))})();