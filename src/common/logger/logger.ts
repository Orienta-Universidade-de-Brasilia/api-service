import { Logger } from '@nestjs/common';

export default class CustomLogger {
  static info(message: string): void {
    Logger.log(`[${new Date().toISOString()}] CRON - ${message}`);
  }

  static error(message: string): void {
    Logger.error(`[${new Date().toISOString()}] CRON - ${message}`);
  }
}
