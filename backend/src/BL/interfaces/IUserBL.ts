import { UserLoginInput } from "../../common/entityBL/user/UserLoginInput";
import { UserLoginResponse } from "../../common/entityBL/user/UserLoginResponse";
import { UserRegisterInput } from "../../common/entityBL/user/UserRegisterInput";
import { UserRegisterResponse } from "../../common/entityBL/user/UserRegisterResponse";
import { UserVerificationResponse } from "../../common/entityBL/user/UserVerificationResponse";
import { IResult, Result } from "../../common/response/Result";

export interface IUserBL {
     login(
        data: UserLoginInput,
      ): Promise<IResult<UserLoginResponse>> 

      register(
        data: UserRegisterInput,
      ): Promise<IResult<UserRegisterResponse>>

      emailConfirmation(
        token: string,
      ): Promise<Result<UserVerificationResponse>>
}