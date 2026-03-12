const qty = document.getElementById("ckQty");
const totalEl = document.getElementById("ckTotal");
const options = document.querySelectorAll(".fs-option");

let pricePerKg = 150;
let selectedCut = "Skin On"; // default


function updatePrice() {
  totalEl.innerText = (pricePerKg * parseFloat(qty.value)).toFixed(0);
}

options.forEach(opt => {
  opt.addEventListener("click", () => {
    options.forEach(o => o.classList.remove("active"));
    opt.classList.add("active");

    pricePerKg = Number(opt.dataset.price);
    selectedCut = opt.querySelector("h3").innerText; // ✅ NEW
    updatePrice();
  });
});


qty.addEventListener("change", updatePrice);
updatePrice();
