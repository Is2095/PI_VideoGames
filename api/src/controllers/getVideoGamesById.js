
const {getByIdApiHandlers, getByIdBDHandlers} = require('../handlers/index')

const getVideoGamesById = async (req, res) => {
    const { idVG } = req.params;
    const { source} = req.body;
    try {
        if (source === 'api')  {
            const gamesApi = await getByIdApiHandlers(idVG);
            return res.status(200).json(gamesApi)} 
        if (source === 'db') {
            const gamesBD = await getByIdBDHandlers(idVG)  
            return res.status(200).json(gamesBD)
        };                          
    } catch (error) {
        res.status(500).json({error:error.message})
    }  
};

module.exports = getVideoGamesById;