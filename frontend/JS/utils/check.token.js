function isTokenExist() {
  const authLink = document.getElementById("auth-link");
  const token = localStorage.getItem("token");

  if (token) {
    authLink.innerHTML = `
        <a href="#" id="account-btn" class="btn auth-btn">حساب من</a>
        <a href="#" id="logout-btn" class="btn auth-btn logout-btn">خروج</a>
      `;
  } else {
    authLink.innerHTML = `
        <a href="login.html" class="btn auth-btn">ورود</a>
        <a href="signup.html" class="btn auth-btn">ثبت نام</a>
      `;
  }
}

export default isTokenExist;
