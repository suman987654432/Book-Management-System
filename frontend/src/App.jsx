import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Insert from "./pages/Insert";
import Display from "./pages/Display";
import Update from "./pages/Update";
import Search from "./pages/Search"
import EditBook from "./pages/EditBook";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="insert" element={<Insert />} />
            <Route path="display" element={<Display />} />
            <Route path="update" element={<Update />} />
            <Route path="search" element={<Search />} />
            <Route path="/editdata/:id" element={<EditBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
