
const {Videogame, Genres} = require('../db')

const getByIdBDHandlers = async (idVG) =>{

     const videosgameBD = await Videogame.findByPk(idVG,{   
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })   
    if(videosgameBD) {return videosgameBD
    }else 
{
    throw Error('No existe ese videogame')
}
    
    
};

module.exports = getByIdBDHandlers;