import { Carousel } from "../templates/Carousel.js";

let carouselInstance;

// Gère la navigation au clavier sur 3 touches
const onKeyUp = (e) => {
    if (e.key === "Escape") {
        closeCarousel();
    } else if (e.key === "ArrowLeft") {
        carouselInstance.showPreviousImage(e);
    } else if (e.key === "ArrowRight") {
        carouselInstance.showNextImage(e);
    }
}

// Affichage du carroussel avec le média choisi
const displayCarousel = (href, title, parent, gallery, galleryTitle) => {
    const $carouselWrapper = document.getElementById("carousel_modal");
    $carouselWrapper.style.display = "block";
    document.body.classList.add("modal-open");

    carouselInstance = new Carousel(href, title, gallery, galleryTitle);
    parent.appendChild(carouselInstance.render());

    const $modal = document.querySelector(".carousel_content");

    if ($modal) {
        $modal.focus();
        focusCarouselModal($modal);
    }
}

const closeCarousel = () => {
    const $carousel = document.getElementById("carousel_modal");
    $carousel.style.display = "none";
    document.body.classList.remove("modal-open");
    document.removeEventListener("keyup", onKeyUp);
}

// Gère le focus du carroussel pour permettre une bonne navigation au clavier avec Tab
const focusCarouselModal = (modal) => {
    const $carouselModal = modal;

    $carouselModal.addEventListener("keydown", event => {
        if (event.key === "Tab") {
            const focusableElements = $carouselModal.querySelectorAll("button");
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // Configure la navigation avec Maj + Tab (élément précédent)
            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            } else if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        }
    });
}

export { onKeyUp, displayCarousel, closeCarousel, focusCarouselModal };
