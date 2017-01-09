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
* `igdb = require('igdb-api-node')`
* `global.mashapeKey = 'YOUR_KEY'` (alternatively use `process.env.mashapeKey`)

Usage
-

**Games**

* `games(opts)` Returns all games
```javascript
igdb.games({ limit: 5, offset: 15, fields: "*" }).then(output)
```

* `games.get({ ids: [3766] })` Returns game information
```javascript
igdb.games({ ids: [3766], fields: "*" }).then(output)
```

* `igdb.games({ search: "zelda", fields: "*" })`

Read details on the search parameters here: https://market.mashape.com/igdbcom/internet-game-database/overview#wiki-filters

```javascript
igdb.games({
  search: 'penguin',
  limit: 3,
  offset: 4,
  filters: {
    "platforms-eq": 3
  },
  fields: "*"
}).then(output)
```

**Companies**

* `companies.index(opts).then(output)` Returns all companies
```javascript
igdb.companies({ limit: 5, offset: 15, fields: "*" }).then(output)
```

* `companies.get(id, callback)` Returns game information
```javascript
igdb.companies({ search: 'nintendo', fields: "*" }).then(output)
```

Many more data entities are documented here: https://market.mashape.com/igdbcom/internet-game-database

**Images**

A handy image function is included to convert objects with cloudinary_ids to full urls.

```
igdb.image(cover, "thumb", "jpg")
```

More options are documented here: https://market.mashape.com/igdbcom/internet-game-database/overview#wiki-images

Also check out the sandbox.js file for more examples.