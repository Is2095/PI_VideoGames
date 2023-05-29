
import axios from 'axios';
import { GET_ALLGAMES, CLEAR_FILTERS, GET_GENRES, FILTER_GENRES, ORDER_RATING, ORDER_ALPHA, GET_PLATFORMS,FILTER_GAMESAPIBD, CLEAN_DETAIL, GET_DETAIL, POST_VIDEOGAMES, DATA_ERRORS, GET_GAMES_BY_NAME, CLEAN_SEARCH } from './actionType';

export const getAllGames = () => {   
    return async function (dispatch) {

        const endponint = 'http://localhost:3001/videogames/';  
        try {
            const { data } = await axios.get(`${endponint}`);
            return dispatch({type: GET_ALLGAMES, payload: data})            
        } catch (error) {
           return dispatch({type:DATA_ERRORS, payload: error})
        }  
    };
}

export const getGenres = () => {
    return async function (dispatch) {
        const endponint = 'http://localhost:3001/genres';
        try {
            const {data} = await axios.get(endponint)
            return dispatch({type: GET_GENRES, payload: data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})
        }
    }
}

export const getPlatforms = () =>{
    return async function (dispatch) {
        const endponint = 'http://localhost:3001/platforms';
        try {
            const {data} = await axios.get(endponint)
            return dispatch({type: GET_PLATFORMS, payload: data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})
        }
    }
};

export const getDetail = (id) => {
    
    return async function (dispatch) {
        const endponint = `http://localhost:3001/videogames/${id}`
        try {
            const {data} = await axios.get(endponint)
            return dispatch({type: GET_DETAIL, payload: data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})
        }
    }
};

export const getGamesByName = (name) => {
    return async function (dispatch) {
        const endponint = 'http://localhost:3001/videogames/';
        try {
            const gamesName = await axios.get(`${endponint}?name=${name}`)
            if (gamesName.data.length === 0) dispatch({type:DATA_ERRORS, payload: {message: 'Videogame not found'}}) 
            return dispatch({type: GET_GAMES_BY_NAME, payload: gamesName.data})
        } catch (error) {
            return dispatch({type:DATA_ERRORS, payload: error})           
        }
    }
};

export const postVideoGames = (form) => {
    const endponint = 'http://localhost:3001/videogames';
    return async () => {
        try {
            const createGame = await axios.post(endponint, form);
            
            alert('New game is created');
            return createGame
            
        } catch (error) {
          //dispatch( {type: DATA_ERRORS, payload: error})   
    }
   } 
}

export const filterGamesApiBd = (typeSource) => { return {type: FILTER_GAMESAPIBD, payload: typeSource} };

export const filterGenres = (genre) => { return {type: FILTER_GENRES, payload: genre} };

export const orderRating = (typeOrder) => { return {type: ORDER_RATING, payload: typeOrder} };

export const orderAlpha = (typeOrder) => { return {type: ORDER_ALPHA, payload: typeOrder} };

export const clearFilters = () => { return {type: CLEAR_FILTERS} };

export const cleanDetail = () => { return {type: CLEAN_DETAIL} };

export const cleanSearch = () => { return {type: CLEAN_SEARCH, payload: {}}}