import logoutHandler from "./utils/logout.handler.js";
import applyTheme from "./utils/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  applyTheme();

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

      document.getElementById("profile-username").textContent = data.username;
      document.getElementById("profile-email").textContent = data.email || "—";
      document.getElementById("profile-phone").textContent = data.phone || "—";
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
    });

  logoutHandler();

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
