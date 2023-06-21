export function request_data(method,url,header_type,error_massage,data){
    return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest()
        request.open(method,url,true)
        
        if(header_type == "USER"){
            const accessToken = localStorage.getItem('accessToken')
            request.setRequestHeader("Authorization", `JWT ${accessToken}`);
            request.send()
        }else if(header_type ==="PATCH"){
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(data))
        }else{
            request.setRequestHeader('Content-Type','applicaton/json')
            request.send()
        }

        
        request.onload = function(){
            
            if(method === "POST"){
                if(request.status === 201){
                    const data = JSON.parse(request.responseText)
                    resolve(data)
                }else{
                    reject(new Error(error_massage))
                }
            }else if(method=="GET"){
                if(request.status === 200){
                    const data = JSON.parse(request.responseText)
                    resolve(data)
                }else{
                    reject(new Error(error_massage))
                }
            }else if(method === "PATCH"){
                if(request.status === 200){
                    resolve(request.statusText)
                }else{
                    reject(new Error(error_massage))
                }
            }
        }
    })
}



/*
export async function request_data(method, url, header_type, error_message, data) {
  try {
    const headers = {};

    if (header_type === "USER") {
      const accessToken = localStorage.getItem('accessToken');
      headers["Authorization"] = `JWT ${accessToken}`;
    } else if (header_type === "PATCH" || header_type === "PUT" || header_type === "DELETE") {
      headers["Content-Type"] = "application/json";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(error_message);
    }

    if (method === "PATCH" || method === "PUT" || method === "DELETE") {
      return response.statusText;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
 */

export async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Request failed with status code ' + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    // Handle the error appropriately, e.g., show an error message
  }
}
  
export function get_cart(){
    return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest()
        request.open('POST','http://127.0.0.1:8000/api/carts/',true)
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

export async function add_to_cart(cart_id, product_id, quantity) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/carts/${cart_id}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product_id,
        quantity: quantity
      })
    });

    console.log(response);

    if (response.ok) {
      const data = await response.json(); // You can also use response.text() or other formats depending on the response
      console.log(data);
      return data; // Return the data to be used with .then method
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the .catch method
  }
}

export async function createOrder(accessToken, cartId) {
  const url = 'http://127.0.0.1:8000/api/orders/';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${accessToken}`
      },
      body: JSON.stringify({
        cart_id: cartId
      })
    });

    console.log("ok")

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log(response);
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function postDataNoAUTH(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('POST request failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


export function createUser(username, password, confirmPassword, email) {
  return new Promise(async (resolve, reject) => {
    const url = 'http://127.0.0.1:8000/auth/users/';

    const userData = {
      username: username,
      password: password,
      password_confirmation: confirmPassword,
      email: email
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        resolve('User created successfully');
      } else {
        reject(response.json());
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function reset_password_email(email) {
  return new Promise(async (resolve, reject) => {
    const url = 'http://127.0.0.1:8000/auth/users/reset_password/';

    const emailData = {
      email: email
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        if (response.status === 204) {
          resolve(); // No content, resolve without data
        } else {
          const data = await response.json();
          resolve(data);
        }
      } else {
        const errorData = await response.json();
        reject(errorData);
      }
    } catch (error) {
      reject(`Error sending email: ${error}`);
    }
  });
}

export function resetPasswordConfirm(uid, token, newPassword) {
  return new Promise(async (resolve, reject) => {
    const url = 'http://127.0.0.1:8000/auth/users/reset_password_confirm/';

    const requestData = {
      uid: uid,
      token: token,
      new_password: newPassword
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        if (response.status === 204) {
          resolve(); // No content, resolve without data
        } else {
          const data = await response.json();
          resolve(data);
        }
      } else {
        const errorData = await response.json();
        reject(errorData);
      }
    } catch (error) {
      reject(`Error resetting password: ${error}`);
    }
  });
}