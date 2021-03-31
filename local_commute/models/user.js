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
        email_addr:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userPwd:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        state:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comp_id: {
            type: DataTypes.STRING(8),
            allowNull: true,
            references: {
                model: 'comp',
                key: 'user_comp_Id'
            }
        }
    },
    {
        tableName : 'user',
        timestamps : false
    });
} 