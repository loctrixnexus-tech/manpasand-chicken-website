function addToCart(baseProduct, variant, quantity, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemData = {
    key: baseProduct + "|" + variant,
    baseProduct,
    variant,
    quantity,
    price: Number(price)
  };

  // 🔑 CHECK IF USER IS EDITING FROM ORDER SUMMARY
  const editIndex = localStorage.getItem("editIndex");

  if (editIndex !== null && cart[editIndex]) {
    // ✅ UPDATE EXISTING ITEM
    cart[editIndex] = itemData;
    localStorage.removeItem("editIndex");
  } else {
    // 🔁 EXISTING LOGIC (DO NOT CHANGE)
    const index = cart.findIndex(item => item.key === itemData.key);

    if (index !== -1) {
      // SAME product + SAME variant → UPDATE
      cart[index] = itemData;
    } else {
      // NEW variant → ADD
      cart.push(itemData);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "order.html";
}
