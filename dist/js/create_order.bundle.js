(()=>{"use strict";var e,t={215:(e,t,n)=>{function o(){let e=document.querySelector(".nav-responsive"),t=document.querySelector(".nav-response-list");document.getElementById("nav-res-btn").addEventListener("click",(function(n){n.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),e.classList.toggle("display-none"),e.classList.toggle("display-block"),t.classList.toggle("display-block"),t.classList.toggle("display-none")}))}n.d(t,{P:()=>o})},335:(e,t,n)=>{n.d(t,{D5:()=>r,yE:()=>s,yx:()=>l});var o=n(779);function s(){const e=document.createElement("div");e.classList.add("logout-area"),e.classList.add("hidden");const t=document.createElement("div");t.classList.add("close-user-profile-options"),t.textContent="x",e.appendChild(t);const n=document.createElement("a");n.href=`${o.R}/profile.html`;const s=document.createElement("button");s.classList.add("profile"),s.textContent="Profile",n.appendChild(s),e.appendChild(n);const r=document.createElement("button");return r.classList.add("logout"),r.textContent="Logout",e.appendChild(r),e}function r(){const e=document.createElement("li");e.classList.add("responsive-profile");const t=document.createElement("a");t.href=`${o.R}/profile.html`;const n=document.createElement("button");n.textContent="Profile",t.appendChild(n),e.appendChild(t);const s=document.createElement("li");s.classList.add("responsive-logout");const r=document.createElement("a");r.href="#";const l=document.createElement("button");return l.classList.add("logout"),l.textContent="Logout",r.appendChild(l),s.appendChild(r),[e,s]}function l(){const e=document.createElement("div");e.classList.add("loading-btn-effect","btn-action");const t=document.createElement("div");t.classList.add("inline-block","h-8","w-8","animate-spin","rounded-full","border-4","border-solid","border-current","border-r-transparent","align-[-0.125em]","motion-reduce:animate-[spin_1.5s_linear_infinite]"),t.setAttribute("role","status");const n=document.createElement("span");return n.classList.add("!absolute","!-m-px","!h-px","!w-px","!overflow-hidden","!whitespace-nowrap","!border-0","!p-0","![clip:rect(0,0,0,0)]"),n.innerText="Loading...",t.appendChild(n),e.appendChild(t),e}l()},779:(e,t,n)=>{n.d(t,{R:()=>o});const o="http://127.0.0.1:5500"},970:(e,t,n)=>{n.d(t,{Jp:()=>s});var o=n(335);function s(){new Promise(((e,t)=>{const n=localStorage.getItem("accessToken");if(//console.log(n),"undefined"!==n&&null!==n){const o=new XMLHttpRequest;o.open("GET","http://127.0.0.1:8000/auth/users",!0),o.setRequestHeader("Authorization",`JWT ${n}`),o.send(),o.onload=function(){if(200===o.status){const t=JSON.parse(o.responseText);e(t)}else localStorage.removeItem("accessToken"),t(new Error("Access token is invalid or expired."))},o.onerror=function(){t(new Error("An error occurred while making the request."))}}else t(new Error("Access token is undefined."))})).then((e=>{//console.log(e),document.querySelector("body").style.display="block";const t=document.querySelector("#nav-login-register"),n=document.querySelector("#nav-response-login-register"),s=`<a href="#">${e[0].username}&#9662</a>`;t.innerHTML=s,n.innerHTML=s,(window.location.href.includes("login.html")||window.location.href.includes("signup.html")||window.location.href.includes("password_reset.html"))&&(window.location.href="profile.html");const r=document.querySelector(".nav-response-list"),[l,c]=(0,o.D5)();r.appendChild(l),r.appendChild(c);const i=document.querySelector(".nav-area"),d=(0,o.yE)();i.appendChild(d);const a=document.querySelector(".close-user-profile-options"),u=document.querySelector(".logout-area");t.addEventListener("click",(e=>{e.preventDefault(),u.classList.toggle("hidden")})),a.addEventListener("click",(e=>{e.preventDefault(),u.classList.toggle("hidden")}))})).catch((e=>{window.location.href.includes("profile.html")&&(window.location.href="login.html"),console.error("Error:",e.message)}))}document.body.addEventListener("click",(e=>{const t=(0,o.yx)();if(e.target.classList.contains("logout")){document.body.appendChild(t),localStorage.removeItem("accessToken");const e="http://127.0.0.1:5500/";setTimeout((()=>{window.location.href=e}),1e3)}}))}},n={};function o(e){var s=n[e];if(void 0!==s)return s.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e=o(970),(0,o(215).P)(),(0,e.Jp)()})();