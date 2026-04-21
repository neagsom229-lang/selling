
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SAVE CART */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* UPDATE COUNT */
function updateCount() {
  document.getElementById("cart-count").innerText =
    cart.reduce((sum, item) => sum + item.qty, 0);
}

/* ADD TO CART */
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.onclick = function (e) {
    e.preventDefault();

    let name = this.dataset.name;
    let price = Number(this.dataset.price);

    let item = cart.find(i => i.name === name);

    if (item) {
      item.qty = item.qty + 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }

    saveCart();
    renderCart();
    updateCount();
  };
});

/* TOGGLE CART */
function toggleCart() {
  let box = document.getElementById("cartBox");

  if (box.style.right === "0px") {
    box.style.right = "-350px";
  } else {
    box.style.right = "0px";
  }

  renderCart();
}

/* RENDER CART */
function renderCart() {
  let container = document.getElementById("cartItems");
  let total = 0;

  container.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    total = total + (cart[i].price * cart[i].qty);

    container.innerHTML += `
      <div style="border-bottom:1px solid #eee; padding:8px 0;">
        <b>${cart[i].name}</b><br>
        $${cart[i].price} × ${cart[i].qty}

        <button onclick="removeItem(${i})"
          style="float:right; background:red; color:white; border:none;">
          ×
        </button>
      </div>
    `;
  }

  document.getElementById("cartTotal").innerText = total.toFixed(2);
}

/* REMOVE ITEM */
function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  renderCart();
  updateCount();
}

/* CHECKOUT */
function checkout() {
  if (cart.length == 0) {
    alert("Cart is empty!");
    return;
  }

  
  alert("Order successful!");

  cart = [];
  saveCart();
  renderCart();
  updateCount();
}
