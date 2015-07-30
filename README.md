IGDB
=

Nodejs Wrapper for IGDB.com API. Requires an API key. Request one from your user settings screen.

Read more: https://www.igdb.com/api/v1/documentation

Setup
-
* `npm install igdb`
* Rename `config.json.example` to `config.json` and edit settings.
* `igdb = require('igdb')`

Usage
-

**Games**

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
igdb.games.search
  q: 'penguin'
  filters:
    platforms_eq: 3
, output
```
