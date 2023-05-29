
import { useSelector } from "react-redux"
import { useState } from "react"
import style from './FormPlatforms.module.css'
import { useDispatch } from "react-redux"

import { DATA_ERRORS } from '../../Redux/Actions/actionType';
import { ModalErrores } from "../index";

export const validate = (platform) => {
    let error = {}
    
    if(platform.length === 0) error.platforms = 'You must enter at least one platform'
    if((platform.length) > 10 ) error.platforms = 'Only 10 platforms are allowed per Videogame'
    return error
}
const FormPlatforms = ({setForm, form, statusPlatform, setStatusPlatform, setError}) => {
    
    const platforms = useSelector(state=>state.platforms)
    const dispatch = useDispatch()
    
    const [platform, setPlatform] = useState([]);
    const [errorPlatform, setErrorPlatform] = useState({platforms:''});
    
    const platfomHandle = (e) => {
        const {value} = e.target
        if(platform.includes(value)) {
            setPlatform(platform.filter(ele => ele !== value))
            setErrorPlatform(validate(platform.filter(ele => ele !== value))) 
        } else {
            setPlatform([...platform, value])
            setErrorPlatform(validate([...platform, value]))
        } 
    }
       
    const cleanSelectionPlatforms = (e) => {
        e.preventDefault()
        setPlatform([])
        const selectionDelete= document.querySelectorAll('#plataformas')
        selectionDelete.forEach(a=> a.checked = false)
    }

    const saveSelectionHandler = (e) => {

        e.preventDefault()
        
        setError(validate(platform))
        setErrorPlatform(validate(platform))
      
        setForm({...form, platforms: platform})
          
        setPlatform([])

        if(Object.keys(validate(platform)).length === 0) setStatusPlatform(!statusPlatform)          
    }

    const cierreModal = () => {
        dispatch({type:DATA_ERRORS, payload: {}})
    }
    
    return (
        <div>
            <ModalErrores cierreModal={cierreModal}/>
            {statusPlatform
            
            ? <div>
                {platforms &&  statusPlatform && platforms.map(e=> {
                            return (
                                <div>
                                    <input type="checkbox" id="plataformas" name={`${e.name}`} value={`${e.name}`} onChange={platfomHandle}/>
                                    <label>{e.name}</label>
                                </div>
                                )
                            })
                }
                {errorPlatform.platforms && <p className={style.error}>{errorPlatform.platforms}</p>}
                <button id="save" onClick={saveSelectionHandler} >Save Selection</button>
                <button onClick={cleanSelectionPlatforms}>Clean Selection</button>
              </div>
            :null
            }
        
    </div>
      
    )
}
export default FormPlatforms;