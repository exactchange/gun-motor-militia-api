/*
 * PlayBlacklisted
 * Node (root)
 */

const { ƒ } = require('fire-backend');
const { Account } = require('../actions/Account');
const { Transaction } = require('../actions/Transaction');

class Node extends ƒ.Node {
  constructor() {
    super();

    this.setShape({
      startedAt: ƒ.Type.Number,
      accounts: ƒ.Type.Array,
      reservedEmails: ƒ.Type.Array,
      reservedScreenNames: ƒ.Type.Array
    });

    this.setState({
      startedAt: Date.now(),
      reservedEmails: [
        'playblacklisted@gmail.com'
      ],
      reservedScreenNames: [
        'blacklisted',
        'radar'
      ]
    });

    this.setActions([
      new Account,
      new Transaction
    ]);
  }
}

exports.Node = Node;
