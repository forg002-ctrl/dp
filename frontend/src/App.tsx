import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "components/ProtectedRoute";

// Books Pages
import { BookListPage } from "pages/books/BookListPage";
import { BookDetailPage } from "pages/book/:id/BookDetailPage";
import { BookCreatePage } from "pages/book/BookCreatePage";

// Author Pages
import { AuthorCreatePage } from 'pages/author/AuthorCreatePage'
import { AuthorTablePage } from 'pages/authors/AuthorTablePage';

// Genre Pages
import { GenreCreatePage } from 'pages/genre/GenreCreatePage';
import { GenreTablePage } from "pages/genres/GenreTablePage";

// Additional Pages
import { LoginPage } from 'pages/login/LoginPage'
import { NotFoundPage } from 'pages/NotFoundPage';

import { DefaultLayout } from "layouts/DefaultLayout";

import './index.css'

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<BookListPage />} />
            <Route path="books" element={<BookListPage />} />
            <Route path="genres" element={<GenreTablePage />} />
            <Route path="genre" element={<ProtectedRoute><GenreCreatePage /></ProtectedRoute>} />
            <Route path="book/:id_book" element={<BookDetailPage />} />
            <Route path="book" element={<ProtectedRoute><BookCreatePage /></ProtectedRoute>} />
            <Route path="author" element={<ProtectedRoute><AuthorCreatePage /></ProtectedRoute>} />
            <Route path="authors" element={<AuthorTablePage />} />
            <Route path="*" element={<NotFoundPage />}/>
          </Route>

          <Route path="login" element={<LoginPage />} />

        </Routes>
      </Router>
    </div>
  );
}
