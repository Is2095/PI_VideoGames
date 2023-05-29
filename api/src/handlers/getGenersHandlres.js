
const {Genres} = require('../db')

const getGenresHandlres = async () => {
      const genresGames = await Genres.findAll()
      return genresGames;
};

module.exports = getGenresHandlres;
