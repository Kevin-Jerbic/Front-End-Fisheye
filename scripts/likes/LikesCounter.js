// Observer pattern

// Observable pour gérer le nombre de likes et notifier les observers

export class LikesCounter {
    constructor(likes) {
        this.count = likes;
        this.observers = [];
    }

    // Ajoute un observer à la liste d'observers
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Notifie tous les observers à propos d'une action, like ou unlike
    notifyObservers(action) {
        this.observers.forEach(observer => observer.update(action));
    }
}
