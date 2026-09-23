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
  alert(`${product.title} added to cart!`);
}

// Render Cart Items on cart.html with product links
function renderCartPage() {
  const cartContainer = document.getElementById('cart-items'); // Match your container ID
  if (!cartContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-card">
      <!-- Clickable Product Image -->
      <a href="product.html?id=${item.id}" class="cart-img-link">
        <img src="${item.image_url}" alt="${item.title}" class="cart-img">
      </a>

      <div class="cart-info">
        <!-- Clickable Product Title -->
        <a href="product.html?id=${item.id}" class="cart-title-link">
          <h3 class="cart-title">${item.title}</h3>
        </a>
        <p class="unit-price">KSh ${Number(item.price).toLocaleString()}</p>

        <!-- Quantity Controls -->
        <div class="qty-controls">
          <button onclick="updateQuantity(${item.id}, -1)">-</button>
          <input type="text" value="${item.quantity}" readonly>
          <button onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>

      <div class="cart-total-price">
        KSh ${(item.price * item.quantity).toLocaleString()}
      </div>

      <!-- Delete Button -->
      <button class="btn-delete" onclick="removeFromCart(${item.id})">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  `).join('');
}

// Update Item Quantity (+ / -)
function updateQuantity(id, change) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCart(cart);
  renderCartPage();
}

// Remove Item from Cart
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCartPage();
}

// Run automatically on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartPage();
});