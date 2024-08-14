// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const auth = getAuth();
const db = getDatabase();

var email = document.getElementById('email');
var password = document.getElementById('password');
var userLogin = document.getElementById('userLogin');

userLogin.addEventListener("click", signInUser);

function signInUser() {
    if (email.value === "" || password.value === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill out both email and password fields.',
        });
        return;
    }

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            email.value = ''
            password.value = ''
            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'You have successfully logged in.',
            }).then(() => {
                // Redirect to another page or update the UI
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            Swal.fire({
                icon: 'error',
                title: 'Authentication Failed',
                text: errorMessage,
            });
        });
}



// window.userLogin = function () {
//   var obj = {
//       email: email.value,
//       password: password.value,
//   }

//   if (!obj.email || !obj.password) {
//       Swal.fire({
//           title: "All fields are required!",
//           text: "Please fill in all fields.",
//           icon: "warning"
//       });
//       return; // Stop the function execution if any field is empty
//   }

//   email.value = '';
//   password.value = '';

//   signInWithEmailAndPassword(auth, obj.email, obj.password)
//   .then(function (res){
//       console.log(res);
//       var id = res.user.uid;
//       console.log(id);
//       var reference = ref(db, `tasks/${id}`);
//       console.log(reference);
//       onValue(reference, function(data){
//           console.log(onValue);
//           var allData = data.val();
//           console.log(allData);
//       });
//       Swal.fire({
//           title: "You have logged in successfully!",
//           text: "You clicked the button!",
//           icon: "success"
//       });
//   })
//   .catch(function (err){
//       console.log(err.message);
//       Swal.fire({
//           title: "Invalid Email and Password!",
//           text: "Please check your credentials.",
//           icon: "error"
//       });
//   });
// }


