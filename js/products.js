function updateChicken() {
  const rate = Number(document.getElementById("chickenType").value);
  const qty = Number(document.getElementById("chickenQty").value);
  document.getElementById("chickenPrice").innerText = rate * qty;
}

function updateFish() {
  const rate = Number(document.getElementById("fishType").value);
  const qty = Number(document.getElementById("fishQty").value);
  document.getElementById("fishPrice").innerText = rate * qty;
}

function updateEggs() {
  const qty = Number(document.getElementById("eggQty").value);
  document.getElementById("eggPrice").innerText = qty * 6;
}

document.getElementById("chickenType").addEventListener("change", updateChicken);
document.getElementById("chickenQty").addEventListener("input", updateChicken);

document.getElementById("fishType").addEventListener("change", updateFish);
document.getElementById("fishQty").addEventListener("input", updateFish);

document.getElementById("eggQty").addEventListener("change", updateEggs);

/* INIT */
updateChicken();
updateFish();
updateEggs();

/* ---------- CORE ADD TO CART (UPDATED ONLY) ---------- */
function addToCart(card) {

  const productName = card.querySelector("h3").innerText;

  const qtyEl = card.querySelector("input") || card.querySelector("select");
  const quantity = qtyEl ? qtyEl.value : 1;

  const priceEl = card.querySelector(".price span");
  const price = priceEl ? Number(priceEl.innerText) : 0;

  /* ✅ NEW: VARIANT */
  let variant = "";
  const select = card.querySelector("select");
  if (select) {
    variant = select.options[select.selectedIndex].text;
  }

  /* ✅ NEW: BASE PRODUCT */
  let baseProduct = "";
  if (productName.toLowerCase().includes("chicken")) baseProduct = "chicken";
  else if (productName.toLowerCase().includes("fish")) baseProduct = "fish";
  else if (productName.toLowerCase().includes("egg")) baseProduct = "eggs";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    baseProduct: baseProduct,
    product: productName,
    variant: variant,
    quantity: quantity,
    price: price
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  /* ✅ REDIRECT */
  window.location.href = "order.html";
}

/* ---------- WRAPPER FUNCTIONS (UNCHANGED) ---------- */
function addChickenFromProducts() {
  const card = document.getElementById("chickenType").closest(".product-card");
  addToCart(card);
}

function addFishFromProducts() {
  const card = document.getElementById("fishType").closest(".product-card");
  addToCart(card);
}

function addEggsFromProducts() {
  const card = document.getElementById("eggQty").closest(".product-card");
  addToCart(card);
}
