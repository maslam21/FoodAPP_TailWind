

const foodData = [
    {
        name: "Pizza",
        price: "$10",
        details: "Delicious pizza topped with cheese, tomato sauce, and your choice of toppings.",
        image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg"
    },
    {
        name: "Burger",
        price: "$8",
        details: "Classic beef burger served with lettuce, tomato, onion, and special sauce.",
        image: "https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg"
    },
    {
        name: "Spaghetti",
        price: "$12",
        details: "Classic spaghetti with marinara sauce and meatballs and special sauce.",
        image: "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg"
    },
    {
        name: "Sushi",
        price: "$15",
        details: "Assorted sushi rolls with fresh fish, rice, raita and Salad of Vegetables.",
        image: "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg"
    },
    {
        name: "Chicken Tikka Masala",
        price: "$14",
        details: "Creamy chicken curry served with basmati rice, achar, Salad and desired cold drink.",
        image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg"
    },
    {
        name: "Caesar Salad",
        price: "$9",
        details: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
        image: "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg"
    },
    {
        name: "Tacos",
        price: "$10",
        details: "Traditional Mexican tacos with seasoned meat, salsa, and toppings.",
        image: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg"
    },
    {
        name: "Steak",
        price: "$20",
        details: "Juicy grilled steak served with mashed potatoes and vegetables.",
        image: "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg"
    },
    {
        name: "Pasta Carbonara",
        price: "$13",
        details: "Italian pasta dish with creamy sauce, bacon, and parmesan cheese.",
        image: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg"
    }
];

function renderFoodList(foods) {
    const foodListContainer = document.getElementById("foodList");
    foodListContainer.innerHTML = "";
  
    foods.forEach(food => {
      const card = document.createElement("div");
      card.classList.add("p-4", "bg-white", "text-purple-900", "rounded-lg", "shadow-md"); 
      card.innerHTML = `
        <img src="${food.image}" class="md:w-full h-40 object-cover rounded-lg" alt="${food.name}">
        <div class="mt-4">
          <h5 class="text-lg font-semibold">${food.name}</h5>
          <p class="text-purple-900 mb-2">${food.details}</p> 
          <p class="text-Purple-900 font-semibold">${food.price}</p> 
          <button class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-primary addToCartBtn mt-2">Add to Cart</button>
          <button class="btn btn-outline-danger wishlist-btn mt-2 bg-transparent border border-red-500 hover:border-red-700 text-red-500 font-semibold py-2 px-4 rounded inline-flex items-center"><i class="fas fa-heart mr-1"></i></button>
        </div>
      `;
      foodListContainer.appendChild(card);
  
      const wishlistBtn = card.querySelector(".wishlist-btn");
      wishlistBtn.addEventListener("click", (event) => {
        event.stopPropagation(); 
        addToWishlist(food); 
        wishlistBtn.classList.toggle("text-red-500"); 
      });
  
      const addToCartBtn = card.querySelector(".addToCartBtn");
      addToCartBtn.addEventListener("click", () => addToCart(food));
    });
}

// Add to cart function
function addToCart(food) {
    const cartItem = {
        name: food.name,
        price: food.price,
        quantity: 1
    };

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cartItems.find(item => item.name === food.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    alert(`${food.name} has been added to the cart! (Quantity: ${existingItem ? existingItem.quantity : 1})`);
}

function addToWishlist(food) {

    const clickedButton = event.currentTarget; 
    clickedButton.classList.toggle('active'); 

    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    const existingItem = wishlistItems.find(item => item.name === food.name);

    if (existingItem) {
        wishlistItems.splice(wishlistItems.indexOf(existingItem), 1);
        alert(`${food.name} has been removed from the wishlist!`);
    } else {
        wishlistItems.push({ name: food.name, price: food.price });
        alert(`${food.name} has been added to the wishlist!`);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

    renderWishlist(); 
}

function renderWishlist() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById("wishlist-container"); 
    wishlistContainer.innerHTML = ""; 

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = "Your wishlist is empty.";
    } else {
        wishlistItems.forEach(item => {
            const wishlistItem = document.createElement("div");
            wishlistItem.classList.add("wishlist-item"); 
            wishlistItem.innerHTML = `
          <p>${item.name} - ${item.price}</p>
          `;
            wishlistContainer.appendChild(wishlistItem);
        });
    }
}

function handleSearch() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredFoods = foodData.filter(food => food.name.toLowerCase().includes(searchTerm));
    renderFoodList(filteredFoods);
}

document.getElementById("searchInput")?.addEventListener("input", handleSearch); 

document.getElementById("wishlistLink")?.addEventListener("click", function () {
    renderWishlist();
    window.location.href = "wishlist.html";
});

renderFoodList(foodData);
