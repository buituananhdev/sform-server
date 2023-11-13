import en from '../lang/en.js';

export default (code, req, errorMessage) => {
  //NOTE: This control routes every server error to the same lang key.
  let key = code;
  if (!en[code]) key = '00008';

  let userId = '';
  if (req && req.user && req.user._id) userId = req.user._id;

  const enMessage = en[key];

  return {
    'resultMessage': {
      'en': enMessage,
    },
    'resultCode': code
  };
};