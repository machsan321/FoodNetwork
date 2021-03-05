import { UserLoginInput } from "../../common/DTO/Services/BL/Input/UserLoginInput";
import { UserLoginResponse } from "../../common/DTO/Services/BL/Output/UserLoginResponse";
import { UserRegisterInput } from "../../common/DTO/Services/BL/Input/UserRegisterInput";
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