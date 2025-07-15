import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/users/userContext";
import profile from "../../img/profile.png";

function Header() {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, user } = authContext;

  const userContext = useContext(UserContext);
  const { resetPassword } = userContext;

  // Function menghandle sidedar menu
  function handlerSidebar() {
    document.body.classList.toggle("toggle-sidebar");
  }

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("dark", newMode);
    document.body.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("dark") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <React.Fragment>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a
            href={window.location.origin}
            className="logo d-flex align-items-center"
          >
            <span className="d-none d-lg-block">Otopay</span>
          </a>
        </div>

        {/* Toggle Sidebar Button */}
        <i
          className="bi bi-list toggle-sidebar-btn text-white"
          onClick={handlerSidebar}
        ></i>

        {/* Profile Section */}
        {isAuthenticated && (
          <nav className="header-nav ms-auto d-flex align-items-center">
            {/* Dark Mode Toggle */}
            <div
              className="dark-mode-toggle d-flex align-items-center me-3"
              onClick={toggleDarkMode}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`bi ${
                  darkMode ? "bi-moon-fill" : "bi-sun-fill"
                } fs-5 text-warning`}
              ></i>
            </div>

            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img src={profile} alt="Profile" className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {user.names}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user.names}</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="/users/profile"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => resetPassword(user.user_code)}
                >
                  <i className="bi bi-gear"></i>
                  <span>Reset Password</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="pages-faq.html"
                >
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="/login"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </React.Fragment>
  );
}

export default Header;
