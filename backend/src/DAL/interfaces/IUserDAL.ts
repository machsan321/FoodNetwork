import { userData } from "../../common/DTO/Services/DAL/Output/userData";
import { UserRegisterInput } from "../../common/DTO/Services/BL/Input/UserRegisterInput";
import { UserVerificationResponse } from "../../common/entityBL/user/UserVerificationResponse";
import { IResult, Result } from "../../common/response/Result";


export interface IUserDAL {
    getUserByEmail(email :string): Promise<IResult<userData>>

    registerUser(data: UserRegisterInput): Promise<Result<boolean>>
   
    verifieUser(
        token: string
      ): Promise<Result<UserVerificationResponse>> 
}