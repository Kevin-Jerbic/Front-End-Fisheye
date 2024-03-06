export class LikesCounter {
    constructor(likes) {
        this.count = likes;
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notifyObservers(action) {
        this.observers.forEach(observer => observer.update(action));
    }
}
