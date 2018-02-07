[![Build Status](https://travis-ci.org/igdb/igdb-api-node.svg?branch=master)](https://travis-ci.org/igdb/igdb-api-node)
[![Coverage Status](https://coveralls.io/repos/github/igdb/igdb-api-node/badge.svg?branch=master)](https://coveralls.io/github/igdb/igdb-api-node?branch=master)
[![NPM Version](https://img.shields.io/npm/v/igdb-api-node.svg)](https://www.npmjs.com/package/igdb-api-node)
[![Downloads](https://img.shields.io/npm/dm/igdb-api-node.svg)](https://www.npmjs.com/package/igdb-api-node)

# igdb-api-node

A Node.js wrapper for the IGDB.com Free Video Game Database API.


## About IGDB
One of the principles behind IGDB.com is accessibility of data. We wish to share the data with anyone who wants to build cool videogame oriented websites, apps and services. This means that the information you contribute to IGDB.com can be used by other projects as well.

Thus, you are not only contributing to the value of this site but to thousands of other projects as well. We are looking forward to see what exciting game related projects you come up with. Happy coding!

More info here:
* [About the API](https://www.igdb.com/api)
* [API Documentation](https://igdb.github.io/api/about/welcome/)


## Installation and Setup

### Via [npm](https://www.npmjs.com/package/igdb-api-node):
```bash
$ npm install igdb-api-node
```

### In your code:

#### ES5:
```javascript
const igdb = require('igdb-api-node').default;
```

#### ES2015 or later:
```javascript
import igdb from 'igdb-api-node';
```

#### Using your API key

* Pass API key directly:
```javascript
const client = igdb('YOUR_API_KEY');
```

* OR set a process environment variable:
```bash
$ IGDB_API_KEY='YOUR_API_KEY' node yourCode.js
```

* OR set a global-scope variable:
```javascript
global.IGDB_API_KEY = 'YOUR_API_KEY';
const client = igdb();
```

## Usage

All API endpoints are available as methods on the igdb-api-node client object. Each method has the following signature:

### client.endpoint(options, [fields])

__Arguments__

* `options` - An Object containing URL query parameters and values.
* `fields` - An optional Array containing a list of desired response data fields.

__Example__

```javascript
import igdb from 'igdb-api-node';

const client = igdb('YOUR_API_KEY');

client.games({
    fields: '*', // Return all fields
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
}).then(response => {
    // response.body contains the parsed JSON response to this query
}).catch(error => {
    throw error;
});
```

The available endpoints are [documented and available here](https://igdb.github.io/api/endpoints/).

The IGDB API documentation provides [details on search parameters](https://igdb.github.io/api/references/filters/).

### client.image(imageObject, [size, [fileType]])

`igdb-api-node` provides handy image method for converting objects with `cloudinary_id` properties to full image URLs.

__Arguments__

* `imageObject` - An Object with a `cloudinary_id` property defining an image ID.
* `size` - An optional string defining an image size class. Permitted `size` descriptors, from smallest to largest:
    * `micro` - 35x35
    * `thumb` - 90x90
    * `cover_small` - 90x128
    * `logo_med` - 284x160
    * `cover_big` - 227x320
    * `screenshot_med` - 569x320
    * `screenshot_big` - 889x500
    * `screenshot_huge` - 1280x720
    * Append '_2x' to any size descriptor to recieve a Retina (DPR 2.0) quality image, e.g. `cover_small_2x`.
* `fileType` - An optional string file extension for the image format desired, e.g. `jpg`, `png`, etc.

__Example__
```javascript
import igdb from 'igdb-api-node';

const client = igdb('YOUR_API_KEY');

client.image({
    cloudinary_id: 'example-id-123'
}, 'cover_small', 'jpg'); // https://images.igdb.com/igdb/image/upload/t_cover_small/example-id-123.jpg
```

More image options are available in the [IGDB API documentation](https://igdb.github.io/api/references/images/).

### client.tagNumber(category, id)

`igdb-api-node` provides handy method for generating [tag numbers](https://igdb.github.io/api/references/tag-numbers/) when doing advanced filtering.

__Arguments__

* `category` - An integer representing the tag category (game, genre, theme)
* `id` - The ID of the category entity

__Example__
```javascript
import igdb from 'igdb-api-node';

const client = igdb('YOUR_API_KEY'),
    category = 1, // Genre
    id = 5; // Shooter
    
client.tagNumber(1, 5); // 268435461
```

More tag number options and information are available in the [IGDB API documentation](https://igdb.github.io/api/references/tag-numbers/).

## More examples

```javascript
import igdb from 'igdb-api-node';

const client = igdb('YOUR_API_KEY'),
    log = response => {
        console.log(response.url, JSON.stringify(response.body, null 2));
    };

/*
Search for up to two Atari platforms and return their names
*/
client.platforms({
    limit: 2,
    search: 'Atari'
}, [
    'name'
]).then(log);

/*
Search for up to five Zelda games with release dates between 1 Jan and
31 Dec 2011, sorted by release date in descending order.
*/
client.games({
    filters: {
        'release_dates.date-gt': '2010-12-31',
        'release_dates.date-lt': '2012-01-01'
    },
    limit: 5,
    offset: 0,
    order: 'release_dates.date:desc',
    search: 'zelda'
}, [
    'name',
    'release_dates.date',
    'rating',
    'hypes',
    'cover'
]).then(log);

/*
Search for two specific games by their IDs
*/
client.games({
    ids: [
        18472,
        18228
    ]
}, [
    'name',
    'cover'
]).then(log);

/*
Search for companies with 'rockstar' in their name. Return up to five
results sorted by name in descending order
*/
client.companies({
    field: 'name',
    limit: 5,
    offset: 0,
    order: 'name:desc',
    search: 'rockstar'
}, [
    'name',
    'logo'
]).then(log);
```

```javascript
// Grab all results using scroll API
igdb(apiKey).scrollAll('/games/?fields=name&filter[genre][eq]=7&limit=50') // Pass URL
.then(response => {
    // response = Array of all game objects
});
```