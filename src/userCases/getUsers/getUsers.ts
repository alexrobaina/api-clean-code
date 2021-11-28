import { Request, Response } from 'express';
import { getAll, getOne } from '../../repositories/userRepository';
import User from '../../database/models/user';

//=====================================
//        READ LIST USERS = GET
//=====================================

export const getUsers = async (req: Request, res: Response) => {
  try {
    const usersDB = await getAll();

    if (!usersDB) {
      return res.status(401).json({
        ok: false,
        message: '',
      });
    }
    const total = await User.countDocuments();
    res.status(200).json({
      ok: true,
      message: 'Everything ok',
      usersDB,
      total,
    });
  } catch (error) {
    if (error) {
      console.log(error);

      return res.status(500).json({
        ok: false,
        message: `'Something on the server didn't work right.'`,
        error,
      });
    }
  }
};

//=====================================
//        READ ONE USER ID = GET
//=====================================

export const getUser = async (req: Request, res: Response) => {
  const { _id } = req.query;

  try {
    // @ts-ignore
    const userDB = await getOne(_id);

    if (!userDB) {
      return res.status(401).json({
        ok: false,
        message: `'Something on the server didn't work right.'`,
      });
    }

    res.status(200).json({
      ok: true,
      message: ' Everything is normal',
      userDB,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      message: `'Something on the server didn't work right.'`,
      error,
    });
  }
};
