import { validate_user_update_design } from "./validate_user.js";
import { header_responsvie_nav } from "./header.js";
import { get_cart,fetchData,add_to_cart,createOrder, request_data,postDataNoAUTH} from "./data_request.js";
import { createBuyNowProduct,createCheckoutItemTitle,createProductContainerCard,loading_element } from "./templates.js";
import { api_url, domain_url } from "./urls.js";

document.body.appendChild(loading_element)

header_responsvie_nav()
validate_user_update_design()
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const product_id = params.get("id");

const productContainer = document.querySelector('.product-container')
const product_data = fetchData(`${api_url}/api/products/${product_id}/`)

let total_checkout = 0;
product_data.then(data=>{
    let image_url = '';
        if(data.image.length>0){
          image_url = data.image[0].image
        }
    const quantity = 1;
    const title = data.title;
    const price = data.price;
    const totalPrice = data.price;
    const productContainerCard = createProductContainerCard(quantity, title, price, totalPrice,image_url);
    productContainer.appendChild(productContainerCard)
    total_checkout+=data.price

    const select = productContainer.querySelectorAll('.checkout-select')
    const total_checkout_dom = document.querySelector('.total-checkout-amount-value')
    total_checkout_dom.textContent = total_checkout.toFixed(2)
    select.forEach(s=>{
        s.addEventListener('change',event=>{
            const targetedCard = event.target.closest('.product-container-card')
            const new_price = targetedCard.querySelector('.checkout-item-total-price')

            total_checkout = (event.target.value * data.price).toFixed(2)

            const title =  event.target.closest('.product-container-card').querySelector('.checkout-item-name')
            if(data.inventory===0 || data.inventory<event.target.value){
                const btns = document.querySelectorAll(".checkout-options button")
                btns.forEach(btn=>{
                    btn.disabled = true
                }) 
                title.textContent = 'OutOfStock'
                title.style.color = 'red'
            }else{
                const btns = document.querySelectorAll(".checkout-options button")
                if(access_token === null || access_token===undefined){
                    btns[0].disabled = false
                    btns[1].disabled = false
                }else{
                    btns[0].disabled = false
                    btns[2].disabled = false
                }
                title.textContent = data.title
                title.style.color = 'white'
            }
            
            new_price.textContent = total_checkout

            total_checkout_dom.textContent = total_checkout
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
            total_checkout_dom.textContent = '0000'
        }
            disableBtns()
    })
    disableBtns()

}).catch(error=>{
    //console.log(error);
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

    const product_container_card = productContainer.firstElementChild

    const quantity = product_container_card.querySelector('select').value;
    const title = product_container_card.querySelector('.checkout-item-name p').textContent;
    const price = product_container_card.querySelector('.checkout-item-price-total').textContent;
    const total_tax = price*quantity
    const html = createCheckoutItemTitle(title,price,quantity)
    checkoutItemContainer.appendChild(html)
    total_tax_shipping.textContent = '$'+ total_tax.toFixed(2)
    const create_order_btn = document.querySelector('.checkout-create-order')

    create_order_btn.setAttribute('id',quantity)
    setTimeout(() => {
        document.body.removeChild(loading_element)
      }, 1000);
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
    get_cart()
    .then(cartdata=>{
        const url = `${api_url}/api/carts/${cartdata.id}/items/`
        const jsondata = {
            "product_id": product_id,
            "quantity": create_order_btn.getAttribute('id')
        }
        postDataNoAUTH(url,jsondata)
        .then(data =>{
            createOrder(access_token,cartdata.id)
            .then(data=>{
                window.location.href = `${domain_url}/order_created.html`
            })
        })
    })
})


window.addEventListener('load',event=>{
    setTimeout(() => {
      document.body.removeChild(loading_element)
    }, 1000);
  })