import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/Registration.css'; // Importing the CSS file

const Registration = () => {
    const [input, setInput] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const api = "http://localhost:7000/user/registration";
        axios.post(api, input).then(() => {
            alert("You are successfully registered!");
            navigate("/login");
        }).catch((error) => {
            alert("Error: " + error.response?.data?.msg || "Something went wrong!");
        });
    };

    return (
        <div className="registration-container">
            <h1 className="registration-title">New User Registration</h1>
            <Form className="registration-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={input.name || ""}
                        onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>Enter city</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        value={input.city || ""}
                        onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={input.email || ""}
                        onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={input.password || ""}
                        onChange={handleInput}
                    />
                </Form.Group>
                <Button className="registration-button" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Registration;
