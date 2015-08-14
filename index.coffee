request = require('request')
config = require('./config')

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
      callback(JSON.parse(body)) if callback
    else
      throw response.statusCode

module.exports =
  games:
    index: (opts, callback) -> get 'games', callback
    get: (id, callback) -> get 'games/' + id, callback
    meta: (callback) -> get 'games/meta', callback
    search: (opts, callback) -> get 'games/search', callback, opts

  companies:
    index: (opts, callback) -> get 'companies', callback, opts
    get: (id, callback) -> get 'companies/' + id, callback
    meta: (callback) -> get 'companies/meta', callback
    games: (opts, id, callback) -> get 'companies/' + id + '/games', callback, opts

  people:
    index: (opts, callback) -> get 'people', callback, opts
    get: (id, callback) -> get 'people/' + id, callback
    meta: (callback) -> get 'people/meta', callback
    games: (opts, id, callback) -> get 'people/' + id + '/games', callback, opts
    titles: (opts, id, callback) -> get 'people/' + id + '/titles', callback, opts
