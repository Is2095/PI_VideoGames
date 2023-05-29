
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import  { getGenres, getPlatforms, postVideoGames } from "../../Redux/Actions/actions";

import { DATA_ERRORS } from '../../Redux/Actions/actionType';

import { FormGenre, FormPlatforms, ModalErrores } from "../../components/index";

export const validate = (form) => {
    const error = {}
    const dateControl = document.querySelector('input[type="date"]')
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    const fecha = Date.now()

    if(form.name.length <= 3)  error.name ='The name requires a minimum of three charecteres';
    if(!validateUrl.test(form.image)) error.image = 'You must enter a URL';
    if(form.description.length>=255) error.description = 'The number of characters must not exceed 255'
    if(form.rating < 0) error.rating = 'The rating cannot be negative';
    if(form.rating > 100 ) error.rating = 'The rating cannot eceed the value 100';
    if(form.releasedDate.trim() === '')  error.releasedDate = 'You must choose a date';
    if(dateControl.valueAsNumber > fecha-10000000) error.releasedDate = 'The date must not be greater than the current';
    return error;
}
export const validatePlatform = (platformSelect) => {
    const error = {}
    if(platformSelect.length === 0 ) console.log('vacio');
    return error
}

const Form = () => {
    const fecha = new Date()
    const dispatch = useDispatch()

useEffect (() => {
    dispatch(getGenres())
    dispatch(getPlatforms())
},[dispatch])

    const [form, setForm] = useState({
        name: '',
        image: '',
        description: '',
        platforms: [],
        releasedDate: '',
        rating: 0,
        genres:[],
        createdInDb: true,
    });
    const [error, setError]=useState({
         name: '',
        image: '',
        description: '',
        platforms: '',
        releasedDate: '',
        rating: '',
        genres:'',
    });
    
    const [statusPlatform, setStatusPlatform] = useState(false); //estado del boton de seleccion true=seleccionado
    const [statusGenre, setStatusGenre] = useState(false);

    const changeInput = (e) => {
        const {name, value} = e.target;        
        setError(validate({...form, [name]:value}))
        setForm({...form, [name]:value})
    }

    const platformsHandle = (e) => {   
        e.preventDefault()
        if(!statusPlatform && !statusGenre) setStatusPlatform(!statusPlatform)
        if(statusPlatform && !statusGenre) setStatusPlatform(!statusPlatform)
        if(!statusPlatform && statusGenre) {
            setStatusGenre(!statusGenre)
            setStatusPlatform(!statusPlatform)
        }
        if(statusPlatform && statusGenre) setStatusPlatform(!statusPlatform)
    }
    
    const genreHandle = (e) => {
        e.preventDefault()
        if(!statusGenre && !statusPlatform) setStatusGenre(!statusGenre)
        if(statusGenre && !statusPlatform) setStatusGenre(!statusGenre)
        if(!statusGenre && statusPlatform) {
            setStatusPlatform(!statusPlatform)
            setStatusGenre(!statusGenre)
        }
        if(statusGenre && statusPlatform) setStatusGenre(!statusGenre)
    }
   
    const submitHandler = (e) => {
        e.preventDefault()
        
        if(!error.name && !error.image && !error.description && !error.rating && !error.releasedDate && !error.platforms && !error.genres) {
            dispatch(postVideoGames(form))
        }
    }

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }

    return (
        <div>
             <ModalErrores cierreModal={cierreModal}/>
            <form onSubmit={submitHandler}>
                <h1>Creating Videogames!!!</h1>
                <div>
                    <label>Name: </label>
                    <input type="text" name='name' value={form.name} placeholder='Videogame name...' onChange={changeInput}/>  
                    {error.name && <span>{error.name}</span>}   
                </div>

                <div>
                    <label>Image: </label>
                    <input type="text" name='image' value={form.image} placeholder="Game image URL..." onChange={changeInput}/>      
                    {error.image && <span>{error.image}</span>}   
                </div>

                <div>
                    <label>Description: </label>
                    <textarea type="text" name='description' value={form.description} placeholder="Description..." onChange={changeInput}/>      
                    {error.description && <span>{error.description}</span>}   
                </div>

                <div>
                    <label>Rating: </label>
                    <input type="number" min={0} max={100} name='rating' value={form.rating} placeholder="Rating" onChange={changeInput}/>      
                    {error.rating && <span>{error.rating}</span>}   
                       
                </div>

                <div>
                    <label>Released Date: </label>
                    <input type="date" name='releasedDate' value={form.releasedDate} placeholder="Released date..." onChange={changeInput}/>      
                    {error.releasedDate && <span>{error.releasedDate}</span>}   
                </div>
                <div>
                    <button onClick={platformsHandle}>Platforms: </button>
                    {error.platforms && <span>{error.platforms}</span>}
                </div>
                <FormPlatforms
                    statusPlatform={statusPlatform}
                    setStatusPlatform={setStatusPlatform}
                    form={form}
                    setForm={setForm}
                    setError={setError}
                    />

                <div>
                     <button onClick={genreHandle}>Genres: </button>
                    {error.genres && <span>{error.genres}</span>}
                </div>
                <FormGenre
                    statusGenre={statusGenre}
                    setStatusGenre={setStatusGenre}
                    form={form}
                    setError={setError}
                    setForm={setForm}
                />

                <button type='submit'>Create Videogame</button>
            </form>

            <div>
                <Link to='/home'>
                    <button>Go Back</button>
                </Link>
            </div>

    </div>
    )
};

export default Form;