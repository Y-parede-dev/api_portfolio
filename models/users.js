exports.requetteBddUser = (action, table, ...emplacement) => {
    requeteSql = {
        action: action,
        table: table,
        emplacement: emplacement
    }
    return(`${requeteSql.action} ${requeteSql.table} ${requeteSql.emplacement};`) 
}

class modelUser  {
    constructor(nom, prenom, mail, age, pass, img_url, admin){
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.age = age;
        this.pass = pass;
        this.img_url = img_url;
        this.admin = admin;
    }
}
module.exports = modelUser;