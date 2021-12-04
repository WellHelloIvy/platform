import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { Op } from 'sequelize/dist';
import db from '../../db/models'

const router:any = express.Router();

router.post(
  '/:watchlistId',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const { watchlistId, cryptoId } = req.body;
    await db.WatchlistCrypto.create({
      watchlistId, cryptoId
    })
    const watchlist = await db.Watchlist.findByPk(watchlistId,{
      include: {model: db.WatchlistCrypto}
    })

    return res.json(
      [watchlist]
     )
  })
)

router.delete(
  '/:watchlistId/watchlistcryptos/:cryptoId',
  expressAsyncHandler(async(req, res):Promise<any> => {
    const { watchlistId, cryptoId } = req.params;
    const cryptocurrency:any = await db.WatchlistCrypto.findOne(
      {where: {
        [Op.and]:[
          {
            watchlistId
          },
          {
            cryptoId
          }
        ]
      }
      }
    )
    await cryptocurrency.destroy()
    const watchlist = await db.Watchlist.findByPk(watchlistId, {
      include: {model: db.WatchlistCrypto}
    })
    return res.json(
      [watchlist]
    )
  })
)

export default router
