
const { postVGHandlers } = require('../handlers/index')

const postVideoGames = async (req, res) => {

    const {name, image, description, releasedDate, rating, genres, platforms, createdInDb, precio} = req.body;
   
    const released = releasedDate;
    const platform = platforms;

        try {
            if(!name || !image || !description || !platforms || !releasedDate || !rating || !genres || !precio) {

            res.status(404).json({error: 'Missing data'})

            }else {
                const videogameCreado = await postVGHandlers(name, image, description, released, rating, genres, platform, createdInDb, precio)
        
                res.status(200).json(videogameCreado)
            } 
        } catch (error) {
            res.status(404).json({error: error.message})
        }
   
    
};

module.exports = postVideoGames;