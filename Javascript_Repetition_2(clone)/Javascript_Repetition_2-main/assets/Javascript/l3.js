import { storeProducts } from "./storeProducts.js";

console.log("storeProducts: ", storeProducts);

let productContainer = document.getElementById("productContainer");

function addToCart(index) {
  alert(`Du har tilføjet ${storeProducts[index].title} til din kurv`);
}

window.addToCart = addToCart;

function displayProducts(arr) {
  productContainer.innerHTML = "";
  arr.forEach((item, index) => {
    // console.log(item);
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <h4>${item.title}</h4>
        <img src="${item.image}"/>
        <p>${item.price} USD</p>
        <p>Rating: ${item.popularity} / 10</p>
        <p>${item.quantity} på lager</p>
        <button onclick="addToCart(${index})">ADD TO CART</button>
    `;
    productContainer.append(div);
  });
}

let select = document.getElementById("sortSelect");

select.addEventListener("change", (event) => {
  console.log("Select: ", event.target.value);

  let sortedArray;

  if (event.target.value === "alfabetisk") {
    sortedArray = storeProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (event.target.value === "pris") {
    sortedArray = storeProducts.sort((a, b) => a.price - b.price);
  }

  console.log("Sorted Array: ", sortedArray);
  displayProducts(sortedArray);
});

displayProducts(storeProducts);
