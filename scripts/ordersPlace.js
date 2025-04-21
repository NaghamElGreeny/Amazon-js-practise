import { Cartt } from '../data/cart-class.js';
import { orders } from '../data/orders.js';
import { formatCurrency } from './utils/money.js';
import { products, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadProductsforP() {
    try {
        await loadProductsFetch();
        renderOrdersGrid(orders);
    } catch (error) {
        console.log(error);
    }
}
loadProductsforP();

document.querySelector('.cart-quantity').innerHTML = Cartt.cartQuntity;
let ordersGrid = document.querySelector('.orders-grid');
const today = dayjs();
// today.format(MMMM, D);
console.log(orders);
// console.log(products);
function renderOrdersGrid(orders) {
    let gridHtml = '';

    orders.forEach(order => {
        // let date = new Date(order.orderTime);
        // let month = format(date, 'MMMM');
        // let day = date.getDay();
        // console.log(date, month, day)
        gridHtml = `
     <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div> ${dayjs(order.orderTime).format('MMMM D')}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        
        <div class="order-details-grid">
          

       
        `;
        let eachProd = '';
        order.products.forEach(product => {
            let matchingProduct;
            products.forEach(prod => {
                if (prod.id === product.productId) {
                    matchingProduct = prod;
                }
            })
            // console.log(matchingProduct);
            eachProd += `
    <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?&deliveryDate=${dayjs(product.estimatedDeliveryTime).format('MMMM D')}&orderId=${order.id}&productId=${matchingProduct.id}">
              <button class="track-package-button button-secondary">
                Track package 
              </button>
            </a>
          </div>
    `
        });
        gridHtml += eachProd;
        gridHtml += ` </div>
      </div>`;
        ordersGrid.innerHTML += gridHtml;
    });
    localStorage.setItem('gridHtml', JSON.stringify(gridHtml));
}
