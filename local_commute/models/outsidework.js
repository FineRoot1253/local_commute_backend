module.exports = function(sequelize, DataTypes){
    return sequelize.define('outsidework',{
        osw_Id:{
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