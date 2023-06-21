import { loading_element } from './templates.js';
import { api_url, domain_url } from './urls.js';

const activation = document.querySelector('.activation')
function activateUser(uid, token) {
    document.body.appendChild(loading_element)
    const url = `${api_url}/auth/users/activation/`;
    activation.classList.remove('hidden')
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid : uid,
        token : token
      })
    })
      .then(response => {
        
        if(response.status == 204){
            return Promise.resolve();
        }else if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
        return response.json();
      })
      .then(result => {
        setTimeout(() => {
            document.body.removeChild(loading_element)
        }, 1000);
        console.log("y");
        activation.querySelector('.activated').classList.remove('hidden')
      })
      .catch(error => {
        console.log("n");

        setTimeout(() => {
            document.body.removeChild(loading_element)
        }, 1000);
        activation.querySelector('.failed').classList.remove('hidden')
      });
  }
  

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    console.log(uid);
    console.log(token);

    activateUser(uid, token);


    const extras = document.querySelector('.extras')
    const countdown = document.querySelector('.countdown-timer')
    extras.classList.remove('hidden')
    function startCountdown(duration) {
        let timer = duration;
      
        const countdownInterval = setInterval(() => {
          countdown.textContent = timer;
      
          if (--timer < 0) {
            clearInterval(countdownInterval);
            countdown.textContent = '0'; 
            window.location.href = `${domain_url}/login.html`
          }
        }, 1000);
      }
      
      const duration = 30;
      startCountdown(duration);