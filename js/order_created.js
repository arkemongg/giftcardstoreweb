import { request_data } from "./data_request.js";
import { domain_url,api_url } from "./urls.js";

document.body.appendChild(loading_element)

if (window.location.href === `${domain_url}/order_created.html`) {
  const allowedReferrer = `${domain_url}/checkout.html`;
  const allowedReferrerTwo = `${domain_url}/buynow.html`;

  if (!document.referrer.includes(allowedReferrer) && !document.referrer.includes(allowedReferrerTwo)) {
    window.location.href = `${domain_url}/profile.html`;
  }else{
      
  const order_id = document.querySelector('.order-id')
  const order_payment = document.querySelector('.order-payment')

  const profile_redirect = document.querySelector('.redirect')

  const last_order_data = request_data("GET",`${api_url}/api/orders/last_order/`,'USER',"Hmm....")

  last_order_data.then(data=>{
      order_id.innerHTML= `ORDER #${data.pk}`
      order_payment.innerHTML = `<a href= "${data.payment_url}"> <button class="payment-btn linear flex flex-row items-center rounded-xl bg-orange-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-600 active:bg-orange-700" data-ripple-light="true"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="16" width="16"><path d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z" class="fill-white"></path><path d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z" class="fill-orange-500"></path></svg>Pay with Bitcoin</button> </a>`
  })
  

  const profile_page = document.querySelector('.profile-page-link')
  profile_page.innerHTML = `<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Here to go to the profile page
    </button>`
  profile_page.addEventListener('click',e=>{
    window.location.href = `${domain_url}/profile.html`;
  })



  let countdown = 30;
  profile_redirect.innerHTML = `....redirect in  <span class="timer">${countdown}</span>`;

  const timer = setInterval(() => {
    countdown--;
    profile_redirect.innerHTML = `....redirect in  <span class="timer">${countdown}</span>`;

    if (countdown === 0) {
      clearInterval(timer);
      window.location.href = `${domain_url}/profile.html`;
    }
  }, 1000);
  }
}

window.addEventListener('load',event=>{
    setTimeout(() => {
      document.body.removeChild(loading_element)
    }, 1000);
  })



