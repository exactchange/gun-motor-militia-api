const { ƒ } = require('fire-backend');
const { sendEmail } = require('../effects/sendEmail');

/*
 * Account
 */

class Account extends ƒ.Action {
  constructor() {
    super('/account/:key');

    this.setShape({
      canPlay: ƒ.Type.Boolean,
      password: ƒ.Type.String,
      purchaseId: ƒ.Type.String,
      screenName: ƒ.Type.String,
      userName: ƒ.Type.String
    });

    this.setReadWriteDelete(false, true, false);
  }

  /*
   * Handle effects of a PUT to /account
   */

  async didPut(params) {
    const screenName = this.state.screenName[params.key];
    const to = this.state.userName[params.key];

    const info = await sendEmail({
      to,
      from: 'Blacklisted <playblacklisted@gmail.com>',
      subject: 'Welcome to Early Access | Blacklisted',
      message: `<div>Thank you for your purchase. Your screen name is ${screenName}. See you in game!</div>`
    });

    if (info) {
      console.log(info.message);
    }
  }
}

exports.Account = Account;
