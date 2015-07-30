request = require('request')
config = require('./config')
serialize = require('node-serialize')

get = (url, callback, opts = false) ->

  url = config.endpoint + url
  if opts
    optUrl = []
    for param, paramValue of opts
      if param is "filters"
        for filter, filterValue of paramValue
          optUrl.push "filters[#{filter}]=#{filterValue}"
      else
        optUrl.push "#{param}=#{paramValue}"

    url += "?" + optUrl.join('&')

  options =
    url: url
    headers:
      'Accept': 'application/json'
      'Authorization': 'Token token="' + config.apikey + '"'

  request options, (error, response, body) ->

    throw error if error

    if response.statusCode is 200
      callback(body) if callback
    else
      throw response.statusCode

module.exports =
  games:
    get: (id, callback) -> get 'games/' + id, callback
    meta: (callback) -> get 'games/meta', callback
    search: (opts, callback) -> get 'games/search', callback, opts
