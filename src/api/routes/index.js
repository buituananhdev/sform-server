import { Router } from 'express';
import user from './user.js';
import form from './form.js'
import auth from './auth.js'

const router = Router();

router.use('/users', user);
router.use('/forms', form);
router.use('/auth', auth);


export default router;