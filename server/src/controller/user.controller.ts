import argon2 from 'argon2';
import { Request, Response } from 'express';
import * as statusCodes from 'http-status';
import { User } from '../models/user.model';
import { hashPassword } from '../services/hashPassword';
import { genrateJWT } from '../services/jwt';
import { ResponseBuilder } from '../utils/response.builder';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email || !password) {
      throw new Error(`Email & Password is required`);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = await genrateJWT({ _id:user._id,  email, role: 'user' });
    const response = ResponseBuilder(
      { token, email, username: user.username },
      statusCodes.OK
    );
    res.cookie('accesstoken', token, {
      expires: new Date(Date.now() + 90000000),
    });
    return res.status(statusCodes.OK).send(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
};

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: {username:string, email:string, password:string} = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error('Email alredy exists');
    }
    const hashedPassword: string = await hashPassword(password);

    const createUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = await genrateJWT({_id:createUser._id, email, role: 'user' });

    res.cookie('accesstoken', token, {
      expires: new Date(Date.now() + 90000000),
    });
    const response = ResponseBuilder(
      { token, email, username: createUser.username },
      statusCodes.CREATED
    );

    return res.status(201).send(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const userObject = JSON.parse(req.headers['user'] as string);
    const user = await User.findOne({ email: userObject.email });
    if (!user) {
      throw new Error('user not found');
    }
    console.log(user, 'user');
    const response = ResponseBuilder(user, statusCodes.OK);
    res.status(200).send(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
};
