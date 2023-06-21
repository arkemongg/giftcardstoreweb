import {createCategorySection, createProductTemplate,loading_element} from './templates.js';
import { request_data,fetchData } from './data_request.js';
import { header_responsvie_nav } from './header.js';
import { validate_user_update_design } from './validate_user.js';
import { cart_design , cart_inside_design,add_to_cart_btn} from './cart.js';
import {api_url,domain_url} from './urls.js'

document.body.appendChild(loading_element)

header_responsvie_nav();
validate_user_update_design();
cart_design()



function add_To_cart(e){
  const card = e.target.closest('.card')
  add_to_cart_btn(card)
}

const cards = document.querySelector('.cards')

let nextPageUrl = null;

function loadInitialData() {
  document.body.appendChild(loading_element);
  const initialUrl = `${api_url}/api/products/`;

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

        product_template.setAttribute('id', `${product.id}`);
        cards.appendChild(product_template);
      });

      nextPageUrl = data.next;
      
    })
    .catch(err => {
      console.log(err,'err');
      document.body.removeChild(loading_element);
    });
}

function loadMoreData() {
  if (nextPageUrl) {
    fetchData(nextPageUrl)
      .then(data => {
        console.log(data);
        data.results.forEach(product => {

        let image_url = '';
        if(product.image.length>0){
          image_url = product.image[0].image
        }
        const product_template = createProductTemplate(product.title, product.price, product.category.title, image_url);

          product_template.setAttribute('id', `${product.id}`);
          const addToCart = product_template.querySelector('.add-to-cart');

          addToCart.addEventListener('click', e => {
            add_To_cart(e);
          });

          const buy_now = product_template.querySelector('.buy-now');

          buy_now.addEventListener("click", function () {
            window.location.href = `${domain_url}/buynow.html?id=${product.id}`;
          });

          cards.appendChild(product_template);
        });

        nextPageUrl = data.next;
      });
  }
}

// Load initial data
loadInitialData();
const btn_right = document.querySelector('.btn-right')
const btn_left = document.querySelector('.btn-left')

let start = 0;
const card = document.querySelector('.card')
let owidth = -1*(cards.offsetWidth)

let intervalId;

function autoClick() {
    cards.style.transition = '1s'
    let limit = cards.childElementCount*-390
    if(owidth>limit){
      owidth -=390
      start-=390
      cards.style.transform = `translateX(${start}px)`
    }else{
      loadMoreData()
    }
}

function startAutoClick() {
  intervalId = setInterval(autoClick, 6000);
}

function stopAutoClick() {
  clearInterval(intervalId);
}
function restartAutoClick() {
  stopAutoClick();
  startAutoClick();
}


cards.addEventListener('click',event=>{
  restartAutoClick()
  console.log(event);
})

var touchStartX = 0;
var touchMoveX = 0;
var isDragging = false;
var limitReached = false;
var clickThreshold = 5; // Adjust this value as needed

cards.addEventListener('touchstart', event => {
  touchStartX = event.touches[0].clientX;
  isDragging = false;
  cards.style.transition = '0s';
});

cards.addEventListener('touchmove', event => {
  touchMoveX = event.touches[0].clientX;
  var touchDiff = touchMoveX - touchStartX;
  
  if (!isDragging && Math.abs(touchDiff) > clickThreshold) {
    isDragging = true;
    event.preventDefault(); // Prevent scrolling while dragging
  }

  if (isDragging) {
    // Calculate the maximum translation based on the screen width
    var maxTranslateX = Math.min(0, -(cards.childElementCount * 390 - 450));

    // Calculate the interpolation factor
    var swipeFraction = Math.abs(touchDiff) / 450;

    // Apply linear interpolation to adjust the translation
    var interpolatedTranslateX = swipeFraction * touchDiff;

    // Translate the cards element
    var translateX = Math.max(maxTranslateX, Math.min(start + interpolatedTranslateX, 0));
    cards.style.transform = `translateX(${translateX}px)`;

    // Check if the translation reaches the limit
    if (translateX === maxTranslateX && !limitReached) {
      limitReached = true;
      loadMoreData();
    }
  }
});

cards.addEventListener('touchend', event => {
  if (!isDragging) {
    // Handle click event
    // Perform click-related actions here
    return;
  }

  var touchDiff = touchMoveX - touchStartX;

  if (Math.abs(touchDiff) > clickThreshold) {
    if (touchDiff > 0) {
      // Handle right swipe
      if (start < 0) {
        owidth += 390;
        start += 390;
      }
    } else if (touchDiff < 0) {
      // Handle left swipe
      var minTranslateX = -(cards.childElementCount * 390 - 450);
      if (start > minTranslateX) {
        owidth -= 390;
        start -= 390;
      }
    }
  }

  cards.style.transform = `translateX(${start}px)`;
  restartAutoClick();

  isDragging = false;
  limitReached = false;
});




btn_right.addEventListener('click',e=>{
        cards.style.transition = '1s'

        let limit = cards.childElementCount*-390
        if(owidth>limit){
            owidth -=390
            start-=390
            cards.style.transform = `translateX(${start}px)`
        }else{
          loadMoreData()
        }
        restartAutoClick()
})
btn_left.addEventListener('click',e=>{
    cards.style.transition = '1s'

    if (start!==0){
        owidth +=390
        start+=390
        cards.style.transform = `translateX(${start}px)`
    }
    restartAutoClick()
})


startAutoClick()


const category_container = document.querySelector('.category-container');

const category_data = fetchData(`${api_url}/api/categories/`);

category_data.then(data=>{
  data.forEach(category=>{
    let image_url = '';
        if(category.image.length>0){
          image_url = category.image[0].image
        }
    var imgSrc = image_url;
    const category_dom = createCategorySection(category.title,imgSrc)
    category_dom.setAttribute('id',category.id)
    category_container.appendChild(category_dom)
    const img = category_dom.querySelector('img')
    category_dom.addEventListener('mouseover', () => {
      img.classList.add('hover-effect');
    });
    
    category_dom.addEventListener('mouseout', () => {
      img.classList.remove('hover-effect');
    });
    
    img.addEventListener('mousedown', () => {
      img.classList.remove('hover-effect');
    });
    
    img.addEventListener('mouseup', () => {
      img.classList.add('hover-effect');
    });

    category_dom.addEventListener('click',e=>{
      window.location.href = `/products.html?category=${e.target.closest('.category-section-categories').id}`
    })
  })
})
const nav_category = document.querySelector('#nav-categories')
const nav_res_category = document.querySelector('#nav-response-categories')

nav_category.addEventListener('click',e=>{
  const categorySection = document.querySelector('.category-section');
  const windowHeight = window.innerHeight;
  const elementOffsetTop = categorySection.offsetTop;
  const scrollPosition = elementOffsetTop - (windowHeight / 2);

  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });
})
nav_res_category.addEventListener('click',e=>{
  const categorySection = document.querySelector('.category-section');
  const windowHeight = window.innerHeight;
  const elementOffsetTop = categorySection.offsetTop;
  const scrollPosition = elementOffsetTop - (windowHeight / 2);

  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });
})

window.addEventListener('load',event=>{
  setTimeout(() => {
    document.body.removeChild(loading_element)
  }, 500);
})

// npx tailwindcss -i ./style/input.css -o ./style/output.css --watch