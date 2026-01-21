// data/cart.js

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }

  saveCart();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveCart();
}

export function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.productId === productId);

  if (!item) return;

  if (newQuantity <= 0) {
    removeFromCart(productId);
  } else {
    item.quantity = newQuantity;
    saveCart();
  }
}

export function calculateCartQuantity() {
  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  return total;
}
