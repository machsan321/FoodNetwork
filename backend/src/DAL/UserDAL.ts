import User from "./models/UserSchema";
import { Result } from "../common/response/IResultT";
import { UserLoginResponse } from "../common/entityBL/user/UserLoginResponse";
import { UserLoginInput } from "../common/entityBL/user/UserLoginInput";
import { UserRegisterResponse } from "../common/entityBL/user/UserRegisterResponse";
import { UserRegisterInput } from "../common/entityBL/user/UserRegisterInput";
import { sendEmail } from "../common/helpers/nodemailer";
import { UserVerificationResponse } from "../common/entityBL/user/UserVerificationResponse";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

export class UserDAL {
  public async login(data: UserLoginInput): Promise<Result<UserLoginResponse>> {
    let email = data.email;

    var res = new Result<UserLoginResponse>(
      new UserLoginResponse("", "", ""),
      "",
      "",
      false
    );
    try {
      const user = await User.findOne({ email }).exec();
      if (user === null) {
        res.isSuccses = false;
        res.error = "you need to singup";
        return res;
      }
      if (!user.email_confirmed) {
        throw new Error("Please confirm your email");
      }
      if (this.authenticate(data.password)) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        const { firstName, lastName } = user;
        res.data.firstName = firstName;
        res.data.lastName = lastName;
        res.data.token = token;
        res.isSuccses = true;

        return res;
      }
    } catch (err) {
      res.isSuccses = false;
      res.error = err;
      return res;
    }
    return res;
  }

  public async register(
    data: UserRegisterInput
  ): Promise<Result<UserRegisterResponse>> {
    let res = new Result<UserRegisterResponse>(
      new UserRegisterResponse("", "", ""),
      "",
      "",
      false
    );

    try {
      let user = await User.findOne({ email: data.email }).exec();
      if (user != null) {
        res.isSuccses = false;
        res.error = "User is already exist";
        return res;
      }

      const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET);
      sendEmail(data.email, token);

      const { firstName, lastName, email, password, username } = data;
      let _user = new User({
        firstName,
        lastName,
        username,
        email,
        hash_password: this.createHashedPassword(password),
        role: "admin",
      });

      try {
        let saveUser = await _user.save();
        res.data.token = token;
        res.isSuccses = true;
        res.error = "User is save succsesfuly";
      } catch (error) {
        console.log("error", error);
      }
    } catch (err) {
      res.isSuccses = false;
      res.error = "User is already exist";
    }
    return res;
  }

  public async verifieUser(
    token: string
  ): Promise<Result<UserVerificationResponse>> {
    let res = new Result<UserVerificationResponse>(
      new UserVerificationResponse("", "", false),
      "",
      "",
      false
    );

    let _jwt = jwt.decode(token, { complete: true });
    try {
      const user = await User.findOneAndUpdate(
        { email: _jwt.payload.email },
        { $set: { email_confirmed: true } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log(err);
            res.isSuccses = true;
            res.message = "Email is verified.";
            res.data.isVerified = true;
            res.data.message = " Email is verified";
            return res;
          } else {
            console.log(doc);
          }
        }
      );
    } catch (e) {
      res.error = `Email Verification Error: ${e}`;
      res.isSuccses = false;
      res.data.isVerified = false;
      res.data.message = "Cant verifie user's email address."
      return res;
    }

    return res;
  }

  public authenticate(password: string): Promise<boolean> {
    const hash_password = bcrypt.hashSync(password, 10);
    return bcrypt.compare(password, hash_password);
  }

  public createHashedPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
