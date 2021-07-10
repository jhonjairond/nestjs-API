//import { Document } from "mongoose";

export interface User {

   /*readonly name: { type: string, required: false };
   readonly lastname: { type: string, required: false };
   readonly email: {
    type: string,
    required: false
    //trim: true,
   // safe: true,
    //lowercase: true,
    //unique: true
    /*match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      'Please fill a valid email address'
    ]*/
  /*};
  readonly password: {
    type: string,
    required: false
  }*/

  readonly name:string;
  readonly lastname:string;
  readonly email:string;
   password:string;
  readonly createdAt:Date;
  
 }

