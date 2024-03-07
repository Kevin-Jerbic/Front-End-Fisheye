// Test
class Api {
    constructor(url) {
        this.url = url;
    }

    async get() {
        return fetch(this.url)
            .then(res => res.json())
            .catch(err => console.log("An error occurs", err));
    }
}

export default class PhotographersApi extends Api {
    constructor(url) {
        super(url);
    }

    async getPhotographersData() {
        return await this.get();
    }
}
