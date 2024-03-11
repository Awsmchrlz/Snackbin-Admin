

const adminScreenButtons = document.querySelectorAll('.screenButton')
const adminScreens = document.querySelectorAll('.screen')
const amodals = document.querySelectorAll('.modal');

const selectStoreButtons = document.querySelectorAll('.selectStoreButton')

const aoverLay = document.querySelector('.overLay');
adminScreenButtons.forEach((button) => {
    button.addEventListener('click', () => {
        adminScreens.forEach((adminScreen) => {
            if (button.id == adminScreen.id) {
                adminScreen.classList.add('active')
            } else {
                adminScreen.classList.remove('active')
            }
        })
    })
})

const closeScreens = document.querySelectorAll('.back')

closeScreens.forEach(screenbtn => {
    screenbtn.addEventListener('click', () => {
        closeAdminScreens();
    })
})

function closeAdminScreens() {
    adminScreens.forEach(screen => {
        screen.classList.remove('active')
    })
}

const closeStore = document.getElementById('closeStore')

const openStore = document.getElementById('openStore')

const setMessage = document.getElementById('setStoreMessage')

closeStore.addEventListener('click', () => {
    setStoreState(`Shop Closed`);

})


openStore.addEventListener('click', () => {
    setStoreState(`Shop Open`);
})

setMessage.addEventListener('click', () => {
    let text = document.getElementById('promoText').value
    setStoreMessage(text);
})


const inputFields = document.querySelectorAll('.imageUrl')

inputFields.forEach(field => {
    field.addEventListener('change', function (event) {
        const fileInput = document.getElementById(`${field.id}`);
        fileInput.parentElement.lastElementChild.innerHTML =
            `<div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>`
        setTimeout(() => {
            fileInput.parentElement.lastElementChild.innerHTML = `Attached`
        }, 1500)
    });
})


async function setStoreState(state) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accountState: state,
            storeId: document.getElementById('storeId').value,

        })
    }
    const res = await fetch('/admin/setSupplierState', options);
    const data = await res.json()
    showNoti(data.response)
}


async function setStoreMessage(text) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            promoText: text,
            storeId: document.getElementById('storeId').value
        })
    }
    const res = await fetch('/admin/setSupplierMessage', options);
    const data = await res.json()
    showNoti(data.response)
}


function exitModals() {
    amodals.forEach(modal => {
        modal.classList.remove('active')
    })
    aoverLay.classList.remove('active')
}


const notiModal = document.querySelector('.modal#notiModal')

function showNoti(Text) {
    exitModals();
    notiModal.classList.add('active');
    aoverLay.classList.add('active')
    notiModal.firstElementChild.nextElementSibling.innerText = `${Text}`

}



const exitButtons = document.querySelectorAll('.closeButton')
//close modal buttons
exitButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.classList.remove('active')
        aoverLay.classList.remove('active')

    })
})


const productName = document.getElementById('productName')
const productPrice = document.getElementById('productPrice')
const productTags = document.getElementById('productTags')
const productInfo = document.getElementById('productInfo')
const productClass = document.getElementById('productClass')

document.getElementById('productForm').addEventListener('submit', (e) => {
    if (productName.value == `` || productPrice.value == `` || pTags.value == `` || productInfo.value == `` || productClass.value == ``) {
        e.preventDefault()
        document.getElementById('errorField').innerText = 'Please Fill In Required Fields'
        checkFields();

    } else {
        checkFields()
        document.getElementById('errorField').innerText = ``
    }
})

function checkFields() {
    if (productName.value == ``) {
        productName.style.border = `1px solid red`
    } else {
        productName.style.border = `1px solid lime`
    }
    if (productPrice.value == ``) {
        productPrice.style.border = `1px solid red`
    } else {
        productPrice.style.border = `1px solid lime`
    }
    if (pTags.value == ``) {
        pTags.style.border = `1px solid red`
    } else {
        pTags.style.border = `1px solid lime`
    }
    if (productInfo.value == ``) {
        productInfo.style.border = `1px solid red`
    } else {
        productInfo.style.border = `1px solid lime`
    }
    if (productClass.value == ``) {
        productClass.style.border = `1px solid red`
    } else {
        productClass.style.border = `1px solid lime`
    }


}


async function updateOrder(orderId, orderState) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, orderState })
    }
    const res = await fetch('/updateOrder', options);
    const data = await res.json()
    console.log(data)
}

cancelButtons = document.querySelectorAll('span .cancelButton')
deleteButtons = document.querySelectorAll('span .deleteButton')
processButtons = document.querySelectorAll('span .processButton')
let eraseButtons = document.querySelectorAll('span .eraseButton')
let pendingButtons = document.querySelectorAll('span .pendingButton')

cancelButtons.forEach(cancelButton => {
    cancelButton.addEventListener('click', () => {
        cancelButton.innerHTML = `
          
        loading...
        
        `
        console.log(cancelButton.parentElement.id)
        updateOrder(cancelButton.id, "Cancelled").then((done) => {
            cancelButton.innerHTML = 'Done' 
        })
    })
})

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
        deleteButton.innerHTML = `
            
        loading...
            `
        updateOrder(deleteButton.id,"Deleted").then((done) => {
            deleteButton.innerHTML = 'Done'
            setTimeout(() => {
                deleteButton.parentElement.parentElement.remove()
            }, 1500)
        })
        
    })
})

processButtons.forEach(processButton => {
    processButton.addEventListener('click', () => {
        processButton.innerHTML = `
            
        loading...
            
    `
        updateOrder(processButton.id, "Processed").then((done)=>{
            processButton.innerHTML = 'Done'
        })
    })
})

pendingButtons.forEach(pendingButton => {
    pendingButton.addEventListener('click', () => {
        pendingButton.innerHTML = `
            
        loading...
            
    `
        updateOrder(pendingButton.id, "Pending").then((done)=>{
            pendingButton.innerHTML = 'Done'
        })
    })
})

selectStoreButtons.forEach(selectStoreButton => {

    selectStoreButton.addEventListener('click', () => {
        selectStoreButtons.forEach(selectStoreButton => {
            selectStoreButton.classList.remove('selected')
        })
        
       selectStoreButton.classList.add('selected')
        document.getElementById('storeId').value = selectStoreButton.id;

    })
})

eraseButtons.forEach(eraseButton => {
    eraseButton.addEventListener('click', () => {
        eraseButton.innerHTML = `
         
                loading...
            
    `
        updateOrder(eraseButton.id, "Erase").then((done)=>{
            eraseButton.innerHTML = 'Done'
        })
    })
})


setTimeout(() => {
    document.getElementById('onSubmitResponse').classList.add('hideRes')
}, 4500)