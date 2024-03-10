import PhotographersApi from "../api/Api.js";
import { FilterData } from "../utils/FilterData.js";
import { PhotographerPageTemplate } from "../templates/PhotographerPageTemplate.js";

class PhotographerPage {
    constructor() {
        this.$photographersWrapper = document.querySelector(".photograph_header");
        this.$photographerMediasWrapper = document.querySelector(".photograph_medias_section");
        this.$photographerMain = document.getElementById("main");
        this.$photographerModal = document.getElementById("contact_modal");
        this.$photographCarousel = document.getElementById("carousel_modal");

        // Retrieves the ID parameter passed on the page
        this.params = new URL(document.location).searchParams;
        this.photographerId = parseInt(this.params.get("id"));

        // Instance of the PhotographersApi class for fetching photographer data from the specified JSON file.
        this.photographersApi = new PhotographersApi("data/photographers.json");
    }

    async main() {
        // Get data from API
        const datas = await this.photographersApi.getPhotographersData();

        // All "photographers" data
        const photographersDatas = datas.photographers;

        // All "media" data
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

        // Call the methods of the class for creating each visual part of the page
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

// Create an instance of PhotographerPage and initialize the page
const pagePhotographe = new PhotographerPage();
pagePhotographe.main();
