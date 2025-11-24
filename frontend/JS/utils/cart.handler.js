function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = count;
  }
}

export { getCart, saveCart, updateCartCount };
