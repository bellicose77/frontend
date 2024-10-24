// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicationPost } from '../api/api';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // const response = await fetch('https://localhost:7128/api/User/register', {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   body: {
    //     phoneNumber: "01858047274",
    //     email: "abseruddin26@gmail.com",
    //     password: "1234",
    //     confirmPassword: "1234",
    //     firstName: "Abser",
    //     lastName: "Uddin",
    //     address: "BUET"
    //   },
    //   headers: {},
    // });

    // if (response.ok) {
    //   navigate('/login');
    // }
    debugger;
    const { data, err } = await publicationPost(
        'https://localhost:7128/api/User/register',
        {
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address
        }
      );

    if(data.status == 200){
        navigate('/login');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
