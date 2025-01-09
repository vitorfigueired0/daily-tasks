import PropTypes from "prop-types";
import "./Navbar.css";
import { GoGear } from "react-icons/go";
import { PiLayout } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navbar({ currentTab, setCurrentTab }) {
  const navigate = useNavigate()
  const navButtons = [
    { id: 1, label: "Board", icon: <PiLayout />, value: "board" },
    { id: 2, label: "Tags", icon: <GoGear />, value: "tags" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/auth')
  }
  
  return (
    <div className="navbar-wrapper">
      {/* <img className="navbar-logo" src={obucLogo} alt="Obuc logo" /> */}
      <div className="buttons-wrapper">
        {navButtons.map((button) => (
          <button
            key={button.id}
            className={`nav-button ${
              currentTab === button.value ? "active" : ""
            }`}
            onClick={() => {
              setCurrentTab(button.value);
            }}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
      </div>
      <button className="nav-button" id="logout-button" onClick={handleLogout}>
        <MdLogout />
        Log out
      </button>
    </div>
  );
}

Navbar.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
};
