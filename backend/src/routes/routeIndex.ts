import { Route } from '@src/lib/app/route/Route';

import { GetPingRoute } from '@src/routes/ping/GetRoute';

// AUTH ROUTES
import { PostUserRegisterRoute } from '@src/routes/auth/register/PostRoute';
import { PostUserLoginRoute } from '@src/routes/auth/login/PostRoute';

// AUTHOR ROUTES
import { PostAuthorRoute } from '@src/routes/author/PostRoute';
import { GetAuthorRoute } from '@src/routes/author/GetRoute';
import { GetAuthorsRoute } from '@src/routes/authors/GetRoute';

// GENRE ROUTES
import { PostGenreRoute } from '@src/routes/genre/PostRoute';
import { GetGenreRoute } from '@src/routes/genre/GetRoute';
import { GetGenresRoute } from '@src/routes/genres/GetRoute';

// BOOK ROUTES
import { PostBookRoute } from '@src/routes/book/PostRoute';
import { GetBooksRoute } from '@src/routes/books/GetRoute';

export const appRoutes: Route[] = [
    new GetPingRoute(),
    new PostUserRegisterRoute(),
    new PostUserLoginRoute(),
    new PostAuthorRoute(),
    new GetAuthorRoute(),
    new PostGenreRoute(),
    new GetGenreRoute(),
    new GetAuthorsRoute(),
    new GetGenresRoute(),
    new PostBookRoute(),
    new GetBooksRoute(),
];
