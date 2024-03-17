import PhotographersApi from "../api/Api.js";
import { Photographer } from "../models/Photographer.js";
import { IndexPhotographerCard } from "../templates/IndexPhotographerCard.js";

// Gère l'affichage des cartes de photographes sur la page
class Index {
    constructor() {
        this.$photographersWrapper = document.querySelector(".photographer_section");

        // Récupère les données des photographes à partir du fichier JSON
        this.photographersApi = new PhotographersApi("data/photographers.json");
    }

    async main() {
        // Récupère les données depuis l'api
        const photographersData = await this.photographersApi.getPhotographersData();

        const photographers = photographersData.photographers; 

        photographers
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
                const Template = new IndexPhotographerCard(photographer);
                this.$photographersWrapper.appendChild(Template.createPhotographerCard());
            });
    }
}

// Crée une instance et initialise la page
const index = new Index();
index.main();
