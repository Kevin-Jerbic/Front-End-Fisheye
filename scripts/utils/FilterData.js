export class FilterData {
    constructor(photographID, dataPhotographer, dataMedia) {
        this.photographID = photographID;
        this.photographerData = dataPhotographer;
        this.photographerMedia = dataMedia;
    }

    // Récupère les données d'un photographe en fonction de l'ID
    async getDatasPhotographerById(photographerId) {
        const photographers = this.photographerData;
        const photographer = photographers.find(p => p.id === photographerId);
        if (photographer) {
            return photographer;
        } else {
            throw new Error("Photographer not found");
        }
    }

    // Récupère les médias associés à un photographe spécifique
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
