document.addEventListener("DOMContentLoaded", function () {

    // install & active service worker
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
            .register("/sw.js")
            .then(function () {
                console.log("pendaftaran serviceWorker berhasil");
            })
            .catch(function (e) {
                console.log("pendaftaran serviceWorker gagal : " + e)
            });
        });
    } else {
        console.log("serviceWorker belum didukung oleh browser ini");
    }

    // mobile navbar
    const navMoblie = document.querySelectorAll(".sidenav");
    M.Sidenav.init(navMoblie);

    // toggle navbar
    window.addEventListener("scroll", function () {
        const heightTop = window.pageYOffset;
        const nav = document.querySelector("nav");
        const textColor = document.querySelectorAll(".toggle-scroll-color");

        if (heightTop > 65) {
            nav.classList.remove("transparent");
            nav.classList.add("white");
            nav.classList.add("z-depth-1");
            nav.classList.remove("z-depth-0");
            textColor.forEach(function (el) {
                el.classList.add("black-text");
            });
        } else {
            nav.classList.add("transparent");
            nav.classList.remove("white");
            nav.classList.remove("z-depth-1");
            nav.classList.add("z-depth-0");
            textColor.forEach(function (el) {
                el.classList.remove("black-text");
            });
        }
    });

    // click action navbar
    const navLink = document.querySelectorAll(".sidenav a, .topnav a");
    navLink.forEach(function (el) {
        el.addEventListener("click", function (e) {
            // close side navbar
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // load content
            const link = e.target.getAttribute("href").substr(1);
            loadPage(link);
            
        });
    });

    // load page

    function loadPage(page) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                const content = document.querySelector("#app");
                if (this.status == 200) {
                    content.innerHTML = xhr.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhr.open("GET", `pages/${page}.html`, true);
        xhr.send();

        if (page == "home") {
            getStandings();
        }

        if (page == "team") {
            getTeamById();
        }

        if (page == "scores") {
            getScores();
        }
        

        if (page == "favourite") {
            getFavourites();
        }
        

    }

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    

});
