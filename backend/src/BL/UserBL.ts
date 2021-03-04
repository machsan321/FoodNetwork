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
import { sendEmail } from "../common/helpers/nodemailer";
export default class UserBL {
  private userDal: UserDAL;

  constructor() {
    this.userDal = new UserDAL();
  }

  public async login(
    data: UserLoginInput,
  ): Promise<IResult<UserLoginResponse>> {
    let userResponse = await this.userDal.getUserByEmail(data.email);
    let ErrorResponse = ResponseCreatior.CreateErrorResponse<UserLoginResponse>(
      "",
    );
    if (!userResponse.isSuccses) {
      ErrorResponse.error = userResponse.error;
      return ErrorResponse;
    }
    if (userResponse.data === null) {
      ErrorResponse.error = "you need to singup";
      return ErrorResponse;
    }
    if (!userResponse.data.email_confirmed) {
      ErrorResponse.error = "Please confirm your email";
      return ErrorResponse;
    }
    if (!this.isValidPassword(data.password, userResponse.data.hash_password)) {
      ErrorResponse.error = "error in password or email";
      return ErrorResponse;
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
    try {
      let userResponse = await this.userDal.getUserByEmail(data.email);
      if (!userResponse.isSuccses) {
        return ResponseCreatior.CreateErrorResponse<UserRegisterResponse>(
          userResponse.error,
        );
      }
      if (userResponse.data != null) {
        return ResponseCreatior.CreateErrorResponse<UserRegisterResponse>(
          "User is already exist",
        );
      }

      const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET);
      sendEmail(data.email, token);

      const regUser = await this.userDal.registerUser(data);
      if (regUser.isSuccses && regUser.data)
        return ResponseCreatior.CreateSuccsesResponse<UserRegisterResponse>(
          new UserRegisterResponse(data.firstName, data.lastName),
        );

      return ResponseCreatior.CreateErrorResponse<UserRegisterResponse>(
        regUser.error,
      );
    } catch (error) {
      return ResponseCreatior.CreateErrorResponse<UserRegisterResponse>(error);
    }
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
