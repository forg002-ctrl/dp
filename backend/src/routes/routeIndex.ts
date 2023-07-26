import { Route } from '@src/ext/sdk/backend/app/route/Route';

import { GetPingRoute } from '@src/routes/ping/GetRoute';

// AUTH ROUTES
import { PostUserRegisterRoute } from '@src/routes/auth/register/PostRoute';
import { PostUserLoginRoute } from '@src/routes/auth/login/PostRoute';

// AUTHOR ROUTES
import { PostAuthorRoute } from '@src/routes/author/PostRoute';
import { GetAuthorRoute } from '@src/routes/author/GetRoute';
import { GetAuthorsRoute } from '@src/routes/authors/GetRoute';
import { DeleteAuthorRoute } from '@src/routes/author/DeleteRoute';

// GENRE ROUTES
import { PostGenreRoute } from '@src/routes/genre/PostRoute';
import { GetGenreRoute } from '@src/routes/genre/GetRoute';
import { GetGenresRoute } from '@src/routes/genres/GetRoute';
import { DeleteGenreRoute } from '@src/routes/genre/DeleteRoute';

// BOOK ROUTES
import { PostBookRoute } from '@src/routes/book/PostRoute';
import { GetBookRoute } from '@src/routes/book/GetRoute';
import { GetBooksRoute } from '@src/routes/books/GetRoute';
import { DeleteBookRoute } from '@src/routes/book/DeleteRoute';

export const appRoutes: Route[] = [
    new GetPingRoute(),
    new PostUserRegisterRoute(),
    new PostUserLoginRoute(),
    new PostAuthorRoute(),
    new GetAuthorRoute(),
    new GetAuthorsRoute(),
    new DeleteAuthorRoute(),
    new PostGenreRoute(),
    new GetGenreRoute(),
    new GetGenresRoute(),
    new DeleteGenreRoute(),
    new PostBookRoute(),
    new GetBookRoute(),
    new GetBooksRoute(),
    new DeleteBookRoute(),
];
