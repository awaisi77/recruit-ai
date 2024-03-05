module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('User', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        name:{
          type: Sequelize.STRING,
          allowNull:false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password:{
          type: Sequelize.TEXT,
          allowNull:false
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true 
        },
        createdDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedDate: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      });
    }}