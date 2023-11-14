import { Router } from 'express';
import { shortenUrl, expandUrl } from '../controllers/url/index.js';
import { auth, authorizeOwner } from '../middlewares/index.js';
const router = Router();

router.post('/:id/shorten', auth, authorizeOwner, shortenUrl);
router.post('/:id/expand', auth, expandUrl);

export default router