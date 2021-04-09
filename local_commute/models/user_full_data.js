module.exports = function(sequelize, DataTypes){
    return sequelize.define('user_full_data',{
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
        user_profile_photo:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        user_phone_number:{
            type: DataTypes.STRING(13),
            allowNull: true,
        },
        comp_id: {
            type: DataTypes.STRING(8),
            allowNull: true,
            references: {
                model: 'comp',
                key: 'user_comp_Id'
            }
        },
        comp_name:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
    },
    {
        tableName : 'user_full_data',
        timestamps : false
    });
} 