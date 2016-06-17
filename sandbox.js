igdb = require('./index');

function log(res){
  for(i in res){
    game = res[i];
    game.cover = igdb.image(game.cover);
  }
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
  q: "battlfield 4",
  limit: 1,
  offset: 0,
  filters: {
    rating_gt: 9
  }
}, fields).then(log);