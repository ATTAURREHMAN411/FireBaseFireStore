import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { auth } from "./firebase.js";


let btn = document.querySelector(".submitebtn")

btn.addEventListener("click", (event)=>{
    event.preventDefault()
let email = document.querySelector("#email").value
let password = document.querySelector("#password").value

   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    console.log(user.uid)
    window.location.href = "Dashboard.html"
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  }); 
})
