// ===== products.js =====

// Product data (matches your shop items)
const products = [
  {
    id: 1,
    name: "'Natural Cat' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/naturalcat.png",
    category: "Setups",
  },
  {
    id: 2,
    name: "34mm Total Fingerboards Chrome Trucks",
    price: 260.78,
    img: "images/totalchrome.png",
    category: "Trucks",
  },
  {
    id: 3,
    name: "Fatmax 29mm Darkwood Deck",
    price: 199.99,
    img: "images/fatmax_darkwood.png",
    category: "Decks",
  },
  {
    id: 4,
    name: "Fatmax 'Snow White' 32mm Trucks",
    price: 219.99,
    img: "images/fatmax_snowtrucks.png",
    category: "Trucks",
  },
  {
    id: 5,
    name: "'Death Stare' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/deathstare.png",
    category: "Setups",
  },
  {
    id: 6,
    name: "'Cat Fish' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/catfish.png",
    category: "Setups",
  },
  {
    id: 7,
    name: "'Dark Vision' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/darkvision.png",
    category: "Setups",
  },
  {
    id: 8,
    name: "Fatmax 'Corsair' 34mm Split Ply Deck",
    price: 249.99,
    img: "images/fatmax_corsair.png",
    category: "Decks",
  },
  {
    id: 9,
    name: "'Goofy Cat' 34mm Total Fingerboards Deck",
    price: 300.93,
    img: "images/goofycat.png",
    category: "Decks",
  },
  {
    id: 10,
    name: "'Bank' 34mm Total Fingerboards Setup",
    price: 401.31,
    img: "images/cashdeck.png",
    category: "Setups",
  },
  {
    id: 11,
    name: "'Trip Vibes' 34mm Total Fingerboards Setup",
    price: 300.93,
    img: "images/tripvibes.png",
    category: "Setups",
  },
  {
    id: 12,
    name: "Others. Foam Griptape",
    price: 29.99,
    img: "images/griptape.png",
    category: "Accessories",
    soldOut: true,
  },
  {
    id: 13,
    name: "'Blonde Furry' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/blondefurry.png",
    category: "Setups",
  },
  {
    id: 14,
    name: "Fatmax Kurb Krusher 35mm Deck",
    price: 219.99,
    img: "images/fatmax_kurbkrusher.png",
    category: "Decks",
  },
  {
    id: 15,
    name: "'Ms.Total' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/mstotal.png",
    category: "Setups",
  },
  {
    id: 16,
    name: "Fatmax 'Bumblebees' 8.4mm 100d Wheels",
    price: 129.99,
    img: "images/fatmax_bumblebees.png",
    category: "Wheels",
  },
  {
    id: 17,
    name: "'Vintage Roller' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/vintageroller.png",
    category: "Setups",
  },
  {
    id: 18,
    name: "Fatmax 'Navy' 8.4mm 100d Wheels",
    price: 129.99,
    img: "images/fatmax_navywheels.png",
    category: "Wheels",
  },
  {
    id: 19,
    name: "'Wine n' Dine' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/winendine.png",
    category: "Setups",
  },
  {
    id: 20,
    name: "Fatmax 'Gold Ore' 32mm Trucks",
    price: 219.99,
    img: "images/fatmax_goldtrucks.png",
    category: "Trucks",
  },
  {
    id: 21,
    name: "'Bones n' Trucks' 34mm Total Fingerboards Setup",
    price: 702.45,
    img: "images/bonesntrucks.png",
    category: "Setups",
  },
];

// DOM elements
const productContainer = document.querySelector(".product-list");
const cartCount = document.getElementById("cartCount");

// Read and save cart safely
function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart badge
function updateCartCount() {
  const cart = readCart();
  const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  if (cartCount) cartCount.textContent = total;
}

function renderProducts(list = products) {
  if (!productContainer) return;
  productContainer.innerHTML = "";

  list.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.style.position = "relative";

    const isSoldOut = p.soldOut === true;

    card.innerHTML = `
      <div class="image-wrapper" style="position:relative;">
        <img src="${p.img}" alt="${p.name}" class="product-img" />
        ${isSoldOut ? '<span class="sold-out-badge">SOLD OUT</span>' : ""}
      </div>
      <h3>${p.name}</h3>
      <p>R${p.price.toFixed(2)}</p>

      ${
        isSoldOut
          ? `<button class="sold-out" disabled style="background:#c53030;cursor:not-allowed;opacity:0.7;">Sold Out</button>`
          : `<button class="add-btn" data-id="${p.id}">Add to Cart</button>`
        : `<button class="view-more-btn" data-id="${p.id}">View More</button>`
      }

      ${
        isSoldOut
          ? `<button class="sold-out" disabled style="background:#999;cursor:not-allowed;opacity:0.7;">View More</button>`
          : `<button class="view-more-btn" onclick="window.location.href='product.html?id=${p.id}'">View More</button>`
      }
    `;

    productContainer.appendChild(card);
  });
}

  list.forEach((p) => {
function renderProducts(list = products) {
  if (!productContainer) return;
  productContainer.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.style.position = "relative";
    const isSoldOut = p.soldOut === true;
    card.innerHTML = `
      <div class="image-wrapper" style="position:relative;">
        <img src="${p.img}" alt="${p.name}" class="product-img" />
        ${isSoldOut ? '<span class="sold-out-badge">SOLD OUT</span>' : ""}
      </div>
      <h3>${p.name}</h3>
      <p>R${p.price.toFixed(2)}</p>
      ${isSoldOut ? 
        `<button class="sold-out" disabled style="background:#c53030;cursor:not-allowed;opacity:0.7;">Sold Out</button>
         <button class="sold-out" disabled style="background:#999;cursor:not-allowed;opacity:0.7;">View More</button>` : 
        `<button class="add-btn" data-id="${p.id}">Add to Cart</button>
         <button class="view-more-btn" onclick="window.location.href='product.html?id=${p.id}'">View More</button>`}
    `;
    productContainer.appendChild(card);
  });
}
// Add to cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = parseInt(e.target.dataset.id);
    const product = products.find((p) => p.id === id);
    if (!product || product.soldOut) return;

    let cart = readCart();
    const existing = cart.find((item) => item.id === id);

    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    saveCart(cart);
    updateCartCount();

    e.target.textContent = "Added!";
    e.target.disabled = true;
    setTimeout(() => {
      e.target.textContent = "Add to Cart";
      e.target.disabled = false;
    }, 1000);
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
});
