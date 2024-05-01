import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");

    const gohome = () => {
        window.location.href = window.location.origin;
    };

    const register = async (e) => {
        e.preventDefault();

        let register_url = window.location.origin + "/djangoapp/register";

        const res = await fetch(register_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
            }),
        });

        const json = await res.json();
        if (json.status) {
            sessionStorage.setItem("username", json.userName);
            window.location.href = window.location.origin;
        } else if (json.error === "Already Registered") {
            alert("The user with same username is already registered");
            window.location.href = window.location.origin;
        }
    };

    return (
        <div className="register-container">
            <div className="header">
                <span className="text">Sign Up</span>
                <div className="close-icon" onClick={gohome}>
                    <img src={close_icon} alt="X" />
                </div>
            </div>
            <hr />
            <form onSubmit={register}>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} className="img-icon" alt="Username" />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input-field"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src={user_icon} className="img-icon" alt="First Name" />
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className="input-field"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src={user_icon} className="img-icon" alt="Last Name" />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            className="input-field"
                            onChange={(e) => setlastName(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src={email_icon} className="img-icon" alt="Email" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input-field"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src={password_icon} className="img-icon" alt="Password" />
                        <input
                            name="psw"
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="submit-panel">
                    <input className="submit" type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
};

export default Register;
