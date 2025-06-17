import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import "./LandingPage.css";
import femaleImage from "../../assets/female.png";
import maleImage from "../../assets/male.png";

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/testmodel");
  };

  const teamMembers = [
    { name: 'Ahlam Mostafa', description: 'A dedicated computer science student focusing on AI and sustainability.' },
    { name: 'Afaf Nader', description: 'Passionate about environmental science and innovative tech solutions.' },
    { name: 'Salma Mohammed', description: 'ُExperienced System analyst, Speciallized in green projects .' },
    { name: 'Omar Kandil', description: 'A Software engineer and a fullstack developer. ' },
    { name: 'Amr Azmal', description: 'Experienced in networking and data science.' },
    { name: 'Zeyad Tarek', description: 'An Experienced mobile and IOS developer' },
  ];

  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="rotating-logo"></div>
        <div className="overlay">
          <h1 className="title">Let's Recycle for a Greener Tomorrow</h1>
          <p className="subtitle">
            Recycling helps conserve natural resources, reduce pollution, and save energy.
            Join the movement towards a sustainable future by making recycling a part of your everyday life.
          </p>

          <div className="cta-container">
            <button className="cta-button" onClick={handleNavigate}>
              Test Out Model
            </button>
          </div>
        </div>
      </div>

      <section className="about-company">
        <h2>About EcoNerve</h2>
        <p>
          EcoNerve is a comprehensive system that utilizes modern AI models to provide accurate predictions of the material inputted into it. 
          Our system is designed to streamline the recycling process, ensuring that items are properly categorized, 
          reducing waste and contributing to a cleaner, greener future.
        </p>
      </section>

      <div className="benefits">
        <h2>Why Choose Our Recycling AI Model?</h2>
        <ul>
          <li><strong>Efficient & Accurate:</strong> Our AI quickly classifies recycling items.</li>
          <li><strong>Environmentally Friendly:</strong> Contributes to cleaner communities.</li>
          <li><strong>Easy to Use:</strong> Just upload an image, and our model does the rest.</li>
        </ul>

        {/* Register Now Link */}
        <div className="register-now">
          <p>Ready to make a difference?</p>
          <Link to="/signup" className="cta-button">Register Now</Link>
        </div>
      </div>

      <div className="team-section">
        <h3>Meet the Team</h3>
        <p>We are a team of passionate computer science students committed to building a greener tomorrow.</p>
        <div className="team-cards">
          {teamMembers.map((member, index) => {
            const imgSrc = index > 2 ? maleImage : femaleImage;

            return (
              <div className="team-card" key={index}>
                <img
                  src={imgSrc}
                  alt={member.name}
                  className="team-member-image"
                />
                <h4>{member.name}</h4>
                <p>{member.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { LandingPage };
