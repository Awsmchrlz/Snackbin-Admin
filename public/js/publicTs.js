

let x = 0;
const menuButton = document.querySelector('#menuButton');
const menuList = document.getElementById('menuList');
const modalButtons = document.querySelectorAll('.modalButton')
const homeButtons = document.querySelectorAll('.homeButton')
//
const searchButton = (document.getElementById('searchButton'))
const searchField = document.getElementById('searchTab')
const categoryOption = document.querySelectorAll('.categoryList .categoryOption')
const screens = document.querySelectorAll('.screen');
const screenButtons = document.querySelectorAll('.screenbutton');
const backButtons = document.querySelectorAll('.backButton');
const mainCartQtyShow = document.querySelector('.screen #cartQty')
const totalCartCost = document.querySelector('.totalCost .qty')
const totalBillCost = document.querySelector('.orderBill .qty')
let minusButtons
let plusButtons
let buyButtons
let infoButtons
const currentContentText = document.querySelector('#currentContent')
const homeNotification = document.querySelector('div#homeNotification')
const qtyShow = document.querySelector('span#cartQty')

const deliveryText = document.querySelector('.deliveryCost .text')

const deliveryTCost = document.querySelector('.deliveryCost .qty')
const profileButtons = document.querySelectorAll('.profileOption')
const orderContainer = document.querySelector('.modal .orderContainer')
const orderTotal = document.querySelector('.modal .totalBill')
const cartList = document.querySelector('.cartList')
const clearCart = document.querySelector('#clearCart')
const generateRandomOrder = document.getElementById('generateRandom')
const saveTip = document.getElementById('saveTip')
const categoryOptions = document.querySelectorAll('#filterCategory .tagOption')
const editButton = document.querySelectorAll('.editBtn')

let filterSearchArray = []
let getSuggestionArray = []
let currentProduct = null
const imageModal = document.getElementById('imageModal');

generateRandomOrder.addEventListener('click', async() => {
    console.log(getSuggestionArray)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getSuggestionArray)
    }
    const res = await fetch('/recommendation/getRandomOrder', options);
    const data = await res.json()
    console.log(data)
    data.forEach(dataItem=>{
        userr.addItem(dataItem)
    })
    closeModals()
    document.querySelector('.screen#cartButton').classList.add('active')

})



class UserOrder {
  
    constructor({payMethod, userName,deliveryAddress,phoneNumber, Cart, delivery, orderNotes, tip, userId}) {
        this.payMethod = payMethod
        this.userName = userName
        this.phoneNumber = phoneNumber
        this.deliveryAddress = deliveryAddress
        this.Cart = Cart
        this.delivery = delivery
        // this.deliveryPersonId = deliveryPersonId
        this.orderNotes = orderNotes
        this.tip = tip
        this.userId = userId
    }
   
}


const closeButtons = document.querySelectorAll('.closeButton')
const modals = document.querySelectorAll('.modal')
const overLay = document.querySelector('.overLay');
const getSuggestionOptions = document.querySelectorAll('#getRecom .tagOption')

//close modal buttons
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.classList.remove('active')
        overLay.classList.remove('active')
        x = 0;
    })
})


overLay.addEventListener('click', () => {
    overLay.classList.remove('active')

    closeModals()
})

modalButtons.forEach(modalButton => {
    modalButton.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (modal.id == modalButton.id) {
                closeModals()
                modal.classList.add('active');
                overLay.classList.add('active');
            } else {
                // modal.classList.remove('active')
            }
        });
    })
})

screenButtons.forEach(screenButton => {

    screenButton.addEventListener('click', (e) => {
        console.log(screenButton)
        screens.forEach(screen => {

            if (screen.id == screenButton.id) {
                screen.classList.add('active');
console.log(screen)
            } else {
                screen.classList.remove('active')
            }
        })
        if (screenButton.id == "customize") {
            customPan.innerText = ''
            setTimeout(() => {
                snackstore.loadCustoms();
                userr.customOrder = []
            }, 1000);
        }
     
              
    });
})



homeButtons.forEach(button => {
    button.addEventListener('click', () => {
        screens.forEach(screen => {
            screen.classList.remove('active')
        })

    })
})

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('asa')
        screens.forEach(screen => {
            screen.classList.remove('active')
            if(snackstore){
                snackstore.classSearch(['sandwich'])
            }
            
        })
    })
})

getSuggestionOptions.forEach((button) => {
    button.addEventListener('click', () => {

        console.log(button.parentElement.id)
        console.log(button.id)
        if (button.classList.contains('active')) {
            getSuggestionArray.forEach((item, index) => {
                if (item == button.id) {
                    getSuggestionArray.splice(index, 1)
                }
            })
   button.parentElement.classList.add('active')
        }
        else {
            
            let theseChildren = document.querySelectorAll(`#${button.parentElement.id} div`)
            theseChildren.forEach(child => {
                child.classList.remove('active')
                getSuggestionArray.forEach((item, index) => {
                    if (item == child.id) {
                        getSuggestionArray.splice(index, 1)
                    }
                })
            })
            getSuggestionArray.forEach((item, index) => {
                if (item == button.id) {
                    getSuggestionArray.splice(index, 1)
                }
            })
            // button.classList.add('active')
            getSuggestionArray.push(`${button.id}`)
            // button.parentElement.classList.add('active')
        }
        button.classList.toggle('active')
        console.log(getSuggestionArray)
    })
});


//Functions 
function closeModals() {
    modals.forEach(modal => {
        modal.classList.remove('active')
    })
    overLay.classList.remove('active')
}


function createCartItems(items){
    console.log(items);
    items.forEach(item => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cartItem')
        cartItem.innerHTML =
            `<div>
                <div class="imageContainer">
                ${item.imageUrls==undefined?'00':'s'}
                </div>
                <div class="ItemData">
                <h3>${item.productName}</h3>
                <h4>k${parseFloat(item.productPrice).toFixed(2)}</h4>
                </div>
                <div class="itemCount">
                x${item.quantity==undefined?'0':item.quantity}
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
//user class definition
 


 class User {

constructor() {
    this.Cart = [];
    this.delivery = false
    this.customOrder = []
    this.orderNotes = ''
    this.pmeth = ''
    this.pnum = ''
    this.pname = ''
    this._id = ''
    this.pemail = ''
    this.visaData;
    this.tip = 0;
    this.Order
    this.deliveryPersonId = ''
    this.deliveryCharge = 0
}

setDelivery({ deliveryCharge}){
    // this.deliveryPersonId = deliveryPersonId
    this.deliveryCharge = deliveryCharge
}


setOrderNotes(orderNotes) {
    this.orderNotes = orderNotes
}

appendCustomOrder(item) {
    this.customOrder.push(item)

}
removeFromCustomOrder(item) {
    this.customOrder.forEach((custItem, index) => {
        if (item == custItem) {
            console.log()
            this.customOrder.splice(index, 1)
        }
    })
}

generateCustomOrder() {
    let customOrder = { itemName: 'custom order', itemPrice: 0, itemId: 'custom', itemDesc: 'custom order', quantity: 1, imageUrl: '🛠🥪' }

    let customStr = '('
    let uniqItems = [... new Set(this.customOrder)]
    if (this.customOrder.length == 0) {
        customStr = ''
    } else {
        uniqItems.forEach((item, index) => {
            if (index != (uniqItems.length - 1)) {
                //console.log(index)
                customStr += `x${this.countInCart(item)}${item} + `
            } else {
                customStr += `x${this.countInCart(item)}${item}`
            }
        })
    }
    customStr = customStr + ')'
    //console.log(customStr)
    customOrder.itemName = customStr
    customOrder.itemPrice = this.calcCustom(this.customOrder)
    customOrder._id = customStr
    customOrder.itemClass = 'customOrder'
    this.customOrder = []
    this.Cart.push(customOrder)
    this.loadCart()
}
//a function that returns the number of occurences of an item in the array  
countInCart(item) {
    let count = 0;
    this.customOrder.forEach(cartItem => {
        if (cartItem == item) {
            count++
        }
    })
    return count;
}


addItem(item) {
console.log(item)
    let foundFlag = false
    this.Cart.forEach(cartItem => {

        if (cartItem._id == item._id) {
            foundFlag = true
        }
    })
    if (!foundFlag) {
        item.quantity = 1
        this.Cart.push(item)
    }
    this.loadCart()

}
removeItem(itemId) {
    //console.log(itemId + 'is id')
    this.Cart.forEach((cartItem, index) => {
        if (cartItem._id == itemId) {
            //console.log(cartItem)
            this.Cart.splice(index, 1)
        }
    })
    this.loadCart()
}
loadCart() {
    // this.Cart.forEach(item => {
    // })
    cartList.innerHTML = ''
    createCartItems(this.Cart)
    //console.log(this.Cart)
    qtyShow.innerHTML = `${this.Cart.length}`
    mainCartQtyShow.innerHTML = `${this.Cart.length} Item${this.Cart.length>1||this.Cart.length==0?"s":''}`

    let cCost = this.calcCost(this.Cart)

        totalBillCost.innerHTML = `k${(cCost).toFixed(2)}`
        totalCartCost.innerHTML = `k${(cCost + 5).toFixed(2)}`
        deliveryTCost.innerHTML = `k5.00`
        deliveryText.innerHTML = `Delivery(-20m)🚚`
        
        if (this.tip>0) {
    //    console.log(this.tip)
        totalCartCost.innerHTML = `k${(cCost+5+parseInt(this.tip)).toFixed(2)}`
}
}
dropCart() {
    this.Cart = []
}

incrementQty(id) {

    let flag = false
    this.Cart.forEach(item => {

        if (item._id == id && !flag && item.quantity < 10) {
            flag = true
            item.quantity++
            console.log(item)
        }
    })

    this.loadCart()
}

decrementQty(id) {

    let flag = false
    this.Cart.forEach(item => {

        if (item._id == id && !flag) {
            flag = true
            item.quantity--
        }
        if (item.quantity == 0) {
            item.quantity = 1
            this.Cart.splice(this.Cart.indexOf(item), 1)
        }
    })
    this.loadCart()
}

calcCost(userCart) {
    let total = 0
    if (this.tip > 0) {
        total = parseFloat(this.tip, 10)
       // console.log(parseFloat(this.tip, 10))
    }
    this.Cart.forEach(item => {
        total = total + (item.productPrice * item.quantity)
    })

    if (this.delivery) {
        return (total + 5)
    } else {
        return total
    }
}
calcCustom(items) {
    let total = 0
    items.forEach(item => {
        let custItem = snackstore.getItem(item)
        //console.log(custItem)
        total += Number(`${custItem.productPrice}`)
    })
    //console.log('tsss' + total)
    return total
}
generateOrder() {
    // this.paymentData.visaData = getVisaData()
    // orderTotal.innerHTML = ` Total K${userr.calcCost.toFixed(2)}`
   
    if (this.Cart.length == 0) {
        showError('Your Cart Is Empty')
        return
    }

    

    if (document.getElementById('deliveryAddress').value == '') {
        showError('Enter your delivery location.')
        return
    }
    
    
   
    else if (this._id == '' || this._id == null || this._id == undefined) {
        showError('Quickly signUp first...')

        setTimeout(() => {
            closeModals()
            document.querySelector('.modal#signUp').classList.add('active')
            overLay.classList.add('active')
        }, 600);
        return
    }
    else {
        console
       
        this.Order = new UserOrder({payMethod:this.pmeth,
             userName:this.pname,
              phoneNumber:this.pnum,
            Cart:this.Cart,
            // delivery:this.delivery, 
            orderNotes:this.orderNotes, tip:this.tip , 
            // deliveryPersonId:this.deliveryPersonId, 
            userId:this._id,
            deliveryAddress:document.getElementById('deliveryAddress').value})
            
        // document.querySelectorAll('#paymentModal div')[1].innerHTML =
        //     `
        //       <div class="spinnerContainer">
        //         <div class="spinner">
        //             <div class="spinnerSection">🥪</div>
        //         </div>
        //         <div class="spinner">
        //             <div class="spinnerSection">🍗</div>
        //         </div>
        //         <div class="spinner">
        //             <div class="spinnerSection">🥤</div>
        //         </div>
        //     </div>
        //     `
        this.sendOrder()
        return
    }
}
listItems() {
    orderTotal.innerHTML = `Total&#x1F4B0; k${this.calcCost(this.Cart).toFixed(2)}`

    orderContainer.innerHTML = ''
    this.Cart.forEach(item => {
        let div = document.createElement('div')
        div.innerHTML = `            
           <p> ${item.itemName} x${item.quantity}</p>
            `
        orderContainer.append(div)
    })
    // 0956642053yami
    // 0964454838trf

}
    async sendOrder() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.Order)

    }
    
    const res = await fetch('/makeOrder', options);
    const data = await res.json()

    // document.querySelectorAll('#paymentModal div')[1].style.opacity = 1
  document.querySelector('.overLay').classList.add('active')
  document.getElementById('paymentModal').classList.remove('active');
  document.getElementById('confirmPaymentModal').classList.add('active')
  document.querySelector('#confirmPaymentModal .modalContent').innerHTML =
        `
        <br>
            ${data.response}
            <form action="/payments/initatePayment" method="post">
            <input value="${data.phoneNumber}" />
      <input type="hidden" name="orderId" value="">
      <input type="hidden" name="userId" value="">
      <button id="confirmPaymentButton">Initiate Payment</button>
      </form>
      <br>
        `
        
    // window.location.reload()

}

    async loadProfile(id) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })

    }
    const res = await fetch('/getProfile', options);
    const data = await res.json()
    this._id = data._id
    this.pname = data.userName
    this.pnum = data.userNumber

    loadUserData(data)
   // console.log(data);
}

logOut() {
    localStorage.clear()
    window.location.reload()
}
saveTip(tip) {
    this.tip = tip
}

    async editProfile() {
    const newData = {
        userName: document.getElementById('uname').value,
        userAddress: document.getElementById('uaddress').value,
        userNumber: document.getElementById('unum').value,
        email: document.getElementById('uid').value,
        id: this._id

    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    }
    const res = await fetch('auth/editProfile', options);
      
    const data = await res.json()
    showNotification(data.response)
}

    async sendMessage() {

    const messageBody = {
        text: document.getElementById('messageBody').value, userId: this._id, senderName: this.pname, senderNumber: this.pnum,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageBody)
    }
    const res = await fetch('/message', options);
    const data = await res.json()
    showNotification(data.response)
    document.getElementById('messageBody').value = ''
}
}


function showError(errorText) {
    modals.forEach(modal => {
        if (modal.classList.contains('active')) {
            modal.firstElementChild.nextElementSibling.innerText = `${errorText}`
            setTimeout(() => {
                modal.firstElementChild.nextElementSibling.innerText = ``
            }, 3000);
        }
    })
}

function showSuccess(successText) {
    modals.forEach(modal => {
        if (modal.classList.contains('active')) {
            modal.firstElementChild.nextElementSibling.nextElementSibling.innerText = `${successText}`
            setTimeout(() => {
                modal.firstElementChild.nextElementSibling.innerText = ``
            }, 3000);
        }
    })
}


const postTags = document.querySelectorAll('.postTagsContainer .tagOption')
const postTagsField = document.querySelector('#productTags')



postTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active')
        if (postTagsField.value == '') {
            postTagsField.value = tag.id + ' '
        }
        else if (postTagsField.value.search(tag.id) != -1) {
            let cus = postTagsField.value.replace(`${tag.id} `, '')
            postTagsField.value = cus
        }
        else {
            postTagsField.value = `${postTagsField.value}${tag.id} `
        }
    })
})

function loadUserData(data) {
    if (data.userNumber != undefined || null) {
        document.getElementById('uname').value = data.userName
        document.getElementById('uaddress').value = data.userAddress
        document.getElementById('unum').value = data.userNumber
        document.getElementById('upw').value = '******'
        exit.innerHTML = `
    <div id="logOut">LogOut</div>
    `
    document.getElementById('logOut').addEventListener('click', () => {
        userr.logOut()
    })
    }
    userOrders.innerHTML = ''
 
    console.log(data)
    // data.userOrders?.forEach(order => {
    //     const orderItem = document.createElement('div')
    //     orderItem.classList.add('orderItem')
    //     order.orderStatus != "" ? orderItem.classList.add(order.orderStatus):null;
        
    //     const cartStr = genList(order.Cart)

    //     let deliveryStr = 'Delivery'
        
    //     if (order.orderStatus =='Processed'){
    //         orderItem.innerHTML = `
    //          <span>
    //                 <div>
    //                     <h3>Detail</h3>
    //                     <span>
    //                  ${cartStr}
    //                     </span>
    //                 </div>
    //                 <div>
    //                     <h3>Cost</h3>
    //                     <span>K${order.orderCost}</span>
    //                 </div>
    //             </span>
    //             <span>
    //                 <div>
    //                     <h3>Status</h3>
    //                     <span>Processed</span>
    //                 </div>
    //                 <div id="" >
    //                     <h3>Id</h3>
    //                     <span>${order.orderId}</span>
    //                 </div>
    //             </span>
    //             <span >
    //                 <div>
    //                     <h3>Time</h3>
    //                     <span>${order.timeStamp}</span>
    //                 </div>
                   
    //             </span>
    //     `
    //     }else{
    //         orderItem.innerHTML = `
    //          <span id=${order.orderStatus}>
    //                 <div>
    //                     <h3>Detail</h3>
    //                     <span>
    //                  ${cartStr}
    //                     </span>
    //                 </div>
    //                 <div>
    //                     <h3>Cost</h3>
    //                     <span>K${order.orderCost}</span>
    //                 </div>
    //             </span>
    //             <span id=${data._id}>
    //                 <div>
    //                     <h3>Status</h3>
    //                     <span>${order.orderStatus}</span>
    //                 </div>
    //                 <div id="Cancelled" >
    //                     <h3>Id</h3>
    //                     <span>${order.orderId}</span>
    //                 </div>
    //                 ${order.orderStatus =='Cancelled'||order.orderStatus=='Deleted'?'':`<button class="cancelButton" id=${order.orderId}>Cancel</button>`}
    //                 ${order.orderStatus =='Deleted'||order.orderStatus=='Cancelled' ? `<button class="pendingButton" id=${order.orderId}>Mark Pending</button>`:''}
    //             </span>
    //             <span id=${data._id} >
    //                 <div>
    //                     <h3>Time</h3>
    //                     <span>${order.orderTime}</span>
    //                 </div>
    //                 <div id="Deleted">
    //                     <h3>Delivery</h3>
    //                     <span>${deliveryStr}</span>
    //                 </div>
    //                ${order.orderStatus=='Pending'? `<button id=${order.orderId} class="deleteButton">Delete</button>` : ''}
    //             </span>
    //     `
    //     }
    //     userOrders.append(orderItem)
    //     resetOrdersButtons()
    // });



    data.userNotifications?.forEach(notification => {
        const notificationItem = document.createElement('div')
        notificationItem.classList.add('notificationContainer')
        notificationItem.innerHTML = `
        <div class="notificationItem">
                <h3>${notification.messageType}</h3>
                <span>
                    “${notification.messageBody}”
                </span>
                <div class="notificationOptions">
                    <div>
                        <h3>From</h3>
                        <div>${notification.from}</div>
                    </div>
                    <div>
                        <button class="deleteButton"> Delete</button>
                    </div>
                    <div>
                        <div class="notiDate">
                            ${notification.messageDate}
                        </div>
                    </div>
                </div>
            </div>
      `
        userNotifications.append(notificationItem);
    });
}
