exports.requetteBddUser = (action, table, ...emplacement) => {
    requeteSql = {
        action: action,
        table: table,
        emplacement: emplacement
    }
    return(`${requeteSql.action} ${requeteSql.table} ${requeteSql.emplacement};`) 
}
