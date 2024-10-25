// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { publicationPost } from '../api/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, err } = await publicationPost(
        'https://localhost:7128/api/User/login',
        {
            email: username,
            password: password
        }
      );
    
    if (data?.status == 200) {
        setErrorMessage('');
        dispatch({ type: 'LOGIN_SUCCESS' });
        dispatch({ type: 'USER_EMAIL', email: username });
        navigate('/');
    }
    else {
        setErrorMessage(err?.response?.data);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Didn't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
