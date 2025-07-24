// List of vegetables (add more as needed)
const veggies = [
  {
    name: "Fresh Tomatoes",
    price: 30,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Green Spinach",
    price: 25,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Organic Carrots",
    price: 40,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Broccoli",
    price: 50,
    image: "https://images.unsplash.com/photo-1518976024611-4886d7a7d57b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Potatoes",
    price: 20,
    image: "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Red Onions",
    price: 35,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80"
  }
];

// WhatsApp number (no + or spaces)
const whatsappNumber = "91882509210";

// Cart logic
let cart = {};

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  document.getElementById("cart-count").textContent = count;
}

function renderVeggies() {
  const list = document.getElementById("veggie-list");
  if (!list) return;
  list.innerHTML = veggies.map((veggie, idx) => {
    const qty = cart[idx] || 0;
    return `
      <div class="veggie-card" style="animation-delay:${idx * 0.1}s">
        <img src="${veggie.image}" alt="${veggie.name}">
        <h3>${veggie.name}</h3>
        <p>₹${veggie.price} / kg</p>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${idx}, -1)"><i class="fas fa-minus"></i></button>
          <span class="qty-value" id="qty-${idx}">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx}, 1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    `;
  }).join("");
}

window.changeQty = function(idx, delta) {
  cart[idx] = (cart[idx] || 0) + delta;
  if (cart[idx] < 0) cart[idx] = 0;
  if (cart[idx] === 0) delete cart[idx];
  document.getElementById(`qty-${idx}`).textContent = cart[idx] || 0;
  updateCartCount();
};

function renderCartModal() {
  const modal = document.getElementById("cart-modal");
  const itemsDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  let total = 0;
  let html = "";
  Object.keys(cart).forEach(idx => {
    const veggie = veggies[idx];
    const qty = cart[idx];
    if (qty > 0) {
      total += veggie.price * qty;
      html += `
        <div class="cart-item">
          <div class="cart-item-details">
            <img src="${veggie.image}" alt="${veggie.name}">
            <span class="cart-item-name">${veggie.name}</span>
            <span class="cart-item-qty">x${qty}</span>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${idx})"><i class="fas fa-trash"></i></button>
        </div>
      `;
    }
  });
  if (!html) {
    html = "<p>Your cart is empty.</p>";
    totalDiv.textContent = "";
    document.getElementById("place-order").style.display = "none";
  } else {
    totalDiv.textContent = `Total: ₹${total}`;
    document.getElementById("place-order").style.display = "block";
  }
  itemsDiv.innerHTML = html;
}

window.removeFromCart = function(idx) {
  delete cart[idx];
  renderVeggies();
  renderCartModal();
  updateCartCount();
};

function openCartModal() {
  renderCartModal();
  document.getElementById("cart-modal").classList.add("active");
}

function closeCartModal() {
  document.getElementById("cart-modal").classList.remove("active");
}

function placeOrder() {
  if (Object.keys(cart).length === 0) return;
  let message = "Hello! I want to order:\n";
  Object.keys(cart).forEach(idx => {
    const veggie = veggies[idx];
    const qty = cart[idx];
    message += `\n${veggie.name} - ${qty} kg (₹${veggie.price}/kg)`;
  });
  let total = Object.keys(cart).reduce((sum, idx) => sum + veggies[idx].price * cart[idx], 0);
  message += `\n\nTotal: ₹${total}\n\nPlease confirm my order.`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
}

// Smooth scroll for nav links
document.addEventListener("DOMContentLoaded", () => {
  renderVeggies();
  updateCartCount();

  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth"
        });
      }
    });
  });

  document.getElementById("cart-fab").onclick = openCartModal;
  document.getElementById("close-cart").onclick = closeCartModal;
  document.getElementById("place-order").onclick = placeOrder;

  // Close modal on outside click
  document.getElementById("cart-modal").addEventListener("click", function(e) {
    if (e.target === this) closeCartModal();
  });
});