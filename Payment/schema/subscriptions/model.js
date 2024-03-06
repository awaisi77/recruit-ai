
module.exports = (Sequelize, DataTypes) => {
    const Subscription = Sequelize.define("Subscription", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id:{
        type: DataTypes.UUID,
        foreignKey:true
      },
      plan_id:{
          type: DataTypes.UUID,
          foreignKey:true
        },
      remianigConnects: {
        type: DataTypes.INTEGER,
      },
      status: {
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
  
    return Subscription;
  };
  