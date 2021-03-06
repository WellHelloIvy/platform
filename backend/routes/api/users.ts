import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { setTokenCookie } from '../../utils/auth';
import db from '../../db/models'
import { validateSignup } from '../../utils/validation';

const router:any = express.Router();

router.post(
  '/',
  validateSignup,
  expressAsyncHandler(async (req:any, res:any)=> {
    const { firstName, lastName, email, password } = req.body;
    const user = await db.User.signup({ firstName, lastName, email, password });

    await setTokenCookie(res, user);

    await db.Watchlist.createWatchlist(user.id)

    return res.json({
      user
    });
  }),
);

router.get(
  '/:userId/transactions',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const userId = req.params.userId
    const transactions = await db.Transaction.findAll({
      where: { userId }
    })
     return res.json(transactions)
  })
)

router.get(
  '/:userId/assets',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const userId = req.params.userId
    const assets = await db.Asset.findAll({
      where: { userId }
    })
     return res.json(assets)
  })
)

router.get(
  '/:userId/watchlists',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const userId = req.params.userId
    const watchlists = await db.Watchlist.findAll({
      where: { userId },
      include: {model: db.WatchlistCrypto}
    })
     return res.json(watchlists)
  })
)

export default router;
