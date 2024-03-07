export class FilterData {
    constructor(photographID, dataPhotographer, dataMedia) {
        this.photographID = photographID;
        this.photographerData = dataPhotographer;
        this.photographerMedia = dataMedia;
    }

    // Get data of a specific photographer based on their ID
    async getDatasPhotographerById(photographerId) {
        const photographers = this.photographerData;
        const photographer = photographers.find(p => p.id === photographerId);
        if (photographer) {
            return photographer;
        } else {
            throw new Error("Photographer not found");
        }
    }

    // Get media associated with a specific photographer based on their ID 
    async getMediaByPhotographerId(photographerId) {
        const mediaData = this.photographerMedia;

        const photographerMedia = mediaData.filter(media => media.photographerId === photographerId);

        if (photographerMedia) {
            return photographerMedia;
        } else {
            throw new Error("Media not found");
        }
    }
}
