import { Route } from '@src/ext/sdk/backend/app/route/Route';

import { GetPingRoute } from '@src/routes/ping/GetRoute';

import { PostFileRoute } from '@src/routes/file/PostRoute';
import { GetFileRoute } from '@src/routes/file/GetRoute';

export const appRoutes: Route[] = [
    new GetPingRoute(),
    new PostFileRoute(),
    new GetFileRoute(),
];
