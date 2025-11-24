import accountHandler from "./utils/account.handler.js";
import isTokenExist from "./utils/check.token.js";
import logoutHandler from "./utils/logout.handler.js";
import applyTheme from "./utils/theme.js";
import cartDatabase from "./utils/cart.database.js";

document.addEventListener("DOMContentLoaded", () => {
  isTokenExist();

  applyTheme();

  logoutHandler();

  accountHandler();

  const cartContainer = document.getElementById("cart-container");
  const totalItemsElem = document.getElementById("total-items");
  const totalPriceElem = document.getElementById("total-price");

  // Fetch cart from localStorage
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  const renderCart = () => {
    const cart = getCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-cart-message">
          <h3>سبد خرید شما خالی است</h3>
          <p>می‌توانید از محصولات ما دیدن کنید و موارد مورد نظر خود را به سبد خرید اضافه نمایید.</p>
          <a href="index.html" class="btn">مشاهده محصولات</a>
        </div>
      `;
      totalItemsElem.textContent = "0";
      totalPriceElem.textContent = "0";
      return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    // Create cart table
    const table = document.createElement("table");
    table.className = "cart-table";

    table.innerHTML = `
      <thead class="cart-table-header">
        <tr>
          <th>ردیف</th>
          <th>نام محصول</th>
          <th>قیمت</th>
          <th>تعداد</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody class="cart-table-body" id="cart-items">
      </tbody>
    `;

    const tbody = table.querySelector("#cart-items");

    cart.forEach((item, index) => {
      totalItems += item.qty;
      const priceNumber = Number(item.price.replace(/[^0-9]/g, "")); // Remove non-numeric characters
      totalPrice += priceNumber * item.qty;

      const row = document.createElement("tr");
      row.className = "cart-item-row";
      row.setAttribute("data-id", item.id);

      row.innerHTML = `
        <td class="cart-item-row">${index + 1}</td>
        <td>
          <div class="cart-item-product">
            <img src="${item.image}" alt="${
        item.title
      }" class="cart-item-image">
            <span class="cart-item-name">${item.title}</span>
          </div>
        </td>
        <td class="cart-item-price">${item.price}</td>
        <td>
          <div class="cart-quantity-controls">
            <button class="quantity-btn qty-minus" ${
              item.qty <= 1 ? "disabled" : ""
            }>−</button>
            <span class="quantity-number">${item.qty}</span>
            <button class="quantity-btn qty-plus">+</button>
          </div>
        </td>
        <td>
          <button class="cart-remove-btn">حذف</button>
        </td>
      `;

      tbody.appendChild(row);
    });

    cartContainer.appendChild(table);
    totalItemsElem.textContent = totalItems;
    totalPriceElem.textContent = formatPrice(totalPrice);
  };

  const updateCartCount = () => {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const countElement = document.getElementById("cart-count");
    if (countElement) countElement.textContent = count;
  };

  // Event delegation for quantity buttons and remove buttons
  document.addEventListener("click", (e) => {
    const cart = getCart();

    if (
      e.target.classList.contains("qty-plus") ||
      e.target.classList.contains("qty-minus")
    ) {
      const row = e.target.closest("tr");
      const id = row.getAttribute("data-id");
      const item = cart.find((p) => p.id == id);

      if (e.target.classList.contains("qty-plus")) {
        item.qty += 1;
      } else if (e.target.classList.contains("qty-minus")) {
        item.qty -= 1;
      }

      cartDatabase.syncCartAddItem(id, item.qty);

      // Remove if qty <= 0
      const newCart = cart.filter((p) => p.qty > 0);
      saveCart(newCart);
      renderCart();
      updateCartCount();
    }

    if (e.target.classList.contains("cart-remove-btn")) {
      const row = e.target.closest("tr");
      const id = row.getAttribute("data-id");

      const newCart = cart.filter((p) => p.id != id);
      saveCart(newCart);

      cartDatabase.syncCartRemoveItem(id);

      renderCart();
      updateCartCount();
    }

    if (e.target.id === "checkout-btn") {
      const cart = getCart();
      if (cart.length === 0) {
        alert("سبد خرید شما خالی است!");
        return;
      }

      if (confirm("آیا از پرداخت سفارش مطمئن هستید؟")) {
        alert("پرداخت با موفقیت انجام شد! سفارش شما ثبت گردید.");
        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
      }
    }
  });

  renderCart();
  updateCartCount();
});
