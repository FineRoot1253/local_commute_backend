module.exports = function(sequelize, DataTypes){
    return sequelize.define('user_worktime_start',{
        user_log_idx:{
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey : true,
            autoIncrement: true,
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
        tableName : 'user_worktime_start',
        timestamps : false
    });
} 