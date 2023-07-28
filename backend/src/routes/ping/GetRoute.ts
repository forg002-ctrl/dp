import { Route } from '@src/ext/sdk/backend/app/route/Route';
import { Request, Response } from 'express';

import { routeDescription,
    IResponseBody } from '@src/ext/shared/services/backend/routes//ping/GetRouteDescription';

export class GetPingRoute extends Route {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        res.status(200).json(<IResponseBody>{ response: 'pong' });
    }
}
