const dataBase = require('../dbConnect');
// select
exports.reqSelectBdd = (req,res,next,table, id, ...element) => {
    let requete='';
    let destructur = [table, id, element];
    if(id){
        requete=`SELECT * FROM ?? WHERE ?? = ?;`
        
    }else{
        requete=`SELECT * FROM ??;`;
        destructur.slice(2,2);
    }

    dataBase.query(requete, destructur, (err, result) => {
        if(err){
            res.status(404).json({message: "aucun project n'a etais trouvé", err});
        }
        else{
            if(result<1){
                res.status(404).json({message:"aucun project n'a etais trouvé avec cet ID"});
            }else {
                res.status(200).json({result});
            }
        }
    })
}
// insert into
exports.reqInsertIntoBdd = (req, res, next, table, element) => {
    dataBase.query(`INSERT INTO ?? SET ?`, [table, element], (err, result)=>{
        if(err){
            res.status(404).json({err});
            throw err;
        }
        else{
            res.status(201).json({message: 'Le nouveaux projet a bien étais poster et enregister dans la BDD', result});
        };
    })  
}
// Update
exports.reqUpdateBdd = (table, colone, element, ou, condition)=> {
    dataBase.query(`UPDATE ?? SET ?? = ? WHERE ?? = ?`, [`${table}`, `${colone}`, element,`${ou}`, condition], (err,result)=>{
        if(err){
            res.status(404).json({err});
            throw err;
        }else{
            return result;
        }
    })
    //return dbQuery;
}

// delete
