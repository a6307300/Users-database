const fs = require('fs');
const NodeRSA = require('node-rsa');

const privateKey = fs.readFileSync('rsa_pr.txt', 'utf8');

const keyPrivate = new NodeRSA(privateKey);

module.exports = {
    keyPrivate
};