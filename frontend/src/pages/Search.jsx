import axios from "axios";
import { useState } from "react";
import "../css/Search.css"; // Import the updated CSS file

const Search = () => {
  const [book, setBook] = useState("");
  const [mydata, setMydata] = useState([]);

  const handleSubmit = () => {
    let api = "http://localhost:7000/books/datasearch";
    axios.post(api, { book: book }).then((res) => {
      setMydata(res.data);
    });
  };

  const ans = mydata.map((key) => {
    return (
      <tr key={key._id}>
        <td>{key.author_name}</td>
        <td>{key.book_title}</td>
        <td>{key.publish_year}</td>
        <td>{key.price}</td>
      </tr>
    );
  });

  return (
    <div className="search-container">
      <h1>Search Data</h1>
      <div className="input-container">
        <input
          type="text"
          value={book}
          onChange={(e) => { setBook(e.target.value); }}
          placeholder="Enter book name"
        />
        <button onClick={handleSubmit}>Search Book</button>
      </div>
      <hr />
      {mydata.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Book Title</th>
              <th>Publish Year</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody style={{ color: "red" }}>{ans}</tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "#4c51af", fontSize: "1.2rem" }}>
          No data found
        </p>
      )}
    </div>
  );
};

export default Search;
