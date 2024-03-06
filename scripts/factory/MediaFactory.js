import { Video } from "../models/Video.js";
import { Image } from "../models/Image.js";

export class MediaFactory {
    constructor(data) {
        if (data.video) {
            this.media = new Video(data);
        } else if (data.image) {
            this.media = new Image(data);
        } else {
            throw new Error("no media type found");
        }
    }
    get element() {
        return this.media;
    }
}
