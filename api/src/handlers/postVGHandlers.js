
const { Videogame, Genres, Platform } = require('../db')

const postVGHandlers = async (name, image, description, released, rating, genres, platform, createdInDb, precio) => {
  
    const [crearVG, created] = await Videogame.findOrCreate({
        where: {name, image, description, released, rating, createdInDb, precio},
    })  
    if(created){
        genres.forEach(async el=> {
            const genresBD = await Genres.findAll({
                where: {name: el}
            })
            crearVG.addGenres(genresBD)
        });
        platform.forEach(async el => {
            const platformBD = await Platform.findAll({
                where: {name: el}
            })
            crearVG.addPlatforms(platformBD)
        })
        return crearVG;
    }else  throw Error( 'Existing videogame')    
}

module.exports = postVGHandlers;