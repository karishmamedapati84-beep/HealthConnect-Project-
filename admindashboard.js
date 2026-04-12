function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    if (pageId === "doctors") {
        loadDoctors();
    }

    if (pageId === "patients") {
        loadPatients();
    }

    if (pageId === "appointments") {
        loadAppointments();
    }

    if (pageId === "home") {
        loadDashboardCounts();
    }
}

function logout() {
    alert("Logged out successfully");
    window.location.href = "index.html";
}
async function loadDoctors() {

    try {

        const response = await fetch("http://localhost:5000/api/doctors");
        const doctors = await response.json();

        const table = document.querySelector("#doctorsTable tbody");

        if (!table) return;

        table.innerHTML = "";

        doctors.forEach(doc => {

            const row = `
            <tr>
                <td>${doc.name}</td>
                <td>${doc.department}</td>
                <td>${doc.experience}</td>
                <td>${doc.email}</td>
                <td>
                    <button onclick="deleteDoctor('${doc.email}')">Delete</button>
                </td>
            </tr>
            `;

            table.innerHTML += row;

        });

    } catch (error) {
        console.log("Error loading doctors:", error);
    }

}
const doctorForm = document.getElementById("doctorForm");

if (doctorForm) {

    doctorForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const doctor = {
            name: document.getElementById("doctorName").value,
            department: document.getElementById("doctorDept").value,
            experience: document.getElementById("doctorExp").value,
            email: document.getElementById("doctorEmail").value
        };

        try {

            await fetch("http://localhost:5000/api/doctors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(doctor)
            });

            alert("Doctor added successfully");

            doctorForm.reset();
            loadDoctors();

        } catch (error) {
            console.log("Error adding doctor:", error);
        }

    });

}
async function deleteDoctor(email) {

    if (confirm("Delete this doctor?")) {

        try {

            await fetch(`http://localhost:5000/api/doctors/${email}`, {
                method: "DELETE"
            });

            alert("Doctor deleted");
            loadDoctors();

        } catch (error) {
            console.log("Error deleting doctor:", error);
        }

    }

}
async function loadPatients() {

    try {

        const response = await fetch("http://localhost:5000/api/auth/users");
        const users = await response.json();

        const table = document.querySelector("#patientsTable tbody");

        if (!table) return;

        table.innerHTML = "";

        users.forEach(user => {

            const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="deletePatient('${user._id}')">Delete</button>
                </td>
            </tr>
            `;

            table.innerHTML += row;

        });

    } catch (error) {
        console.log("Error loading patients:", error);
    }

}
async function deletePatient(id) {

    if(confirm("Delete this patient?")){

        try {
            await fetch(`http://localhost:5000/api/auth/users/${id}`, {
                method: "DELETE"
            });

            alert("Patient deleted");
            loadPatients();

        } catch (error) {
            console.log("Error deleting patient:", error);
        }

    }

}
async function loadAppointments() {

    try {

        const response = await fetch("http://localhost:5000/api/appointments");
        const appointments = await response.json();

        const table = document.querySelector("#appointmentsTable tbody");

        if (!table) return;

        table.innerHTML = "";

        appointments.forEach(app => {

            const row = `
            <tr>
                <td>${app.patientName}</td>
                <td>${app.email}</td>
                <td>${app.age}</td>
                <td>${app.department}</td>
                <td>${app.service}</td>
                <td>${app.date}</td>
                <td>${app.doctor}</td>
                <td>
                    <button onclick="deleteAppointment('${app._id}')">Delete</button>
                </td>
            </tr>
            `;

            table.innerHTML += row;

        });

    } catch (error) {
        console.log("Error loading appointments:", error);
    }

}
async function deleteAppointment(id) {

    if (confirm("Delete this appointment?")) {

        try {

            await fetch(`http://localhost:5000/api/appointments/${id}`, {
                method: "DELETE"
            });

            alert("Appointment deleted");
            loadAppointments();

        } catch (error) {
            console.log("Error deleting appointment:", error);
        }

    }

}
async function loadDashboardCounts() {

    console.log("Dashboard running 🚀");

    try {

        const doctors = await fetch("http://localhost:5000/api/doctors");
        const doctorData = await doctors.json();

        const patients = await fetch("http://localhost:5000/api/auth/users");
        const patientData = await patients.json();

        const appointments = await fetch("http://localhost:5000/api/appointments");
        const appointmentData = await appointments.json();

        document.getElementById("doctorCount").innerText = doctorData.length || 0;
        document.getElementById("patientCount").innerText = patientData.length || 0;
        document.getElementById("appointmentCount").innerText = appointmentData.length || 0;

    } catch (error) {
        console.log("ERROR:", error);
    }

}
loadDashboardCounts();