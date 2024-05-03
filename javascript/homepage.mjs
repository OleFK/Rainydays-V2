// homepage.mjs

import { fetchProductsFromAPI } from "./apiFunction.mjs";

let allProducts = [];

async function displayProducts(filter = "") {
  try {
    if (allProducts.length === 0) {
      allProducts = await fetchProductsFromAPI();
      console.log(allProducts);
    }

    const filteredProducts = filter
      ? allProducts.filter((product) => product.gender === filter)
      : allProducts;

    const productsSection = document.getElementById("products");
    productsSection.innerHTML = "";

    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product";

      const imageUrl = product.image
        ? product.image
        : "path/to/default-image.jpg";

      productElement.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}">
        <h3>${product.title}</h3>
      `;
      productsSection.appendChild(productElement);

      productElement.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product-detail.html"; // Navn på detaljsiden
      });
    });
  } catch (error) {
    console.error("Error displaying products:", error);
    productsSection.innerHTML = "<p>Error loading products.</p>";
  }
}

document
  .getElementById("all")
  .addEventListener("click", () => displayProducts());
document
  .getElementById("men")
  .addEventListener("click", () => displayProducts("Male"));
document
  .getElementById("women")
  .addEventListener("click", () => displayProducts("Female"));

window.addEventListener("load", function () {
  displayProducts();
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }
});
