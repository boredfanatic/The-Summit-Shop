//product grid container
const productGrid = document.getElementById("product-grid");
const productTemplate = document.getElementById("product-card-template");

//fetch products
fetch("products.json")
  .then((res) => res.json())
  .then((products) => {
    products.forEach((product) => {
      //clone
      const clone = productTemplate.content.cloneNode(true);

      //product details
      clone.querySelector(".product").dataset.productId = product.id;
      clone.querySelector(".product__title").textContent = product.name;
      clone.querySelector(".product__description").textContent = product.description;

      const priceElement = clone.querySelector(".product__price");
      priceElement.innerHTML = `$${product.price.toFixed(2)}${
        product.priceText ? ` <span class="price-text">${product.priceText}</span>` : ""
      }`;

      clone.querySelector(".product__image").src = product.image;
      clone.querySelector(".product__stock").textContent =
        product.stock > 0 ? `${product.stock} in stock` : "Out of stock";

      productGrid.appendChild(clone);
    });
  })
  .catch((err) => console.error("Error loading products:", err));