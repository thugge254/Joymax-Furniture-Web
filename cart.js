// Retrieve cart from localStorage or initialize empty array
function getCart() {
  return JSON.parse(localStorage.getItem('joymax_cart')) || [];
}

// Save cart to localStorage and update badge count
function saveCart(cart) {
  localStorage.setItem('joymax_cart', JSON.stringify(cart));
  updateCartBadge();
}

// Update navbar cart badge on any page
function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector('.cart-count');
  if (badge) {
    badge.textContent = totalItems;
  }
}

// Add a product to cart
function addToCart(product) {
  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  alert(`${product.name} added to cart!`);
}

// Run automatically on page load to set initial counter
document.addEventListener('DOMContentLoaded', updateCartBadge);