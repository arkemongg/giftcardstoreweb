import {domain_url} from './urls.js'
import { loading_element } from './templates.js';

document.body.appendChild(loading_element)

function account_created(account_data){
    const  section = document.querySelector('.account-created');
    section.classList.remove('hidden')
    console.log(account_data);
    const email_address = document.querySelector('.email-address')

    email_address.textContent = `${account_data}`

    setTimeout(() => {
        window.location.href = `${domain_url}`
    }, 300000);
}

function call_account_created(){

    window.onload = function() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const email = urlParams.get('email');
        if(email!==null){
            account_created(email)
        }else{
            window.location.href = `${domain_url}`
        }
      };

    
}

call_account_created()


window.addEventListener('load',event=>{
    setTimeout(() => {
      document.body.removeChild(loading_element)
    }, 1000);
  })