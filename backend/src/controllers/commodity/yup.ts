import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import logger from '../../tools/logger';

export const commoditySchema = yup.object({
    body: yup.object({
        title: yup.string().required('Title is required'),
        info: yup.string().required('Info is required'),
        price: yup.string().required('Price is required'),
    
    })
})


export const validate = (schema: AnySchema) => async (req: Request, res: Response) => {
    try {
        await schema.validate({
            body: req.body,
            quert: req.query,
            params: req.params
        });
        
    } catch (error) {
        logger.error('validate error')
        res.status(400).json({ message: error });
    }
}