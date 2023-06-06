
const axios = require('axios');
require('dotenv').config();

const { API_KEY, URL_BYID } = process.env;

const getByIdApiHandlers = async (id) => {

    const {data} = await axios.get(`${URL_BYID}${id}?key=${API_KEY}`)

        const videoGameIdDatos = {
             id: data.id,
             name: data.name,
             image: data.background_image,
             description: data.description,
             platforms: data.platforms?.map(el =>el.platform),
             released: data.released,
             rating: data.rating,
             genres: data.genres
        }
    if(videoGameIdDatos) {
        return videoGameIdDatos
    } else  return 'Videogame not found';
};

module.exports = getByIdApiHandlers;