import { User, Token } from '../../../models/index.js';
import { errorHelper, verifyToken } from '../../../utils/index.js';
import { Form } from '../../../models/index.js';
import pkg from 'mongoose';
const { Types } = pkg;

export default async (req, res, next) => {
  try {
  const form = await Form.findById(req.params.id);
  const user = verifyToken(req);
  if(user) {
    req.user = user;
  }
  if(form && !form.requiredAuth) {
    next();
    return;
  }
  if (!user) return res.status(401).json(errorHelper('00006', req));

    if (!Types.ObjectId.isValid(req.user._id))
      return res.status(400).json(errorHelper('00007', req));

    const exists = await User.exists({ _id: req.user._id })
      .catch((err) => {
        return res.status(500).json(errorHelper('00008', req, err.message));
      });

    if (!exists) return res.status(400).json(errorHelper('00009', req));

    const tokenExists = await Token.exists({ userId: req.user._id })
      .catch((err) => {
        return res.status(500).json(errorHelper('00010', req, err.message));
      });

    if (!tokenExists) return res.status(401).json(errorHelper('00011', req));

    next();
  } catch (err) {
    return res.status(401).json(errorHelper('00012', req, err.message));
  }
};