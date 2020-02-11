module.exports = (sequelize, type) => {
    return sequelize.define('usuario', {
        siccode: {
            type: type.STRING
        },
        accountname: {
            type: type.STRING
        },
        accountNo: {
            type: type.STRING,
            field: 'account_no'
        }
    }, {
        sequelize,
        tableName: 'vtiger_account'
    })
}
