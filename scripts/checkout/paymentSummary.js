// import { cartQuntity, cart } from "../../data/cart.js";
import { Cartt } from "../../data/cart-class.js";
import { products, loadProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";


loadProducts(renderPaymentSummary);
export function renderPaymentSummary() {
  let paymentSummary = document.querySelector('.js-payment-summary');
  let totalOfItems = 0;
  let totalShipping = 0;
  Cartt.cart.forEach(cartItem => {
    let matchingItemInproducts = products.find(product => product.id === cartItem.productId);
    totalOfItems += matchingItemInproducts.priceCents * cartItem.quantity;


    let matchingItemInDelivery = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
    totalShipping += matchingItemInDelivery.priceCents;

  });

  let tax = totalOfItems * .1;
  let totalBeforeTax = totalOfItems + totalShipping;
  let orderTotal = formatCurrency((totalBeforeTax + tax).toFixed(2));
  // console.log(orderTotal);
  paymentSummary.innerHTML = `
    <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${Cartt.cartQuntity}):</div>
          <div class="payment-summary-money">$${formatCurrency(totalOfItems.toFixed(2))}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${formatCurrency(totalShipping.toFixed(2))}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${formatCurrency(totalBeforeTax.toFixed(2))}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${formatCurrency(tax.toFixed(2))}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${orderTotal}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
    `;
  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: Cartt.cart })
        });

        const order = await response.json();
        addOrder(order);

      } catch (error) {
        console.log(error);
      }
      window.location.href = 'orders.html'
    });
}