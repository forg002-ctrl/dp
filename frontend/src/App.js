import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BookList from "./components/book/BookList";
import BookCreate from "./components/book/BookCreate";
import GenreCreate from "./components/genre/GenreCreate";
import AuthorCreate from "./components/author/AuthorCreate";
import LoginPage from "./components/auth/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<LoginPage />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book" element={<BookCreate />} />
          <Route path="/genre" element={<GenreCreate />} />
          <Route path="/author" element={<AuthorCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;