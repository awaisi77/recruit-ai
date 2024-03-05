module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Role', {
        role_id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        role_name: {
          type: Sequelize.STRING,
        },
        role_description: {
          type: Sequelize.STRING,
        },
        role_createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        role_updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    }}