module.exports = function(sequelize, DataTypes){
    return sequelize.define('user_worktime_end',{
        user_log_idx:{
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey : true
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
        tableName : 'user_worktime_end',
        timestamps : false
    });
} 