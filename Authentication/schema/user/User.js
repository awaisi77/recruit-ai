
class UserDL {
  constructor(db){
    this.db = db
  }
  async signupDL(userdata) {
    try {
      console.log("model data ", this.db.models)
      await this.db.models.User.create({
        name:userdata.name,
        email:userdata.email,
        password:userdata.password
      });
      return userdata  
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserDL;
