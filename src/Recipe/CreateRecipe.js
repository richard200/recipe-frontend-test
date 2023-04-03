import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';


const CreateRecipe = () => {


  // const navigate = useNavigate();
  // !isUserLoggedIn() && navigate('/about')

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  const userId = sessionStorage.getItem('userId');
  
  useEffect(() => {
    // Fetch categories from the backend API
    fetch('https://recipe-project-backend.onrender.com/categories')
      .then(response => response.json())
      .then(data => setCategories(data.data));
  }, []);
  
  const handleSubmit = event => {
    event.preventDefault();
   // Check if user is logged in
   fetch('https://recipe-project-backend.onrender.com/check')
   .then(response => response.json())
   .then(data => {
     if (data.isLoggedIn) {
       // User is logged in, send a POST request to create the new recipe
       fetch('https://recipe-project-backend.onrender.com/recipes', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           title: title,
           ingredients: ingredients,
           instructions: instructions,
           prep_time: prepTime,
           category_id: categoryId,
           user_id: userId
         })
       })
       .then(response => response.json())
       .then(data => {
        if (data) {
          // Display a success message
          alert('Recipe created successfully!');
          // Redirect the user to a new page
        
        } else {
          // Handle any errors
          alert('Error creating recipe. Please try again.');
        }
       }
         // Do something with the response data
       )
     } else {
       // User is not logged in, show an error message
       setError('Please log in to create a recipe.');
     }
   });


  // useEffect(() => {
  //   // Fetch categories from the backend API
  //   fetch('/categories')
  //     .then(response => response.json())
  //     .then(data => setCategories(data.data));
  // }, []);

  // const handleSubmit = event => {
  //   event.preventDefault();

  //   // Send a POST request to create the new recipe
  //   fetch('/recipes', {
  //     method: 'POST',
  //     // crossorigin: true,
  //     // mode: "no-cors",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       title: title,
  //       ingredients: ingredients,
  //       instructions: instructions,
  //       prepTime: prepTime,
  //       category_id: categoryId
        
  //   })
  // })
  //     .then(response => response.json())
  //     .then(data => (data))
      


  }
 
  // }
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Create a Recipe</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(event) => setTitle(event.target.value)} required
              />
            </Form.Group>

            <Form.Group controlId="formBasicInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)} required
              />
            </Form.Group>

            <Form.Group controlId="formBasicIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter ingredients"
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)} required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrepTime">
            <br></br>
              <Form.Label>Preparation Time (in minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter preparation time"
                value={prepTime}
                onChange={(event) => setPrepTime(event.target.value)} required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategoryId">
              <br></br>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)} required
              >
                 <option value="0">Select a category...</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Recipe
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateRecipe;
