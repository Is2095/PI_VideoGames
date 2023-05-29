
import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";

const CardsContainer = () => {

// const videosGames = useSelector(state=> state.games[0])
// console.log(videosGames)
    return (
        <div className={style.container}>
            {/* {
                videosGames?.map((id, name, image, genres, createdInDb)=> (

                    <Card 
                        key={id}
                        id={id}
                        name={name}
                        image={image}
                        genres={genres}
                        createdInDb={createdInDb}    
                    />
                ))
            } */}
        </div>
    )
};

export default CardsContainer;