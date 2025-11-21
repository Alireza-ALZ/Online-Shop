document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // 🔹 Render products safely
  // ---------------------------
  const productGrid = document.getElementById("product-grid");

  if (productGrid) {
    const sampleProducts = [
      {
        id: 1,
        title: "قاب گوشی اپل",
        price: "120,000 تومان",
        image: "/src/images/1.jpg",
      },
      {
        id: 2,
        title: "قاب گوشی سامسونگ",
        price: "150,000 تومان",
        image: "/src/images/2.jpg",
      },
      {
        id: 3,
        title: "قاب گوشی شیایومی",
        price: "130,000 تومان",
        image: "/src/images/3.jpg",
      },
      {
        id: 4,
        title: "قاب گوشی هواوی",
        price: "200,000 تومان",
        image: "/src/images/4.jpg",
      },
      {
        id: 5,
        title: "قاب گوشی ال جی",
        price: "200,000 تومان",
        image: "/src/images/5.jpg",
      },
    ];

    sampleProducts.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.setAttribute("data-id", p.id);

      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${p.image}" alt="${p.title}">
        </div>
        <h3>${p.title}</h3>
        <p>${p.price}</p>
        <button class="add-to-cart">افزودن به سبد خرید</button>
      `;
      productGrid.appendChild(card);
    });

    restoreCartUI();
    updateCartCount();
  }

  // ---------------------------
  // 🔹 Auth link switcher
  // ---------------------------
  const authLink = document.getElementById("auth-link");
  const token = localStorage.getItem("token");

  if (authLink) {
    if (token) {
      authLink.innerHTML = `
        <a href="#" id="account-btn" class="btn auth-btn">حساب من</a>
        <a href="#" id="logout-btn" class="btn auth-btn logout-btn">خروج</a>
      `;

      document.getElementById("logout-btn").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.reload();
      });
    } else {
      authLink.innerHTML = `
        <a href="login.html" class="btn auth-btn">ورود</a>
        <a href="signup.html" class="btn auth-btn">ثبت نام</a>
      `;
    }
  }

  // ---------------------------
  // 🔹 Dark mode toggle
  // ---------------------------

  const themeBtn = document.querySelector(".theme-btn");
  const body = document.body;

  if (themeBtn) {
    // Apply saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");

      themeBtn.textContent = isDark ? "☀️" : "🌙";
      themeBtn.classList.add("rotate");
      setTimeout(() => themeBtn.classList.remove("rotate"), 500);

      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  const accountBtn = document.getElementById("account-btn");
  if (accountBtn) {
    accountBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "profile.html";
    });
  }
});

document.addEventListener("click", (e) => {
  const token = localStorage.getItem("token");

  if (e.target.classList.contains("add-to-cart")) {
    if (!token) {
      window.location.href = "login.html";
      return;
    }

    const card = e.target.closest(".product-card");

    const product = {
      id: card.getAttribute("data-id"),
      title: card.querySelector("h3").textContent,
      price: card.querySelector("p").textContent,
      image: card.querySelector("img").src,
      qty: 1,
    };

    const newQty = addToCart(product);
    updateCartButton(card, newQty);
    return;
  }

  if (e.target.classList.contains("qty-plus")) {
    const card = e.target.closest(".product-card");
    const id = card.getAttribute("data-id");

    const qty = increaseQty(id);
    updateCartButton(card, qty);
    return;
  }

  if (e.target.classList.contains("qty-minus")) {
    const card = e.target.closest(".product-card");
    const id = card.getAttribute("data-id");

    const qty = decreaseQty(id);
    updateCartButton(card, qty);
    return;
  }
});

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  let cart = getCart();

  const existing = cart.find((item) => item.id == product.id);

  const newQty = existing ? existing.qty : 1;
  syncCartItem(product.id, newQty);

  if (existing) {
    existing.qty += 1;
    saveCart(cart);
    updateCartCount();
    return existing.qty;
  } else {
    cart.push(product);
    saveCart(cart);
    updateCartCount();
    return 1;
  }
}

function increaseQty(id) {
  let cart = getCart();
  let item = cart.find((p) => p.id == id);
  item.qty += 1;
  syncCartItem(id, item.qty);
  saveCart(cart);
  updateCartCount();
  return item.qty;
}

function decreaseQty(id) {
  let cart = getCart();
  let item = cart.find((p) => p.id == id);

  if (item.qty > 1) {
    item.qty -= 1;
    syncCartItem(id, item.qty);
    saveCart(cart);
    updateCartCount();
    return item.qty;
  } else {
    cart = cart.filter((p) => p.id != id);
    syncCartRemoveItem(id);
    saveCart(cart);
    updateCartCount();
    return 0;
  }
}

function updateCartButton(card, qty) {
  const addBtn = card.querySelector(".add-to-cart");
  const qtyBox = card.querySelector(".qty-box");

  if (qty > 0) {
    if (qtyBox) {
      const numSpan = qtyBox.querySelector(".qty-number");

      if (numSpan) numSpan.textContent = String(qty);
    } else if (addBtn) {
      addBtn.outerHTML = `
        <div class="qty-box">
          <button class="qty-minus" aria-label="decrease">−</button>
          <span class="qty-number">${qty}</span>
          <button class="qty-plus" aria-label="increase">+</button>
        </div>
      `;
    } else {
      const wrapper = card.querySelector(".product-card") || card;
      const node = document.createElement("div");

      node.className = "qty-box";
      node.innerHTML = `
        <button class="qty-minus" aria-label="decrease">−</button>
        <span class="qty-number">${qty}</span>
        <button class="qty-plus" aria-label="increase">+</button>
      `;

      card.appendChild(node);
    }
  } else {
    if (qtyBox) {
      qtyBox.outerHTML = `<button class="add-to-cart">افزودن به سبد خرید</button>`;
    } else if (!addBtn) {
      const node = document.createElement("button");

      node.className = "add-to-cart";
      node.textContent = "افزودن به سبد خرید";
      card.appendChild(node);
    }
  }
}

function restoreCartUI() {
  const cart = getCart();

  cart.forEach((item) => {
    const card = document.querySelector(`.product-card[data-id="${item.id}"]`);

    if (card) updateCartButton(card, item.qty);
  });
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = count;
  }
}

// Cart Req To Backend
async function syncCartItem(productId, quantity) {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  await fetch("http://localhost:3000/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, productId, quantity }),
  });
}
async function syncCartRemoveItem(productId) {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  await fetch("http://localhost:3000/cart/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, productId }),
  });
}
