import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "../css/Insert.css";

const Insert = () => {
  const [input, setInput] = useState({
    author_name: "",
    book_title: "",
    publish_year: "",
    price: "",
  });
  const [image, setImage] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("author_name", input.author_name);
    formData.append("book_title", input.book_title);
    formData.append("publish_year", input.publish_year);
    formData.append("price", input.price);
    formData.append("image", image); // Append the image file

    try {
      const api = "http://localhost:7000/books/datasave";
      await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Data saved successfully");
    } catch (error) {
      alert("Error saving data: " + error.message);
    }
  };

  return (
    <div className="insert-container">
      <div className="form-container">
        <h1 className="title">Insert Book</h1>
        <Form className="insert-form">
          <Form.Group className="mb-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              type="text"
              name="author_name"
              value={input.author_name}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              name="book_title"
              value={input.book_title}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Publish Year</Form.Label>
            <Form.Control
              type="date"
              name="publish_year"
              value={input.publish_year}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={input.price}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleImage}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Insert;
