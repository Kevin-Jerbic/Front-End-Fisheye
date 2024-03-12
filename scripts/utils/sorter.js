const sortBy = (selectValue, medias) => {
    let arr = medias.slice();

    switch (selectValue) {
        case "Popularité":
            arr.sort((a, b) => b.likes - a.likes);
            break;
        case "Date":
            arr.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            });
            break;
        case "Titre":
            arr.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
    }

    return arr;
}

const onSelectChange = (selectElement, instancePhotograph) => {
    let $parentContainer = document.querySelector(".photograph_medias_section");
    let $articles = document.querySelectorAll(".photograph_media_item");

    // Remove all existing articles from the media section
    $articles.forEach(article => {
        article.remove();
    });
    // Creates new articles based on the selection
    instancePhotograph.createPhotographMediaContent($parentContainer, selectElement);
}

export { sortBy, onSelectChange };
