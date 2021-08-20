const dataBase = require("../BDD/dbConnect");
const reqProjects = require('../BDD/req/req.prep');
const fs = require('fs');
const Project = require('../models/projects');

exports.getAllProjects = (req, res, next) => {
    try {
        reqProjects.reqSelectBdd(req, res, next, 'projects');
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}
exports.getOneProject = (req, res, next) => {
    try {
        reqProjects.reqSelectBdd(req, res, next, 'projects','id',req.params.id);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }    
}
exports.postNewProjecs = (req, res, next) => {
    const file = req.file;
    const reqNewProject = req.body;
    try {
        const project = new Project(
            reqNewProject.user_id,
            reqNewProject.nom,
            reqNewProject.description,
            reqNewProject.lien,
            'notFound.png'
        );
        if(file){
            project.img_url = file.filename;
        }
        reqProjects.reqInsertIntoBdd(req, res, next, "projects", project);
    } catch (error) {
        res.status(500).json({error});
    }
}
exports.uppdateProject = (req, res, next) => {
    const file = req.file;
    const requete = req.body;
    try {
        dataBase.query(`SELECT * FROM ?? WHERE ?? = ?`, ['projects', 'id', req.params.id], (err, result) => {
            if(err){
                res.status(404).json({err});
                throw err;
            }else{
                let postBase = {};
                result.forEach(element => {
                    postBase = element;
                    return postBase;
                });
                const updatePost = new Project(
                    requete.user_id,
                    requete.nom,
                    requete.description,
                    requete.lien,
                    postBase.img_url
                );
                if(result.length!==0){
                    if((updatePost.nom != undefined && updatePost.nom != postBase.nom ||
                        updatePost.description != undefined && updatePost.description != postBase.description ||
                        updatePost.lien != undefined && updatePost.lien != postBase.lien ||
                        updatePost.img_url != postBase.img_url)){
                        if(updatePost.nom){
                            reqProjects.reqUpdateBdd(req,res,next, "projects", "projects.nom", updatePost.nom, "projects.id", req.params.id);
                        }
                        if(updatePost.description){
                            reqProjects.reqUpdateBdd(req,res,next, "projects", "projects.description", updatePost.description, "projects.id", req.params.id);
                        }
                        if(updatePost.lien){
                            reqProjects.reqUpdateBdd(req,res,next, "projects", "projects.lien", updatePost.lien, "projects.id", req.params.id);
                        }
                        if(file){
                            reqProjects.reqUpdateBdd(req, res, next, "projects", "projects.img_url", file.filename, "projects.id", req.params.id);
                            updatePost.img_url = file.filename;
                            console.log("updatePost with new file ",updatePost);
                            fs.unlink(`./assets/images/projects/${postBase.img_url}`, ()=>{
                                console.log(`${postBase.img_url} a bien été delete`);
                            })
                        }else{
                            console.log('image non modif');
                        }
                        return res.status(201).json({message:'modif du post : DONE'});
                    }else{
                        res.status(304).json({message:'rien a modif'});
                    }
                }else{
                    updatePost.img_url = file.filename;
                    console.log(updatePost);
                    fs.unlink(`./assets/images/projects/${updatePost.img_url}`, ()=>{
                        console.log(`${updatePost.img_url} a bien été delete`);
                    })
                    res.status(404).json({message: "Aucun projet ne porte cet ID"});
                }
            }
        })
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.deleteProject = (req, res, next) => {
    const requeteDel = req.body;
    let deleteImgUrl = 'notFound.png';
    try {
      dataBase.query(`SELECT ?? FROM ?? WHERE ?? = ?`, ["projects.img_url", "projects", "projects.id",req.params.id],(err, result)=>{
            if(err) {
                res.status(404).json({err});
            }
            else {
                if(result.length < 1){
                    return res.status(404).json({message:'project is not found on Bdd'})
                }else {
                    result.forEach(itm=>{deleteImgUrl=itm.img_url; return deleteImgUrl});
                    console.log(`deleteimg = ${deleteImgUrl}`);
                    if(deleteImgUrl == "notFound.png" || deleteImgUrl == 'undefined') {
                        console.log("Aucune image a suprimer");
                        reqProjects.reqDeleteBdd(req, res, next, "projects", "projects.id", req.params.id);
                        return;
                    }else {
                        fs.unlink(`./assets/images/projects/${deleteImgUrl}`,(err, result)=>{
                            console.log(`l'image : ${deleteImgUrl} du project ${requeteDel.nom} a bien été suprime!`);
                            reqProjects.reqDeleteBdd(req, res, next, "projects", "projects.id", req.params.id);
                        })
                    }
                }     
            }
        }
      )
    } catch (err) {
        res.status(500).json(err);
    }
}