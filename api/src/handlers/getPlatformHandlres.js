
const { Platform } = require('../db')

const getPlatformHandlres = async () => {
    const platformGames = await Platform.findAll()
    return platformGames;
};

module.exports = getPlatformHandlres;
