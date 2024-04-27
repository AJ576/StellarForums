import { useEffect, useState } from "react"
import { supabase } from "../client"
import { Link } from "react-router-dom";
import Cards from "./Cards";

const Home = ({term}) =>
{
    const [Posts,setPosts] = useState([]);
    const [Flair,setFlair] = useState("")
    useEffect(() => {
        const fetchPosts = async() => {
            const {data} = await supabase
            .from('Posts')
            .select()
            .order('created_at',{ascending:false});

            setPosts(data.filter((post) => post.Title.toLowerCase().includes(term.toLowerCase())).filter((post) => post.flair.includes(Flair)))
        };
        fetchPosts();

    },[])
    return(
        <>
            <div className="container-l">
                                <h2>Filter by: </h2>
                                <ul className="filterer">
                                    <li><input type = "radio" name = "type" value = "" onChange={e=>setFlair(e.target.value)}/>None</li>
                                    <li><input type = "radio" name = "type" value = "General" onChange={e=>setFlair(e.target.value)}/>General</li>
                                    <li><input type = "radio" name = "type" value = "Question" onChange={e=>setFlair(e.target.value)}/>Question</li>
                                    <li><input type = "radio" name = "type" value = "News" onChange={e=>setFlair(e.target.value)}/>News</li>
                                    <li><input type = "radio" name = "type" value = "Discovery" onChange={e=>setFlair(e.target.value)}/>Discovery</li>
                                    <li><input type = "radio" name = "type" value = "Thoughts" onChange={e=>setFlair(e.target.value)}/>Thoughts</li>
                                    <li><input type = "radio" name = "type" value = "Existential Crisis" onChange={e=>setFlair(e.target.value)}/>Existential Crisis</li>
                                    <li><input type = "radio" name = "type" value = "Feeling Funny" onChange={e=>setFlair(e.target.value)}/>Feeling Funny</li>
                                    <li><input type = "radio" name = "type" value = "Just Wonderful" onChange={e=>setFlair(e.target.value)}/>Just Wonderful</li>
                                </ul>
            </div>
            <div className="Posts_container">
            {
                Posts.map((post,i) => {
                    return(
                            <Cards key = {i} title={post.Title} credits={post.Credits} time={post.date} flair = {post.flair} id={post.id}/>
                    )
                })
            }
            </div>
        </>
        
    )

}

export default Home