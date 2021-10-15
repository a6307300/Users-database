const NodeRSA = require('node-rsa');

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n'+
'MIICXAIBAAKBgQCL1b9n8ityn06ySnkdQNifGyqBpvfaY7d7cH1cK7zWzGRGNwJF\n'+
'YCGxAk5hZgKLZEshDNLwqS1sK4wIOqua00n7O8MTxgNPuRP0RoWWqd1DQyE/Rtru\n'+
'HYzlFByvGHEOdOn4u0JtPtWdYwC3ZISMAqG8jxkVYzZkWmiAkLA5isfjiQIDAQAB\n'+
'AoGALbdZ9m/UCItQvTVf11KF/65v/SdLTNjg+bhTI7kg6dC0z8fYNDoziZ1JZspk\n'+
'9pF5hnqc1BVbRkwOYfpcdCezva/zx3ibhBh/tURRWBh2eUCgI91BiLzg22orGC7c\n'+
'qhMyOwES5YsgHdlA1szaXJmZ/SEDxQfYBANQuGJeRl1BZwECQQD/tG3+4u22FLk7\n'+
'BZScCTTroO5aXZom90keNm/D6o2AhHcvS0VM5IsUfAYLh3i0mVw0Qbqi+8cDFp6G\n'+
'w0iun7f5AkEAi/8S+pZNXX6HTCHHxgNyEkf8piuUQ1HoZGnKsX7SZQQB1HGd32De\n'+
'xSedzd/5843+xlDLYNjC6fZK28AOFzUMEQJBALNsRaqOTUJwdDEID2kVxL555AYg\n'+
'm+QvrGy4wd/1G2lMidzzsiLsUvMCu7MnUflXiy1X2cA3b0OpgX8KVFvD0vECQHAd\n'+
'jhB7MGgwvZ/d6cSN29wCJLbbbbhgL1HDW528aDiX9fMyLnHHfYC9Embe+ajwzdn6\n'+
'uHXOAoMmSJsmeuJhDFECQBapu5d9RBzDhZdeo+Pm59XGlYifv2x3GJuM0LplyipT\n'+
'3G0NaZbZ+6YCBDXK1K6BOXIGTjTTcNeKPBFgmf71IlM=\n'+
'-----END RSA PRIVATE KEY-----';

const keyPrivate = new NodeRSA(privateKey);

module.exports = {
    keyPrivate
}