module.exports = function(sequelize, DataTypes){
    return sequelize.define('user_worktime_list',{
        user_email_addr:{
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey : true,
            references: {
                model: 'user',
                key: 'email_addr'
            }
        }, 
        work_start:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        work_end:{
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName : 'user_worktime_list',
        timestamps : false
    });
} 