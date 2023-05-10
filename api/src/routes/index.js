const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeGenres = require('./routeGenres');
const routeVideoGames = require('./routeVideoGames');

const router = Router();

router.use('/videogames', routeVideoGames)
router.use('/genres', routeGenres)
// router.get('/genres', (req, res) => res.status(200).json('estoy'))

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
