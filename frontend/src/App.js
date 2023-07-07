import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { BookList } from "./pages/books/BookList";
import { BookDetailPage } from "./pages/book/BookDetailPage";
import BookCreate from "./pages/books/BookCreate";
import AuthorCreate from "./pages/author/AuthorCreate";
import GenreCreate from "./components/genre/GenreCreate";
import LoginPage from "./components/auth/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/admin" element={<LoginPage />} /> */}
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id_book" element={<BookDetailPage />} />
          {/* <Route path="/book" element={<BookCreate />} /> */}
          {/* <Route path="/genre" element={<GenreCreate />} /> */}
          {/* <Route path="/author" element={<AuthorCreate />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;