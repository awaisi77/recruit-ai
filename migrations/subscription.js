module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Subscription', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        plan_id:{
            type: Sequelize.UUID,
            foreignKey:true
          },
        user_id:{
          type: Sequelize.UUID,
          foreignKey:true
        },
        subscription_createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        subscription_updatedAt: {
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
    }}