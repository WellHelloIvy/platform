import express from 'express';
import asyncHandler from 'express-async-handler';
import { setTokenCookie } from '../../utils/auth';
import db from '../../db/models';

const router  = express.Router()

export default router;
