import { Router } from 'express';
import { addNewForm, getDetailForm, getAllForm, submit } from '../controllers/form/index.js';

const router = Router();

router.post('', addNewForm);
router.get('/:id', getDetailForm);
router.get('/:id/my_forms', getAllForm);
router.post('/:id/submit', submit);
export default router