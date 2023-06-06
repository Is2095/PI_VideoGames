
const {Videogame, Genres, Platform} = require('../db');

const getAllHandlersBd = async (req, res) => {
    const datosBD  = await Videogame.findAll({
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

        if(datosBD.length !== 0) {
                return res.status(200).json(datosBD);
        } else   return res.status(400).json({message: 'Database no Data'});
};

module.exports = getAllHandlersBd;