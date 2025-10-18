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
addBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    if (name.value == "") {
        showModal("Please Enter Product Name")
    }
        if (price.value == "") {
        showModal("Please Enter Product price")
    }
        if (description.value == "") {
        showModal("Please Enter Product description")
    }
        if (category.value == "") {
        showModal("Please Enter Product category")
    }
        if (imageUrl.value == "") {
        showModal("Please Enter Product Image")
    }
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
        if (response.ok) {
            showModal("You have Added New Product")
        }

    } catch (error) {
        console.log("there is an error ," + error);

    }
removeLoader()
})

