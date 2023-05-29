
const {Videogame, Genres, Platform} = require('../db');

const getByIdBDHandlers = async (id) =>{

    const videosgameBD = await Videogame.findByPk(id,{   
        include: [
            {
            model: Genres,
            attributes: ['name'],
                through: {
                    attributes: [],
                }
            },
            {
             model: Platform,
             attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        ]
    });

    if(videosgameBD) {
        return videosgameBD;
    } else  return 'Videogame not found';
   
};

module.exports = getByIdBDHandlers;
