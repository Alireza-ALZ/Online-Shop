import applyTheme from "./utils/theme.js";
import sampleProducts from "./utils/sample.products.js";
import cartDatabase from "./utils/cart.database.js";

const BASE_URL = "http://localhost:3000";
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
});

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("ورود با موفقیت انجام شد ✅");

        if (data.token) localStorage.setItem("token", data.token);

        const items = await cartDatabase.syncCartGetItems();
        const cart = createCartForLocalStorage(items);

        saveCart(cart);

        window.location.href = "index.html";
      } else {
        alert(data.message || "خطا در ورود ❌");
      }
    } catch (err) {
      alert("خطا در ارتباط با سرور ❌");
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("ثبت نام با موفقیت انجام شد ✅");
        window.location.href = "login.html";
      } else {
        alert(data.message || "خطا در ثبت نام ❌");
      }
    } catch (err) {
      alert("خطا در ارتباط با سرور ❌");
      console.error(err);
    }
  });
}

function createCartForLocalStorage(items) {
  const cart = [];

  items.forEach((item) => {
    const product = sampleProducts.find((p) => p.id == item.productId);

    cart.push({
      ...product,
      qty: item.quantity,
    });
  });

  return cart;
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
