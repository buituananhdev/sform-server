import { Router } from 'express';
import { addUser } from '../controllers/user/index.js';

const router = Router();

// AUTH
router.post('', addUser);

export default router