import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import "./Login.css";
import { useNotifications } from "../context/NotificationContext";

function Login() {

    const navigate = useNavigate();

    const { loadNotificationCount } = useNotifications();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            // ==========================================
            // LOGIN API
            // ==========================================

            const response = await api.post(
                "/users/login",
                {
                    email,
                    password,
                }
            );

            const user = response.data;

            console.log("Logged in user:", user);

            console.log(
                "Login response:",
                JSON.stringify(user, null, 2)
            );


            // ==========================================
            // BACKEND LoginResponse FIELDS
            // ==========================================

            const userId = user.userId;
            const staffId = user.staffId;

            /*
             * Backend LoginResponse:
             *
             * fullName = User.name
             *
             * We ONLY use fullName/name here.
             * Email is NOT used as the displayed name.
             */

            const userName =
                user.fullName ||
                user.name ||
                "User";

            const userRole =
                user.role || "";

            const userProfession =
                user.profession || "";


            console.log("User ID:", userId);
            console.log("Staff ID:", staffId);
            console.log("FULL NAME:", userName);
            console.log("User Role:", userRole);
            console.log("Profession:", userProfession);


            // ==========================================
            // CHECK USER ID
            // ==========================================

            if (userId == null) {

                console.error(
                    "userId not received from backend:",
                    user
                );

                alert(
                    "Login successful but user ID was not received."
                );

                return;
            }


            // ==========================================
            // CLEAR OLD LOGIN DATA
            // ==========================================

            localStorage.removeItem("staffId");
            localStorage.removeItem("profession");


            // ==========================================
            // SAVE USER DATA
            // ==========================================

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            localStorage.setItem(
                "userId",
                String(userId)
            );

            // IMPORTANT:
            // Save FULL NAME only
            localStorage.setItem(
                "userName",
                userName
            );

            localStorage.setItem(
                "userRole",
                userRole
            );

            // Email is saved separately
            localStorage.setItem(
                "userEmail",
                email
            );


            // ==========================================
            // SAVE PROFESSION
            // ==========================================

            if (userProfession) {

                localStorage.setItem(
                    "profession",
                    userProfession
                );
            }


            // ==========================================
            // VERIFY LOCAL STORAGE
            // ==========================================

            console.log(
                "Saved userId:",
                localStorage.getItem("userId")
            );

            console.log(
                "Saved userName:",
                localStorage.getItem("userName")
            );

            console.log(
                "Saved userRole:",
                localStorage.getItem("userRole")
            );

            console.log(
                "Saved userEmail:",
                localStorage.getItem("userEmail")
            );


            // ==========================================
            // LOAD NOTIFICATION COUNT
            // ==========================================

            try {

                await loadNotificationCount();

            } catch (notificationError) {

                console.error(
                    "Notification count error:",
                    notificationError
                );
            }


            // ==========================================
            // STAFF LOGIN
            // ==========================================

            if (userRole === "STAFF") {

                // Backend already provides staffId

                if (staffId != null) {

                    localStorage.setItem(
                        "staffId",
                        String(staffId)
                    );

                    console.log(
                        "Staff ID saved:",
                        staffId
                    );

                    navigate("/staff");

                    return;
                }


                // ======================================
                // FALLBACK: FIND STAFF
                // ======================================

                try {

                    const staffResponse =
                        await api.get("/staff");

                    const staffList =
                        staffResponse.data;

                    console.log(
                        "Staff list:",
                        staffList
                    );


                    const loggedInStaff =
                        staffList.find(
                            (staff) =>
                                staff.user &&
                                Number(staff.user.id) ===
                                Number(userId)
                        );


                    console.log(
                        "Logged in staff:",
                        loggedInStaff
                    );


                    if (!loggedInStaff) {

                        console.error(
                            "Staff record not found:",
                            userId
                        );

                        alert(
                            "Staff profile not found. Please contact admin."
                        );

                        return;
                    }


                    localStorage.setItem(
                        "staffId",
                        String(
                            loggedInStaff.id
                        )
                    );


                    console.log(
                        "Staff ID saved:",
                        loggedInStaff.id
                    );


                    navigate("/staff");

                } catch (staffError) {

                    console.error(
                        "Error finding staff:",
                        staffError
                    );

                    alert(
                        "Unable to load staff profile."
                    );
                }

                return;
            }


            // ==========================================
            // ADMIN LOGIN
            // ==========================================

            if (userRole === "ADMIN") {

                console.log(
                    "Admin login successful"
                );

                navigate("/admin");

                return;
            }


            // ==========================================
            // RESIDENT LOGIN
            // ==========================================

            console.log(
                "Resident login successful"
            );

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            if (error.response) {

                console.error(
                    "Server response:",
                    error.response.data
                );


                const message =
                    typeof error.response.data === "string"
                        ? error.response.data
                        : error.response.data?.message ||
                          "Invalid email or password.";


                alert(message);

            } else {

                alert(
                    "Server is not running!"
                );
            }
        }
    };


    return (
        <div className="login-container">

            {/* ================= LEFT PANEL ================= */}

            <div className="left-panel">

                <div className="overlay">

                    <h1>
                        🏢 Smart Society
                    </h1>

                    <h2>
                        Complaint Management Portal
                    </h2>

                    <p>
                        Building a safer, smarter and better
                        community through digital complaint
                        management.
                    </p>


                    <div className="features">

                        <div className="feature">
                            ✅ Fast Complaint Resolution
                        </div>

                        <div className="feature">
                            🔒 Secure Resident Access
                        </div>

                        <div className="feature">
                            🏘 Smart Community Services
                        </div>

                    </div>

                </div>

            </div>


            {/* ================= RIGHT PANEL ================= */}

            <div className="right-panel">

                <div className="login-card">

                    <h2>
                        Welcome Back 👋
                    </h2>

                    <p className="subtitle">
                        Login to continue to your account
                    </p>


                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

                        <div className="input-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="input-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* FORGOT PASSWORD */}

                        <div className="login-options">

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-btn"
                        >
                            Login
                        </button>

                    </form>


                    {/* REGISTER */}

                    <div className="register-link">

                        Don't have an account?

                        <Link to="/register">
                            {" "}Register
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;