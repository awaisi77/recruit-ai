
const UserDL = require('../schema/user/UserDL');
const Datasources = require('../datasources');
const db = Datasources.getDatabase();
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const nodeMailer = require("nodemailer");




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

  async forgetPassword(email) {
    try {
      const user = new UserDL(db);
      const existingUser = await user.alreadyExistingUser(email);
      if (!existingUser)
        return { status: 400, message: "User with email not found!" };
      // Generate and store reset token
      const resetToken = this.generateResetToken();
      await user.storeResetToken(email, resetToken);

      // Send email with reset password link
      await this.sendResetPasswordEmail(email, resetToken);
      return { status: 200, message: "Reset password link sent successfully!" };


    } catch (error) {
      console.log("Error: ", ex);
    }
  }

  async resetPassword( token, newPassword) {
    try {
          const user = new UserDL(db);
            
            // Verify reset token
            const existingUser = await user.verifyResetToken(token);
            if (!existingUser)
                return { status: 400, message: "Invalid reset token!" };

          console.log("check existing user and new pass", existingUser, newPassword)

            // Update user's password
            await user.updatePassword(existingUser.dataValues.email, newPassword);

            // Invalidate/reset token
            await user.invalidateResetToken(existingUser.email);

            return { status: 200, message: "Password reset successfully!" };
    } catch (ex) {
        console.log("Error: ", ex);
    }
}


  generateResetToken() {
    return uuidv4();
  }

  async sendResetPasswordEmail(email, token) {
    try {
      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'zakibutt199@gmail.com.com',
      //     pass: 'dummypass'
      //   }
      // });


      const transporter = nodeMailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: "hdammbrjnalvzwtg"
        },
    });

      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Reset Password',
        html: `<p>Click <a href="http://localhost:4008/reset-password/${token}">here</a> to reset your password.</p>`
      };

      await transporter.sendMail(mailOptions);
      console.log('Reset password email sent successfully!');
    } catch (error) {
      console.error('Error sending reset password email:', error);
    }
  }

}

module.exports = UserService;
