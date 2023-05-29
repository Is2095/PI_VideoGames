
const axios = require('axios');

const {Platform} = require('../db')

require('dotenv').config();

const { API_KEY, URL_PLATFORMS } = process.env;

axios.get(URL_PLATFORMS + API_KEY)
.then(({data})=>data.results.map(el=>el.name))
.then((apa)=>  apa.forEach(a=>
    Platform.findOrCreate({
        where:{'name':a}
    }) )
)
.catch((error)=> console.log(error));