
const UserDL = require('../schema/user/UserDL');
const Datasources = require('../datasources');
const db = Datasources.getDatabase();
const jwt = require("jsonwebtoken");




class UserService {


  async register(payload) {

    try {
      // console.log("payload", payload);
      const { fullName, email, password } = payload;

      const user = new UserDL(db);
      const alreadyExistsUser = await user.alreadyExistingUser(email)

      if (alreadyExistsUser) {
        return { message: "User with email already exists!" };
      }

      const savedUser = await user.createUser({ fullName, email, password })
      if (savedUser) return { message: "Thanks for registering" };

    } catch (ex) {
      console.log("eroro", ex)
    }
  }


  async login(payload) {

    try {

      const { email, password } = payload;
      const user = new UserDL(db);

      const existingUser = await user.alreadyExistingUser(email)

      if (!existingUser)
        return {
          status: 400,
          messsage: "email or password doesnot match"
        }

      if (existingUser.password !== password)
        return {
          status: 400,
          messsage: "email or password doesnot match"
        }

        const jwtToken = jwt.sign(
          { id: existingUser.id, email: existingUser.email },
          process.env.JWT_SECRET
        );

        return { message: "Welcome Back!", existingUser, jwtToken };

    } catch (ex) {
      console.log("eroro", ex)
    }
  }


}

module.exports = UserService;
