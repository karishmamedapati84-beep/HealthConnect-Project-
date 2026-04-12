async function loadHistory(){

    const user =
      JSON.parse(localStorage.getItem("currentUser"));

    const res = await fetch(
        `http://localhost:3000/history/${user.email}`
    );

    const data = await res.json();

    const div = document.getElementById("history");

    data.forEach(app => {
        div.innerHTML += `
            <p>
            ${app.department} |
            ${app.service} |
            ${app.date}
            </p>
        `;
    });
}

loadHistory();