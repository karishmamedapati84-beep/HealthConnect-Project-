document.addEventListener("DOMContentLoaded", () => {
    const getStartedBtn = document.getElementById("getStartedBtn");

    getStartedBtn.addEventListener("click", () => {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        if (currentUser) {
            window.location.href = "home.html";
        } else {
            window.location.href = "login.html";
        }
    });
});