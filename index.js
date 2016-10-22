var request = require('request');
var config = require('./config');

var perform_request = function(url, resolve, reject){

  var options = {
    url: url,
    headers: {
      'Accept': 'application/json',
      'X-Mashape-Key': config.apikey
    }
  };

  return request(options, function(error, response, body) {
    if (error) {
      if(reject){
        return reject(error);
      }else{
        throw error;
      }
    }

    if (response.statusCode == 200) {
      if (resolve) {
        return resolve({
          url: options.url,
          body: JSON.parse(body),
          head: response.headers,
          scroll_url: response.headers['X-Next-Page'],
          scroll_count: response.headers['X-Count']
        });
      }
    } else {
      var error = response.statusCode + " - " + options.url;
      if(reject){
        return reject(error);
      }else{
        throw error;
      }
    }
  });
}

var get = function(url, fields, opts, resolve, reject) {
  url = config.endpoint + url + "/";
  if (opts) {
    var optUrl = [], filter, param;
    for (param in opts) {
      var paramValue = opts[param];
      if (param == "filters") {
        for (filter in paramValue) {
          filter_split = filter.split('-')
          optUrl.push("filter[" + filter_split[0] + "][" + filter_split[1] + "]=" + paramValue[filter]);
        }
      } else if(param == "ids") {
        url += paramValue.join(',')
      } else {
        optUrl.push(param + "=" + paramValue);
      }
    }
    if(fields){ optUrl.push("fields=" + fields.join(',')); }
    url += "?" + optUrl.join('&');
  }

  return perform_request(url, resolve, reject);
};

var endpoint = function(e){
  return function(opts, fields) {
    return new Promise(function(resolve, reject){
      get(e, fields, opts, resolve, reject);
    });
  }
}

var endpoints = ["games", "companies", "people", "genres", "keywords", "platforms", "player_perspectives", "pulses", "themes", "franchises", "collections"],
endpoints_obj = {
  image: function(image_object, size = "thumb", filetype = "jpg"){
    if(image_object){
      return "https://res.cloudinary.com/igdb/image/upload/t_" + size + "/" + image_object.cloudinary_id + "." + filetype;
    }
  },
  scroll: function(url){
    return new Promise(function(resolve, reject){
      return perform_request(url, resolve, reject);
    });
  }
};

for(i = 0; i < endpoints.length; i++){
  endpoints_obj[endpoints[i]] = endpoint(endpoints[i]);
}

module.exports = endpoints_obj