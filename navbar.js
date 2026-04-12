document.addEventListener("DOMContentLoaded", function() {
    const patientName = localStorage.getItem('patientName');
    const patientNameSpan = document.getElementById('patient-name');

    if(patientName && patientNameSpan){
        patientNameSpan.textContent = patientName; 
    } else if(patientNameSpan){
        patientNameSpan.textContent = "Login"; 
    }
    const profileMenu = document.querySelector('.profile-menu');
    if(profileMenu){
        profileMenu.addEventListener('click', function(e){
            e.stopPropagation();
            profileMenu.classList.toggle('active');
        });
    }
    document.body.addEventListener('click', function(){
        if(profileMenu) profileMenu.classList.remove('active');
    });
    const logoutBtn = document.getElementById('logout-btn');
    if(logoutBtn){
        logoutBtn.addEventListener('click', function(e){
            e.preventDefault();
            localStorage.removeItem('patientName');
            alert("Logged out!");
            window.location.href = 'login.html';
        });
    }
    document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
        const nameElement = document.getElementById("patient-name");

        if(nameElement){
            nameElement.innerText = user.name;
        }
    }

});
});