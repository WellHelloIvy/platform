import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { userInfo } from 'os';
import db from '../../db/models'
import { validateTransaction } from '../../utils/validation';

const router:any = express.Router();

router.post(
  '/',
  validateTransaction,
  expressAsyncHandler(async(req, res): Promise<any> => {
    const { userId, cryptoId, price, quantity, buy } = req.body;
    const transaction = await db.Transaction.create({
      userId, cryptoId, price, quantity, buy
    })
    return res.json({
      transaction
     })

  })
)
