import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#F5F7FB",
            }}
        >
            {/* Navbar */}
            <Navbar
                open={open}
                setOpen={setOpen}
            />

            {/* Sidebar */}
            <Sidebar
                open={open}
                setOpen={setOpen}
            />

            {/* Main Content */}
           <main
    style={{
        marginLeft: open ? "260px" : "0px",
        padding: "24px 32px",
        paddingTop: "10px",
        minHeight: "100vh",
        boxSizing: "border-box",
        transition: "margin-left 0.3s ease",
    }}
>
                {children}
            </main>
        </div>
    );
}

export default Layout;