document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // 🔹 Render products safely
  // ---------------------------
  const productGrid = document.getElementById("product-grid");

  if (productGrid) {
    const sampleProducts = [
      {
        id: 1,
        title: "قاب چوبی کلاسیک",
        price: "120,000 تومان",
        image: "/src/images/1.jpg",
      },
      {
        id: 2,
        title: "قاب مدرن مشکی",
        price: "150,000 تومان",
        image: "/src/images/2.jpg",
      },
      {
        id: 3,
        title: "قاب سفید مینیمال",
        price: "130,000 تومان",
        image: "/src/images/3.jpg",
      },
      {
        id: 4,
        title: "قاب طلایی لوکس",
        price: "200,000 تومان",
        image: "/src/images/4.jpg",
      },
    ];

    sampleProducts.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
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
