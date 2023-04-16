import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import {useCookies} from 'react-cookie'


export const Home = () => {
  const [recipes, setRecipe] = useState([])
  const [savedRecipes, setSavedRecipe] = useState([])
  const [cookies, _] = useCookies(['access_token'])

  const userID = useGetUserID()

  useEffect(()=>{
    const getRecipe = async()=>{
      try {
      const response = await axios.get('https://recipe-blog-five-fjn39you5-abhay-singh1.vercel.app/recipes')
      setRecipe(response.data)
    } catch (err) {
      console.error(err)
    }
    }

    const fetchSavedRecipe = async()=>{
      try {
        const response = await axios.get(`https://recipe-blog-five-fjn39you5-abhay-singh1.vercel.app/recipes/savedrecipes/ids/${userID}`)
        setSavedRecipe(response.data.savedRecipes)
        console.log(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getRecipe()
    if(cookies.access_token)  fetchSavedRecipe()
  }, [userID])

  const saveRecipe =async(recipeID)=>{
    try {
      const response = await axios.put('https://recipe-blog-five-fjn39you5-abhay-singh1.vercel.app/recipes',{recipeID, userID},{headers:{authorization: cookies.access_token}})
      setSavedRecipe(response.data.savedRecipes)
      console.log(response)
    } catch (err) {
      console.error(err)
    } 
  }

  const isRecipeSaved =(id)=> savedRecipes.includes(id)
  

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)}  disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved?'Saved':'Save'}</button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

