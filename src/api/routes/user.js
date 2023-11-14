import { Router } from 'express';
import { addUser, searchUser, getMyInfor } from '../controllers/user/index.js';
import { auth } from '../middlewares/index.js';
const router = Router();

router.post('', addUser);
router.get('', auth, searchUser);
router.get('/me', auth, getMyInfor);
export default router