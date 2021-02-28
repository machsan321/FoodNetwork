import { Result } from "./IResultT";
import { Result2 } from "./Response";

 export class  ResponseCreatior{
    static CreateSuccsesResponse<T>(data:any){
        const res : Result2<T> = {
            data: data,
            message: "",
            error: "",
            isSuccses: true         
          }
          return res;

    }
       static CreateErrorResponse<T>(error:string){
        const res : Result2<T> = {
          
            message: "",
            error: error,
            isSuccses: false         
          }
          return res;

    }

}

 