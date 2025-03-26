import React from 'react';
import "./heroSection.css";
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="heroSection" className="hero--section">
     <div className="hero--section--content--box">
      <div className="hero--section--content">
        <h1 className="hero--section--title">
          <span className="hero--section-title--color"> Kortex By KPMG</span>{" "}
          <br />
          Intelligent AI Solutions for Your Business
        </h1>
        <p className="hero--section-description">
        Fliquam massa nisl quis neque suspendisse in orci 
          enim of Lorem Ipsum proin gravida nibh vel velit auctor aliquet aenean sollicitudin
        </p>
      </div>
      <button className="btn btn-primary" onClick={()=>{navigate('/Kortex')}}>Go to Kortex</button>
    </div>
    
  </section>
  )
}

export default HeroSection