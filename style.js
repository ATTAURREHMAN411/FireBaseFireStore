

import { collection, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";



let upload = document.querySelector(".upload")
let bacbtn = document.querySelector(".bacbtn")
let disable = document.querySelector(".disable")
let disabledata = document.querySelector(".disable-data")
let uploadusersdata = document.querySelector(".uploadusersdata")

upload.addEventListener("click", (event)=>{
    event.preventDefault()
    disabledata.classList.add("disable")
    uploadusersdata.classList.remove("disable")
})

bacbtn.addEventListener("click", (event)=>{
    event.preventDefault()
    uploadusersdata.classList.add("disable")
    disabledata.classList.remove("disable")
   
})

document.addEventListener("DOMContentLoaded", function() {
    new Swiper(".swiper", {
        loop: true,
        
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
});

// status coding end


// center nav

let house = document.querySelector(".house")
let userbutton = document.querySelector(".userbutton")
let centerMancontainer = document.querySelector(".centerMancontainer")
let centerUsercontinor = document.querySelector(".centerUsercontinor")
let searchShow = document.querySelector(".searchShow")
let statusbackBtn = document.querySelector(".statusbackBtn")
let UserStatusData = document.querySelector(".UserStatusData")


house.addEventListener("click", ()=>{
    centerMancontainer.classList.remove("disable")
    centerUsercontinor.classList.add("disable")
    userbutton.classList.remove("NavaddColor")
    house.classList.add("NavaddColor")
})

userbutton.addEventListener("click", ()=>{
    centerUsercontinor.classList.remove("disable")
    centerMancontainer.classList.add("disable")
    userbutton.classList.add("NavaddColor")
    house.classList.remove("NavaddColor")
})

let createstorybtn = document.querySelector(".createstorybtn")
createstorybtn.addEventListener("click", ()=>{
    UserStatusData.classList.remove("disable")
    searchShow.classList.add("disable")
    centerMancontainer.classList.add("disable")
})


statusbackBtn.addEventListener("click", ()=>{
    searchShow.classList.remove("disable")
    centerMancontainer.classList.remove("disable")
    UserStatusData.classList.add("disable")

})


let likeBtn = document.querySelectorAll(".likeBtn")

likeBtn.forEach((item)=>{
         item.addEventListener("click", ()=>{
            alert("hellow")
         })
})




