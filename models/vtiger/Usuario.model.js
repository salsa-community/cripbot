'use strict';
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        siccode: DataTypes.STRING,
        accountname: DataTypes.STRING,
        accountNo: {
            type: DataTypes.STRING,
            field: 'account_no'
        }
    }, {sequelize, tableName: 'vtiger_account'});
    return Usuario;
};