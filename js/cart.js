import { request_data , fetchData} from "./data_request.js"
import { createCartItem,createLoadingElement } from "./templates.js"
import {api_url,domain_url} from './urls.js'

export function create_or_get_cart(){
    return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest()
        request.open('POST',`${api_url}/api/carts/`,true)
        request.setRequestHeader('Content-Type','applicaton/json')
        request.send()
        request.onload = function(){
            if(request.status === 201){
                const data = JSON.parse(request.responseText)
                resolve(data)
            }else{
                reject(new Error("can't do this "))
            }
        }
    })
}

const cart_id = localStorage.getItem('cart_id')
console.log(cart_id);

if (cart_id===null){
    create_or_get_cart()
    .then(data=>{
        localStorage.setItem('cart_id',data.id)
        window.location.reload()
    })
}

export function cart_design(){
    const cart_toggle_btn = document.querySelector('#cartToggleBtn')
    const cart_details_area = document.querySelector('.cart-details-fixed-area')
    const cart_image = document.getElementById('cartImage');
    cart_toggle_btn.addEventListener('click',e=>{
        if(cart_image.src.includes("shopping.svg")){
            cart_image.src = '/assets/delete.png'
            cart_toggle_btn.classList.toggle('bg-green-500')
            cart_toggle_btn.classList.toggle('hover:bg-green-600')
        }else{
            cart_image.src = '/assets/shopping.svg'
            cart_toggle_btn.classList.toggle('bg-green-500')
            cart_toggle_btn.classList.toggle('hover:bg-green-600')
        }
        cart_details_area.classList.toggle('active-right')
    })
}

export function cart_inside_design(flag = false){

    const cart_items_area = document.querySelector('.cart-details-fixed-area')
    const cart_item_total = document.querySelector('.cart-item-total')
    const price = document.querySelector('.cart-item-price span')
    
    if(flag===false){
      cart_items_area.addEventListener('click',e=>{
        if(e.target.classList.value == 'cart-item-remove'){
            const str = e.target.closest('li').querySelector('.cart-item-total').textContent
            const number = parseFloat(str.replace(/\$/g, ""));
            const cart_total_price = document.querySelector('.cart-total-price')
            let total_price = parseFloat(cart_total_price.textContent)
            console.log(number);
            total_price -= number
            const cart_count_dom = document.querySelector('.cart-count')
            let cart_count_dom_int = parseFloat(cart_count_dom.textContent)
            cart_count_dom_int--;
            cart_count_dom.textContent = cart_count_dom_int
            cart_total_price.textContent = total_price.toFixed(2)


            e.target.closest('li').remove()
            const url = `${api_url}/api/carts/${cart_id}/items/${e.target.id}`;

            fetch(url, {
              method: 'DELETE'
            })
              .then(response => {
                if (response.ok) {
                  console.log('Item deleted successfully.');
                  const cart_details_area = document.querySelector('.flex-cart-list')
                
                  if(cart_details_area.childElementCount===0){
                    cart_details_area.innerHTML= `
        
                    <h1 style="font-size: 30px; margin: auto;margin-top:50%; width:100px">Empty</h1>
          
                    `
                  }
                } else {
                  console.error('Error deleting item.');
                }
              })
              .catch(error => {
                console.error('Error:', error);
              });
        }
    })
    }

  // Append the cartItem to your desired element in the document
  if(cart_id!==null){
    const cart_details = fetchData(`${api_url}/api/carts/${cart_id}/items`)
    cart_details.then(data=>{
        
        if(data.length===0){
          const cart_details_area = document.querySelector('.flex-cart-list')
          cart_details_area.innerHTML= `

          <h1 style="font-size: 30px; margin: auto;margin-top:50%; width:100px">Empty</h1>

          `
        }
        const items = data
        const cart_count = document.querySelector('.cart-count')
        cart_count.textContent = items.length
        const cart_total_price = document.querySelector('.cart-total-price')
        let cart_total = 0
        items.forEach(item => {
            const name = item.product.title;
            const price = item.product.price;
            const total = item.total_price;
            cart_total+=total
            let decimalPlaces = 2;
            let formattedNumber = total.toFixed(decimalPlaces);  
            let image_url = '';
            if(item.product.image.length>0){
              image_url = api_url+item.product.image[0].image
            }
            
            const cartItem = createCartItem(name, price, formattedNumber,image_url);
            const cart_details_area = document.querySelector('.flex-cart-list')
            cartItem.querySelector('.cart-select').value = item.quantity
            cartItem.querySelector('.cart-item-remove').setAttribute('id',`${item.id}`)

            var mySelect = cartItem.querySelector('.cart-select');
            
            mySelect.addEventListener('change',e=>{
                const total_dom = cartItem.querySelector('.cart-item-total')
                let total = e.target.value * price
                let decimalPlaces = 2;
                let formattedNumber = total.toFixed(decimalPlaces);    
                total_dom.innerHTML = `${formattedNumber}$`
            })

            const select = cartItem.querySelector('.cart-select')
            select.setAttribute('id',item.id)
            select.addEventListener('change',e=>{
                const value = e.target.value
                const id = e.target.id

                const url = `${api_url}/api/carts/${cart_id}/items/${id}/`;
                const data = {
                    quantity: value
                  };
                request_data('PATCH',url,'PATCH',"Error Updating the data",data).then(response=>{
                  const details = request_data("GET",`${api_url}/api/carts/${cart_id}`,"","Can't get the data")
                  details.then(data=>{
                    cart_total_price.textContent = data.total_price
                  })
                })
            })
            cart_details_area.appendChild(cartItem)
        });
        cart_total_price.textContent = cart_total.toFixed(2)
    })
  }
    
}
cart_inside_design()
export function add_to_cart_btn(card){
  
  fetch(`${api_url}/api/carts/${cart_id}/items/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    product_id: card.getAttribute('id'),
    quantity : 1
  })
})
  .then(response => {
    console.log(response);
    if (response.ok) {
      const ul = document.querySelector('.flex-cart-list')
      ul.innerHTML = ''
      cart_inside_design(true)
      return response.json(); // You can also return response.text() or other formats depending on the response
    } else {
      if(response.status===400){
        const x = response.json()
        x.then(d=>{
          const existingErrorMessage = card.querySelector('.error-message');
          if (existingErrorMessage){

          }else{
            const error_message = document.createElement('p');
            error_message.className = 'error-message text-center'
            error_message.textContent = d[0]
            card.appendChild(error_message)
            setTimeout(() => {
              card.removeChild(error_message)
            }, 1000);
          }
          
          throw new Error('Error: ' + d[0]);
        })
      }else{
        throw new Error('Error: ' + response.statusText);
      }
    }
  })
  
  // const cart_item_name = card.querySelector('.product-title').textContent
  // const cart_item_price_total = card.querySelector('.product-price').textContent
  // const cart_item_template = createCartItem(cart_item_name,cart_item_price_total,cart_item_price_total)
  
  // ul.appendChild(cart_item_template)
}
const checkout_btn = document.querySelector('.checkout-btn')

checkout_btn.addEventListener('click',e=>{
  const cart_id = localStorage.getItem('cart_id')
  const cart = document.querySelector('.flex-cart-list h1')

  if (cart.textContent== 'Empty' ){

  }else {
    document.body.append(createLoadingElement())
    setTimeout(() => {
      window.location.href = `${domain_url}/checkout.html?cart_id=${cart_id}`;
    }, 1000);
  }
  
})



