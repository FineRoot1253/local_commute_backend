module.exports = function(sequelize, DataTypes){
    return sequelize.define('user_worktime_end',{
        user_log_idx:{
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey : true
        },
        user_email_addr:{
            type: DataTypes.STRING(100),
            allowNull: false,
            references: {
                model: 'user',
                key: 'email_addr'
            }
        }, 
        user_log_time:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        log_state:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue : 0
        },
    },
    {
        tableName : 'user_worktime_end',
        timestamps : false
    });
} 