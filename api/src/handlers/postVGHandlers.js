
const { Videogame, Genres } = require('../db')

const postVGHandlers = async (name, image, description, platforms, released, rating, genres, createdInDb) => {
    

    const [crearVG, created] = await Videogame.findOrCreate({
        where: {name, image, description, platforms, released, rating, createdInDb},
    })  
    if(created){
        genres.forEach(async el=> {
            const genresBD = await Genres.findAll({
                where: {name: el}
            })
            crearVG.addGenres(genresBD)
        })
        return crearVG;
    }else  throw Error( 'VideoGame ya existente')    
}

module.exports = postVGHandlers;