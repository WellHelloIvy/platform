import express from 'express';
import sessionRouter from './session';
import usersRouter from './users';
import transactionsRouter from './transactions'
import assetsRouter from './assets'

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/transactions', transactionsRouter);
router.use('/assets', assetsRouter)

export default router;
