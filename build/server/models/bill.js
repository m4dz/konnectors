// Generated by CoffeeScript 1.9.0
var Bill, cozydb;

cozydb = require('cozydb');

module.exports = Bill = cozydb.getModel('Bill', {
  type: {
    type: String,
    "default": 'hosting'
  },
  date: Date,
  vendor: {
    type: String,
    "default": 'Digital Ocean'
  },
  amount: Number,
  plan: String,
  fileId: String
});

Bill.all = function(callback) {
  return Bill.request('byDate', callback);
};
