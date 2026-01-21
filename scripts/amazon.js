import { products } from '../data/products.js';
import { addToCart, calculateCartQuantity } from '../data/cart.js';

let productsHTML = '';

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
        <img class="product-rating-stars"
          src="ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <button class="add-to-cart-button button-primary js-cart-button"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

// 🔥 ALWAYS sync cart quantity on page load
updateCartQuantity();

document.querySelectorAll('.js-cart-button').forEach(button => {
  button.addEventListener('click', () => {
    addToCart(button.dataset.productId);
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.innerText = calculateCartQuantity();
  }
}
