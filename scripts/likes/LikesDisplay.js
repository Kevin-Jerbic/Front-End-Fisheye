export class LikesDisplay {
    constructor(likesCount, domElm) {
        // Nombre de likes
        this.count = likesCount;
        // L'élément DOM où le nombre de likes sera affiché
        this.$countDisplay = domElm;
    }

    // Mise à jour des likes
    update(action) {
        if (action === "INC") {
            this.count += 1;
        } else if (action === "DEC") {
            this.count -= 1;
        } else {
            throw "Unknow action";
        }

        // Affichage des likes dans le DOM
        this.$countDisplay.textContent = this.count;
    }
}
