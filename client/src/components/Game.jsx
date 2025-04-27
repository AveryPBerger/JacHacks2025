import Fridge from "../components/Fridge"
import UtilityDisplay from "./DisplayUtility";
import { useState } from "react";

function Game(){
    const [showUtility, setShowUtility] = useState(false); 

    const ClickHandle = () =>{
        
        setShowUtility(!showUtility)
    }
    return (
        <div>
            <button onClick={ ClickHandle}><Fridge/></button>

            {showUtility && <UtilityDisplay utilityId={1}/> }
    </div>
    ) 
}

export default Game;