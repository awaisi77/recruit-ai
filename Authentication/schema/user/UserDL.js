

class UserDL {
  constructor(db) {
    this.db = db
  }

  async alreadyExistingUser(email) {
    return await this.db.models.User.findOne({ where: { email } }).catch(
      (err) => {
        console.log("Error: ", err);
      }
    );
  }

  async createUser(userData) {
    const newUser = new this.db.models.User(userData);
    console.log("newuser", newUser)
    return await newUser.save().catch((err) => {
      console.log("Error: ", err);
      return { error: "Cannot register user at the moment!" };
    });
  }

}

module.exports = UserDL;
