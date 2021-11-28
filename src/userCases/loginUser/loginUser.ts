import { Response, Request } from 'express';
import { createToken } from '../userModule';
import User from '../../database/models/user';

//=====================================
//        LOGIN USERS = POST
//=====================================

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please, Send your email and password',
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'the user does not exist' });
  }

  const isMath = await user.comparePassword(password);

  if (isMath) {
    return res.status(200).json({
      user,
      token: createToken(user),
    });
  }

  return res.status(400).json({
    message: 'The email or password are incorrect',
  });
};
