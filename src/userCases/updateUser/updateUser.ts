import { Response, Request } from 'express';
import { bcrypt } from '../userModule';
import User from '../../database/models/user';
import { SALT_BCRYPT } from '../../database/models/constants/saltBcrypt';

//=====================================
//       UPDATE USER ID = PUT
//=====================================

const updateUser = async (req: Request, res: Response) => {
  const { _id } = req.query;
  const { body } = req;

  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(401).json({
      ok: true,
      message: `User not found`,
    });
  }

  if (body.password !== undefined) {
    const password = await bcrypt.hash(body.password, SALT_BCRYPT);
    body.password = password;
  }

  const userUpdated = await User.findByIdAndUpdate({ _id }, body);

  res.status(200).json({
    ok: true,
    message: 'Everthing Okay',
    userUpdated,
  });
};

export default updateUser;
