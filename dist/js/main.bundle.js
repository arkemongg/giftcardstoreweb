(()=>{"use strict";var e={14:(e,t,n)=>{n.d(t,{M2:()=>i,N0:()=>a});var o=n(594),c=n(335),r=n(779);const s=localStorage.getItem("cart_id");function a(){const e=document.querySelector("#cartToggleBtn"),t=document.querySelector(".cart-details-fixed-area"),n=document.getElementById("cartImage");e.addEventListener("click",(o=>{n.src.includes("shopping.svg")?(n.src="/assets/delete.png",e.classList.toggle("bg-green-500"),e.classList.toggle("hover:bg-green-600")):(n.src="/assets/shopping.svg",e.classList.toggle("bg-green-500"),e.classList.toggle("hover:bg-green-600")),t.classList.toggle("active-right")}))}function l(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const t=document.querySelector(".cart-details-fixed-area");document.querySelector(".cart-item-total"),document.querySelector(".cart-item-price span"),!1===e&&t.addEventListener("click",(e=>{if("cart-item-remove"==e.target.classList.value){const t=e.target.closest("li").querySelector(".cart-item-total").textContent,n=parseFloat(t.replace(/\$/g,"")),o=document.querySelector(".cart-total-price");let c=parseFloat(o.textContent);console.log(n),c-=n;const a=document.querySelector(".cart-count");let l=parseFloat(a.textContent);l--,a.textContent=l,o.textContent=c.toFixed(2),e.target.closest("li").remove();const i=`${r.Y}/api/carts/${s}/items/${e.target.id}`;fetch(i,{method:"DELETE"}).then((e=>{e.ok?console.log("Item deleted successfully."):console.error("Error deleting item.")})).catch((e=>{console.error("Error:",e)}))}})),null!==s&&(0,o.rQ)(`${r.Y}/api/carts/${s}/items`).then((e=>{const t=e;document.querySelector(".cart-count").textContent=t.length;const n=document.querySelector(".cart-total-price");let a=0;t.forEach((e=>{const t=e.product.title,l=e.product.price,i=e.total_price;a+=i;let d=i.toFixed(2),u="";e.product.image.length>0&&(u=r.Y+e.product.image[0].image);const m=(0,c.aJ)(t,l,d,u),p=document.querySelector(".flex-cart-list");m.querySelector(".cart-select").value=e.quantity,m.querySelector(".cart-item-remove").setAttribute("id",`${e.id}`),m.querySelector(".cart-select").addEventListener("change",(e=>{const t=m.querySelector(".cart-item-total");let n=(e.target.value*l).toFixed(2);t.innerHTML=`${n}$`}));const h=m.querySelector(".cart-select");h.setAttribute("id",e.id),h.addEventListener("change",(e=>{const t=e.target.value,c=e.target.id,a=`${r.Y}/api/carts/${s}/items/${c}/`,l={quantity:t};(0,o.xO)("PATCH",a,"PATCH","Error Updating the data",l).then((e=>{(0,o.xO)("GET",`${r.Y}/api/carts/${s}`,"","Can't get the data").then((e=>{n.textContent=e.total_price}))}))})),p.appendChild(m)})),n.textContent=a.toFixed(2)}))}function i(e){fetch(`${r.Y}/api/carts/${s}/items/`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({product_id:e.getAttribute("id"),quantity:1})}).then((t=>{if(console.log(t),t.ok)return document.querySelector(".flex-cart-list").innerHTML="",l(!0),t.json();if(400!==t.status)throw new Error("Error: "+t.statusText);t.json().then((t=>{if(e.querySelector(".error-message"));else{const n=document.createElement("p");n.className="error-message text-center",n.textContent=t[0],e.appendChild(n),setTimeout((()=>{e.removeChild(n)}),1e3)}throw new Error("Error: "+t[0])}))}))}console.log(s),null===s&&new Promise(((e,t)=>{const n=new XMLHttpRequest;n.open("POST",`${r.Y}/api/carts/`,!0),n.setRequestHeader("Content-Type","applicaton/json"),n.send(),n.onload=function(){if(201===n.status){const t=JSON.parse(n.responseText);e(t)}else t(new Error("can't do this "))}})).then((e=>{localStorage.setItem("cart_id",e.id)})),l(),document.querySelector(".checkout-btn").addEventListener("click",(e=>{const t=localStorage.getItem("cart_id");0==document.querySelector(".flex-cart-list").childElementCount||(document.body.append((0,c.yx)()),setTimeout((()=>{window.location.href=`${r.R}/checkout.html?cart_id=${t}`}),1e3))}))},594:(e,t,n)=>{function o(e,t,n,o,c){return new Promise(((r,s)=>{const a=new XMLHttpRequest;if(a.open(e,t,!0),"USER"==n){const e=localStorage.getItem("accessToken");a.setRequestHeader("Authorization",`JWT ${e}`),a.send()}else"PATCH"===n?(a.setRequestHeader("Content-Type","application/json"),a.send(JSON.stringify(c))):(a.setRequestHeader("Content-Type","applicaton/json"),a.send());a.onload=function(){if("POST"===e)if(201===a.status){const e=JSON.parse(a.responseText);r(e)}else s(new Error(o));else if("GET"==e)if(200===a.status){const e=JSON.parse(a.responseText);r(e)}else s(new Error(o));else"PATCH"===e&&(200===a.status?r(a.statusText):s(new Error(o)))}}))}async function c(e){try{const t=await fetch(e);if(!t.ok)throw new Error("Request failed with status code "+t.status);return await t.json()}catch(e){console.error("Error:",e)}}n.d(t,{rQ:()=>c,xO:()=>o})},215:(e,t,n)=>{function o(){let e=document.querySelector(".nav-responsive"),t=document.querySelector(".nav-response-list");document.getElementById("nav-res-btn").addEventListener("click",(function(n){n.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),e.classList.toggle("display-none"),e.classList.toggle("display-block"),t.classList.toggle("display-block"),t.classList.toggle("display-none")}))}n.d(t,{P:()=>o})},335:(e,t,n)=>{n.d(t,{Cr:()=>c,D5:()=>a,aJ:()=>r,c6:()=>i,jQ:()=>d,yE:()=>s,yx:()=>l});var o=n(779);function c(e,t,n,o){const c=document.createElement("div");c.className="card";const r=document.createElement("h1");r.style.fontSize="16px",r.style.fontWeight="700",r.style.marginTop="-20px",r.style.padding="10px",r.style.textAlign="center";const s=document.createElement("span");s.className="product-title",s.textContent=e,r.appendChild(s);const a=document.createElement("div");a.className="product-image-area";const l=document.createElement("img");l.src=o||"/assets/no-camera.png",l.alt="Product Image",a.appendChild(l);const i=document.createElement("div");i.className="product-details-area";const d=document.createElement("h1");d.style.fontSize="24px",d.style.fontWeight="900",d.style.padding="2px",d.style.textAlign="center";const u=document.createElement("span");u.className="product-price",u.innerHTML=`${t}`;const m=document.createElement("span");m.innerHTML="$",d.appendChild(u),d.appendChild(m);const p=document.createElement("p");p.style.fontSize="15px",p.style.fontWeight="900",p.style.textAlign="center";const h=document.createElement("span");h.className="product-category",h.textContent=n,p.appendChild(h);const g=document.createElement("div");g.className="product-btn-area";const f=document.createElement("button");f.className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded buy-now",f.textContent="Buy Now";const y=document.createElement("button");return y.className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add-to-cart",y.textContent="Add to cart",c.appendChild(r),c.appendChild(a),c.appendChild(i),c.appendChild(g),i.appendChild(d),i.appendChild(p),g.appendChild(f),g.appendChild(y),c}const r=(e,t,n,o)=>{const c=document.createElement("li");c.classList.add("flex-cart-items");const r=document.createElement("div");r.classList.add("cart-item-img");const s=document.createElement("img");s.src=o||"/assets/no-camera.png",s.alt="",s.style.width="90px",r.appendChild(s);const a=document.createElement("div");a.classList.add("cart-item-quantity-remove");const l=document.createElement("div");l.classList.add("cart-item-remove-btn");const i=document.createElement("img");i.classList.add("cart-item-remove"),i.src="/assets/bin.png",i.alt="remove",i.style.width="30px",l.appendChild(i);const d=document.createElement("div");d.classList.add("cart-item-quantity");const u=document.createElement("select");u.classList.add("cart-select"),u.style.backgroundColor="#111827";const m=document.createElement("option");m.value="1",m.selected=!0,m.textContent="1",u.appendChild(m);const p=document.createElement("option");p.value="2",p.textContent="2",u.appendChild(p);const h=document.createElement("option");h.value="3",h.textContent="3",u.appendChild(h);const g=document.createElement("option");g.value="4",g.textContent="4",u.appendChild(g);const f=document.createElement("option");f.value="5",f.textContent="5",u.appendChild(f),d.appendChild(u),a.appendChild(l),a.appendChild(d);const y=document.createElement("div");y.classList.add("cart-item-details"),y.style.marginRight="10px";const v=document.createElement("div");v.classList.add("cart-item-name");const E=document.createElement("p");E.style.fontSize="11px",E.textContent="Name : "+e,v.appendChild(E);const C=document.createElement("div");C.classList.add("cart-item-price"),C.style.fontSize="11px",C.textContent="Price : "+t,y.appendChild(v),y.appendChild(C);const x=document.createElement("div");return x.classList.add("cart-item-total"),x.style.fontSize="14px",x.innerHTML=`${n}$`,c.appendChild(r),c.appendChild(a),c.appendChild(y),c.appendChild(x),c};function s(){const e=document.createElement("div");e.classList.add("logout-area"),e.classList.add("hidden");const t=document.createElement("div");t.classList.add("close-user-profile-options"),t.textContent="x",e.appendChild(t);const n=document.createElement("a");n.href=`${o.R}/profile.html`;const c=document.createElement("button");c.classList.add("profile"),c.textContent="Profile",n.appendChild(c),e.appendChild(n);const r=document.createElement("button");return r.classList.add("logout"),r.textContent="Logout",e.appendChild(r),e}function a(){const e=document.createElement("li");e.classList.add("responsive-profile");const t=document.createElement("a");t.href=`${o.R}/profile.html`;const n=document.createElement("button");n.textContent="Profile",t.appendChild(n),e.appendChild(t);const c=document.createElement("li");c.classList.add("responsive-logout");const r=document.createElement("a");r.href="#";const s=document.createElement("button");return s.classList.add("logout"),s.textContent="Logout",r.appendChild(s),c.appendChild(r),[e,c]}function l(){const e=document.createElement("div");e.classList.add("loading-btn-effect","btn-action");const t=document.createElement("div");t.classList.add("inline-block","h-8","w-8","animate-spin","rounded-full","border-4","border-solid","border-current","border-r-transparent","align-[-0.125em]","motion-reduce:animate-[spin_1.5s_linear_infinite]"),t.setAttribute("role","status");const n=document.createElement("span");return n.classList.add("!absolute","!-m-px","!h-px","!w-px","!overflow-hidden","!whitespace-nowrap","!border-0","!p-0","![clip:rect(0,0,0,0)]"),n.innerText="Loading...",t.appendChild(n),e.appendChild(t),e}const i=l();function d(e,t){var n=document.createElement("div");n.className="category-section-categories";var o=document.createElement("img");o.src=t||"/assets/no-camera.png",o.alt="";var c=document.createElement("h2");return c.textContent=e,n.appendChild(o),n.appendChild(c),n}},779:(e,t,n)=>{n.d(t,{R:()=>c,Y:()=>o});const o="http://127.0.0.1:8000",c="http://127.0.0.1:5500"},970:(e,t,n)=>{n.d(t,{Jp:()=>c});var o=n(335);function c(){new Promise(((e,t)=>{const n=localStorage.getItem("accessToken");if(console.log(n),"undefined"!==n&&null!==n){const o=new XMLHttpRequest;o.open("GET","http://127.0.0.1:8000/auth/users",!0),o.setRequestHeader("Authorization",`JWT ${n}`),o.send(),o.onload=function(){if(200===o.status){const t=JSON.parse(o.responseText);e(t)}else localStorage.removeItem("accessToken"),t(new Error("Access token is invalid or expired."))},o.onerror=function(){t(new Error("An error occurred while making the request."))}}else t(new Error("Access token is undefined."))})).then((e=>{console.log(e),document.querySelector("body").style.display="block";const t=document.querySelector("#nav-login-register"),n=document.querySelector("#nav-response-login-register"),c=`<a href="#">${e[0].username}&#9662</a>`;t.innerHTML=c,n.innerHTML=c,(window.location.href.includes("login.html")||window.location.href.includes("signup.html")||window.location.href.includes("password_reset.html"))&&(window.location.href="profile.html");const r=document.querySelector(".nav-response-list"),[s,a]=(0,o.D5)();r.appendChild(s),r.appendChild(a);const l=document.querySelector(".nav-area"),i=(0,o.yE)();l.appendChild(i);const d=document.querySelector(".close-user-profile-options"),u=document.querySelector(".logout-area");t.addEventListener("click",(e=>{e.preventDefault(),u.classList.toggle("hidden")})),d.addEventListener("click",(e=>{e.preventDefault(),u.classList.toggle("hidden")}))})).catch((e=>{window.location.href.includes("profile.html")&&(window.location.href="login.html"),console.error("Error:",e.message)}))}document.body.addEventListener("click",(e=>{const t=(0,o.yx)();if(e.target.classList.contains("logout")){document.body.appendChild(t),localStorage.removeItem("accessToken");const e="http://127.0.0.1:5500/";setTimeout((()=>{window.location.href=e}),1e3)}}))}},t={};function n(o){var c=t[o];if(void 0!==c)return c.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=n(335),t=n(594),o=n(215),c=n(970),r=n(14),s=n(779);function a(e){const t=e.target.closest(".card");(0,r.M2)(t)}document.body.appendChild(e.c6),(0,o.P)(),(0,c.Jp)(),(0,r.N0)();const l=document.querySelector(".cards");let i=null;function d(){i&&(0,t.rQ)(i).then((t=>{console.log(t),t.results.forEach((t=>{let n="";t.image.length>0&&(n=t.image[0].image);const o=(0,e.Cr)(t.title,t.price,t.category.title,n);o.setAttribute("id",`${t.id}`),o.querySelector(".add-to-cart").addEventListener("click",(e=>{a(e)})),o.querySelector(".buy-now").addEventListener("click",(function(){window.location.href=`${s.R}/buynow.html?id=${t.id}`})),l.appendChild(o)})),i=t.next}))}!function(){document.body.appendChild(e.c6);const n=`${s.Y}/api/products/`;(0,t.rQ)(n).then((t=>{t.results.forEach((t=>{let n="";t.image.length>0&&(n=t.image[0].image);const o=(0,e.Cr)(t.title,t.price,t.category.title,n),c=o.querySelector(".add-to-cart");o.querySelector(".buy-now").addEventListener("click",(function(){window.location.href=`${s.R}/buynow.html?id=${t.id}`})),c.addEventListener("click",(e=>{a(e)})),o.setAttribute("id",`${t.id}`),l.appendChild(o)})),i=t.next,document.body.removeChild(e.c6)})).catch((t=>{console.log(t),document.body.removeChild(e.c6)}))}();const u=document.querySelector(".btn-right"),m=document.querySelector(".btn-left");let p=0;document.querySelector(".card");let h,g=-1*l.offsetWidth;function f(){l.style.transition="1s";let e=-390*l.childElementCount;g>e?(g-=390,p-=390,l.style.transform=`translateX(${p}px)`):d()}function y(){h=setInterval(f,6e3)}function v(){clearInterval(h),y()}l.addEventListener("click",(e=>{v(),console.log(e)}));var E=0,C=0,x=!1,L=!1;l.addEventListener("touchstart",(e=>{E=e.touches[0].clientX,x=!1,l.style.transition="0s"})),l.addEventListener("touchmove",(e=>{var t=(C=e.touches[0].clientX)-E;if(!x&&Math.abs(t)>5&&(x=!0,e.preventDefault()),x){var n=Math.min(0,-(390*l.childElementCount-450)),o=Math.abs(t)/450*t,c=Math.max(n,Math.min(p+o,0));l.style.transform=`translateX(${c}px)`,c!==n||L||(L=!0,d())}})),l.addEventListener("touchend",(e=>{if(x){var t=C-E;if(Math.abs(t)>5)if(t>0)p<0&&(g+=390,p+=390);else if(t<0){var n=-(390*l.childElementCount-450);p>n&&(g-=390,p-=390)}l.style.transform=`translateX(${p}px)`,v(),x=!1,L=!1}})),u.addEventListener("click",(e=>{l.style.transition="1s";let t=-390*l.childElementCount;g>t?(g-=390,p-=390,l.style.transform=`translateX(${p}px)`):d(),v()})),m.addEventListener("click",(e=>{l.style.transition="1s",0!==p&&(g+=390,p+=390,l.style.transform=`translateX(${p}px)`),v()})),y();const w=document.querySelector(".category-container");(0,t.rQ)(`${s.Y}/api/categories/`).then((t=>{t.forEach((t=>{let n="";t.image.length>0&&(n=t.image[0].image);var o=n;const c=(0,e.jQ)(t.title,o);c.setAttribute("id",t.id),w.appendChild(c);const r=c.querySelector("img");c.addEventListener("mouseover",(()=>{r.classList.add("hover-effect")})),c.addEventListener("mouseout",(()=>{r.classList.remove("hover-effect")})),r.addEventListener("mousedown",(()=>{r.classList.remove("hover-effect")})),r.addEventListener("mouseup",(()=>{r.classList.add("hover-effect")})),c.addEventListener("click",(e=>{window.location.href=`/products.html?category=${e.target.closest(".category-section-categories").id}`}))}))}));const b=document.querySelector("#nav-categories"),S=document.querySelector("#nav-response-categories");b.addEventListener("click",(e=>{const t=document.querySelector(".category-section"),n=window.innerHeight,o=t.offsetTop-n/2;window.scrollTo({top:o,behavior:"smooth"})})),S.addEventListener("click",(e=>{const t=document.querySelector(".category-section"),n=window.innerHeight,o=t.offsetTop-n/2;window.scrollTo({top:o,behavior:"smooth"})})),window.addEventListener("load",(t=>{document.body.removeChild(e.c6)}))})()})();