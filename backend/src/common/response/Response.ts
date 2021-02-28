interface Response2<T> {
    
        data: T;
        message: string;
        error: string;
        isSuccses: boolean;
    
      }

      
      interface Response1 {
    

        message: string;
        error: string;
        isSuccses: boolean;
    
      }
      class Result2<T> {
          message: string = "";
          error: string ="";
          isSuccses: boolean=false;
          data?: T ;
    }
