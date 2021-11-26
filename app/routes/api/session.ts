import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { setTokenCookie, restoreUser } from '../../utils/auth';
import db from '../../db/models'
import { CustomError } from '../../app';

const router:any = express.Router();

router.post(
  '/',
  expressAsyncHandler(async (req:any, res:any, next:any): Promise<any> => {
    const { credential, password } = req.body;

    const user = await db.User.login({ credential, password });

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

export default router;

