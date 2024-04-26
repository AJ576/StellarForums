import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const Create = () =>
{
    const [title, setTitle] = useState();
    const[text,setText] = useState();
    const[img,setImg] = useState();
    const[Key,setKey] = useState();
    const[Flair,setFlair] = useState();
    const nav = useNavigate();
    const createPost = async (event) =>
    {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${year}-${month}-${day}`;
        event.preventDefault();
        await supabase
        .from('Posts')
        .insert({Title:title,Text:text,Img:img,date:currentDate,flair:Flair,key:Key})
        .select();
        alert("Your Post was created!");
        nav("/")
    };
    return(
        <div className="create">
            <form className="createPost" onSubmit={createPost}>
                <input id ="title" name="title" placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
                <input id ="title" name="key" placeholder="Sceret-key(used to edit/delete post)" onChange={e=>setKey(e.target.value)}/>
                <textarea id ="text" rows = "10" cols = "50" placeholder="Text" onChange={e=>setText(e.target.value)}/>
                <input id ="img" name="img" placeholder="image-url" onChange={e=>setImg(e.target.value)}/>
                <div className="types">
                    <h3 style={{padding:'2%'}}>Select a flair</h3>
                            <ul>
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
                <button id="submit" type="submit">POST</button>
            </form>
        </div>
    );
}
export default Create;