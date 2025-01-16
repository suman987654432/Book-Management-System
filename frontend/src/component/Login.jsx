import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Link } from "react-router-dom";  // Added the necessary import for Link
import "../css/login.css"; // Importing the CSS file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let api = "http://localhost:7000/user/login";
            const response = await axios.post(api, { email: email, password: password });
            if (response.status === 200) {
                localStorage.setItem("username", response.data.name);
                localStorage.setItem("useremail", response.data.email);
                localStorage.setItem("userid", response.data._id);
                console.log(response.data);
                navigate("/dashboard");
            }
        } catch (error) {
            message.error(error.response.data.msg);
        }
    };

    return (
        <>
            <h1 className="login-title">User Login!</h1>

            <Form className="login-form" style={{ width: "500px" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter email</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter password</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <Button className="login-button" variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
                <div className="reset-password-link">
                    <Link to="/repass">Reset Password</Link>
                </div>
            </Form>
        </>
    );
};

export default Login;
