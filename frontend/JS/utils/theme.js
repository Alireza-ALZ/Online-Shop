function applyTheme() {
  const themeBtn = document.querySelector(".theme-btn");
  const body = document.body;

  if (themeBtn) {
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
}

export default applyTheme;
