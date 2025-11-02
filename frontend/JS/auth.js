// Just for testing frontend; later you'll connect it to backend routes
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("ورود با موفقیت انجام شد ✅");
    window.location.href = "index.html";
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("ثبت نام با موفقیت انجام شد ✅");
    window.location.href = "login.html";
  });
}
