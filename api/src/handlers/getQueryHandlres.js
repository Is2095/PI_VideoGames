
const axios = require('axios');

const {Videogame, Genres, Platform} = require('../db')

require('dotenv').config();
const { API_KEY, URL_QUERY } = process.env;

const getQueryHandlers = async (name) => {
 
    let videosGamesAllName = [];
    let uno = {};
    let dos = {};
    let tres = {};
    let datos = [];
    let videosGamesApi= []
    
    uno = await axios.get(`${URL_QUERY}%${name}%&key=${API_KEY}&page_size=40`);

    if (uno.data.next !== null) {

        dos = await axios.get(uno.data.next)
       
        if (dos.data.next !== null) {
      
           
                tres = await axios.get(dos.data.next)
                datos = uno.data.results.concat(dos.data.results.concat(tres.data.results))
            

        } else datos = uno.data.results.concat(dos.data.results);

    } else datos = uno.data.results
   
    if(uno.data.results.length !== 0) {
        videosGamesApi = datos?.map(e=> {
            return {
                id: e.id,
                name: e.name,
                image: e.background_image,
                release: e.released,
                rating: e.rating,
                createdInDb: false,
                platforms: e.platforms?.map(e => {return {name: e.platform.name}}),
                genres: e.genres?.map(el => {return {name: el.name}})
            }
        });
    } else videosGamesApi = []

    let datosBD  = await Videogame.findAll({
        include: [
            {
                model: Genres,
                through: {
                    attributes: [],
                }, attributes: ['name'],
            },
            {
                model: Platform,  
                through: {
                    attributes: [],
                },attributes: ['name'],
            }
        ]
    });
    let videosGamesBd = datosBD.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))

    if(videosGamesApi.length !==0 && videosGamesBd.length !==0) videosGamesAllName=(videosGamesBd.concat(videosGamesApi))
    if(videosGamesApi.length ===0 && videosGamesBd.length !==0) videosGamesAllName=(videosGamesBd);
    if(videosGamesApi.length !==0 && videosGamesBd.length ===0) videosGamesAllName=(videosGamesApi)
   
    return  videosGamesAllName

}

module.exports = getQueryHandlers;
