const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      // type: DataTypes.INTEGER,
      // primaryKey: true,
      // allowNull: true,
      // autoIncrement: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '',
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '',
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
      default: '',
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      default: 0,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      default: true,
    }
  },
    {timestamps: false}
  );
};
