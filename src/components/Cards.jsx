import { supabase } from "../client";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Cards = ({title,credits,time,flair,id}) =>{

    const [vote, setVote] = useState(credits)

    const changeCount = () =>
    {
            setVote(vote+1);
            updateCount();
        
    }
    const updateCount = async () =>
        {
            console.log(vote)
            await supabase
            .from('Posts')
            .update({Credits:vote+1})
            .eq('id',id); 
        }


    
    return(
        <div className="container">
            <h4>{`Posted on ${time}`}</h4>
            <Link to={`/post/${id}`}>
                <div className="inner">
                <h2>{title}</h2>
                </div>
            </Link>
            <div className="down">
                <button onClick={changeCount}>{`⬆️${vote}`}</button>
                <button>{flair}</button>
            </div>
            
        </div>
    )
}
export default Cards;