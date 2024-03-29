
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    
    
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
  },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
 
  },{timestamps: false}
  );
  // sequelize.sync();


  return User;
};
