import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";

import "./Navbar.css";

function Navbar({ open, setOpen }) {

    const { notificationCount } =
        useNotifications();

    const navigate = useNavigate();


    // ==========================================
    // GET FULL NAME
    // ==========================================

    const userName =
        localStorage.getItem("userName") || "User";


    return (

        <nav className="navbar">

            {/* MENU BUTTON */}

            <MenuIcon
                className="menu-btn"
                onClick={() =>
                    setOpen(!open)
                }
            />


            {/* LEFT */}

            <div className="navbar-left">

                <h2>
                    Smart Society Portal
                </h2>

            </div>


            {/* RIGHT */}

            <div className="navbar-right">

                {/* NOTIFICATIONS */}

                <Badge
                    badgeContent={notificationCount}
                    color="error"
                    max={99}
                    showZero={false}
                    overlap="circular"
                >

                    <NotificationsOutlinedIcon
                        className="nav-icon"
                        onClick={() =>
                            navigate(
                                "/notifications"
                            )
                        }
                    />

                </Badge>


                {/* SETTINGS / PROFILE */}

                <SettingsOutlinedIcon
                    className="nav-icon"
                    onClick={() =>
                        navigate("/profile")
                    }
                />


                {/* USER FULL NAME */}

                <div className="user-info">

                    👤 {userName}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;