function renderWishlist() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById("wishlist");
    wishlistContainer.innerHTML = "";
  
    wishlistItems.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card", "bg-red-400","text-white", "shadow-md", "rounded-lg", "p-4", "mb-4");
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title text-xl font-semibold">${item.name}</h5>
          <p class="card-text">Price: ${item.price}</p>
        </div>
      `;
      wishlistContainer.appendChild(card);
    });
}

renderWishlist();
