module.exports = function(sequelize, DataTypes){
    return sequelize.define('user_worktime_log',{
        user_log_idx:{
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey : true,
            autoIncrement: true,
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
        tableName : 'user_worktime_log',
        timestamps : false
    });
} 