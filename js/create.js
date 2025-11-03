const name = document.getElementById("name")
const description = document.getElementById("description")
const imageUrl = document.getElementById("imageUrl")
const price = document.getElementById("price")
const category = document.getElementById("category")
const addBtn = document.querySelector(".add")
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");
const loader = document.querySelector(".loader-container")
const regex = /^(?!\s*$).+/
const imageRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
const numberRegex = /\d{1,}/
const descriptionRegex = /[\w\s]{15,}/


console.log(name.nextElementSibling);



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
addBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    // ! Make A Validation 
    if (validation(regex, name)
        && validation(descriptionRegex, description)
        && validation(imageRegex, imageUrl)
        && validation(numberRegex, price)
        && validation(regex, category)) {
        showLoader()
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: name.value,
                    price: price.value,
                    description: description.value,
                    categoryId: category.value,
                    images: [imageUrl.value]
                })
            })
            const data = await response.json()
            console.log(response);
            console.log(data);

            showModal("You have Added New Product")

            // if (response.ok) {
            //     showModal("You have Added New Product")
            // }
        } catch (error) {
            showModal(`${error} , Please Try Again`)
        }
        removeLoader()
    }
    else {
        showModal("check Your Inputs Validation")
    }

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
