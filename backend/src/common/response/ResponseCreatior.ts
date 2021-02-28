import { Result } from "./IResultT";

 export class  ResponseCreatior{
    static CreateSuccsesResponse<T>(data:any){
        const res : Response2<T> = {
            data: data,
            message: "",
            error: "",
            isSuccses: true         
          }
          return res;

    }
       static CreateErrorResponse<T>(error:string){
        const res : Result<T> = {
          
            message: "",
            error: error,
            isSuccses: false         
          }
          return res;

    }

}

 