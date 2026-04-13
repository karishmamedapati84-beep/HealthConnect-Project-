const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/api/auth/register", {

            method: "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                name,
                age,
                email,
                phone,
                password
            })

        });

        const data = await response.json();

        alert(data.message);

        if(data.message === "Registration successful"){
            window.location.href = "login.html";
        }

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

});