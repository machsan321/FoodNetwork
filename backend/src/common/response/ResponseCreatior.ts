import { Result } from "./Result";


 export class  ResponseCreatior{
    static CreateSuccsesResponse<T>(data:T){
        const res : Result<T> = {
            data: data,
            message: "",
            error: "",
            isSuccses: true         
          }
          return res;

    }
    static CreateErrorResponse<T   extends  {} >(error:string){
      const res : Result<T> = {
        data :null,
          message: "",
          error: error,
          isSuccses: false         
        }
        return res;
  }
       static CreateErrorResponseData<T   extends  {} >(error:string,data:T){
        const res : Result<T> = {
          data :data,
            message: "",
            error: error,
            isSuccses: false         
          }
          return res;
    }

}

 