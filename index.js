var request = require('request');
var config = require('./config');

var get = function(url, fields, opts, callback) {
  if (opts == null) {
    opts = false;
  }
  url = config.endpoint + url;
  if (opts) {
    var optUrl = [], filter, param;
    for (param in opts) {
      var paramValue = opts[param];
      if (param === "filters") {
        for (filter in paramValue) {
          var filterValue = paramValue[filter];
          last_underscore = filter.lastIndexOf('_');
          filter = [filter.substring(0, last_underscore), filter.substring(last_underscore+1)]
          optUrl.push("filter[" + filter[0] + "][" + filter[1] + "]=" + filterValue);
        }
      } else {
        optUrl.push(param + "=" + paramValue);
      }
    }
    if(fields){ optUrl.push("fields=" + fields.join(',')); }
    url += "?" + optUrl.join('&');
  }

  console.log(url);

  var options = {
    url: url,
    headers: {
      'Accept': 'application/json',
      'X-Mashape-Key': config.apikey
    }
  };
  return request(options, function(error, response, body) {
    if (error) {
      throw error;
    }
    if (response.statusCode === 200) {
      if (callback) {
        return callback(JSON.parse(body));
      }
    } else {
      throw response.statusCode;
    }
  });
};

module.exports = {
  games: function(opts, fields) {
    return new Promise(function(resolve, reject){
      get('games', fields, opts, resolve);
    });
  },
  companies: {
    index: function(opts, fields) {
      return get('companies', fields, opts);
    }
  },
  people: {
    index: function(opts, fields) {
      return get('people', fields, opts);
    }
  },
  image: function(image_object, size = "thumb", filetype = "jpg"){
    if(image_object){
      return "https://res.cloudinary.com/igdb/image/upload/t_" + size + "/" + image_object.cloudinary_id + "." + filetype;
    }
  }
};