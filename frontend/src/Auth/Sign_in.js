import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import '../Auth/signin.css';
import { Link } from 'react-router-dom';

export default function Sign_in() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const secretKey = 'dummy_secret_key'; // Dummy secret key

  const encryptPayload = (payload) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString();
    return ciphertext;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted with", { email, password });

    const encryptedPayload = encryptPayload({ email, password });

    try {
      const response = await axios.post('http://localhost:5000/signin', {
        payload: encryptedPayload,
      });

      console.log("API response", response);

      if (response.status === 200) {
        toast.success('Signed in successfully!');
        navigate('/Home'); // Redirect to the home page or dashboard
      }
    } catch (err) {
      if (err.response) {
        console.error('Error during sign-in', err.response);
        if (err.response.status === 400) {
          toast.error('Bad request. Please check your input.');
        } else if (err.response.status === 401) {
          toast.error('Invalid credentials. Please try again.');
        } else {
          toast.error('Failed to sign in. Please try again later.');
        }
      } else {
        console.error('Error during sign-in', err);
        toast.error('Failed to sign in. Please try again later.');
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Sign In</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email or Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email or phone number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">Sign In</button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <p>Don't have an account?</p>
                  <Link to="/sign_up" className="btn btn-secondary">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
