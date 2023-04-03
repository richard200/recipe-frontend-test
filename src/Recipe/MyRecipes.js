import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
// import Category from '../components/Category';
function ViewRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://recipe-project-backend.onrender.com/me');
        let data = await response.json();
        // console.log(recipes);
        setRecipes(data.recipes);
        console.log(recipes);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };

    fetch('https://recipe-project-backend.onrender.com/categories')
    .then(response => response.json())
    .then(data => setCategories(data.data));
    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`https://recipe-project-backend.onrender.com/recipes/${recipeId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
      } else {
        throw new Error('Failed to delete recipe');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetch('/me')

  //   .then(response => response.json())
  //   .then(data => {
  //       console.log(data.revipes)
  //       if (data && data.recipes) { // add null check here
  //           // Filter the recipes to show only those created by the logged-in user
          
  //           const filtered = data.recipes.filter(recipe => recipe.user_id === userId);
  //           // console.log(filteredRecipes)
  //           setRecipes(filtered);
  //           console.log(data.recipes)
            
  //         }
  //       // const userId = data.data.id;
  //       // const filteredRecipes = data.recipes.filter(recipe => recipe.user_id === userId);
  //       // setRecipes(filteredRecipes);
  //   })
  //   //   if (data && data.data && Array.isArray(data.data)) {
  //   //     // Filter the recipes to show only those created by the logged-in user
  //   //     const filteredRecipes = data.data.filter(recipe => recipe.user_id === sessionStorage.getItem('userId'));
  //   //     setRecipes(filteredRecipes);
  //   //   } else {
  //   //     // Handle errors
  //   //     console.error('Error: Invalid response format');
  //   //   }
  //   // })
  //   // .catch(error => {
  //   //   console.error('Error fetching recipes:', error);
  //   // });
  //       //   .then(response => response.json())
  //       //   .then(data => {
  //       //     // Filter the recipes to show only those created by the logged-in user
  //       //     const filteredRecipes = data.data.filter(recipe => recipe.user_id === sessionStorage.getItem('userId'));
  //       //     setRecipes(filteredRecipes);
  //       //   });
  //   // const fetchRecipes = async () => {
  //   //   try {
  //   //     const response = await fetch('/me');
  //   //     let data = await response.json();
  //   //     // console.log(recipes);
  //   //     setRecipes(data.data);
  //   //     console.log(recipes);
  //   //     setIsLoading(false)
  //   //   } catch (error) {
  //   //     console.log(error);
  //   //     setIsLoading(false)
  //   //   }
  //   // };

  //   fetch('/categories')
  //   .then(response => response.json())
  //   .then(data => setCategories(data.data));
  //   // fetchRecipes();
  // }, []);



//   useEffect(() => {
//     // Fetch recipes from the backend API
//     fetch('/recipes')
//       .then(response => response.json())
//       .then(data => {
//         // Filter the recipes to show only those created by the logged-in user
//         const filteredRecipes = data.filter(recipe => recipe.user_id === sessionStorage.getItem('userId'));
//         setRecipes(filteredRecipes);
//       });
//       fetch('/categories')
//       .then(response => response.json())
//       .then(data => setCategories(data.data));
//       fetchRecipes();
//     }, []);
//   }, []);
 
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Instructions</th>
        <th>Ingredients</th>
        <th>Prep Time</th>
        {/* <th>Category</th> */}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
      Array.isArray(recipes) && recipes.map((recipe, index) => {
        console.log(recipe, index);
        return (
                  <tr key={recipe.id}>
                  <td>{index + 1}</td>
                  <td>{recipe.title}</td>
                  <td>{recipe.instructions}</td>
                  <td>{recipe.ingredients.split(",")}</td>
                  <td>{recipe.prep_time}</td>
                  {/* <Category category={categories.find(category => category.id === recipes.category_id)} /> */}

                  <td>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        Delete
                      </Button>
                      </td>
                  </tr>
                            )
                          }
                          
                            
                        
                          )}
      
    </tbody>
  </Table>
  )
}
export default ViewRecipes;
