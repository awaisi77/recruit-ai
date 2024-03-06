module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Cover_Letter', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        job_title: {
          type: Sequelize.STRING,
        },
        cover_letter: {
          type: Sequelize.STRING,
        },
        user_id:{
          type: Sequelize.UUID,
          foreignKey:true
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