import { header_responsvie_nav } from './header.js';
import { validate_user , validate_user_update_design , validate_customer} from './validate_user.js';
import { request_data } from './data_request.js';
import {generateOrderListItem,createListItem,loading_element,validatePassword} from './templates.js'
import { api_url } from './urls.js';
header_responsvie_nav();
validate_user_update_design();

document.body.appendChild(loading_element)
window.addEventListener('load',event=>{
    document.body.removeChild(loading_element)
})

const edit_profile_btn = document.querySelector('.edit-profile-btn')
const user_account_details_fields = document.querySelector('.view-user-account-feature-field')

const childs = user_account_details_fields.children

edit_profile_btn.addEventListener('click',e=>{
    e.preventDefault();
    const a = e.target.closest('li').querySelector('a')
    if(a.classList.contains('active')){
        
    }else{
        edit_profile_btn.querySelectorAll('li').forEach(li=>{
            const a = li.childNodes[1]
            a.className = "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";
        })
        a.className = "";
        a.style.transition = "0.5s"
        a.className = "active inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg dark:text-blue-500 dark:border-blue-500 group";
        for (let i = 0; i < childs.length; i++) {
            const child = childs[i];
            child.style.display = 'none'
        }
        if(e.target.closest('li').classList[0]>=0 && e.target.closest('li').classList[0]<=1){
            childs[e.target.closest('li').classList[0]].style.display = 'block'
        }
    }
})

const membership_data = document.querySelector('.membership-status')
const full_name = document.querySelector('.user-fullname-data')
const user_name = document.querySelector('.user-username-data')
const user_email = document.querySelector('.user-email-data')

// Edit Profile
const user_email_edit_profile = document.querySelector('#user_email')
const user_name_edit_profile = document.querySelector('#user_name')
const first_name = document.querySelector("#new-first-name")
const last_name = document.querySelector("#new-last-name")
const phone = document.querySelector('#new-phone')
const birth_date = document.querySelector('#new-birth-date')

validate_user()
.then(user=>{
    const user_data = user[0]
    full_name.innerHTML = `${user_data.first_name} ${user_data.last_name}`
    user_name.innerHTML = `${user_data.username}`;
    user_email.innerHTML = `${user_data.email}`

    //// Edit Profile
    user_email_edit_profile.value = user_data.email
    user_name_edit_profile.value = `@${user_data.username}`
    first_name.value = user_data.first_name
    last_name.value = user_data.last_name

})
validate_customer()
.then(customer=>{
    const data = customer[0]
    membership_data.innerHTML = data.membership
    phone.value = data.phone
    
    console.log(data);
    birth_date.value = data.birth_date
})

const order_data = request_data('GET','http://127.0.0.1:8000/api/orders/','USER',"can't fetch the order")

function status(status){
    let x = "";
    if(status==='P'){
        x = 'PENDING'
    }else if(status==='C'){
        x = 'COMPLETE'
    }else if(status == "F"){
        x = 'FAILED'
    }

    return x;
}

const order_list = document.querySelector('.order-list')
order_data.then(data=>{
    let loadCount = 0;
    const itemsPerLoad = 10;
    
    if (data.length === 0) {
      // Handle the case when there are no items
    } else {
      function load_data(){
        for (let i = loadCount; i < Math.min(data.length, loadCount + itemsPerLoad); i++) {
            const order = data[i];
            const orderId = `<button class="order-id-btn">${order.pk}</button>`;
            const paymentStatus = status(order.payment_status);
            const orderStatus = status(order.order_status);
            const paymentUrl = order.payment_url;
            const totalPrice = order.total_price;
            const date_time = order.created_at;
            const createdAt = date_time.split('T')[0];
            const order_list_data = generateOrderListItem(orderId, paymentStatus, orderStatus, paymentUrl, totalPrice, createdAt);
            order_list.appendChild(order_list_data);
          }
      }
      load_data()
      const loadmore = document.querySelector('.load-more')
      loadmore.classList.remove('hidden')
      if(itemsPerLoad>=data.length){
        loadmore.classList.add('hidden')
      }
      loadmore.addEventListener('click',e=>{
         loadCount += itemsPerLoad;
         if(loadCount!==data.length){
            load_data()
         }else{
            loadmore.classList.add('hidden')
         }
      })
      
    }
})


const orderItemUl = document.querySelector('.order-items-items')
const orderItemContainer = document.querySelector('.order-items-container')
const closeOrderItemsbtn = document.querySelector('.order-items-hide-btn')
closeOrderItemsbtn.addEventListener('click',event=>{
    const firstChild = orderItemUl.firstElementChild;
    orderItemUl.innerHTML = ''
    orderItemUl.appendChild(firstChild)
    orderItemContainer.style.display = 'none'
})

order_list.addEventListener('click',e=>{
    
    if(e.target.classList.contains('order-id-btn')){
        document.body.appendChild(loading_element)
        const order_id = document.querySelector('.order-items-order-id')
        order_id.innerHTML = `ORDER ID : ${e.target.textContent}`
        const order_items_data = request_data('GET',`http://127.0.0.1:8000/api/orders/${e.target.textContent}/`,'USER',"can't fetch the order")
        order_items_data.then(data=>{
            data.items.forEach(item=>{
                const title  = item.product.title
                const price = item.unit_price
                const quantity = item.quantity
                const child = createListItem(title,price,quantity)
                orderItemUl.appendChild(child)
            })
        })
        orderItemContainer.style.display = 'block'
        setTimeout(() => {
            document.body.removeChild(loading_element)
        }, 400);
    }
})

const update_profile_btn = document.querySelector('.update-profile')
let verify_password = false

const passwordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('repeat-password');
function validate_new_password() {
    
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
      if(passwordInput.value===''){
        passwordWarning.classList.add('hidden')
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

  validate_new_password()
  const accessToken = localStorage.getItem('accessToken')
update_profile_btn.addEventListener('click',event=>{
    event.preventDefault();
    document.body.appendChild(loading_element)
    const warning_area = document.querySelector('.edit-profile-submit-btn')
    const message = document.querySelector('.profile-update-message')
    const new_password = document.getElementById('new-password').value
    const repeat_password = document.getElementById('repeat-password').value
    const current_password = document.getElementById('current-password').value
    if(current_password===''){
        
        setTimeout(() => {
            document.body.removeChild(loading_element)
            message.style.color = 'red'
            message.textContent = 'current password is empty'
            message.classList.add('shake-message')
            message.classList.remove('hidden')
            setTimeout(() => {
                message.classList.remove('shake-message')
            }, 1000);
            setTimeout(() => {
                message.classList.add('hidden')
            }, 5000);
        }, 1000);
        return;
    }else if(verify_password===false){
        if(new_password===''&&repeat_password ===''){

        }else{
            
            setTimeout(() => {
                document.body.removeChild(loading_element)
                message.style.color = 'red'
                message.textContent = 'please recheck new passwords'
                message.classList.add('shake-message')
                message.classList.remove('hidden')
                setTimeout(() => {
                    message.classList.remove('shake-message')
                }, 1000);
                setTimeout(() => {
                    message.classList.add('hidden')
                }, 5000);
            }, 1000);
            return;
        }
    }
    if(new_password===''&&repeat_password ===''){
        validatePassword(current_password,accessToken)
            .then(data=>{
                console.log(data);
            })
            .catch(err=>{
                
                
                setTimeout(() => {
                    document.body.removeChild(loading_element)
                    message.style.color = 'red'
                    message.textContent = err.message
                    message.classList.add('shake-message')
                    message.classList.remove('hidden')
                    setTimeout(() => {
                        message.classList.remove('shake-message')
                    }, 1000);
                    setTimeout(() => {
                        message.classList.add('hidden')
                    }, 5000);
                }, 1000);
            })
    }else{
        const url = `${api_url}/auth/users/set_password/`;
        const currentPassword = current_password
        const newPassword = new_password
        const token = accessToken;

        const headers = {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
        };

        const data = {
        current_password: currentPassword,
        new_password: newPassword,
        };

        fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
        })
        .then(response => {
            if (response.status === 204) {
                setTimeout(() => {
                    document.body.removeChild(loading_element)
                    message.style.color = 'green'
                    message.textContent = 'Profile Updated Successfully'
                    message.style.padding = '5px'
                    message.classList.add('shake-message')
                    message.classList.remove('hidden')
                    setTimeout(() => {
                        message.classList.remove('shake-message')
                    }, 1000);
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);
                }, 1000);
            }else {
                
                setTimeout(() => {
                    document.body.removeChild(loading_element)
                    message.style.color = 'red'
                    message.textContent = 'Invalid current password'
                    message.classList.add('shake-message')
                    message.classList.remove('hidden')
                    setTimeout(() => {
                        message.classList.remove('shake-message')
                    }, 1000);
                    setTimeout(() => {
                        message.classList.add('hidden')
                    }, 5000);
                }, 1000);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
})
