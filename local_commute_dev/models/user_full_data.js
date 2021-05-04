module.exports = function(sequelize, DataTypes){
    return sequelize.define('user_full_data',{
        email_addr:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true
        },
        userId:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user_type:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:'0'
        },
        userName:{
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
        user_telephone_number:{
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