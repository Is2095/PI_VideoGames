
const {Router} = require('express');
const routeGenres = Router();
const { getGenres } = require('../controllers/index')

routeGenres.get('/', getGenres);

module.exports = routeGenres;