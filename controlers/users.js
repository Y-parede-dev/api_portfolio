const dataBase = require("../BDD/dbConnect");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const requetUser = require('../models/users');
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
    
        dataBase.query(
            requetUser.requetteBddUser(`SELECT * `, `FROM users `, `WHERE id=?`), idCourant, (err, result)=>{
                if(err){
                    res.status(404).json({message:'GET EST BOGGER'});
                    throw err;
                }else{
                    if(result<1){
                        res.status(404).json({message:"aucun user avec cet ID"});
                        return;
                    }else{
                        res.status(200).json({message:'tout est ok sur le get one account', result});

                    }
                    /*** Déboguage ***/ 
                    console.log(result);
                };
            }
        )
    } catch(err){
        res.status(500).json({message:"erreur serveur", error: err})
    }
}
exports.getAccount = (req, res, next) => {
    try{
        dataBase.query(
            requetUser.requetteBddUser(`SELECT * `, `FROM users`), (err, result)=>{
                if(err){
                    res.status(404).json({message:'GET ALL ACCOUNT EST BOGGER'});
                    throw err;
                }else{
                    res.status(200).json({message:'tout est ok sur le get all account', result});
                    /*** Déboguage ***/ 
                    console.log(result);
                    console.log(result.length);
                };
            }
        )
    } catch(err){
        res.status(500).json({message:"erreur serveur", error:err})
    }
}
exports.createAccount = (req, res, next) => {
    try{
        const requeteBody = req.body;
        console.log(requeteBody);
        if(isValidPassword(requeteBody.pass)){
            if(isValidEmail(requeteBody.mail)){
                bcrypt.hash(requeteBody.pass, 10)
                .then(hash=> {
                    const user = {
                        mail: requeteBody.mail,
                        nom: requeteBody.nom,
                        prenom: requeteBody.prenom,
                        age: requeteBody.age,
                        pass:hash,
                        admin:0
                    };
                    dataBase.query(
                        requetUser.requetteBddUser('INSERT INTO','users' ,'SET ?'), user, (err, result)=>{
                            if(err){
                                res.status(404).json({err})
                                throw err;
                            }
                            else {
                                res.status(201).json({message:'tout est ok utilisateur crée'});
                                return;
                            }
                        }
                    )
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
}
exports.deleteAccount = (req, res, next) => {
    try {
        const requeteBody = req.body;
        dataBase.query(
            requetUser.requetteBddUser(`DELETE`,`FROM users`,`WHERE id = ?`),req.params.id,(err,result)=>{
            if(err){
                res.status(400).json({message: "Erreur sur la supression", err});
                throw err;
            }
            else{
                res.status(204).json();
                return;
            }
        })    
    } catch (err) {
        res.status(500).json({message:"erreur serveur", error:err})
    }
}
exports.putAccount = (req, res, next) => {
    try {  
        const reqUserModif = req.body;
        const idParams = req.params.id;

        dataBase.query(
            `SELECT * from users WHERE id =?`, idParams, (err,result)=>{
                if(err){
                    res.status(400).json(err);
                }
                else{
                    //res.status(200).json({message:'modif ok', result})
                // console.log(result, typeof(result))
                    let userFound = {};
                    result.forEach(element => {
                        userFound = element;
                        return userFound;
                    });
                    
                    if((reqUserModif.nom != undefined && reqUserModif.nom != userFound.nom) || (reqUserModif.prenom != undefined && reqUserModif.prenom != userFound.prenom) ||
                       (reqUserModif.age != undefined && reqUserModif.age != userFound.age) || (reqUserModif.mail != undefined && reqUserModif.mail && reqUserModif.mail != userFound.mail) || (reqUserModif.pass!= undefined)){
                        if(reqUserModif.nom){
                            dataBase.query(`UPDATE users set users.nom = "${reqUserModif.nom}" WHERE users.id=${reqUserModif.id}`)
                        }
                        if(reqUserModif.prenom){
                            dataBase.query(`UPDATE users set users.prenom = "${reqUserModif.prenom}" WHERE users.id=${reqUserModif.id}`)
                        }
                        if(reqUserModif.age){
                            dataBase.query(`UPDATE users set users.age = "${reqUserModif.age}" WHERE users.id=${reqUserModif.id}`)
                        }
                        // NE PAS OUBLIER LA VERIF DU MAIL 
                        if(reqUserModif.mail){
                            dataBase.query(`UPDATE users set users.mail = "${reqUserModif.mail}" WHERE users.id=${reqUserModif.id}`)
                        }
                        if(reqUserModif.pass){
                            bcrypt.compare(reqUserModif.pass, userFound.pass)
                            .then(valid=>{
                                if(!valid){
                                    if(isValidPassword(reqUserModif.pass)){
                                        bcrypt.hash(reqUserModif.pass, 10)
                                            .then(hash=> {
                                                const user = {
                                                    pass:hash
                                                };
                                                dataBase.query(
                                                    `UPDATE users set users.pass = "${user.pass}" WHERE users.id=${reqUserModif.id}`
                                                )
                                            })
                                    }else {
                                        return res.status(400).json({message:'mot de passe trop faible il doit contenir une lettre MAJ, une lettre min, un chiffre et un charactere spéciale, il doit également contenir entre 8 et 15 characteres au total'});
                                    }
                                }
                            })
                        }
                        res.status(200).json({message:'utilisateur modifier'});
                    }else{
                        res.status(200).json({message:"aucune modification sur l'utilisateur"});
                    }
                }
            }
        )
    } catch (err) {
        res.status(500).json({message:"erreur serveur", error:err})
    }
}
/* ----------------------------LOGIN----------------------------------- */
exports.login = (req, res, next) => {
    try {
        const userLog = req.body;
            dataBase.query(`SELECT * FROM users WHERE mail="${userLog.mail}"`,(err, result)=>{
                if(err){
                    throw err
                }else {
                    if(result<1){
                        console.log("email non existant")
                        return res.status(404).json({message: "email non reconue"})
                    }else{
                        let userOnBdd;
                        result.forEach((elt)=>{
                            userOnBdd=elt;
                            return userOnBdd;
                        })
                        console.log(userLog.pass);
                        console.log(userOnBdd.pass);
                       
                        bcrypt.compare(userLog.pass, userOnBdd.pass)
                        .then(valid=>{
                            if(!valid){
                                return res.status(404).json({message:'vérifiez votre mot de passe'});
                            }else{
                                console.log("LAST STEP")
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

}
/*
    mail: requeteBody.mail,
    nom: requeteBody.nom,
    prenom: requeteBody.prenom,
    age: requeteBody.age,
    pass:hash,
    admin:0
*/