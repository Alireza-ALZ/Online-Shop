document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // If no token -> redirect to login
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Theme system (same as main.js)
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

  // Load user info from backend
  fetch("http://localhost:3000/auth/whoami", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.message === "Unauthorized") {
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
      }

      // Fill profile fields
      document.getElementById("profile-username").textContent = data.username;
      document.getElementById("profile-email").textContent = data.email || "—";
      document.getElementById("profile-phone").textContent = data.phone || "—";
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
    });

  // Logout button
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });

  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = count;
  }
}
