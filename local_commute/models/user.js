module.exports = function(sequelize, DataTypes){
    return sequelize.define('user',{
        email_addr:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true
        },
        user_type:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:'0'
        },
        userId:{
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null
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
        phone_uuid:{
            type: DataTypes.STRING(100),
            allowNull: true
        },
        user_profile_photo:{
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null
        },
        user_phone_number:{
            type: DataTypes.STRING(13),
            allowNull: true,
            defaultValue: null
        },
        user_telephone_number:{
            type: DataTypes.STRING(13),
            allowNull: true,
            defaultValue: null
        },
        comp_id: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'comp',
                key: 'comp_Id'
            }
        }
    },
    {
        tableName : 'user',
        timestamps : false
    });
} 