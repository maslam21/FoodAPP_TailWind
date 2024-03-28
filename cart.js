
function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (!Array.isArray(cartItems)) {
        cartItems = [cartItems];
    }

    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const card = document.createElement("div");
        card.classList.add("card", "bg-blue-400", "text-white","shadow-md", "mb-4");

        item.quantity = item.quantity || 1;

        card.innerHTML = `
        <div class="card-body flex justify-between items-center">
          <div>
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Price: ${item.price}</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="btn btn-danger removeBtn focus:outline-none" data-index="${i}">Remove</button>
            <button class="btn btn-secondary incrementBtn focus:outline-none" data-index="${i}">+</button>
            <span class="quantitySpan">${item.quantity}</span>
            <button class="btn btn-secondary decrementBtn focus:outline-none" data-index="${i}">-</button>
          </div>
        </div>
      `;
        cartItemsContainer.appendChild(card);

        const removeBtn = card.querySelector(".removeBtn");
        removeBtn.addEventListener("click", () => removeItem(i));

        const incrementBtn = card.querySelector(".incrementBtn");
        incrementBtn.addEventListener("click", () => {
            incrementItem(i);
            renderCart();
        });

        const decrementBtn = card.querySelector(".decrementBtn");
        decrementBtn.addEventListener("click", () => {
            decrementItem(i);
            renderCart();
        });

        totalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
    }

    const totalPriceSpan = document.getElementById("totalPrice");
    totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
}

function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart();
}

function incrementItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function decrementItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

renderCart();
