const dataBase = require("../BDD/dbConnect");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const requetProjects = require('../models/projects');

exports.getAllProjects = (req, res, next) => {
    const requeteBody = req.body;
    dataBase.query(`SELECT * FROM projects`, (err, result)=>{
        if(err){
            res.status(404).json({message: 'aucun project na etais trouvé'})
        }
        else{
            res.status(200).json({result})
        }
    })
}