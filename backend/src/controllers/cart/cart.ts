import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import logger from '../../tools/logger';

const prisma = new PrismaClient();

// add to cart api
export const addToCart = async (req: Request, res: Response) => {
    const { commodityId } = req.body
    try {
        // commodity exist
        const existing = await prisma.cart.findFirst({
            where: {
                commodityId: Number(commodityId)
            }
        })

        if (existing) {
            logger.error("cart api exist error")
            res.status(400).json({ message: "commodity is exist"})
        }

        // create
        const newItem = await prisma.cart.create({
            data:{
                commodityId: Number(commodityId),
                quantity: 1
            }
        })

        res.status(200).json({ message: "add to cart success" })
    } catch (error) {
        logger.error(`addToCard api error: ${error}` )
        res.status(500).json({ message: `something error ${error}` })
    }
}

// get cart api
export const all = async (req: Request, res: Response) => {
    try {
        const cart = await prisma.cart.findMany({
            include:{
                commodity: true,
            }
        })

        res.json(200).json({ data: cart })
    } catch (error) {
        logger.error(`cart get all api error ${error}`)
        res.status(500).json({ message: `something error ${error}` })
    }
}

// add / reduce quantity api
export const updateQuantity = async (req: Request, res: Response) => {
    const { commodityId, action } = req.body
    try {
        const cartItem = await prisma.cart.findFirst({
            where: { commodityId: Number(commodityId) },
        })

        if (!cartItem) {
            logger.error("edit quantity api error: Commodity error")
            res.status(404).json({ message: "Commodity not found" })
        }

        let newQuantity: number = cartItem?.quantity ?? 0;
        if (action === "add") {
            newQuantity++
        } else if (action === "reduce") {
            newQuantity = Math.max(0, newQuantity - 1);
        } else {
            logger.error("edit quantity api error: Invalid action")
            res.status(400).json({ message: "Invalid action" })
        }

        await prisma.cart.update({
            where: { id: cartItem?.id },
            data: { quantity: newQuantity }
        })

        logger.info(`edit quantity api : ${commodityId}` )
        res.status(200).json({ message: "update succcess" })
    } catch (error) {
        logger.error(`edit quantity api error: ${error}`)
        res.status(500).json({ message: `something error ${error}` })
    }
}


// remove dommodity api
export const deleteCart = async (req: Request, res: Response) => {
    const { commodityId } = req.body
    try {
        const cartItem = await prisma.cart.findFirst({
            where: { commodityId: commodityId },
        })

        if (!cartItem) {
            logger.error("delete quantity api error: Commodity error")
            res.status(404).json({ message: "Commodity not found" })
        }        

        await prisma.cart.delete({
            where: {id: cartItem?.id}
        })
        logger.info(`delete quantity api : ${cartItem?.id}` )
        res.status(200).json({ message: "delete success" })
    } catch (error) {
        logger.error(`delete quantity api error: ${error}`)
        res.status(500).json({ message: `something error ${error}` })
    }
}


