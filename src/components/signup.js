import React, { useState } from 'react';


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://recipe-project-backend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      console.log(data);
      window.location.href = 'https://recipe-project-backend.onrender.com/login' // redirect to login page after successful registration
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create an account</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;