import { Carousel } from "../templates/Carousel.js";

let carouselInstance;

// Handles the keyup event for the carousel
function onKeyUp(e) {
    if (e.key === "Escape") {
        closeCarousel();
    } else if (e.key === "ArrowLeft") {
        carouselInstance.showPreviousImage(e);
    } else if (e.key === "ArrowRight") {
        carouselInstance.showNextImage(e);
    }
}

// Displays a carousel modal with specified content
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

function closeCarousel() {
    const $carousel = document.getElementById("carousel_modal");
    $carousel.style.display = "none";
    document.body.classList.remove("modal-open");
    document.removeEventListener("keyup", onKeyUp);
}

// Set up keyboard navigation within a carousel modal.
function focusCarouselModal(modal) {
    const $carouselModal = modal;

    $carouselModal.addEventListener("keydown", event => {
        if (event.key === "Tab") {
            const focusableElements = $carouselModal.querySelectorAll("button");
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

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
