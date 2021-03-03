module.exports = function(sequelize, DataTypes){
    return sequelize.define('outofrangeuser',{
        ooru_Id:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true
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
    },
    {
        tableName : 'outofrangeuser',
        timestamps : true
    });
} 