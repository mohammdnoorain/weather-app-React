import { useState } from "react";
import "./ToggleButton.css"; // Import the CSS file

const ToggleButton = ({ onToggle }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
    onToggle(!isCelsius ? "Celsius" : "Fahrenheit");
  };

  return (
    <div className="toggle-container">
      <span className="toggle-label">{isCelsius ? "°C" : "°F"}</span>
      <label className="switch">
        <input type="checkbox" onChange={handleToggle} checked={!isCelsius} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleButton;
//
//
//
//
// import { useState } from "react";
// import "./ToggleButton.css"; // Import the CSS file
//
// const ToggleButton = ({ isCelsius }) => {
//   const [isCelsius, setIsCelsius] = useState(true);
//
//   const handleToggle = () => {
//     setIsCelsius(!isCelsius);
//     // onToggle(!isCelsius ? "Celsius" : "Fahrenheit");
//   };
//
//   return (
//     <div className="toggle-container">
//       <span className="toggle-label">{isCelsius ? "°C" : "°F"}</span>
//       <label className="switch">
//         <input type="checkbox" onChange={handleToggle} checked={!isCelsius} />
//         <span className="slider"></span>
//       </label>
//     </div>
//   );
// };
//
// export default ToggleButton;

