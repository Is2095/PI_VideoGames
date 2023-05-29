
const { Router } = require('express');

require('../handlers/cargaGenersAPI')
require('../handlers/cargaPlatformAPI')

const routeGenres = require('./routeGenres');
const routeVideoGames = require('./routeVideoGames');
const routePlatforms = require('./routePlatforms');

const router = Router();
router.use('/', (req, res, next) =>{

    const jsonPost = req.body;
    const {name, image, description, releasedDate, rating, genres, platforms, createdInDb} = jsonPost;

    if(Object.keys(jsonPost).length !== 0){
        if(!name || !image || !description || !platforms || !releasedDate || !rating || !genres || !createdInDb){

            return res.status(404).json({error: 'Missing data'});
        };
    };
    next()
});

router.use('/videogames', routeVideoGames);
router.use('/genres', routeGenres);
router.use('/platforms', routePlatforms);

module.exports = router;
