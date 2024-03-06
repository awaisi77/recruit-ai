
module.exports = (Sequelize, DataTypes) => {
    const CoverLetter = Sequelize.define("CoverLetter", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          user_id:{
            type: DataTypes.UUID,
            foreignKey:true
          },
          job_title: {
            type: DataTypes.STRING,
          },
          content: {
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
  
    return CoverLetter;
  };
  