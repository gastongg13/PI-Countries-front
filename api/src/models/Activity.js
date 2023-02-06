const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        validate: {
          max: 5,
          min: 1,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seasons: {
        type: DataTypes.ENUM("Summer", "Spring", "Autumn", "Winter"),
      },
    },
    { timestamps: false }
  );
};
