
import { Schema } from 'mongoose';
//import { User } from '../interfaces/user.interface';

export const UserSchema = new Schema({

  name: { type: String, required: false },
  lastname: { type: String, required: false },
  email: {
    type: String,
    required: false,
    trim: true,
    safe: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ],
  },
  password: {
    type: String,
    required: false
  }
/*
  status: {
    type: String,
    enum: ['active', 'inactive', 'update'],
    default: 'update',
    required: true,
  },

  // Nota faltan los campos nuevos.
  profile: { type: String, enum: ['admin', 'user'], default: 'user' },
  */
//});

/*
UserSchema.methods.toJSON = function (this: User) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

UserSchema.index({ email: 1 });
*/



});

UserSchema.index({ name : 'text', lastname : 'text', email : 'text', password : 'text' }) //indexo para poder buscar por texto