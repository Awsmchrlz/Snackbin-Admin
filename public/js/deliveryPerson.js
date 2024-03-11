const processState = document.getElementById('processState')

const adminScreenButtons = document.querySelectorAll('.screenButton')
const adminScreens = document.querySelectorAll('.screen')
const amodals = document.querySelectorAll('.modal');

const selectStoreButtons = document.querySelectorAll('.selectStoreButton')

let acceptedOrderFlag = false
let acceptedOrderData
let timerInterval;

// const aoverLay = document.querySelector('.overLay');

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


function exitModals() {
    amodals.forEach(modal => {
        modal.classList.remove('active')
    })
    document.querySelector('.overLay').classList.remove('active')
}


const notiModal = document.querySelector('.modal#notiModal')

function showNoti(Text) {
    exitModals();
    notiModal.classList.add('active');
    document.querySelector('.overLay').classList.add('active')
    notiModal.firstElementChild.nextElementSibling.innerText = `${Text}`

}


const fetchButton = document.getElementById('fetchOrderButton')

fetchButton?.addEventListener('click',async ()=>{
 
if(!acceptedOrderFlag){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch('/deliveryPerson/fetchOrder', options);
    const data = await res.json()
    console.log('fetched delivery')
    console.log(data);

    let cartString = ''
    data.Cart?.forEach((item)=>{
        cartString+=`
        <li>
        ${item.productName}  x${item.quantity} <img src="${item.mainImage}" alt="${item.productName}">
        </li>
        `
    })

    document.getElementById('viewTimer').textContent = ''
    clearInterval(timerInterval);
    if(data.orderStatus == 'Viewing'){
        processState.innerText = `Viewing Order`
        countdownTimer('#viewTimer', 15);
        resetViewingState()
    document.getElementById('orderContainer').innerHTML = 
    `
    <span>
      <div>
        <h3>Cart List</h3>
        <span>
        <ul>
        ${cartString}
        </ul>
        </span>
      </div>
      <br>
      <div>
        Total Cost <span class="costContainer"> ${data.orderPrice}</span>
      </div>
    </span>
    <span>
      <div>
        Order Status: ${data.orderStatus}
      </div>
      <div>
      Payment Status: ${data.paymentStatus}
    </div>
         <div>
        Delivery Address: ${data.deliveryAddress}
      </div>
          
      <div>
      <div>Name: ${data.userName}</div>
    <div>Phone: ${data.phoneNumber}</div>
    </div>
     
    </span>
  
   ${
    data.orderNotes==""?"":`
    Order Notes: ${data.orderNotes}`
   }
      <div>
        Time: 
        <span>${data.timeStamp}</span>
      </div>
   
  
   <button class="processButton" id="${data._id}">Accept</button>

    `
    const acceptButton = document.querySelector('.processButton')

    
acceptButton.addEventListener('click', async ()=>{
   
    document.getElementById('viewTimer').textContent = ''
    clearInterval(timerInterval);
        if(!acceptedOrderFlag){
            
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const orderId = data._id
        console.log(orderId)
        const userId = document.getElementById('userIdHolder').value

        const res2 = await fetch(`/deliveryPerson/acceptOrder/${orderId}/${userId}`, options);
        const data2 = await res2.json()
     
            acceptedOrderFlag = true;
       
        console.log('accepted delivery')
       processState.innerText = `Accepted This Order`
        showNoti(data2.response)
        setAcceptedrOder(data)
        
        console.log(data2._id);
    }else{
    
        showNoti(`Please complete the order you recently accepted.`)
    }
    
    })
    return data;
}else{
    processState.innerText = `Fetch an order`
    document.getElementById('orderContainer').innerHTML = 
    `Try again in a few, no orders currently available!`
}

}else{
    
    showNoti(`Please complete the order you recently accepted.`)
    
}
})


function setAcceptedrOder(orderData){
    acceptedOrderData = orderData
fetchButton.innerText = `Accepted Order`
const acceptButton = document.querySelector('.processButton')

acceptButton.innerText =  `Accepted this order`
    setTimeout(()=>{
         processState.innerText = `Fetch An Order`
        acceptedOrderFlag = false;
        fetchButton.innerText = `Fetch Order`
acceptButton.innerText =  `Accept Order`

    }, 600000)

}


function resetViewingState(){
    setTimeout(()=>{
        if(!acceptedOrderFlag){

            processState.innerText = `Fetch An Order`
            document.getElementById('orderContainer').innerHTML = 
            ``
        }

   }, 16000)
}

function countdownTimer(elementSelector, seconds) {
    const element = document.querySelector(elementSelector);

    if (!element) {
        console.error("Element not found");
        return;
    }

    const emojis = ['⏳', '⏰', '⌛', '🕰️', '⏱️', '⏲️'];
   
    timerInterval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(timerInterval);
            element.textContent = "";
            return;
        }

        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        element.textContent = `${seconds} ${randomEmoji}`;
        seconds--;
    }, 1000);
}

