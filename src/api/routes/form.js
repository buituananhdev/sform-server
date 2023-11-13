import { Router } from 'express';
import { addNewForm, getDetailForm, getAllForm, submit, getAllSubmit, getDetailSubmit } from '../controllers/form/index.js';

const router = Router();

router.post('', addNewForm);
router.get('/:id', getDetailForm);
router.get('/:id/my_forms', getAllForm);

//SUBMIT
router.post('/:id/submit', submit);
router.get('/:id/detail_submit', getDetailSubmit);
router.get('/:id/all_submit', getAllSubmit);
export default router