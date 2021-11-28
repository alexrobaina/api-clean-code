import { Response, Request } from 'express';
import { save } from '../../repositories/userRepository';

//=====================================
//           CREATE USER = POST
//=====================================

export const createUser = async (req: Request, res: Response) => {
  try {
    await save(req.body);
    res.status(201).json({
      ok: true,
      message: 'User is ready to save in DB',
    });
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        ok: false,
        error: Error,
        message: 'error in the server | Server Error',
      });
    }
  }
};

export default createUser;
