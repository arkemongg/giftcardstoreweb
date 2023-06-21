import { header_responsvie_nav } from './header.js';
import { validate_user_update_design } from './validate_user.js';
import { createLoadingElement } from './templates.js';
 validate_user_update_design();

 header_responsvie_nav();

  let username_sign_in = document.querySelector('#sign-in-username')
  let password_sign_in = document.querySelector('#sign-in-password')

  const sign_in_btn_post = document.querySelector('.sign-in-btn-post')
  const warning_sign_in = document.querySelector('.waring-sign-in')
  
  const loading_element = createLoadingElement()
  
  async function jwt_create(username, password) {
    const loginData = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (data.access) {
        localStorage.setItem('accessToken', data.access);
        const loading_element = createLoadingElement();
        document.body.appendChild(loading_element);
        setTimeout(() => {
          document.body.removeChild(loading_element);
          window.location.href = 'http://127.0.0.1:5500/profile.html';
        }, 1000);
      } else {
        const loading_element = createLoadingElement();
        document.body.appendChild(loading_element);
        setTimeout(() => {
          document.body.removeChild(loading_element);
          let l = data.detail;
          warning_sign_in.innerText = l;
        }, 1000);
      }
    } catch (error) {
      // Handle any errors
      console.error('error');
      console.error(error);
    }
  }
  
  sign_in_btn_post.addEventListener('click',event=>{
    event.preventDefault()
    let username = username_sign_in.value
    let password = password_sign_in.value
    
    if (username.trim() === '' || password.trim() === '') {
      warning_sign_in.innerText = 'Please recheck your username and password'
  } else {
    jwt_create(username, password);
  }
  })

  