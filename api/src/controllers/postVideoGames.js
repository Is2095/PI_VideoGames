
const postVideoGames = (req, res) => {
    const {name, image, description, platforms, released, rating, geners, createdInDb} = req.body
    res.status(200).send(`estoy en el post de videogames nombre: ${nombre}, apellido: ${apellido}, edad: ${edad} `)
};

module.exports = postVideoGames;