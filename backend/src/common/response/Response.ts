interface Response2<T> {
    
        data: T;
        message: string;
        error: string;
        isSuccses: boolean;
    
      }

      export class Result2<T> {
        data?: T;
        message: string;
        error: string;
        isSuccses: boolean;
      
        constructor(data: T, message: string, error: string, isSuccess: boolean) {
          this.data = data;
          this.message = message;
          this.error = error;
          this.isSuccses = isSuccess;
        }
      }
      
      
      interface Response1 {
    

        message: string;
        error: string;
        isSuccses: boolean;
    
      }
  
