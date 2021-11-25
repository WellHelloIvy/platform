import express from 'express'
import apiRouter from './api'

const router = express.Router();

router.use('/api', apiRouter)

router.get('/hello/world', function(req, res) {
  //@ts-ignore
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});



export default router;
