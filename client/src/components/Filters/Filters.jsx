
import { useDispatch, useSelector } from "react-redux";

import { filterGenres, orderRating, orderAlpha, filterGamesApiBd
 } from "../../Redux/Actions/actions";

const Filters = ({setCurrentPage, setOtro}) => {
    const dispatch = useDispatch();
    
    const genres = useSelector(state=>state.genres)
    
    const handleFilterBd = (e) => {
        const {value} = e.target
        dispatch(filterGamesApiBd(value))
        setCurrentPage(1);
    }
    const handleFilterGenre = (e) => { 
        const {value} = e.target 
        dispatch(filterGenres(value))
        setCurrentPage(1)
    };
    
    const handleOrder = (e) =>{
        const {value} = e.target
        if(value==='ascRating' || value==='descRating')  dispatch(orderRating(value))
        if(value==='ascAlpha' || value==='desAlpha') dispatch(orderAlpha(value)) 
        setCurrentPage(1)
        setOtro(value)
    }

    return (
        <div>
            <div>
                <select onChange={handleFilterBd}>
                    <option>Source</option>
                    <option value="all">All</option>
                    <option value="api">Api</option>
                    <option value="db">Games Created</option>
                </select>
                </div>
                <div>
                <select onChange={handleOrder}>
                    <option>Order </option>
                    <optgroup label="Order by Rating">
                         <option value="ascRating">Ascendente</option>
                        <option value="descRating">Descendente</option>
                    </optgroup>
                    <optgroup label="Alphabetically">
                        <option value="ascAlpha">A - Z</option>
                        <option value="desAlpha">Z - A</option>
                    </optgroup>                      
                </select>
            </div>
            <select onChange={handleFilterGenre}>
               <option>Filter</option>
                <optgroup label="Filter by genres">
                    <option value="all">All</option>
                        {
                            genres?.map(e=>{
                                return (
                                    <option value={e.name}>{e.name}</option>
                                )
                            })
                        }
                </optgroup>           
            </select>
        </div>
        
    )
}

export default Filters;