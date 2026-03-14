const featuredGrid = document.getElementById("featured-grid");
const productGrid = document.getElementById("product-grid");
const template = document.getElementById("product-card-template");
const featuredSection = document.getElementById("featured-section");
const catalogSection = document.getElementById("catalog");

// pick 5 random featured
function getRandomFeatured(products){
const shuffled=[...products].sort(()=>0.5-Math.random());
return shuffled.slice(0,5);
}

// render featured
function renderFeatured(products){

if(!featuredGrid) return;

featuredGrid.innerHTML="";

const featured=getRandomFeatured(products);

featured.forEach(product=>{

const clone=template.content.cloneNode(true);

clone.querySelector(".product__title").textContent=product.name;
clone.querySelector(".product__description").textContent=product.description;
clone.querySelector(".product__price").textContent=`$${product.price.toFixed(2)}`;
clone.querySelector(".product__image").src=product.image;

clone.querySelector(".product__stock").textContent=
product.stock>0?`${product.stock} in stock`:"Out of stock";

featuredGrid.appendChild(clone);

});

}

// render catalogue
function renderCatalogue(products){

if(!productGrid) return;

productGrid.innerHTML="";

products.forEach(product=>{

const clone=template.content.cloneNode(true);

clone.querySelector(".product__title").textContent=product.name;
clone.querySelector(".product__description").textContent=product.description;
clone.querySelector(".product__price").textContent=`$${product.price.toFixed(2)}`;
clone.querySelector(".product__image").src=product.image;

clone.querySelector(".product__stock").textContent=
product.stock>0?`${product.stock} in stock`:"Out of stock";

productGrid.appendChild(clone);

});

}

// page detection
function handlePageView(){

const hash = window.location.hash;

if(hash === "#catalog"){

// CATALOGUE PAGE
if(featuredSection) featuredSection.style.display = "none";
if(catalogSection) catalogSection.style.display = "block";

}else{

// HOME PAGE
if(featuredSection) featuredSection.style.display = "block";
if(catalogSection) catalogSection.style.display = "none";

}

}

fetch("products.json")

.then(res=>res.json())

.then(products=>{

renderFeatured(products);
renderCatalogue(products);
handlePageView();

})

// update when navigation changes
window.addEventListener("hashchange",handlePageView);
