import { Response, Request } from 'express';
import User from '../../database/models/user';

//=====================================
//       DELETE USER ID = DELETE
//=====================================

const deleteUser = async (req: Request, res: Response) => {
  const _id = req.query._id;

  try {
    const userDB = await User.findById(_id);

    if (!userDB) {
      return res.status(401).json({
        ok: false,
        message: `There is no user with this id: ${_id}`,
      });
    }

    const userDeleted = await User.findByIdAndRemove(userDB._id);

    res.status(200).json({
      ok: true,
      userDeleted,
      message: ' Everything is normal',
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

export default deleteUser;
