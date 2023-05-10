
const {Router} = require('express');
const routeVideoGames = Router();
const {getVideoGames, postVideoGames, getVideoGameByQuery, getVideoGamesById} = require('../controllers/index')

routeVideoGames.get('/', (req, res) =>{
    const {name} = req.query;
 
  if (name) {
    const query = getVideoGameByQuery(name)
    res.status(200).json(query)
  }
  else  {
    const query2 = getVideoGames ()
    res.status(200).json(query2);
  } 
});

routeVideoGames.post('/', postVideoGames);

routeVideoGames.get('/:idVG', getVideoGamesById);


module.exports = routeVideoGames;