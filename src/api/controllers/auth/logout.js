import { Token } from '../../../models/index.js';
import { errorHelper, getText } from '../../../utils/index.js';

export default async (req, res) => {
  await Token.updateOne({ userId: req.user._id },
    {
      $set: { status: false, expiresIn: Date.now() }
    })
    .catch(err => {
      return res.status(500).json(errorHelper('00049', req, err.message));
    });

  return res.status(200).json({
    resultMessage: { en: getText('en', '00050') },
    resultCode: '00050'
  });
};