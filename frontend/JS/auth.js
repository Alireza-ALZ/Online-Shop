import applyTheme from "./theme.js";

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

        const items = await syncCartGetItems();
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

// Load user cart from database
async function syncCartGetItems() {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  const res = await fetch(`http://localhost:3000/cart/get-items/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) return await res.json();
  return [];
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
