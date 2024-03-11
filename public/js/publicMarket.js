
console.log('sds')
const productContainers = document.querySelectorAll('.mainSection')
let SnackStorePublic
let publicUser
searchButton.addEventListener('click', () => {
    // let searchStr:any = searchButton.parentElement.previousElementSibling.value
    // console.log(searchStr)
    // snackstore.search( searchStr)
    let searchStr = searchField.value

    console.log(searchStr)
})



saveTip.addEventListener('click', () => {
    let tip = document.getElementById('tipFee').value
    saveTip.innerText = 'Saved'
    console.log('you tipped $' + tip)
    setTimeout(() => {
        saveTip.innerText = 'Save Tip'
        closeModals();
    }, 1000);
})


const searchTagOptions = document.querySelectorAll('.searchOptions .tagOption')
let currentSearchArray = []
searchTagOptions.forEach(searchOption => {
    searchOption.addEventListener('click', () => {
        searchOption.classList.toggle('active')
        // currentSearchArray.push(searchOption.id)
        const currentStr = searchField.value + `${searchOption.id} `
        if (searchField.value !== '' && searchField.value.search(searchOption.id) == -1) {
            searchField.value = currentStr
        }
        else if (searchField.value == '') {
            searchField.value = searchOption.id + ' '
        } else if (searchField.value.search(searchOption.id) != -1) {
            let cus = searchField.value.replace(`${searchOption.id} `, '')
            searchField.value = cus
        }
    })
})


menuButton.addEventListener('click', () => {
    menuList.classList.toggle('active');
});
//07617911018


class PublicStore {
    constructor() {
        this.marketProducts = []
    }
    async loadStore() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch('/fetchPublic', options);
        const data = await res.json()
        this.marketProducts = data
        this.showProducts(this.marketProducts)
    }

    getItem(itemId){
        let foundItem;
        let searchVal = itemId
       // console.log(searchVal)
        this.marketProducts.forEach(post => {
                if (post.itemId == searchVal) {
                    foundItem = post;
                  console.log(foundItem)
                }
            })
            
            return foundItem;
        }

    showProducts(productList) {
        productContainers.forEach(productContainer => {
            if (productContainer.id == 'bakedMeaty') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('chicken') && product.tags.match('baked') || product.tags.match('beef') && product.tags.match('baked')) {
                     
                        printToContainer(productContainer.id, product)
                    }
                })
            }
            if (productContainer.id == 'fruits') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('fruit') || product.tags.match('vegan')) {
                     
                        printToContainer(productContainer.id, product)
                    }
                })
            }
            if (productContainer.id == 'snacks') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('snack') || product.tags.match('biscuit') || product.tags.match('snack') && product.tags.match('chocolate')) {
                     
                        printToContainer(productContainer.id, product)
                    }
                })
            }
            if (productContainer.id == 'fries') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('fried')) {
                     
                        printToContainer(productContainer.id, product)
                    }
                })
            }
            if (productContainer.id == 'bakedSweet') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('baked') && product.tags.match('baked') || product.tags.match('muffin') || product.tags.match('biscuit')) {
                     
                        printToContainer(productContainer.id, product)
                    }
                })
            }
            if (productContainer.id == 'sandwiches') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('sandwich')) {
                       
                        printToContainer(productContainer.id, product)
                    }
                })
            }
            if (productContainer.id == 'drinks') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('drink')) {
                     
                        printToContainer(productContainer.id, product)
                    }
                })
            }
            if (productContainer.id == 'meatPieces') {
                console.log(productContainer.id)
                productList.forEach(product => {
                    if (product.tags.match('meat') && product.tags.match('chicken') || product.tags.match('meat') && product.tags.match('beef')) {
                     
                        printToContainer(productContainer.id, product)
                    }
                })
            }
        })
        resetAdd()
        resetInfoButtons()
    }

    tagSearch(tags){
        const tagsArray = tags.split(' ');
        document.getElementById('popularToday').innerHTML = ''
        this.marketProducts.forEach(product=>{
            tagsArray.forEach(tag=>{
                if (product.tags.match(tag) && tag != '') {
                    printToContainer('popularToday', product)
                }
            })
        })
        resetAdd()
        resetInfoButtons()
        resButtons()
    }
}

function printToContainer(id, data) {
    const element = document.createElement('div')
        element.classList.add('itemContainer')
        element.innerHTML = `
        <div class="mainSectionItem">
        <span>
            <div class="rating">
                <div>&#9733;&#9733;&#9733;</div>
                <div>&#9734;&#9734;</div>
            </div>
            <div class="infoIcon" id="${data.itemId}">i</div>
        </span>
        <div class="itemImage">
            <img src="${data.imageUrls[0]}" id="${data.itemId}" alt="🤕unavailable">
        </div>
        <div class="itemText">${data.itemName}</div>
        <div class="priceSection">
            <div class="itemPrice">k${parseFloat(data.itemPrice).toFixed(2)}</div>
            <div class="cartButton">
                <object data="/css/svg/cartIconinactive.svg" type="image/svg+xml"></object>
                <div class="buyButton inactive" id="${data.itemId}"></div>
            </div>
        </div>
    </div>
                        `
    document.getElementById(id).appendChild(element)
}


initialize()
function initialize() {
    SnackStorePublic = new PublicStore()
    SnackStorePublic.loadStore()
    currentContentText.innerText = `filter "Popular Today"`
    SnackStorePublic.tagSearch('sandwich muffin')
    publicUser = new User()

    let userId = localStorage.getItem('userId')
    if (userId == null) {
        userId = 'new'
    }

    console.log(userId)
    publicUser.loadCart();
    publicUser.loadProfile(userId);

}
searchButton.addEventListener('click',()=>{
    const searchList = document.getElementById('searchTab').value
    console.log(searchList)
    SnackStorePublic.tagSearch(searchList)
    currentContentText.innerText = `search list "${searchList}"`
})



categoryOption.forEach(option => {
    option.addEventListener('click', () => {
        currentContentText.innerText = `filter "${option.id}"`
        console.log(option.id)
        SnackStorePublic.tagSearch(option.id)
    })
})

function resButtons() {
    console.log('different')
    minusButtons = null
    plusButtons = null
    minusButtons = document.querySelectorAll('.minus')
    plusButtons = document.querySelectorAll('.plus')

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            publicUser.incrementQty(button.parentElement.id)
        })
    })
    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            publicUser.decrementQty(button.parentElement.id)
            console.log(publicUser.customOrder)  
        })
    })

}


function resetAdd() {
    buyButtons = document.querySelectorAll('.buyButton')
    buyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            console.log(button.id)
            let item = SnackStorePublic.getItem(button.id)
            console.log(item)
            if (button.classList.contains('active')) {
                publicUser.removeItem(item.itemId)
                 console.log('rmoving' + item.itemId)
            } else {
                 console.log('ading' + item)
              publicUser.addItem(item)
            }
            button.classList.toggle('active');
        })
    })
}

function createCartItems(items) {
    console.log(items)
    items.forEach(item => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cartItem')
        cartItem.innerHTML =
            `
            <div>
                <div class="imageContainer">
                ${item.imageUrls == undefined ? '00' : 's'}
                </div>
                <div class="ItemData">
                <h3>${item.itemName}</h3>
                <h4>k${parseFloat(item.itemPrice).toFixed(2)}</h4>
                </div>
                <div class="itemCount">
                x${item.quantity == undefined ? '0' : item.quantity}
                </div>
                <div class="qtyControl" id="${item.itemId}">
                <div class="minus">-</div>
                |
                <div class="plus">+</div>
                </div>
            </div>
        `
        cartList.append(cartItem)
        // console.log(cartItem)
    })
    resButtons()
}

async function resetInfoButtons() {
    infoButtons = document.querySelectorAll('.infoIcon')
    infoButtons.forEach(button => {
        button.addEventListener('click',async () => {
           // console.log(SnackStorePublic.getItem(button.id).sellerId)
           overLay.classList.add('active')
           openLoaderModal()
            const sellerData = await fetchSellerData(SnackStorePublic.getItem(button.id).sellerId)
            closeLoaderModal()
            //console.log(sellerData)
            const infoModal = document.getElementById('info');
            infoModal.classList.add('active');
            infoModal.lastElementChild.firstElementChild.innerHTML = `
            ${SnackStorePublic.getItem(button.id).itemInfo}
            `;
            infoModal.lastElementChild.lastElementChild.innerHTML = `
            <div class="spinnerContainer">
                <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
            </div>
            `
            setTimeout(() => {
                
                infoModal.lastElementChild.lastElementChild.innerHTML = `
            <h3>${sellerData.sellerName}</h3>
           <h3>location: ${sellerData.sellerLocation}</h3>
            <h3>phone: ${sellerData.sellerNumber}</h3>
            `},2500)
            overLay.classList.add('active');
        })
    })

    document.querySelectorAll('.mainSectionItem img').forEach(image => {
        image.addEventListener('click', () => {
            x = 0;
            currentProduct = SnackStorePublic.getItem(image.id)
            console.log(image.id);
            imageModal.classList.add('active');
            overLay.classList.add('active');
            imageModal.firstElementChild.firstElementChild.src = `${currentProduct.imageUrls[x]}`
            console.log(currentProduct);
        })
    })
}

async function fetchSellerData(sellerId){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const res = await fetch(`/fetchSellerData/${sellerId}`, options);
    const data = await res.json()
   // console.log(data);
    return data
}

function openLoaderModal(){
    document.getElementById(`loaderModal`).classList.add('active')
}

function closeLoaderModal(){
    document.getElementById(`loaderModal`).classList.remove('active')
}