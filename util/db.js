
/**
 * 
 * https://www.terlici.com/2015/04/03/mongodb-node-express.html
 * https://github.com/howdyai/botkit-storage-mongo
 */
var MongoClient = require('mongodb').MongoClient

var state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}