import { formatCurrency } from "../scripts/utils/money.js";
import { products } from "./products.js";
// export let cart = JSON.parse(localStorage.getItem('cart')) || [];
function CreateCartObject(localStorageKey) {

    const cartObject = {
        cart: JSON.parse(localStorage.getItem(localStorageKey)) || [],
        cartQuntity: Number(localStorage.getItem('cartQuntity')) || 0,
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cart));
        },
        updateCartQuantity() {
            let sumQuantity = 0;
            this.cart.forEach((cartItem) => {
                sumQuantity += cartItem.quantity;
            });
            cartQuntity = sumQuantity;
            // return sumQuantity;
            localStorage.setItem('cartQuntity', cartQuntity);
        },
        cartProducts() {
            if (cartQuntity === 0) {
                document.querySelector('.js-cart-quantity').innerHTML = '';
            } else {
                document.querySelector('.js-cart-quantity').innerHTML = cartQuntity;
            }
        },
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
            this.saveToStorage();
            this.updateCartQuantity();
            this.cartProducts();
        },
        removeFromCart(productId) {
            const newCart = [];
            this.cart.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                    console.log('added to new');
                }
            });
            this.cart = newCart;
            console.log('didn\'t back yet');
            this.saveToStorage();
            this.updateCartQuantity();
        },
        updateQuantity(productId, newQuantity) {
            let matchingItem;

            this.cart.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.quantity = newQuantity;

            this.saveToStorage();
            this.updateCartQuantity();
        },
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
        },
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
            cart.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    }
    return cartObject;
}
// cartObject.calculateTotal();
const basicCart = CreateCartObject('cart');
const businessCart = CreateCartObject('cart-business');
console.log(basicCart);
console.log(businessCart);








