import { Router } from 'express';
import { addUser, searchUser } from '../controllers/user/index.js';

const router = Router();

router.post('', addUser);
router.get('', searchUser);
export default router