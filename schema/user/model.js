/**
 * Verifystatus:
 * 0 = not
 * 1 = email verified
 * 2 = phone verified
 * 3 = id/kyc completed (will expand later)
 * 4 = customer verified successfully
 * 5 = unverified super saver customer
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    verifyStatus: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  });

  return User;
};
