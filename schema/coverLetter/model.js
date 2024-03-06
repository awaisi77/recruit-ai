
module.exports = (Sequelize, DataTypes) => {
    const CoverLetter = Sequelize.define("CoverLetter", {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          user_id:{
            type: Sequelize.UUID,
            foreignKey:true
          },
          job_title: {
            type: Sequelize.STRING,
          },
          content: {
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
  
    return CoverLetter;
  };
  