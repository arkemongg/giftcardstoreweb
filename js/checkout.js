import { validate_user_update_design } from "./validate_user.js";
import { header_responsvie_nav } from "./header.js";
import { get_cart,fetchData,add_to_cart,createOrder, request_data } from "./data_request.js";
import { createBuyNowProduct,createCheckoutItemTitle,createProductContainerCard,loading_element } from "./templates.js";
import { api_url,domain_url } from "./urls.js";

document.body.appendChild(loading_element)


header_responsvie_nav()
validate_user_update_design()
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const cart_id = params.get("cart_id");

const productContainer = document.querySelector('.product-container')
const cart_data = fetchData(`${api_url}/api/carts/${cart_id}/`)





let total_checkout = 0;
cart_data.then(data=>{
    data.items.forEach(item=>{
        const quantity = item.quantity;
        const title = item.product.title;
        const price = item.product.price;
        const totalPrice = item.total_price;
        const productContainerCard = createProductContainerCard(quantity, title, price, totalPrice);
        productContainer.appendChild(productContainerCard)
        total_checkout+=item.total_price
        const s = productContainerCard.querySelector('select')
        s.setAttribute('id',item.id)
    })
    const select = productContainer.querySelectorAll('.checkout-select')
    const total_checkout_dom = document.querySelector('.total-checkout-amount-value')
    total_checkout_dom.textContent = total_checkout.toFixed(2)
    select.forEach(s=>{
        s.addEventListener('change',event=>{
            const targetedCard = event.target.closest('.product-container-card')
            const item_Total_price = targetedCard.querySelector('.checkout-item-total-price')
            const item_Total_price_usd = targetedCard.querySelector('.checkout-item-total-price').textContent
            total_checkout-=item_Total_price_usd
            const item_price = targetedCard.querySelector('.checkout-item-price-total').textContent

            const changed = event.target.value*item_price;

            item_Total_price.textContent = (changed).toFixed(2);

            total_checkout+=changed;
            
            total_checkout_dom.textContent = total_checkout.toFixed(2)
            let data = {
                "quantity": event.target.value
            }
            const itemId = event.target.id;

            fetch(`${api_url}/api/carts/${cart_id}/items/${itemId}/`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
                .then(response => {
                  
                })
                .catch(error => {
                  console.log('Error:', error);
                });
        })  
    })
    function disableBtns(){
        if(productContainer.childElementCount === 0){
            const btns = document.querySelectorAll(".checkout-options button")
            btns.forEach(btn=>{
                btn.disabled = true
            })
            productContainer.innerHTML = 'empty'
        }
    }

    productContainer.addEventListener('click',event=>{
        if(event.target.classList.contains('checkout-item-remove')){
            const s = event.target.closest('.product-container-card')
            s.remove()
            const deleted_total = s.querySelector('.checkout-item-total-price').textContent
            const delete_item_id = s.querySelector('select').getAttribute('id')
            total_checkout -= deleted_total
            
            fetch(`${api_url}/api/carts/${cart_id}/items/${delete_item_id}/`, {
                method: 'DELETE'
              })
                .then(response => {
                  if (response.ok) {
                    console.log('DELETE request successful');
                  } else {

                    console.log('DELETE request failed');
                  }
                })
                .catch(error => {

                  console.log('Error:', error);
                });
                total_checkout_dom.textContent = total_checkout.toFixed(2)
            }
            disableBtns()
    })
    disableBtns()
}).catch(error=>{
    const btns = document.querySelectorAll(".checkout-options button")
    btns.forEach(btn=>{
        btn.disabled =true
    })
    productContainer.innerHTML = 'error'
})



const checkout_btn = document.querySelector('.checkout-checkout')
const checkoutItemContainer = document.querySelector('.details-checkout-item-container')
const checkoutContainer = document.querySelector('.checkout-page-containers')



const your_account_details = document.querySelector('.your-account-details');
const account_page = document.querySelector('.account-page-container')

const access_token = localStorage.getItem('accessToken')
your_account_details.disabled = true
if(access_token === null || access_token===undefined){
    your_account_details.disabled = false
    checkout_btn.disabled = true
}

const order_details_btn = document.querySelector('.your-product')
order_details_btn.disabled = true
const order_details_container = document.querySelector('.order-details-container')

order_details_btn.addEventListener('click',e=>{
    if(access_token !== null){
        checkout_btn.disabled = false;
        checkout_btn.classList.remove('active-border')
        checkoutContainer.classList.add('hidden')

        const first_child = checkoutItemContainer.firstElementChild

        checkoutItemContainer.innerHTML = ``
        
        checkoutItemContainer.appendChild(first_child)


    }else{
        account_page.classList.add('hidden')
        your_account_details.classList.remove('active-border')
        your_account_details.disabled = false
    }

    
    order_details_container.classList.remove('hidden')
    order_details_btn.disabled = true
    order_details_btn.classList.add('active-border')
    
})

checkout_btn.addEventListener('click',e=>{
    document.body.appendChild(loading_element)
    checkout_btn.disabled = true;
    order_details_btn.disabled = false
    order_details_btn.classList.remove('active-border')
    order_details_container.classList.add('hidden')
    
    checkout_btn.classList.add('active-border')
    checkoutContainer.classList.remove('hidden')
    const total_tax_shipping = document.querySelector('.total-tax-shiping .total-value')
    let total_tax = 0;
    const cart_data = fetchData(`${api_url}/api/carts/${cart_id}/`)
    cart_data
    .then(data=>{
        data.items.forEach(item=>{
            const quantity = item.quantity;
            const title = item.product.title;
            const price = item.product.price;
            total_tax += price*quantity
            const html = createCheckoutItemTitle(title,price,quantity)
            checkoutItemContainer.appendChild(html)
        })
        total_tax_shipping.textContent = '$'+ total_tax.toFixed(2)
        setTimeout(() => {
        document.body.removeChild(loading_element)
        }, 1000);
    }).catch(error=>{
        console.log('error');
    })

    
    
})

your_account_details.addEventListener('click',e=>{
    order_details_btn.disabled = false;
    order_details_btn.classList.remove('active-border')
    order_details_container.classList.add('hidden')

    your_account_details.disabled = true
    your_account_details.classList.add('active-border')
    account_page.classList.remove('hidden')
    
})

const next_btn = document.querySelector('.checkout-next-btn')

next_btn.addEventListener('click',event=>{
    if(your_account_details.disabled === true){
        checkout_btn.click()
    }else{
        your_account_details.click()
    }
})

const loginSignUpButton = document.querySelector('.account-page-login-sign-up')

loginSignUpButton.addEventListener('click', () => {
    window.location.href = `${domain_url}/login.html`;
  });

const create_order_btn = document.querySelector('.checkout-create-order')
create_order_btn.addEventListener('click',event=>{
    createOrder(access_token,cart_id)
    .then(data=>{
        window.location.href = `${domain_url}/order_created.html`
    })
    localStorage.removeItem('cart_id')
})


window.addEventListener('load',event=>{
    setTimeout(() => {
      document.body.removeChild(loading_element)
    }, 1000);
  })

