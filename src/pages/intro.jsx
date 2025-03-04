import { useNavigate } from "react-router-dom";
import "../styles/intro.css"; // Correct path based on your structure

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <video autoPlay loop muted className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <h1>Welcome to BloodSync</h1>
        <p>Connecting donors with those in need, saving lives together.</p>
        <button onClick={() => navigate("/welcome")}>Get Started</button>
      </div>
    </div>
  );
};

export default Intro;