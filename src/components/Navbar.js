import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  // const [yummy, setYummy] = useState("yummy.png")
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img src="yummy.png" alt="yummy.png"></img>
      </Link>
      <Link to="/">Home</Link>
      {/* <Link to="/createRecipe">Create Recipe</Link> */}
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/savedRecipes">Saved Recipes</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
