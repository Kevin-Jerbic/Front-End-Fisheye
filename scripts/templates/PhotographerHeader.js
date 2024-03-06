export class PhotographerHeader {
    constructor(photographer) {
        this.photographer = photographer;
    }
    render() {
        //const photographerData = new Photographer(this.photographer);
        const photographerData = this.photographer;

        const photographHeader = `
        <div class="photographer_infos_container" data-testid="photographer-infos-container">
          <h1>${photographerData.name}</h1>
          <h2>${photographerData.city}, ${this.photographer.country}</h2>
          <p>${photographerData.tagline}</p>
        </div>  
        <div class="photographer_button_container">
           <button class="contact_button" aria-labelledby="contact-name" >Contactez-moi</button>
        </div>   
        <div class="photographer_profil_container" data-testid="photographer-profil-container">  
          <img          
                alt="${photographerData.name}"
                src="${photographerData.portrait}"            
            /> 
        </div>          
         `;

        return photographHeader;
    }
}
