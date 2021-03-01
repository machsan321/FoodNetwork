export class userData{
    username: string ;
      email:string;
      email_confirmed:Boolean ;
      hash_password:string ;
      firsName: string ;
      lastName: string ;
      constructor(username: string, email: string, email_confirmed: Boolean, hash_password: string, firsName: string, lastName: string) {
        this.username = username;
        this.email = email;
        this.email_confirmed = email_confirmed;
        this.hash_password = hash_password;
        this.firsName = firsName;
        this.lastName = lastName;
       
      }
}