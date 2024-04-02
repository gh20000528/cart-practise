"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const commodity_1 = require("../../routers/commodity");
// 创建一个 express 实例并使用你的路由
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const commodityRoutes = new commodity_1.CommodityRoutes();
app.use('/api/commodities', commodityRoutes.router);
describe('Commodity Controller Tests', () => {
    test('should create a new commodity', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/api/commodities')
            .send({
            title: 'Test Commodity',
            info: 'Test Info',
            price: '100',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('create success');
    }));
    test('should update a commodity', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .patch('/api/commodities/1')
            .send({
            title: 'Update test Commodity',
            price: '200',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('update success');
    }));
    test('should delete a commodity', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .delete('/api/commodities/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('delete success');
    }));
});
