import express, { Router } from 'express';
import { create, all, update, deleteCommodity} from '../controllers/commodity/commodity';
import { commoditySchema, validate } from '../controllers/commodity/yup';


export class CommodityRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    // crud api
    public initRoutes() {
        this.router.get('/', all)
        this.router.post('/',create)
        this.router.patch('/:id', update)
        this.router.delete('/:id', deleteCommodity)
    }
}