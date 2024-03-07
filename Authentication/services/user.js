const bcrypt = require('bcryptjs');
const UserDL = require('../schema/user/User');
const Datasources = require('../datasources/');
const db = Datasources.getDatabase();

class UserService {

    async signupService(payload) {
        try {
        //  console.log("payload", payload);
         // Hash the password
        //  const hashedPassword = await bcrypt.hash(payload.password, 10);

      const userData = new UserDL(db);
       const data =  await userData.signupDL(payload)

         return {data:data};
        } catch (ex) {
          console.log("eroro", ex)
        }
      }
}

module.exports = UserService;
