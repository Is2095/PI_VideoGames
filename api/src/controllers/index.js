
const getVideoGames = require('./getVideoGames');
const postVideoGames = require('./postVideoGames')
const getVideoGameByQuery = require('./getVideoGamesByQuery');
const getVideoGamesById = require('./getVideoGamesById');
const getGenres = require('./getGenres');

module.exports = {
    getVideoGames,
    postVideoGames,
    getVideoGameByQuery,
    getVideoGamesById,
    getGenres,
}