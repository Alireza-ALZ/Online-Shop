import isTokenExist from "./utils/check.token.js";
import applyTheme from "./utils/theme.js";
import logoutHandler from "./utils/logout.handler.js";
import sampleProducts from "./utils/sample.products.js";
import accountHandler from "./utils/account.handler.js";
import cartDatabase from "./utils/cart.database.js";
import { getCart, saveCart, updateCartCount } from "./utils/cart.handler.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productGrid = document.getElementById("product-grid");

  if (productGrid) {
    sampleProducts.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.setAttribute("data-id", p.id);

      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${p.image}" alt="${p.title}">
        </div>
        <h3>${p.title}</h3>
        <p>${p.price}</p>
        <button class="add-to-cart">افزودن به سبد خرید</button>
      `;
      productGrid.appendChild(card);
    });

    restoreCartUI();
    updateCartCount();
  }

  isTokenExist();

  applyTheme();

  logoutHandler();

  accountHandler();
});

document.addEventListener("click", (e) => {
  const token = localStorage.getItem("token");

  if (e.target.classList.contains("add-to-cart")) {
    if (!token) {
      window.location.href = "login.html";
      return;
    }

    const card = e.target.closest(".product-card");

    const product = {
      id: card.getAttribute("data-id"),
      title: card.querySelector("h3").textContent,
      price: card.querySelector("p").textContent,
      image: card.querySelector("img").src,
      qty: 1,
    };

    const newQty = addToCart(product);
    updateCartButton(card, newQty);
    return;
  }

  if (e.target.classList.contains("qty-plus")) {
    const card = e.target.closest(".product-card");
    const id = card.getAttribute("data-id");

    const qty = increaseQty(id);
    updateCartButton(card, qty);
    return;
  }

  if (e.target.classList.contains("qty-minus")) {
    const card = e.target.closest(".product-card");
    const id = card.getAttribute("data-id");

    const qty = decreaseQty(id);
    updateCartButton(card, qty);
    return;
  }
});

function addToCart(product) {
  let cart = getCart();

  const existing = cart.find((item) => item.id == product.id);

  const newQty = existing ? existing.qty : 1;
  cartDatabase.syncCartAddItem(product.id, newQty);

  if (existing) {
    existing.qty += 1;
    saveCart(cart);
    updateCartCount();
    return existing.qty;
  } else {
    cart.push(product);
    saveCart(cart);
    updateCartCount();
    return 1;
  }
}

function increaseQty(id) {
  let cart = getCart();
  let item = cart.find((p) => p.id == id);
  item.qty += 1;
  cartDatabase.syncCartAddItem(id, item.qty);
  saveCart(cart);
  updateCartCount();
  return item.qty;
}

function decreaseQty(id) {
  let cart = getCart();
  let item = cart.find((p) => p.id == id);

  if (item.qty > 1) {
    item.qty -= 1;
    cartDatabase.syncCartAddItem(id, item.qty);
    saveCart(cart);
    updateCartCount();
    return item.qty;
  } else {
    cart = cart.filter((p) => p.id != id);
    cartDatabase.syncCartRemoveItem(id);
    saveCart(cart);
    updateCartCount();
    return 0;
  }
}

function updateCartButton(card, qty) {
  const addBtn = card.querySelector(".add-to-cart");
  const qtyBox = card.querySelector(".qty-box");

  if (qty > 0) {
    if (qtyBox) {
      const numSpan = qtyBox.querySelector(".qty-number");

      if (numSpan) numSpan.textContent = String(qty);
    } else if (addBtn) {
      addBtn.outerHTML = `
        <div class="qty-box">
          <button class="qty-minus" aria-label="decrease">−</button>
          <span class="qty-number">${qty}</span>
          <button class="qty-plus" aria-label="increase">+</button>
        </div>
      `;
    } else {
      const wrapper = card.querySelector(".product-card") || card;
      const node = document.createElement("div");

      node.className = "qty-box";
      node.innerHTML = `
        <button class="qty-minus" aria-label="decrease">−</button>
        <span class="qty-number">${qty}</span>
        <button class="qty-plus" aria-label="increase">+</button>
      `;

      card.appendChild(node);
    }
  } else {
    if (qtyBox) {
      qtyBox.outerHTML = `<button class="add-to-cart">افزودن به سبد خرید</button>`;
    } else if (!addBtn) {
      const node = document.createElement("button");

      node.className = "add-to-cart";
      node.textContent = "افزودن به سبد خرید";
      card.appendChild(node);
    }
  }
}

function restoreCartUI() {
  const cart = getCart();

  cart.forEach((item) => {
    const card = document.querySelector(`.product-card[data-id="${item.id}"]`);

    if (card) updateCartButton(card, item.qty);
  });
}
