import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

@Injectable()
export class RedisService {
  private readonly client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(private configService: ConfigService) {
    const config: RedisConfig = {
      host: this.configService.get<string>('REDIS_HOST'),
      port: Number(this.configService.get<number>('REDIS_PORT')),
      password: this.configService.get<string>('REDIS_PASSWORD'),
    };
    this.client = new Redis(config);
  }

  async get(key: string): Promise<any> {
    try {
      const value = await this.client.get(key);
      return JSON.parse(value);
    } catch (error) {
      this.logger.error(`Failed to get key: ${key}`, error.stack);
      return null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      await this.client.set(key, stringValue);
    } catch (error) {
      this.logger.error(`Failed to set key: ${key}`, error.stack);
    }
  }
}
