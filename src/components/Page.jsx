import {useParams,useNavigate} from "react-router-dom";
import { supabase } from "../client";
import { useState,useEffect } from "react";


const Page = () =>
{
    const [data,setData] = useState([{Title:null, Text:1, Img:null, Credits:null,}])
    const [vote, setVote] = useState(data[0].Credits)
    const [comment,setComment] = useState()
    const [comments, setComments] = useState([])
    const [len,setLen] = useState(0)
    const nav = useNavigate();
    const params = useParams();
    useEffect(() =>
    {
        const fetchPost = async () => {
            const {data} = await supabase
              .from('Posts')
              .select().eq('id',params.id)
            // set state of posts
            setData(data)
            setVote(data[0].Credits)
            setComments(data[0].Comments)
            setLen(data[0].Comments.length)
          }
        fetchPost();
    },[]);
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
            .eq('id',params.id); 
        }
        
        const updateComment = (text) =>
        {
            setComment(text)
        }
        const addComments = async () =>
        {
            let newCom = comments;
            newCom.push(comment);
            setComments(newCom)
            await supabase
            .from('Posts')
            .update({Comments:comments})
            .eq('id',params.id)
        }
        const updatePost = async() =>
        {
            const key = prompt("Enter the key")
            if(key === data[0].key)
            {
                nav(`/Update/${params.id}`)
            }
            else{
                alert("Wrong key")
            }
        }
        const deletePost = async() =>
        {
            const key = prompt("Enter the key")
            if(key === data[0].key)
            {
                await supabase
                .from('Posts')
                .delete()
                .eq('id',params.id);
                alert(`The Post was deleted`);
                nav("/");

            }
            else{
                alert("Wrong key")
            }
        }
    return(

        <>
        <div className="page-card">
            <div className="container-l" style={{maxWidth:"5%", marginLeft:"1%", backgroundColor:"#8F43EE",alignSelf:"start"}}>
                <h3>{data[0].flair}</h3>
            </div>
            <h1 id="line">{data[0].Title}</h1>
            <p style={{fontSize: "20px"}}>{data[0].Text}</p>
            {(data[0].Img != null && data[0].Img != '') ? (<img className="img" src={data[0].Img}/>):(console.log("No Img"))}
        </div>

        <div className="buttons">
            <button onClick={changeCount}>{`⬆️${vote}`}</button>
            <h3>{`Comments: ${len}`}</h3>
            <div className="edits">
                <button onClick={updatePost}>Update</button>
                <button onClick={deletePost}> Delete</button>
            </div>
            
        </div>

        <div className="comment-section">
            <div className="make Comments">
                <form onSubmit={addComments}>
                    <input className="com-text" type="text" placeholder="comment" onChange={e=>updateComment(e.target.value)}/>
                    <button type="submit">Submit</button>
                </form>
                <h1 id="line"></h1>
            </div>

            <div className="comments">
                {
                    comments.map((com,i) =>
                    {
                       return(
                        <h3 id="line-c">{`--${com}`}</h3>
                       ) 
                    })
                }
            </div>
        </div>
        </>
        
    )
}
export default Page;