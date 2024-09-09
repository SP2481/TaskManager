import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user';

const userSchema:Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      Error: 'Username is already taken'
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.post<IUser>('save', function (error:any, doc:IUser, next:(err?:any) => void) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern.username) {
      next(new Error('Username is already taken'));
    } else if (error.keyPattern.email) {
      next(new Error('Email is already registered'));
    } else {
      next(error);
    }
  } else {
    next();
  }
});

export const User = mongoose.model('User', userSchema);
