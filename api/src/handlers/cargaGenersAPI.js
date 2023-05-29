
const axios = require('axios');

const {Genres} = require('../db')

require('dotenv').config();

const { API_KEY, URL_GENRES } = process.env;

axios.get(URL_GENRES + API_KEY)
.then(({data})=>data.results.map(el=>el.name))
.then((apa)=>  apa.forEach(a=>
    Genres.findOrCreate({
        where:{'name':a}
    }) )
)
.catch((error)=> console.log(error));

           

    


