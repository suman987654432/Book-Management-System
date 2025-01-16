import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../css/ResetPassword.css';

const ResetPassword = () => {
    const [input, setInput] = useState({});
    const [userid, setUserid] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserid = localStorage.getItem("userid");
        if (storedUserid) {
            setUserid(storedUserid);
        } else {
            message.error("User ID not found. Please log in again.");
            navigate("/login");
        }
    }, [navigate]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = "http://localhost:7000/user/passwordchange";
        try {
            await axios.post(api, { userid, ...input });
            message.success("Password successfully changed!");
            navigate("/home");
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Something went wrong!";
            message.error(errorMsg);
        }
    };

    return (
        <div className="reset-password-container">
            <h2 className="reset-password-title">Reset Password</h2>
            <Form className="reset-password-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicOldPassword">
                    <Form.Label>Enter old password</Form.Label>
                    <Form.Control
                        type="password"
                        name="oldpassword"
                        value={input.oldpassword || ""}
                        onChange={handleInput}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                    <Form.Label>Enter new password</Form.Label>
                    <Form.Control
                        type="password"
                        name="newpassword"
                        value={input.newpassword || ""}
                        onChange={handleInput}
                    />
                </Form.Group>
                <Button className="reset-password-button" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ResetPassword;
