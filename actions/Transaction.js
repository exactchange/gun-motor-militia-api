/*
 * PlayBlacklisted
 * Transaction
 */

const { ƒ } = require('fire-backend');
const { createAccount } = require('../effects/createAccount');
const { processPayment } = require('../effects/processPayment');

const RETAIL_PRICE = 5.00;

class Transaction extends ƒ.Action {
  constructor() {
    super('/transaction/:key');

    this.setShape({
      cardExpMonth: ƒ.Type.Integer,
      cardExpYear: ƒ.Type.Integer,
      card: ƒ.Type.Integer,
      cvc: ƒ.Type.Integer,
      isTest: ƒ.Type.Boolean
    });

    this.setReadWriteDelete(false, true, false);
  }

  /*
   * Handle effects of a PUT to /transaction
   */

  async didPut(params) {
    const purchase = await processPayment({
      ...this.getStateByKey(params.key),
      email: params.key,
      price: RETAIL_PRICE
    });

    if (purchase) {
      const { reservedEmails, reservedScreenNames } = ƒ.root.getNode().state;

      const account = await createAccount({
        ...params,
        purchase,
        reservedEmails,
        reservedScreenNames
      });

      if (account) {
        console.log(`A new customer was created (${account.userName}).`);

        return {
          message: `Thank you for your purchase. Your screen name is ${account.screenName}. See you in game!`
        };
      }
    }
  }
}

exports.Transaction = Transaction;
