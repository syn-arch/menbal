document.addEventListener("DOMContentLoaded", function () {

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
            textColor.forEach(function (el) {
                el.classList.add("black-text");
            });
        } else {
            nav.classList.add("transparent");
            nav.classList.remove("white");
            textColor.forEach(function (el) {
                el.classList.remove("black-text");
            });
        }
    });

});
