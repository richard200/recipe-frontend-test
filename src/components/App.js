import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import CreateRecipe from "../Recipe/CreateRecipe";
import Navigation from "./Navbar";
import RecipeList from "../Recipe/ViewRecipe";
import MyRecipes from "../Recipe/MyRecipes";
// import Recipes from "../Recipe/Recipes"

// import Home from "./Homepage";
import Signup from "./signup";
import About from "./About";
import Footer from "./Footer";
import LogoutButton from "./Logout";

export default function App(){
  const [loggedIn, setLoggedIn] = useState(true);

  function handleLogoutClick() {
    fetch('https://recipe-project-backend.onrender.com/logout', {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        sessionStorage.clear();
        setLoggedIn(false);
      } else {
        console.error('Failed to log out');
      }
    })
    .catch(error => console.error(error));
  }

  return(
    <div>
    <BrowserRouter>

  
  
    <Navigation/>
   
      {loggedIn ? (
        <div>
        
          <LogoutButton onClick={handleLogoutClick} />
        </div>
      ) : (
        <p>You are logged out.</p>,
        window.location.href = '/'
        
      )}
  
  
    <Routes>
    <Route path = "/" element={<About/>}/>
    {/* <Route path ="/about" element ={<About/>}/> */}
<Route path ="/login" element ={<Login/>}/>
{/* <Route path ="/logout" element ={<LogoutButton/>}/> */}
<Route path = "/addrecipe" element ={<CreateRecipe/>}/>
<Route path = "/recipes" element ={<RecipeList/>}/>
<Route path = "/myrecipes" element ={<MyRecipes/>}/>



<Route path = "/signup" element ={<Signup/>}/>
<Route path = "/footer" element = {<Footer/>}/>
</Routes>
  
  </BrowserRouter>
  </div>


)

}