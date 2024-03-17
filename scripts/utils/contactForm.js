const displayModal = () => {
    const $modalWrapper = document.getElementById("contact_modal");
    $modalWrapper.style.display = "block";
    const $contactModal = document.querySelector(".modal");
    document.body.classList.add("modal-open");

    if ($contactModal) {
        $contactModal.focus();
        focusContactModal($contactModal);
    }
    $contactModal.addEventListener("keyup", onKeyUpContact);
}

const closeModal = () => {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    document.removeEventListener("keyup", onKeyUpContact);
}

// Gère la navigation au clavier
const focusContactModal = (form) => {
    const $contactModal = form;

    $contactModal.addEventListener("keydown", event => {
        if (event.key === "Tab") {
            const focusableElements = $contactModal.querySelectorAll("input, textarea, button");

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // Configure la navigation avec Maj + Tab (élément précédent)
            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            } else if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        }
    });
}
const onKeyUpContact = (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
}

export { displayModal, closeModal, focusContactModal, onKeyUpContact };
