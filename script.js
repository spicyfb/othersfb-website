// =============================
// Others Fingerboarding Main Script (2025 — Modern Functional Cart)
// =============================

(function () {
  // === DOM ELEMENTS ===
  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  const closeBtn = document.getElementById("closeBtn");
  const searchIcon = document.getElementById("searchIcon");
  const searchBarContainer = document.getElementById("searchBarContainer");
  const searchInput = document.getElementById("searchInput");
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");
  const CART_KEY = "others_cart_v1";

  // === Create Cart Panel Dynamically ===
  let cartPanel = document.getElementById("cartPanel");
  if (!cartPanel) {
    cartPanel = document.createElement("div");
    cartPanel.id = "cartPanel";
    cartPanel.innerHTML = `
      <div class="cart-header" style="display:flex;justify-content:space-between;align-items:center;padding:15px 0;border-bottom:1px solid #eee;">
        <h3 style="font-size:16px;font-weight:700;">Your Cart 🛒</h3>
        <button id="closeCartBtn" style="background:none;border:none;font-size:20px;cursor:pointer;color:#444;">✖</button>
      </div>
      <div id="cartItems" style="flex:1;overflow-y:auto;padding:10px 0;max-height:65vh;"></div>
      <div id="cartTotal" style="font-weight:700;margin-top:10px;">Total: R0.00</div>
      <div style="margin-top:14px;display:flex;gap:10px;">
        <button id="clearCartBtn" style="flex:1;padding:10px;border:none;background:#f3f3f3;border-radius:8px;cursor:pointer;font-weight:600;">Clear</button>
        <a href="#" class="checkout-btn" style="flex:1;padding:10px;text-align:center;background:#111;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">Checkout</a>
      </div>
    `;
    Object.assign(cartPanel.style, {
      position: "fixed",
      top: "0",
      right: "-420px",
      width: "360px",
      maxWidth: "95%",
      height: "100%",
      background: "#fff",
      boxShadow: "-6px 0 25px rgba(0,0,0,0.15)",
      transition: "right 0.35s ease",
      zIndex: "6000",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    });
    document.body.appendChild(cartPanel);
  }

  const closeCartBtn = cartPanel.querySelector("#closeCartBtn");
  const clearCartBtn = cartPanel.querySelector("#clearCartBtn");
  const cartItemsEl = cartPanel.querySelector("#cartItems");
  const cartTotalEl = cartPanel.querySelector("#cartTotal");
  const checkoutBtn = cartPanel.querySelector(".checkout-btn");

  // === CART FUNCTIONS ===
  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
  }

  function formatPrice(priceStr) {
    return parseFloat(String(priceStr).replace(/[^\d.]/g, "")) || 0;
  }

  function updateCartCount() {
    const cart = readCart();
    const total = cart.reduce((s, i) => s + (i.qty || 0), 0);
    if (total > 0) {
      cartCount.style.display = "inline-block";
      cartCount.textContent = total;
    } else {
      cartCount.style.display = "none";
    }
  }

  function updateCartUI() {
    const cart = readCart();
    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
      cartItemsEl.innerHTML =
        '<div style="color:#666;text-align:center;margin-top:30px;">Your cart is empty 💤</div>';
      cartTotalEl.textContent = "Total: R0.00";
      updateCartCount();
      return;
    }

    let total = 0;
    cart.forEach((item, idx) => {
      const itemTotal = formatPrice(item.price) * (item.qty || 1);
      total += itemTotal;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
          <img src="${item.img}" alt="${item.name}" style="width:58px;height:58px;border-radius:10px;object-fit:cover;">
          <div style="flex:1;">
            <div style="font-weight:600;font-size:13px">${item.name}</div>
            <div style="color:#666;font-size:12px;">${item.price}</div>
            <div class="qty-controls" style="margin-top:6px;display:flex;align-items:center;gap:6px;">
              <button class="qty-dec" data-idx="${idx}" style="background:#f3f3f3;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-weight:600;">-</button>
              <span style="min-width:20px;text-align:center;font-weight:600;">${item.qty}</span>
              <button class="qty-inc" data-idx="${idx}" style="background:#f3f3f3;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;font-weight:600;">+</button>
              <button class="remove-item" data-idx="${idx}" style="margin-left:8px;color:#e11d48;background:none;border:none;cursor:pointer;font-size:12px;font-weight:600;">Remove</button>
            </div>
          </div>
        </div>
        <div style="font-weight:700;margin-bottom:8px;">R${itemTotal.toFixed(2)}</div>
      `;
      cartItemsEl.appendChild(div);
    });

    cartTotalEl.textContent = `Total: R${total.toFixed(2)}`;
    updateCartCount();
  }

  function addToCart(item, qty = 1) {
    const cart = readCart();
    const found = cart.find((i) => i.name === item.name);
    if (found) found.qty += qty;
    else cart.push({ ...item, qty });
    saveCart(cart);
    openCart();
  }

  function openCart() {
    cartPanel.style.right = "0";
    updateCartUI();
  }

  function closeCart() {
    cartPanel.style.right = "-420px";
  }

  // === EVENT HANDLERS ===
  updateCartCount();
  updateCartUI();

  // Menu open/close
  menuBtn?.addEventListener("click", () => sideMenu?.classList.add("open"));
  closeBtn?.addEventListener("click", () => sideMenu?.classList.remove("open"));
  document.addEventListener("click", (e) => {
    if (
      sideMenu?.classList.contains("open") &&
      !sideMenu.contains(e.target) &&
      e.target !== menuBtn
    ) {
      sideMenu.classList.remove("open");
    }
  });

  // Search bar
  searchIcon?.addEventListener("click", () => {
    searchBarContainer.classList.toggle("active");
    if (searchBarContainer.classList.contains("active"))
      setTimeout(() => searchInput.focus(), 60);
  });
  searchInput?.addEventListener("input", () => {
    const term = (searchInput.value || "").trim().toLowerCase();
    document.querySelectorAll(".product-card").forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const price = (card.dataset.price || "").toLowerCase();
      const matches = !term || name.includes(term) || price.includes(term);
      card.style.display = matches ? "" : "none";
    });
  });

  // Cart panel open/close
  cartIcon?.addEventListener("click", (e) => {
    e.stopPropagation();
    openCart();
  });
  closeCartBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeCart();
  });
  document.addEventListener("click", (e) => {
    if (
      !cartPanel.contains(e.target) &&
      e.target !== cartIcon &&
      cartPanel.style.right === "0px"
    ) {
      closeCart();
    }
  });

  // Clear cart
  clearCartBtn?.addEventListener("click", () => {
    if (!confirm("Clear cart?")) return;
    localStorage.removeItem(CART_KEY);
    updateCartUI();
    updateCartCount();
  });

  // Item qty controls
  cartItemsEl.addEventListener("click", (e) => {
    const cart = readCart();
    const inc = e.target.closest(".qty-inc");
    const dec = e.target.closest(".qty-dec");
    const rem = e.target.closest(".remove-item");
    if (inc) {
      const idx = +inc.dataset.idx;
      if (cart[idx]) cart[idx].qty++;
    }
    if (dec) {
      const idx = +dec.dataset.idx;
      if (cart[idx] && cart[idx].qty > 1) cart[idx].qty--;
    }
    if (rem) {
      const idx = +rem.dataset.idx;
      cart.splice(idx, 1);
    }
    saveCart(cart);
  });

  // Add-to-cart + view more
  document.querySelectorAll(".product-card").forEach((card) => {
    const addBtn = card.querySelector(".add-btn");
    const infoBtn = card.querySelector(".info-btn");

    infoBtn?.addEventListener("click", () => {
      const product = {
        name: card.dataset.name,
        price: card.dataset.price,
        desc: card.dataset.desc,
        img: card.dataset.img,
      };
      localStorage.setItem("selected_product", JSON.stringify(product));
      const name = encodeURIComponent(card.dataset.name);
      window.location.href = `product.html?name=${name}`;
    });

    addBtn?.addEventListener("click", () => {
      const product = {
        name: card.dataset.name,
        price: card.dataset.price,
        desc: card.dataset.desc,
        img: card.dataset.img,
      };
      addToCart(product, 1);
    });
  });

  // Checkout redirect
  checkoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const cart = readCart();
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }
    saveCart(cart);
    window.location.href = "checkout.html";
  });  
})();
