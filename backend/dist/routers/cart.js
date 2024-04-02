"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const cart_1 = require("../controllers/cart/cart");
class CartRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    // crud api
    initRoutes() {
        this.router.get('/', cart_1.all);
        this.router.post('/', cart_1.addToCart);
        this.router.patch('/', cart_1.updateQuantity);
        // this.router.patch('/:id', ) 
        this.router.delete('/', cart_1.deleteCart);
    }
}
exports.CartRoutes = CartRoutes;
