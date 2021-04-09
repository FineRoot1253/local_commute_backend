module.exports = function(sequelize, DataTypes){
    return sequelize.define('comp',{
        comp_Id:{
            type: DataTypes.STRING(8),
            allowNull: false,
            primaryKey : true
        },
        comp_name:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        comp_admin_userId:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName : 'comp',
        timestamps : false
    });
} 