
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    },
    password: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW // Set default value to current timestamp
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Set default value to current timestamp
    }
    // accessToken: DataTypes.STRING,
    // verifyStatus: DataTypes.INTEGER,
    // status: DataTypes.INTEGER  
  },
  {
    tableName: "User",
  }
  );
  
  return User;
};
