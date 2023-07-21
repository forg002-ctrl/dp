import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Books Pages
import { BookList } from "pages/books/BookList";
import { BookDetailPage } from "pages/book/:id/BookDetailPage";
import { BookCreatePage } from "pages/book/BookCreatePage";

// Author Pages
import { AuthorCreatePage } from 'pages/author/AuthorCreatePage'

// Genre Pages
import { GenreCreatePage } from 'pages/genre/GenreCreatePage';

// Additional Pages
import { NotFoundPage } from 'pages/NotFoundPage';

import './index.css'

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/admin" element={<LoginPage />} /> */}
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id_book" element={<BookDetailPage />} />
          <Route path="/book" element={<BookCreatePage />} />
          <Route path="/author" element={<AuthorCreatePage />} />
          <Route path="/genre" element={<GenreCreatePage />} />

          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </div>
  );
}