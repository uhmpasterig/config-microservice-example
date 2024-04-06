import { Controller, Logger } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';
import { RedisService } from '../services/redis.service';

@Controller()
export class ConfigController {
  private readonly logger = new Logger(ConfigController.name);

  constructor(private readonly redisService: RedisService) {}

  @MessagePattern({ cmd: 'set' })
  async set(@Payload() data: { key: string; value: any }) {
    try {
      await this.redisService.set(data.key, data.value);
    } catch (error) {
      this.logger.error(`Error while setting key ${data.key}:`, error.stack);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'get' })
  async get(@Payload() key: string): Promise<any> {
    try {
      const value = await this.redisService.get(key);
      return value ?? null;
    } catch (error) {
      this.logger.error(`Error while getting key ${key}:`, error.stack);
      throw error;
    }
  }
}
