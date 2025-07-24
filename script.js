// --- Product Data ---
const PRODUCTS = [
  {
    name: "Fresh Apples",
    category: "fruits",
    price: 120,
    stock: 20,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Bananas",
    category: "fruits",
    price: 60,
    stock: 30,
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e8e9?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Tomatoes",
    category: "vegetables",
    price: 40,
    stock: 25,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Potatoes",
    category: "vegetables",
    price: 30,
    stock: 40,
    image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Chips",
    category: "snacks",
    price: 35,
    stock: 50,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Orange Juice",
    category: "beverages",
    price: 80,
    stock: 15,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80"
  }
];

// --- Cart Logic ---
function getCart() {
  return JSON.parse(localStorage.getItem('lovelyvezzies_cart') || '{}');
}
function setCart(cart) {
  localStorage.setItem('lovelyvezzies_cart', JSON.stringify(cart));
}
function addToCart(idx) {
  const cart = getCart();
  cart[idx] = (cart[idx] || 0) + 1;
  setCart(cart);
  updateCartCount();
  alert('Added to cart!');
}
function removeFromCart(idx) {
  const cart = getCart();
  if (cart[idx]) {
    cart[idx]--;
    if (cart[idx] <= 0) delete cart[idx];
    setCart(cart);
    updateCartCount();
    renderCartPage();
  }
}
function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

// --- Product Catalog Page ---
function renderProductsPage() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  let currentCategory = 'all';
  const render = () => {
    grid.innerHTML = '';
    PRODUCTS.forEach((prod, idx) => {
      if (currentCategory !== 'all' && prod.category !== currentCategory) return;
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p>₹${prod.price} <span style="font-size:0.9em;color:#888;">/unit</span></p>
        <p style="font-size:0.95em;color:#888;">Stock: ${prod.stock}</p>
        <button class="add-cart-btn" data-idx="${idx}"><i class="fa fa-cart-plus"></i> Add to Cart</button>
      `;
      grid.appendChild(card);
    });
    grid.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.onclick = () => addToCart(btn.getAttribute('data-idx'));
    });
  };
  render();
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      render();
    };
  });
}

// --- Cart Page ---
function renderCartPage() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalDiv = document.getElementById('cartTotal');
  const whatsappBtn = document.getElementById('whatsappOrderBtn');
  const emptyMsg = document.getElementById('emptyCartMsg');
  if (!cartItemsDiv) return;
  const cart = getCart();
  let total = 0;
  let hasItems = false;
  cartItemsDiv.innerHTML = '';
  Object.keys(cart).forEach(idx => {
    const prod = PRODUCTS[idx];
    const qty = cart[idx];
    if (qty > 0) {
      hasItems = true;
      total += prod.price * qty;
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${prod.name}</div>
          <div>₹${prod.price} x <span class="cart-item-qty">${qty}</span></div>
        </div>
        <div class="cart-item-actions">
          <button onclick="removeFromCart(${idx})"><i class="fa fa-minus"></i></button>
        </div>
      `;
      cartItemsDiv.appendChild(row);
    }
  });
  if (hasItems) {
    cartTotalDiv.textContent = `Total: ₹${total}`;
    whatsappBtn.style.display = '';
    emptyMsg.style.display = 'none';
  } else {
    cartTotalDiv.textContent = '';
    whatsappBtn.style.display = 'none';
    emptyMsg.style.display = '';
  }
}

// --- WhatsApp Order ---
function sendOrderOnWhatsApp() {
  const cart = getCart();
  let message = "Hello! I want to order:\n";
  let total = 0;
  Object.keys(cart).forEach(idx => {
    const prod = PRODUCTS[idx];
    const qty = cart[idx];
    if (qty > 0) {
      message += `\n${prod.name} - ${qty} x ₹${prod.price} = ₹${prod.price * qty}`;
      total += prod.price * qty;
    }
  });
  message += `\n\nTotal: ₹${total}\n\nPlease confirm my order.`;
  const number = window.WHATSAPP_NUMBER || "918825092106";
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
}

// --- Admin Page (Demo) ---
function renderAdminPage() {
  const table = document.getElementById('adminProductTable');
  if (!table) return;
  table.innerHTML = '';
  PRODUCTS.forEach((prod, idx) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${prod.name}</td>
      <td>${prod.category}</td>
      <td>${prod.price}</td>
      <td>${prod.stock}</td>
      <td>
        <button onclick="alert('Edit not implemented in demo')"><i class="fa fa-edit"></i></button>
        <button onclick="alert('Delete not implemented in demo')"><i class="fa fa-trash"></i></button>
      </td>
    `;
    table.appendChild(row);
  });
  // Add product form
  const form = document.getElementById('addProductForm');
  if (form) {
    form.onsubmit = e => {
      e.preventDefault();
      alert('Add product not implemented in demo');
      form.reset();
    };
  }
}

// --- On Page Load ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderProductsPage();
  renderCartPage();
  renderAdminPage();

  // WhatsApp order button
  const whatsappBtn = document.getElementById('whatsappOrderBtn');
  if (whatsappBtn) whatsappBtn.onclick = sendOrderOnWhatsApp;
});