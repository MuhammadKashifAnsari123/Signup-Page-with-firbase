// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { 
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { set, push, ref, onValue, getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPbUx11ajbFPTSXeI7Oc4R-wXql5m-UWc",
  authDomain: "loginandsignup-52596.firebaseapp.com",
  databaseURL: "https://loginandsignup-52596-default-rtdb.firebaseio.com",
  projectId: "loginandsignup-52596",
  storageBucket: "loginandsignup-52596.appspot.com",
  messagingSenderId: "700044202976",
  appId: "1:700044202976:web:a8783b4977ceca0bc6d185",
  measurementId: "G-J2D52CDJZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// DOM Elements
var UserName = document.getElementById('UserName');
var email = document.getElementById('email');
var password = document.getElementById('password');
var sigupUser = document.getElementById('sigupUser');
var Logout_Btn = document.getElementById('Logout_Btn');
var user_email = document.getElementById('user_email');
var auth_container = document.getElementById('auth_container');
var user_container = document.getElementById('user_container');

// Event Listeners
sigupUser.addEventListener("click", createUserAcount);
Logout_Btn.addEventListener("click", Logout);

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is logged in');  
        const uid = user.uid;
        auth_container.style.display = "none";
        user_container.style.display = "block";
        user_email.innerText = user.email;
    } else {
        auth_container.style.display = "block";
        user_container.style.display = "none";
    }
});

function createUserAcount() {
    if (UserName.value === "" || email.value === "" || password.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All fields are required!',
        });
        return;
    }
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            UserName.value = '';
            email.value = '';
            password.value = '';        
            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                text: `Welcome, ${UserName.value}! Your account has been created.`,
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        });
}

function Logout() {
    signOut(auth).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have been logged out successfully.',
        });
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
        });
    });
}

  



// const db = getDatabase();
// const auth = getAuth();



// window.sigupUser = function () {
//     var obj = {
//         UserName: UserName.value,
//         email: email.value,
//         password: password.value
//     }

//     if (!obj.UserName || !obj.email || !obj.password) {
//         Swal.fire({
//             title: "All fields are required!",
//             text: "Please fill in all fields.",
//             icon: "warning"
//         });
//         return; // Stop the function execution if any field is empty
//     }

//     UserName.value = '';
//     email.value = '';
//     password.value = '';
//     console.log(obj);

//     createUserWithEmailAndPassword(auth, obj.email, obj.password)
//     .then(function (res){       
//         console.log(res);
//         obj.id = res.user.uid;
//         var reference = ref(db, `tasks/${obj.id}`);
//         set(reference, obj)
//         .then(function (dbRes){
//             console.log(dbRes)
//         })
//         .catch(function (dbErr){
//             console.log(dbErr)
//         });
//         Swal.fire({
//             title: "Your account has been created!",
//             text: "You clicked the button!",
//             icon: "success"
//         });
//     })
//     .catch(function (err){
//          console.log(err.message);
//         Swal.fire({
//             title: "You are already registered!",
//             text: "You clicked the button!",
//             icon: "error"
//         });
//     });
// };
