import express, { Router } from 'express';
import { addToCart, all, updateQuantity, deleteCart } from '../controllers/cart/cart';


export class CartRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    // crud api
    public initRoutes() {
        this.router.get('/', all)
        this.router.post('/', addToCart)
        this.router.patch('/', updateQuantity)
        // this.router.patch('/:id', ) 
        this.router.delete('/', deleteCart)
    }
}