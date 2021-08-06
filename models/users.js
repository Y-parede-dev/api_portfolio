/*exports.requetteBddUser = (action, table, ...emplacement) => {
    requeteSql = {
        action: action,
        table: table,
        emplacement: emplacement
    }
    return(`${requeteSql.action} ${requeteSql.table} ${requeteSql.emplacement};`) 
}
*/
class modelUser  {
    constructor(nom, prenom, mail, pass, img_url, age, admin){
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.pass = pass;
        this.img_url = img_url;
        this.age = age;
        this.admin = admin;
    }
}
module.exports = modelUser;