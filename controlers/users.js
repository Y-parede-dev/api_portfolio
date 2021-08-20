const dataBase = require("../BDD/dbConnect");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('../models/users');
const reqUser = require('../BDD/req/req.prep');


/* a placer dans un dossier destiner a la securite  */

    const isValidEmail = (value) => {
        let reGex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return reGex.test(value);
    };
    const isValidPassword = (value) => {
        let reGex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
        return reGex.test(value);
    };
/*                                                  */ 

exports.getOneAccount = (req, res, next) => {
    try{
        const idCourant = req.params.id;
        reqUser.reqSelectBdd(req, res, next, 'users', 'users.id', idCourant);
    } catch(err){
        res.status(500).json({message:"erreur serveur", error: err})
    }
};// DONE
exports.getAccount = (req, res, next) => {
    try{
        reqUser.reqSelectBdd(req, res, next, 'users')
        
    } catch(err){
        res.status(500).json({message:"erreur serveur", error:err})
    }
};// DONE
exports.createAccount = (req, res, next) => {
    try{
        const requeteBody = req.body;
        if(isValidPassword(requeteBody.pass)){
            if(isValidEmail(requeteBody.mail)){
                bcrypt.hash(requeteBody.pass, 10)
                .then(hash=> {
                    const user = new User(
                        requeteBody.nom,
                        requeteBody.prenom,
                        requeteBody.mail,
                        hash,
                        'user_base.png',
                        requeteBody.age,
                        0
                    )
                    reqUser.reqInsertIntoBdd(req, res, next, "users", user);
                })
            } else{
                return res.status(400).json({message:"Votre adresse email n'est pas valide"});
            }
        }
        else {
            return res.status(400).json({message:'mot de passe trop faible il doit contenir une lettre MAJ, une lettre min, un chiffre et un charactere spéciale, il doit également contenir entre 8 et 15 characteres au total'})
        }
    } catch(err){
        res.status(500).json({message:"erreur serveur", error:err})
    }
};// DONE
exports.deleteAccount = (req, res, next) => {
    const requeteDel = req.body;
    let deleteImgUrl = 'user_base.png';
    try {
      dataBase.query(`SELECT ?? FROM ?? WHERE ?? = ?`, ["users.img_url", "users", "users.id",req.params.id],(err, result)=>{
            if(err) {
                res.status(404).json({err});
                throw err;
            }
            else {
                if(result.length < 1){
                    return res.status(404).json({message:'users is not found on Bdd'})
                }else {
                    result.forEach(itm=>{deleteImgUrl=itm.img_url; return deleteImgUrl});
                    console.log(`deleteimg = ${deleteImgUrl}`);
                    if(deleteImgUrl == "user_base.png") {
                        console.log("Aucune image a suprimer");
                        reqUser.reqDeleteBdd(req,res,next,'users',"users.id",req.params.id);
                        return;
                    }else {
                        fs.unlink(`./assets/images/profils/users/${deleteImgUrl}`,(err, result)=>{
                            console.log(`l'image : ${deleteImgUrl} du profil de ${requeteDel.nom} a bien été suprime!`);
                            reqUser.reqDeleteBdd(req,res,next,'users',"users.id",req.params.id);
                        })
                    }
                }     
            }
        }
      )
    } catch (err) {
        res.status(500).json(err);
        throw err;
    }
};// DONE
exports.putAccount = (req, res, next) => {
    const reqUserModif = req.body;
    const idParams = req.params.id;
    const file = req.file;
    let onModif =0;
    try {  
        dataBase.query(
            `SELECT * from ?? WHERE ?? = ?`, ["users", "users.id", idParams], (err,result)=>{
                if(err){
                    res.status(400).json(err);
                }
                else{
                    let userFound = {};
                    result.forEach(element => {
                        userFound = element;
                        return userFound;
                    });
                    const updateUsers = new User(
                        reqUserModif.nom,
                        reqUserModif.prenom,
                        reqUserModif.mail,
                        reqUserModif.pass,
                        "user_base.png",
                        reqUserModif.age,
                        0
                    )
                    if(result.length!==0){
                        if((updateUsers.nom != undefined && updateUsers.nom != userFound.nom) ||
                            (updateUsers.prenom != undefined && updateUsers.prenom != userFound.prenom) ||
                            (updateUsers.age != undefined && updateUsers.age != userFound.age) ||
                            (updateUsers.mail != undefined && updateUsers.mail && updateUsers.mail != userFound.mail) ||
                            (updateUsers.pass!= undefined) ||
                            (updateUsers.img_url != undefined && updateUsers.img_url != userFound.img_url)){
                            if(updateUsers.pass){
                                onModif++
                                bcrypt.compare(updateUsers.pass, userFound.pass)
                                .then(valid=>{
                                    if(!valid){
                                        console.log(onModif)
                                        if(isValidPassword(updateUsers.pass)){
                                            bcrypt.hash(updateUsers.pass, 10)
                                                .then(hash=> {
                                                    const user = {
                                                        pass:hash
                                                    };
                                                    reqUser.reqUpdateBdd(req, res, next, "users", "users.pass", user.pass, "users.id", req.params.id);
                                                   
                                                })
                                                console.log(onModif)
                                        }else {
                                            console.log('erreur pass');
                                            return res.status(400).json({message:'mot de passe trop faible il doit contenir une lettre MAJ, une lettre min, un chiffre et un charactere spéciale, il doit également contenir entre 8 et 15 characteres au total'});;
                                        }
                                    }else{
                                        console.log("pass is same");
                                        return onModif
                                    }
                                })
                            }
                            if(updateUsers.mail){
                                if(updateUsers.mail!=userFound.mail){
                                    if(isValidEmail(updateUsers.mail)){
                                        onModif++
                                        reqUser.reqUpdateBdd(req, res, next, "users", "users.mail", updateUsers.mail, "users.id", req.params.id);
                                    }else{
                                       return res.status(400).json({message:"email non fonctionel, etes vous sur d'utiliser un email valide? "});
                                    }
                                }
                            }
                            if(updateUsers.nom){
                                if(updateUsers.nom!=userFound.nom){
                                    onModif++
                                    console.log(reqUser.reqUpdateBdd(req, res, next, "users", "users.nom", updateUsers.nom, "users.id", req.params.id))
                                    reqUser.reqUpdateBdd(req, res, next, "users", "users.nom", updateUsers.nom, "users.id", req.params.id);
                                }
                            }
                            if(updateUsers.prenom){
                                if(updateUsers.prenom!=userFound.prenom){
                                    onModif++
                                    reqUser.reqUpdateBdd(req, res, next, "users", "users.prenom", updateUsers.prenom, "users.id", req.params.id);
                                }
                            }
                            if(updateUsers.age){
                                if(updateUsers.age!=userFound.age){
                                    onModif++
                                    reqUser.reqUpdateBdd(req, res, next, "users", "users.age", updateUsers.age, "users.id", req.params.id);
                                }
                            }
                            
                            // pour la V 1.1.X metre en place un systeme de verif par email
                            
                            if(file){
                                onModif++
                                reqUser.reqUpdateBdd(req, res, next, "users", "users.img_url", file.filename, "users.id", req.params.id);
                                updateUsers.img_url = file.filename;
                                console.log("updateUsers with new file ",updateUsers);
                                fs.unlink(`./assets/images/profils/users/${userFound.img_url}`, ()=>{
                                    console.log(`${userFound.img_url} a bien été delete`);
                                });
                            }
                            console.log(onModif)
                            console.log(updateUsers)

                            if(onModif> 0 && (isValidPassword(updateUsers.pass)||updateUsers.pass==undefined)){
                              res.status(200).json({message:'utilisateur modifier'});
                            }else if((updateUsers.nom == undefined || updateUsers.nom == userFound.nom) &&
                                    (updateUsers.prenom == undefined || updateUsers.prenom == userFound.prenom) &&
                                    (updateUsers.mail == undefined || updateUsers.mail == userFound.mail) &&
                                    (updateUsers.age == undefined || updateUsers.age == userFound.age) &&
                                    updateUsers.pass == undefined ){
                                res.status(200).json({message:"aucune modification sur l'utilisateur"});
                            }
                        }
                    }else{
                        if(file){
                            updateUsers.img_url = file.filename;
                            console.log(updateUsers);
                            fs.unlink(`./assets/images/profils/users/${updateUsers.img_url}`, ()=>{
                                console.log(`${updateUsers.img_url} a été delete car l'id de cet user n'existe pas`);
                            })
                        }
                        res.status(404).json({message: "Aucun users ne porte cet ID"});
                    }
                }
            }
        )
    } catch (err) {
        res.status(500).json({message:"erreur serveur", error:err});
    }
};// DONE FOR 1.0.0 -- NEED MODIFY FOR 1.1.X

/* ----------------------------LOGIN----------------------------------- */
exports.login = (req, res, next) => {
    try {
        const userLog = req.body;
            dataBase.query(`SELECT * FROM ?? WHERE ?? = ?`, ["users","users.mail",`${userLog.mail}`],(err, result)=>{
                if(err){
                    console.log(err)
                }else {
                    if(result<1){
                        return res.status(404).json({message: "email non reconue"})
                    }else{
                        let userOnBdd;
                        result.forEach((elt)=>{
                            userOnBdd=elt;
                            return userOnBdd;
                        })
                        bcrypt.compare(userLog.pass, userOnBdd.pass)
                        .then(valid=>{
                        if(!valid){
                            return res.status(404).json({message:'vérifiez votre mot de passe'});
                        }else{
                            isCo = true;
                            res.status(200).json({
                                message:"login done",
                                isConected : isCo,
                                isAdmin: userOnBdd.admin,
                                id : userOnBdd.id,
                                password:userLog.pass,
                                token:jwt.sign(
                                    { user_id: userOnBdd.id,isAdmin: userOnBdd.admin},
                                    `${process.env.JSW_SECRET}`,
                                    {expiresIn:`${process.env.TOKEN_EXPIRE}`}
                                )
                            });
                        };
                    })
                    .catch(
                        error=>res.status(500).json(error));
                    }
                }
            });
    } catch (err) {
        res.status(500).json({message:"erreur serveur", error:err})
    }

}// DONE