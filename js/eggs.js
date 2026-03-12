document.addEventListener("DOMContentLoaded", () => {
  const qtySelect = document.getElementById("egQty");
  const totalEl = document.getElementById("egTotal");

  const pricePerEgg = 6;

  function updatePrice() {
    const qty = parseInt(qtySelect.value);
    totalEl.innerText = qty * pricePerEgg;
  }

  qtySelect.addEventListener("change", updatePrice);

  // initial calculation
  updatePrice();
});
