"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// 定義自定義日誌格式
const logFormat = winston_1.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});
// 創建 Logger 實例
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), logFormat),
    transports: [
        new winston_1.transports.Console(), // 在控制台輸出
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }), // 僅錯誤日誌到文件
        new winston_1.transports.File({ filename: 'combined.log' }), // 所有日誌到另一個文件
    ],
});
exports.default = logger;
