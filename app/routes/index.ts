import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import apiRouter from './api'
import User from '../db/models/user'


const router = express.Router();

router.use('/api', apiRouter)

router.get('/hello/world', function(req, res) {
  //@ts-ignore
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

router.get('/users', expressAsyncHandler(async(req, res) => {
  const user:Array<User> = await User.findAll()
  console.log('-------------->',User)
  return user;
}))


export default router;
