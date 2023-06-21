export function header_responsvie_nav(){
let navres = document.querySelector('.nav-responsive')

let navresul = document.querySelector('.nav-response-list')
let btn = document.getElementById('nav-res-btn')

btn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional, adds smooth scrolling animation
    });
    navres.classList.toggle('display-none')
    navres.classList.toggle('display-block')
    navresul.classList.toggle('display-block')
    navresul.classList.toggle('display-none')
  });
}