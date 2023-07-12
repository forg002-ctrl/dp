import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { BookList } from "pages/books/BookList";
import { BookDetailPage } from "pages/book/:id/BookDetailPage";
import { BookCreatePage } from "pages/book/BookCreatePage";
// import BookCreate from "./pages/books/BookCreate";
import AuthorCreate from "./pages/author/AuthorCreate";
import GenreCreate from "./components/genre/GenreCreate";
import LoginPage from "./components/auth/LoginPage";

import './index.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/admin" element={<LoginPage />} /> */}
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id_book" element={<BookDetailPage />} />
          <Route path="/book" element={<BookCreatePage />} />
          {/* <Route path="/genre" element={<GenreCreate />} /> */}
          {/* <Route path="/author" element={<AuthorCreate />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;