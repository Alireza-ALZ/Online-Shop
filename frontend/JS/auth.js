const BASE_URL = "http://localhost:3000";
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

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
