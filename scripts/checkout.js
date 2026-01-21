import {
  cart,
  updateQuantity,
  removeFromCart,
  calculateCartQuantity
} from "../data/cart.js";
import { products } from "../data/products.js";

function renderCheckout() {
  let cartHTML = "";
  let itemsTotal = 0;

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    if (!product) return;

    itemsTotal += product.priceCents * cartItem.quantity;

    cartHTML += `
      <div class="cart-item-container">
        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">${product.name}</div>

            <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity">
              <button class="quantity-btn js-decrease"
                data-product-id="${product.id}">−</button>

              <span class="quantity-label">${cartItem.quantity}</span>

              <button class="quantity-btn js-increase"
                data-product-id="${product.id}">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartHTML;

  // ---- PRICE CALCULATIONS ----
  const shipping = cart.length > 0 ? 499 : 0;
  const tax = itemsTotal * 0.10;
  const beforeTax = itemsTotal + shipping;
  const total = beforeTax + tax;

  document.querySelector(".js-items-total").innerText =
    `$${(itemsTotal / 100).toFixed(2)}`;
  document.querySelector(".js-shipping").innerText =
    `$${(shipping / 100).toFixed(2)}`;
  document.querySelector(".js-before-tax").innerText =
    `$${(beforeTax / 100).toFixed(2)}`;
  document.querySelector(".js-tax").innerText =
    `$${(tax / 100).toFixed(2)}`;
  document.querySelector(".js-order-total").innerText =
    `$${(total / 100).toFixed(2)}`;

  updateHeaderCartQuantity();
  setupQuantityButtons();
}

// ---- BUTTON HANDLERS ----
function setupQuantityButtons() {
  document.querySelectorAll(".js-increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const item = cart.find(c => c.productId === productId);
      if (!item) return;

      updateQuantity(productId, item.quantity + 1);
      renderCheckout();
    });
  });

  document.querySelectorAll(".js-decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const item = cart.find(c => c.productId === productId);
      if (!item) return;

      if (item.quantity === 1) {
        removeFromCart(productId);
      } else {
        updateQuantity(productId, item.quantity - 1);
      }

      renderCheckout();
    });
  });
}

// ---- HEADER CART SYNC ----
function updateHeaderCartQuantity() {
  const cartQty = document.querySelector(".js-cart-quantity");
  if (cartQty) {
    cartQty.innerText = calculateCartQuantity();
  }
}

renderCheckout();
