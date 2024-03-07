import { onSelectChange } from "../utils/sorter.js";
export class SortBox {
    constructor(medias, instancePhotograph) {
        this.$wrapper = document.createElement("div");
        this.$wrapper.classList.add("sort_box_container");
        this.medias = medias;
        this.instancePhotograph = instancePhotograph;
        this.sortedButtons = ["Popularité", "Date", "Titre"];
    }

    render() {
        this.$wrapper.innerHTML = this.getSortBoxHTML();
        this.setupCustomSelect();
        return this.$wrapper;
    }

    getSortBoxHTML() {
        return ` 
        <h3> Trier par </h3>
       
        <div class="custom_select" role="menu" aria-label="Options de tri">
            <button class="select_item_selected" tabindex="0" style="display:block" aria-haspopup="true">
            Popularité
            <span class="fa-solid fa-chevron-down"></span>
             </button>
            <div class="select_items_menu" style="display:none">
                <button class="select_item" tabindex="0" role="menuitem" aria-label="Trier par popularité">
                    Popularité
                    <span class="fa-solid fa-chevron-down"></span>
                </button>
                <button class="select_item" tabindex="0"  role="menuitem" aria-label="Trier par date">                                      
                    Date
                    <span class="fa-solid fa-chevron-down"></span>                                
                </button>
                <button class="select_item" tabindex="0"  role="menuitem" aria-label="Trier par titre">
                    Titre
                    <span class="fa-solid fa-chevron-down"></span>               
                </button>
            </div>
        </div>        
    `;
    }

    // Reorders the select items in the menu bases on the selected text
    reorderSelectItems(selectedText) {
        const $selectMenu = this.$wrapper.querySelector(".select_items_menu");
        const $selectItems = $selectMenu.querySelectorAll(".select_item");

        const newOrder = this.sortedButtons.slice();

        // Put the selected item at the top of the list
        const selectedIndex = newOrder.indexOf(selectedText);
        if (selectedIndex !== -1) {
            newOrder.splice(selectedIndex, 1);
            newOrder.unshift(selectedText);
        }

        $selectMenu.innerHTML = "";
        newOrder.forEach(text => {
            const button = Array.from($selectItems).find(item => item.textContent.trim() === text);
            if (button) {
                $selectMenu.appendChild(button);
            }
        });
    }

    setupCustomSelect() {
        const $selectedButton = this.$wrapper.querySelector(".select_item_selected");
        const $selectMenu = this.$wrapper.querySelector(".select_items_menu");
        const $selectItems = $selectMenu.querySelectorAll(".select_item");

        const toggleSelectItems = () => {
            const $selectMenu = this.$wrapper.querySelector(".select_items_menu");
            const $selectItems = $selectMenu.querySelectorAll(".select_item");
            const $selectedButton = this.$wrapper.querySelector(".select_item_selected");

            // Hide all spans
            const allSpans = $selectMenu.querySelectorAll(".fa-solid");
            allSpans.forEach(span => {
                span.style.display = "none";
            });

            if ($selectMenu.style.display === "none") {
                // Display the first span when menu is open
                const firstItemSpan = $selectItems[0].querySelector(".fa-solid");
                if (firstItemSpan) {
                    firstItemSpan.style.display = "inline-block";
                }

                $selectMenu.style.display = "block";
                $selectedButton.style.display = "none";

                const $firstMenuItem = $selectMenu.querySelector(".select_item");
                if ($firstMenuItem) {
                    $firstMenuItem.focus();
                }
                const $spanArrow = $selectMenu.querySelector(".fa-solid");
                $spanArrow.classList.add("fa-rotate-180");

                document.addEventListener("click", handleOutsideClick);
                document.addEventListener("focusin", handleFocusIn);
            } else {
                $selectMenu.style.display = "none";
                $selectedButton.style.display = "block";
            }
        };

        const closeMenu = () => {
            $selectedButton.style.display = "block";
            $selectMenu.style.display = "none";
        };

        const handleEscapeKey = event => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
            }
        };

        const handleOutsideClick = event => {
            if (!$selectMenu.contains(event.target) && !$selectedButton.contains(event.target)) {
                closeMenu();
                document.removeEventListener("click", handleOutsideClick);
                document.removeEventListener("focusin", handleFocusIn);
            }
        };

        const handleFocusIn = event => {
            if (!$selectMenu.contains(event.target) && !$selectedButton.contains(event.target)) {
                closeMenu();
                document.removeEventListener("click", handleOutsideClick);
                document.removeEventListener("focusin", handleFocusIn);
            }
        };

        $selectedButton.addEventListener("click", toggleSelectItems);
        document.body.addEventListener("keydown", handleEscapeKey);

        // Update button text whith the new selected
        $selectItems.forEach(item => {
            item.addEventListener("click", () => {
                const text = item.textContent;
                const newText = text.trim();

                $selectedButton.textContent = newText;
                const spanArrow = document.createElement("span");
                spanArrow.className = "fa-solid fa-chevron-down";
                $selectedButton.appendChild(spanArrow);

                closeMenu();
                onSelectChange(newText, this.medias);
                this.reorderSelectItems(newText);
            });
        });

        const handleArrowKeys = event => {
            if ($selectMenu.style.display === "block") {
                const $selectItems = $selectMenu.querySelectorAll(".select_item");
                const currentIndex = Array.from($selectItems).indexOf(document.activeElement);

                if (event.key === "ArrowDown") {
                    event.preventDefault();
                    const nextIndex = (currentIndex + 1) % $selectItems.length;
                    $selectItems[nextIndex].focus();
                } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    const prevIndex = (currentIndex - 1 + $selectItems.length) % $selectItems.length;
                    $selectItems[prevIndex].focus();
                }
            }
        };

        document.addEventListener("keydown", handleArrowKeys);
    }
}
