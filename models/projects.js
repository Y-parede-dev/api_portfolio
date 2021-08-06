class modelPost  {
    constructor(user_id, nom, description, lien, img_url){
        this.user_id = user_id;
        this.nom = nom;
        this.description = description;
        this.lien = lien;
        this.img_url = img_url;
    }
}
module.exports = modelPost;