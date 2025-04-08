module.exports = (sequelize, DataTypes) => {
    // Definición del modelo Rail
    const Rail = sequelize.define('Rail', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    });
  
    // Relaciones
    Rail.hasMany(sequelize.models.Balizas, { foreignKey: 'mayor' });
    Rail.hasMany(sequelize.models.Tracker, { foreignKey: 'mayor' });
  
    return Rail;
  };
  