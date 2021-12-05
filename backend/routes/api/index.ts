import express from 'express';
import sessionRouter from './session';
import usersRouter from './users';
import transactionsRouter from './transactions'
import assetsRouter from './assets'
import watchlistsRouter from './watchlists'

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/transactions', transactionsRouter);
router.use('/assets', assetsRouter)
router.use('/watchlists', watchlistsRouter)

export default router;
