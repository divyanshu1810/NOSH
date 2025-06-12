import express, {  } from 'express';
import { createDishes } from '../handlers/index';

const router = express.Router();

router.post('/create-dishes', createDishes);

export default router;