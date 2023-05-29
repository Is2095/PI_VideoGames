
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from 'react-router-dom';

import style from './Detail.module.css'

import { DATA_ERRORS } from '../../Redux/Actions/actionType';
import { ModalErrores } from "../index";

import { getDetail, cleanDetail } from "../../Redux/Actions/actions";

const Detail = () => {

    const {id} = useParams()

    const dispatch = useDispatch();  
    const detail = useSelector(state=> state.detail)

    useEffect(() => {
        dispatch(cleanDetail(id));
        dispatch(getDetail(id));
    },[id]);

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }

    return (
        <div>
            <ModalErrores cierreModal={cierreModal}/>
            {detail.createdInDb && <h2>Data base Videogame</h2>}
            <div>
                <h2>Name: {detail.name}</h2>
                <img src={detail.image} alt="image not found" />
            </div>
            <div>
                <h5>Rating: {detail.rating}</h5>
                <h5>Release Date: {detail.released}</h5>
                <h5>
                    Genres: 
                    {
                        detail.genres?.map(e=>{
                            return (
                                <span> "{e.name}" </span>
                            )
                        })
                    }
                </h5>
                <h5>
                    Platforms: 
                    {
                        detail.platforms?.map(e => {
                            return (
                                <span> "{e.name}"</span>
                            )
                        })
                    }
                </h5>
            </div>
            <div>
                <h5>Description: {<div dangerouslySetInnerHTML={{__html: detail.description}}/>}</h5>
                                
            </div>

            <div>
                <Link to='/home'>Go Back</Link>
            </div>
        </div>
    )
};

export default Detail;