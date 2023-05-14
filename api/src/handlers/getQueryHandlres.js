
const axios = require('axios');
const {Op} = require('sequelize')

const {Videogame, Genres} = require('../db')

require('dotenv').config();
const { API_KEY, URL_QUERY } = process.env;

const getQueryHandlers = async (name, page, source) => {
    if(source === 'api'){
        const {data}= await axios.get(`${URL_QUERY}%${name}%&key=${API_KEY}&page=${page}&page_size=15`);
        const dataApi = {
            countApi: data.count,
            dataApi: data.results.map(el =>{
                return {
                    id: el.id,
                    name:el.name,
                    image: el.image,
                    // description: el.description,
                    // platforms: el.platforms.map(el=>el.platform.name),
                    // released: el.released,
                    // rating: el.rating,
                    genres: el.genres.map(el=>el.name),
                    createdInDb: false,
                    }
                })
            }
            if (dataApi.dataApi.length === 0) throw Error('Api Videogame does not exist');
            return dataApi;
        }
        if (source === 'db'){
            const dataDb = await Videogame.findAll({
                attributes: ['id','name', 'image'],
                //attributes: ['id','name', 'image', 'description', 'platforms', 'released', 'rating'],
                where: {
                name: {
                    [Op.iLike]: `%${name}%`
                } 
            },
            include: {
                model: Genres,
                attributes:['name'],
                through: {
                    attributes:[]
                }
            },
        })
        const dataDbPage = dataDb.filter(el=> el.id > (page * 15 - 15 ) && el.id <= (page * 15))
        if (dataDbPage.length === 0) throw Error('Database Videogame does not exist')
        return dataDbPage;
    }

}

module.exports = getQueryHandlers;
