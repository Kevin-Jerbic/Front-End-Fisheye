import { PhotographerHeader } from "./PhotographerHeader.js";
import { Media } from "../models/Media.js";
import { SortBox } from "./SortBox.js";
import { PhotographerMediaCard } from "./PhotographerMediaCard.js";
import { LikesCounter } from "../likes/LikesCounter.js";
import { LikesDisplay } from "../likes/LikesDisplay.js";
import { AboutBox } from "./AboutBox.js";
import { Modal } from "./ContactModal.js";
import { sortBy } from "../utils/sorter.js";
import { displayCarousel } from "../utils/carousel.js";
import { displayModal } from "../utils/contactForm.js";
import { Photographer } from "../models/Photographer.js";

export class PhotographerPageTemplate {
    constructor(photographer, medias, photographerName) {
        this.photographer = photographer;
        this.medias = medias;
        this.photographerName = photographerName;
        this.$countDisplay = null;

        // Nombre total de likes
        this.likes = this.medias.map(media => media.likes).reduce((a, b) => a + b, 0);

        // Observable & Observer
        this.counterLikes = new LikesCounter(this.likes);
        this.displayLikes = null;
    }

    createPhotographHeaderContent(parent) {
        const photographerData = new Photographer(this.photographer);
        const Template = new PhotographerHeader(photographerData);
        parent.innerHTML = Template.render();

        const $contact_button = document.querySelector(".contact_button");
        $contact_button.addEventListener("click", displayModal);
    }

    // Filtre
    createPhotographSortBox(parent, instancePhotograph) {
        const Template = new SortBox(instancePhotograph);
        const sortBoxElement = Template.render();
        parent.appendChild(sortBoxElement);
    }

    createPhotographMediaContent(parent, selectValue) {
        const sortedMedias = sortBy(selectValue, this.medias);
        const $parentContainer = document.getElementById("carousel_modal");

        sortedMedias
            .map(media => new Media(media, this.photographerName))
            .forEach(media => {
                const Template = new PhotographerMediaCard(media, this.photographerName, this.counterLikes, this.medias);
                parent.appendChild(Template.createMediaCard());
            });

        this.createPhotographCarousel($parentContainer);
    }

    createPhotographBoxAbout(parent) {
        const Template = new AboutBox(this.likes, this.photographer.price);
        const renderedTemplate = Template.render();
        parent.appendChild(renderedTemplate);

        // L'élément DOM qui affiche le nombre de likes
        this.$countDisplay = renderedTemplate.querySelector(".likes-counter");

        // Mise à jour des likes (like, unlike)
        this.displayLikes = new LikesDisplay(this.likes, this.$countDisplay);

        // Relie le nombre de like à celui d'afficher
        this.counterLikes.subscribe(this.displayLikes);
    }

    createPhotographerModal(parent) {
        const Template = new Modal(this.photographerName);
        parent.appendChild(Template.render());
    }

    // Recherche les liens avec un type image ou video + Affichage carousel si click
    createPhotographCarousel(parent) {
        const links = Array.from(document.querySelectorAll(`a[href$=".jpg"], a[href$=".mp4"]`));
        const gallery = [];
        const galleryTitle = [];

        // Récupère le href et le titre des médias
        links.forEach(link => {
            const href = link.getAttribute("href");
            const title = link.getAttribute("title");

            if (href && title) {
                gallery.push(href);
                galleryTitle.push(title);

                // Affichage carousel si un lien est cliqué
                link.addEventListener("click", e => {
                    e.preventDefault();
                    displayCarousel(href, title, parent, gallery, galleryTitle);
                });
            }
        });
    }
}
