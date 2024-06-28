import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Auth/signup.css';

export default function Sign_up() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirm_password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      let msg ="Account created successfully.";
     
      const response = await axios.post('http://localhost:5000/signup', formData);
      toast.success(msg);
      navigate('/'); 
    } catch (err) {
     
      if (err.response && err.response.status === 409) {
        const msg = "Email alredy exists.";
        toast.error(msg);
      } else {
        console.error('Error during signup', err);
        toast.error('Failed to sign up. Please check your details and try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
