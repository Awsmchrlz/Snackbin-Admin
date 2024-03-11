



class Seller {
    constructor() {

    }
    async loadProfile(id) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }
        const res = await fetch('/getSellerProfile', options);
        const data = await res.json()
        if (data) {
            console.log(data);
        } else {
            setTimeout(() => {
                document.querySelector('#setupSeller').classList.add('active')
                overLay.classList.add('active')
            }, 1500)
        }
    }
}

let sellerr;
async function init() {

    sellerr = new Seller;
    let userId = localStorage.getItem('userId')
    if (userId == null) {
        // userId = 'new'
        window.location.href = '../';

    } else {
        sellerr.loadProfile(userId)
        document.getElementById('sellerId').value = userId


    }
    console.log(userId)
}
init()

const createSeller = document.querySelector('#createSeller')

createSeller.addEventListener('click', async () => {
    const sellerName = document.querySelector('#sellerName').value
    const sellerNumber = document.querySelector('#sellerNumber').value
    const sellerLocation = document.querySelector('#sellerLocation').value
    const sellerId = localStorage.getItem('userId')
    console.log('fd')
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sellerId, sellerName, sellerNumber, sellerLocation })
    }
    const res = await fetch('/createSeller', options);
    const data = await res.json()
    console.log(data.response)
    if (data.response) {
        console.log(data);
        showSuccess(data.response)
        setTimeout(() => {
            document.querySelector('#setupSeller').classList.remove('active')
            overLay.classList.remove('active')
        }, 1500)
    } else {
        showError(data.error)

    }
})


setTimeout(() => {
    document.getElementById('onSubmitResponse').classList.add('hideRes')
}, 4000)



const inputFields = document.querySelectorAll('.imageUrl')

inputFields.forEach(field => {
    field.addEventListener('change', function (event) {
        const fileInput = document.getElementById(`${field.id}`);
        fileInput.parentElement.lastElementChild.innerHTML = 
                `<div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>`
        setTimeout(()=>{
            fileInput.parentElement.lastElementChild.innerHTML = `Attached`
        },1500)
    });
})

const itemName = document.getElementById('itemName')
const itemPrice = document.getElementById('itemPrice')
const pTags = document.getElementById('postTags')
const itemInfo = document.getElementById('itemInfo')

document.getElementById('productForm').addEventListener('submit', (e) => {
    if (itemName.value == `` || itemPrice.value == `` || pTags.value == `` || itemInfo.value == ``) {
        e.preventDefault()
        document.getElementById('errorField').innerText = 'Please Fill In Required Fields'
        checkFields();

    } else {
        checkFields()
        document.getElementById('errorField').innerText = ``
    }
})

function checkFields(){
    if (itemName.value == ``) {
        itemName.style.border = `1px solid red`
    } else {
        itemName.style.border = `1px solid lime`
    }
    if (itemPrice.value == ``) {
        itemPrice.style.border = `1px solid red`
    } else {
        itemPrice.style.border = `1px solid lime`
    }
    if (pTags.value == ``) {
        pTags.style.border = `1px solid red`
    } else {
        pTags.style.border = `1px solid lime`
    }
    if (itemInfo.value == ``) {
        itemInfo.style.border = `1px solid red`
    } else {
        itemInfo.style.border = `1px solid lime`
    }
}

// How could I explain the entire fabric of my existence
// The sonder and crisis,
// the love and loss,

// we are so connected in this digital modern age yet so painfully alone,

// so we parade ourselves in this veneer of self congratulation,

// Where is humanity headed are we on course with our own self destruction,

// I swallow the self preseverving fallacious doctrine that I am a decent person,
// But I am simply a lizard brain beast with a frontal cortex,

// And while I could let someone glance inside for a SVGAnimateMotionElement, no will truly know me,

// and I will never know them

