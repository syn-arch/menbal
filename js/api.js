const base_url = "https://api.football-data.org/v2/";
const API_KEY = "ad675f75979741d8ac50f36fcb7de729";
let id_liga = "PL";
let standingsURL = `${base_url}/competitions/${id_liga}/standings`;

// date helper
function getDay(Date) {
    return String(Date.getDate()).padStart(2, "0");
}
function getMonth(Date) {
    return String(Date.getMonth() + 1).padStart(2, "0");
}
function Date2Time(time) {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function addDays(dateObj, numDays) {
    return dateObj.setDate(dateObj.getDate() + numDays);
}
function toDateTime(secs) {
    let t = new Date(Date.UTC(1970, 0, 1));
    t.setUTCSeconds(secs / 1000);
    return t;
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getStandings() {
    fetch(base_url + "competitions/PL/standings", {
        method: "GET",
        headers: {
            "X-Auth-Token": API_KEY
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            const result = data.standings[0].table
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card artikel secara dinamis
            let standingsHTML = "";
            result.forEach(function (data) {
                standingsHTML += `<tr>
                    <td>${data.position}</td>
                    <td>
                        <a href="/pages/team.html?id=${data.team.id}" class="white-text truncate detail_team">
                            <img class="responsive-img hide-on-small-only" width="40" height="auto" src="${data.team.crestUrl}"> 
                            ${data.team.name}
                        </a>
                    </td>
                    <td>${data.playedGames}</td>
                    <td>${data.won}</td>
                    <td>${data.draw}</td>
                    <td>${data.lost}</td>
                    <td>${data.goalsFor}</td>
                    <td>${data.goalsAgainst}</td>
                    <td>${data.goalDifference}</td>
                    <td>${data.points}</td>
                </tr>`
            });

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.querySelector(".body-standings").innerHTML = standingsHTML;
        })
        .catch(error);
}

function getTeamById() {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var teamID = urlParams.get("id");

    fetch(base_url + `teams/${teamID}`, {
        method: "GET",
        headers: {
            "X-Auth-Token": API_KEY
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            // parsing data ke elemen HTML
            document.querySelector(".section-title").innerHTML = data.shortName;
            document.querySelector(".team-name").innerHTML = data.shortName;
            document.querySelector(".team-area").innerHTML = data.area.name;
            document.querySelector(".team-colour").innerHTML = data.clubColors;
            document.querySelector(".team-websites").innerHTML = data.website;
            document.querySelector(".team-img").src = data.crestUrl;

            // Menyusun komponen card artikel secara dinamis
            let comp = '';
            data.activeCompetitions.forEach(function (el) {
                comp += `
                    <tr>
                        <td>${el.name}</td>
                        <td>${el.area.name}</td>
                        <td>${el.lastUpdated}</td>
                    </tr>
                `;
            });
            document.getElementById("active-competitions").innerHTML = comp;

            let squad = '';
            data.squad.forEach(function (el) {
                tanggal = new Date(el.dateOfBirth);
                squad += `
                      <tr>
                        <td>${el.name} </td>
                        <td>${el.position}</td>
                        <td>${el.shirtNumber == null ? "" : el.shirtNumber}</td>
                        <td>${el.role}</td>
                        <td>${el.dateOfBirth}</td>
                        <td>${el.nationality}</td>
                    </tr>
                `;
            });
            document.getElementById("team-squad").innerHTML = squad;
        });
}

function getMatches() {
    const today = new Date();
    const day7 = toDateTime(addDays(new Date(), 7))
    let dd = getDay(today);
    let mm = getMonth(today);
    let yyyy = today.getFullYear();
    let dd7 = getDay(day7);
    let mm7 = getMonth(day7);
    let yyyy7 = day7.getFullYear();

    fetch(`${base_url}competitions/${id_liga}/matches?dateFrom=${yyyy}-${mm}-${dd}&dateTo=${yyyy7}-${mm7}-${dd7}`, {
        method: "GET",
        headers: {
            "X-Auth-Token": API_KEY
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log(data);
            // Objek/array JavaScript dari response.json() masuk lewat data.
            // Menyusun komponen card artikel secara dinamis
            let matchesHTML = "";
            result.forEach(function (data) {

            });

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.querySelector(".body-matches").innerHTML = matchesHTML;
        })
        .catch(error);
}
