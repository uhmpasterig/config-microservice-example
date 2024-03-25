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

  @EventPattern(process.env.SET_PATTERN || 'set')
  async set(
    @Payload() data: { key: string; value: any },
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.redisService.set(data.key, data.value);
    } catch (error) {
      this.logger.error(`Error while setting key ${data.key}:`, error.stack);
    }
  }

  @MessagePattern({ cmd: process.env.GET_PATTERN || 'get' })
  async get(key: string): Promise<any> {
    try {
      const value = await this.redisService.get(key);
      return value ?? null;
    } catch (error) {
      this.logger.error(`Error while getting key ${key}:`, error.stack);
    }
  }
}
