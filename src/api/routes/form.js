import { Router } from 'express';
import { addNewForm, getDetailForm, getAllForm, submit, getAllSubmit, getDetailSubmit } from '../controllers/form/index.js';
import { auth } from '../middlewares/index.js';
const router = Router();

//SUBMIT
router.post('/:id/submit', auth, submit);
router.get('/:id/detail_submit', auth, getDetailSubmit);
router.get('/:id/all_submit', auth, getAllSubmit);

// Forms
router.post('', auth, addNewForm);
router.get('/:id', auth, getDetailForm);
router.get('', auth, getAllForm);

export default router;
