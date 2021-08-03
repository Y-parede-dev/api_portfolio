class modelPost  {
    constructor(user_id, nom, lien, description, img_url){
        this.user_id = user_id;
        this.nom = nom;
        this.lien = lien;
        this.description = description;
        this.img_url = img_url;
    }
}
module.exports = modelPost;