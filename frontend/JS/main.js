// ---------------------------
// 🔹 Sample product data
// ---------------------------
const sampleProducts = [
  {
    id: 1,
    title: "قاب چوبی کلاسیک",
    price: "120,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "قاب مدرن مشکی",
    price: "150,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "قاب سفید مینیمال",
    price: "130,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "قاب طلایی لوکس",
    price: "200,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
];

const productGrid = document.getElementById("product-grid");

// ---------------------------
// 🔹 Create product cards
// ---------------------------
sampleProducts.forEach((p) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.title}">
    <h3>${p.title}</h3>
    <p>${p.price}</p>
    <button class="add-to-cart">افزودن به سبد خرید</button>
  `;
  productGrid.appendChild(card);
});

// ---------------------------
// 🔹 Auth link switcher
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("auth-link");
  const token = localStorage.getItem("token");

  if (authLink) {
    if (token) {
      authLink.innerHTML = `
        <a href="#" id="account-btn" class="btn auth-btn">حساب من</a>
        <a href="#" id="logout-btn" class="btn auth-btn logout-btn">خروج</a>
      `;

      // Logout handler
      document.getElementById("logout-btn").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        alert("خروج انجام شد ✅");
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

  // Apply saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");

      themeBtn.textContent = isDark ? "☀️" : "🌙";
      themeBtn.classList.add("rotate");

      setTimeout(() => themeBtn.classList.remove("rotate"), 500);

      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});
