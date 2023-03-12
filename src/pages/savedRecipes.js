import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {

    const getSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://yummy-recipes-backend.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    getSavedRecipes();
  }, []);

    
  return (
    <div className="savedWrapper">
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id) && <h1>SAVED</h1>}
            <div>
              <h2>{recipe.name}</h2>
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <div className="ingredients">
              <p>{recipe.ingredients}</p>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;
