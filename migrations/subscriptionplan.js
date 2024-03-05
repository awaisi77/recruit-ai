module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SubscriptionPlan", {
      subscriptionPlan_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      subcriptionPlan_name: {
        type: Sequelize.STRING,
      },
      subscriptionStart_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      subscriptionEnd_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      connects: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
    });
  },
};
