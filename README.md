[![NPM Version](https://img.shields.io/npm/v/igdb-api-node.svg)](https://www.npmjs.com/package/igdb-api-node)
[![Downloads](https://img.shields.io/npm/dm/igdb-api-node.svg)](https://www.npmjs.com/package/igdb-api-node)

# igdb-api-node

A Node.js wrapper for the IGDB.com Free Video Game Database API.


## About IGDB
One of the principles behind IGDB.com is accessibility of data. We wish to share the data with anyone who wants to build cool videogame oriented websites, apps and services. This means that the information you contribute to IGDB.com can be used by other projects as well.

Thus, you are not only contributing to the value of this site but to thousands of other projects as well. We are looking forward to see what exciting game related projects you come up with. Happy coding!

More info here:
* [About the API](https://www.igdb.com/api)
* [API Documentation](https://api-docs.igdb.com)


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

#### ES6 or later:
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

## Usage

This library wraps node-apicalypse and further examples can be seen here: https://github.com/igdb/node-apicalypse

```js
// Example using all methods.
const response = await igdb()
    .fields(['name', 'movies', 'age']) // fetches only the name, movies, and age fields
    .fields('name,movies,age') // same as above

    .limit(50) // limit to 50 results
    .offset(10) // offset results by 10

    .sort('name') // default sort direction is 'asc' (ascending)
    .sort('name', 'desc') // sorts by name, descending
    .search('mario') // search for a specific name (search implementations can vary)

    .where(`first_release_date > ${new Date().getTime() / 1000}`) // filter the results

    .request('/games'); // execute the query and return a response object

console.log(response.data);
```

### client.tagNumber(category, id)

`igdb-api-node` provides handy method for generating [tag numbers](https://api-docs.igdb.com/#tag-numbers) when doing advanced filtering.

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

More tag number options and information are available in the [IGDB API documentation](https://api-docs.igdb.com/#tag-numbers).
