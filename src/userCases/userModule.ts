import bcrypt from 'bcrypt';
import { response } from 'express';
import jwt from 'jsonwebtoken';

type TUser = {
  _id?: string;
  name: string;
  role: string;
  email: string;
};

const SEED = process.env.SEED || 'key-desarollo-secrets-yes';

function createToken(user: TUser) {
  const { _id, email, name, role } = user;

  return jwt.sign({ _id, email, name, role }, SEED, {
    expiresIn: process.env.EXPIRES_IN || 86400,
  });
}

export { bcrypt, response, jwt, createToken };
