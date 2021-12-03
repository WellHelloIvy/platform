import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import db from '../../db/models'

const router:any = express.Router();

router.post(
  '/',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const { watchlistId, cryptoId } = req.body;
    const watchlistCrypto = await db.WatchlistCrypto.create({
      watchlistId, cryptoId
    })
    return res.json({
      asset
     })
  })
)
