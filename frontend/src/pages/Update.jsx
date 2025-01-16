import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import del from "../assets/del.png";
import edit from "../assets/edit.png";
import { formatDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import "../css/Update.css"; // Import the updated CSS file

const Update = () => {
  const [mydata, setMydata] = useState([]);
  const navigate = useNavigate();

  const loadData = () => {
    let api = "http://localhost:7000/books/datadisplay";
    axios.get(api).then((res) => {
      console.log(res.data);
      setMydata(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const myDel = (id) => {
    let api = "http://localhost:7000/books/datadelete";
    axios.post(api, { id: id }).then((res) => {
      alert("data deleted");
      loadData();
    });
  };

  const ans = mydata.map((key) => {
    return (
      <tr key={key._id}>
        <td>{key.author_name}</td>
        <td>{key.book_title}</td>
        <td>{formatDate(key.publish_year)}</td>
        <td>{key.price}</td>
        <td>
          <a
            href="#"
            onClick={() => {
              navigate(`/dashboard/editdata/${key._id}`);
            }}
          >
            <img src={edit} className="imgsize" alt="Edit" />
          </a>
        </td>
        <td>
          <a
            href="#"
            onClick={() => {
              myDel(key._id);
            }}
          >
            <img src={del} className="imgsize" alt="Delete" />
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div className="update-container">
      <h1>Display page</h1>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Book Title</th>
              <th>Publish Year</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{ans}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Update;
