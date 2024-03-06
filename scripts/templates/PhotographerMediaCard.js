import { MediaFactory } from "../factory/MediaFactory.js";

export class PhotographerMediaCard {
    constructor(media, photographName, LikesCounter) {
        this.photographName = photographName;
        this.media = media;
        this.count = media.likes;
        this.likesCounter = LikesCounter;

        this.$mediaWrapper = document.createElement("article");
        this.$mediaWrapper.classList.add("photograph_media_item");
    }

    handleLikeButton() {
        const $heartIcon = this.$mediaWrapper.querySelector(".heart-icon");
        const $likeCount = this.$mediaWrapper.querySelector(".like-count");

        const toggleLike = () => {
            if ($heartIcon.classList.contains("liked")) {
                $heartIcon.classList.remove("liked");
                this.count--;
                this.likesCounter.notifyObservers("DEC");
            } else {
                $heartIcon.classList.add("liked");
                this.count++;
                this.likesCounter.notifyObservers("INC");
            }
            $likeCount.textContent = this.count;
        };

        $heartIcon.addEventListener("click", toggleLike);

        $heartIcon.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                toggleLike();
            }
        });
    }

    createMediaCard() {
        const mediaFactory = new MediaFactory(this.media);
        const mediaElement = mediaFactory.element;

        const mediaCard = `
      <a class="photograph_media_img" role="link" aria-label="Afficher le média dans le caroussel" title="${mediaElement.title}" href="${mediaElement.path}" >
    
      ${mediaElement.mediaHtml}
      </a>     
           
        <div class="media_footer">
          <h3 id="media-description-${mediaElement.id}">${mediaElement.title}</h3>
          <span class= "like-count" aria-label="likes">${mediaElement.likes}</span>
          <a class="heart-icon" tabindex="0" role="button" aria-label="Cliquez pour aimer cet élément">
            <em class="fas fa-heart"></em>
          </a>         
        </div>   
        <div class="footer"></div> 

     `;

        this.$mediaWrapper.innerHTML = mediaCard;
        this.handleLikeButton();

        return this.$mediaWrapper;
    }
}
