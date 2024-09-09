/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/TaskManager')
  .then(() => console.log('connected to database'))
  .catch((err: any) => console.log(err.message));
