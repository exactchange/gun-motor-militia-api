/*
 * PlayBlacklisted
 * validateAccount
 */

exports.validateAccount = ({ email, password1, password2, reservedEmails, reservedScreenNames, screenName }) => {

  // verify passwords match

  if (password1 !== password2) {
    console.log('Passwords do not match.');

    return false;
  }

  // verify email is not reserved

  if (reservedEmails.includes(email.toLowerCase())) {
    console.log('Account already exists.');

    return false;
  }

  // verify screen name is not reserved

  if (reservedScreenNames.includes(screenName.toLowerCase())) {
    console.log('Screen name already exists.');

    return false;
  }

  return true;
};
