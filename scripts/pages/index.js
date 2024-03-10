import PhotographersApi from "../api/Api.js";
import { Photographer } from "../models/Photographer.js";
import { IndexPhotographerCard } from "../templates/IndexPhotographerCard.js";

class Index {
    constructor() {
        this.$photographersWrapper = document.querySelector(".photographer_section");

        // Instance of the PhotographersApi class for fetching photographer data from the specified JSON file.
        this.photographersApi = new PhotographersApi("data/photographers.json");
    }

    async main() {
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
const index = new Index();
index.main();
