import PhotographersApi from "../api/Api.js";
import { FilterData } from "../utils/FilterData.js";
import { PhotographerPageTemplate } from "../templates/PhotographerPageTemplate.js";

// Gère l'affichage de la page
class PhotographerPage {
    constructor() {
        this.$photographersWrapper = document.querySelector(".photograph_header");
        this.$photographerMediasWrapper = document.querySelector(".photograph_medias_section");
        this.$photographerMain = document.getElementById("main");
        this.$photographerModal = document.getElementById("contact_modal");
        this.$photographCarousel = document.getElementById("carousel_modal");

        // Récupère le paramètre ID passé en url
        this.params = new URL(document.location).searchParams;
        this.photographerId = parseInt(this.params.get("id"));

        // Récupère les données des photographes via le fichier JSON
        this.photographersApi = new PhotographersApi("data/photographers.json");
    }

    async main() {
        // Récupère les données depuis l'api
        const datas = await this.photographersApi.getPhotographersData();

        // Toutes les données des photographes
        const photographersDatas = datas.photographers;

        // Tous les médias des photographes
        const mediasDatas = datas.media;

        const PhotographFilter = new FilterData(this.photographerId, photographersDatas, mediasDatas);

        const PhotographById = await PhotographFilter.getDatasPhotographerById(this.photographerId);

        const MediasById = await PhotographFilter.getMediaByPhotographerId(this.photographerId);

        if (!PhotographById) {
            console.error("Photographer data not available");
            return;
        }

        const photographerName = PhotographById.name;

        const Template = new PhotographerPageTemplate(PhotographById, MediasById, photographerName);

        // Appelle des méthodes pour créer les différentes parties de la page
        Template.createPhotographHeaderContent(this.$photographersWrapper);
        Template.createPhotographSortBox(this.$photographerMediasWrapper, Template);

        Template.createPhotographMediaContent(this.$photographerMediasWrapper, "Popularité");
        Template.createPhotographBoxAbout(this.$photographerMain);
        Template.createPhotographerModal(this.$photographerModal);
        Template.createPhotographCarousel(this.$photographCarousel);
    }
    catch(error) {
        console.error("Error:", error);
    }
}

// Crée une instance et initialise la page
const pagePhotographe = new PhotographerPage();
pagePhotographe.main();
