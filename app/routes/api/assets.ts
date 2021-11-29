import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import db from '../../db/models'
import { validateAsset } from '../../utils/validation';

const router:any = express.Router();

router.post(
  '/',
  validateAsset,
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

router.put(
  '/:assetId',
  validateAsset,
  expressAsyncHandler(async(req, res): Promise<any> => {
    const assetId = req.params.assetId
    const asset = await db.Asset.findByPk(assetId)
    const { userId, cryptoId, quantity } = req.body;
    asset.userId = userId;
    asset.cryptoId = cryptoId;
    asset.quantity = quantity;
    await asset.save();

    return res.json({
      asset
     })
  })
)

export default router;
