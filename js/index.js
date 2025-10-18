let productsBox = document.querySelector(".products")
const applyBtn = document.querySelector(".apply")
const resetBtn = document.querySelector(".reset")
const nextBtn = document.querySelector(".next")
const previousBtn = document.querySelector(".previous")
const loader = document.querySelector(".loader-container")
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");
const minPrice = document.getElementById("min-price");
const maxPrice = document.getElementById("max-price");
const category = document.getElementById("category");


function showLoader(){
loader.style.display = "flex"
}
function removeLoader(){
loader.style.display = "none"
}
function showModal(message) {
  modalMsg.textContent = message;
  modal.style.display = "flex"; 
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none"; 
});


async function getProducts(){
    showLoader()
    const response = await fetch("https://api.escuelajs.co/api/v1/products")
    const data = await response.json()
    const products = data.slice(0,10)
    console.log(products);
    displayProducts(products)
    removeLoader()
}
async function filterProducts(minPrice,maxPrice,category){
    showLoader()
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${minPrice}&price_max=${maxPrice}&categoryId=${category}`)
    const data = await response.json()
    console.log(data);
    if (data.length == 0) {
        showModal("No Products With Your Filter, please Change Your Filter")
    }
    displayProducts(data)
    removeLoader()
}
getProducts()
function displayProducts(products){
let productsCards = products.map((product)=>{
return `
<a href="productdetails.html?id=${product.id}" style="color:#000;text-decoration:none">
<div class="card">
<img src="https://www.pexels.com/photo/macbook-pro-beside-white-ipad-4158/" alt="">
<h2 class="title">${product.title}</h2>
<h3 class="category">${product.category.name}</h3>
<p class="desc">${product.description}</p>
<p class="price">$${product.price}</p>
</div>
</a>
`
})
productsBox.innerHTML = productsCards.join("")

}
applyBtn.addEventListener("click",()=>{
    filterProducts(minPrice.value,maxPrice.value,category.value)
    console.log(minPrice.value);
    console.log(maxPrice.value);
    console.log(category.value);
})
resetBtn.addEventListener("click",()=>{
    showLoader()
   minPrice.value = "" 
   maxPrice.value = "" 
   category.value = "" 
   getProducts()
   removeLoader()
})
const limit = 10 
 let offset = 0
nextBtn.addEventListener("click",async function(){
    showLoader()    
    offset = offset + 10
    if (offset <= 50) {
        
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    console.log(data);
    console.log("Offset =  " +offset);
    productsBox.innerHTML = ""
    displayProducts(data)
    removeLoader()
}
else{
//    alert("No Products Found ")
showModal("No Products Found ")
}
})

previousBtn.addEventListener("click",async function(){
   showLoader()
    
    offset = offset - 10
    if (offset >= 0) {
        
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    console.log(data);
    console.log("Offset =  " +offset);
    productsBox.innerHTML = ""
    displayProducts(data)
    removeLoader()
}
else{
//    alert("No Products Found ")
showModal("No Products Found ")
}
})