
const nextBtn = document.querySelector(".next")
const previousBtn = document.querySelector(".previous")
let tableBody = document.querySelector(".table-body")
let searchInput = document.querySelector(".search-input")
const loader = document.querySelector(".loader-container")
let data = []
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");

const delModal = document.getElementById("del-modal");
const delModalMsg = document.getElementById("del-modal-message");
const delCloseModal = document.getElementById("del-no-modal");
const delYesModal = document.getElementById("del-yes-modal");
let eventResult = null

const searchRegex = /^(?!\s*$).+/

function showLoader() {
    loader.style.display = "flex"
    console.log("Loader called");
    
}
function removeLoader() {
    loader.style.display = "none"
        console.log("Loader removed");

}
function showModal(message) {
    modalMsg.textContent = message;
    modal.style.display = "flex";
}
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});
delCloseModal.addEventListener("click", () => {
    delModal.style.display = "none";
});

async function getProducts() {
    try {
        showLoader()
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${0}&limit=${20}`)
        data = await response.json()
        displayRows(data)
    } catch (error) {
        showModal(`${error} Please Try Again`)
    }
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

    // ! it deleted without pop up message 
    eventResult = null;
    delModalMsg.textContent = "Do You Want To Delete This Product";
    delModal.style.display = "flex";
    let userWait = setInterval(async () => {
        if (eventResult !== null) {
            clearInterval(userWait)
            try {
                if (eventResult === true) {
                    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { method: "DELETE" })
                    if (response.ok) {
                        that.closest("tr").remove();
                        showModal("Product Deleted Sucesfully")
                    }
                    else {
                        showModal("Product Not Deleted ")
                    }
                }
                else {
                    showModal("delete Canceled")
                }
            } catch (error) {
                showModal(`${error} Please Try Again`)
            }
            eventResult = null
        }

    }, 100)

}
const searchIcon = document.querySelector(".search-icon")
// searchIcon.addEventListener("click", function () {
//     showLoader()
//     if (searchInput.value == "") {
//         alert("Please Enter Name Of The Product")
//     }
//     else {
//         tableBody.innerHTML = ""

//         const filtered = data.filter((item) => {
//             return item.title.toLowerCase().includes(searchInput.value.toLowerCase())
//         })
//         if (filtered.length > 0) {
//             displayRows(filtered)
//         }
//         else {
//             tableBody.innerHTML = `<tr> <td colspan="6">There is No Products suitable For Your Search </td></tr>`
//         }
//     }
//     removeLoader()
// })


// ! Use Api For Search By Title
async function filterBySearch(title){
    if (!searchRegex.test(title)) {
        searchInput.parentElement.nextElementSibling.style.display = "block"
        return ;
    }
    else{
        searchInput.parentElement.nextElementSibling.style.display = "none"
    try {
        showLoader()
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}`)    
    const data = await response.json()
    console.log(data);
    if (data.length == 0) {
        showModal("There Is No Product With This Title")
    }
    displayRows(data)
    
    } catch (error) {
        showModal(`${error} Please Try Again`)
    }
    removeLoader()
    }
}
searchIcon.addEventListener("click",function(){
     filterBySearch(searchInput.value)
})

const limit = 10
let offset = 0
nextBtn.addEventListener("click", async function () {
    showLoader()
    try {
        console.log(this);

        offset = offset + 10
        // ! remove Offset Condition 
        // if (offset <= 60) {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            const rows = await response.json()
            console.log(rows);
            console.log("Offset =  " + offset);
            tableBody.innerHTML = ""
            displayRows(rows)
        // }
        // else {
            //    alert("No Products Found ")
            // showModal("No Products Found ")
        // }
    } catch (error) {
        showModal(`${error} Please Try Again`)
    }
    removeLoader()
})

previousBtn.addEventListener("click", async function () {
    showLoader()
    try {
        console.log(previousBtn);

        offset = offset - 10
        if (offset >= 0) {

            const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            const rows = await response.json()
            console.log(rows);
            console.log("Offset =  " + offset);
            tableBody.innerHTML = ""
            displayRows(rows)
        }
        else {
            showModal("No Products Found ")
        }
    } catch (error) {
        console.log(error);

    }
    removeLoader()
})
delModal.addEventListener("click", function (e) {
      const btn = e.target.textContent.trim().toLowerCase();
    if  (btn == "yes") {
        eventResult = true
        delModal.style.display = "none"
    }
    else {
        eventResult = false
        delModal.style.display = "none"
    }
})