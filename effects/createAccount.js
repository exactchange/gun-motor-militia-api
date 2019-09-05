/*
 * PlayBlacklisted
 * createAccount
 */

const { ƒ } = require('fire-backend');
const { validateAccount } = require('./validateAccount');

exports.createAccount = async params => {
  const action = ƒ.root.getNode().getAction('/account');

  const {
    email,
    key,
    password1,
    purchase,
    screenName
  } = params;

  const account = {
    canPlay: Boolean(purchase.id),
    key,
    password: password1,
    purchaseId: purchase.id,
    screenName: screenName.toLowerCase(),
    userName: email
  };

  // validate account

  const isValid = await validateAccount(params);

  if (!isValid) {
    console.log('Failed to validate an account.');

    return false;
  }

  /*
   * Fire a synthetic action here because we
   * want to save data from this effect to the
   * database (in this case, a user account).
   *
   * Instead of managing those database operations
   * and state changes manually we can leverage a
   * little framework magic!
   */

  try {
    const res = await ƒ.root.getNode().willPut(action, { path: action.path }, account);

    if (res.status === 200) {
      await action.didPut(params);
    }
  } catch(error) {
    console.log('Failed to create an account.');
    console.log(error);
  }
};
