import { products, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from "../data/orders.js";
const url = new URL(window.location.href);
const date = url.searchParams.get('deliveryDate');
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
console.log(date, 'ord', orderId, '-', 'prod', productId)
const deliveryDate = document.querySelector('.delivery-date');
const orderName = document.getElementsByClassName('product-info')[0];
const orderQuantity = document.getElementsByClassName('product-info')[1];
const image = document.querySelector('.product-image')
console.log(date)
async function track() {
    await loadProductsFetch();
    let matchingProduct;
    products.forEach(product => {
        if (product.id === productId) {
            matchingProduct = product;
            console.log(matchingProduct);

        }
    });
    let matchingOrder;
    orders.forEach(order => {
        if (order.id === orderId) {
            matchingOrder = order;
            console.log(matchingOrder);
        }
    });
    deliveryDate.innerHTML = `Arriving on ${date} `;
    orderName.innerHTML = `${matchingProduct.name}`;
    orderQuantity.innerHTML = `${matchingOrder.quantity}`;
    image.src = `${matchingProduct.image}`;
}
track()

// console.log(url.searchParams.get('orderId'));