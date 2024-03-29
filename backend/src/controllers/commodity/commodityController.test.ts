import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { CommodityRoutes } from '../../routers/commodity';
import logger from '../../tools/logger';

// 创建一个 express 实例并使用你的路由
const app = express();
app.use(bodyParser.json());
const commodityRoutes = new CommodityRoutes();
app.use('/api/commodities', commodityRoutes.router);

describe('Commodity Controller Tests', () => {
  test('should create a new commodity', async () => {
    const response = await request(app)
      .post('/api/commodities')
      .send({
        title: 'Test Commodity',
        info: 'Test Info',
        price: '100',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('create success');
  });
  test('should update a commodity', async () => {
    const response = await request(app)
      .patch('/api/commodities/1')
      .send({
        title: 'Update test Commodity',
        price: '200',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('update success');
    });
    test('should delete a commodity', async () => {
        const response = await request(app)
          .delete('/api/commodities/1')
    
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('delete success');
        });
});
