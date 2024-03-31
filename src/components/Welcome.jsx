import React from 'react'
import './welcome.css'
import {useNavigate} from 'react-router-dom'  //help to navigate from one to other page


// main component 

function Welcome() {


    const [isSearch, setIsSearch] = React.useState("")
    const [btnText, setBtnText] = React.useState("Search")
    const [btn, setBtn] = React.useState(false)
    const navigate = useNavigate()



    // this fn is used by the search button present in this page to move to Searched page by using useNavigate effect 

    const navigateTo = () =>{     

        // first parameter is required second is optional, here i am passing the second parameter of city name to Searched.jsx

        navigate("/Searched",  {state : {city: isSearch} })
    }

  return (
    <div className='main-container'>
        <div className='card-body'>
            <h3 className='heading'>Weather<span className='forecast'> Forecast</span></h3>
            <p className='desc'>Enter Place Below To Check The The Weather Conditions </p>
            <div className='search-bar-sec'>
            <input type="text" placeholder='Search City' className='search-bar' required
                value={isSearch} 
                onChange={(val) => setIsSearch(val.target.value)}
            
            />
            <button className='btn' onClick={navigateTo}>{btnText}</button>
            </div>

        </div>
        
    </div>
  )
}

export default Welcome
