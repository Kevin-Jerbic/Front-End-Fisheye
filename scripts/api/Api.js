// Déclaration de la classe
// Une classe commence par une majuscule
class Api {
    // Le constructeur a un paramètre
    // C'est une méthode qui permet de créer et d'initialiser les objets
    constructor(url) {
        this.url = url;
    }

    async get() {
        return fetch(this.url)
            .then(res => res.json())
            .catch(err => console.log("An error occurs", err));
    }
}

// Créer une sous-classe avec extends
export default class PhotographersApi extends Api {
    constructor(url) {
        // Si on déclare un constructeur dans une classe enfant, on doit utiliser super() avant this.
        // super() appelle le constructeur parent avec le paramètre
        super(url);
    }

    async getPhotographersData() {
        return await this.get();
    }
}
