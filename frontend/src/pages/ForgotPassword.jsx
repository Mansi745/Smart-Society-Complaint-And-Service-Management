import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword(){

    const navigate = useNavigate();

    const [data,setData] = useState({
        email:"",
        password:""
    });


    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        });
    };


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{

            await api.put("/users/reset-password",data);

            alert("Password reset successfully");

            navigate("/login");

        }
        catch(error){

            console.log(error);
            alert("User not found");

        }
    };


    return(

        <div className="forgot-container">

            <div className="forgot-card">

                <h2>Reset Password</h2>

                <p>
    Enter your email and create a new password
</p>


                <form onSubmit={handleSubmit}>


                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    />


                    <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={data.password}
                    onChange={handleChange}
                    />


                    <button type="submit">
                        Reset Password
                    </button>


                </form>


            </div>

        </div>

    );
}

export default ForgotPassword;