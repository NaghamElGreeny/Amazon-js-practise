import { formatCurrency } from "../scripts/utils/money.js";
import { deliveryOptions } from "./deliveryOptions.js";
import { products } from "./products.js";
export let cart = JSON.parse(localStorage.getItem('cart')) || [];
// localStorage.removeItem('cart');
// console.log(cart);
function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
    // console.log(productId, quantity);
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += quantity;
    }
    else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    // localStorage.setItem('cart', JSON.stringify(cart));
    saveToStorage();
    updateCartQuantity();
    cartProducts();
}

export let cartQuntity = Number(localStorage.getItem('cartQuntity')) || 0;

export function updateCartQuantity() {
    let sumQuantity = 0;
    cart.forEach((cartItem) => {
        sumQuantity += cartItem.quantity;
    });
    cartQuntity = sumQuantity;
    // return sumQuantity;
    localStorage.setItem('cartQuntity', cartQuntity);
}
export function cartProducts() {
    if (cartQuntity === 0) {
        document.querySelector('.js-cart-quantity').innerHTML = '';
    } else {
        document.querySelector('.js-cart-quantity').innerHTML = cartQuntity;
    }
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
            console.log('added to new');
        }
    });
    cart = newCart;
    console.log('didn\'t back yet');
    saveToStorage();
    updateCartQuantity();
    // console.log(cartQuntity);
    // console.log(cart);
    // updateCartQuantity();
    // localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;

    saveToStorage();
    updateCartQuantity();
}
calculateTotal();
export function calculateTotal() {
    let total = 0;
    let tax = 0;
    let totalWithTax = 0;
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product) => {
            if (productId === product.id) {
                matchingProduct = product;
            }
        });
        total += (matchingProduct.priceCents) * cartItem.quantity;
    });
    tax = formatCurrency(total) * .1;
    total = formatCurrency(total);
    totalWithTax = (Number(tax) + Number(total)).toFixed(2);
    // console.log(total);
    // console.log(tax);
    // console.log(totalWithTax);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}