
import { useState } from "react";
import "./ToggleButton.css";

const ToggleButton = ({ onToggle }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
    onToggle(!isCelsius ? "Celsius" : "Fahrenheit");
  };

  return (
    <div className="toggle-container">
      <label className="switch">
        <input type="checkbox" onChange={handleToggle} checked={!isCelsius} />
        <span className="slider">
          <span className="label-celsius">°C</span>
          <span className="label-fahrenheit">°F</span>
        </span>
      </label>
    </div>
  );
};

export default ToggleButton;

