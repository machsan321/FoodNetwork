import User from "./models/UserSchema";
import { IResult, Result } from "../common/response/Result";
import { UserRegisterInput } from "../common/DTO/Services/BL/Input/UserRegisterInput";
import { UserVerificationResponse } from "../common/entityBL/user/UserVerificationResponse";
import bcrypt from "bcrypt";
import { ResponseCreatior } from "../common/response/./ResponseCreatior";
import { userData } from "../common/DTO/Services/DAL/Output/userData";
const jwt = require("jsonwebtoken");

export class UserDAL {

  public async getUserByEmail(email :string): Promise<IResult<userData>> {
   
    let res = ResponseCreatior.CreateErrorResponse<userData>("");
    try {
      const user = await User.findOne({ email }).exec();
      res = ResponseCreatior.CreateSuccsesResponse<userData>(
        user
      );
        return res;
      }  
    catch (err) {
      res = ResponseCreatior.CreateErrorResponse<userData>(err);
      return res;
    } 
  }

  public async registerUser(data: UserRegisterInput): Promise<Result<boolean>>{
    
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
      return ResponseCreatior.CreateSuccsesResponse<boolean>(true);
    } catch (error) {
      return ResponseCreatior.CreateErrorResponseData<boolean>(error,false);
    }

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
            if(res.data!=null){
            console.log(err);
            res.isSuccses = true;
            res.message = "Email is verified.";
            res.data.isVerified = true;
            res.data.message = " Email is verified";
            }
            return res;
          } else {
            console.log(doc);
          }
        }
      );
    } catch (e) {
      if(res.data !=null){
      res.error = `Email Verification Error: ${e}`;
      res.isSuccses = false;
      res.data.isVerified = false;
      res.data.message = "Cant verifie user's email address."
      }
      return res;
    }

    return res;
  }

  public createHashedPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
