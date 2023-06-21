import { header_responsvie_nav } from './header.js';
import { validate_user_update_design } from './validate_user.js';
import { createLoadingElement } from './templates.js';
import { createUser } from './data_request.js';

const loading_element = createLoadingElement()
document.body.appendChild(loading_element)

header_responsvie_nav();
validate_user_update_design();

setTimeout(() => {
    document.body.removeChild(loading_element)
}, 500);


const sign_up_post = document.querySelector('.sign-up-post')
let verify_password = false

const passwordInput = document.getElementById('main-password');
const confirmPasswordInput = document.getElementById('confirm-password');

function validate_password() {
    
    const passwordError = document.getElementById('password-error');
    const passwordWarning = document.getElementById('password-warning');
   
    let isConfirmPasswordTouched = false;
  
    function checkPasswordMatch() {
      if (!isConfirmPasswordTouched) {
        return;
      }
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      if (password === confirmPassword) {
        passwordError.classList.add('hidden');
        return true
      } else {
        passwordError.classList.remove('hidden');
        return false
      }
    }
  
    function validatePasswordStrength() {
      const password = passwordInput.value;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const isLengthValid = password.length >= 8;
      const hasAlphabet = /[a-zA-Z]/.test(password);
    
      if (hasUpperCase && hasLowerCase && hasNumber && hasAlphabet && isLengthValid) {
        passwordWarning.textContent = ''; // Clear any previous error message
        passwordWarning.classList.add('hidden');
        return true; // Password is valid
      } else {
        passwordWarning.textContent = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long.';
        passwordWarning.classList.remove('hidden');
        return false; // Password is invalid
      }
    }
    
    confirmPasswordInput.addEventListener('focus', function() {
      isConfirmPasswordTouched = true;
    });
    
    passwordInput.addEventListener('input', function() {
      let validate_stength =  validatePasswordStrength();
      let password_match = checkPasswordMatch();
      if(password_match && validate_stength){
        verify_password = true
      }else{
        verify_password = false
      }
    });
    confirmPasswordInput.addEventListener('input', ()=>{
        let password_match = checkPasswordMatch()

        if(password_match){
            verify_password = true
          }else{
            verify_password = false
          }
    });
  }

  validate_password()
  function verifyEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const email_waring = document.querySelector('#email-warning')
  let verify_email = false;
  const emailInput = document.querySelector('#email')

  emailInput.addEventListener('input',event=>{
    const email = emailInput.value;
    verify_email = verifyEmail(email)
    if(verify_email === false){
      email_waring.classList.remove('hidden')
    }else{
      email_waring.classList.add('hidden')
    }
  })




  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9@/./+/-/_]{4,150}$/;
    return usernameRegex.test(username);
  }

  const user_name_waring = document.querySelector('#username-warning')
  let verify_username = false;
  const usernameInput = document.querySelector('#username')
  usernameInput.addEventListener('input', () => {
      const username = usernameInput.value;
      verify_username = validateUsername(username)
      if(verify_username === false){
        user_name_waring.classList.remove('hidden')
      }else{
        user_name_waring.classList.add('hidden')
      }
  });

    sign_up_post.addEventListener('click',event=>{
    event.preventDefault()
    document.body.appendChild(loading_element)
    console.log(verify_password);
    if(verify_email === false){
       document.body.removeChild(loading_element)
        email_waring.classList.remove('hidden')
        email_waring.classList.add('shake-message')
        setTimeout(() => {
            email_waring.classList.remove('shake-message')
        }, 1000);

    }else if(verify_password === false){
      document.body.removeChild(loading_element)

      const passowrd_error = document.querySelector('#password-error')
      const passowrd_warning = document.querySelector('#password-warning')
      
      passowrd_error.classList.remove('hidden')
      passowrd_error.classList.add('shake-message')

      passowrd_warning.classList.add('shake-message')
      passowrd_warning.classList.remove('hidden')
      setTimeout(() => {
       passowrd_warning.classList.remove('shake-message')
       passowrd_error.classList.remove('shake-message')
      }, 1000);
    }else if(verify_username === false){
        document.body.removeChild(loading_element)
        user_name_waring.classList.remove('hidden')
        user_name_waring.classList.add('shake-message')
        setTimeout(() => {
        user_name_waring.classList.remove('shake-message')
        }, 1000);
    }else{
        const email_data = emailInput.value
        const password_data = passwordInput.value
        const confirm_password_data = confirmPasswordInput.value
        const username_data = usernameInput.value

        createUser(username_data,password_data,confirm_password_data,email_data)
        .then(data=>{
          document.body.removeChild(loading_element)
          window.location.href = `http://127.0.0.1:5500/account_created.html?email=${email_data}`
        })
        .catch(error=>{
            error.then(err=>{
                document.body.removeChild(loading_element)
                const err_username = err.username
                const err_email = err.email

                const username_waring_sign_up = document.querySelector('.username-warning-sign-up')
                const email_waring_sign_up = document.querySelector('.email-warning-sign-up')

                const warning = document.querySelector('.warning-sign-up')
                warning.classList.remove('hidden')
                if(err_username!==undefined){
                    username_waring_sign_up.textContent = err_username
                }else{
                    username_waring_sign_up.textContent = ''

                }
                if(err_email!==undefined){
                    email_waring_sign_up.textContent = err_email
                }else{
                    email_waring_sign_up.textContent = ''
                }

            })
        })


    }
  })


  