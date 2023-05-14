

const {getQueryHandlers, getAllHandlers} = require('../handlers/index');

const getVideoGames = async (req, res) => {
     const {name} = req.query;
     const {page, source} = req.body;
     
     
     try {

          const videosGames = name 
               ?  await getQueryHandlers(name, page,source)
               :  await getAllHandlers(page,source);
          return res.status(200).json(videosGames);

     } catch (error) {
          return res.status(400).json({error: error.message});      
     }
      
} 
module.exports = getVideoGames;