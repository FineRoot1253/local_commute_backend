module.exports = function(sequelize, DataTypes){
    return sequelize.define('outofrangeuser',{
        ooru_Id:{
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
        createdAt:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName : 'outofrangeuser',
        timestamps : false
    });
} 