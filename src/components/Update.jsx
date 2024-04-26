import {useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { supabase } from "../client";

const Update = () =>
{
    const [title, setTitle] = useState();
    const[text,setText] = useState();
    const[img,setImg] = useState();
    const[Flair,setFlair] = useState();
    const[Key,setKey] = useState();
    const nav = useNavigate();

    const [data,setData] = useState([{Title:null, Text:1, Img:null, Credits:null,}])

    const params = useParams();
    useEffect(() =>
    {
        const fetchPost = async () => {
            const {data} = await supabase
              .from('Posts')
              .select().eq('id',params.id)
            // set state of posts
            setData(data)
          }
        fetchPost();
    },[]);

    const createPost = async (event) =>
    {
        event.preventDefault();
        await supabase
        .from('Posts')
        .update({Title:title,Text:text,Img:img,flair:Flair,key:Key})
        .eq('id',params.id);
        alert("Your Post was updated");
        nav("/")
    };
    return(
        <div className="create">
            <form className="createPost" onSubmit={createPost}>
                <input id ="title" name="title" placeholder={data[0].Title} onChange={e=>setTitle(e.target.value)}/>
                <input id ="title" name="key" placeholder="Sceret-key(used to edit/delete post)" onChange={e=>setKey(e.target.value)}/>
                <textarea id ="text" rows = "10" cols = "50" placeholder={data[0].Text} onChange={e=>setText(e.target.value)}/>
                <input id ="img" name="img" placeholder={data[0].Img} onChange={e=>setImg(e.target.value)}/>
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
                <button id="submit" type="submit">Update</button>
            </form>
        </div>
    );
}
export default Update;