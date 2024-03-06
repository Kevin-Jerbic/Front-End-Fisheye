export class LikesDisplay {
    constructor(likesCount, domElm) {
        this.count = likesCount;
        this.$countDisplay = domElm;
    }

    update(action) {
        if (action === "INC") {
            this.count += 1;
        } else if (action === "DEC") {
            this.count -= 1;
        } else {
            throw "Unknow action";
        }

        this.$countDisplay.textContent = this.count;
    }
}
