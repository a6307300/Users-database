const NodeRSA = require('node-rsa');

const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCL1b9n8ityn06ySnkdQNifGyqB\n' +
    'pvfaY7d7cH1cK7zWzGRGNwJFYCGxAk5hZgKLZEshDNLwqS1sK4wIOqua00n7O8MT\n' +
    'xgNPuRP0RoWWqd1DQyE/RtruHYzlFByvGHEOdOn4u0JtPtWdYwC3ZISMAqG8jxkV\n' +
    'YzZkWmiAkLA5isfjiQIDAQAB\n' +
    '-----END PUBLIC KEY-----';

const keyPublic = new NodeRSA(publicKey);

module.exports = {
    keyPublic,
}