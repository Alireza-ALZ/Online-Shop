document.addEventListener("DOMContentLoaded", () => {
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
        window.location.href = "index.html";
      });

      const accountBtn = document.getElementById("account-btn");
      if (accountBtn) {
        accountBtn.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = "profile.html";
        });
      }
    } else {
      authLink.innerHTML = `
        <a href="login.html" class="btn auth-btn">ورود</a>
        <a href="signup.html" class="btn auth-btn">ثبت نام</a>
      `;
    }
  }

  const themeBtn = document.querySelector(".theme-btn");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
  }

  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  const cartItemsContainer = document.getElementById("cart-items");
  const totalItemsElem = document.getElementById("total-items");
  const totalPriceElem = document.getElementById("total-price");

  // Fetch cart from localStorage
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  const renderCart = () => {
    const cart = getCart();
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<p style="text-align:center; width:100%; font-size:1.2rem;">سبد خرید شما خالی است.</p>`;
      totalItemsElem.textContent = 0;
      totalPriceElem.textContent = 0;
      return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
      totalItems += item.qty;
      const priceNumber = Number(item.price.replace(/[^0-9]/g, "")); // remove commas, "تومان"
      totalPrice += priceNumber * item.qty;

      const card = document.createElement("div");
      card.className = "product-card";
      card.setAttribute("data-id", item.id);

      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <div class="qty-box">
          <button class="qty-minus" aria-label="decrease">−</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-plus" aria-label="increase">+</button>
        </div>
        <button class="remove-btn btn" style="margin-top:10px;">حذف</button>
      `;

      cartItemsContainer.appendChild(card);
    });

    totalItemsElem.textContent = totalItems;
    totalPriceElem.textContent = totalPrice.toLocaleString();
  };

  const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const countElement = document.getElementById("cart-count");
    if (countElement) countElement.textContent = count;
  };

  // Event delegation for quantity buttons
  document.addEventListener("click", (e) => {
    const cart = getCart();

    if (
      e.target.classList.contains("qty-plus") ||
      e.target.classList.contains("qty-minus")
    ) {
      const card = e.target.closest(".product-card");
      const id = card.getAttribute("data-id");
      const item = cart.find((p) => p.id == id);

      if (e.target.classList.contains("qty-plus")) item.qty += 1;
      else if (e.target.classList.contains("qty-minus")) item.qty -= 1;

      // Remove if qty <= 0
      const newCart = cart.filter((p) => p.qty > 0);
      saveCart(newCart);
      renderCart();
      updateCartCount();
    }

    if (e.target.classList.contains("remove-btn")) {
      const card = e.target.closest(".product-card");
      const id = card.getAttribute("data-id");

      const newCart = cart.filter((p) => p.id != id);
      saveCart(newCart);
      renderCart();
      updateCartCount();
    }

    if (e.target.id === "checkout-btn") {
      alert("پرداخت انجام شد! (شبیه‌سازی)");
      localStorage.removeItem("cart");
      renderCart();
      updateCartCount();
    }
  });

  renderCart();
  updateCartCount();
});
