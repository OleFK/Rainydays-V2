import { fetchProductsFromAPI } from "./apiFunction.mjs";
import { updateCartCount } from "./cart.mjs";
import { showLoadingIndicator, hideLoadingIndicator } from "./loading.mjs";

let allProducts = [];

async function displayProducts(filter = "") {
  try {
    showLoadingIndicator();

    if (allProducts.length === 0) {
      allProducts = await fetchProductsFromAPI();
      console.log("Fetched products:", allProducts);
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
        window.location.href = "product/index.html"; 
      });
    });

    
    updateCartCount();

    hideLoadingIndicator(); 
  } catch (error) {
    console.error("Error displaying products:", error);
    productsSection.innerHTML = "<p>Error loading products.</p>";
    hideLoadingIndicator(); 
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
});
