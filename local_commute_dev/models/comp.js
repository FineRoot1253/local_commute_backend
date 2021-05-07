module.exports = function(sequelize, DataTypes){
    return sequelize.define('comp',{
        comp_Id:{
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey : true
        },
        comp_name:{
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        comp_admin_email_addr:{
            type: DataTypes.STRING(100),
            allowNull: true,
            references: {
                model: 'user',
                key: 'email_addr'
            }
        },        
        comp_state:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:'0'
        },
        comp_bssid:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    },
    {
        tableName : 'comp',
        timestamps : false
    });
} 