const dataBase = require('../dbConnect');
// select
exports.reqSelectBdd = (req,res,next,table, id, ...element) => {
    let requete='';
    let destructur = [table, id, element];
    
    if(id){
        requete=`SELECT * FROM ?? WHERE ?? = ?;`;
    }else{
        requete=`SELECT * FROM ??;`;
        destructur.slice(2,2);
    }
    dataBase.query(requete, destructur, (err, result) => {
        if(err){
            let errorSql = err.sqlMessage;
            res.status(404).json({message: `aucun ${table} n'a etais trouvé`, errorSql});
        }
        else{
            if(result < 1){
                res.status(404).json({message:`aucun ${table} n'a etais trouvé avec cet ID`});
            }else {
                res.status(200).json({result});
                return result;
            }
        }
    })
}
// insert into
exports.reqInsertIntoBdd = (req, res, next, table, element) => {
    dataBase.query(`INSERT INTO ?? SET ?`, [table, element], (err, result)=>{
        if(err){
            let errorSql = err.sqlMessage;
            res.status(404).json({errorSql});
        }
        else{
            res.status(201).json({message: `Le nouveaux ${table} a bien étais poster et enregister dans la BDD`, result});
            return result;
        };
    })  
}
// Update
exports.reqUpdateBdd = (req, res, next, table, colone, element, coloneCible, condition) => {
    dataBase.query(`UPDATE ?? SET ?? = ? WHERE ?? = ?`, [`${table}`, `${colone}`, element,`${coloneCible}`, condition], (err,result) => {
        if(err){
            let errorSql = err.sqlMessage;
            res.status(404).json({errorSql});
        }else{
            return result;
        }
    })
}
// delete
exports.reqDeleteBdd = (req, res, next, table, colone , element ) => {

    dataBase.query(`DELETE FROM ?? WHERE ?? = ?`,[`${table}`,`${colone}`, element], (err, result) => {
        if(err){
            let errorSql = err.sqlMessage;
            res.status(404).json({errorSql});
        }
        else{
            let tableNameModify = `e 😲 `;
            if(table=='users'){
                tableNameModify="e l'utilisateur";
            }else if (table=="projects"){
                tableNameModify="u projet"
            }
            return res.status(202).json({message:`suppression d${tableNameModify} effectué`});
        }
    })
}