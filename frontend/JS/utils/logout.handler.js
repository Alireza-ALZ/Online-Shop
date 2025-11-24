function logoutHandler() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    });
  }
}

export default logoutHandler;
