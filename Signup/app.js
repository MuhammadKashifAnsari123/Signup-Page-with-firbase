// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { set, push, ref, onValue, getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getDatabase();
const auth = getAuth();

var UserName = document.getElementById('UserName');
var email = document.getElementById('email');
var password = document.getElementById('password');


window.sigupUser = function () {
    var obj = {
        UserName: UserName.value,
        email: email.value,
        password: password.value
    }
    UserName.value = '',
    email.value = '',
    password.value = ''
    console.log(obj);


    // var reference = ref(db,"tasks");
    // push(reference, obj);
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res){       
        console.log(res);
        obj.id = res.user.uid;
        var reference = ref(db, `tasks/${obj.id}`);
        push(reference, obj)
        .then(function (dbRes){
            console.log(dbRes)
            
        })
        
        .catch(function (dbErr){
            console.log(dbErr)
        })
        Swal.fire({
            title: "your accound created!",
            text: "You clicked the button!",
            icon: "success"
          });
        
    })
    .catch(function (err){
         console.log(err.message);
        Swal.fire({
            title: "You are already registered!",
            text: "You clicked the button!",
            icon: " success"
          });
    });
};

// function getData() {
//     const reference = ref(db,"tasks/");
//     onValue(reference, function (taskData){
//         console.log(taskData.val());
//     })
// }

// getData();
