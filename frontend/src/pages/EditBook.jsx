import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/edit.css";
const EditBook = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const loadData = () => {
    let api = "http://localhost:7000/books/editdatadisplay";
    axios.post(api, { id: id }).then((res) => {
      setInput(res.data);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(values => ({ ...values, [name]: value }));
    console.log(input);
  }
  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("_id", id);
    formData.append("author_name", input.author_name);
    formData.append("book_title", input.book_title);
    formData.append("publish_year", input.publish_year);
    formData.append("price", input.price);
    if (image) formData.append("image", image);

    axios.post("http://localhost:7000/books/editdatasave", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      alert("Updated data successfully");
      navigate("/dashboard/update");
    }).catch((error) => {
      console.error("Error updating book:", error);
    });
  };


  const handleImage = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };
  return (
    <div className="edit-container">
      <div className="edit-form-container">
        <h1>Edit Book Data</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Author name</Form.Label>
            <Form.Control type="text" name="author_name"
              value={input.author_name} onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type="text" name="book_title"
              value={input.book_title} onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Publish Year</Form.Label>
            <Form.Control type="date" name="publish_year"
              value={input.publish_year} onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Price</Form.Label>
            <Form.Control type="number" name="price"
              value={input.price} onChange={handleInput} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleImage}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditBook;
