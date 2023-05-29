
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import  { getAllGames, clearFilters, getGenres, getPlatforms } from "../../Redux/Actions/actions";

import style from './Home.module.css';

import { DATA_ERRORS } from '../../Redux/Actions/actionType';

import { Card, Filters, Pagination, ModalErrores, Search } from '../../components/index';

const Home = () => {

    const dispatch = useDispatch();
    const gamesRender = useSelector((state)=> state.games);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamePerPage] = useState(15); 
    const [otro, setOtro] = useState('')
    
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    
    const currentGames = gamesRender.slice(indexOfFirstGame, indexOfLastGame);

    useEffect (() => {
        dispatch(getAllGames());
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[dispatch])
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);       
    }

    const handlerClearFilters = () => {
        dispatch(clearFilters());
    }

    const cierreModal = () => {
        const apa = 'aksjdhflkasjhdfk'
        console.log('cerrando modal home');
        dispatch({type:DATA_ERRORS, payload: {}})
    }

    return (
        <div>    
            <ModalErrores cierreModal={cierreModal}/>       
            <div>

                <div>
                   <Pagination 
                    gamesPerPage={gamesPerPage}
                    allGames={gamesRender.length}
                    pagination={pagination}
                    currentPage={currentPage}
                    />
                </div>
                <div>
                    <Search/>
                </div>
                <div>
                   <Filters
                        setCurrentPage={setCurrentPage}
                        setOtro={setOtro}
                    />
                    <button onClick={handlerClearFilters}>Clear Filters</button>
                  
                </div>
                <div className={style.cards}>
                    {
                       currentGames.length !== 0 
                       ? currentGames?.map(ele => {
                            return (
                                <div className={style.card}>
                                    <Card
                                    key={ele.id}
                                    id={ele.id}
                                    name={ele.name}
                                    image={ele.image}
                                    rating={ele.rating}
                                    genres={ele.genres}
                                />
                                </div>                             
                            )
                        })
                        : null
                    }
                </div>
                <div></div>
            </div>
        </div>
    )
};

export default Home;
