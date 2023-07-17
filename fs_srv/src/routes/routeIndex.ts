import { Route } from '@src/ext/sdk/backend/app/route/Route';

import { GetPingRoute } from '@src/routes/ping/GetRoute';

export const appRoutes: Route[] = [
    new GetPingRoute(),
];
