


/// en produccion******************************************
const { postVGHandlers } = require('../handlers/index')

const postVideoGames = async (req, res) => {

    const {name, image, description, platforms, released, rating, genres, createdInDb} = req.body;
   
    try {
        if(!name || !image || !description || !platforms || !released || !rating || !genres) {
         
        res.status(404).json({error: 'Faltan datos'})

        }else {
            const videogameCreado = await postVGHandlers(name, image, description, platforms, released, rating, genres, createdInDb)
    
            res.status(200).json(videogameCreado)
        } 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
   
    
};

module.exports = postVideoGames;