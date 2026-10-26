document.addEventListener("DOMContentLoaded", () => {


    // LOAD NAVBAR

    fetch("components/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Navbar could not be loaded");
            }

            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            initializeNavbar();
        })
        .catch(error => {
            console.error("Navbar error:", error);
        });



    // LOAD FOOTER


    fetch("components/footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Footer could not be loaded");
            }

            return response.text();
        })
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        })
        .catch(error => {
            console.error("Footer error:", error);
        });

});



// NAVBAR

function initializeNavbar() {

    const navbar = document.getElementById("navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const hero = document.getElementById("hero");
    const isHome = document.body.classList.contains("home");

    if (!navbar) return;



    // MOBILE MENU


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");

        });


        // Close menu when a link is clicked

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

            });

        });

    }


    // NAVBAR SCROLL EFFECT
    if (!hero) {
        navbar.classList.add("solid");
        navbar.classList.remove("at-top", "scrolled");
        document.body.classList.add("inner-page");
        return;
    }

    function updateNavbar() {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Make navbar solid after leaving hero
        if (hero.getBoundingClientRect().bottom <= navbar.offsetHeight) {
            navbar.classList.add("solid");
        } else {
            navbar.classList.remove("solid");
        }

        // Transparent only at very top
        if (window.scrollY <= 5) {
            navbar.classList.add("at-top");

        } else {
            navbar.classList.remove("at-top");
        }
    }
    window.addEventListener("scroll", updateNavbar);
    updateNavbar();
}
// NAVBAR animation //
const navbar = document.querySelector(".navbar");
if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

let lastY = window.scrollY;
window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle("nav-hidden", y > lastY && y > 120);
    lastY = y;
}, { passive: true });