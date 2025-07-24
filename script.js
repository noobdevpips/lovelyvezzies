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

// Your WhatsApp number (change to your real number)
const whatsappNumber = "919999999999";

function createVeggieCard(veggie) {
  return `
    <div class="veggie-card">
      <img src="${veggie.image}" alt="${veggie.name}">
      <h3>${veggie.name}</h3>
      <p>₹${veggie.price} / kg</p>
      <button class="order-btn" onclick="orderOnWhatsApp('${veggie.name}', ${veggie.price})">
        Order on WhatsApp
      </button>
    </div>
  `;
}

function orderOnWhatsApp(name, price) {
  const message = encodeURIComponent(
    `Hello! I want to order:\n\n${name} - ₹${price} per kg\n\nPlease let me know the next steps.`
  );
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
}

// Render veggie cards
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("veggie-list");
  if (list) {
    list.innerHTML = veggies.map(createVeggieCard).join("");
  }
  // Smooth scroll for nav links
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
});

// Expose orderOnWhatsApp globally
window.orderOnWhatsApp = orderOnWhatsApp;