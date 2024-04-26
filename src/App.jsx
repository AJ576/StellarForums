import {Link,useRoutes} from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Page from './components/Page'
import Update from './components/Update'
import './App.css'
import { useState } from 'react'

function App() {
  const [search,setSearch] = useState("")
  let pages = useRoutes([
    {
      path:"/",
      element:<Home term={search}/>
    },
    {
      path:"/create",
      element:<Create/>
    },
    {
      path:"/post/:id",
      element:<Page />
    },
    {
      path:"/Update/:id",
      element:<Update/>
    }
  ])
  const preventDefaulter = (e)=>
  {
    e.preventDefault();
  }
  return (

    <div className='main'>
      <div className='headboard'>
        <div className='links'>
          <h1 className='logo '>Stellar Forums</h1>
          <form className='Search' onSubmit={preventDefaulter}><input type = "text" id="search" placeholder='SEARCH' onChange={e =>setSearch(e.target.value)}/></form>
          <div className='link'>
            <button>{<Link to={"/"}>Home</Link>}</button>
            <button>{<Link to={"/create"}>Create Post</Link>}</button>
          </div>
          
        </div>
      </div>
      
      <div className="dashboard">
        {pages}
      </div>
    </div>

  )
}

export default App
