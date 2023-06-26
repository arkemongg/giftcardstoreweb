import { profileLogout,createResponsiveProfileElements,createLoadingElement } from "./templates.js";
import { api_url, domain_url } from "./urls.js";

export function validate_user() {
    return new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem('accessToken');
      //console.log(accessToken);
      if (accessToken !== 'undefined' && accessToken !== null) {
        const request = new XMLHttpRequest();
        request.open("GET", `${api_url}/auth/users`, true);
        request.setRequestHeader("Authorization", `JWT ${accessToken}`);
        request.send();
        request.onload = function () {
          if (request.status === 200) {
            const user = JSON.parse(request.responseText);
            resolve(user);
          } else {
            localStorage.removeItem('accessToken');
            reject(new Error('Access token is invalid or expired.'));
          }
        };
        request.onerror = function () {
          reject(new Error('An error occurred while making the request.'));
        };
      } else {
        reject(new Error('Access token is undefined.'));
      }
    });
  }


export function validate_user_update_design(){
validate_user()
  .then((user) => {
    //console.log(user);
   document.querySelector('body').style.display = 'block'
   const nav_login_register = document.querySelector('#nav-login-register')
   const nav_login_register_responsive = document.querySelector('#nav-response-login-register')
   const user_template = `<a href="#">${user[0].username}&#9662</a>`
   nav_login_register.innerHTML = user_template
   nav_login_register_responsive.innerHTML = user_template
    if (window.location.href.includes("login.html") || window.location.href.includes("signup.html") || window.location.href.includes("password_reset.html")) {
        window.location.href = "profile.html";
    }
    const reponsiveNavUl = document.querySelector('.nav-response-list')

    const [profileLi, logoutLi] = createResponsiveProfileElements();
    reponsiveNavUl.appendChild(profileLi)
    reponsiveNavUl.appendChild(logoutLi)

    
    const nav_area = document.querySelector('.nav-area')

    const logout_area_html = profileLogout()
    nav_area.appendChild(logout_area_html)
    
    const hide_logout_profile = document.querySelector('.close-user-profile-options')

    const logout_profile = document.querySelector('.logout-area')

    nav_login_register.addEventListener('click',event=>{
      event.preventDefault();
      logout_profile.classList.toggle('hidden')
    })
    hide_logout_profile.addEventListener('click',event=>{
      event.preventDefault();
      logout_profile.classList.toggle('hidden')
    })

  })
  .catch((error) => {
    if (window.location.href.includes("profile.html")) {
      window.location.href = "login.html";
    }
    // console.error('Error:', error.message);
  });
}


export function validate_customer(){
  return new Promise((resolve,reject)=>{
      const accessToken = localStorage.getItem('accessToken');
      const request = new XMLHttpRequest();
      request.open("GET", `${api_url}/api/customer`, true);
      request.setRequestHeader("Authorization", `JWT ${accessToken}`);
      request.send()
      request.onload = function(){
        if (request.status === 200){
          const customer = JSON.parse(request.responseText)
          resolve(customer)
        } else {
          reject(new Error('Customer is not accessable'));
        }
      }
      request.onerror = function () {
        reject(new Error('An error occurred while making the request.'));
      };
  })
}



const body = document.body

body.addEventListener('click', event => {
  const loading_element = createLoadingElement()
  
  if (event.target.classList.contains('logout')) {
    document.body.appendChild(loading_element)
    localStorage.removeItem('accessToken')
    const newUrl = `${domain_url}`;
    setTimeout(() => {
      window.location.href = newUrl;
    }, 1000);
  }
});