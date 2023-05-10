
const axios = require('axios');

require('dotenv').config();

const { API_KEY } = process.env;
const prueba = {}

const getVideoGamesById = async (req, res) => {
    const {idVG} = req.params;
    try {
        const {data} = await axios.get(`https://api.rawg.io/api/games/${idVG}?key=${API_KEY}`)
       const videoGameIdDatos = {
            name:  data.name,
            image: data.background_image,
            description: data.description,
            platforms:  data.platforms?.map(el =>el.platform.name),
            released:  data.released,
            rating:  data.rating,
            geners:  data.genres?.map(el => el.name)
        }
        res.status(200).json(videoGameIdDatos)        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
};

module.exports = getVideoGamesById;