
const nextBtn = document.querySelector(".next")
const previousBtn = document.querySelector(".previous")
let tableBody = document.querySelector(".table-body")
let searchInput = document.querySelector(".search-input")
const loader = document.querySelector(".loader-container")
let data = []
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");


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

async function getProducts() {
    showLoader()
    const response = await fetch("https://api.escuelajs.co/api/v1/products")
    data = await response.json()
    const products = data.slice(0, 20)
    displayRows(products)
    removeLoader()
}
getProducts()

function displayRows(data) {
    let rows = data.map((row) => {
        return `   <tr class="">
        <td>
           ${row.id}
        </td>
        <td>
            ${row.title}
        </td>
        <td>
            ${row.category.name}
        </td>
        <td>
            $${row.price}
        </td>
        <td>
            ${row.category.id}
        </td>
                <td >
                <div class="flex">
                <span><a href="productdetails.html?id=${row.id}">View</a></span>
                <span><a href="edit.html?id=${row.id}">Edit</a></span>
                <span><a onClick="deleteProduct(${row.id},this)">Delete</a></span>
                </div>
                </td>
    </tr>`

    })
    tableBody.innerHTML = rows.join("")
}
async function deleteProduct(id, that) {
    const confirmResult = confirm("are You Sure to Delete this Product")
    try {
        if (confirmResult) {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { method: "DELETE" })

            if (response.ok) {
                that.closest("tr").remove();
                alert("Product Deleted Sucesfully")
            }
            else {
                alert("Product Not Deleted ")
            }


        }

    } catch (error) {
        console.log(error);

    }
}
const searchIcon = document.querySelector(".search-icon")
searchIcon.addEventListener("click", function () {
    showLoader()
    if (searchInput.value == "") {
        alert("Please Enter Name Of The Product")
    }
    else {
        tableBody.innerHTML = ""
        
        const filtered = data.filter((item)=>{
            return item.title.toLowerCase().includes(searchInput.value.toLowerCase())
        })
        if (filtered.length > 0) {
            displayRows(filtered)
        }
        else{
        tableBody.innerHTML = `<tr> <td colspan="6">There is No Products suitable For Your Search </td></tr>`
        }
        // for (let i = 0; i < data.length; i++) {
        //     if (data[i].title.toLowerCase().includes(searchInput.value.toLowerCase())) {
        //         let filtered = ""
        //         filtered += data[i]
        //         console.log(filtered);
                
        //         displayRows(filtered)
        //     }
        //     else {
        //         tableBody.innerHTML = `<tr> <td colspan="6">There is No Products suitable For Your Search </td></tr>`
        //     }
        // }
    }
    removeLoader()
})
const limit = 10 
 let offset = 0
nextBtn.addEventListener("click",async function(){
showLoader()
    try {
            console.log(this);
    
    offset = offset + 10
    if (offset <= 60) {
        
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    const rows = await response.json()
    console.log(rows);
    console.log("Offset =  " +offset);
    tableBody.innerHTML = ""
    displayRows(rows)
}
else{
//    alert("No Products Found ")
   showModal("No Products Found ")
}
    } catch (error) {
        console.log(error)
    }
removeLoader()
})

previousBtn.addEventListener("click",async function(){
    showLoader()
    try {
           console.log(previousBtn);
    
    offset = offset - 10
    if (offset >= 0) {
        
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
    const rows = await response.json()
    console.log(rows);
    console.log("Offset =  " +offset);
    tableBody.innerHTML = ""
    displayRows(rows)
}
else{
//    alert("No Products Found ")
   showModal("No Products Found ")
} 
    } catch (error) {
        console.log(error);
        
    }
removeLoader()
})