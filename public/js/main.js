

console.log(Date.now())
setTimeout(() => {
    
    console.log(Date.now())
}, 100)

const mainSectionList = document.querySelector('.mainSection')
console.log(`x is ${x + 1}`);

const promosScrollSection = document.querySelector('.promosContainer');

const promoItems = document.querySelectorAll('.promoItem');
const currPromo = document.querySelectorAll('.cp');

const customOptionsContainer = document.querySelector('.customOptions')
const profileScreens = document.querySelectorAll('.profileScreen')
const sendOrder = document.querySelector('#confirmPayment')
const addCustomToCart = document.querySelector('#addCustomToCart')

menuButton.addEventListener('click', () => {
    menuList.classList.toggle('active');
});


let snackstore
class Snackbin {
    constructor() {
        this.Stock = [];

    }
   

    printProducts() {
        // console.log(this.Stock[0].products)
        printMainSection(this.Stock)
    }
   
    tagSearch(itemTags) {
        let foundList = [];
        let searchVal = itemTags.toLowerCase().split(' ') ;

        this.Stock.forEach(product => {
            console.log('product')
            console.log(product)
            
                product.productTags.split(' ').forEach(tag => {
                    console.log('product')
            console.log(product)
                    if (tag.toLowerCase() == searchVal) {
                        foundList.push(product)
                    }
                })
            
        })

        if (foundList.length != 0) {          
               printMainSection(foundList)
         
        } else {
            mainSectionList.innerText = '"Sorry got nothing"'
        }
        
        currentContentText.innerText = `filter "${itemTags.toLocaleLowerCase().replaceAll(',', ', ')}"`
      
    }

    getItem(itemId) {
        let foundItem;

        let searchVal = itemId
        this.Stock.forEach(product => {
            
                if (product._id == searchVal) {
                    foundItem = product;
                }

            
        })
        return foundItem;
    }

    classSearch(itemClass) {
        let foundList = [];
        console.log(itemClass)
        let searchVal = itemClass.toLowerCase()
            this.Stock.forEach(product => {
                if (product.productClass.toLocaleLowerCase() == searchVal) {
                    console.log(product)
                        foundList.push(product)
                
                }
            })
        


        currentContentText.innerText = `filter "${itemClass}"`
                                                                                   
        if (foundList.length != 0) {
            printMainSection(foundList)

        } else {
            mainSectionList.innerText = '"Sorry got nothing"'
        }
    }

    //dont duplicate when product added
    filterSearch(params) {
        let foundList = [];
        params.forEach(param => {
            this.Stock.forEach(product => {
                let searchVal = param.toLowerCase()
                
                    
                    product.productTags.split(' ').forEach(tag => {
                        console.log(searchVal)
                        console.log(tag)
                        if (tag.toLowerCase().replace(' ', '') == searchVal) {
                            foundList.push(product)
                        }
                    })
            
            })
        })
            if (foundList.length != 0) {
                printMainSection(foundList)

            } else {
                mainSectionList.innerText = '"Sorry got nothing"'
            }
    }

    loadCustoms() {
        let custList = []
        this.Stock.forEach(batch => {
            if (batch.batchClass == 'custom') {
                batch.products.forEach(prod => {
                    custList.push(prod)
                })
            }
        })
        createCustomsList(custList);
    }

    async loadStore() {
        const batches = await loadStock();
        console.log(batches)
        batches.forEach((batch) => {
            this.Stock.push(batch)
        })
        this.classSearch('meal')
    }

    async loadStoreProfile(storeId) {

        const storeData = await loadStoreData(storeId);
        fillStoreData(storeData);
    }


}



const userOrders = document.querySelector('#orders .orderContainer')

const userNotifications = document.querySelector('#notifications.notifications')

let exit = document.getElementById('exit')



function genList(cart) {
    let str = ''
    cart.forEach(item => {
        str = `${str} x${item.quantity}${item.productName} `
    })
    return str
}

//class test area

// const batchList: Batch[] = [];
// batchList.push(batch1)
// batchList.push(batch2)
// batchList.push(batch3)

let userr;
let storeId;
async function start() {
    snackstore = new Snackbin()
    userr = new User;
    await snackstore.loadStore()
    storeId = localStorage.getItem('lastStoreId')
    let userId = localStorage.getItem('userId')
    if (userId == null) {
        userId = 'new'

    }
    if (storeId == null){
        document.querySelector('.modal#whatAbout').classList.add('active')
        overLay.classList.add('active')
    } else {
        snackstore.loadStoreProfile(storeId)
    }
    userr.loadCart();
    userr.loadProfile(userId);
}

document.getElementById('closeStart').addEventListener('click',()=>{
    document.querySelector('.modal#whatAbout').classList.remove('active')
    document.querySelector('.modal#setStoreModal').classList.add('active')
})

start()

profileButtons.forEach(profileButton => {
    profileButton.addEventListener('click', (e) => {
        // profileScreens.forEach(profileScreen => {
        //    console.log(profileScreen)
        // });
        profileScreens.forEach(profileScreen => {
            if (profileScreen.id == profileButton.id) {
                profileScreen.classList.add('active');
            } else {
                profileScreen.classList.remove('active');
            }
        });
    })
})






//store definition




//event listener for qty plus and minus

let custMin
let custPlus

const customPan = document.querySelector('.customPan')

function resButtons() {
    minusButtons = null
    plusButtons = null
    custPlus = null
    custMin = null
    custPlus = document.querySelectorAll('.add')
    custMin = document.querySelectorAll('.remove')
    minusButtons = document.querySelectorAll('.minus')
    plusButtons = document.querySelectorAll('.plus')
    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            userr.incrementQty(button.parentElement.id)
        })
    })

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            userr.decrementQty(button.parentElement.id)
            console.log(userr.customOrder)

        })
    })

    custPlus.forEach(button => {
        button.addEventListener('click', () => {

            userr.appendCustomOrder(button.parentElement.id)
            button.parentElement.previousElementSibling.innerHTML = `x${userr.countInCart(button.parentElement.id)}`
            console.log(userr.customOrder)
            customPan.innerHTML = userr.customOrder.toString()
        })

    })

    custMin.forEach(button => {
        button.addEventListener('click', () => {

            userr.customOrder.forEach((item, index) => {
                if (item === button.parentElement.id) {
                    userr.customOrder.splice(index, 1)
                }
            });

            button.parentElement.previousElementSibling.innerHTML = `x${userr.countInCart(button.parentElement.id)}`
            customPan.innerHTML = userr.customOrder.toString()
            console.log(userr.customOrder)

        })
    })
}



//


//function to append cart items to cart list


//function to append custom staff

function createCustomsList(items) {
    customOptionsContainer.innerHTML = ''
    items.forEach((item) => {
        const custItem = document.createElement('div')
        custItem.classList.add('customOption')
        custItem.innerHTML =
            `
           <div>
                <div class="imageContainer ${item._id}">
                </div>
                <div class="ItemData">
                <h3>${item.itemName}</h3>
                <h4>k${parseFloat(`${item.itemPrice}`).toFixed(2)}</h4>
                </div>
                <div>
                x0
                </div>
                <div class="qtyControl" id="${item._id}">
                    <div class="remove">-</div>
                    |
                <div class="add">+</div>
                </div>
            </div>
        `
        customOptionsContainer.append(custItem)
        // console.log(cartItem)
    })
    resButtons()
}


//appending to main section

function printMainSection(items) {
    mainSectionList.innerHTML = `
              <div class="spinnerContainer">
                <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🍗</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🥤</div>
                </div>
                 <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🍗</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🥤</div>
                </div>
                 <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🍗</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🥤</div>
                </div>
                 <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🍗</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🥤</div>
                </div>
                <div class="spinner">
                    <div class="spinnerSection">🥪</div>
                </div>
                
            </div>
            `
            let itemsGenerated = [];

    setTimeout(() => {
        mainSectionList.innerHTML = ''
        items.forEach(product=> {
            const mainSectionItem = document.createElement('div')
            mainSectionItem.classList.add('itemContainer')
            let state = 'inactive'
            userr.Cart.forEach((cItem) => {
                if (cItem._id == product._id) {
                    state = 'active'
                }
            })
            mainSectionItem.innerHTML =
                `
           <div class="mainSectionItem">
            <span>
            <div class="rating">  
            </div>
                <div class="infoIcon" id="${product._id}">i</div>
            </span>
            <div class="itemImage">
                    <img src="${product.mainImage}" id="${product._id}" alt="🤕unavailable">
            </div>
            <div class="itemText">${product.productName}</div>
            <div class="priceSection">
                <div class="itemPrice">k${parseFloat(product.productPrice).toFixed(2)}</div>
                <div class="cartButton">
                    <object data="/css/svg/cartIcon${state}.svg" type="image/svg+xml"></object>
                    <div class="buyButton ${state}" id="${product._id}">
                    </div>
                </div>
            </div>
        </div>
        `
            itemsGenerated.push(mainSectionItem)
        })
        itemsGenerated.forEach(item=>{
            mainSectionList.append(item)
            console.log(item)
        })
        resetBuys();
        resetInfoButtons()
    }, 1000)
   
}

//switching screens

//event listener for search  button

searchButton.addEventListener('click', () => {
    // let searchStr:any = searchButton.parentElement.previousElementSibling.value
    // console.log(searchStr)
    // snackstore.search( searchStr)
    let searchStr = searchField.value

    let searchArr = searchStr.split(' ')
    snackstore.filterSearch(searchArr)
})

//getting data server side



async function loadStock() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetch('/fetchStock', options);
    const data = await res.json()
    console.log(data)
    return data;
}

async function loadStoreData(storeId) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetch(`/getStoreData/${storeId}`, options);
    const data = await res.json()
    console.log(data)
    return data;
}


//category option event listeners
categoryOption.forEach(option => {
    option.addEventListener('click', () => {
        let id = option.id
        snackstore.classSearch(id)
    })
})




function resetBuys() {
    buyButtons = document.querySelectorAll('.buyButton')
    buyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            let item = snackstore.getItem(button.id)
            console.log(button.id)
            if (button.classList.contains('active')) {
                userr.removeItem(item._id)
                // console.log('rmoving' + item.itemId)
            } else {
                // console.log('ading' + item.itemId)
                userr.addItem(item)
            }
            userr.loadCart()
            snackstore.classSearch(item.productClass)
            button.classList.toggle('active');
        })
    })
}







//this function gets id's from the buttons clicked, uses  them to generate a string which is 
// used to perform a search


categoryOptions.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
            filterSearchArray.forEach((item, index) => {
                if (item == button.id) {
                    filterSearchArray.splice(index, 1)
                }
            })
        }
        else {
            filterSearchArray.push(`${button.id}`)
        }
        button.classList.toggle('active')

        console.log(filterSearchArray)
    })
});



const filterSearch = document.getElementById('filterSearch')
filterSearch.addEventListener('click', () => {
    snackstore.filterSearch(filterSearchArray)
    currentContentText.innerText = `filter "${filterSearchArray.toString().replaceAll(',', ', ')}"`
    closeModals()
})

//when this even listener fires we generate a proper order for the client and send the object generated.

sendOrder.addEventListener('click', () => {
    userr.generateOrder();
})

clearCart.addEventListener('click', () => {
    userr.dropCart()
    userr.loadCart()
})

//this function is used to reset the info buttons when they appended to the dom

function resetInfoButtons() {
    infoButtons = document.querySelectorAll('.infoIcon')
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const infoModal = document.getElementById('info');
            infoModal.classList.add('active');
            infoModal.lastElementChild.innerHTML = `${snackstore.getItem(button.id).productInfo}`;
            overLay.classList.add('active')
        })
    })

    document.querySelectorAll('.mainSectionItem img').forEach(image => {
        image.addEventListener('click', () => {
            x = 0;
            currentProduct = snackstore.getItem(image.id);
            console.log(currentProduct)
            imageModal.classList.add('active');
            overLay.classList.add('active');
            imageModal.firstElementChild.nextElementSibling.firstElementChild.src = `${currentProduct.imageUrls[x]}`
            console.log(currentProduct);
        })
    })
}

addCustomToCart.addEventListener('click', () => {
    if (userr.customOrder.length > 0) {
        userr.generateCustomOrder()
        customPan.innerText = 'Item Added To Cart✅✅✅'
        snackstore.loadCustoms()
    } else {
        customPan.innerText = 'Click `+` to add items'
    }

})

const saveOrderNotes = document.getElementById('saveOrderNotes')
saveOrderNotes.addEventListener('click', () => {
    let notes = document.getElementById('notes').value
    userr.setOrderNotes(notes);
    saveOrderNotes.innerText = 'Saved'
    setTimeout(() => {
        closeModals();
        saveOrderNotes.innerText = 'Save Notes'
    }, 900);

})

const sendMessage = document.getElementById('sendMessage')

sendMessage.addEventListener('click', () => {
    let message = document.getElementById('messageBody').value
    sendMessage.innerText = 'Sent'

    setTimeout(() => {
        document.getElementById('messageBody').value = ''
        sendMessage.innerText = 'Send Message'
    }, 1300);
})

// const logOut = document.getElementById('exit')
// logOut.addEventListener('click', () => {
//     userr.logOut()
// })

saveTip.addEventListener('click', () => {
    let tip = document.getElementById('tipFee').value
    userr.saveTip(tip)
    userr.loadCart()
    document.querySelector('#tip .qty').innerText = `k${parseFloat(userr.tip).toFixed(2)}`
    saveTip.innerText = 'Saved'
    setTimeout(() => {
        saveTip.innerText = 'Save Tip'
        closeModals();
    }, 1000);
})



const signIn = document.getElementById('signIn')

const createAccount = document.getElementById('createAccount')

signIn.addEventListener('click', () => {
    signIn.innerHTML = `
    <div class="spinnerContainer">
                <div class="spinner">
                    <div class="spinnerSection">🍭</div>
                </div>
            </div>
    `
    login().then(()=>{
        signIn.innerHTML = 'Log In'
    })
})


createAccount.addEventListener('click', () => {
    createAccount.innerHTML = `
    <div class="spinnerContainer">
                <div class="spinner">
                    <div class="spinnerSection">🍭</div>
                </div>
            </div>
    `
    signUp().then(() => {
        createAccount.innerHTML = 'Sign Up'
    })
})


async function login() {
    let num = document.getElementById('lnumber').value
    let pw = document.getElementById('lpassword').value
    if (num == '' || pw == '') {
        showError('Fill In all Fields')
    } else {

        let lData = { userNumber: num, userPassword: pw }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lData)
        }
        const res = await fetch('/auth/login', options);
        const data = await res.json()
        localStorage.setItem('userId', data._id)
        if (data.err) {
            showError(data.err)
        } else {
            userr.loadProfile(data._id);
            closeModals();
        }
        console.log(data);
    }

}

async function signUp() {
    let name = document.getElementById('sname').value
    let num = document.getElementById('snumber').value
    let address = document.getElementById('saddress').value
    let pw = document.getElementById('spassword').value
 
    if (num == '' || pw == '' || address == '' || name == '') {
        showError('Fill In all Fields')
    } else {

        let sData = { userName: name, userNumber: num, userAddress: address, userPassword: pw }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sData)

        }
        const res = await fetch('/auth/signUp', options);
        const data = await res.json();

        if (data.err) {
            showError(data.err)
            console.log(data.err)
        }
        else {
           
            console.log(data)
            localStorage.setItem('userId', data.result._id)
                showSuccess(`${data.response}`);
                userr.loadProfile(data.result._id)
            
            setTimeout(() => {
                closeModals()
            }, 1500);
        }

    }
}

//this function resets the event listeners for the 
//cancel and delete buttons on the orders
let cancelButtons
let deleteButtons
let pendingButtons
function resetOrdersButtons() {

    cancelButtons = document.querySelectorAll('span .cancelButton')
    deleteButtons = document.querySelectorAll('span .deleteButton')
    pendingButtons = document.querySelectorAll('span .pendingButton')
    cancelButtons.forEach(cancelButton => {
        cancelButton.addEventListener('click', () => {
            cancelButton.innerText = 'Cancelled'
            cancelButton.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.innerHTML = 'Cancelled'
            updateOrder(cancelButton.id, cancelButton.parentElement.id, cancelButton.previousElementSibling.id )
        })
    })

    pendingButtons.forEach(pendingButton => {
        pendingButton.addEventListener('click', () => {
            pendingButton.innerText = 'Now Pending'
            pendingButton.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.innerHTML = 'Pending'
            updateOrder(pendingButton.id, pendingButton.parentElement.id, "Pending")
        })
    })

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            updateOrder(deleteButton.id, deleteButton.parentElement.id, deleteButton.previousElementSibling.id)
            deleteButton.parentElement.parentElement.remove()
        })
    })
}

async function updateOrder(orderId, userId,orderState) {
    console.log(userId + 'and' + orderId)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, userId, orderState })

    }
    const res = await fetch('/updateOrder', options);
    const data = await res.json()
    console.log(data)
}



editButton.forEach(button => {
    button.addEventListener('click', () => {
        button.innerHTML = `
              <div class="spinnerContainer">
                <div class="spinner">
                    <div class="spinnerSection">🍭</div>
                </div>
            </div>
            `
        userr.editProfile().then((done)=>{
            button.innerHTML = 'edit'
        })
        
    })
})




const notificationModal = document.querySelector('.modal#notiModal')

function showNotification(text) {
    closeModals();
    notificationModal.classList.add('active');
    overLay.classList.add('active')
    notificationModal.firstElementChild.nextElementSibling.innerText = `${text}`

}

document.getElementById('sendMessage').addEventListener('click', () => {
    userr.sendMessage()
})

function fillStoreData(storeData) {
    // document.getElementById('storeState').innerText = `${storeData.storeState}`
  
    // document.getElementById('storeText').innerText = `${storeData.storeText}`
}

const setStoreButton = document.querySelectorAll('.storeButton')



setStoreButton.forEach(button => {
    button.addEventListener('click', () => {
        localStorage.setItem('lastStoreId', button.id)
        snackstore.loadStoreProfile(button.id)
        showError('Saved as pickup store.')
        setTimeout(() => {
            document.querySelector('.modal#setStoreModal').classList.remove('active');
            if (document.querySelector('#paymentModal').classList.contains('active') == false){
             closeModals()
            }
            
        }, 1700);
    })
})


function createCartItems(items) {
    // console.log(items)
    items.forEach(product => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cartItem')
        cartItem.innerHTML =
            `
            <div>
                <div class="imageContainer">
                <img src="${product.imageUrls[0]}" alt="🤕unavailable">
                </div>
                <div class="ItemData">
                <h3>${product.productName}</h3>
                <h4>k${parseFloat(product.productPrice).toFixed(2)}</h4>
                </div>
                <div class="itemCount">
                x${product.quantity == undefined ? '0' : product.quantity}
                </div>
                <div class="qtyControl" id="${product._id}">
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








// const deliveryPeople = document.querySelectorAll('.modal .deliveryPerson')
// deliveryPeople.forEach(deliveryPerson=>{
  
    
//     deliveryPerson.addEventListener('click',()=>{
//         document.querySelectorAll('.deliveryPerson').forEach(deliveryPersonInner=>{
//             deliveryPersonInner.classList.remove('selected')
//         })
//         userr.setDelivery({deliveryPersonId:deliveryPerson.id, deliveryCharge:deliveryPerson.getAttribute("data-deliveryCharge")});
//         document.getElementById('deliveryWord').innerHTML = `Selected <span class="redText">${deliveryPerson.getAttribute("data-userName")}</span> as your delivery person.`
    
//        deliveryPerson.classList.add('selected')
      
//         })
// })


document.getElementById('getRecommendationBtn')
.addEventListener('click',async ()=>{
    console.log(getSuggestionArray)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getSuggestionArray)
    }
    const res = await fetch('/recommendation/getMeal', options);
    const data = await res.json()
    console.log(data)
    data.forEach(dataItem=>{
        userr.addItem(dataItem)
    })
    closeModals()
    document.querySelector('.screen#cartButton').classList.add('active')

    return data;
})



// Define the coordinates of your university campus
const universityCoordinates = {
    latitude: -12.7991808, // Replace with the actual latitude of your campus
    longitude:28.2394624 // Replace with the actual longitude of your campus
};

// Function to check if the user is within the allowed range (e.g., university campus)
function isUserWithinAllowedRange(userCoordinates, allowedCoordinates, radiusInMeters) {
    const earthRadius = 6371000; // Earth's radius in meters
    const lat1 = userCoordinates.latitude * Math.PI / 180;
    const lat2 = allowedCoordinates.latitude * Math.PI / 180;
    const deltaLat = (allowedCoordinates.latitude - userCoordinates.latitude) * Math.PI / 180;
    const deltaLon = (allowedCoordinates.longitude - userCoordinates.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance <= radiusInMeters;
}

// Function to notify the user if they are outside the allowed range
function notifyUserIfOutsideRange() {
    navigator.geolocation.getCurrentPosition(position => {
        const userCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        if (!isUserWithinAllowedRange(userCoordinates, universityCoordinates, 500)) {
            showNotification('You are currently outside our delivery premises. Our deliverers may not be able to reach your location.');
        }
    }, error => {
        console.error('Error getting user location:', error);
    });
}

// Call the function to check the user's location and notify if outside the allowed range
notifyUserIfOutsideRange();
