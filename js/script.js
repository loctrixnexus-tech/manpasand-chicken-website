function sendWhatsAppOrder() {
    // CHANGE THIS NUMBER
    let phoneNumber = "91XXXXXXXXXX"; 

    // ORDER DETAILS (later you can make these dynamic)
    let product = document.getElementById("product").value;
    let quantity = document.getElementById("quantity").value;
    let type = document.getElementById("type").value;
    let delivery = document.querySelector('input[name="delivery"]:checked').value;

    let message =
        "Hello Manpasand Chicken,%0A%0A" +
        "I would like to place an order:%0A" +
        "-------------------------%0A" +
        "Product: " + product + "%0A" +
        "Type: " + type + "%0A" +
        "Quantity: " + quantity + "%0A" +
        "Delivery Option: " + delivery + "%0A%0A" +
        "Please confirm availability. Thank you!";

    let url = "https://wa.me/" + phoneNumber + "?text=" + message;
    window.open(url, "_blank");
}
