import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import logger from '../../tools/logger';

const prisma = new PrismaClient();

// Commobity create
export const create = async (req: Request, res:Response) => {
    logger.info(`Commodity create api`);
    const { title, info, price } = req.body;
    
    try {
        // prisma create
        const newCommodity = await prisma.commodity.create({
            data:{ 
                title, 
                info, 
                price 
            }
        })

        logger.info(`Commodity create api successfully: ${newCommodity.id}`);
        res.status(200).json({ message: "create success"})
    } catch (error) {
        logger.error(`Commodity create api error: ${error}`);
        res.status(500).json({ message: `something error ${error}`})
    }
}

// All commobity
export const all = async (req: Request, res: Response) => {
    try {
        const commodity = await prisma.commodity.findMany();

        logger.info(`Commodity findall api successfully`);
        res.status(200).json({ data: commodity })
    } catch (error) {
        logger.error(`Commodity findall api error: ${error}`);
        res.status(500).json({ message: `something error ${error}`})
    }
}

// Update commobity
export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, info, price } = req.body;
    try {
        const updatedComodity = await prisma.commodity.update({
            where: { id: parseInt(id)},
            data: {
                ...(title && { title }),
                ...(info && { info }),
                ...(price && { price })
            }
        })

        logger.info(`Commodity update api successfully: ${id}`);
        res.status(200).json({ message: "update success"})
    } catch (error) {
        logger.error(`Commodity update api error: ${error}`);
        res.status(500).json({ message: `something error ${error}`})
    }
}

// delete commobity
export const deleteCommodity = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Commodity error please check"})
        }

        await prisma.commodity.delete

        logger.info(`Commodity delete api successfully: ${id}`);
        res.status(200).json({ message: "delete success"})
    } catch (error) {
        logger.error(`Commodity delete api error: ${error}`);
        res.status(500).json({ message: `something error ${error}`})
    }
}