import { Logger } from '@nestjs/common';

export default class CustomLogger {
  static EventInfo(message: string): void {
    Logger.log(`[${new Date().toISOString()}] Event - ${message}`);
  }

  static EventError(message: string): void {
    Logger.error(`[${new Date().toISOString()}] Event - ${message}`);
  }
}
