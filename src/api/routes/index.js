import { Router } from 'express';
import user from './user.js';
import form from './form.js';
import auth from './auth.js';
import storage from './storage.js';
import url from './url.js'

const router = Router();

router.use('/users', user);
router.use('/forms', form);
router.use('/auth', auth);
router.use('/storages', storage);
router.use('/url', url);

export default router;