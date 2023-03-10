import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import CreateRecipe from "./createRecipe";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(
          "https://yummy-recipes-backend.onrender.com/recipes"
        );
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://yummy-recipes-backend.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipes();
    if (cookies.access_token) {
      getSavedRecipes();
    }
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://yummy-recipes-backend.onrender.com/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="homeWrapper">
      <CreateRecipe />
      <div className="recipesWrapper">
        <h1>Recipes</h1>
        <ul>
          {recipes &&
            recipes.map((recipe) => (
              <li key={recipe._id}>
                {savedRecipes.includes(recipe._id) && (
                  <h2>SAVED</h2>
                )}
                <div>
                  <h2>{recipe.name}</h2>
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  </button>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
