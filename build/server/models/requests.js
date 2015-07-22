// Generated by CoffeeScript 1.9.0
var americano;

americano = require('americano');

module.exports = {
  bill: {
    byDate: americano.defaultRequests.by('date')
  },
  konnector: {
    all: americano.defaultRequests.all
  },
  bankoperation: {
    byDate: americano.defaultRequests.by('date')
  },
  folder: {
    byFullPath: function(doc) {
      return emit(doc.path + "/" + doc.name, doc);
    }
  }
};