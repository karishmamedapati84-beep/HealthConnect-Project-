async function loadProfile(){

const userId = localStorage.getItem("userId");

if(!userId){
window.location.href="login.html";
return;
}

try{

const res = await fetch(
`http://localhost:5000/api/patients/profile/${userId}`
);

const data = await res.json();

document.getElementById("name").innerText=data.name || "";
document.getElementById("email").innerText=data.email || "";
document.getElementById("phone").innerText=data.phone || "";
document.getElementById("age").innerText=data.age || "";
document.getElementById("nameHeader").innerText=data.name || "";

}catch(err){

console.error("Error loading profile",err);

}

}

loadProfile();


let editing=false;

function editProfile(){

const btn=document.querySelector(".edit-btn");

const name=document.getElementById("name");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const age=document.getElementById("age");

if(!editing){

name.innerHTML=`<input type="text" id="editName" value="${name.innerText}">`;
email.innerHTML=`<input type="text" id="editEmail" value="${email.innerText}">`;
phone.innerHTML=`<input type="text" id="editPhone" value="${phone.innerText}">`;
age.innerHTML=`<input type="number" id="editAge" value="${age.innerText}">`;

btn.innerText="Save";

editing=true;

}else{

const newName=document.getElementById("editName").value;
const newEmail=document.getElementById("editEmail").value;
const newPhone=document.getElementById("editPhone").value;
const newAge=document.getElementById("editAge").value;

name.innerText=newName;
email.innerText=newEmail;
phone.innerText=newPhone;
age.innerText=newAge;

document.getElementById("nameHeader").innerText=newName;

btn.innerText="Edit Profile";

editing=false;

}

}


function logout(){

localStorage.removeItem("userId");

window.location.href="login.html";

}