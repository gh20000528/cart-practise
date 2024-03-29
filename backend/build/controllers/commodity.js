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
exports.deleteCommodity = exports.update = exports.all = exports.create = void 0;
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../tools/logger"));
const prisma = new client_1.PrismaClient();
// Commobity create
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, info, price } = req.body;
    try {
        // prisma create
        const newCommodity = yield prisma.commodity.create({
            data: {
                title,
                info,
                price
            }
        });
        logger_1.default.info(`Commodity create api successfully: ${newCommodity.id}`);
        res.status(200).json({ message: "create success" });
    }
    catch (error) {
        logger_1.default.error(`Commodity create api error: ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.create = create;
// All commobity
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commodity = yield prisma.commodity.findMany();
        logger_1.default.info(`Commodity findall api successfully`);
        res.status(200).json({ data: commodity });
    }
    catch (error) {
        logger_1.default.error(`Commodity findall api error: ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.all = all;
// Update commobity
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, info, price } = req.body;
    try {
        const updatedComodity = yield prisma.commodity.update({
            where: { id: parseInt(id) },
            data: Object.assign(Object.assign(Object.assign({}, (title && { title })), (info && { info })), (price && { price }))
        });
        logger_1.default.info(`Commodity update api successfully: ${id}`);
        res.status(200).json({ message: "update success" });
    }
    catch (error) {
        logger_1.default.error(`Commodity update api error: ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.update = update;
// delete commobity
const deleteCommodity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Commodity error please check" });
        }
        yield prisma.commodity.delete;
        logger_1.default.info(`Commodity delete api successfully: ${id}`);
        res.json(200).json({ message: "delete success" });
    }
    catch (error) {
        logger_1.default.error(`Commodity delete api error: ${error}`);
        res.status(500).json({ message: `something error ${error}` });
    }
});
exports.deleteCommodity = deleteCommodity;
