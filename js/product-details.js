const params = new URLSearchParams(window.location.search)
    const id = params.get("id");
    const loader = document.querySelector(".loader-container")

    function showLoader(){
loader.style.display = "flex"
}
function removeLoader(){
loader.style.display = "none"
}
    
async function productDetails(){
    showLoader()
    try {
         const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    const data = await response.json()
    console.log(data);
    let cartona = ""
    cartona = `
            <div>
            <img src="./Tshirt.jpg" alt="">
            <div class="text">
                <h2 class="title">${data.title}</h2>
                <p class="category">category : ${data.category.name}</p>
                <p class="price">$${data.price}</p>
                <p class="desc">${data.description}</p>
            </div>
        </div>
    `
    document.querySelector(".product-container").innerHTML = cartona
    } catch (error) {
        console.log(error);    
    }
   removeLoader()
}

productDetails()
