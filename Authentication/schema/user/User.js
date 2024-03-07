const { use } = require("../../routes/api/authRoute");

class UserDL {
  constructor(db){
    this.db = db
  }
  async signupDL(userdata) {
    try {
      console.log("model data ", this.db.models)
      const user = await this.db.models.User.create({
        name:userdata.name,
        email:userdata.email,
        password:userdata.password
      });
      console.log("User => ", user)
      return user  
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserDL;
