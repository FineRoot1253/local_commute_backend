module.exports = function(sequelize, DataTypes){
    return sequelize.define('user',{
        userId:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true
        },
        userName:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        state:{
            type: DataTypes.INT,
            allowNull: false,
        },
        onWorkTime:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        offWorkTime:{
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName : 'user',
        timestamps : true
    });
} 