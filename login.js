const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    if(email === "admin@health.com" && password === "admin123"){

        alert("Admin Login Successful");

        localStorage.setItem("user", JSON.stringify({
            role: "admin",
            name: "Admin"
        }));

        window.location.href = "admindashboard.html";
        return;
    }
    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        console.log("LOGIN RESPONSE:", data);  

        alert(data.message);
        if(data.message === "Login successful" && data.user){
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("userId", data.user._id);

            window.location.href = "welcome.html";

        }

    } catch (error) {

        console.log(error);
        alert("Login failed");

    }

});