(function () {
    const loader = document.getElementById("pageLoader");
    if (!loader) return;

    const body = document.body;
    const isHome = body.classList.contains("home");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const firstVisit = true;
    const minTime = 2800;

    body.classList.add("anim");
    body.style.setProperty("--hero-delay", firstVisit ? "0.45s" : "0.25s");
    if (firstVisit) loader.classList.add("intro");

    const loaded = new Promise(resolve => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", resolve, { once: true });
    });
    const minimum = new Promise(resolve => setTimeout(resolve, minTime));
    const failsafe = new Promise(resolve => setTimeout(resolve, 4000));

    Promise.race([Promise.all([loaded, minimum]), failsafe]).then(() => {
        if (firstVisit) sessionStorage.setItem("introPlayed", "1");
        loader.classList.add("hide");
        body.classList.add("page-ready");
    });

    // Slide the panel in before leaving the page
    document.addEventListener("click", e => {
        const link = e.target.closest("a");
        if (!link || reduceMotion) return;

        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
        if (link.target === "_blank" || link.hasAttribute("download")) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (link.origin !== location.origin) return;
        if (link.pathname === location.pathname && link.search === location.search) {
            e.preventDefault();   // stop the pointless reload
            return;
        }
        e.preventDefault();
        loader.classList.add("leaving");
        setTimeout(() => { window.location.href = link.href; }, 600);
    });

    // Browser back button restores the page from cache
    window.addEventListener("pageshow", e => {
        if (e.persisted) {
            loader.classList.remove("leaving");
            loader.classList.add("hide");
            body.classList.add("page-ready");
        }
    });
})();