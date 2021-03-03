module.exports = function(sequelize, DataTypes){
    return sequelize.define('outsidework',{
        osw_Id:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true,
            autoIncrement: true
        },
        userId:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true,
            references: {
                model: 'user',
                key: 'userId'
            }
        },
        dest:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName : 'outsidework',
        timestamps : true
    });
} 