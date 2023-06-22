import {loading_element} from './templates.js'
import {validate_user_update_design} from './validate_user.js'
import { header_responsvie_nav } from './header.js';
import {resetPasswordConfirm, reset_password_email} from './data_request.js'
import { domain_url,api_url } from './urls.js';
document.body.appendChild(loading_element)


validate_user_update_design();
header_responsvie_nav();

const url = window.location.href

if(url === `${domain_url}/password_reset.html`){
    const email_area = document.querySelector('.reset-password-email-section')
    email_area.classList.remove('hidden')

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

      const reset_password_email_post = document.querySelector('.reset-password-email-post')
      reset_password_email_post.addEventListener('click',event=>{
        event.preventDefault()
        document.body.appendChild(loading_element)
        if(verify_email===true){
            const email = document.querySelector('#email').value
            reset_password_email(email)
            .then(success=>{
                document.body.removeChild(loading_element)
                const form = document.querySelector('.form')
                form.innerHTML = `<h1 >An Email has been sent successfully to this email ${email}</h1>`
            })
            .catch(err=>{
                document.body.removeChild(loading_element)
                
                const server_warning = document.querySelector('#server-warning')

                server_warning.classList.remove('hidden')
                server_warning.textContent = err
                server_warning.classList.add('shake-message')
                setTimeout(() => {
                    server_warning.classList.remove('shake-message')
                }, 1000);
                setTimeout(() => {
                    server_warning.classList.add('hidden')
                }, 5000);
            })
        }else{
            document.body.removeChild(loading_element)
            email_waring.classList.remove('hidden')
            email_waring.classList.add('shake-message')
            setTimeout(() => {
                email_waring.classList.remove('shake-message')
            }, 1000);
        }
      })


}else{
    document.body.removeChild(loading_element)
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    
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

  
    if(uid !==null && token!==null ){
        const reset_password_section = document.querySelector('.reset-password-section')
        reset_password_section.classList.remove('hidden')
        validate_password()

        const reset_password_btn = document.querySelector('.reset-password-post')

        reset_password_btn.addEventListener('click',event=>{
            event.preventDefault()
            document.body.appendChild(loading_element)
            if(verify_password === true){
                
                const pass =  passwordInput.value
                resetPasswordConfirm(uid,token,pass)
                .then(success=>{
                    document.body.removeChild(loading_element)
                    const form = document.querySelector('.form-two')
                    form.innerHTML = `<h1 >Password Successfully Changed</h1> <br>
                    <a href="${domain_url}/login.html">
                        <button onclick="event.preventDefault(); window.location.href='${domain_url}/login.html';" class="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                    </a>
                    `
                }).catch(err=>{
                    document.body.removeChild(loading_element)
                    const btn_error = document.querySelector('#btn-error')
                    btn_error.classList.remove('hidden')
                    btn_error.classList.add('shake-message')
                    
                    if(err.uid){
                        btn_error.textContent = 'Invalid USER ID/Expired'
                    }else if(err.token){
                        btn_error.textContent = 'Invalid Token/Expired'
                    }
                    setTimeout(() => {
                        btn_error.classList.remove('shake-message')
                    }, 1000);
                    setTimeout(() => {
                        btn_error.classList.add('hidden')
                    }, 3000);
                })
            }else{
                document.body.removeChild(loading_element)
                const btn_error = document.querySelector('#btn-error')
                btn_error.classList.remove('hidden')
                btn_error.classList.add('shake-message')
                btn_error.textContent = 'Please type correct password'
                setTimeout(() => {
                    btn_error.classList.remove('shake-message')
                }, 1000);
                setTimeout(() => {
                    btn_error.classList.add('hidden')
                }, 3000);
            }
        })

    }
}   


window.addEventListener('load',event=>{
    setTimeout(() => {
      document.body.removeChild(loading_element)
    }, 1000);
  })
