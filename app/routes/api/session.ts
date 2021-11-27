import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { setTokenCookie } from '../../utils/auth';
import db from '../../db/models'
import { CustomError } from '../../app';

const router:any = express.Router();

router.post(
  '/',
  expressAsyncHandler(async (req:any, res:any, next:any): Promise<any> => {
    const { email, password } = req.body;

    const user = await db.User.login({ email, password });

    if (!user) {
      const err = new CustomError('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.delete(
  '/',
  (_req:any, res:any) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

export default router;

