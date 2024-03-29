import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { CommodityRoutes } from './routers/commodity';
import logger from './tools/logger';
import { CartRoutes } from './routers/cart';

// DO NOT WRITE

class Server {
    app: express.Express = express();

    constructor() {
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
        this.app.use(cookieSession({ keys: ['laskdjf'] }))
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        const commodityRoutes = new CommodityRoutes();
        const cartRoutes = new CartRoutes();
        this.app.use('/api/commodities', commodityRoutes.router)
        this.app.use('/api/cart', cartRoutes.router)
    }

    start(): void {
        this.app.listen(3000, () => {
            logger.info('backend work in 3000');
        })
    }
} 

new Server().start();
