
const {Router} = require('express');

const routeVideoGames = Router();

const {getVideoGames, postVideoGames, getVideoGamesById} = require('../controllers/index');

routeVideoGames.get('/', getVideoGames);

routeVideoGames.post('/', postVideoGames);

routeVideoGames.get('/:id', getVideoGamesById);

module.exports = routeVideoGames;
