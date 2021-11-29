import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import db from '../../db/models'

const router:any = express.Router();

router.post(
  '/',
  expressAsyncHandler(async(req, res): Promise<any> => {
    const { userId, cryptoId, quantity } = req.body;
    const asset = await db.Asset.create({
      userId, cryptoId, quantity
    })
    return res.json({
      asset
     })
  })
)
export default router;
