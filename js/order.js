/* =====================================================
   ORDER SUMMARY + EDIT LOGIC  (DO NOT TOUCH THIS PART)
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  const summaryBox = document.querySelector(".summary-text");
  const totalAmountEl = document.getElementById("totalAmount");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  /* ---------- FORMAT PRODUCT NAME ---------- */
  function formatProductName(item) {
    if (item.baseProduct === "eggs") {
      return `Eggs (${item.variant})`;
    }
    return `${item.baseProduct.charAt(0).toUpperCase() + item.baseProduct.slice(1)} (${item.variant})`;
  }

  /* ---------- RENDER ORDER SUMMARY ---------- */
  function renderOrderSummary() {

    if (!summaryBox || !totalAmountEl) return;

    summaryBox.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      summaryBox.innerHTML = "<p>No items added yet</p>";
      totalAmountEl.innerText = "0";
      return;
    }

    cart.forEach((item, index) => {

      total += Number(item.price);

      summaryBox.innerHTML += `
        <div class="order-item">
          <div>
            <strong 
              style="cursor:pointer;color:#D11243"
              onclick="openProduct(${index})"
            >
              ${formatProductName(item)}
            </strong><br>
            Quantity: ${item.quantity} Kg<br>
            Price: ₹${item.price}
          </div>
          <span class="remove-btn" onclick="removeItem(${index})">×</span>
        </div>
      `;
    });

    totalAmountEl.innerText = total;
  }

  /* ---------- REMOVE ITEM ---------- */
  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderOrderSummary();
  };

  /* ---------- EDIT PRODUCT ---------- */
  window.openProduct = function (index) {

    localStorage.setItem("editIndex", index);

    const item = cart[index];
    if (!item) return;

    let page = "products.html";

    if (item.baseProduct === "chicken") page = "chicken.html";
    if (item.baseProduct === "fish") page = "fish.html";
    if (item.baseProduct === "eggs") page = "eggs.html";

    window.location.href = page;
  };

  renderOrderSummary();
});


/* =====================================================
   FLASH MESSAGE SYSTEM (WORKS WITH YOUR CSS)
===================================================== */
function showFlash(message, type = "success") {

  const flash = document.getElementById("flashMessage");
  if (!flash) return;

  flash.innerText = message;

  // remove old classes
  flash.classList.remove("success", "error");

  // add new class according to type
  if (type === "error") {
    flash.classList.add("error");
  } else {
    flash.classList.add("success");
  }

  flash.style.display = "block";

  setTimeout(() => {
    flash.style.display = "none";
  }, 3000);
}


/* =====================================================
   SEND ORDER TO WHATSAPP
===================================================== */
function sendOrderToWhatsApp() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let message = "🛒 FOOD ORDER – Please Check\n\n";
  let total = 0;

  cart.forEach((item, i) => {

    message += `${i + 1}. ${item.baseProduct.toUpperCase()} (${item.variant})\n`;
    message += `Qty: ${item.quantity} kg \n`;
    message += `Price: ₹${item.price}\n\n`;

    total += Number(item.price);
  });

  message += `Total Amount: ₹${total}\n\n`;

  const name = document.getElementById("customerName")?.value.trim();
  const area = document.getElementById("customerArea")?.value.trim();
  // ===== DELIVERY OPTION ADD =====
const deliveryOption = document.querySelector('input[name="delivery"]:checked');
let deliveryText = deliveryOption ? deliveryOption.value : "Not Selected";
  

  message += `Customer: ${name}\n`;
 message += `Area: ${area}\n`;
message += `Delivery Option: ${deliveryText}\n\n`;
// Get Time Slot (from select dropdown)
const timeSlot = document.getElementById("timeSlot")?.value || "Not Selected";

message += `Preferred Time Slot: ${timeSlot}\n`;
  message += "Payment: Cash / UPI via WhatsApp\n";

  const ownerNumber = "919113354669";
  const ownerNumber2="916200311600"; // 🔥 CHANGE NUMBER HERE

  const url =
    "https://wa.me/" +
    ownerNumber +
    "?text=" +
    encodeURIComponent(message);
    const url2=  "https://wa.me/" +
    ownerNumber2 +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}


/* =====================================================
   CONFIRM ORDER BUTTON
===================================================== */
function confirmOrder() {

  const name = document.getElementById("customerName")?.value.trim();
  const area = document.getElementById("customerArea")?.value.trim();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!name || !area) {
    showFlash("⚠ Please enter your name and area.", "error");
    return;
  }

  if (cart.length === 0) {
    showFlash("⚠ Please add at least one product.", "error");
    return;
  }

  

  showFlash("✅ Order placed successfully! Opening WhatsApp...", "success");

  sendOrderToWhatsApp();

  localStorage.removeItem("cart");

  setTimeout(() => {
    const feedbackSection = document.getElementById("fbRating");
    if (feedbackSection) {
      feedbackSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 800);
}


/* =====================================================
   FEEDBACK SUBMIT
===================================================== */
function submitFeedback() {

  const rating = document.getElementById("fbRating")?.value;
  const feedback = document.getElementById("fbMessage")?.value.trim();

  if (!rating && !feedback) {
    showFlash("⚠ Your feedback is important to us ❤️", "error");
    return;
  }

  // WhatsApp number (CHANGE HERE WHEN NEEDED)
  const ownerNumber = "919113354669";

  let message = "🌟 Customer Feedback – Manpasand Chicken\n\n";

  if (rating) {
    message += "Rating: " + rating + "\n\n";
  }

  if (feedback) {
    message += "Message: " + feedback + "\n\n";
  }

  const url =
    "https://wa.me/" +
    ownerNumber +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");

  showFlash("🙏 Thank you for your feedback!", "success");

  // Clear fields
  document.getElementById("fbRating").value = "";
  document.getElementById("fbMessage").value = "";
}
