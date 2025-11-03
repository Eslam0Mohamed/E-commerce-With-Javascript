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


function showLoader() {
    loader.style.display = "flex"
}
function removeLoader() {
    loader.style.display = "none"
}
function showModal(message) {
    modalMsg.textContent = message;
    modal.style.display = "flex";
}
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});
async function getProducts() {
    // ! error handling
    try {
        showLoader()
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${0}&limit=${9}`)
        const data = await response.json()
        displayProducts(data)
        removeLoader()
    } catch (error) {
        showModal(` ${error} , please Try Again`)
    }


}
async function filterProducts(minPrice, maxPrice, category) {
    minPrice = minPrice || 50;
    maxPrice = maxPrice || 9999;
    category = category || 1;
    console.log(minPrice);

    try {
        // ! error handling
        showLoader()
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${minPrice}&price_max=${maxPrice}&categoryId=${category}`)
        const data = await response.json()
        console.log(data);
        if (data.length == 0) {
            showModal("No Products With Your Filter, please Change Your Filter")
        }
        displayProducts(data)
        removeLoader()
    } catch (error) {
        showModal(error)
    }
}
async function getCategories() {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories`)
        const data = await response.json()
        console.log(data)
        displayCategories(data)
    } catch (error) {
        showModal(`${error} Please Try Again`)
    }
}
function displayCategories(categories) {
    let categoriesResult = categories.map((categoryOption) => {
        return `<option value="${categoryOption.id}">${categoryOption.name}</option>`
    })
    category.innerHTML += categoriesResult
}
getProducts()
getCategories()
function displayProducts(products) {
    let productsCards = products.map((product) => {
        return `
<a href="productdetails.html?id=${product.id}" style="color:#000;text-decoration:none">
<div class="card">
<img src="../Tshirt.jpg" alt="">
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
applyBtn.addEventListener("click", () => {
    filterProducts(minPrice.value, maxPrice.value, category.value)
    console.log(minPrice.value);
    console.log(maxPrice.value);
    console.log(category.value);
})
resetBtn.addEventListener("click", () => {
    showLoader()
    minPrice.value = ""
    maxPrice.value = ""
    category.value = ""
    getProducts()
    removeLoader()
})
const limit = 9
let offset = 0
nextBtn.addEventListener("click", async function () {
showLoader()
    try {

        console.log("Eslam")
        
        offset = offset + 10
        // ! remove offset condition
        // if (offset <= 50) {  

        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        if (data.length == 0) {
            showModal("No Products Found ")
        }
        console.log(data);
        console.log("Offset =  " + offset);
        productsBox.innerHTML = ""
        displayProducts(data)
        
    } catch (error) {
        showModal(`${error} Please Try Again`)
    }
removeLoader()
})

previousBtn.addEventListener("click", async function () {
    showLoader()
    try {
        offset = offset - 10
        // ! remove offset condition
        if (offset >= 0) {
          
            const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            const data = await response.json()
            console.log(data);
            console.log("Offset =  " + offset);
            productsBox.innerHTML = ""
            displayProducts(data)
           
        }
        else if (offset < 0) {
            showModal("No Products Found ")
        }
    } catch (error) {
        showModal(`${error} , please Try Again`)
    }
    removeLoader()
})