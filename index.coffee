request = require('request')
config = require('./config')

get = (url, callback) ->
  options =
    url: config.endpoint + url
    headers:
      'Accept': 'application/json'
      'Authorization': 'Token token="' + config.apikey + '"'

  request url, (error, response, body) ->

    throw error if error

    if response.statusCode is 200
      callback(body) if callback
    else
      throw response.statusCode

module.exports =
  games:
    get: (id, callback) -> get 'games/' + id, callback
    meta: (callback) -> get 'games/meta', callback
