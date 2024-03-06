import { closeModal } from "../utils/contactForm.js";

export class Modal {
    constructor(photographerName) {
        this.name = photographerName;
    }

    render() {
        const $photographerModal = document.createElement("div");
        $photographerModal.classList.add("modal");
        $photographerModal.setAttribute("tabindex", "-1");
        $photographerModal.setAttribute("role", "dialog");
        $photographerModal.setAttribute("aria-modal", "true");
        $photographerModal.setAttribute("aria-label", "formulaire de contact");

        const photographModalContent = `
    <div role="dialog" aria-labelledby="contact-name">
        <h2 id="contact-name">Contactez-moi <br> ${this.name}</h2>
        <button class="contact_close_button" role="button" aria-label="Cliquez pour fermer le formulaire de contact" data-testid="modal_button_close">        
          <span class="sr-only">Fermer le formulaire de contact</span>
        </button> 
    </div>
    <form id="myForm" action="#" method="post">
          <label id="label-prenom" for="prenom" data-testid="prenom-label">Prénom</label>
          <input type="text" id="prenom" name="prenom" required aria-required="true" aria-labelledby="label-prenom" placeholder="Veuillez saisir votre prénom">
          
          <label id="label-nom" for="nom" data-testid="nom-label">Nom</label>
          <input type="text" id="nom" name="nom" required aria-required="true" aria-labelledby="label-nom" placeholder="Veuillez saisir votre nom">
          
          <label id="label-email" for="email" data-testid="email-label">Email</label>
          <input type="email" id="email" name="email" required aria-required="true" aria-labelledby="label-email" placeholder=" Veuillez saisir votre email">
          
          <label id="label-message" for="message" data-testid="message-label">Votre message</label>
          <textarea id="message" name="message" required aria-required="true" aria-labelledby="label-message" placeholder="Veuillez saisir votre message"></textarea>
          
          <button class="contact_button send_button" aria-label="Cliquez pour envoyer le formulaire">Envoyer</button>
      </form>
   
    `;
        $photographerModal.innerHTML = photographModalContent;

        $photographerModal.querySelector(".send_button").addEventListener("click", this.handleFormSubmit.bind(this));
        $photographerModal.querySelector(".contact_close_button").addEventListener("click", closeModal);

        return $photographerModal;
    }

    // A peaufiner si nécessaire.
    // Sinon récupérer code projet précédent
    handleFormSubmit(event) {
        event.preventDefault();

        const $form = document.getElementById("myForm");

        const prenomValue = document.querySelector("#prenom").value;
        const nomValue = document.querySelector("#nom").value;
        const emailValue = document.querySelector("#email").value;
        const messageValue = document.querySelector("#message").value;

        if (prenomValue && nomValue && emailValue && messageValue) {
            console.log("Prénom:", prenomValue);
            console.log("Nom:", nomValue);
            console.log("Email:", emailValue);
            console.log("Message:", messageValue);

            alert(`votre message : "${messageValue}" est envoyé à ${this.name}!`);
            $form.reset();
            closeModal();
        } else {
            alert("Veuillez remplir tous les champs");
        }
    }
}
