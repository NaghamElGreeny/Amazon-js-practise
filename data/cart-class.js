// import { formatCurrency } from "../scripts/utils/money.js";
import { products } from "./products.js";
// export let cart = JSON.parse(localStorage.getItem('cart')) || [];

class Cart {
    #localStorageKey;
    cartQuntity;
    cart;
    constructor(localStorageKey, cartQuntityKey) {
        this.#localStorageKey = localStorageKey;
        this.cartQuntityKey = cartQuntityKey;

        // const storedCart = localStorage.getItem(this.localStorageKey);
        // console.log('Stored Cart:', storedCart);
        // this.cart = storedCart ? JSON.parse(storedCart) : [];
        // console.log('Parsed Cart:', this.cart);
        this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
        this.cartQuntity = Number(localStorage.getItem(cartQuntityKey)) || 0;
    }

    #saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cart));
    }

    updateCartQuantity() {
        let sumQuantity = 0;
        this.cart.forEach((cartItem) => {
            sumQuantity += cartItem.quantity;
        });
        this.cartQuntity = sumQuantity;
        // return sumQuantity;
        localStorage.setItem('cartQuntity', this.cartQuntity);
    }

    cartProducts() {
        if (this.cartQuntity === 0) {
            document.querySelector('.js-cart-quantity').innerHTML = '';
        } else {
            document.querySelector('.js-cart-quantity').innerHTML = this.cartQuntity;
        }
    }

    addToCart(productId, quantity) {
        // console.log(productId, quantity);
        let matchingItem;
        this.cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        if (matchingItem) {
            matchingItem.quantity += quantity;
        }
        else {
            this.cart.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
        // localStorage.setItem('cart', JSON.stringify(cart));
        this.#saveToStorage();
        this.updateCartQuantity();
        this.cartProducts();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cart.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cart = newCart;
        console.log('Deleted');
        this.#saveToStorage();
        this.updateCartQuantity();
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem;

        this.cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.quantity = newQuantity;

        this.#saveToStorage();
        this.updateCartQuantity();
    }

    calculateTotal() {
        let total = 0;
        let tax = 0;
        let totalWithTax = 0;
        this.cart.forEach((cartItem) => {
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
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.#saveToStorage();
    }
}
// const basicCart = new Cart('cart', 'cartQuntity');
// const businessCart = new Cart('cart-class', 'cartQuntity');
// console.log('basic Cart>', basicCart);
// console.log('business Cart>', businessCart);
// basicCart.#localStorageKey = 'nnn';
// console.log('basic Cart edited>', basicCart);



export const Cartt = new Cart('cart', 'cartQuntity');






