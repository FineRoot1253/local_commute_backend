module.exports = function(sequelize, DataTypes){
    return sequelize.define('outofrangeuser',{
        ooru_Id:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true,
            autoIncrement: true
        },
        user_email_addr:{
            type: DataTypes.STRING(100),
            allowNull: false,
            references: {
                model: 'user',
                key: 'email_addr'
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