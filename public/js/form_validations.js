const validatePhoneNumber = function (number) {
    if (number.match(/^[0-9]{10}$/)) {
        return true;
    } else {
        return false;
    }
}

const validateUsername = function (number) {
    if (number.match(/^[0-9A-Za-z_]+$/)) {
        return true;
    } else {
        return false;
    }
}





// const validateLogin = (e) => {
//     const phoneNumber = document.getElementById("phone-number").value;
//     const password = document.getElementById("password").value;
//     const errors = document.getElementById("auth-errors");
//     let error_span = document.createElement("span");
//     error_span.className = "auth-error-notification";

//     // clear all previous text so only one error is shown
//     errors.innerHTML = ""

//     if (!password || !phoneNumber) {
//         error_span.textContent = "Please fill in all fields"
//         errors.appendChild(error_span);
//         return false
//     }

//     if (password.length < 6) {
//         error_span.textContent = "password must be atleast 6 characters."
//         errors.appendChild(error_span);
//         return false
//     }

//     if (!validatePhoneNumber(phoneNumber)) {
//         error_span.textContent = "invalid phone number"
//         errors.appendChild(error_span);
//         return false;
//     }


//     return true;
// }


// const validateRegister = (e) => {
//     const phoneNumber = document.getElementById("phone-number").value;
//     const password = document.getElementById("password").value;
//     const username = document.getElementById("username").value;
//     const errors = document.getElementById("auth-errors");
//     let error_span = document.createElement("span");
//     error_span.className = "auth-error-notification";

//     // clear all previous text so only one error is shown
//     errors.innerHTML = ""

//     if (!password || !phoneNumber || !username) {
//         error_span.textContent = "Please fill in all fields"
//         errors.appendChild(error_span);
//         return false
//     }

//     if (!validateUsername(username)) {
//         error_span.textContent = "invalid username"
//         errors.appendChild(error_span);
//         return false;
//     }

//     if (password.length < 6) {
//         error_span.textContent = "password must be atleast 6 characters"
//         errors.appendChild(error_span);
//         return false
//     }

//     if (!validatePhoneNumber(phoneNumber)) {
//         error_span.textContent = "invalid phone number"
//         errors.appendChild(error_span);
//         return false;
//     }


//     return true;
// }

