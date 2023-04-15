import React from 'react'
import {Link} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import '../App.css'

const Navbar = () => {
  const[cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  const logout = ()=>{
    setCookies('access_tokem', '')
    window.localStorage.removeItem('userID')
    navigate('/auth')
  }


  return (
    <div className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/create-recipe'>Create Recipe</Link>
        
        {!cookies.access_token ?<Link to='/auth'>Login / Register</Link> : <><Link to='/saved-recipe'>Saved Recipe</Link><button onClick={logout}>Logout</button> </>}
        
    </div>
  )
}

export default Navbar