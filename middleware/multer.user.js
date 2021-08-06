//IMPORT de multer
const multer = require('multer');

//Creation des MIMES_TYPES
const MIME_TYPES = {
    'image/jpg':"jpg",
    'image/jpeg':"jpg",
    'image/png':'png',
    'image/gif':'gif'
};
// Creation du stockage pour les images des sauces envoyer par les utilisateur
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, './assets/images/profils/users')
    },
    filename: (req, file, callback)=>{
        const name = file.originalname.split(' ').join('_');
        const extention = MIME_TYPES[file.mimetype];
        callback(null, name.split('.')[0] + Date.now() + '.' + extention);
    }
}); 
module.exports = multer({ storage }).single("image");