(()=>{"use strict";var e={215:(e,t,n)=>{function o(){let e=document.querySelector(".nav-responsive"),t=document.querySelector(".nav-response-list");document.getElementById("nav-res-btn").addEventListener("click",(function(n){n.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),e.classList.toggle("display-none"),e.classList.toggle("display-block"),t.classList.toggle("display-block"),t.classList.toggle("display-none")}))}n.d(t,{P:()=>o})},335:(e,t,n)=>{n.d(t,{D5:()=>s,yE:()=>r,yx:()=>c});var o=n(779);function r(){const e=document.createElement("div");e.classList.add("logout-area"),e.classList.add("hidden");const t=document.createElement("div");t.classList.add("close-user-profile-options"),t.textContent="x",e.appendChild(t);const n=document.createElement("a");n.href=`${o.R}/profile.html`;const r=document.createElement("button");r.classList.add("profile"),r.textContent="Profile",n.appendChild(r),e.appendChild(n);const s=document.createElement("button");return s.classList.add("logout"),s.textContent="Logout",e.appendChild(s),e}function s(){const e=document.createElement("li");e.classList.add("responsive-profile");const t=document.createElement("a");t.href=`${o.R}/profile.html`;const n=document.createElement("button");n.textContent="Profile",t.appendChild(n),e.appendChild(t);const r=document.createElement("li");r.classList.add("responsive-logout");const s=document.createElement("a");s.href="#";const c=document.createElement("button");return c.classList.add("logout"),c.textContent="Logout",s.appendChild(c),r.appendChild(s),[e,r]}function c(){const e=document.createElement("div");e.classList.add("loading-btn-effect","btn-action");const t=document.createElement("div");t.classList.add("inline-block","h-8","w-8","animate-spin","rounded-full","border-4","border-solid","border-current","border-r-transparent","align-[-0.125em]","motion-reduce:animate-[spin_1.5s_linear_infinite]"),t.setAttribute("role","status");const n=document.createElement("span");return n.classList.add("!absolute","!-m-px","!h-px","!w-px","!overflow-hidden","!whitespace-nowrap","!border-0","!p-0","![clip:rect(0,0,0,0)]"),n.innerText="Loading...",t.appendChild(n),e.appendChild(t),e}c()},779:(e,t,n)=>{n.d(t,{R:()=>o});const o="http://127.0.0.1:5500"},970:(e,t,n)=>{n.d(t,{Jp:()=>r});var o=n(335);function r(){new Promise(((e,t)=>{const n=localStorage.getItem("accessToken");if(console.log(n),"undefined"!==n&&null!==n){const o=new XMLHttpRequest;o.open("GET","http://127.0.0.1:8000/auth/users",!0),o.setRequestHeader("Authorization",`JWT ${n}`),o.send(),o.onload=function(){if(200===o.status){const t=JSON.parse(o.responseText);e(t)}else localStorage.removeItem("accessToken"),t(new Error("Access token is invalid or expired."))},o.onerror=function(){t(new Error("An error occurred while making the request."))}}else t(new Error("Access token is undefined."))})).then((e=>{console.log(e),document.querySelector("body").style.display="block";const t=document.querySelector("#nav-login-register"),n=document.querySelector("#nav-response-login-register"),r=`<a href="#">${e[0].username}&#9662</a>`;t.innerHTML=r,n.innerHTML=r,(window.location.href.includes("login.html")||window.location.href.includes("signup.html")||window.location.href.includes("password_reset.html"))&&(window.location.href="profile.html");const s=document.querySelector(".nav-response-list"),[c,i]=(0,o.D5)();s.appendChild(c),s.appendChild(i);const l=document.querySelector(".nav-area"),a=(0,o.yE)();l.appendChild(a);const d=document.querySelector(".close-user-profile-options"),u=document.querySelector(".logout-area");t.addEventListener("click",(e=>{e.preventDefault(),u.classList.toggle("hidden")})),d.addEventListener("click",(e=>{e.preventDefault(),u.classList.toggle("hidden")}))})).catch((e=>{window.location.href.includes("profile.html")&&(window.location.href="login.html"),console.error("Error:",e.message)}))}document.body.addEventListener("click",(e=>{const t=(0,o.yx)();if(e.target.classList.contains("logout")){document.body.appendChild(t),localStorage.removeItem("accessToken");const e="http://127.0.0.1:5500/";setTimeout((()=>{window.location.href=e}),1e3)}}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(215),t=n(970),o=n(335);(0,t.Jp)(),(0,e.P)();let r=document.querySelector("#sign-in-username"),s=document.querySelector("#sign-in-password");const c=document.querySelector(".sign-in-btn-post"),i=document.querySelector(".waring-sign-in");(0,o.yx)(),c.addEventListener("click",(e=>{e.preventDefault();let t=r.value,n=s.value;""===t.trim()||""===n.trim()?i.innerText="Please recheck your username and password":async function(e,t){const n={username:e,password:t};try{const e=await fetch("http://127.0.0.1:8000/auth/jwt/create/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),t=await e.json();if(t.access){localStorage.setItem("accessToken",t.access);const e=(0,o.yx)();document.body.appendChild(e),setTimeout((()=>{document.body.removeChild(e),window.location.href="http://127.0.0.1:5500/profile.html"}),1e3)}else{const e=(0,o.yx)();document.body.appendChild(e),setTimeout((()=>{document.body.removeChild(e);let n=t.detail;i.innerText=n}),1e3)}}catch(e){console.error("error"),console.error(e)}}(t,n)}))})()})();