
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    if (!body.classList.contains("about-page")) {
        return;
    }

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* 1. SCROLL REVEAL */

    const revealElements = document.querySelectorAll(
        ".about-story, " +
        ".about-purpose, " +
        ".values-intro, " +
        ".value-item"
    );

    if (!reduceMotion && "IntersectionObserver" in window) {
        body.classList.add("js-reveal");

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -25px 0px"
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    document.querySelectorAll(
        '.about-page a[href^="#"]'
    ).forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

            if (history.replaceState) {
                history.replaceState(null, "", href);
            }
        });
    });

    document.querySelectorAll(
        ".about-page img"
    ).forEach((img) => {
        img.addEventListener("error", () => {
            // Don't replace an image more than once.
            if (img.dataset.fallbackApplied === "true") {
                return;
            }

            img.dataset.fallbackApplied = "true";

            // Decorative background images should not display broken icons.
            img.style.display = "none";

            const container = img.parentElement;

            if (container) {
                container.classList.add("image-unavailable");
            }
        });
    });

});
