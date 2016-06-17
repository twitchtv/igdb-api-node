One of the principles behind IGDB.com is accessibility of data. We wish to share the data with anyone who wants to build cool videogame oriented websites, apps and services. This means that the information you contribute to IGDB.com can be used by other projects as well.

Thus, you are not only contributing to the value of this site but to hundreds of other projects as well. We are looking forward to see what exciting game related projects you come up with. Happy coding!

More info here:

https://www.igdb.com/api

IGDB
=

Nodejs Wrapper for IGDB.com API. Requires a Mashape.com API key.

Read more: https://market.mashape.com/igdbcom/internet-game-database/overview

Setup
-
* `npm install igdb-api-node`
* Rename `config.json.example` to `config.json` and edit settings.
* `igdb = require('igdb-api-node')`

Usage
-

**Games**

* `games.index(opts, callback)` Returns all games
```javascript
igdb.games.index({ limit: 5, offset: 15 }, output)
```

* `games.get(id, callback)` Returns game information
```javascript
igdb.games.get(3766, output)
```

* `games.meta(callback)` Returns total unique games count. (IE Mass effect (xbox/ps/pc) only counts as 1)
```javascript
igdb.games.meta(output)
```

* `igdb.games.search(searchParamsObject, output)`

Read details on the search parameters here: https://market.mashape.com/igdbcom/internet-game-database/overview#wiki-filters

```javascript
igdb.games.search({
q: 'penguin',
{
  limit: 3,
  offset: 4,
  filters: {
    platforms_eq: 3
  },
},
output
})
```

**Companies**

* `companies.index(opts, callback)` Returns all companies
```javascript
igdb.companies.index({ limit: 5, offset: 15 }, output)
```

* `companies.get(id, callback)` Returns game information
```javascript
igdb.companies.get('nintendo', output)
```

* `companies.meta(callback)` Returns total companies count.
```javascript
igdb.companies.meta(output)
```

* `igdb.companies.games(opts, companyId, output)`  Returns related games

```javascript
igdb.companies.games({
  limit: 3,
  offset: 4
}, 'nintendo', output)
```

**People**

* `people.index(opts, callback)` Returns all people
```javascript
igdb.people.index({ limit: 5, offset: 15 }, output)
```

* `people.get(id, callback)` Returns game information
```javascript
igdb.people.get('satoru-iwata', output)
```

* `people.meta(callback)` Returns total people count.
```javascript
igdb.people.meta(output)
```

* `igdb.people.games(opts, personId, output)` Returns related games

```javascript
igdb.people.games({
  limit: 3,
  offset: 4
}, 'satoru-iwata', output)
```

* `igdb.people.titles(personId, output)` Returns job titles for this person

```javascript
igdb.people.titles('satoru-iwata', output)
```
