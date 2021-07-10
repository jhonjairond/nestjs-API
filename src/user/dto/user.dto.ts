export class CreateUserDTO{

   /*name: { type: string, required: false };
   lastname: { type: string, required: false };
   email: {
    type: string,
    required: false,
    //trim: true,
    //safe: true,
    //lowercase: true,
    //unique: true
    /*match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      'Please fill a valid email address'
    ]*/
  /*};
  password: {
    type: string,
    required: false
  }
*/

readonly name:string;
readonly lastname:string;
readonly email:string;
         password:string;
readonly createdAt:Date;

}


