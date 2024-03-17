export class Media {
    constructor(data, photographerName) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        this._photographerName = photographerName;

        if (data.image !== undefined) {
            this._image = data.image;
        }
        if (data.video !== undefined) {
            this._video = data.video;
        }
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }

    // Retourne le chemin d'un fichier (image ou video) en fonction du type
    getFile(type) {
        if (type === "image" || type === "video") {
            let file = "";
            if (this[`_${type}`]) {
                // Récupère le 1er mot (prénom du photographe) en divisant la chaine '_photographerFirstName' en mots
                let photographerFirstName = this._photographerName.split(" ")[0];
                
                file = `./assets/photographers/${photographerFirstName}/${this[`_${type}`]}`;
            }
            return file;
        }
        return "";
    }

    get image() {
        return this.getFile("image");
    }

    get video() {
        return this.getFile("video");
    }
}
