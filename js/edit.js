const id = new URLSearchParams(window.location.search).get("id")
const loader = document.querySelector(".loader-container")
let name = document.getElementById("name")
let price = document.getElementById("price")
let category = document.getElementById("category")
let description = document.getElementById("description")
let imageUrl = document.getElementById("image")
let categoryOption = document.getElementById("category-option")
let updateBtn = document.querySelector(".update")
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");
const regex = /^(?!\s*$).+/
const imageRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
const numberRegex = /\d{1,}/
const descriptionRegex = /[\w\s]{15,}/
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
async function getProduct() {
    showLoader()
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        const product = await response.json()
        name.value = product.title
        price.value = product.price
        categoryOption.innerHTML = product.category.name
        description.value = product.description
        imageUrl.value = product.category.image
    } catch (error) {
        showModal(`${error} Please Try Again`)
    }
    removeLoader()
}
getProduct()
updateBtn.addEventListener("click", async function (e) {
e.preventDefault()
// ! Validation
if (validation(regex, name)
    && validation(descriptionRegex, description)
    && validation(imageRegex, imageUrl)
    && validation(numberRegex, price)
    && validation(regex, category)) {
     
       
    showLoader()
    // console.log(id);
    // console.log("Clicked");
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: name.value,
                price: +price.value,
                description: description.value,
                categoryId: category.value,
                image: [imageUrl.value],
            }),
        })
        console.log(response);

        const data = await response.json()
        console.log(data);
        if (response.ok) {
            showModal("the details have been changed")
        }
        else {
            showModal(`${data.message} Please Try Again `)
        }

    } catch (error) {
        showModal(`${error} Please Try Again`)
    }
    removeLoader() 
    }
// else{
//     showModal("Check Your Errors")
// }
})
async function getCategories() {
    try {
         const response = await fetch(`https://api.escuelajs.co/api/v1/categories`)
    const data = await response.json()
    // console.log(data);
    displayCategories(data)
    } catch (error) {
        showModal(`${error} ,Please Try Again`)
    }
   
}
function displayCategories(data) {
    
    const categories = data.map((item) => {
        return `<option value="${item.id}">${item.name}</option>`
    })
    
category.innerHTML += categories
}
getCategories()
function validation(regex, element) {
    if (regex.test(element.value)) {
        console.log("matched")
        element.nextElementSibling.style.display = "none"
        return true
    }
    else {
        console.log("NOt Matched")
        console.log(element, element.nextElementSibling);
        element.nextElementSibling.style.display = "block"
        return false
    }
}

