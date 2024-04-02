"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const commodity_1 = require("./routers/commodity");
const logger_1 = __importDefault(require("./tools/logger"));
const cart_1 = require("./routers/cart");
const cors_1 = __importDefault(require("cors"));
// DO NOT WRITE
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)({ origin: "*" }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cookie_session_1.default)({ keys: ['laskdjf'] }));
        this.setUpRoutes();
    }
    setUpRoutes() {
        const commodityRoutes = new commodity_1.CommodityRoutes();
        const cartRoutes = new cart_1.CartRoutes();
        this.app.use('/api/commodities', commodityRoutes.router);
        this.app.use('/api/cart', cartRoutes.router);
    }
    start() {
        this.app.listen(3000, () => {
            logger_1.default.info('backend work in 3000');
        });
    }
}
new Server().start();
