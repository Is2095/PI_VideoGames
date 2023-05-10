//console.log('estoy en el get de genres');
const getGenres = (req, res) => {
    res.status(200).send('estoy en el get de genres')
};

module.exports = getGenres;