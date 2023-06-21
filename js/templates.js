import { api_url, domain_url } from "./urls.js";

export function createProductTemplate(name, price, category, imageUrl) {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h1');
        title.style.fontSize = '16px';
        title.style.fontWeight = '700';
        title.style.marginTop = '-20px';
        title.style.padding = '10px';
        title.style.textAlign = 'center';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'product-title';
        titleSpan.textContent = name;
        title.appendChild(titleSpan);

        const imageArea = document.createElement('div');
        imageArea.className = 'product-image-area';

        const image = document.createElement('img');
        if(imageUrl){
          image.src = imageUrl;
        }else{
          image.src = '/assets/no-camera.png';
        }
        image.alt = 'Product Image';
        imageArea.appendChild(image);

        const detailsArea = document.createElement('div');
        detailsArea.className = 'product-details-area';

        const priceElement = document.createElement('h1');
        priceElement.style.fontSize = '24px';
        priceElement.style.fontWeight = '900';
        priceElement.style.padding = '2px';
        priceElement.style.textAlign = 'center';

        const priceSpan = document.createElement('span');
        priceSpan.className = 'product-price';
        priceSpan.innerHTML = `${price}`;
        const dollarSign = document.createElement('span')
        dollarSign.innerHTML = '$'
        priceElement.appendChild(priceSpan);
        priceElement.appendChild(dollarSign)

        const categoryElement = document.createElement('p');
        categoryElement.style.fontSize = '15px';
        categoryElement.style.fontWeight = '900';
        categoryElement.style.textAlign = 'center';

        const categorySpan = document.createElement('span');
        categorySpan.className = 'product-category';
        categorySpan.textContent = category;
        categoryElement.appendChild(categorySpan);

        const btnArea = document.createElement('div');
        btnArea.className = 'product-btn-area';

        const buyNowBtn = document.createElement('button');
        buyNowBtn.className = 'bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded buy-now';
        buyNowBtn.textContent = 'Buy Now';

        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add-to-cart';
        addToCartBtn.textContent = 'Add to cart';
        // Append elements
        card.appendChild(title);
        card.appendChild(imageArea);
        card.appendChild(detailsArea);
        card.appendChild(btnArea);
        
        detailsArea.appendChild(priceElement);
        detailsArea.appendChild(categoryElement);
        btnArea.appendChild(buyNowBtn);
        btnArea.appendChild(addToCartBtn);

        return card;
}

export const createCartItem = (name, price, total,imageUrl) => {
        const listItem = document.createElement('li');
        listItem.classList.add('flex-cart-items');
      
        const itemImg = document.createElement('div');
        itemImg.classList.add('cart-item-img');
        const img = document.createElement('img');

        if(imageUrl){
          img.src = imageUrl;
        }else{
          img.src = '/assets/no-camera.png';
        }
        
        img.alt = '';
        img.style.width = '90px';
        itemImg.appendChild(img);
      
        const quantityRemove = document.createElement('div');
        quantityRemove.classList.add('cart-item-quantity-remove');
      
        const removeBtn = document.createElement('div');
        removeBtn.classList.add('cart-item-remove-btn');
        const removeImg = document.createElement('img');
        removeImg.classList.add('cart-item-remove');
        removeImg.src = '/assets/bin.png';
        removeImg.alt = 'remove';
        removeImg.style.width = '30px';
        removeBtn.appendChild(removeImg);
      
        const quantity = document.createElement('div');
        quantity.classList.add('cart-item-quantity');
        const select = document.createElement('select');
        select.classList.add('cart-select');
        select.style.backgroundColor = '#111827';
        const option1 = document.createElement('option');
        option1.value = '1';
        option1.selected = true;
        option1.textContent = '1';
        select.appendChild(option1);
        const option2 = document.createElement('option');
        option2.value = '2';
        option2.textContent = '2';
        select.appendChild(option2);
        const option3 = document.createElement('option');
        option3.value = '3';
        option3.textContent = '3';
        select.appendChild(option3);
        const option4 = document.createElement('option');
        option4.value = '4';
        option4.textContent = '4';
        select.appendChild(option4);
        const option5 = document.createElement('option');
        option5.value = '5';
        option5.textContent = '5';
        select.appendChild(option5);
        quantity.appendChild(select);
      
        quantityRemove.appendChild(removeBtn);
        quantityRemove.appendChild(quantity);
      
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('cart-item-details');
        itemDetails.style.marginRight = '10px';
        const itemName = document.createElement('div');
        itemName.classList.add('cart-item-name');
        const nameParagraph = document.createElement('p');
        nameParagraph.style.fontSize = '11px';
        nameParagraph.textContent = 'Name : ' + name;
        itemName.appendChild(nameParagraph);
        const itemPrice = document.createElement('div');
        itemPrice.classList.add('cart-item-price');
        itemPrice.style.fontSize = '11px';
        itemPrice.textContent = 'Price : ' + price;
        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemPrice);
      
        const itemTotal = document.createElement('div');
        itemTotal.classList.add('cart-item-total');
        itemTotal.style.fontSize = '14px';
        itemTotal.innerHTML = `${total}$`;
      
        listItem.appendChild(itemImg);
        listItem.appendChild(quantityRemove);
        listItem.appendChild(itemDetails);
        listItem.appendChild(itemTotal);
      
        return listItem;
      };
  
      export function createBuyNowProduct(name, price, total) {
        // Create the div element
        const divElement = document.createElement('div');
        divElement.classList.add('buy-now-product-edit');
      
        // Create the HTML code using template literals
        const html = `
          <div class="flex-buy-now-items">
            <div class="buy-now-item-img">
              <img src="/assets/gplay.png" alt="">
            </div>
            <div class="buy-now-item-quantity-remove">
              <div class="buy-now-item-remove-btn">
                <img src="/assets/bin.png" alt="remove">
              </div>
              <div class="buy-now-item-quantity">
                <select class="buy-now-select bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div class="buy-now-item-details">
              <div class="buy-now-item-name">
                <div>${name}</div>
                <div class="buy-now-item-price ">${price} <span>$</span></div>
              </div>
            </div>
            <div class="buy-now-item-total">${total} <span>$</span></div>
          </div>
        `;
      
        // Set the HTML code as the content of the div element
        divElement.innerHTML = html;
      
        return divElement;
      }
export function createOrderSummary(name, quantity, total) {
  // Create the HTML code using template literals
  const html = `
      <h1 class="" style="font-size: 36px; margin-top: 20px; margin-bottom: 20px;">Order Summary</h1>
      <button class="proceed-to-payment-buy-now py-2.5 px-5 text-green-900 focus:outline-none bg-white border border-green-200 hover:bg-green-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-700 dark:bg-green-800 dark:text-green-400 dark:border-green-600 dark:hover:text-white dark:hover:bg-green-700">
          <span class="proceed-to-payment-text">
             CREATE AN ORDER AND MAKE PAYMENT>
          </span>
      </button>
      <div class="buy-now-item-details">
          <div class="buy-now-item">
              <div class="buy-now-title">
                  ITEM
              </div>
              <div class="buy-now-item-name buy-now-value">
                  ${name}
              </div>
          </div>

          <div class="buy-now-quantity">
              <div class="buy-now-title">
                  QTY
              </div>
              <div class="buy-now-quantity-value buy-now-value">
                  ${quantity}
              </div>
          </div>

          <div class="buy-now-price">
              <div class="buy-now-title">
                  TOTAL
              </div>
              <div class="buy-now-quantity-value buy-now-value">
                  <span>$</span> ${total}
              </div>
          </div>
      </div>
  `;

  return html;
}


// Profile Page Template 
export function generateOrderListItem(orderId, paymentStatus, orderStatus, paymentUrl, totalPrice, createdAt) {
  const paymentUrlContent = paymentUrl !== '-' ? `<a href="${paymentUrl}" target="_blank">Pay Here</a>` : '-';

  const liElement = document.createElement('li');
  liElement.classList.add('order-list-details');

  liElement.innerHTML = `
    <div class="order-list-details-tiem order-id" style="color:	#03a9f4">${orderId}</div>
    <div class="order-list-details-tiem order-payemnt-status">${paymentStatus}</div>
    <div class="order-list-details-tiem order-status">${orderStatus}</div>
    <div class="order-list-details-tiem order-payment-url">${paymentUrlContent}</div>
    <div class="order-list-details-tiem order-total-price"><span>$</span> ${totalPrice}</div>
    <div class="order-list-details-tiem order-created-at">${createdAt}</div>
  `;

  return liElement;
}

export function createListItem(title, price, quantity) {
  const listItem = document.createElement('li');
  listItem.classList.add('order-items-item');
  listItem.style.fontSize = '10px';

  const titleElement = document.createElement('div');
  titleElement.classList.add('order-items-item-details', 'order-item-title');
  titleElement.textContent = title;

  const priceElement = document.createElement('div');
  priceElement.classList.add('order-items-item-details', 'order-item-price');
  priceElement.textContent = price;

  const quantityElement = document.createElement('div');
  quantityElement.classList.add('order-items-item-details', 'order-item-quantity');
  quantityElement.textContent = quantity;

  listItem.appendChild(titleElement);
  listItem.appendChild(priceElement);
  listItem.appendChild(quantityElement);

  return listItem;
}

export function createProductContainerCard(quantity, title, price, totalPrice,imageUrl) {
  const div = document.createElement('div');
  div.classList.add('product-container-card');

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('checkout-item-img');
  const img = document.createElement('img');
  if(imageUrl){
    img.src = imageUrl;
  }else{
    img.src = '/assets/no-camera.png';
  }
  img.alt = 'product-image';
  imgDiv.appendChild(img);
  div.appendChild(imgDiv);

  const quantityRemoveDiv = document.createElement('div');
  quantityRemoveDiv.classList.add('checkout-item-quantity-remove');
  const quantityDiv = document.createElement('div');
  quantityDiv.classList.add('checkout-item-quantity');
  const select = document.createElement('select');
  select.classList.add('checkout-select', 'bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'rounded-lg', 'focus:ring-blue-500', 'focus:border-blue-500', 'block', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:placeholder-gray-400', 'dark:text-white', 'dark:focus:ring-blue-500', 'dark:focus:border-blue-500');
  for (let i = 1; i <= 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === quantity) {
      option.selected = true;
    }
    select.appendChild(option);
  }
  quantityDiv.appendChild(select);
  quantityRemoveDiv.appendChild(quantityDiv);
  div.appendChild(quantityRemoveDiv);

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('checkout-item-details');
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('checkout-item-name');
  const titleParagraph = document.createElement('p');
  titleParagraph.textContent = title;
  nameDiv.appendChild(titleParagraph);
  const priceDiv = document.createElement('div');
  priceDiv.classList.add('checkout-item-price');
  const priceLabel = document.createElement('span');
  priceLabel.textContent = '$';
  const priceValue = document.createElement('span');
  priceValue.classList.add('checkout-item-price');
  priceValue.classList.add('checkout-item-price-total');
  priceValue.textContent = price;
  priceDiv.appendChild(priceLabel);
  priceDiv.appendChild(priceValue);
  detailsDiv.appendChild(nameDiv);
  detailsDiv.appendChild(priceDiv);
  div.appendChild(detailsDiv);

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('checkout-item-total');
  totalDiv.style.fontSize = '14px';
  const totalLabel = document.createElement('span');
  totalLabel.textContent = '$';
  const totalValue = document.createElement('span');
  totalValue.classList.add('checkout-item-total-price');
  totalValue.textContent = totalPrice;
  totalDiv.appendChild(totalLabel);
  totalDiv.appendChild(totalValue);
  div.appendChild(totalDiv);

  const removeBtnDiv = document.createElement('div');
  removeBtnDiv.classList.add('checkout-item-remove-btn');
  const removeImg = document.createElement('img');
  removeImg.classList.add('checkout-item-remove');
  removeImg.src = '/assets/bin.png';
  removeImg.alt = 'remove';
  removeBtnDiv.appendChild(removeImg);
  div.appendChild(removeBtnDiv);

  return div;
}

export function createCheckoutItemTitle(title, price, quantity) {
  const div = document.createElement('div');
  div.classList.add('details-checkout-item-container-title');

  const titleParagraph = document.createElement('p');
  titleParagraph.classList.add('checkout-item-title-title');
  titleParagraph.textContent = title;
  div.appendChild(titleParagraph);

  const priceParagraph = document.createElement('p');
  priceParagraph.classList.add('checkout-item-title-price');
  priceParagraph.textContent = '$'+ price;
  div.appendChild(priceParagraph);

  const quantityParagraph = document.createElement('p');
  quantityParagraph.classList.add('checkout-item-title-quantity');
  quantityParagraph.textContent = quantity;
  div.appendChild(quantityParagraph);

  return div;
}


// Login-logout


export function profileLogout(){
  // Create the outer div element with class "logout-area"
const logoutAreaDiv = document.createElement('div');
logoutAreaDiv.classList.add('logout-area');
logoutAreaDiv.classList.add('hidden');

// Create the close button element
const closeButtonDiv = document.createElement('div');
closeButtonDiv.classList.add('close-user-profile-options');
closeButtonDiv.textContent = 'x';
logoutAreaDiv.appendChild(closeButtonDiv);

// Create the profile button element
const profileButtonLink = document.createElement('a');
profileButtonLink.href = `${domain_url}/profile.html`;
const profileButton = document.createElement('button');
profileButton.classList.add('profile');
profileButton.textContent = 'Profile';
profileButtonLink.appendChild(profileButton);
logoutAreaDiv.appendChild(profileButtonLink);

// Create the logout button element
const logoutButton = document.createElement('button');
logoutButton.classList.add('logout');
logoutButton.textContent = 'Logout';
logoutAreaDiv.appendChild(logoutButton);

// Append the logout area element to the desired parent element

return logoutAreaDiv

}

export function createResponsiveProfileElements() {
  // Create the first li element with class "responsive-profile"
  const profileLi = document.createElement('li');
  profileLi.classList.add('responsive-profile');

  // Create the profile button link
  const profileLink = document.createElement('a');
  profileLink.href = `${domain_url}/profile.html`;;

  // Create the profile button
  const profileButton = document.createElement('button');
  profileButton.textContent = 'Profile';

  // Append the profile button to the profile link
  profileLink.appendChild(profileButton);

  // Append the profile link to the li element
  profileLi.appendChild(profileLink);

  // Create the second li element with class "responsive-logout"
  const logoutLi = document.createElement('li');
  logoutLi.classList.add('responsive-logout');

  // Create the logout button link
  const logoutLink = document.createElement('a');
  logoutLink.href = '#';

  // Create the logout button
  const logoutButton = document.createElement('button');
  logoutButton.classList.add('logout');
  logoutButton.textContent = 'Logout';

  // Append the logout button to the logout link
  logoutLink.appendChild(logoutButton);

  // Append the logout link to the li element
  logoutLi.appendChild(logoutLink);

  // Return the created elements
  return [profileLi, logoutLi];
}


// btn action loading 


export function createLoadingElement() {
  // Create the outer div element
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('loading-btn-effect','btn-action');

  // Create the inner div element
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('inline-block', 'h-8', 'w-8', 'animate-spin', 'rounded-full', 'border-4', 'border-solid', 'border-current', 'border-r-transparent', 'align-[-0.125em]', 'motion-reduce:animate-[spin_1.5s_linear_infinite]');
  innerDiv.setAttribute('role', 'status');

  // Create the span element
  const span = document.createElement('span');
  span.classList.add('!absolute', '!-m-px', '!h-px', '!w-px', '!overflow-hidden', '!whitespace-nowrap', '!border-0', '!p-0', '![clip:rect(0,0,0,0)]');
  span.innerText = 'Loading...';

  // Append the span element to the inner div element
  innerDiv.appendChild(span);

  // Append the inner div element to the outer div element
  outerDiv.appendChild(innerDiv);

  // Return the created element
  return outerDiv;
}

export const loading_element = createLoadingElement()


// Categories

export function createCategorySection(value, imageUrl) {
  // Create the div element
  var div = document.createElement("div");
  div.className = "category-section-categories";

  // Create the img element
  var img = document.createElement("img");
  if(imageUrl){
    img.src = imageUrl;
  }else{
    img.src = '/assets/no-camera.png';
  }
  img.alt = "";

  // Create the h2 element
  var h2 = document.createElement("h2");
  h2.textContent = value;

  // Append the img and h2 elements to the div element
  div.appendChild(img);
  div.appendChild(h2);

  // Return the created div element
  return div;
}

export const validatePassword = async (currentPassword, token) => {
  const url = `${api_url}/auth/password/validate/`;

  const headers = {
    'Authorization': `JWT ${token}`,
    'Content-Type': 'application/json',
  };

  const data = {
    current_password: currentPassword,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData; // You can return the data to handle it in the calling code
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    throw error; // Rethrow the error to handle it in the calling code
  }
};