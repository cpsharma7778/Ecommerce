import React from 'react';
import { Link } from 'react-router-dom';
const Nav=()=>{
   return(

    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Profile</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className='nav-link active'aria-current="page">Home</Link> 
        </li>
        <li className="nav-item">
        <Link to="/Product" className='nav-link active'aria-current="page">Product </Link>
        </li>
        <li className="nav-item">
        <Link to="/AddProduct" className='nav-link active'aria-current="page">Add product </Link>
        </li>
        <li className="nav-item">
        <Link to="/UpdateProduct" className='nav-link active' aria-current="page">Update Product </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
   )
}

export default Nav; 
