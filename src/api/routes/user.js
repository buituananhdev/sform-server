import { Router } from 'express';
import { addUser, searchUser } from '../controllers/user/index.js';
import { auth } from '../middlewares/index.js';
const router = Router();

router.post('', addUser);
router.get('', auth, searchUser);
export default router