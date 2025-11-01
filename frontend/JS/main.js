// Just sample data for test
const sampleProducts = [
  {
    id: 1,
    title: "قاب چوبی کلاسیک",
    price: "120,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "قاب مدرن مشکی",
    price: "150,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "قاب سفید مینیمال",
    price: "130,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "قاب طلایی لوکس",
    price: "200,000 تومان",
    image: "https://via.placeholder.com/300x200",
  },
];

const productGrid = document.getElementById("product-grid");

sampleProducts.forEach((p) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${p.image}" alt="${p.title}">
    <h3>${p.title}</h3>
    <p>${p.price}</p>
    <button class="add-to-cart">افزودن به سبد خرید</button>
  `;
  productGrid.appendChild(card);
});
