import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import CloseIcon from "@mui/icons-material/Close";


function Sidebar({ open, setOpen }) {

  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };


  const activeClass = ({isActive}) =>
    isActive ? "active-link" : "";


  return (
    <div className={`sidebar ${open ? "active" : ""}`}>

      <CloseIcon
        className="close-btn"
        onClick={() => setOpen(false)}
      />


      <h2 className="sidebar-title">
        🏢 Society Hub
      </h2>


      <ul className="sidebar-menu">


        {/* Resident */}

        {role === "RESIDENT" && (
          <>

            <li>
              <NavLink 
                to="/dashboard"
                className={activeClass}
              >
                🏠 Dashboard
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/raise-complaint"
                className={activeClass}
              >
                📝 Raise Complaint
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/my-complaints"
                className={activeClass}
              >
                📋 My Complaints
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/notifications"
                className={activeClass}
              >
                🔔 Notifications
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/profile"
                className={activeClass}
              >
                👤 Profile
              </NavLink>
            </li>

          </>
        )}



        {/* Admin */}

        {role === "ADMIN" && (
          <>

            <li>
              <NavLink 
                to="/admin"
                className={activeClass}
              >
                🏠 Dashboard
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/manage-complaints"
                className={activeClass}
              >
                📋 Manage Complaints
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/manage-residents"
                className={activeClass}
              >
                👥 Manage Residents
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/manage-staff"
                className={activeClass}
              >
                👷 Manage Staff
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/notifications"
                className={activeClass}
              >
                🔔 Notifications
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/profile"
                className={activeClass}
              >
                👤 Profile
              </NavLink>
            </li>

          </>
        )}



        {/* Staff */}

        {role === "STAFF" && (
          <>

            <li>
              <NavLink 
                to="/staff"
                className={activeClass}
              >
                🏠 Dashboard
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/notifications"
                className={activeClass}
              >
                🔔 Notifications
              </NavLink>
            </li>


            <li>
              <NavLink 
                to="/profile"
                className={activeClass}
              >
                👤 Profile
              </NavLink>
            </li>

          </>
        )}



        <li>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </li>


      </ul>


    </div>
  );
}


export default Sidebar;