/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

interface JWTPayload {
  _id:mongoose.Types.ObjectId
  email: string;
  role: string;
}

export function genrateJWT(payload: JWTPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  return token;
}

export function verifyJWT(token: string) {
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET as string);
    return {
      success: true,
      data: userData,
    };
  } catch (err: any) {
    return {
      success: false,
      data: err.message,
    };
  }
}
