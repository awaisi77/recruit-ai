
module.exports = (sequelize, DataTypes) => {
    const SubscriptionPlan = sequelize.define("SubscriptionPlan", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          title: {
            type: DataTypes.STRING,
          },
          connects: {
            type: DataTypes.INTEGER,
          },
          price: {
            type: DataTypes.INTEGER,
          },
          type: {
            type: DataTypes.STRING,
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
          },
    });
  
    return SubscriptionPlan;
  };
  