import PropTypes from "prop-types";
import "./Navbar.css";
import { FaTag } from "react-icons/fa";
import { MdLogout, MdViewKanban } from "react-icons/md";
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";

export default function Navbar({ currentTab, setCurrentTab }) {
  const navigate = useNavigate()
  const navButtons = [
    { id: 1, label: "Board", icon: <MdViewKanban />, value: "board" },
    { id: 2, label: "Tags", icon: <FaTag />, value: "tags" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/auth')
  }
  
  return (
    <div className="navbar-wrapper">
      <img className="navbar-logo" src={logo} alt="Logo" />
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
