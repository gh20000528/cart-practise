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
exports.deleteCart = exports.updateQuantity = exports.all = exports.addToCart = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../../tools/logger"));
const prisma = new client_1.PrismaClient();
// add to cart api
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commodityId } = req.body;
    try {
        // commodity exist
        const existing = yield prisma.cart.findFirst({
            where: {
                commodityId: Number(commodityId)
            }
        });
        if (existing) {
            logger_1.default.error("cart api exist error");
            res.status(400).json({ message: "commodity is exist" });
        }
        // create
        const newItem = yield prisma.cart.create({
            data: {
                commodityId: Number(commodityId),
                quantity: 1
            }
        });
        res.status(200).json({ message: "add to cart success" });
    }
    catch (error) {
        logger_1.default.error(`addToCard api error: ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.addToCart = addToCart;
// get cart api
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield prisma.cart.findMany({
            include: {
                commodity: true,
            }
        });
        res.json(200).json({ data: cart });
    }
    catch (error) {
        logger_1.default.error(`cart get all api error ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.all = all;
// add / reduce quantity api
const updateQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { commodityId, action } = req.body;
    try {
        const cartItem = yield prisma.cart.findFirst({
            where: { commodityId: Number(commodityId) },
        });
        if (!cartItem) {
            logger_1.default.error("edit quantity api error: Commodity error");
            res.status(404).json({ message: "Commodity not found" });
        }
        let newQuantity = (_a = cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) !== null && _a !== void 0 ? _a : 0;
        if (action === "add") {
            newQuantity++;
        }
        else if (action === "reduce") {
            newQuantity = Math.max(0, newQuantity - 1);
        }
        else {
            logger_1.default.error("edit quantity api error: Invalid action");
            res.status(400).json({ message: "Invalid action" });
        }
        yield prisma.cart.update({
            where: { id: cartItem === null || cartItem === void 0 ? void 0 : cartItem.id },
            data: { quantity: newQuantity }
        });
        logger_1.default.info(`edit quantity api : ${commodityId}`);
        res.status(200).json({ message: "update succcess" });
    }
    catch (error) {
        logger_1.default.error(`edit quantity api error: ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.updateQuantity = updateQuantity;
// remove dommodity api
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commodityId } = req.body;
    try {
        const cartItem = yield prisma.cart.findFirst({
            where: { commodityId: commodityId },
        });
        if (!cartItem) {
            logger_1.default.error("delete quantity api error: Commodity error");
            res.status(404).json({ message: "Commodity not found" });
        }
        yield prisma.cart.delete({
            where: { id: cartItem === null || cartItem === void 0 ? void 0 : cartItem.id }
        });
        logger_1.default.info(`delete quantity api : ${cartItem === null || cartItem === void 0 ? void 0 : cartItem.id}`);
        res.status(200).json({ message: "delete success" });
    }
    catch (error) {
        logger_1.default.error(`delete quantity api error: ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.deleteCart = deleteCart;
