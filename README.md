IGDB
=

Nodejs Wrapper for IGDB.com API. Requires an API key. Request one from your user settings screen.

Read more: https://www.igdb.com/api/v1/documentation

Setup
-
* `npm install igdb`
* Rename `config.json.example` to `config.json` and edit settings.

Usage
-

**Games**

* `games.get(id, callback)` Returns game information
* `games.meta(callback)` Returns total unique games count. (IE Mass effect (xbox/ps/pc) only counts as 1)
