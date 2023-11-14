import { Router } from 'express';
import user from './user.js';
import form from './form.js'
import auth from './auth.js'
import storage from './storage.js'

const router = Router();

router.use('/users', user);
router.use('/forms', form);
router.use('/auth', auth);
router.use('/storages', storage);

export default router;