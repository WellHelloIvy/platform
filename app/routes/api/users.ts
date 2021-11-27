import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { setTokenCookie, requireAuth } from '../../utils/auth';
import db from '../../db/models'

const router:any = express.Router();

router.post(
  '/',
  expressAsyncHandler(async (req, res): Promise<any> => {
    const { firstName, lastName, email, password } = req.body;
    const user = await db.User.signup({ firstName, lastName, email, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

export default router;
