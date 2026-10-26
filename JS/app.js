
const projectsSlider = document.querySelector(".projects-slider");
const projectSlides = document.querySelectorAll(".project-slide");

const prevProject = document.getElementById("prevProject");
const nextProject = document.getElementById("nextProject");

const currentProject = document.getElementById("currentProject");
const projectProgress = document.getElementById("projectProgress");

let projectIndex = 0;

function updateProjects() {

    const slideWidth = projectSlides[0].offsetWidth + 25;

    projectsSlider.scrollTo({
        left: projectIndex * slideWidth,
        behavior: "smooth"
    });

    if (window.innerWidth <= 768) {
        currentProject.textContent = `${projectIndex + 1}`;
    } else {
        currentProject.textContent =
            `${projectIndex + 1}–${Math.min(projectIndex + 2, 4)}`;
    }

    const progress =
        ((projectIndex + 1) / projectSlides.length) * 100;

    projectProgress.style.width = `${progress}%`;
}


nextProject.addEventListener("click", () => {

    if (projectIndex < projectSlides.length - 2) {
        projectIndex++;
        updateProjects();
    }

});


prevProject.addEventListener("click", () => {

    if (projectIndex > 0) {
        projectIndex--;
        updateProjects();
    }

});
