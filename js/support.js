import { header_responsvie_nav } from './header.js';
import { validate_user_update_design } from './validate_user.js';
import { loading_element } from './templates.js';
document.body.appendChild(loading_element)

header_responsvie_nav();
validate_user_update_design();

window.addEventListener('load',event=>{
    setTimeout(() => {
      document.body.removeChild(loading_element)
    }, 1000);
  })
