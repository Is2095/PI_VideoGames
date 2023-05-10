
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genres', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.ENUM('card','educational','board games','family','fighting','sports','racing','massively','multiplayer','platformer','arcade','puzzle','simulation', 'casual','shooter', 'strategy','rpg', 'adventure','indie','action'),
            allowNull: false,
        },
    }, 
        {timestamps: false}
    );
}