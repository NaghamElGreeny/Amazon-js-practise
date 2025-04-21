import { Cartt } from '../data/cart-class.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);
//show products
function renderProductsGrid() {
  let productsHTML = '';
  let productsGrid = document.querySelector('.js-products-grid');
  products.forEach((product) => {
    productsHTML += `
 <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
          ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart  js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id=${product.id}>
          Add to Cart
        </button>
      </div>
 `
  });
  productsGrid.innerHTML = productsHTML;

  //added Message
  const addedMessageTimeouts = {};
  function addedMessage(productId) {
    const previousTimeoutId = addedMessageTimeouts[productId];
    // Check if there's a previous timeout for this
    // product. If there is, we should stop it.
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
    let addedmsg = document.querySelector(`.js-added-to-cart-${productId}`);
    addedmsg.classList.add('added-to-cart-visible');
    const timeoutId = setTimeout(() => {
      addedmsg.classList.remove('added-to-cart-visible');
    }, 2000);
    // Save the timeoutId for this product ;so we can stop it later if we need to. 
    addedMessageTimeouts[productId] = timeoutId;
  }

  //show cartQuantity
  // cartProducts();
  document.querySelector('.js-cart-quantity').innerHTML = Cartt.cartQuntity;


  //send product id ,quantity to be added to cart 
  document.querySelectorAll('.add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);
      Cartt.addToCart(productId, quantity);
      quantitySelector.value = 1;
      addedMessage(productId);
    });
  });
}