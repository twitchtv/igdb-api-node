IGDB
=

Nodejs Wrapper for IGDB.com API. Requires an API key. Request one from your user settings screen.

Read more: https://www.igdb.com/api/v1/documentation

Setup
-
* `npm install igdb-api-node`
* Rename `config.json.example` to `config.json` and edit settings.
* `igdb = require('igdb-api-node')`

Usage
-

**Games**
https://www.igdb.com/api/v1/documentation/games

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

Read details on the search parameters here: https://www.igdb.com/api/v1/documentation/games

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
https://www.igdb.com/api/v1/documentation/companies

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
https://www.igdb.com/api/v1/documentation/people

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
