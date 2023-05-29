
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getGamesByName, cleanSearch } from '../../Redux/Actions/actions'

import { DATA_ERRORS } from '../../Redux/Actions/actionType';
import { ModalErrores } from "../index";

import style from './Search.module.css'


const Search = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    
    const nameHandle = (e) => {
        const {name, value} = e.target;
        setName(value)
    }
    const searchHandle = (name) => {
        dispatch(getGamesByName(name))
    }

    const cleanHandle = (e) => {
        e.preventDefault()
        dispatch(cleanSearch())
        document.getElementById('inputbyname').value = ''
        setName('')
    }

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }
    return  (
        <div>
            <ModalErrores cierreModal={cierreModal}/>
            <input type="text" id='inputbyname' placeholder="Search by name..." onChange={nameHandle} />
            <button onClick={()=>searchHandle(name)}>Search</button>
            <button onClick={cleanHandle}>Clean search</button>
        </div>
    )
}

export default Search;