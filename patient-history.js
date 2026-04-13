async function loadHistory(){

const userId = localStorage.getItem("userId");

if(!userId){
alert("Please login first");
window.location.href="login.html";
return;
}

try{

const res = await fetch(
`http://localhost:5000/api/appointments/history/${userId}`
);

const data = await res.json();

const table = document.getElementById("historyTable");

table.innerHTML="";

data.forEach(app => {

let status = app.status;

if(!status){

const today = new Date();
const appointmentDate = new Date(app.date);

if(appointmentDate < today){
status="completed";
}else{
status="scheduled";
}

}

const actionBtn =
status==="scheduled"
? `<button class="cancel-btn" onclick="cancelAppointment('${app._id}')">Cancel</button>`
: "-";

const row=`
<tr>
<td>${app.patientName || ""}</td>
<td>${app.age || ""}</td>
<td>${app.department || ""}</td>
<td>${app.service || ""}</td>
<td>${app.doctor || ""}</td>
<td>${app.date || ""}</td>
<td class="${status}">${status}</td>
<td>${actionBtn}</td>
</tr>
`;

table.innerHTML += row;

});

}catch(error){

console.error("Error loading history:",error);

}

}

loadHistory();

async function cancelAppointment(id){

const confirmCancel = confirm("Are you sure you want to cancel this appointment?");

if(!confirmCancel) return;

try{

const res = await fetch(
`http://localhost:5000/api/appointments/cancel/${id}`,
{
method:"PUT"
}
);

const data = await res.json();

alert(data.message || "Appointment cancelled");

loadHistory();

}catch(err){

console.error("Cancel error:",err);

}

}
function searchAppointments(){

const input = document.getElementById("searchInput");
const filter = input.value.toLowerCase();

const table = document.getElementById("historyTable");
const rows = table.getElementsByTagName("tr");

for(let i=0;i<rows.length;i++){

const rowText = rows[i].innerText.toLowerCase();

if(rowText.includes(filter)){
rows[i].style.display="";
}else{
rows[i].style.display="none";
}

}

}