import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { formatDate } from "../../utils";
import "../css/Display.css";
import { Outlet } from "react-router-dom";

const Display = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = () => {
    const api = "http://localhost:7000/books/datadisplay";
    axios.get(api).then((res) => {
      setMydata(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const ans = mydata.map((key) => {
    return (
      <tr key={key._id}>
        <td>{key.author_name}</td>
        <td>{key.book_title}</td>
        <td>{formatDate(key.publish_year)}</td>
        <td>{key.price}</td>
        <td>
          {key.image && (
            <img
              src={`data:image/png;base64,${key.image}`}
              alt={key.book_title}
              style={{ width: "100px", height: "auto" }}
            />
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="display-container">
      <div className="content-container">
        <h1>Display Data</h1>
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Book Title</th>
              <th>Publish Year</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </Table>
        <Outlet />
      </div>
    </div>
  );
};

export default Display;
