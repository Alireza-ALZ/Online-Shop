class CartDatabase {
  async syncCartAddItem(productId, quantity) {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    await fetch("http://localhost:3000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });
  }

  async syncCartRemoveItem(productId) {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    await fetch("http://localhost:3000/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, productId }),
    });
  }

  async syncCartGetItems() {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    const res = await fetch(`http://localhost:3000/cart/get-items/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) return await res.json();
    return [];
  }
}

export default new CartDatabase();
