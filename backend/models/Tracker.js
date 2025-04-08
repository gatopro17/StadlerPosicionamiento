module.exports = (sequelize, DataTypes) => {
    // Definición del modelo Tracker
    const Tracker = sequelize.define('Tracker', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(145),
        allowNull: true,
      },
      mayor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    // Relaciones
    Tracker.belongsTo(sequelize.models.Rail, { foreignKey: 'mayor', as: 'rail' });
  
    return Tracker;
  };
  