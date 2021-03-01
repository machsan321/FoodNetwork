import { UserDAL } from "../DAL/UserDAL";
import { IResult, Result } from "../common/response/Result";
import { UserLoginResponse } from "../common/entityBL/user/UserLoginResponse";
import { UserLoginInput } from "../common/entityBL/user/UserLoginInput";
import { UserRegisterInput } from "../common/entityBL/user/UserRegisterInput";
import { UserRegisterResponse } from "../common/entityBL/user/UserRegisterResponse";
import { UserVerificationResponse } from "../common/entityBL/user/UserVerificationResponse";

import { ResponseCreatior } from "../common/response/ResponseCreatior";
import { userData } from "../common/DTO/Services/DAL/Output/userData";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
export default class UserBL {
  private userDal: UserDAL;

  constructor() {
    this.userDal = new UserDAL();
  }

  public async login(
    data: UserLoginInput,
  ): Promise<IResult<UserLoginResponse>> {
    let userResponse = await this.userDal.getUserByEmail(data.email);
    let CreateErrorResponse = ResponseCreatior.CreateErrorResponse<UserLoginResponse>(
      "",
    );
    if (!userResponse.isSuccses) {
      return ResponseCreatior.CreateErrorResponse<UserLoginResponse>(
        userResponse.error,
      );
    }
    if (userResponse.data === null) {
      return ResponseCreatior.CreateErrorResponse<UserLoginResponse>(
        "you need to singup",
      );
    }

    if (!userResponse.data.email_confirmed) {
      return ResponseCreatior.CreateErrorResponse<UserLoginResponse>(
        "Please confirm your email",
      );
    }

    if (!this.isValidPassword(data.password, userResponse.data.hash_password)) {
      return ResponseCreatior.CreateErrorResponse<UserLoginResponse>(
        "error in password or email",
      );
    }
    let email = data.email;
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const res = ResponseCreatior.CreateSuccsesResponse<UserLoginResponse>(
      new UserLoginResponse(
        token,
        userResponse.data.firsName,
        userResponse.data.lastName,
      ),
    );
    return res;
  }

  public async register(
    data: UserRegisterInput,
  ): Promise<IResult<UserRegisterResponse>> {

    try 
    {
      let userResponse = await this.userDal.getUserByEmail(data.email);
      if(!userResponse.isSuccses){
        return ResponseCreatior.CreateErrorResponse<UserRegisterResponse>(
          userResponse.error,
        );


      }
    }
     catch 
     {

    }
    return await this.userDal.register(data);
  }
  public async emailConfirmation(
    token: string,
  ): Promise<Result<UserVerificationResponse>> {
    return await this.userDal.verifieUser(token);
  }

  private isValidPassword(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }
}
