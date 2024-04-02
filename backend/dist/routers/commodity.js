"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityRoutes = void 0;
const express_1 = require("express");
const commodity_1 = require("../controllers/commodity/commodity");
class CommodityRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    // crud api
    initRoutes() {
        this.router.get('/', commodity_1.all);
        this.router.post('/', commodity_1.create);
        this.router.patch('/:id', commodity_1.update);
        this.router.delete('/:id', commodity_1.deleteCommodity);
    }
}
exports.CommodityRoutes = CommodityRoutes;
