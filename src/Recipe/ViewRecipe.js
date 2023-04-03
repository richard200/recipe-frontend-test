import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Category from '../components/Category';
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://recipe-project-backend.onrender.com/recipes');
        let data = await response.json();
        // console.log(recipes);
        setRecipes(data.data);
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

  // const handleDelete = async (recipeId) => {
  //   try {
  //     const response = await fetch(`/recipes/${recipeId}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
  //     } else {
  //       throw new Error('Failed to delete recipe');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleEdit = (recipeId) => {
  //   // handle edit functionality
  //   console.log(`/recipes/${recipeId}`);
  // };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Instructions</th>
          <th>Ingredients</th>
          <th>Prep Time(In minutes)</th>
          <th>Category</th>
          
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
                    <Category category={categories.find(category => category.id === recipe.category_id)} />

                    {/* <td>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(recipe.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(recipe.id)}
                      >
                        Delete
                      </Button>
                    </td> */}
                    </tr>
                              )
                            }
                            
                              
                          
                            )}
        
      </tbody>
    </Table>
  );
};

export default RecipeList;
