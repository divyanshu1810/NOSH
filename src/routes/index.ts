import express, {  } from 'express';
import { createDishes, fetchDishes, toggleDishStatus } from '../handlers/index';

const router = express.Router();

router.post('/dishes', createDishes);
router.get('/dishes', fetchDishes);
router.put('/dishes/:dishId', toggleDishStatus);

export default router;