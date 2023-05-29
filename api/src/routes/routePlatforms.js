
const {Router} = require('express');

const routePlatforms = Router();

const {getPlatforms} = require('../controllers/index');

routePlatforms.get('/', getPlatforms);

module.exports = routePlatforms;
