/*
 * PlayBlacklisted
 * Start
 */

const { ƒ } = require('fire-backend');
const { Node } = require('./node');

const dotenv = require('dotenv');
dotenv.config();

const node = new Node();

node.setShape({ 'dbVersion': ƒ.Type.String });

ƒ.root.args.forEach(async a => {
  if (a.match('--') == null) {
    await node.setState({ [a.split('=')[0]]: a.split('=')[1] });
  }
});
