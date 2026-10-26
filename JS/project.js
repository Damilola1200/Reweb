(() => {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    /* projects js */
    const projects = {

        amore: {
            title: "Amore Homes",
            category: "RESIDENTIAL",
            status: "COMPLETED",
            location: "Abuja, Nigeria",
            year: "2026",
            type: "Residential Development",

            video: "https://res.cloudinary.com/agev009j/video/upload/v1792774512/amore_homes_by_citi_hitec.mp4",

            description:
                "Contemporary residential development designed for modern living, combining thoughtful planning, refined architectural expression and functional spaces.",

            scope: [
                "Architectural Design",
                "Construction",
                "Project Management",
                "Finishing"
            ]
        },

        Aso: {
            title: "Aso Drive Residence",
            category: "RESIDENTIAL",
            status: "COMPLETED",
            location: "Abuja, Nigeria",
            year: "2025",
            type: "Residential",

            video: "https://res.cloudinary.com/agev009j/video/upload/v1792774632/ASO_DRIVE_CITI_HI.mp4",

            description:
                "A contemporary residence combining clean architectural lines with functional living spaces and carefully considered proportions.",

            scope: [
                "Architectural Design",
                "Construction",
                "Finishing"
            ]
        },

        Maldives: {
            title: "Maldives Residence",
            category: "RESIDENTIAL",
            status: "COMPLETED",
            location: "Abuja, Nigeria",
            year: "2025",
            type: "Residential",

            video: "https://res.cloudinary.com/agev009j/video/upload/v1792774757/maldives_citi.mp4",

            description:
                "A refined residential project focused on proportion, natural light and comfortable modern living.",

            scope: [
                "Architecture",
                "Construction",
                "Interior Finishing"
            ]
        },

        Bahamas: {
            title: "Bahamas Island",
            category: "RESIDENTIAL",
            status: "COMPLETED",
            location: "Abuja, Nigeria",
            year: "2026",
            type: "Commercial Development",

            video: "https://res.cloudinary.com/agev009j/video/upload/v1792774600/BAHAMAS_CITI_HI.mp4",

            description:
                "A contemporary development currently progressing through construction with a focus on efficient planning and modern architectural expression.",

            scope: [
                "Architecture",
                "Construction",
                "Project Management"
            ]
        }

    };

    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");

    const modalVideo = document.getElementById("modalVideo");
    const modalVideoSource = document.getElementById("modalVideoSource");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalStatus = document.getElementById("modalStatus");
    const modalDescription = document.getElementById("modalDescription");
    const modalLocation = document.getElementById("modalLocation");
    const modalYear = document.getElementById("modalYear");
    const modalType = document.getElementById("modalType");
    const modalProjectStatus =
        document.getElementById("modalProjectStatus");

    const modalScope = document.getElementById("modalScope");


    /*OPEN MODAL*/

    document.querySelectorAll(".project-details").forEach(button => {

        button.addEventListener("click", () => {

            const projectId = button.dataset.project;
            const project = projects[projectId];

            if (!project) return;


            modalVideoSource.src = project.video;
            modalVideo.load();
            modalVideo.play();

            modalTitle.textContent = project.title;
            modalCategory.textContent = project.category;
            modalStatus.textContent = project.status;

            modalDescription.textContent =
                project.description;

            modalLocation.textContent =
                project.location;

            modalYear.textContent =
                project.year;

            modalType.textContent =
                project.type;

            modalProjectStatus.textContent =
                project.status;


            modalScope.innerHTML = "";

            project.scope.forEach(item => {

                const span = document.createElement("span");

                span.textContent = item;

                modalScope.appendChild(span);

            });


            modal.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /*CLOSE MODAL*/

    function closeProjectModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    modalClose.addEventListener(
        "click",
        closeProjectModal
    );


    /* CLICK BACKDROP */

    document
        .querySelector(".modal-backdrop")
        .addEventListener(
            "click",
            closeProjectModal
        );


    /* ESC KEY */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {
            closeProjectModal();
        }

    });
})();