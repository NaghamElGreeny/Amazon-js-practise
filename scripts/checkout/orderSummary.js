// import { cart, cartQuntity, removeFromCart, updateQuantity, updateDeliveryOption, calculateTotal } from '../../data/cart.js';
import { Cartt } from '../../data/cart-class.js';
import { products, loadProducts } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

let cartQuantity;
Cartt.cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
});


let numberofSelectedProducts = document.querySelector('.js-return-to-home-link');
numberofSelectedProducts.innerHTML = `${Cartt.cartQuntity} items`;
// console.log(cart);

let cartSummary = document.querySelector('.js-order-summary');
// renderOrderSummary();
function isWeekend(deliveryDate) {

  if (deliveryDate.format('dddd') === 'Saturday') {
    deliveryDate = deliveryDate.add(2, 'day');

  } else if (deliveryDate.format('dddd') === 'Sunday') {
    deliveryDate = deliveryDate.add(1, 'day');

  }
  return deliveryDate;
}
loadProducts(renderOrderSummary);
export function renderOrderSummary() {
  let cartSummaryHTML = '';
  Cartt.cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach(option => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    deliveryDate = isWeekend(deliveryDate);

    const dateString = deliveryDate.format('dddd,MMMM D');
    //<div class="cart-item-container js-cart-item-container-${matchingProduct.id}"> السطر دا كان كدا وعامل مشكلة هشيل ربط الايدي ونشوف
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>
  
            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}">
  
              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-update-quantity-html-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update </span>
                    <input type=number  value=${cartItem.quantity} min=1 max=20 class="quantity-input js-quantity-input-${matchingProduct.id}" onkeydown="handleEnterKey(event)" />
                     <span class="save-quantity-link link-primary js-save-quantity-link-${matchingProduct.id}" >
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
  
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
              </div>
            </div>
          </div>
    `;
  });

  function deliveryOptionsHTML(productId, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

      deliveryDate = isWeekend(deliveryDate);
      const dateString = deliveryDate.format('dddd,MMMM D');
      const priceString = deliveryOption.priceCents === 0
        ? 'Free'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // if there's no checked
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=
        `
      <div class="delivery-option js-delivery-option" 
      data-product-id="${productId}"
      data-delivery-option-id="${deliveryOption.id}"
      >
         <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${productId}  

           ">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
          ${priceString} Shipping
          </div>
        </div>
      </div>
    
    `;
    });


    return html;

  }
  cartSummary.innerHTML = cartSummaryHTML;
  //option checked
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset; //shorthand property
      Cartt.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });




  //delete from cart
  document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      // console.log(productId);
      Cartt.removeFromCart(productId);
      renderOrderSummary();
      numberofSelectedProducts.innerHTML = `${Cartt.cartQuntity} items`;
      renderPaymentSummary();
    });
  });

  //update item quantity in cart
  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      // console.log(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
      link.classList.add('hide-update-link');

      document.querySelector(`.js-save-quantity-link-${productId}`).addEventListener('click', () => {

        container.classList.remove('is-editing-quantity');
        link.classList.remove('hide-update-link');
        let quantitySelector = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantitySelector.value);
        Cartt.updateQuantity(productId, newQuantity);
        numberofSelectedProducts.innerHTML = `${Cartt.cartQuntity} items`;
        document.querySelector(`.js-update-quantity-html-${productId}`).innerHTML = newQuantity;
        renderPaymentSummary();
      });
    });

  });
}
// console.log(cart);