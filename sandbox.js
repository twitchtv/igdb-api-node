igdb = require('./index');

function log(res){
  res.cover = igdb.image(res.cover, 'thumb', 'jpg');
  console.log(JSON.stringify(res, null, " "));
}

var fields = [
'name',
'slug',
'created_at',
'updated_at',
'summary',
'storyline',
'regions',
'collection',
'franchise',
'hypes',
'rating',
'rating_count',
'player_perspectives',
'game_modes',
'keywords',
'themes',
'genres',
'status',
'release_dates',
'alternative_names',
'screenshots',
'cover',
'esrb',
'pegi'
];

igdb.games({
  limit: 1,
  offset: 0,
  filters: {
    rating_gt: 9
  }
}, fields).then(log);