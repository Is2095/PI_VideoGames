
const axios = require('axios');
const {Videogame, Genres} = require('../db')

require('dotenv').config();
const { API_KEY, URL_VIDEOSJUEGOS } = process.env;

const getAllHandlers = async (page, source) => {

    console.log(source);
    if(source === 'api'){
        const {data}= await axios.get(`${URL_VIDEOSJUEGOS}${API_KEY}&${page}&page_size=5`)
        
        const videoGameAPI  = data.results.map(el=> {
                return {
                    id: el.id,
                    name: el.name,
                    image: el.background_image,
                    createdInDb: false,
                    genres: el.genres.map(el => {return {name: el.name}})
                }
            });
        return videoGameAPI
    }
    if (source === 'db'){
        const videoGameBD  = await Videogame.findAll({
                attributes: ['id', 'name', 'image', 'createdInDb'],
                include: {
                    model: Genres,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            });
        const videoGameDbPage = videoGameBD.filter(el=> el.id > (page * 15 - 15 ) && el.id <= (page * 15))
        return videoGameDbPage;
    };
};

module.exports = getAllHandlers;