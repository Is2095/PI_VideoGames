
import { useSelector } from "react-redux"
import { useState } from "react";
import style from './FormGenre.module.css'
import { useDispatch } from "react-redux"

import { DATA_ERRORS } from '../../Redux/Actions/actionType';
import { ModalErrores } from "../index";

export const validate = (genre) => {
    let error= {};

    if(genre.length === 0) error.genres = 'You must enter at least one genre'
    if((genre.length) > 5 ) error.genres =  'Only 10 genres are allowed per Videogame'
    return error
}
const FormGenre = ({setForm, form, statusGenre, setStatusGenre, setError}) => {

    const genres = useSelector(state=> state.genres)
     const dispatch = useDispatch()
    
    const [genre, setGenre] = useState([]);
    const [errorGenre, setErrorGenre] = useState({genres:''});

    const genresHandle = (e) => {
        const {value} = e.target
        if(genre.includes(value)){
            setGenre(genre.filter(ele => ele !== value))
            setErrorGenre(validate(genre.filter(ele => ele !== value)))
        }else {
            setGenre([...genre, value])
            setErrorGenre(validate([...genre, value]))
        }
    }

    const cleanSelectionGenres = (e) => {
        e.preventDefault()
        setGenre([])
        const electionDelete = document.querySelectorAll("#generos")
        electionDelete.forEach(a => a.checked = false)
    }
    const saveSelectionHandler = (e) => {

        e.preventDefault()

        setError(validate(genre))
        setErrorGenre(validate(genre))

        setForm({...form, genres:genre})

        setGenre([])

        if(Object.keys(validate(genre)).length === 0) setStatusGenre(!statusGenre)
    }

     const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }
    
    return (
        <div>
            <ModalErrores cierreModal={cierreModal}/>
            {statusGenre   
            ? <div>
                {genres &&  statusGenre && genres.map(e=> {
                            return (
                                <div>
                                    <input type="checkbox" id="generos" name={`${e.name}`} value={`${e.name}`} onChange={genresHandle}/>
                                    <label>{e.name}</label>
                                </div>
                                )
                            })
                        }
                        {errorGenre.genres && <p className={style.error}>{errorGenre.genres}</p>}
                        <button onClick={saveSelectionHandler}>Save Selection</button>
                        <button onClick={cleanSelectionGenres}>Clean Selection</button>
              </div>
            :null
            }
        </div>
    )
}

export default FormGenre;