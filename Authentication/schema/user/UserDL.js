

class UserDL {
  constructor(db) {
    this.db = db;
  }

  async alreadyExistingUser(email) {
    return await this.db.models.User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
  }

  async storeResetToken(email, token) {
    try {
      const user = await this.db.models.User.findOne({ where: { email } });
      if (!user) {
        console.log("User not found");
        return;
      }
      // Store the reset token for the user
      await user.update({ resetToken: token });
    } catch (error) {
      console.error("Error storing reset token:", error);
    }
  }

  async verifyResetToken(token) {
    try {
      console.log("token 2", token)
        const user = await this.db.models.User.findOne({ where: { resetToken: token } });
        if (!user) {
            console.log("Invalid token ");
            return null;
        }
        return user;
    } catch (error) {
        console.error("Error verifying reset token:", error);
        return null;
    }
}

  async  updatePassword(email, newPassword) {
    try {
      const user = await this.db.models.User.findOne({ where: { email } });
      console.log("user => ",user)
      if (!user) {
        console.log("User not found");
        return;
      }
      // Update user's password
      // await user.update({ password: newPassword });
      user.password = newPassword; 
      console.log("checking passowrds," , user.password , newPassword)
      await user.save();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  }

  async invalidateResetToken(email) {
    try {
      const user = await this.db.models.User.findOne({ where: { email } });
      if (!user) {
        console.log("User not found");
        return;
      }
      // Invalidate/reset the reset token
      await user.update({ resetToken: null });
    } catch (error) {
      console.error("Error invalidating reset token:", error);
    }
  }

  async createUser(userData) {
    const newUser = new this.db.models.User(userData);
    console.log("newuser", newUser)
    return await newUser.save().catch((err) => {
      console.log("Error: ", err);
      return { error: "Cannot register user at the moment!" };
    });
  }

  async getUserInfoById(userId) {
    try {
      console.log("id============>>>", userId)
      // Query the database to get user information by ID
      const userInfo = await this.db.models.User.findByPk(userId);
      return userInfo;
    } catch (error) {
      console.error('Error fetching user information in data layer:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const allUsers = await this.db.models.User.findAll();
      return allUsers;
    } catch (error) {
      console.error("Error fetching all users in UserDL:", error);
      throw error;
    }
  }

}

module.exports = UserDL;
