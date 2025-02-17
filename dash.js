import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { collection, getDocs, addDoc, query, where, onSnapshot, doc,  Timestamp, deleteDoc} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

let upload = document.querySelector(".image img")
let uploadimg = document.querySelector(".userimage img")
let uploadtext = document.querySelector(".userimage h3")
let createstory = document.querySelector(".create-story img")
let profilephotocontainer = document.querySelector(".profile-photo-container img")
let userprofileName = document.querySelector(".userprofileName")
let firstpostcontainer = document.querySelector(".first-post-container")


// same uid ID user Data   start

let allTodo = []
onAuthStateChanged(auth, async (user) => {
    if (user) {
    
        const uid = user.uid;
        console.log(uid);
let value = await getDataFromFirestore()
console.log(value);
 value.map(item =>{
    createstory.src = item.image
    upload.src = item.image
    uploadimg.src = item.image
    uploadtext.innerHTML = item.FullName
    profilephotocontainer.src = item.image
    userprofileName.innerHTML = item.FullName
 })

} else {
        window.location = "index.html"
    }
});

async function getDataFromFirestore(){
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        allTodo = []
        allTodo.push({
            ...doc.data(),
            docid: doc.id
        })
    })
    getNewDataFirestore(auth.currentUser.uid)
    getUserDataFirestore(auth.currentUser.uid)
    ShowUserFirestore(auth.currentUser.uid)
    ShowStatusData()
    NotSameUid() 
    UploadStatus()
return allTodo 
}
// same uid ID user Data   end
  
// send blogs in firebase start

async function userUploadData() {
    let  Btn = document.querySelector(".uploadusersdata .useData")
    let uploadedFile = false;
    let statusValue = ""
    document.getElementById("upload_widget").addEventListener("click", function () {
        console.log("click");
        cloudinary.openUploadWidget(
            { cloud_name: "dcwrsxkvn", upload_preset: "ml_default" },
            function (error, result) {
                if (!error && result && result.event === "success") {
                    statusValue = result.info.secure_url;
                    uploadedFile = true;
                }
            }
        )
    })

   
    Btn.addEventListener("click", async (event)=>{
        let tittle = document.querySelector("#tittle").value
        let description = document.querySelector("#desription").value
      if(!tittle == "" && !description == "" && uploadedFile){ 
        let tittle = document.querySelector("#tittle").value
        let description = document.querySelector("#desription").value
            event.preventDefault()
        let value = await getDataFromFirestore()
        console.log(value);
        let userUploadPic = ""
        let userName = ""
        value.map(item =>{
            userUploadPic = item.image
            userName = item.FullName
         })
             try {
                    const docRef = await addDoc(collection(db, "blogs"), {
                     Tittle: tittle,
                     Description : description,
                     userName : userName,
                     ProfilePic : userUploadPic,
                     UploadImg : statusValue,
                     uid: auth.currentUser.uid
            
                    });
                     firstpostcontainer.innerHTML = ""
                    console.log("Document written with ID: ", docRef.id);
                    tittle = document.querySelector("#tittle").value = ""
                    description = document.querySelector("#desription").value = ""
                    window.location.href = "Dashboard.html"
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  } 
                 }else{
                    alert("Name & Description & IMG required")
                 }
        })
    }
     
    

userUploadData() 

// all user data start

let newarray = []
let postcontainer = document.querySelector(".post-container")
async function getNewDataFirestore(value) {    
    const q = query(collection(db, "blogs"), where("uid", "!=", value));
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
            newarray.push({
                ...doc.data(),
                docid: doc.id
            })
        });
        newarray.map((item, index) =>{
               postcontainer.innerHTML +=`
               <div class="second-post-container">
               <div class="profile">
                                      <img src="${item.ProfilePic}" alt="Profile Picture">
                                      <h4>${item.userName}</h4>
                                  </div>
                                  <div class="post-title">${item.Tittle} 🌸</div>
                                    <div class="post-description">${item.Description}</div>
                                  <div class="post-content">
                                      <div class="post-image"><img src="${item.UploadImg}" alt="Profile Picture"></div>
                                  </div>
                                  <div class="post-actions">
                                      <span class="likeBtn">👍 Like</span>
                                      <span>💬 Comment</span>
                                      <span>🔄 Share</span>
                                  </div></div>
             `
           })
    });
    };
  
// all user data end

// only login user data start

let samuser = []
async function getUserDataFirestore(value) {    
    const q = query(collection(db, "blogs"), where("uid", "==", value));
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
            samuser.push({
                ...doc.data(),
                docid: doc.id
            })
        });
        samuser.map(item =>{
            firstpostcontainer.innerHTML +=`
             <div class="secondonly-user-post-container">
               <div class="profile">
                                      <img src="${item.ProfilePic}" alt="Profile Picture">
                                      <h4>${item.userName}</h4>
                                  </div>
                                  <div class="post-title">${item.Tittle} 🌸</div>
                                    <div class="post-description">${item.Description}</div>
                                  <div class="post-content">
                                      <div class="post-image"><img src="${item.UploadImg}" alt="Profile Picture"></div>
                                  </div>
                                  <div class="post-actions">
                                      <span>👍 Like</span>
                                      <span>💬 Comment</span>
                                      <span>🔄 Share</span>
                                  </div></div>`
           })})};
// only login user end   
// user search data start

let input = document.querySelector("#search")
let searchBtn = document.querySelector(".searchBtn")
let SearchDataShowEnable = document.querySelector(".SearchDataShowEnable")
let searchShow = document.querySelector(".searchShow")
let newDataShowcontainer = document.querySelector(".newDataShow-container")

let filterData = []
async function ShowUserFirestore(value) {    
    const q = query(collection(db, "blogs"), where("uid", "!=", value));
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
            filterData.push({
                ...doc.data(),
                docid: doc.id
            })
        });
        searchBtn.addEventListener("click", (event)=>{
            event.preventDefault()
            console.log(input.value);
            searchShow.classList.add("disable")
            SearchDataShowEnable.classList.remove("disable")
            let filterUser = filterData.filter(item => item.userName == input.value)
            newDataShowcontainer.innerHTML = ""
           if(filterUser == ""){
            newDataShowcontainer.innerHTML = `
            <div class="user-note-found-container">
                                <img src="2.png" alt="">
                                <h2>Sorry this User is Not Found</h2>
                            </div>
            `
            input.value = ""
           }else{
            console.log(filterUser);
            filterUser.map(item =>{
                newDataShowcontainer.innerHTML +=`
                 <div class="secondonly-user-post-container">
                   <div class="profile">
                                          <img src="${item.ProfilePic}" alt="Profile Picture">
                                          <h4>${item.userName}</h4>
                                      </div>
                                      <div class="post-title">${item.Tittle} 🌸</div>
                                        <div class="post-description">${item.Description}</div>
                                      <div class="post-content">
                                          <div class="post-image"><img src="${item.UploadImg}" alt="Profile Picture"></div>
                                      </div>
                                      <div class="post-actions">
                                          <span>👍 Like</span>
                                          <span>💬 Comment</span>
                                          <span>🔄 Share</span>
                                      </div></div>`
          })
            input.value = ""

           }
        });
})}
let showDataback = document.querySelector(".showData-back")
showDataback.addEventListener("click", (event)=>{
       event.preventDefault()
    searchShow.classList.remove("disable")
    SearchDataShowEnable.classList.add("disable")
})

// user search Data End

// Status coding start


let uploadstatuus = document.querySelector(".uploadstatuus")
async function UploadStatus(){
    console.log("hellow");
let SetValueShow = []
    const q = query(collection(db, "status"), where("Statusuid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
        SetValueShow.push({
            ...doc.data(),
            docid: doc.id
        }) 
       })
       console.log(SetValueShow);
    let uploadedFile = false;
    let statusValue = ""
    
       document.getElementById("UploadStatus").addEventListener("click", function () {
        if(!SetValueShow[0]){
        cloudinary.openUploadWidget(
            { cloud_name: "dcwrsxkvn", upload_preset: "ml_default" },
            function (error, result) {
                if (!error && result && result.event === "success") {
                    statusValue = result.info.secure_url;
                    uploadedFile = true;
                }
            }
        )
    }else{
        alert("Your Status Already Upload")
    }
    })

    
    uploadstatuus.addEventListener("click", async (event)=>{
        if(!SetValueShow[0]){
            if(!uploadedFile){
        alert("Pic required")
    }else{

          let Statustittle = document.querySelector("#input").value.trim();
     event.preventDefault()
 let value = await getDataFromFirestore()
    let userUploadPic = ""
    let userName = ""
    value.map(item =>{
        userUploadPic = item.image
        userName = item.FullName
     })
          try {
                const docRef = await addDoc(collection(db, "status"), {
                 Tittle: Statustittle,
                 userName : userName,
                 ProfilePic : userUploadPic,
                 UploadImg : statusValue,
                 Statusuid: auth.currentUser.uid,
                 date:  new Date()
                });
                console.log("Document written with ID: ", docRef.id);
                window.location.href = "Dashboard.html"
              } catch (e) {
                console.error("Error adding document: ", e);
              } 
              alert("Status Upload")
              searchShow.classList.remove("disable")
              UserStatusData.classList.add("disable")
    }
}else{
    alert("Your Status Already Upload")
}
})
}
// show status
let status = []
let NewSameData = document.querySelector(".NewSameData")

async function ShowStatusData() {
    const q = query(collection(db, "status"), where("Statusuid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
        status.push({
            ...doc.data(),
            docid: doc.id
        }) 
        console.log(status);

       })
       let Uidcreatestory = document.querySelector(".NewDataDiv")
       status.map(item =>{
        Uidcreatestory.style.maxWidth = "300px";
        Uidcreatestory.style.Width = "300px";
        Uidcreatestory.style.minWidth = "145px";

           Uidcreatestory.innerHTML += `
             <div class="Uidcreate-story select">
                            <img class="profile-pic" src="${item.ProfilePic}" alt="Profile">
                            <img class="StatusBackground" src="${item.UploadImg}" alt="">
                            <span class="story-name">${item.userName}</span> </div>`
           let times = item.date.seconds
           const oldDateSeconds = times; 
const oldDate = new Date(oldDateSeconds * 1000); 
const newDate = new Date();
const timeDifference = Math.floor((newDate - oldDate) / 60000);
if(timeDifference >= 1400){
    deleteData(item.docid)
}

console.log(`This data was uploaded ${timeDifference} minutes ago.`);
           })
           let Statuspic = document.querySelector(".Statuspic")
            let select = document.querySelectorAll(".select")
            let ShowStatusPic = document.querySelector(".ShowStatusPic")
            let allDataDisable = document.querySelector(".allDataDisable")

            select.forEach((element, index) =>{
                element.addEventListener("click", (event)=>{
                    event.preventDefault()
                   console.log("click", index);
                   console.log(status[index].userName);
                   ShowStatusPic.classList.remove("disable")
                   allDataDisable.classList.add("disable")
                   Statuspic.innerHTML = `
                    <img class="profile-pic profile-img" src="${status[index].ProfilePic}" alt="">
                        <img class="SPic" src="${status[index].UploadImg}" alt="">
                        <h2 class="Sname">${status[index].userName}</h2>
                        <div class="sizemaneg">
                            <h4 class="Stittle">${status[index].Tittle}</h4>
                        </div>
                   `

                   setTimeout(() => {
                    ShowStatusPic.classList.add("disable")
                    allDataDisable.classList.remove("disable")
                }, 5000);
                })
            
    })}
  let NotSameArry = []
async function NotSameUid() {
    const q = query(collection(db, "status"), where("Statusuid", "!=", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
        NotSameArry.push({
            ...doc.data(),
            docid: doc.id
        }) 
       })
       NotSameArry.map(item =>{
        NewSameData.innerHTML +=`
          <div class="Uidcreate-story selection">
                            <img class="profile-pic" src="${item.ProfilePic}" alt="Profile">
                            <img class="StatusBackground" src="${item.UploadImg}" alt="">
                            <span class="story-name">${item.userName}</span> </div>`
                            console.log( item.docid);
                            let times = item.date.seconds
                            const oldDateSeconds = times; 
                 const oldDate = new Date(oldDateSeconds * 1000); 
                 const newDate = new Date();
                 const timeDifference = Math.floor((newDate - oldDate) / 60000);
                 console.log(timeDifference);
                 if(timeDifference >= 1400){
                    const docRef = doc(db, "status", item.docid);
                    deleteDoc(docRef)
                      .then(() => {
                        console.log("Document deleted successfully.");
                      })
                      .catch((error) => {
                        console.error("Error deleting document: ", error);
                      });
                 }
       
       let Statuspic = document.querySelector(".Statuspic")
            let select = document.querySelectorAll(".selection")
            let ShowStatusPic = document.querySelector(".ShowStatusPic")
            let allDataDisable = document.querySelector(".allDataDisable")

            select.forEach((element, index) =>{
                element.addEventListener("click", (event)=>{
                 event.preventDefault()
                 ShowStatusPic.classList.remove("disable")
                 allDataDisable.classList.add("disable")
                 Statuspic.innerHTML = `
                  <img class="profile-pic profile-img" src="${NotSameArry[index].ProfilePic}" alt="">
                      <img class="SPic" src="${NotSameArry[index].UploadImg}" alt="">
                       <h3 class="Sname">${NotSameArry[index].userName}</h3>
                      <div class="sizemaneg">
                          <h4 class="Stittle">${NotSameArry[index].Tittle}</h4>
                      </div>`
                 setTimeout(() => {
                  ShowStatusPic.classList.add("disable")
                  allDataDisable.classList.remove("disable")
              }, 5000);
                })
            })
       })
       
}    

//  Logout Button

let logoutBtn = document.querySelector(".logoutBtn")

logoutBtn.addEventListener("click", ()=>{
  auth.signOut()
  .then(() => {
      window.location.href = "loging.html"; // Redirect to login page
  })
  .catch(error => {
      console.error("Logout Error:", error);
  });
})

function deleteData(Value){
const docRef = doc(db, "status", Value);
deleteDoc(docRef)
  .then(() => {
    console.log("Document deleted successfully.");
  })
  .catch((error) => {
    console.error("Error deleting document: ", error);
  });
}


       









