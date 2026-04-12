async function loadDoctors() {

    try {

        const response = await fetch("http://localhost:5000/api/doctors");
        const doctors = await response.json();

        const doctorSelect = document.getElementById("doctor");

        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

        doctors.forEach(doc => {

            const option = document.createElement("option");
            option.value = doc.name;
            option.textContent = doc.name + " - " + doc.department;

            doctorSelect.appendChild(option);

        });

    } catch (error) {
        console.error("Error loading doctors:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    loadDoctors();

    const form = document.querySelector(".appointment-form");

    form.addEventListener("submit", async function (event) {

        event.preventDefault();
        const userData = localStorage.getItem("user");

        if (!userData) {
            alert("Please login first");
            window.location.href = "login.html";
            return;
        }

        const user = JSON.parse(userData);

        const data = {
            patientId: user._id,
            patientName: document.getElementById("name").value,
            email: document.getElementById("email").value,
            age: document.getElementById("age").value,
            department: document.getElementById("department").value,
            service: document.getElementById("service").value,
            date: document.getElementById("date").value,
            doctor: document.getElementById("doctor").value
        };

        try {

            const response = await fetch("http://localhost:5000/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            alert("✅ " + result.message);

            form.reset();

        } catch (error) {

            alert("❌ Error booking appointment");
            console.error(error);

        }

    });
});