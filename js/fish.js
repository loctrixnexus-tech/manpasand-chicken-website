const qty = document.getElementById("fsQty");
const totalEl = document.getElementById("fsTotal");
const options = document.querySelectorAll(".fs-option");

let pricePerKg = 220;
let selectedFish = "Rohu Fish"; // default


function updatePrice() {
  totalEl.innerText = (pricePerKg * parseFloat(qty.value)).toFixed(0);
}

options.forEach(opt => {
  opt.addEventListener("click", () => {
    options.forEach(o => o.classList.remove("active"));
    opt.classList.add("active");

    pricePerKg = Number(opt.dataset.price);
    selectedFish = opt.querySelector("h3").innerText; // ✅ NEW
    updatePrice();
  });
});


qty.addEventListener("change", updatePrice);
updatePrice();
