import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import apiRouter from './api'
import db from '../db/models'


const router = express.Router();

router.use('/api', apiRouter)

export default router;
