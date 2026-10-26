document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Run only on the Services page.
    if (!body.classList.contains("services-page")) {
        return;
    }

    const revealElements = document.querySelectorAll(
        ".overview-heading, " +
        ".service-row, " +
        ".services-approach, " +
        ".services-cta"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        !reducedMotion &&
        "IntersectionObserver" in window
    ) {
        body.classList.add("js-reveal");

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Keep all content visible if animations are unsupported.
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    const internalLinks = document.querySelectorAll(
        '.services-page a[href^="#"]'
    );

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

            // Keep the URL in sync with the destination.
            if (history.replaceState) {
                history.replaceState(null, "", targetId);
            }
        });
    });

    if (window.location.hash) {
        const targetId = window.location.hash;

        window.addEventListener("load", () => {
            const target = document.querySelector(targetId);

            if (target) {
                window.setTimeout(() => {
                    target.scrollIntoView({
                        behavior: "auto",
                        block: "start"
                    });
                }, 100);
            }
        }, { once: true });
    }

    const serviceImages = document.querySelectorAll(
        ".service-visual img"
    );

    serviceImages.forEach((img) => {
        img.addEventListener("error", () => {
            const figure = img.closest(".service-visual");

            if (!figure) {
                return;
            }

            // Avoid repeatedly processing the same failed image.
            if (figure.dataset.imageFailed === "true") {
                return;
            }

            figure.dataset.imageFailed = "true";
            figure.classList.add("image-unavailable");

            // Keep the layout intact when an image is missing.
            img.style.display = "none";

            const fallback = document.createElement("div");
            fallback.className = "service-image-fallback";
            fallback.textContent = "CITI-HI-TECH CONSTRUCTION";

            figure.prepend(fallback);
        });
    });

});
