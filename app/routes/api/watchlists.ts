import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import db from '../../db/models'

const router:any = express.Router();

router.post(
  '/:watchlistId',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const { watchlistId, cryptoId } = req.body;
    await db.WatchlistCrypto.create({
      watchlistId, cryptoId
    })
    const watchlist = await db.Watchlist.findByPk(watchlistId)
    return res.json({
      watchlist
     })
  })
)

export default router
