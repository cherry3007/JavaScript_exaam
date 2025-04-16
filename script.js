const pizzaList = document.getElementById("pizza-list");
const filterButtons = document.querySelectorAll(".filters button");
const cartCount = document.getElementById("cart-count");
const themeToggle = document.getElementById("theme-toggle");

async function loadPizzas() {
  const res = await fetch("pizzas.json");
  const pizzas = await res.json();
  renderPizzas(pizzas);
  setupFilters(pizzas);
}

function renderPizzas(pizzas) {
  pizzaList.innerHTML = "";
  if (pizzas.length === 0) {
    pizzaList.innerHTML = "<p>Нет пицц для отображения</p>";
    return;
  }
  pizzas.forEach((pizza) => {
    const card = document.createElement("div");
    card.className = "pizza-card";
    card.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}">
      <h3>${pizza.name}</h3>
      <p>${pizza.description}</p>
      <span>${pizza.price} сум</span>
      <button data-id="${pizza.id}">Добавить в корзину</button>
    `;
    card.querySelector("button").addEventListener("click", () => addToCart(pizza.id));
    pizzaList.appendChild(card);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Пицца добавлена в корзину!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
}

function setupFilters(pizzas) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(".filters .active").classList.remove("active");
      btn.classList.add("active");
      const category = btn.textContent;
      if (category === "Все") {
        renderPizzas(pizzas);
      } else {
        const filtered = pizzas.filter(p => p.category === category);
        renderPizzas(filtered);
      }
    });
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
}

themeToggle.addEventListener("click", toggleTheme);
loadTheme();
updateCartCount();
loadPizzas();

<!-- cart.js -->
const cartContainer = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const themeToggleCart = document.getElementById("theme-toggle");

async function loadCart() {
  const res = await fetch("pizzas.json");
  const pizzas = await res.json();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = pizzas.filter(pizza => cart.includes(pizza.id));

  cartContainer.innerHTML = "";
  if (cartItems.length === 0) {
    emptyCart.classList.remove("hidden");
    return;
  } else {
    emptyCart.classList.add("hidden");
  }

  cartItems.forEach((pizza, index) => {
    const card = document.createElement("div");
    card.className = "pizza-card";
    card.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}">
      <h3>${pizza.name}</h3>
      <p>${pizza.description}</p>
      <span>${pizza.price} сум</span>
      <button class="remove" data-index="${index}">Удалить</button>
    `;
    card.querySelector(".remove").addEventListener("click", () => removeFromCart(pizza.id));
    cartContainer.appendChild(card);
  });
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.indexOf(id);
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
}

themeToggleCart.addEventListener("click", toggleTheme);
loadTheme();
loadCart();
