import React, { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../hooks/useGetUserID'
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'


export const CreateRecipe = () => {
  const USERID = useGetUserID()


  const [recipe, setRecipe] = useState({
    name:'',
    ingredients:[],
    instructions:'',
    imageUrl:'',
    cookingTime:0,
    userOwner:USERID
  })
  const [cookies,_] = useCookies(['access_token'])

  const navigate = useNavigate()

  const handleChange = (e)=>{
    const{name, value} = e.target
    setRecipe({...recipe, [name]:value})
  }
  
  const handleIngredientChange = (e, idx)=>{
    const{value} = e.target
    const ingredients = recipe.ingredients
    ingredients[idx] = value
    setRecipe({...recipe, ingredients})
  }

  const addIngredients = ()=>{
    setRecipe({...recipe, ingredients:[...recipe.ingredients, '']})
  }
  // console.log(recipe)
  const onSubmit = async(e)=>{
    e.preventDefault()
    try {
      await axios.post('https://recipe-blog-five-3cvzmemal-abhay-singh1.vercel.app/recipes', recipe, {header:{authorization:cookies.access_token}})
      alert('Recipe Created')
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' onChange={handleChange} />
        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx)=>{
          return(
            <input key={idx} type='text' name='ingredients' value={ingredient} onChange={(e)=>handleIngredientChange(e, idx)} />
          )
        })}
        <button onClick={addIngredients} type='button'>Add Ingredients +</button>
        <label htmlFor='instructions'>Instructions</label>
        <textarea id='instructions' name='instructions' onChange={handleChange}></textarea>
        <label htmlFor='name'>Image Url</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange} />
        <label htmlFor='cookingTime'>Cooking Time(Minutes)</label>
        <input type='number' id = 'cookingTime' name='cookingTime' onChange={handleChange}></input>

        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  )
}

