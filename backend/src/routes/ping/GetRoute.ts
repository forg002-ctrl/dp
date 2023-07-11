import { Route } from '@src/lib/app/route/Route';
import { Request, Response } from 'express';

import { routeDescription,
    IResponseBody
} from '@src/ext/shared/routes//ping/GetRouteDescription';

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
