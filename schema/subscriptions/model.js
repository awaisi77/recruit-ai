
module.exports = (Sequelize, DataTypes) => {
    const Subscription = Sequelize.define("Subscription", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id:{
        type: Sequelize.UUID,
        foreignKey:true
      },
      plan_id:{
          type: Sequelize.UUID,
          foreignKey:true
        },
      remianigConnects: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  
    return Subscription;
  };
  