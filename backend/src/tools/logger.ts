import { createLogger, format, transports } from 'winston';

// 定義自定義日誌格式
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// 創建 Logger 實例
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(), // 在控制台輸出
    new transports.File({ filename: 'error.log', level: 'error' }), // 僅錯誤日誌到文件
    new transports.File({ filename: 'combined.log' }), // 所有日誌到另一個文件
  ],
});

export default logger;
