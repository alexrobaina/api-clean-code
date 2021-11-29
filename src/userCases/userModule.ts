import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { response } from 'express';
import jwt from 'jsonwebtoken';

type TUser = {
  _id?: string;
  name: string;
  role: string;
  email: string;
};

function createToken(user: TUser) {
  const { _id, email, name, role } = user;

  return jwt.sign({ _id, email, name, role }, config.SEED, {
    expiresIn: config.EXPIRES_IN,
  });
}

export { bcrypt, response, jwt, createToken };
