import { onKeyUp, closeCarousel } from "../utils/carousel.js";
export class Carousel {
    constructor(url, title, gallery, galleryTitle) {
        this.url = url;
        this.title = title;
        this.gallery = gallery;
        this.galleryTitle = galleryTitle;

        this.currentIndex = gallery.indexOf(url);

        this.$wrapper = document.querySelector(".carousel_content");
        document.addEventListener("keyup", onKeyUp);

        if (!this.$wrapper) {
            this.$wrapper = document.createElement("div");
            this.$wrapper.classList.add("carousel_content");
            this.$wrapper.setAttribute("tabindex", "-1");
            this.$wrapper.setAttribute("role", "dialog");
            this.$wrapper.setAttribute("aria-modal", "true");
            this.$wrapper.setAttribute("aria-label", "vue rapprochée de l'image");
        }
    }
    render() {
        const $carouselElements = `
          <button class="carousel_prev" aria-label="Image précédente" tabindex="0">
            <span class="sr-only">Précedente</span>      
          </button>             
          <button class="carousel_next" aria-label="Image suivante" tabindex="0">
            <span class="sr-only">Suivante</span>
          </button>    
          <button class="carousel_close" aria-label="Fermer la vue rapprochée" tabindex="0">
            <span class="sr-only">Fermer</span>
          </button>          
          <div class="carousel_media_container">      
          </div>
          `;

        this.$wrapper.innerHTML = $carouselElements;

        this.showImage(this.url, this.galleryTitle);

        this.$wrapper.querySelector(".carousel_next").addEventListener("click", this.showNextImage.bind(this));
        this.$wrapper.querySelector(".carousel_prev").addEventListener("click", this.showPreviousImage.bind(this));

        this.$wrapper.querySelector(".carousel_close").addEventListener("click", closeCarousel);

        return this.$wrapper;
    }

    showPreviousImage(e) {
        e.preventDefault();
        this.currentIndex -= 1;
        if (this.currentIndex < 0) {
            this.currentIndex = this.gallery.length - 1;
        }
        this.url = this.gallery[this.currentIndex];
        this.showImage(this.url, this.galleryTitle[this.currentIndex]);
    }

    showNextImage(e) {
        e.preventDefault();
        this.currentIndex += 1;
        if (this.currentIndex >= this.gallery.length) {
            this.currentIndex = 0;
        }
        this.url = this.gallery[this.currentIndex];
        this.showImage(this.url, this.galleryTitle[this.currentIndex]);
    }

    showImage(url, title) {
        {
            const container = this.$wrapper.querySelector(".carousel_media_container");
            title = this.galleryTitle[this.currentIndex];

            container.innerHTML = "";

            if (url.endsWith(".mp4")) {
                const video = document.createElement("video");
                video.controls = true;
                video.autoplay = false;

                const source = document.createElement("source");
                source.src = url;
                source.type = "video/mp4";
                video.appendChild(source);
                container.appendChild(video);
                video.setAttribute("tabindex", "0");
            } else {
                const image = document.createElement("img");
                image.src = url;
                image.alt = title;
                container.appendChild(image);
            }

            const titleMedia = document.createElement("h3");
            titleMedia.textContent = title;
            container.appendChild(titleMedia);
        }
    }
}
