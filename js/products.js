import {createProductTemplate,loading_element} from './templates.js';
import { request_data,fetchData } from './data_request.js';
import { header_responsvie_nav } from './header.js';
import { validate_user_update_design } from './validate_user.js';
import { cart_design , cart_inside_design,add_to_cart_btn} from './cart.js';
import { api_url, domain_url } from './urls.js';

document.body.appendChild(loading_element)


header_responsvie_nav();
validate_user_update_design();
cart_design()

const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const container = document.querySelector('.products-section')


function add_To_cart(e){
  const card = e.target.closest('.card')
  add_to_cart_btn(card)
}

const cards = document.querySelector('.products-cards')

const url = new URL(`${api_url}/api/products/`);

const urlParams = new URLSearchParams(window.location.search);
const category_id = urlParams.get('category');

if(category_id!==null){
  url.searchParams.set('category',category_id)
}


const limitValue = urlParams.get('limit');
const offsetValue = urlParams.get('offset');
url.searchParams.set('limit', limitValue);
url.searchParams.set('offset', offsetValue);

const category_select = document.getElementById('category-select')
const category_data = fetchData(`${api_url}/api/categories/`)
category_data.then(data=>{
        const option = document.createElement('option');
            option.value = 'none';
            option.text = 'None';
            category_select.appendChild(option)
  data.forEach(category=>{
    const option = document.createElement('option');
          option.value = category.id;
          option.text = category.title;
          category_select.appendChild(option)
  })

  if(category_id===null){
    category_select.value = 'category'
  }else{
    category_select.value = category_id
  }
})


category_select.addEventListener('input',event=>{
  const items_per_page = document.getElementById('items-per-page')
  console.log(items_per_page.value);
  if(event.target.value==='none' || event.target.value==='category'){
    if(items_per_page.value >0){
      window.location.href = `${domain_url}/products.html?limit=${items_per_page.value}`
    }else{
      window.location.href = `${domain_url}/products.html`
    }
  }else{
    if(items_per_page.value > 0){
      window.location.href = `${domain_url}/products.html?category=${event.target.value}&limit=${items_per_page.value}`
    }else{
      window.location.href = `${domain_url}/products.html?category=${event.target.value}`
    }
  }
})



var nextPageUrl = null;
var prevPageUrl = null;

function loadInitialData(url) {
  cards.innerHTML = ``
  document.body.appendChild(loading_element);
  const initialUrl = url;

  fetchData(initialUrl)
    .then(data => {
      data.results.forEach(product => {
        let image_url = '';
        if(product.image.length>0){
          image_url = product.image[0].image
        }
        const product_template = createProductTemplate(product.title, product.price, product.category.title, image_url);
        const addToCart = product_template.querySelector('.add-to-cart');
        const buy_now = product_template.querySelector('.buy-now');

        buy_now.addEventListener("click", function () {
          window.location.href = `${domain_url}/buynow.html?id=${product.id}`;
        });

        addToCart.addEventListener('click', e => {
          add_To_cart(e);
        });

        if(product.inventory===0){
          buy_now.disabled = true
          buy_now.textContent = 'Out of Stock'

          addToCart.disabled = true
          addToCart.textContent = 'Out of Stock'
        }

        product_template.setAttribute('id', `${product.id}`);
        cards.appendChild(product_template);
      });
      
      prevPageUrl = data.previous
      nextPageUrl = data.next;
  
      if(prevPageUrl===null){
        prevButton.style.cursor = 'not-allowed';
      }else{
        prevButton.style.cursor = 'pointer';
      }
      if(nextPageUrl===null){
        nextButton.style.cursor = 'not-allowed';
      }else{
        nextButton.style.cursor = 'pointer';
      }
    })
    .catch(err => {
      console.log(err);
    });

}
loadInitialData(url)


prevButton.addEventListener('click', () => {



  if (prevPageUrl) {
    const prev_url = new URL(prevPageUrl)
    const currentUrl = new URL(window.location.href);
    window.history.replaceState(null, null, currentUrl.origin+currentUrl.pathname+prev_url.search);
  
    loadInitialData(prevPageUrl);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

nextButton.addEventListener('click', () => {
  if (nextPageUrl) {
    const next_url = new URL(nextPageUrl)
    const currentUrl = new URL(window.location.href);
    window.history.replaceState(null, null, currentUrl.origin+currentUrl.pathname+next_url.search);
  
    loadInitialData(nextPageUrl);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});


const items_per_page = document.getElementById('items-per-page')

if(limitValue!==null){
  items_per_page.value = limitValue;
}
items_per_page.addEventListener('input',event=>{
  
  if(event.target.value>0 && event.target.value<=32){
    console.log(event.target.value);
    const currentUrl = new URL(window.location.href);
    const limitValue = event.target.value;
    currentUrl.searchParams.set('limit', limitValue);
    currentUrl.searchParams.delete('offset')
    window.history.replaceState(null, null, currentUrl.href);
    
    const url = new URL(`${api_url}/api/products/`);
    loadInitialData(url+currentUrl.search)
  }
})
const search = document.querySelector('#search-dropdown')

const search_btn = document.querySelector('.search-btn')


if(urlParams.get('search')!==null){
    search.value = urlParams.get('search');
}
search_btn.addEventListener('click',event=>{
  event.preventDefault()
  if(search.value===''){
    return null;
  }
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.delete('offset');

  currentUrl.searchParams.set('search',search.value)
  window.history.replaceState(null, null, currentUrl.href);
  loadInitialData(url+currentUrl.search)
})

search.addEventListener('input',event=>{
  if(event.target.value===''){
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('search');
    currentUrl.searchParams.delete('offset');

    window.history.replaceState(null, null, currentUrl.href);
    loadInitialData(url+currentUrl.search)
  }
})

const nav_category = document.querySelector('#nav-categories')

nav_category.addEventListener('click',e=>{
  category_select.focus();
})


window.addEventListener('load',event=>{
    setTimeout(() => {
      document.body.removeChild(loading_element)
    }, 1000);
  })
