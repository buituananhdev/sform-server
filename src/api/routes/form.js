import { Router } from 'express';
import { addNewForm, getDetailForm, getAllForm, submit, getAllSubmit, getDetailSubmit, getAllShared, updateShared } from '../controllers/form/index.js';
import { auth, authorizeOwner, authorizeSubmitter, authorizeDetailSubmit, uploadFile } from '../middlewares/index.js';

const router = Router();

// FORM 
router.post('', auth, addNewForm);
router.get('/:id', auth, authorizeSubmitter, getDetailForm);
router.get('', auth, getAllForm);

//SUBMIT
router.post('/:id/submit', auth, authorizeSubmitter, uploadFile.single('file'), submit);
router.get('/:id/detail_submit', auth, authorizeDetailSubmit, getDetailSubmit);
router.get('/:id/all_submit', auth, authorizeOwner, getAllSubmit);

// SHARED
router.get('/:id/shared_users', auth, authorizeOwner, getAllShared);
router.patch('/:id/update_shared_users', auth, authorizeOwner, updateShared);

export default router;
